import { all, takeEvery, call, put, takeLatest } from 'redux-saga/effects'
import { fetchUsersSuccess, fetchUsersFailure, fetchUserByIdSuccess, fetchUserByIdFailure } from './slice'

import axios from 'axios';
//api users: https://jsonplaceholder.typicode.com/users/

//essa function com o * é como se fosse uma função assincrona 
function* fetchUsers(){
    try{                //yield = await
        const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users/');
        yield put(fetchUsersSuccess(response.data))
    }
    catch(error){
        yield put(fetchUsersFailure(error.message))
    }
}

function* fetchUserById(action){
    try{
        const userId = action.payload;
        const response = yield call(axios.get, `https://jsonplaceholder.typicode.com/users/${userId}`);
        yield put(fetchUserByIdSuccess(response.data))

    }
    catch(error){
        yield put(fetchUserByIdFailure(error.message));
    }
}

export default all([
    // takeEvery vai acionar a função toda vez que o usuário clicar no botão,
    // isso pode ocasionar em, caso o usuário seja impaciente, várias requisições
    // takeEvery('user/fetchUsers', fetchUsers)

    // Já o takeLatest pega apenas a ultima ação do usuário, ou seja, impede que ocorra
    // o problema do takeEvery
    takeLatest('user/fetchUsers', fetchUsers),
    takeLatest('user/fetchUserById', fetchUserById)
])