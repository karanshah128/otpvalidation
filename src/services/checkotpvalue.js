 import APIRouter  from '../Common/ApiRouter';
 import config from '../config'

const checkotpvalue =async(phoneNum)=>{
    var api = new APIRouter();
    const Request = { 
          "mobileNo": phoneNum
    };
    const APIURL = `${config.REACT_APP_API_URL}/CustomerService/sendOtp?mobileNo=${phoneNum}`
    try {
        console.log(`login request`,Request)
        const response = await api.postApiCalNewEncryption(Request, APIURL);
        console.log('login response',response)
        return response;

    } catch (error) {
        console.error(error);
    }


}



export default checkotpvalue;