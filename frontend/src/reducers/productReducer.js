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
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from '../constants/productConstant'

export const productsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_PRODUCT_SUCCESS:
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload?.productsCount,
                resultPerPage: action.payload?.resultPerPage,
                filteredProductsCount: action.payload?.filteredProductsCount,
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                products: [],
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const newReviewReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const newProductReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            }
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

export const productReducer = (state = { product: [] }, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,

                isDeleted: action.payload.success,
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null,
            }
        default:
            return state
    }
}

//PRODUCT REVIEWS

export const productReviewsDetailsReducer = (
    state = { reviews: [] },
    action
) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ALL_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload,
            }
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

//Reviews reducer
export const revieswReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
