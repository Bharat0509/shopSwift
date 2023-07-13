/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Navbar.css'
import { FaTruck, } from 'react-icons/fa'
import { TbScissors } from 'react-icons/tb'
import { HiShieldCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { RxPerson, RxTriangleDown } from 'react-icons/rx'
import { RiShoppingBag3Line, RiShoppingCartLine } from 'react-icons/ri'
import Input from './Input/Input'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import HistoryIcon from '@mui/icons-material/History';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ProfileMenu from './ProfileMenu/ProfileMenu'
const Navbar = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authData)

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const [category, setCategory] = useState('')
    const searchSubmitHandler = (e) => {
        const url = `/products/${keyword}?category=${category}`
        e.preventDefault();
        if (keyword.trim()) {
            navigate(url)
            console.log(url);
        } else {
            navigate(`/products`)
        }
    }

    const [showNavbarSidebar, setShowNavbarSidebar] = useState(false)
    useEffect(() => { }, [cartItems])

    return (
        <nav className='nav-container'>
            <div className='nav-upper'>
                <div className='nav-left'>
                    <div><span><FaTruck /></span>Free Shipping on orders above 2000Rs</div>
                    <div><span><HiShieldCheck /></span>Guaranteed Warranty on Products </div>
                    <div><span><TbScissors /></span>Up to 10% order cutoffs</div>
                </div>
                <div className='nav-right'>
                    <div>Knowledge Base</div>
                    <div>About Us </div>
                    <div>Blog</div>
                    <div>Contact Us</div>
                </div>
            </div>
            <div className='nav-lower'>
                <div className='nav-l-left'>
                    <Link to={'/'}> <span>Shop</span>Swift</Link>
                    <Input onSubmit={searchSubmitHandler} setKeyword={setKeyword} value={keyword} />

                </div>
                <div className='nav-l-right'>
                    <Link to='/account/me'>

                        {
                            user?.name ?
                                <div className='navbar-user' onClick={e => setShowNavbarSidebar(!showNavbarSidebar)} onMouseEnter={e => setShowNavbarSidebar(true)} >
                                    <img className='navbar_user-image' src={user.avatar.url} alt="" />

                                    {
                                        showNavbarSidebar &&
                                        <ProfileMenu setShowNavbarSidebar={setShowNavbarSidebar} user={user} />

                                    }
                                </div>
                                :
                                <>
                                    <RxPerson size={22} />
                                    <span>Sign In</span>
                                </>
                        }

                    </Link>
                    <Link to='/orders'><RiShoppingBag3Line size={22} />
                        <span >Quick Order</span>
                    </Link>
                    <Link to='/cart' className='cartSVG'>
                        <RiShoppingCartLine size={22} /><span>Cart</span>
                        {cartItems.length > 0 && <span className='cartItem'>{cartItems.length}</span>}
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar