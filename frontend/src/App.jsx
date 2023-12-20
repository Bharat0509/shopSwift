import './App.css';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import UpdateProfile from './components/User/UpdateProfile.jsx';
import UpdatePassword from './components/User/UpdatePassword.jsx';
import ForgotPassword from './components/User/ForgotPassword.jsx';
import ResetPassword from './components/User/ResetPassword.jsx';
import Shipping from './components/Cart/Shipping.jsx';
import Cart from './components/Cart/Cart.jsx';
import ConfirmOrder from './components/Cart/ConfirmOrder.jsx';
import ProcessPayment from './components/Cart/ProcessPayment.jsx';
import PaymentSuccess from './components/Cart/PaymentSuccess.jsx';
import MyOrders from './components/Order/MyOrders.jsx';
import MyOrderDetails from './components/Order/MyOrderDetails.jsx';
import Dashboard from './components/Admin/Dashboard.jsx';
import ProductList from './components/Admin/ProductList.jsx';
import UpdateProduct from './components/Admin/UpdateProduct.jsx';
import OrderList from './components/Admin/OrderList.jsx';
import UpdateOrder from './components/Admin/UpdateOrder.jsx';
import UpdateUser from './components/Admin/UpdateUser.jsx';
import ProductReviews from './components/Admin/ProductReviews.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoutes, {
    ProtectedRoutesAdmin
} from './components/Routes/ProtectedRoute';
import NewProduct from './components/Admin/NewProduct';
import UserList from './components/Admin/UserList';
import ScrollToTop from './ScrollToTop';
import Navbar from './components/layout/Header/Navbar';
import MyAccountInfo from './components/User/MyAccountInfo';
import Sidebar from './components/Admin/Sidebar';
import Login from './components/User/Login';
import SignUp from './components/User/SignUp';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
import ProductDetail from './components/Product/ProductDetail/ProductDetail';


function App() {

    const dispatch = useDispatch()
    const [stripeApiKey, setStripeApiKey] = useState('');

    // async function getStripeApiKey() {
    //     const { data } = await AxiosClient.get(`/api/v1/stripeapikey`);
    //     setStripeApiKey(data.stripeApiKey);
    // }
    // useEffect(() => {
    //     dispatch(loadUser())
    // }, [dispatch]);
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <Routes>
                <Route
                    exact
                    path="/"
                    element={<Home />} />

                <Route
                    exact
                    path="/signUp"
                    element={<SignUp />} />
                <Route
                    exact
                    path="/login"
                    element={<Login />} />
                <Route
                    exact
                    path="/signOut"
                    element={<Login />} />
                <Route
                    exact
                    path="/password/forgot"
                    element={<ForgotPassword />}
                />
                <Route
                    exact
                    path="/password/reset/:token"
                    element={<ResetPassword />}
                />
                <Route
                    exact
                    path="/products"
                    element={<Products />} />
                <Route
                    exact
                    path="/product/:productId"
                    element={<ProductDetail />} />

                <Route
                    path="/products/:keyword"
                    element={<Products />} />

                <Route
                    path="/cart"
                    element={<Cart />} />


                {/* Protected User Routes */}
                <Route element={<ProtectedRoutes stripeKey={stripeApiKey} />}>
                    <Route exact path="/account" element={<Sidebar />} />
                    <Route
                        exact
                        path="/account/me"
                        element={<MyAccountInfo />}
                    />
                    <Route
                        exact
                        path="/me/update"
                        element={<UpdateProfile />}
                    />
                    <Route
                        exact
                        path="/password/update"
                        element={<UpdatePassword />}
                    />
                    <Route exact path="/shipping" element={<Shipping />} />
                    <Route
                        exact
                        path="/account/orders"
                        element={<MyOrders />} />
                    <Route
                        exact
                        path="/order/:id"
                        element={<MyOrderDetails />} />
                    <Route
                        exact
                        path="/order/confirm"
                        element={<ConfirmOrder />}
                    />
                    <Route
                        exact
                        path="/process/payment"
                        element={<ProcessPayment />}
                    />
                    <Route exact path="/success" element={<PaymentSuccess />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<ProtectedRoutesAdmin />}>
                    <Route
                        isAdmin={true}
                        path="/admin/dashboard"
                        element={<Dashboard />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/products"
                        element={<ProductList />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/product"
                        element={<NewProduct />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/product/:id"
                        element={<UpdateProduct />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/orders"
                        element={<OrderList />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/order/:id"
                        element={<UpdateOrder />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/users"
                        element={<UserList />}
                    />
                    <Route
                        isAdmin={true}
                        path="/admin/user/:id"
                        element={<UpdateUser />}
                    />

                    <Route
                        isAdmin={true}
                        path="/admin/reviews"
                        element={<ProductReviews />}
                    />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
