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
    const { error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    useEffect(() => {
        if (error) {

            dispatch(clearErrors())
        }

        if (deleteError) {

            dispatch(clearErrors())
        }

        if (isDeleted) {

            navigate('/dashboard/products/all')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getAdminProducts())

    }, [dispatch, error, deleteError, navigate, isDeleted])

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 100,
            flex: 0.75

        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 100,
            flex: 0.75

        },
        {
            field: "stock",
            headerName: "Stock",
            // type: "number",
            minWidth: 75,
            flex: 0.5

        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 75,
            flex: 0.5

        }
        ,
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            sortable: false,
            flex: 0.5,
            renderCell: (params) =>

                <>
                    <Link to={`/dashboard/products/${params?.id}`}><EditIcon /></Link>
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
                            <DataGrid
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 8, page: 0 },
                                    },
                                }}
                                rows={rows}
                                columns={columns}
                                disableRowSelectionOnClick
                                autoHeight


                            />

                        </div>
                    </div>
                </div>
            </DashboardLayout>


        </>
    )
}

export default ProductList