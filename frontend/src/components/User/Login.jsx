import React, { useCallback, useEffect, useState } from 'react'
import { TbArrowNarrowRight } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Login.css"
import { clearErrors, login, logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const queryParams = new URLSearchParams(location.search);

    console.log(queryParams)
    const { user, loading, error } = useSelector(state => state.authData)

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };
    useEffect(() => {

        if (user && user?.email) {
            const redirectTo = queryParams?.get("redirect") ?? "account/me"
            navigate(`/${redirectTo}`)
        }

        if (location.pathname === '/signOut') {
            dispatch(logout())
        }
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, location, location.pathname, navigate, queryParams, user])
    return (
        <div className='login_container'>
            <div className='left'>
                <div className='form_container'>

                    <h2 >Sign In</h2>
                    <p className='login-text'>
                        Great to see you again! <br /> Please sign in to access your account and explore the latest deals, track your orders, and enjoy a seamless shopping experience
                    </p>
                    <form className="sign_in-form">

                        <div className='input_box'>
                            <span>Email</span>
                            <input type="text" placeholder='abc@gmail.com' onChange={e => setLoginEmail(e.target.value)} />
                        </div>

                        <div className='input_box relative'>
                            <span>Password</span>
                            <Link className='absolute label-optional' to={'/password/forgot'}>Forgot Password?</Link>
                            <input type="password" placeholder='12345678' onChange={e => setLoginPassword(e.target.value)} />
                        </div>

                        <div>
                            <button className='btn btn-primary' onClick={loginSubmit} disabled={loading}>Sign In
                                <span>
                                    {
                                        loading ? <span className='loader' /> : <TbArrowNarrowRight size={18} />
                                    }
                                </span>
                            </button>
                        </div>
                    </form>
                    <p className='link'>I don't have an account ? <Link to={'/signup'}>Sign Up</Link></p>
                </div>
            </div>
            <div className='right'>
                <img src="signIn.png" alt="" />
            </div>
        </div>
    )
}

export default Login