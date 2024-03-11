import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData.js'
import './MyOrders.css'

import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/newOrderAction'
import MenuLayout from '../User/MenuLayout/MenuLayout'
import OrderList from '../Utils/OrderList/OrderList.jsx'

const MyOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { loading, error, orders } = useSelector(state => state.myOrders)
    const { data, error } = useSelector(state => state.user)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (!data?.user?.email) navigate('/login?redirect=orders')

        dispatch(myOrders())

    }, [dispatch, error, navigate, data?.user?.email])
    return (
        <>
            <MetaData title={`${data.user?.name ?? "User"}-Orders`} />
            <MenuLayout title='My Orders'>
                {/* <OrderList ordersData={orders} /> */}
            </MenuLayout>

        </>
    )
}

export default MyOrders