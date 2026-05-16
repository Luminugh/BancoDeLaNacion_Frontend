'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import useAuthStore from '../../store/authStore'
import { getProfileById } from '../../services/profiles/profileService'
import { User } from '../../types/models'
import ProtectedPage from '../../components/shared/ProtectedPage'
import styles from '../../components/shared/protected.module.css'

export default function ProfilePage(){
  const user = useAuthStore((s)=>s.user)
  const [profile, setProfile] = useState<User | null>(user)

  useEffect(() => {
    if (user?.id) {
      getProfileById(user.id).then(setProfile).catch(() => {})
    }
  }, [user?.id])

  if(!profile) {
    return (
      <ProtectedPage
        eyebrow="Perfil"
        title="No hay usuario"
        subtitle="Inicia sesión para visualizar y administrar tu información personal."
      >
        <div className={styles.emptyState}>No existe un perfil activo en esta sesión.</div>
      </ProtectedPage>
    )
  }

  return (
    <ProtectedPage
      eyebrow="Cuenta"
      title="Perfil de usuario"
      subtitle="Tu información principal aparece aquí con una presentación más clara y ordenada."
      primaryAction={{ label: 'Ir al dashboard', href: '/dashboard' }}
      secondaryAction={{ label: 'Editar transferencias', href: '/transfers' }}
      metrics={[
        { label: 'Nombre', value: profile.firstName, hint: profile.lastName },
        { label: 'Rol', value: profile.role, hint: 'Perfil activo' },
        { label: 'Contacto', value: profile.email, hint: profile.phone || 'Sin teléfono' },
        { label: 'DNI', value: profile.dni, hint: 'Documento asociado' },
      ]}
    >
      <section className={styles.gridTwo}>
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Datos personales</h2>
              <p className={styles.cardText}>Información registrada en el sistema.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Nombre completo</div>
                  <div className={styles.itemSubtitle}>{profile.firstName} {profile.lastName}</div>
                </div>
                <div className={styles.badge}>Activo</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>DNI</div>
                  <div className={styles.itemSubtitle}>{profile.dni}</div>
                </div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Correo</div>
                  <div className={styles.itemSubtitle}>{profile.email}</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Resumen de cuenta</h2>
              <p className={styles.cardText}>Un panel breve con el estado de acceso de tu perfil.</p>
            </div>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.panelList}>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Teléfono</div>
                  <div className={styles.itemSubtitle}>{profile.phone || 'No registrado'}</div>
                </div>
                <div className={styles.badge}>Contacto</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Rol</div>
                  <div className={styles.itemSubtitle}>{profile.role}</div>
                </div>
                <div className={styles.badge}>Perfil</div>
              </div>
              <div className={styles.panelItem}>
                <div className={styles.itemMain}>
                  <div className={styles.itemTitle}>Actualización</div>
                  <div className={styles.itemSubtitle}>Sincronizado desde el backend</div>
                </div>
                <div className={styles.badge}>OK</div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </ProtectedPage>
  )
}
