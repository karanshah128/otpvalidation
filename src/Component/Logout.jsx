import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../Context';

import { confirmAlert } from "react-confirm-alert";
import "../css/react-confirm-alert.css";
//import checkLogout from '../../../services/checkLogout'
import { showAlert } from '../Common/CommonAlert';
import {  setAuth } from '../reducer/action'
import config from '../config';
import '../css/style.css'


const Logout = (props) => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
 const [{ userList }, dispatch] = useGlobalState();


  const logout = () => {
    confirmAlert({
      message: "Are you sure you want to  logout?",
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            callLogout()
          }
        },

        {
          label: 'No',
          onClick: () => { return false }
        },

      ]
    })


  }
  const callLogout = async () => {
         setLoading(true)
        localStorage.clear();
        dispatch(setAuth(false));
        history.replace('/')
        config.guid=''
        setLoading(false)
    
  }

  
  const entryMode = (e) => {
    history.push('/EntryMode')
  }

  return (
    <div>
      <header className="header black-bg " >
        <a className="logo"> Welcome  {userList}
        </a>

        <ul className="nav pull-right pos-rel">
          <a data-toggle="dropdown" style={{ "margin-right": "15px", "margin-top": "10px" }} onClick={(e) => entryMode(e)}> <h5 style={{ color: "red" }}>Entry Mode</h5> </a>
          <a data-toggle="dropdown" style={{ "margin-right": "15px", "margin-top": "10px" }} onClick={() => logout()}> <h5><i class="fa fa-power-off"></i></h5>
          </a>


        </ul>
      </header>



    </div>
  )

}


export default Logout