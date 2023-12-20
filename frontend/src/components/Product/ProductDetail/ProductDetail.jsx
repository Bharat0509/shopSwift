import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { clearErrors, getProductsDetails } from "../../../actions/productActions";
import MetaData from "../../layout/MetaData";
import { Rating } from "@mui/material";
import { addItemToCart } from "../../../actions/cartAction";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { TbTruckReturn } from "react-icons/tb";
import { IoMdHeartEmpty } from "react-icons/io";


const ProductDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [currMainImgIdx, setCurrMainImgIdx] = useState(0)
    const [additionalInfoTab, setAdditionalInfoTab] = useState('specifications')
    const [quantity, setQuantity] = useState(1)
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    )
    const options = {
        size: "large",
        value: Math.floor(Math.random() * 5 + 1) ?? Number(product?.ratings),
        precision: 0.5,
        readOnly: true,
    }

    const decrementQuantity = () =>
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    const incrementQuantity = () => setQuantity(quantity + 1)

    const addToCartHandler = () => {
        dispatch(addItemToCart(params.productId, quantity))
        toast.success('Item added to Cart. ')
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors)
        }

        // if (reviewError) {
        //     toast.error(reviewError)
        //     dispatch(clearErrors)
        // }
        // if (success) {
        //     toast.success('Review Submitted Successfully !!')
        //     dispatch({ type: NEW_REVIEW_RESET })
        // }

        dispatch(getProductsDetails(params.productId))
    }, [params.id, error, params.productId, dispatch])
    if (loading) return <h4>Now Loading ...</h4>
    return (
        <>
            <MetaData title={`${product?.name}`} />
            <div className="product_detail-container">
                <div className="product_detail-images">
                    <div className="main-image">
                        <img src={product?.images[currMainImgIdx]?.url} alt="Product Preview" />
                    </div>
                    <div className="all-images">
                        {product?.images?.map((img, idx) => (
                            <img
                                className={`${currMainImgIdx === idx && 'active'}`}
                                src={img.url}
                                onClick={e => setCurrMainImgIdx(idx)}
                                alt={img?.public_id} />
                        ))}
                    </div>
                </div>
                <div className="product_detail-info">
                    <div className="product_name-id">
                        <p>#{product._id}</p>
                        <h2>{product.name}</h2>
                    </div>
                    <div className="product_rating-price">
                        <div> <span id="product-info-rating">
                            {product?.rating}
                        </span>
                            <Rating {...options} /> (
                            {Math.floor(Math.random() * 500) ?? product?.numOfReviews} Reviews)
                        </div>
                        <div>
                            Price : <span id="price">{product.price} Rs.</span>
                        </div>
                    </div>
                    <div className="product_quantity-stock">

                        <div className="product-info-add-to-cart">

                            <AiOutlineMinus size={20} onClick={decrementQuantity} />

                            <span>{quantity}</span>

                            <AiOutlinePlus size={20} onClick={incrementQuantity} />


                        </div>



                        <span>Only <span id="stock"> 17</span> Items Left !! <br /> Don't miss it!</span>

                    </div>

                    <div className="wishlist-cart">
                        <button className="product_add-to-cart">
                            <IoMdHeartEmpty size={22} />
                            WishList
                        </button>
                        <button className="product_add-to-cart" onClick={addToCartHandler}>
                            <MdOutlineAddShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>

                    <div className="shipping-return-info">
                        <div>
                            <p>
                                <BsTruck size={20} />Free Shipping Available
                            </p>
                            <Link to={'/check-availability'}>Enter Your Postal Code for Delivery Availability</Link>

                        </div>
                        <div>

                            <p><TbTruckReturn size={20} />Return Delivery</p>
                            <p>Free 30 Days Delivery Returns.<Link to={'/details'}>Details</Link></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="additional-info">
                <div>
                    <li>Full Specifications</li>
                    <li>Review & Ratings</li>
                </div>
                <div>
                    {
                        additionalInfoTab === "specifications" ?
                            <div className="specs">{
                                product.description}</div>
                            :
                            <div className="review">

                            </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetail