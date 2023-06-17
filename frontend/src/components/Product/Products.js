import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productActions';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Utils/ProductCard';
import './Products.css';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useLocation, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Slider from '@material-ui/core/Slider';
import MetaData from '../layout/MetaData';
import ProductHorizontalCard from './ProductHorizontalCard.jsx';

const categories = [
    'All',
    'Laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones'
];

const Products = () => {
    const location = useLocation();
    const alert = useAlert();
    const params = useParams();
    let keyword = '';
    const { products, loading, error, resultPerPage, filteredProductsCount } =
        useSelector((state) => state.products);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 90000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e) => setCurrentPage(e);
    const priceHandler = (e, newPrice) => setPrice(newPrice);
    keyword = params.keyword;
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProducts(keyword, currentPage, price, category, ratings));
    }, [
        dispatch,
        params.keyword,
        alert,
        error,
        currentPage,
        price,
        category,
        ratings,
        keyword
    ]);

    return (
        <>
            <MetaData title="Products" />

            <h2 className="productHeading">Products</h2>
            <div className="products-container">
                <div className="products-sidebar">sidebar</div>
                <main className="products-main">
                    <ProductHorizontalCard />
                    <ProductHorizontalCard />
                    <ProductHorizontalCard />
                </main>
            </div>
        </>
    );
};

export default Products;
