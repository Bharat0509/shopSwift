import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Input from './Input/Input'
import { IoCartOutline } from "react-icons/io5";
import Avatar from '../../Avatar/Avatar'
import { BsFillBasket2Fill, BsPersonFill } from "react-icons/bs";
import { MdDoNotDisturb, MdLogout } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineLogin } from "react-icons/hi";
import { RxUpdate } from "react-icons/rx";
import Modal from '../../Utils/Modal'
const User_Menu = [
    {
        label: "My Account",
        icon: <BsPersonFill />,
        path: "/account/me"
    },
    {
        label: "My Orders",
        icon: <BsFillBasket2Fill />,
        path: "/account/orders"
    },
    {
        label: "Returns & Cancels",
        icon: <MdDoNotDisturb />,
        path: "/account/R&C"
    },
    {
        label: "My Ratings & Reviews",
        icon: <FaRegStar />,
        path: "/account/reviews"
    },
    {
        label: "My Wishlist",
        icon: <AiOutlineHeart />,
        path: "/account/wishlist"
    }
    , {
        label: "Change Password",
        icon: <RxUpdate />,
        path: "/account/password/change"
    }, {

        label: "Log out",
        icon: <MdLogout />,
        path: "/signOut"
    }
]
const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authData)

    const navigate = useNavigate();
    const [IsOpen, setIsOpen] = useState(false)
    const [keyword, setKeyword] = useState("")
    console.log(user);
    const searchSubmitHandler = (e) => {

        const url = `/products?product_name=${keyword}`
        e.preventDefault();
        if (keyword.trim()) {
            navigate(url)
        } else {
            navigate(`/products`)
        }
    }
    useEffect(() => { }, [cartItems])

    return (
        <nav className='nav-container'>

            <div className='nav'>
                <div className='nav-l-left'>
                    <Link to={'/'}> <span>Shop</span>Swift</Link>
                    <Input onSubmit={searchSubmitHandler} setKeyword={setKeyword} value={keyword} />

                </div>
                <div className='nav-l-right relative'>
                    <div onClick={e => setToggleMenu(!toggleMenu)} >
                        <Avatar user={user} />

                        {toggleMenu && (
                            user?.email ? <>
                                <div className="user-menus absolute">
                                    <div className='user-info'>
                                        <div>
                                            <Avatar user={user} size="xl" />
                                        </div>
                                        <div>
                                            <span>Hello,</span>
                                            <p>{user?.name ?? "Anonymous"}</p>
                                        </div>
                                    </div>
                                    {
                                        User_Menu.map(menu => <Link to={menu.path} className='user-menu'>
                                            {menu?.icon}
                                            {menu.label}</Link>)
                                    }
                                </div>
                            </> : <>
                                <div className="user-menus absolute">
                                    <Link to={"/login"} className='user-menu'>
                                        <HiOutlineLogin size={22} />
                                        Login</Link>
                                </div>
                            </>
                        )}

                    </div>
                    <Link to='/cart' className='cartSVG icon'>
                        <IoCartOutline size={24} /><span hidden>Cart</span>
                        {cartItems.length > 0 && <span className='cartItemCount'>{cartItems.length}</span>}
                    </Link>
                </div>
            </div>

        </nav>
    )
}

export default Navbar