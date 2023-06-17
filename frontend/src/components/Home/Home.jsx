import './Home.css'
import MetaData from '../layout/MetaData'
import { getProducts } from '../../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ProductCard from '../Utils/ProductCard'
import Product from "../Utils/Product";
import Loader from '../layout/Loader/Loader'
import { useAlert } from 'react-alert'
import Wrapper from '../Utils/Wrapper'
import ServiceInfoCard from '../Utils/ServiceInfoCard'
import Ad from '../Utils/Ad'
import Hero from '../Hero/Hero'



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
                    <Product heading={'Back In Stock This Week'} data={products} />
                    <Ad />

                    <Product heading={'Top Rated Products'} data={products} />
                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={ProductCard} data={products} heading="Weekly Popular Deal For You !" hw={'20rem'} />
                    </div>

                    <div className="product-container-wrapper" id='container'>
                        <Wrapper Card={ServiceInfoCard} data={service} heading="Service To Help You Shop " hw={'18rem'} />
                    </div>
                </>
            }
        </>
    )
}

export default Home