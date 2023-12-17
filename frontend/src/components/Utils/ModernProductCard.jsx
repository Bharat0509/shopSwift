import React, { useState } from 'react'
import './ModernProductCard.css'
import { Rating } from '@mui/material'
import { Link } from 'react-router-dom'
import { RiShoppingCartLine } from 'react-icons/ri'
import { AiOutlineHeart } from "react-icons/ai";
import { addItemToCart } from '../../actions/cartAction'
import { useDispatch } from 'react-redux'

const ModernProductCard = ({ ratings, _id, images, name, price, numOfReviews, description }) => {
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
        <Link className='product_card' to={`/product/${_id}`}>

            <div className='product_card-upper '>
                <img src={images[0].url} alt="" />
                <span className='wishlist'><AiOutlineHeart /></span>
            </div>
            <div className='product_card-lower'>
                <h2>{name}</h2>
                <div>
                    <span className='curr_price'>₹{price * (1 - 0.25)}</span>
                    <span className='old_price' >₹{price}</span>

                </div>
                <div>
                    <Rating value={ratings} />
                    <span>({numOfReviews})</span>
                </div>
            </div>

        </Link>

    )
}

export default ModernProductCard