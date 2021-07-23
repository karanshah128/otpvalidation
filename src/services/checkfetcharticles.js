import APIRouter  from '../Common/ApiRouter';
import config from '../config'

const checkfetcharticles =async()=>{
   var api = new APIRouter();
   const Request = { 
       
   };
   const APIURL = `${config.REACT_APP_API_URL}/ArticleService/getArticleListing`
   try {
       console.log(`article request`,Request)
       const response = await api.postApiCalNewEncryption(Request, APIURL);
       console.log('article  response',response)
       return response;

   } catch (error) {
       console.error(error);
   }


}



export default checkfetcharticles;