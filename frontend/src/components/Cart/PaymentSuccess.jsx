import React from 'react'
import './OrderSuccess.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const PaymentSuccess = () => {
    return (
        <div className="orderSucess">
            <CheckCircleIcon />
            <Typography>Your Order Has Been Placed Successfully !!</Typography>
            <Link to={'/order/me'}>View Your Orders</Link>
        </div>
    )
}

export default PaymentSuccess