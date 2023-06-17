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
import { TreeItem, TreeView } from '@material-ui/lab'
const Navbar = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authData)

    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) => {
        const url = `/products/${keyword}`
        e.preventDefault();
        if (keyword.trim()) {
            navigate(url)
            console.log(keyword);
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
                    <Link to='/account'>

                        {
                            user?.name ?
                                <div className='navbar-user' onClick={e => setShowNavbarSidebar(!showNavbarSidebar)} onMouseEnter={e => setShowNavbarSidebar(true)} >
                                    <span><RxPerson size={22} /></span>
                                    <span >Hi, {user.name} <RxTriangleDown style={{ display: 'inline-block' }} /></span>
                                    {
                                        showNavbarSidebar &&
                                        <div className='navbar-sidebar' onMouseLeave={e => setShowNavbarSidebar(false)}>
                                            <div className='navbar-sidebar-items'>

                                                <span className="title">My Account</span>

                                                <Link to="/account/me">
                                                    <p>
                                                        <InfoIcon />
                                                        Personal Information
                                                    </p>
                                                </Link>

                                                <Link to="/account/me">
                                                    <p>
                                                        <ChangeCircleIcon />
                                                        Change Password
                                                    </p>
                                                </Link>

                                                <Link to="/account/me">
                                                    <p>
                                                        <HistoryIcon />
                                                        Order History
                                                    </p>
                                                </Link>

                                            </div>
                                            <div className='navbar-sidebar-items'>
                                                <span className="title">Dashboard</span>
                                                <Link to="/admin/dashboard">
                                                    <p>
                                                        <DashboardIcon />
                                                        Analytics
                                                    </p>
                                                </Link>
                                                <div>
                                                    <TreeView
                                                        defaultCollapseIcon={<ExpandMoreIcon />}
                                                        defaultExpandIcon={<ImportExportIcon />}
                                                    >
                                                        <TreeItem nodeId="1" label="Products">
                                                            <Link to="/admin/products">
                                                                <TreeItem
                                                                    nodeId="2"
                                                                    label="All"
                                                                    icon={<PostAddIcon />}
                                                                />
                                                            </Link>

                                                            <Link to="/admin/product">
                                                                <TreeItem
                                                                    nodeId="3"
                                                                    label="Create"
                                                                    icon={<AddIcon />}
                                                                />
                                                            </Link>
                                                        </TreeItem>
                                                    </TreeView>
                                                </div>
                                                <Link to={'/admin/orders'}>
                                                    <p>
                                                        <ListAltIcon />
                                                        Orders
                                                    </p>
                                                </Link>
                                                <Link to={'/admin/users'}>
                                                    <p>
                                                        <PeopleIcon />
                                                        Users
                                                    </p>
                                                </Link>
                                                <Link to={'/admin/reviews'}>
                                                    <p>
                                                        <RateReviewIcon />
                                                        Reviews
                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                <>
                                    <span><RxPerson size={22} /></span>
                                    Sign In
                                </>
                        }

                    </Link>
                    <Link to='/orders'><span><RiShoppingBag3Line size={22} /></span>Quick Order </Link>
                    <Link to='/cart' className='cart'>
                        <span><RiShoppingCartLine size={22} /></span>Cart
                        {cartItems.length > 0 && <span className='cartItem'>{cartItems.length}</span>}
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar