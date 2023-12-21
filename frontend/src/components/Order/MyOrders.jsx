import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData.js'
import './MyOrders.css'

import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/newOrderAction'
import MenuLayout from '../User/MenuLayout/MenuLayout'
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import OrderList from '../Utils/OrderList/OrderList.jsx'

const MyOrders = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const { user, isAuthenticated } = useSelector(state => state.authData)
    const { token } = useSelector(state => state.authToken)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }
        if (!isAuthenticated) navigate('/login?redirect=orders')

        dispatch(myOrders(token))

    }, [dispatch, error, user, isAuthenticated, navigate, token])
    return (
        <>
            <MetaData title={`${user?.name ?? "User"}-Orders`} />
            <MenuLayout title='My Orders'>
                <OrderList />
            </MenuLayout>

        </>
    )
}

export default MyOrders