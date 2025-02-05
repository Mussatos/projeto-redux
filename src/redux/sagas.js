import { all } from 'redux-saga/effects'
import user from './user/saga'

                //essa function com o * é como se fosse uma função assincrona 
export default function* rootSaga(){
    return yield all([
        user, 
    ])
}