import React from 'react'
import './ProductCard.css'
import { Rating } from '@mui/material'
import { Link } from 'react-router-dom'

const ProductCard = ({ ratings, _id, images, name, price, numOfReviews, description }) => {
    const options = {
        value: Number(ratings),
        precision: 0.5,
        readOnly: true
    }
    return (
        <Link to={`/product/${_id}`}>
            <div className='productCard'>
                <div className="product-thumbnail-wrap">
                    <img className='product-img' src={images[0]?.url} alt="" />
                    <div className="product-whichlist">
                        <img src="	https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e9df775b939f51a0b22f6d_Icon.svg" alt={name} />
                    </div>
                </div>
                <div className="product-content">
                    <div className="product-title-wrap">
                        <h3 className='product-title'>{name}</h3>
                        <div className="product-price">
                            <span className="text-span">₹</span>
                            {price}
                            <span className="text-span">.00</span>

                        </div>
                    </div>
                    <div className="product-color">
                        {description.slice(0, 150) + '...'}
                    </div>
                    <div className="product-rating">
                        <div className="star-wrap"><Rating {...options} /></div>
                        <div className="total-rating">({numOfReviews})</div>
                    </div>
                    <div className="is-magnetic">
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard