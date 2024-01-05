import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productActions';
import ModernProductCard from '../Utils/ModernProductCard';
import MetaData from '../layout/MetaData';
import './Products.css';
import { Rating, Slider } from '@mui/material';
const categories = [
    'Mobiles', 'Laptops', 'Watches', 'Cameras', 'TVS', 'Mens', 'Womens'
]
const Products = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    let keyword = queryParams.get("product_name")?.replace(/"/, '') ?? ''

    const { products, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProducts(keyword, 1, [0, 100000]));
    }, [dispatch, error, keyword]);


    return (
        <>
            <MetaData title="Products" />
            <h2 className="productHeading">Products</h2>
            <div className="products-container">
                <div className="products-sidebar">


                    <FilterOption title={"Price"} >
                        <div className='filter-container'>
                            <Slider
                                track="normal"
                                getAriaValueText={(value) => `${value} Rs`}
                                defaultValue={[1, 100000]}
                                max={100000}
                                min={1}
                                size='small'
                                valueLabelDisplay='on'
                            />
                        </div>
                    </FilterOption>
                    <FilterOption title={"Category"} >
                        <div className='filter-container'>
                            {categories.map(cat => <li cl>{cat}</li>)}
                        </div>
                    </FilterOption>
                    <FilterOption title={"Ratings"} >
                        <div className='filter-container'>
                            <h3>Rating Above:</h3>
                            <Rating precision={.5} />
                        </div>
                    </FilterOption>
                </div>

                <main className="products-main">

                    {!!products.length ? products.map((item) => (
                        <ModernProductCard key={item._id} {...item} />
                    )) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: "70vw", fontSize: "1.5rem" }}>{":) No Products Available."}</div>}
                </main>
            </div>
        </>
    );
};

export const FilterOption = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (<><div className='filter-option' onClick={e => setIsOpen(state => !state)}>
        <span>{title}</span>
        <span><IoIosArrowForward /></span>
    </div >
        {isOpen && children
        }
    </>
    )
}
export default Products;
