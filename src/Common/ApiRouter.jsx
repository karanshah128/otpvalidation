import axios from 'axios';
import React from "react";
import * as constants from './constant';
import config from '../config'


class APIRouter extends React.Component {

  async postApiCalNewEncryption(Request, ApiName) {

    var encryptedData = Request;
    var keyHeader = Request;
 
    try {

      const options = {
        headers: this.createHeaderForNewEncryption(keyHeader)
      };
      return await axios.post(ApiName,
        encodeURIComponent(encryptedData.toString()),
        options,
        { timeout: constants.apiTimeOut }).then(Response => {
          return (Response.data);
        }).catch(err => {
          let statusCode=  constants.getErrorMsgCode(err);
          return statusCode;
        })
      
    }
    catch (e) {
      let statusCode=     constants.getErrorMsgCode(e);
          return statusCode;
    }
  }

  createHeaderForNewEncryption(header) {
    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      Authorization: config.guid,
      transactionId:'react_interview'

     
    }

    return rquestHeader;
  }



 

}
export default (APIRouter);

