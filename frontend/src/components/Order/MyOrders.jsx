import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData.js'
import './MyOrders.css'

import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, myOrders } from '../../actions/newOrderAction'
import MenuLayout from '../User/MenuLayout/MenuLayout'
import { FiSearch } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

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
                <div className="orders_container">
                    <div className='orders_container-search'>
                        <FiSearch size={20} />
                        <input type="text" placeholder='Search' />
                    </div>
                    <div className='orders_container-list'>
                        <div className="orders_container-table">
                            <div className="table-row">
                                <div id='order_id' className='heading'>Order ID</div>
                                <div id='order_date' className='heading'>Date</div>
                                <div id='order_amount' className='heading'>Amount</div>
                                <div id='order_status' className='heading'>Status</div>
                                <div id='order_more' className='heading'>
                                    <BsThreeDotsVertical />
                                </div>
                            </div>

                            <div className="orders">
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>

                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>

                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>

                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className="table-row">
                                    <div id='order_id' className='order'>dzc7b4k6naea53k35dfd353</div>
                                    <div id='order_date' className='order'>23/12/2023</div>
                                    <div id='order_amount' className='order'>17,500</div>
                                    <div id='order_status' className='order'>Pending</div>
                                    <div id='order_more' >
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </MenuLayout>

        </>
    )
}

export default MyOrders