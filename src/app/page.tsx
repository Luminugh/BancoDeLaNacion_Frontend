import React from 'react'
import HeaderMain from '../components/shared/HeaderMain'
import Hero from '../components/shared/Hero'
import ProductsGrid from '../components/shared/ProductsGrid'
import FeatureGrid from '../components/shared/FeatureGrid'
import NewsGrid from '../components/shared/NewsGrid'
import FooterMain from '../components/shared/FooterMain'

export default function HomePage(){
  return (
    <div>
      <HeaderMain />
      <Hero />
      <ProductsGrid />
      <FeatureGrid />
      <NewsGrid />
      <FooterMain />
    </div>
  )
}
