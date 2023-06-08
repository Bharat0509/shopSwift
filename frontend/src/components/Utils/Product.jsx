import './Product.css'
import { HiArrowSmRight } from 'react-icons/hi'
import ProductCard from './ProductCard'
const Product = () => {

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
                    <h2>Back In Stock This Week</h2>
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
                    View all
                    <HiArrowSmRight />
                </div>
            </div>
            <div className='products'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>


        </div>
    )
}

export default Product