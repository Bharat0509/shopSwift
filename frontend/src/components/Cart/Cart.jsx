import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addItemToCart, removeItemFromCart } from '../../actions/cartAction'
import './Cart.css'
import CardItemCard from './CartItemCard.jsx'



const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart)
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) return;
        dispatch(addItemToCart(id, newQty));
    }
    const deleteCartItem = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const decreaseQuantity = (id, quantity, stock) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return;
        dispatch(addItemToCart(id, newQty));
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }
    return (
        <>
            {
                cartItems.length === 0 ?
                    <div className="emptyCart">
                        <RemoveShoppingCartIcon />
                        <p>No Product in Your Cart</p>
                        <Link to={'/products'}>View  Products</Link>
                    </div> :


                    <>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>

                                <p>Quantity</p>

                                <p>Subtotal</p>
                            </div>
                            {
                                cartItems && cartItems.map((item) => (
                                    <div className="cartContainer" key={item.product}>
                                        <CardItemCard item={item} deleteCartItem={deleteCartItem} />
                                        <div className='cartInput'>
                                            <button onClick={() => decreaseQuantity(item.product, item.quantity, item.stock)}>-</button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>

                                        </div>
                                        <p className='cartSubtotal'>{`₹${item.price * item.quantity}`}</p>
                                    </div>
                                ))
                            }

                            <div className="cartGrossTotal">
                                <div></div>
                                <div className='cartGrossTotalBox'>
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                                </div>
                                <div></div>
                                <div className="checkOutBtn">
                                    <button onClick={checkOutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>

                    </>


            }
        </>
    )
}

export default Cart
