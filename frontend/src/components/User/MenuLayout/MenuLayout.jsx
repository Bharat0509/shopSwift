import React from 'react'
import "./MenuLayout.css"

import { BsFillBasket2Fill, BsPersonFill } from "react-icons/bs";
import { MdDoNotDisturb, MdLogout, MdDashboard } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import Avatar from '../../Avatar/Avatar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const User_Menu = [
    {
        label: "My Account",
        icon: <BsPersonFill />,
        path: "/account/me"
    },
    {
        label: "My Dashboard",
        icon: <MdDashboard />,
        path: "/dashboard/analytics"
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
const MenuLayout = ({ children, title = "Personal Information" }) => {

    const { user } = useSelector(state => state.authData)

    return (
        <div className='menu_container'>
            <div className='sidebar'>

                <div className="user-menus">
                    <div className='user-info'>
                        <div>
                            <Avatar user={user} size="xl" />
                        </div>
                        <div>
                            <span>Hello,</span>
                            <p>{user.name ?? "Anonymous"}</p>
                        </div>
                    </div>
                    {
                        User_Menu.map(menu => (
                            <Link to={menu.path} className='user-menu'>
                                {menu?.icon}
                                {menu.label}
                            </Link>)
                        )
                    }
                </div>
            </div>
            <div className='children'>
                <h2>{title}</h2>
                <main>{children}</main>
            </div>
        </div>
    )
}

export default MenuLayout