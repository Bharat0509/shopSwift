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
import { Box } from '@mui/material';

const categories = [

    { label: 'All', value: '' },
    { label: 'Laptop', value: 'Laptop' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Bottom', value: 'Bottom' },
    { label: 'Tops', value: 'Tops' },
    { label: 'Attire', value: 'Attire' },
    { label: 'SmartPhones', value: 'SmartPhones' },
];

const ratingFilter = [
    { label: '1 or Above', value: 1 },
    { label: '2 or Above', value: 2 },
    { label: '3 or Above', value: 3 },
    { label: '4 or Above', value: 4 }
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
                <div className="products-sidebar">

                    <div className="categoryFilter">
                        <span className='filterLabel'>Category</span>
                        {
                            categories.map((item) => {
                                return <div key={item.value}>

                                    <input type="radio" id={item.value} value={item.value} name='category' onChange={e => setCategory(e.target.value)} />

                                    <label htmlFor={item.value}>{item.label}</label>

                                </div>
                            })
                        }

                    </div>
                    <div className="ratingFilter">
                        <span className='filterLabel'>Rating</span>
                        {
                            ratingFilter.map((item) => {
                                return <div key={item.value}>

                                    <input type="radio" id={item.value} value={item.value} name='radio' onChange={e => setRatings(item.value)} />

                                    <label htmlFor={item.value}>{item.label}</label>

                                </div>
                            })
                        }

                    </div>
                    <div className="priceFilter">
                        <span className='filterLabel'>Price</span>
                        <Box sx={{ width: 250 }}>
                            <Slider
                                getAriaLabel={() => 'Product Price'}
                                value={price}
                                min={100}
                                max={100000}
                                onChange={(e, val) => setPrice(val)}
                                valueLabelDisplay="auto"

                            />
                        </Box>
                    </div>

                </div>
                <main className="products-main">

                    {
                        products.map(item => (<ProductCard key={item._id} {...item} />))
                    }</main>
            </div>
        </>
    );
};

export default Products;
