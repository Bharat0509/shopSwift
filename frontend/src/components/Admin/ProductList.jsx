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


import { clearErrors, getAdminProducts, deleteProduct } from '../../actions/productActions.js'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';



const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();
    const { token } = useSelector(state => state.authToken)
    const { error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id, token))
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
            alert.success("Product Deleted Successfully");

            navigate('/admin/dashboard')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts(token))

    }, [dispatch, alert, error, deleteError, navigate, isDeleted])

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 200,
            flex: 0.5

        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1

        },
        {
            field: "stock",
            headerName: "Stock",
            // type: "number",
            minWidth: 150,
            flex: 0.3

        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 270,
            flex: 0.3

        }
        ,
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 150,
            sortable: false,
            flex: 0.3,
            renderCell: (params) =>

                <>
                    <Link to={`/admin/product/${params?.id}`}><EditIcon /></Link>
                    <Button onClick={e => deleteProductHandler(params.id)}>
                        <DeleteIcon />
                    </Button>

                </>

        }
    ]

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name
            })
        })


    return (
        <>

            <MetaData title={"All Products-Admin"} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 className="productListHeading">All Products</h1>
                    <div style={{ width: '80vw' }}>
                        <DataGrid rows={rows} columns={columns} pageSize={10} pagination disableRowSelectionOnClick autoHeight sx={{ m: 2 }} />

                    </div>
                </div>
            </div>


        </>
    )
}

export default ProductList