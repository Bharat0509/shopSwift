import React, { useEffect } from 'react';
import { HiArrowSmRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ModernProductCard from './ModernProductCard';
import './Product.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { clearErrors, getProducts } from '../../actions/productActions';

function Product({ heading }) {
    const dispatch = useDispatch();
    const { products: data, error } = useSelector((state) => state.products) ?? [];

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProducts());
    }, [dispatch, error]);

    return (
        <div className='product-card-container'>
            <div className='product-header'>
                <div className='product-upper-l'>
                    <h2>{heading}</h2>
                    <ul className='product-options'>
                        <li className='product-option'>Hottest</li>
                        <li className='product-option'>New Arrival</li>
                        <li className='product-option'>Low Prices</li>
                        <li className='product-option active-option'>Back In Stock</li>
                    </ul>
                </div>
                <div className='product-upper-r'>
                    <Link to='/products' className='view-all-link'>
                        View all <HiArrowSmRight className='arrow-icon' />
                    </Link>
                </div>
            </div>
            <div className='products-detail'>
                {data &&
                    data.map((item) => <ModernProductCard key={item._id} {...item} />)}
                {!data || data.length === 0 ? (
                    <h4 className='no-products-msg'>No Products Available </h4>
                ) : null}
            </div>
        </div>
    );
}

export default Product;
