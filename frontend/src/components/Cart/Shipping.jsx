import React, { useEffect, useState } from 'react'
import './Shipping.css'
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Country, State } from 'country-state-city'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../Cart/CheckoutSteps.jsx'
import { saveShippingInfo } from '../../actions/cartAction'
const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [phoneNo, setPhoneNo] = useState("")



    const shippingSubmit = (e) => {
        e.preventDefault();


        if (phoneNo.length !== 10) {
            alert.error("Phone Number is Not Valid ");
            return;
        }
        const data = { cartItems, address, city, state, country, pinCode, phoneNo }
        console.log(data);
        dispatch(saveShippingInfo(data))
        navigate('/order/confirm')

    }
    useEffect(() => {
        if (shippingInfo) {

            setAddress(shippingInfo?.address)
            setCity(shippingInfo?.city)
            setState(shippingInfo?.state)
            setCountry(shippingInfo?.country)
            setPinCode(shippingInfo?.pinCode)
            setPhoneNo(shippingInfo?.phoneNo)
        }
    }, [alert, shippingInfo])
    return (
        <>
            <MetaData title={`Shipping Info`} />

            <CheckoutSteps activeStep={0} />
            <div className='shippingContainer'>
                <div className='shippingBox'>
                    <h2><span className='profile-name'>Shipping Deta</span>ils</h2>

                    <form className='shippingForm' onSubmit={shippingSubmit} encType="multipart/form-data" >
                        <div className='shippingFormDiv'>
                            <HomeIcon />
                            <input
                                type='text'

                                placeholder='Address'
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                        </div>

                        <div className='shippingFormDiv'>
                            <LocationCityIcon />
                            <input
                                type='text'

                                placeholder='City'
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)} />
                        </div>

                        <div className='shippingFormDiv'>
                            <PinDropIcon />
                            <input
                                type='number'

                                placeholder='Pin Code'
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)} />
                        </div>

                        <div className='shippingFormDiv'>
                            <PhoneIcon />
                            <input
                                type='number'

                                placeholder='Phone Number'
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)} />
                        </div>

                        <div className='shippingFormDivLocations'>
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {
                                    Country &&
                                    Country.getAllCountries().map((country) => (<option value={country.isoCode} key={country.isoCode}>{country.name}</option>)

                                    )

                                }
                            </select>
                        </div>

                        {
                            country && (
                                <div className="">
                                    <TransferWithinAStationIcon />
                                    <select
                                        required
                                        value={state}
                                        onChange={e => setState(e.target.value)}
                                    >
                                        <option value={""}>State</option>
                                        {
                                            State &&
                                            State.getStatesOfCountry(country).map(allState => (<option value={allState.isoCode} key={allState.isoCode}>{allState.name}</option>))
                                        }
                                    </select>

                                </div>
                            )
                        }





                        <input type="submit" value="Continue" className='shippingBtn' />
                    </form>
                </div>
            </div >
        </>


    )
}

export default Shipping