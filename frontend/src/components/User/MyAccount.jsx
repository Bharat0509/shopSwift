
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import { TbLanguage, TbCalendarStats } from 'react-icons/tb'
import { BsFillPersonFill, BsGlobe } from 'react-icons/bs'
import { MdOutlineMarkEmailRead } from 'react-icons/md'
import "./MyAccount.css"


const MyAccount = () => {

    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector(state => state.authData)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated, user])
    return (
        <>
            {loading ? <Loader /> : <>
                <MetaData title={`${user?.name}'s Profile`} />
                <div className="myAccountContainer">
                    <h3><span>{user.name || "Your"}'s </span> Account</h3>

                    <div>

                        <div className='account-sidebar'>

                            <div className='p-info-name'>
                                <img src={user.avatar.url} alt={user.name} />
                                <div className='u-name'>
                                    {user.name}
                                </div>
                                <div className='u-email'>{user.email}</div>
                            </div>
                            <div>
                                <div className='v-container'>
                                    <span className='li-items'>Personal Information</span>
                                    <span className='li-items'>Billing & Payments</span>
                                    <span className='li-items'>Order History</span>
                                    <span className='li-items'>GiftCards </span>


                                </div>
                            </div>


                        </div>
                        <div className='sidebar-items'>
                            <div>
                                <h3>Personal Information</h3>
                                <p>Manage Your personal Information, including phone number and email address<br /> where you can be contactable</p>

                            </div>
                            <div className='personal-info'>
                                <div>
                                    <h4><span><BsFillPersonFill /></span> Full Name </h4>
                                    <p>{user.name}</p>
                                </div>
                                <div>
                                    <h4><span><MdOutlineMarkEmailRead /></span> Email</h4>
                                    <p>{user.email}</p>
                                </div>
                                <div>
                                    <h4><span><BsGlobe /></span> Country</h4>
                                    <p>India</p>
                                </div>
                                <div>
                                    <h4><span><TbLanguage /></span> Language</h4>
                                    <p>English</p>
                                </div>
                                <div>
                                    <h4><span><TbCalendarStats /></span> Joined on</h4>
                                    <p>{String(user.createdAt.substr(0, 10))}</p>
                                </div>
                                {/* <div>
                                    <Link to='orders'>My Orders</Link>
                                    <Link to='/password/update'>Change Password</Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>}

        </>
    )
}

export default MyAccount