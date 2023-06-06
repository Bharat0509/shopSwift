import React, { useEffect, useState } from 'react'
import './UpdatePassword.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearErrors, loadUser, updatePassword } from '../../actions/userActions'
import { useAlert } from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../constants/userContants'
import MetaData from '../layout/MetaData'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.authData)
    const { token } = useSelector(state => state.authToken);
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData()
        myForm.set('oldPassword', oldPassword)
        myForm.set('newPassword', newPassword)
        myForm.set('confirmPassword', confirmNewPassword)
        myForm.set("token", token)
        dispatch(updatePassword(myForm))

    }


    useEffect(() => {

        if (user) {

        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            alert.success("Password Updated Successfully!! ");
            dispatch(loadUser(token));
            navigate('/account');
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }

    }, [dispatch, alert, error, isUpdated, user, token, navigate])
    return (



        <>
            <MetaData title={`Change Password-${user?.name}`} />
            <div className='updatePasswordContainer'>
                <div className='updatePasswordBox'>
                    <h2><span className='profile-name'>Update Pro</span>file</h2>

                    <form className='updatePasswordForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                        <div className='loginPassword'>
                            <VpnKeyIcon />
                            <input
                                type='password'

                                placeholder='Old Password'
                                required
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)} />
                        </div>

                        <div className='loginPassword'>
                            <LockOpenIcon />
                            <input
                                type='password'

                                placeholder='New Password'
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </div>

                        <div className='loginPassword'>
                            <LockIcon />
                            <input
                                type='password'

                                placeholder='Confirm Password'
                                required
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>




                        <input type='submit' value='Change Password' className='updatePasswordBtn' disabled={loading ? true : false} />
                    </form>
                </div>
            </div>
        </>

    )
}

export default UpdatePassword