import React from 'react'
import './CategoryCard.css'

const CategoryCard = ({ title, img }) => {
    return (
        <div className="cat-card">
            <spna className="category-title">{title}</spna>
            <img className='category-img' src={img} alt={title} />
        </div>
    )
}

export default CategoryCard