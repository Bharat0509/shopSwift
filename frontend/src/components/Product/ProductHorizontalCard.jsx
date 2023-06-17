import { Rating } from '@mui/material'
import './ProductHorizontalCard.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../actions/cartAction'
import { RiShoppingCartLine } from 'react-icons/ri'
const ProductHorizontalCard = () => {


    const [itmQty, setItmQty] = useState(1)
    const dispatch = useDispatch()
    const handleAddCartClick = () => {

        alert.success("Item added to Cart ")
    }
    const handleDecrementClick = () => {
        if (itmQty > 1) setItmQty(itmQty - 1);
    }
    const handleIncrementClick = () => {
        setItmQty(itmQty + 1)
    }
    const options = {
        value: 3.5,
        precision: 0.5,
        readOnly: true
    }
    return (
        <div className='product-h-card'>
            <div className='product-h-image'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXeyRXkzm4NHVE-mPKWqc9grT8j4Q9sxwa8lhOwV6sg&usqp=CAU&ec=48665699" alt="Mobile Phone" />
            </div>
            <div className='product-h-info'>
                <div className='product-h-title'>Samsung Galaxy S23+ 5G 128GB (Grade-A)</div>
                <div className='product-h-more'>
                    <div className='product-h-id'>
                        <span className='id'># SKU:GH82-221331D</span>
                        <span>
                            <span id='product-h-rating'>{3.5}</span>
                            <Rating {...options} /> (5,632 Reviews)</span>
                    </div>
                    <div className='product-h-price'>
                        <span>
                            $4999.99
                        </span>
                        <span>
                            $3999.99

                        </span>

                    </div>
                </div>
                <div className='product-h-cart'>
                    <div>
                        Free Delivery On Your Home Available*
                    </div>
                    <div className='product-h-add-to-cart'>
                        <button onClick={handleDecrementClick}>-</button>
                        <span>{itmQty}</span>
                        <button onClick={handleIncrementClick}>+</button>

                        <span
                            onClick={handleAddCartClick} className='product-h-add-to-cart-btn'><RiShoppingCartLine /></span>
                    </div>
                </div>
                <div className='product-h-desc'>
                    <span>Product Information :</span>
                    <br />
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, inventore eligendi! Ipsum aliquam reiciendis earum facere ut, nisi autem alias dolorem quo distinctio nostrum iste architecto exercitationem aspernatur velit odit similique tenetur laudantium sed assumenda asperiores id? Sequi alias animi ab officia id itaque earum, temporibus, impedit eos sint eius.

                </div>
            </div>
        </div>
    )
}

export default ProductHorizontalCard