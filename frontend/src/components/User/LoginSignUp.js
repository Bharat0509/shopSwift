import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import './LoginSignUp.css';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { clearErrors, login, register } from '../../actions/userActions';
import { useAlert } from 'react-alert';

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.authData
    );

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(
        'https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-black-png-image_3918427.jpg'
    );
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = user;
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };

    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        console.log(myForm.avatar);
        dispatch(register(myForm));
    };

    useEffect(() => {
        const redirectLink = location.search
            ? location.search.split('=')[1]
            : 'account';

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirectLink}`);
        } else {
            navigate('/login');
        }
    }, [dispatch, error, isAuthenticated, navigate, alert, location.search]);
    const switchTab = (e, tab) => {
        if (tab === 'Login') {
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.add('shiftToRight');

            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }

        if (tab === 'Register') {
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');

            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft');
        }
    };
    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTab(e, 'Login')}>
                                        LOGIN
                                    </p>
                                    <p
                                        onClick={(e) =>
                                            switchTab(e, 'Register')
                                        }
                                    >
                                        REGISTER
                                    </p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>

                            <form
                                className="loginForm"
                                ref={loginTab}
                                onSubmit={loginSubmit}
                            >
                                <div className="loginEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) =>
                                            setLoginEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="loginPassword">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) =>
                                            setLoginPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <Link to="/password/forgot">
                                    {' '}
                                    Forget Password ?
                                </Link>
                                <input
                                    type="submit"
                                    value="Login"
                                    className="loginBtn"
                                />
                            </form>

                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <FaceIcon />
                                    <input
                                        type="text"
                                        placeholder="name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div className="signUpEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div className="signUpEmail">
                                    <LockOpenIcon />
                                    <input
                                        type="password"
                                        placeholder="password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div id="registerImage">
                                    <img
                                        className="registerPImage"
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                    />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Register"
                                    className="signUpBtn"
                                    disabled={loading ? true : false}
                                />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LoginSignUp;
