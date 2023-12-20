import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './ProductList.css';


import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productActions.js';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';
import DashboardLayout from './DashboardLayout/DashboardLayout';



const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { token } = useSelector(state => state.authToken)
    const { error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id, token))
    }
    useEffect(() => {
        if (error) {

            dispatch(clearErrors())
        }

        if (deleteError) {

            dispatch(clearErrors())
        }

        if (isDeleted) {

            navigate('/admin/dashboard')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts(token))

    }, [dispatch, error, deleteError, navigate, isDeleted, token])

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
                    <Button onClick={e => deleteProductHandler(params?.id)}>
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
            <DashboardLayout title='All Products'>
                <div className="dashboard" >
                    <div className="productListContainer">
                        <div >
                            <DataGrid rows={rows} columns={columns} pageSize={5} pagination disableRowSelectionOnClick autoHeight sx={{ m: 2 }} />

                        </div>
                    </div>
                </div>
            </DashboardLayout>


        </>
    )
}

export default ProductList