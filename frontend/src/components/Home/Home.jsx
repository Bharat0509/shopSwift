import { CgMouse } from 'react-icons/cg'
import './Home.css'
import MetaData from '../layout/MetaData'
import { clearErrors, getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ProductCard from '../Utils/ProductCard'
import Product from "../Utils/Product";
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import Brands from '../Utils/Brands'
import Wrapper from '../Utils/Wrapper'
import ServiceInfoCard from '../Utils/ServiceInfoCard'
import CategoryCard from '../Utils/CategoryCard'
import Ad from '../Utils/Ad'
import Hero from '../Hero/Hero'

const Categories = [
    {
        title: "Furnitures",
        img: './Furniture.png'
    },
    {
        title: "Hand Bag",
        img: './HandBag.png'
    },
    {
        title: "Books",
        img: './Books.png'
    },
    {
        title: "Tech",
        img: './Tech.png'
    },
    {
        title: "Sneakers",
        img: './Snekers.png'
    },
    {
        title: "Travel",
        img: './Travel.png'
    }
]

const brands = [
    {
        title: "Staple",
        img: './brand1.png',
        time: 12

    },
    {
        title: "Sproute",
        img: './brand2.png',
        time: 6
    },
    {
        title: "Grocery Oultler",
        img: './brand3.png',
        time: 20
    },
    {
        title: "Mollie Stones",
        img: './brand4.png',
        time: 40
    },
    {
        title: "Sports Basement",
        img: './brand5.png',
        time: 41
    },
    {
        title: "Container Store",
        img: './brand6.png',
        time: 4
    },
    {
        title: "Target",
        img: './brand6.png',
        time: 14
    },
    {
        title: "Bevmo",
        img: './brand8.png',
        time: 15
    },
]

const service = [
    {
        title: "Frequently Asked Questions",
        desc: 'lorem epsum plase seafe Updae son SAfe Shopping in Our Stores',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e55b939fea169c0292_faq-min.png'
    },
    {
        title: "Online Payment Process",
        desc: 'lorem epsum plase seafe Updae son SAfe Shopping in Our Stores',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6707380718425e697_onlie%20payment-min.png'
    },
    {
        title: "Home Delivery Options",
        desc: 'lorem epsum plase seafe Updae son SAfe Shopping in Our Stores',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e544663ba3d0fd2bb8_home%20delivery-min.png'
    }
]


const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.products) || [];

    useEffect(() => {
        if (error) {
            alert.error(error);
            // dispatch(clearErrors)
        }
        dispatch(getProducts());
    },
        [dispatch, error, alert]
    );


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title="BharatEcom" />


                    <Hero />
                    <Product />
                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={CategoryCard} data={Categories} heading="Shop Our Top Categories" hw={'20rem'} />


                    </div>

                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={ProductCard} data={products} heading="Today's Best Deal For You !" hw={'20rem'} />


                    </div>
                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={Brands} data={brands} heading="Choose By Brands" hw={'20rem'} />


                    </div>
                    <Ad />
                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={ProductCard} data={products} heading="Weekly Popular Deal For You !" hw={'20rem'} />


                    </div>

                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={ServiceInfoCard} data={service} heading="Service To Help You Shop " hw={'20rem'} />


                    </div>
                </>
            }
        </>
    )
}

export default Home