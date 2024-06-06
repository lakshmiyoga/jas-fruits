import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useState } from "react";
import { countries } from 'countries-list'
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../slices/cartSlice";
import StepsCheckOut from './StepsCheckOut';
import { toast } from 'react-toastify';
import MetaData from '../Layouts/MetaData';

export const validateShipping = (shippingInfo, navigate) => {
//    console.log(shippingInfo)
    if(
        !shippingInfo.address||
        !shippingInfo.city||
        !shippingInfo.state|| 
        !shippingInfo.country||
        !shippingInfo.phoneNo||
        !shippingInfo.postalCode
        ) {
            toast.error('Please fill the shipping Information', {
                position: 'bottom-center',
            });
            navigate('/shipping')
    }
    // console.log(shippingInfo)
} 




const Shipping = () => {

    const { shippingInfo = {} } = useSelector(state => state.cartState)

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country);
    const [state, setState] = useState(shippingInfo.state);
    // const [address, setAddress] = useState('');
    // const [city, setCity] = useState('');
    // const [phoneNo, setPhoneNo] = useState('');
    // const [postalCode, setPostalCode] = useState('');
    // const [country, setCountry] = useState('');
    // const [state, setState] = useState('');
    const countryList = Object.values(countries);
    const navigate = useNavigate();
    const dispatch = useDispatch();
console.log(address,city, phoneNo, postalCode, country, state)
// useEffect(()=>{

// },[])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({address, city, phoneNo, postalCode, country, state}))
        navigate('/order/confirm')
    }
console.log(shippingInfo)
    return (
        <Fragment>
            <MetaData title={'Confirm Order'} />
            <div className="products_heading">Shipping</div>
           <StepsCheckOut shipping/>
            <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="border" style={{marginTop:"0px"}}>
                    <h2 className="mb-4">Shipping Info</h2>
                    <div className="form-group">
                        <label htmlFor="address_field">Address</label>
                        <input
                            type="text"
                            id="address_field"
                            className="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city_field">City</label>
                        <input
                            type="text"
                            id="city_field"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlhtmlFor="phone_field">Phone No</label>
                        <input
                            type="phone"
                            id="phone_field"
                            className="form-control"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal_code_field">Postal Code</label>
                        <input
                            type="number"
                            id="postal_code_field"
                            className="form-control"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country_field">Country</label>
                        <select
                            id="country_field"
                            className="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        >
                            {countryList.map((country, i) => (

                                <option key={i} value={country.name}>
                                    {country.name}
                                </option>
                            ))
                            }

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlhtmlFor="state_field">State</label>
                        <input
                            type="text"
                            id="state_field"
                            className="form-control"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        id="shipping_btn"
                        type="submit"
                        className="btn btn-block py-3"
                    >
                        CONTINUE
                    </button>
                </form>
            </div>
        </div>

        </Fragment>
        
    )
}

export default Shipping
