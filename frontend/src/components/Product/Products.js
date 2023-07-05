import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productActions';

import CloseIcon from '@mui/icons-material/Close';
import ProductCard from '../Utils/ProductCard';
import './Products.css';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import TuneIcon from '@mui/icons-material/Tune';
import MetaData from '../layout/MetaData';

import Filter from './Filter';

const Products = () => {
    const location = useLocation();
    const alert = useAlert();
    const params = useParams();
    let keyword = '';
    const { products, loading, error, resultPerPage, filteredProductsCount } =
        useSelector((state) => state.products);
    const [selectedFilterOptions, setSelectedFilterOptions] = useState([
        'Popularity',
        'Rating: 4.0 +'
    ]);

    const dispatch = useDispatch();

    const [isOpenModal, setIsOpenModal] = useState(false);

    keyword = params.keyword;
    const removeFilter = (filter) => {
        setSelectedFilterOptions(
            selectedFilterOptions.filter((str) => str !== filter)
        );
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProducts(keyword));
    }, [dispatch, params.keyword, alert, error, keyword, setIsOpenModal]);

    return (
        <>
            <MetaData title="Products" />

            <h2 className="productHeading">Products</h2>
            <div className="products-container">
                <div className="products-sidebar">
                    <button
                        className="filter_btn"
                        onClick={(e) => setIsOpenModal(true)}
                    >
                        <TuneIcon /> <span>Filters</span>
                    </button>
                    <ul className="selected-filters">
                        {selectedFilterOptions.map((filter) => (
                            <li className="filter_selected-btn" key={filter}>
                                <span>{filter}</span>
                                <CloseIcon
                                    onClick={(e) => removeFilter(filter)}
                                />
                            </li>
                        ))}
                    </ul>
                    {isOpenModal && (
                        <Filter
                            setIsOpen={setIsOpenModal}
                            setSelectedFilterOptions={setSelectedFilterOptions}
                        />
                    )}
                </div>

                <main className="products-main">
                    {products.map((item) => (
                        <ProductCard key={item._id} {...item} />
                    ))}
                </main>
            </div>
        </>
    );
};

export default Products;
