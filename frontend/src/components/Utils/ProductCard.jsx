import React, { useState } from 'react'
import './Product.css'
import { Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { addItemToCart } from '../../actions/cartAction'
import { useDispatch } from 'react-redux'

const ProductCard = ({ ratings, _id, images, name, price, numOfReviews, description }) => {
    const [itmQty, setItmQty] = useState(1)
    const dispatch = useDispatch()
    const handleAddCartClick = () => {
        dispatch(addItemToCart(_id, itmQty))
        alert.success("Item added to Cart ")
    }
    const handleDecrementClick = () => {
        if (itmQty > 1) setItmQty(itmQty - 1);
    }
    const handleIncrementClick = () => {
        setItmQty(itmQty + 1)
    }
    const options = {
        value: Number(ratings),
        precision: 0.5,
        readOnly: true
    }
    return (

        <div className='card'>
            <div className='card-upper'>
                <img src="./pngegg.png" alt="Product" />
            </div>
            <div className='card-lower'>
                <div className='card-lower-title'><Link to={`/product/${_id}`}> Realme 6 - Bad Qulity Phone</Link></div>


                <div className="product-rating">
                    <div className="star-wrap"><Rating {...options} /></div>
                    <div className="total-rating">({7})</div>
                </div>
                <div className='card-lower-info'>

                    <div className='price'>
                        <div style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }} className='oldPrice'>$15.99</div>
                        <div id='finalPrice'>$12.99</div>
                    </div>

                    <div className='add-to-cart'>
                        <button onClick={handleDecrementClick}>-</button>
                        <span>{itmQty}</span>
                        <button onClick={handleIncrementClick}>+</button>

                        <span
                            onClick={handleAddCartClick} className='add-to-cart-btn'><RiShoppingCartLine /></span>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default ProductCard