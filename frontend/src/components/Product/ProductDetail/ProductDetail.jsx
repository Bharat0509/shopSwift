import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTruck } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addItemToCart } from "../../../actions/cartAction";
import { clearErrors, getProductsDetails } from "../../../actions/productActions";
import MetaData from "../../layout/MetaData";
import RatingReview from "../RatingReview/RatingReview";
import "./ProductDetail.css";
const iPhone12 = {
    name: "Apple iPhone 12",
    description:
        "Experience Innovation Unleashed. Introducing the Apple iPhone 12 – a masterpiece of design, performance, and innovation. Elevate your mobile experience with cutting-edge technology and a sleek, iconic design that defines the epitome of modern smartphones.",
    features: [
        {
            title: "5G Connectivity",
            description:
                "Surf, stream, and connect at unprecedented speeds with the power of 5G technology. Experience lightning-fast downloads, low-latency gaming, and seamless video streaming like never before.",
        },
        {
            title: "Super Retina XDR Display",
            description:
                "Immerse yourself in a stunning visual experience with the Super Retina XDR display. Enjoy true-to-life colors, deep blacks, and a remarkable level of detail on the edge-to-edge 6.1-inch display. HDR content looks amazing with up to 1200 nits peak brightness.",
        },
        {
            title: "A14 Bionic Chip",
            description:
                "Unleash the power of the A14 Bionic chip, the fastest chip ever in a smartphone. Featuring a 6-core CPU and 4-core GPU, this chip delivers industry-leading performance and efficiency. Experience faster app launches, smoother animations, and improved machine learning capabilities.",
        },
        {
            title: "Dual-Camera System",
            description:
                "Capture professional-quality photos and videos with the dual-camera system. The 12MP Ultra-Wide and Wide lenses, along with Night mode, Deep Fusion, and Smart HDR 3, allow you to unleash your creativity and capture moments with incredible clarity in various lighting conditions.",
        },
        {
            title: "MagSafe Technology",
            description:
                "Explore a new era of accessories with MagSafe. The magnetic alignment ensures a secure and efficient connection for MagSafe-compatible accessories, including cases, wallets, and wireless chargers. Experience a whole new level of convenience and customization.",
        },
        {
            title: "iOS 15",
            description:
                "Stay at the forefront of innovation with the latest iOS 15. Enjoy new features such as Focus mode, Live Text in photos, redesigned notifications, and enhanced privacy controls. The seamless integration of hardware and software ensures a smooth and intuitive user experience.",
        },
        {
            title: "Ceramic Shield",
            description:
                "The front cover is infused with ceramic particles for enhanced durability, delivering four times better drop performance. The Ceramic Shield provides improved protection, making your iPhone 12 more resistant to everyday wear and tear.",
        },
    ],
    inTheBox: [
        "Apple iPhone 12",
        "USB-C to Lightning Cable",
        "Documentation",
    ],
    note:
        "Note: Apple iPhone 12 does not include a power adapter or EarPods, contributing to Apple's environmental goals.",
    slogan: "Choose Excellence. Choose iPhone 12.",
};

const ProductDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const [currMainImgIdx, setCurrMainImgIdx] = useState(0)
    const [additionalInfoTab, setAdditionalInfoTab] = useState('Full Specification')
    const [quantity, setQuantity] = useState(1)
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    )
    const options = {
        size: "large",
        value: Number(product?.ratings),
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
                        <img src={product?.images ? product.images[currMainImgIdx]?.url : ""} alt="Product Preview" />
                    </div>
                    <div className="all-images">
                        {product?.images?.map((img, idx) => (
                            <img
                                key={img.url}
                                className={`${currMainImgIdx === idx && 'active'}`}
                                src={img?.url}
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
                            {product?.numOfReviews} Reviews)
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

                        <span>Only <span id="stock">{product.stock}</span> Items Left !! <br /> Don't miss it!</span>

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
                <div className="info-tabs">
                    <li onClick={e => setAdditionalInfoTab('Full Specification')} className={`${additionalInfoTab === 'Full Specification' && 'active-tab'}`}>Full Specification</li>
                    <li onClick={e => setAdditionalInfoTab('Ratings & Reviews')} className={`${additionalInfoTab === 'Ratings & Reviews' && 'active-tab'}`}>Ratings & Reviews</li>
                    <li onClick={e => setAdditionalInfoTab('Discussion')} className={`${additionalInfoTab === 'Discussion' && 'active-tab'}`}>Discussion</li>
                </div>
                <div className="specs-container">

                    {
                        additionalInfoTab === 'Full Specification' ?
                            (<div className="specs">

                                {
                                    iPhone12.features.map(feature => (
                                        <div key={feature.title} className="spec">
                                            <h2>{feature.title}</h2>
                                            <p>{feature.description}</p>
                                        </div>
                                    ))

                                }

                            </div>
                            )
                            :

                            additionalInfoTab === 'Ratings & Reviews' ?

                                <RatingReview />

                                :
                                <div className="discussions">
                                    <p>Start a discussion now.</p>
                                </div>
                    }
                </div>
                <div>

                </div>
            </div>
        </>
    )
}

export default ProductDetail