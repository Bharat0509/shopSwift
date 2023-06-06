
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ProcessPayment.css'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { Typography } from '@mui/material';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { clearErrors, createOrder } from '../../actions/newOrderAction'

const ProcessPayment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const payBtn = useRef(null)
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const alert = useAlert();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.authData)
    const { error } = useSelector(state => state.newOrder)
    const { token } = useSelector(state => state.authToken)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }


    //Order Data Creation 
    const order = {
        shippingInfo,
        orderItems: [...cartItems],
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingPrice,
        totalPrice: orderInfo.totalPrice,
    }



    //Payment Handler
    const paymentHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        try {
            const config = {
                Headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post("/api/v1/payment/process",
                { paymentData },
                config);
            const client_secret = data.client_secret

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email,
                            address: {
                                line1: shippingInfo.address,
                                city: shippingInfo.city,
                                state: shippingInfo.state,
                                postal_code: shippingInfo.pinCode,
                                country: shippingInfo.country
                            }
                        }
                    }

                })

            if (result.error) {
                payBtn.current.disabled = false;
                alert.error(result.error.message ? result.error.message : "Unexpected Error Encountered.")
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    order.token = token
                    console.log("TOKEN AT CREATION", order);
                    dispatch(createOrder(order))
                    navigate('/success')
                }
                else {
                    alert.error(result.error.message ? result.error.message : "Unexpected Error Encountered.")
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.data?.message ? error.data.message : "Unexpected Error Encountered.")

        }
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])
    return (
        <>
            <MetaData title={"Process Payment"} />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form onSubmit={paymentHandler} className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className='paymentInput' />
                    </div>

                    <div>
                        <EventIcon />
                        <CardExpiryElement className='paymentInput' />
                    </div>

                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className='paymentInput' />
                    </div>


                    <input
                        type="submit"
                        value={`Pay-₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    )
}

export default ProcessPayment