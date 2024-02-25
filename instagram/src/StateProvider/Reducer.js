export const initialState={
    user: JSON.parse(localStorage.getItem("user")) || null,
    isLoggedIn: false,
    username: JSON.parse(localStorage.getItem('username')) || null,
}

function reducer(state, action){
switch(action.type){
    case "LOG_IN":
        return{
            ...state,
            user: action.user,
            isLoggedIn: true
        }
    
    case 'LOG_OUT':
   return{
    ...state,
    user: null
   }

    default:
    return state
}
}
export default reducer;