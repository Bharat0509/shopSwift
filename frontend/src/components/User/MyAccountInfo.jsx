import { useEffect } from "react"
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import './MyAccountInfo.css'
import MenuLayout from "./MenuLayout/MenuLayout"

const MyAccountInfo = () => {
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector(state => state.authData)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated, user])
    return (

        <MenuLayout>
            <div className="account-info-container">

                <div className="user-img" title="Edit Profile Image">
                    <img src={user?.avatar?.url} alt={user.name} />
                    <span className="edit-img absolute" title="Edit Profile Image">
                        <TbEdit size={18} />
                    </span>
                </div>

                <div className='personal-info'>
                    <div>
                        <h4>Name </h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4> Gender </h4>
                        <div className="gender_radio">
                            <span>
                                <input id="gender_male" type="radio" name="gender" value={"Male"} checked />
                                <label htmlFor="gender_male">Male</label>
                            </span>

                            <span><input id="gender_female" type="radio" name="gender" value={"Female"} />
                                <label htmlFor="gender_female">Female</label></span>
                        </div>
                    </div>
                    <div>
                        <h4> Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4> Phone</h4>
                        <p>{user.phone ?? "+91 1234567899"}</p>
                    </div>
                    <div>
                        <h4>Country</h4>
                        <p>India </p>
                    </div>


                </div>

            </div>

        </MenuLayout>
    )
}

export default MyAccountInfo