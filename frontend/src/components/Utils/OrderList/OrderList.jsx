import React, { useState } from 'react'
import "./OrderList.css"
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const OrderList = ({ ordersData = [] }) => {
    return (
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
                            More
                        </div>
                    </div>

                    <div className="orders">
                        {ordersData.length > 0 ?
                            (ordersData?.map(order => <div key={order?._id} className="table-row">
                                <div id='order_id' className='order'>{order?._id}</div>
                                <div id='order_date' className='order'>{order?.date}</div>
                                <div id='order_amount' className='order'>{order?.totalAmount}</div>
                                <div id='order_status' className='order'>{order?.status}</div>
                                <OrderMoreOption />
                            </div>)
                            )
                            :
                            (
                                <p style={{ height: "25%", display: 'flex', alignItems: "center", justifyContent: "center" }}>No Orders Found!!</p>
                            )
                        }


                    </div>

                </div>
            </div>
        </div>
    )
}


const OrderMoreOption = () => {
    const [toggle, setToggle] = useState(false)
    return <div id='order_more' className='relative' onClick={e => setToggle(!toggle)} >
        <BsThreeDotsVertical />
        {toggle && <div className="order_more-options ">
            <Link to={`/order/${null ?? "orderId_not_found"}`}>View </Link>
            <Link to={'/order/delete/orderid'}>Delete </Link>
        </div>}
    </div>
}
export default OrderList