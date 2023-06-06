import React from 'react'
import './Brands.css'

const Brands = ({ img, title, time }) => {
    return (
        <div className='brand-container'>
            <div className="brand-thumbnail-wrap">
                <img src={img} alt="" className='deal-image' />
            </div>
            <div className="brand-content">
                <h3 className="brand-title">{title}</h3>
                <div className="delivery-time">Delivery with in {time} Hours</div>
            </div>
        </div>
    )
}

export default Brands
