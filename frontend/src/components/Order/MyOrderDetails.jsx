
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetail } from '../../actions/newOrderAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import './MyOrdersDetails.css'

const MyOrderDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { token } = useSelector(state => state.authToken)



    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        dispatch(getOrderDetail(params.id, token))
    }, [dispatch, error, params.id, token])

    return (
        <>
            <MetaData title={"Order Details"} />
            {loading ? <Loader /> :
                <>
                    <div className='orderDetailsPage'>
                        <div className="orderDetailsContainer">
                            <h2 component="h1">
                                Order #{order && order._id}
                            </h2>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p>Name:</p>
                                    <span>{order.user && order.user.name}</span>
                                </div>
                                <div>
                                    <p>Phone:</p>
                                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                </div>
                                <div>
                                    <p>Address:</p>
                                    <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                                </div>

                            </div>
                            <h2>Payment</h2>
                            <div className="orderDetailsContainerBox">
                                <div>
                                    <p
                                        className={
                                            order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                ? "greenColor"
                                                : "redColor"
                                        }>
                                        {
                                            order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                ? "PAID"
                                                : "NOT PAID"
                                        }
                                    </p>

                                </div>
                                <div>
                                    <p>Amount:</p>
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                            </div>
                            <h2>Order Status</h2>
                            <div className="orderDetailsContainerBox">
                                <p
                                    className={
                                        order.paymentInfo && order.paymentInfo.status === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }>
                                    {
                                        order.orderStatus && order.orderStatus
                                    }
                                </p>
                            </div>
                        </div>
                        <div className='orderDetailsCartItems'>

                            <h2>Order Items:</h2>
                            <div className="orderDetailsCartItemsContainer">
                                {
                                    order.orderItems &&
                                    order.orderItems.map((item) => (
                                        <div key={item.product}>
                                            <img src={item.image} alt="Product" />
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            <span>{item.quantity} X ₹{item.price} =
                                                <b>₹{item.price * item.quantity}</b></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default MyOrderDetails
