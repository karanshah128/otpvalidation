import initialState from './initialState';
import * as actions from './actionTypes';

const reducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
       

        case actions.SET_AUTH: {
            return {
                ...state,
                isAuthenticated: action.payload
            }
        }

        case actions.SET_USERS_LIST: {
            return {
                ...state,
                userList: action.payload
            }
        }


   


        default: {
            return state;
        }
    }
}

export default reducer;