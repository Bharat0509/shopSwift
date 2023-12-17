import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productActions';
import './Products.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams, useResolvedPath, useSearchParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { IoIosArrowForward } from "react-icons/io";
import MetaData from '../layout/MetaData';
import ModernProductCard from '../Utils/ModernProductCard';

const Products = () => {
    const alert = useAlert();
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    let keyword = queryParams.get("product_name")?.replace(/"/, '') ?? ''

    const { products, error } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProducts(keyword, 1, [0, 10000]));
    }, [dispatch, keyword]);

    return (
        <>
            <MetaData title="Products" />
            <h2 className="productHeading">Products</h2>
            <div className="products-container">
                <div className="products-sidebar">
                    <div className='filter-option'>
                        <span>Price</span>
                        <span><IoIosArrowForward /></span>
                    </div>

                    <div className='filter-option'>
                        <span>Category</span>
                        <span><IoIosArrowForward /></span>
                    </div>

                    <div className='filter-option'>
                        <span>Ratings</span>
                        <span><IoIosArrowForward /></span>
                    </div>

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

export default Products;
