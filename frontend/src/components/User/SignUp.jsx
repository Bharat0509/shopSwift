import React, { useEffect, useRef, useState } from 'react'
import { TbArrowNarrowRight } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./SignUp.css"
import { clearErrors, login, register } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
const SignUp = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector(
        (state) => state.authData
    );

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState(
        'https://img.icons8.com/?size=3000&id=ywULFSPkh4kI&format=png'
    );
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { name, email, password } = user;


    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        dispatch(register(myForm));
    };

    useEffect(() => {
        // const redirectLink = location.search
        //     ? location.search.split('=')[1]
        //     : 'account/me';

        // if (error) {
        //     toast.error(error);
        //     dispatch(clearErrors());
        // }
        // if (isAuthenticated) {
        //     navigate(`/${redirectLink}`);
        // } else {
        //     navigate('/login');
        // }
    }, [dispatch, error, isAuthenticated, navigate, location.search]);

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
        <div className='singup_container'>
            <div className='left'>
                <div className='form_container'>

                    <h2 >Join Us Today !</h2>
                    <p className='login-text'>
                        Unlock exclusive deals and personalized shopping. Create your account now for a seamless experience. Let's get started!
                    </p>
                    <form className="sign_in-form">

                        <div id="input_box" className='avatar'>

                            <label htmlFor="registerImage">
                                <img
                                    className="registerImage"
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                />
                            </label>

                            <input
                                id='registerImage'
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                                hidden
                            />
                        </div>
                        <div className='input_box'>
                            <span>Name</span>
                            <input type="text" placeholder='John Doe' onChange={e => setLoginEmail(e.target.value)} />
                        </div>

                        <div className='input_box'>
                            <span>Email</span>
                            <input type="text" placeholder='john2023@gmail.com' onChange={e => setLoginEmail(e.target.value)} />
                        </div>

                        <div className='input_box relative'>
                            <span>Password</span>
                            <input type="password" placeholder='john@12345678' onChange={e => setLoginPassword(e.target.value)} />
                        </div>

                        <div>
                            <button className='btn btn-primary' onClick={registerSubmit}>Sign Up
                                <span>
                                    {
                                        loading ? <span className='loader' /> : <TbArrowNarrowRight size={18} />
                                    }
                                </span>

                            </button>
                        </div>
                    </form>
                    <p className='link'>Already have an account ? <Link to={'/login'}>Sign In</Link></p>
                </div>
            </div>
            <div className='right'>
                <img src="/signUp.png" alt="" />
            </div>
        </div>
    )
}

export default SignUp