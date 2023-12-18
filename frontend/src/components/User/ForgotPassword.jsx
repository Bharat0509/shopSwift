import React, { useEffect, useState } from 'react';
import './ForgotPassword.css';
import { useDispatch, useSelector } from 'react-redux';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { clearErrors, forgotPassword } from '../../actions/userActions';
import { toast } from 'react-hot-toast';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );
    const { token } = useSelector((state) => state.authToken);

    const [email, setEmail] = useState('');

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email);
        myForm.set('token', token);
        dispatch(forgotPassword(myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, toast, error, message, token]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title={`Forgot Password`} />
                    <div className="forgotPasswordContainer">
                        <div className="forgotPasswordBox">
                            <h2>
                                <span className="underline">Forgot Pass</span>
                                word
                            </h2>

                            <form
                                className="forgotPasswordForm"
                                onSubmit={forgotPasswordSubmit}
                            >
                                <div className="forgotPasswordEmail">
                                    <MailOutlineIcon />
                                    <input
                                        type="email"
                                        placeholder="email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value="Send A Reset Password Link "
                                    className="forgotPasswordBtn"
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

export default ForgotPassword;
