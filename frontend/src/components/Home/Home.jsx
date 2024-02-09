import { Suspense, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProducts } from '../../actions/productActions'
import Hero from '../Hero/Hero'
import Product from "../Utils/Product"
import ServiceInfoCard from '../Utils/ServiceInfoCard'
import Wrapper from '../Utils/Wrapper'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './Home.css'
import Ad from '../Utils/Ad'
import Footer from '../layout/Footer/Footer'



const service = [
    {
        title: "Find Answers to Common Queries",
        desc: 'Explore our FAQs for solutions and tips on safe shopping in our stores.',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e55b939fea169c0292_faq-min.png'
    },
    {
        title: "Effortless Online Payment Methods",
        desc: 'Discover seamless online payment processes for a hassle-free shopping experience.',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e6707380718425e697_onlie%20payment-min.png'
    },
    {
        title: "Convenient Home Delivery Services",
        desc: 'Enjoy doorstep delivery options tailored to your needs for added convenience.',
        url: 'https://uploads-ssl.webflow.com/63e857eaeaf853471d5335ff/63e8c4e544663ba3d0fd2bb8_home%20delivery-min.png'
    }
]



const Home = () => {



    return (

        <>
            <MetaData title="ShopSwift - Your Shortcut to Shopping Satisfaction" />


            <Hero />
            <Suspense fallback={<Loader />}>
                <Product heading={'Back In Stock This Week'} />
            </Suspense>
            <Ad />
            <Suspense fallback={<Loader />}>
                <Product heading={'Top Rated Products'} />
            </Suspense>
            <div className="product-container-wrapper" id='container'>
                <Wrapper Card={ServiceInfoCard} data={service} heading="Service To Help You Shop " hw={'18rem'} />
            </div>
            <Footer />
        </>


    )
}

export default Home