import React, { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';

import { clearErrors } from '../../actions/productActions.js';
import { deleteUser, getAllUsers } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userContants';

const UserList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {
        error: deleteError,
        isDeleted,
        message
    } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.authToken);

    const { error, users } = useSelector((state) => state.allUsers);
    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id, token));
    };
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);

            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success(message);

            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }
        dispatch(getAllUsers(token));
    }, [
        dispatch,
        alert,
        error,
        deleteError,
        navigate,
        isDeleted,
        message,
        token
    ]);

    const columns = [
        {
            field: 'id',
            headerName: 'User ID',
            minWidth: 200,
            flex: 0.5
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 350,
            flex: 0.5
        },
        {
            field: 'name',
            headerName: 'Name',
            // type: "number",
            minWidth: 150,
            flex: 0.5
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 270,
            flex: 0.3,
            cellClassName: (params) => {
                return params.row.role === 'admin' ? 'greenColor' : 'redColor';
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            flex: 0.3,
            renderCell: (params) => (
                <>
                    <Link to={`/admin/user/${params?.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={(e) => deleteUserHandler(params.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            )
        }
    ];

    const rows = [];

    users &&
        users.forEach((user) => {
            rows.push({
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            });
        });

    return (
        <>
            <MetaData title={'All Users - Admin'} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 className="productListHeading">All Users</h1>
                    <div style={{ width: '80vw' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={'10'}
                            pagination
                            disableRowSelectionOnClick
                            autoHeight
                            sx={{ m: 2 }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserList;
