import React, { useEffect } from 'react'
import './MyOrders.css'
import MetaData from '../layout/MetaData.js'
import Loader from '../layout/Loader/Loader'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { myOrders, clearErrors } from '../../actions/newOrderAction'
import Sidebar from '../Admin/Sidebar'

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const { user, isAuthenticated } = useSelector(state => state.authData)
    const { token } = useSelector(state => state.authToken)



    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
        if (!isAuthenticated) navigate('/login?redirect=orders')

        dispatch(myOrders(token))

    }, [dispatch, alert, error, user, isAuthenticated, navigate, token])
    return (
        <>
            <MetaData title={`${user?.name}-Orders`} />
            <div className='dashboard'>
                <Sidebar />
                {
                    loading ?

                        <Loader />
                        :

                        <div className="myOrdersPage">

                            <div className='theading'>
                                <h3 className='p-id'>Product ID</h3>
                                <h3>Payment ID</h3>
                                <h3>Status</h3>
                                <h3>Amount</h3>
                                <h3>Actions</h3>
                            </div>
                            {orders && orders.length > 0 &&
                                orders.map(order =>
                                    <div className='tdata'>
                                        <h3 className='p-id'>{order._id}</h3>
                                        <h3>{order.paymentInfo.id}</h3>
                                        <h3 className={`${order.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}`}>{order.orderStatus}</h3>
                                        <h3>{order.totalPrice}</h3>
                                        <h3><Link to={`orders/${order._id}`}> View Details</Link></h3>
                                    </div>)
                            }



                        </div>

                }
            </div>

        </>
    )
}

export default MyOrders