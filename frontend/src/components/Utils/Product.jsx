import './Product.css'
import { HiArrowSmRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ModernProductCard from './ModernProductCard'
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

                {
                    data && data?.map((item) => <ModernProductCard {...item} />)
                }
                {
                    !data && <h4 style={{ display: 'flex', width: "100%", alignItems: "center", justifyContent: "center" }}>No Data Available </h4>
                }


            </div>


        </div>
    )
}

export default Product