import { useEffect } from "react"
import { BsFillPersonFill, BsGlobe } from "react-icons/bs"
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { TbCalendarStats, TbLanguage } from "react-icons/tb"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import './MyAccountInfo.css'
import Sidebar from "../Admin/Sidebar"

const MyAccountInfo = () => {
    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector(state => state.authData)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated, user])
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="account-info-container">
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

                </div>

            </div>

        </div>
    )
}

export default MyAccountInfo