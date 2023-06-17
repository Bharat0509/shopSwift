import axios from 'axios';
import {
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS
} from '../constants/productConstant';
import { REQUEST_URL } from '../Constants.js';

// ///////////////////////////////////////////////////////////////
// //REQUEST URL
// const   REQUEST_URL="https://bharatecommerce.onrender.com"

// ///////////////////////////////////////////////////////////////

export const getProducts =
    (
        keyword = '',
        currentPage = 1,
        price = [0, 100000],
        category = '',
        ratings = 0
    ) =>
    async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCT_REQUEST
            });
            let link = `${REQUEST_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

            if (category.length > 0) {
                link = `${REQUEST_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }

            const { data } = await axios.get(link);

            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response?.data?.error || error.response.data
            });
        }
    };
//GET ALL PRODUCTS ADMIN
export const getAdminProducts = (token) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });
        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/admin/products`,
            { token }
        );
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error?.response?.data?.message
        });
    }
};

//Product details
export const getProductsDetails = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });
        const { data } = await axios.get(`${REQUEST_URL}/api/v1/product/${id}`);

        // console.log(data);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.error
        });
    }
};

//New Product ADMIN
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PRODUCT_REQUEST
        });
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/admin/product/new`,
            productData,
            config
        );

        console.log(data);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error?.response?.data?.error
        });
    }
};

//Update Product ADMIN
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        });
        const config = {
            Headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const { data } = await axios.put(
            `${REQUEST_URL}/api/v1/admin/product/${id}`,
            productData,
            config
        );

        console.log(data);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error?.response?.data?.error
        });
    }
};
//New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST
        });
        const config = {
            Headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.put(
            `${REQUEST_URL}/api/v1/review`,
            reviewData,
            config
        );

        console.log(data);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.error
        });
    }
};

//get Reviews admin for a Product
export const getReviews = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_REVIEW_REQUEST
        });

        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/reviews?id=${id}`,
            { token }
        );

        console.log(data);

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.error
        });
    }
};

//Delete Reviews admin for a Product
export const deleteReviews =
    (reviewId, productId, token) => async (dispatch) => {
        try {
            dispatch({
                type: DELETE_REVIEW_REQUEST
            });

            const { data } = await axios.post(
                `${REQUEST_URL}/api/v1/delete/reviews?id=${reviewId}&productId=${productId}`,
                { token }
            );

            console.log(data);

            dispatch({
                type: DELETE_REVIEW_SUCCESS,
                payload: data.success
            });
        } catch (error) {
            dispatch({
                type: DELETE_REVIEW_FAIL,
                payload: error.response.data.error
            });
        }
    };

//Delete Product
export const deleteProduct = (id, token) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        });

        const { data } = await axios.post(
            `${REQUEST_URL}/api/v1/admin/product/${id}`,
            { token }
        );

        console.log(data);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error?.response?.data?.error
        });
    }
};

//clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
