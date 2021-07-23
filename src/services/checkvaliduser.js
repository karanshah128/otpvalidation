import APIRouter  from '../Common/ApiRouter';
import config from '../config'

const checkvaliduser =async(phoneNum,otpvalue)=>{
   var api = new APIRouter();
   const Request = { 
         "mobileNo": phoneNum,
         "otp":otpvalue
   };
   const APIURL = `${config.REACT_APP_API_URL}/CustomerService/verifyOtp?mobileNo=${phoneNum}&otp=${otpvalue}&devicekey=abcd&isIos=false&source=react_interview`
   try {
       console.log(`valid user  request`,Request)
       const response = await api.postApiCalNewEncryption(Request, APIURL);
       console.log('valid user response',response)
       return response;

   } catch (error) {
       console.error(error);
   }


}



export default checkvaliduser;