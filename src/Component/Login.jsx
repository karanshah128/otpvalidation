import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../Context';
import { showAlert, showSuccess } from '../Common/CommonAlert';
import Spinner from 'react-spinner-material';
import checkotpvalue from '../services/checkotpvalue'
import '../css/style.css'
import '../css/main.css'
import { setAuth, setUsersList } from '../reducer/action'
import checkvaliduser from '../services/checkvaliduser';
import config from '../config'


const Login = () => {
    const [loading, setLoading] = useState(false)
    const [phoneNum, setPhoneNum] = useState('')
    const [passwords, setPasswords] = useState('')
    const [OTP, setOTP] = useState(false)
    const history = useHistory()
    const [{ }, dispatch] = useGlobalState();




    const onChangeNum = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {

            setPhoneNum(e.target.value)
        }

        setOTP(false)
        setPasswords('')
    }


    const onChangePassword = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {

        setPasswords(e.target.value)
        }
    }

    const handleKeyPress = (target) => {
        if (target.charCode == 13) {
            document.getElementById("loginbtn").click()
        }
    }

    const getOTP = async () => {
        const validFirstCharSet = "9876";
         if(phoneNum && validFirstCharSet.includes(phoneNum.toString().charAt(0)) && phoneNum.length === 10 ) {
        setLoading(true)
        
        try {
            const otpresponse = await checkotpvalue(phoneNum)
            if (otpresponse[201]) {
                showSuccess(otpresponse[201])
                setOTP(true)
            }
            else {
               
                showAlert("Something went wrong while generating otp")
                setOTP(false)

            }
        } catch (error) {
            console.error(error);
            showAlert('Unable to load server. Please retry!')
        } finally {
            setLoading(false)
        }
    }
    else{
        showAlert("Please enter the valid value.")
    }

    }


    const loginValid = async () => {
        if (phoneNum && passwords) {
           
            setLoading(true)
            const checkLoginResponse = await  checkvaliduser(phoneNum, passwords)
             setLoading(false)
         
                if (checkLoginResponse[201]) {
                    dispatch(setAuth(true));
                    dispatch(setUsersList(phoneNum))
                    config.guid = checkLoginResponse.Response.access_token
                    history.push('/EntryMode')
                }
                else {
                    showAlert(checkLoginResponse[400])
                    dispatch(setAuth(false));
                }
            
        }
        else {
            showAlert("Please enter the required fields.")
        }
    }
    return (
        <div id="login-page" className="back-image" style={{ height: "100vh" }}>
            <div className="container" >
                <form className="form-login animate" action="index.html" autocomplete="off">
                    <h2 className="form-login-heading">sign in now</h2>
                    <div className="login-wrap ">
                        <div className="spin">
                            <Spinner visible={loading} spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                        </div>

                        <label>Phone Number</label>
                        <input type="text" input value={phoneNum} id="Phone" onChange={(e) => onChangeNum(e)} className="form-control" placeholder="Phone Number" maxLength="10" autofocus="true" onKeyPress={(e) => handleKeyPress(e)}
                            readonly onfocus="this.removeAttribute('readonly');" autoComplete="off" />
                        <br />

                        {OTP ?
                            <div>
                                <label>OTP</label>
                                <input type="password" value={passwords} className="form-control" placeholder="OTP" id="userPassword" maxLength="4" onChange={(e) => onChangePassword(e)} onKeyPress={(e) => handleKeyPress(e)}
                                    readonly
                                    onfocus="this.removeAttribute('readonly');" autoComplete="off" />
                                <br />
                            </div>
                            : ''}


                        <div className="btns">
                            {OTP ? <button
                                type="button" className="btn btn-primary" id="loginbtn" style={{ width: "100%" }} onClick={(e) => loginValid(e)}
                                disabled={loading}>Login</button>
                                 :
                                <button
                                    type="button" className="btn btn-primary" id="loginbtn" style={{ width: "100%" }} onClick={(e) => getOTP(e)}
                                    disabled={loading}
                                >GENERATE OTP</button>}


                        </div>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login