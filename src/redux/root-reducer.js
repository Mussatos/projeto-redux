import { combineReducers } from 'redux'
import userSlice from './user/slice'

export default combineReducers({
    user: userSlice, //Caso tenha mais reducers pode ser importado aqui
    //cart: cartSlice - exemplo
})