import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../Layouts/MetaData'
import {clearAuthError, login} from "../../actions/userActions"
import { useDispatch, useSelector } from 'react-redux';
import {  toast } from 'react-toastify';
import {useLocation, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {loading, error, isAuthenticated} = useSelector(state => state.authState)
    // const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    useEffect(() => {

        if(isAuthenticated){
            navigate('/');
        }
        if(error){
           toast.error(error,{
            position:"bottom-center", 
            type: 'error',
            onOpen:  () =>{dispatch(clearAuthError)}
        });
        }
        return
    }, [error, isAuthenticated, dispatch, navigate])

    const submitHandler = async(e) => {
        e.preventDefault();
        dispatch(login({email, password}));
    }
    // console.log(email, password);
    return (
        <div>
            <MetaData title={`Login`} />
            <div className="products_heading">Login</div>

            <div className="row wrapper">
                <div className="col-10 col-lg-5" >
                    <form onSubmit={submitHandler} className="border"style={{marginTop:"0px"}} >
                        <h2 className="mb-3" style={{textAlign:"center"}}>Login to JAS Fruits and Vegetables</h2>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <Link to='/password/forgot' className="float-right mb-4">Forgot Password?</Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to='/register' className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
