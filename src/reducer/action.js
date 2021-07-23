import * as actions from './actionTypes';






const setAuth =(payload)=> {
    return{
        type : actions.SET_AUTH,
        payload
    }
}


const  setUsersList =(payload)=>{
    return {
        type :actions.SET_USERS_LIST,
        payload
    }
}


export {
    setAuth,
    setUsersList,
  
}