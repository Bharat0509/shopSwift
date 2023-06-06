import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar'
import { DataGrid } from "@mui/x-data-grid"

import { clearErrors, deleteOrder, getAllOrders } from '../../actions/newOrderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';


const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
    const { error, orders } = useSelector(state => state.allOrders)
    const { error: deleteError, isDeleted } = useSelector(state => state.order)
    const { token } = useSelector(state => state.authToken)
    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id, token))
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success("Order Deleted Successfully");

            navigate('/admin/orders')
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(getAllOrders(token))

    }, [dispatch, alert, error, deleteError, navigate, isDeleted, token])

    const columns = [
        {
            field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 200,
            flex: .4,
            cellClassName: (params) => {
                return (params.row.status === "Delivered" ? "greenColor" : "redColor")
            }


        },
        {
            field: 'itemQty',
            headerName: "Items Qty",
            minWidth: 350,
            flex: .25
            ,

        },
        {
            field: "amount",
            headerName: "Amount",
            minWidth: 150,
            flex: 0.25
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 270,
            flex: 0.2,
            sortable: false,

            renderCell: (params) =>

                <>
                    <Link to={`/admin/order/${params.row.id}`}><EditIcon /></Link>
                    <Button onClick={e => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>

                </>

        }
    ]

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus
            })
        })


    return (
        <>

            <MetaData title={"All Orders - Admin"} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 className="productListHeading">All Products</h1>
                    <div style={{ width: '80vw' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableRowSelectionOnClick
                            autoHeight
                            sx={{ m: 2 }}
                        />

                    </div>
                </div>
            </div>


        </>
    )
}

export default OrderList