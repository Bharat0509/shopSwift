import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getOrderDetail, updateOrder } from '../../actions/newOrderAction'
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import './UpdateOrder.css'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'

const UpdateOrder = () => {
    const alert = useAlert();
    const params = useParams();
    const dispatch = useDispatch();
    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { token } = useSelector(state => state.authToken)
    const { error: updateError, isUpdated } = useSelector(state => state.order)

    const [Status, setStatus] = useState("")


    const UpdateOrderSubmitHandler = (e) => {

        e.preventDefault();
        const myForm = new FormData();

        myForm.set("status", Status)
        myForm.set("token", token)


        dispatch(updateOrder(params.id, myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors());

        }
        if (isUpdated) {
            alert.success("Order Updated Successfully")
            dispatch({ type: UPDATE_ORDER_RESET })
        }
        dispatch(getOrderDetail(params.id, token))
    }, [dispatch, alert, error, params.id, isUpdated, updateError, token])
    return (
        <> {
            loading ? <Loader /> :
                <>
                    <MetaData title={'Update Order'} />
                    <div className="dashboard">
                        <Sidebar />
                        <div className="newProductContainer">
                            <div className="confirmOrderPage">
                                <div>
                                    <div className='confirmShippingArea'>
                                        <Typography>Shipping Info</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p>Name:</p>
                                                <span>{order && order.user && order.user.name}</span>
                                            </div>
                                            <div>
                                                <p>Phone:</p>
                                                <span>{order && order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                            </div>
                                            <div>
                                                <p>Address:</p>
                                                <span>{order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}</span>
                                            </div>

                                        </div>

                                        <Typography>Payment</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <div>
                                                <p
                                                    className={order &&
                                                        order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                    }>
                                                    {order &&
                                                        order.paymentInfo && order.paymentInfo.status === "succeeded"
                                                        ? "PAID"
                                                        : "NOT PAID"
                                                    }
                                                </p>

                                            </div>
                                            <div>
                                                <p>Amount:</p>
                                                <span>{order && order.totalPrice && order.totalPrice}</span>
                                            </div>
                                        </div>
                                        <Typography >Order Status</Typography>
                                        <div className="orderDetailsContainerBox">
                                            <p
                                                className={order &&
                                                    order.orderStatus === "Delivered"
                                                    ? "greenColor"
                                                    : "redColor"
                                                }>
                                                {
                                                    order?.orderStatus

                                                }

                                            </p>
                                            <p
                                                className={order &&
                                                    order.orderStatus === "Delivered"
                                                    ? "greenColor"
                                                    : "redColor"
                                                }>


                                                {order && order.orderStatus === "Delivered" &&
                                                    "Date : " + order?.deliveredAt?.split('T')[0]

                                                }
                                            </p>
                                        </div>
                                        <Typography>Your Cart Items:</Typography>
                                        <div className="confirmCartItemsContainer">
                                            {order &&
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

                                <div style={{
                                    display: order &&
                                        order.orderStatus && order.orderStatus === "Delivered"
                                        ? "none" : ""
                                }}>
                                    <form
                                        className='createProductForm'
                                        encType='multipart/form-data'
                                        onSubmit={UpdateOrderSubmitHandler}
                                    >
                                        <h1>Process Order</h1>
                                        <div>
                                            <AccountTreeIcon />
                                            <select
                                                onChange={e => setStatus(e.target.value)}
                                                value={Status}
                                            >
                                                <option value="">Choose Order Status</option>
                                                {
                                                    order &&
                                                    order.orderStatus && order.orderStatus === "Processing" &&

                                                    <option value="Shipped">Shipped</option>
                                                }
                                                {
                                                    order &&
                                                    order.orderStatus && order.orderStatus === "Shipped"
                                                    &&
                                                    <option value="Delivered">Delivered</option>
                                                }

                                            </select>
                                        </div>
                                        <button
                                            className='createProductBtn'
                                            type='submit'
                                            disabled={(loading ? true : false) || (Status === "" ? true : false)}
                                        >
                                            Update
                                        </button>

                                    </form>

                                </div>


                            </div>

                        </div>
                    </div>
                    <div></div>
                </>
        }
        </>





    )
}

export default UpdateOrder