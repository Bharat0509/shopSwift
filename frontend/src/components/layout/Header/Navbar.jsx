import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Navbar.css'
import { FaTruck, } from 'react-icons/fa'
import { TbScissors } from 'react-icons/tb'
import { HiShieldCheck } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { RxPerson } from 'react-icons/rx'
import { RiShoppingBag3Line, RiShoppingCartLine } from 'react-icons/ri'
import Input from './Input/Input'
const Navbar = () => {
    const { cartItems } = useSelector(state => state.cart)
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
            console.log(keyword);
        } else {
            navigate(`/products`)
        }
    }
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
                    <Link to='/account'><span><RxPerson size={22} /></span>Hi,Bharat</Link>
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