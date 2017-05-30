import React from 'react'
import { Link } from 'react-router-dom'
import './CategoryMenuItem.css'


const CategoryMenuItem = ({category, selectedCategoryId}) => {
  return (
    <div key={category.id} className='category'>
      <Link to={`/best-sellers/${category.urlParam}`} className={selectedCategoryId === category.id ? 'category-link-current' : 'category-link'}>
        {category.name}
      </Link>
    </div>
  )
}

export default CategoryMenuItem
