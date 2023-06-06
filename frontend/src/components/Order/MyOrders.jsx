import React, { useEffect } from 'react'
import './MyOrders.css'
import MetaData from '../layout/MetaData.js'
import Loader from '../layout/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import { Link, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { myOrders, clearErrors } from '../../actions/newOrderAction'

import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const { user, isAuthenticated } = useSelector(state => state.authData)
    const { token } = useSelector(state => state.authToken)

    const columns = [
        {
            field: "id", headerName: "Order ID", maxWidth: 400, flex: 0.20
        },
        {
            field: "status",
            headerName: "Status", maxWidth: 400, flex: 0.20,
            cellClassName: (params) => {
                return (params?.rows?.status === "Delivered" ? "greenColor" : "redColor")
            }


        },
        {
            field: 'itemQuantity',
            headerName: "Items Qty",
            type: "number", maxWidth: 300, flex: 0.20
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number", maxWidth: 250, flex: 0.20
        },
        {
            field: "actions",
            headerName: "Actions",
            maxWidth: 100,
            zIndex: 999,
            type: "number",

            sortable: true,

            renderCell: (params) => {
                return <Link tabIndex={params.tabIndex} href={`/order/${params?.rows?.id}`}><LaunchIcon /></Link>
            }
        }
    ];
    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemQuantity: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice

        })
    });

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
            {
                loading ?

                    <Loader />
                    :

                    <div className="myOrdersPage">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className='myOrdersTable'
                            autoHeight

                        />
                        <Typography id="myOrderHeading">{user?.name}'s Orders</Typography>
                    </div>

            }

        </>
    )
}

export default MyOrders