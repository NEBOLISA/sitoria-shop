import React from 'react'
import Home from '../page'

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  
      return <Home category={category} />
}

export default CategoryPage
