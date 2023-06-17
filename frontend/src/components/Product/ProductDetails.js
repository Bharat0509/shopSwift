import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
    clearErrors,
    getProductsDetails,
    newReview
} from '../../actions/productActions';

import ReviewCard from './ReviewCard.js';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { addItemToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@material-ui/core';
import { Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstant';
import { RiH1, RiShoppingCartLine } from 'react-icons/ri';

const ProductDetails = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const params = useParams();

    const { token } = useSelector((state) => state.authToken);
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const decrementQuantity = () =>
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    const incrementQuantity = () => setQuantity(quantity + 1);

    const addToCardHandler = () => {
        dispatch(addItemToCart(params.id, quantity));
        alert.success('Item added to Cart ');
    };
    const submitReviewToggle = () => {
        setOpen(!open);
    };
    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', params.id);
        myForm.set('token', token);
        dispatch(newReview(myForm));
        setOpen(false);
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors);
        }
        if (success) {
            alert.success('Review Submitted Successfully !!');
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductsDetails(params.id));
    }, [params.id, alert, dispatch, error, success, reviewError]);

    const options = {
        // size: "large",
        value: Number(product?.ratings),
        precision: 0.5,
        readOnly: true
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`${product?.name}`} />
                    {/* <div className="ProductDetails">
                        <div>
                            <Carousel>
                                {product.images &&
                                    product.images?.map((img, i) => (
                                        <img
                                            className="CarouselImage"
                                            src={img.url}
                                            alt={`${i + 1} Slide`}
                                        />
                                    ))}
                            </Carousel>
                        </div>

                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <Rating {...options} />
                                <span className="detailsBlock-2-span">
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decrementQuantity}>
                                            -
                                        </button>
                                        <input type="number" value={quantity} />

                                        <button onClick={incrementQuantity}>
                                            +
                                        </button>
                                    </div>
                                    <button
                                        disabled={
                                            product.Stock < 1 ? true : false
                                        }
                                        onClick={addToCardHandler}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                                <p>
                                    Status:
                                    <b
                                        className={
                                            product.Stock < 1
                                                ? 'redColor'
                                                : 'greenColor'
                                        }
                                    >
                                        {product.Stock < 1
                                            ? ' OutOfStock'
                                            : ' InStock'}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                Description :<p>{product.description}</p>
                            </div>
                            <button
                                onClick={submitReviewToggle}
                                className="submitReview"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div> */}
                    <div className="product-info-card">
                        <div className="product-info-image">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsT5BzuKk6KLNt9Kr6Y3jr0Cu7sIGztuvTM4rEQeRT0Q&usqp=CAU&ec=48665699"
                                alt="Mobile Phone"
                            />
                        </div>
                        <div className="product-info-info">
                            <div className="product-info-title">
                                Samsung Galaxy S23+ 5G 128GB (Grade-A)
                            </div>
                            <div className="product-info-more">
                                <div className="product-info-id">
                                    <span className="id">
                                        # SKU:GH82-221331D
                                    </span>
                                    <span>
                                        <span id="product-info-rating">
                                            {3.5}
                                        </span>
                                        <Rating {...options} /> (5,632 Reviews)
                                    </span>
                                </div>
                            </div>
                            <div className="product-info-cart">
                                <div className="product-info-price">
                                    <span>$4999.99</span>
                                    <span>$3999.99</span>
                                </div>
                                <div className="product-info-add-to-cart">
                                    <button onClick={decrementQuantity}>
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button onClick={incrementQuantity}>
                                        +
                                    </button>

                                    <span
                                        onClick={addToCardHandler}
                                        className="product-info-add-to-cart-btn"
                                    >
                                        Add to Cart
                                    </span>
                                </div>
                            </div>
                            <div className="product-info-desc">
                                <span>Product Information :</span>
                                <br />
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Beatae, inventore eligendi!
                                Ipsum aliquam reiciendis earum facere ut, nisi
                                autem alias dolorem quo distinctio nostrum iste
                                architecto exercitationem aspernatur velit odit
                                similique tenetur laudantium sed assumenda
                                asperiores id? Sequi alias animi ab officia id
                                itaque earum, temporibus, impedit eos sint eius.
                            </div>
                        </div>
                    </div>
                    <h3 className="reviewHeading">REVIEWS</h3>
                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea
                                className="submitDialogTextArea"
                                cols={30}
                                rows={5}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <DialogActions>
                                <Button
                                    onClick={submitReviewToggle}
                                    color="secondary"
                                >
                                    {' '}
                                    Cancle
                                </Button>
                                <Button
                                    onClick={reviewSubmitHandler}
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews &&
                                product.reviews?.map((review) => (
                                    <ReviewCard
                                        key={review._id}
                                        review={review}
                                    />
                                ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    );
};

export default ProductDetails;
