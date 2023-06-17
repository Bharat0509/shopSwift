import './Product.css'
import { HiArrowSmRight } from 'react-icons/hi'
import { MdArrowForwardIos } from 'react-icons/md'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
const Product = ({ data, heading }) => {

    const options = {
        value: 5,
        precision: 0.5,
        readOnly: true,
        size: 'small'

    }
    return (
        <div className='product-card-container'>
            <div className='product-header'>
                <div className='product-upper-l'>
                    <h2>{heading}</h2>
                    <ul>
                        <li>
                            Hottest
                        </li>
                        <li>
                            New Arrival
                        </li>
                        <li>
                            Low Prices
                        </li>
                        <li>
                            Back In Stock
                        </li>
                    </ul>
                </div>
                <div className='product-upper-r'>
                    <Link to='/products'>View all
                        <HiArrowSmRight /></Link>
                </div>
            </div>
            <div className='products-detail'>
                <button className='products-btn backward'> <MdArrowForwardIos size={32} /></button>

                {
                    data.map((item) => <ProductCard {...item} />)
                }
                <button className='products-btn forward'><MdArrowForwardIos size={32} /></button>

            </div>


        </div>
    )
}

export default Product