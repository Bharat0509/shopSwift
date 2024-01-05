import { HiArrowSmRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import ModernProductCard from './ModernProductCard'
import './Product.css'
const Product = ({ data, heading }) => {


    return (
        <div className='product-card-container'>
            <div className='product-header'>
                <div className='product-upper-l'>
                    <h2>{heading}</h2>
                    <ul>
                        <li >
                            Hottest
                        </li>
                        <li>
                            New Arrival
                        </li>
                        <li>
                            Low Prices
                        </li>
                        <li id='active-selection'>
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
                    data && data?.map((item) => <ModernProductCard key={item._id} {...item} />)
                }
                {
                    (!data || data.length === 0) && <h4 style={{ display: 'flex', width: "100%", alignItems: "center", justifyContent: "center", marginTop: "1rem" }}>No Products Available </h4>
                }


            </div>


        </div>
    )
}

export default Product