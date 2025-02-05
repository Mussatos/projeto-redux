import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    users: [],
    loading: false,
    userById: []
}
//Bom sempre seguir o padrão do Nome do arquivo + Slice
export const userSlice = createSlice({
    //Passando propriedades sobre a Slice
    name: "user",
    initialState,
    reducers: { //Ações que vão ter para atualizar o estado inicial do Slice
        createUser: (state, action) => {
            //State nada mais é do que o estado inicial (tudo que tem em initialState)
            //Action é a ação -> 'tipo' seria NOME PAI/NOME FUNCTION (user/createUser) 
            // e 'payload' nada mais é do que os itens que vao ser enviados para cá pela ação dispatch

            // if(action.payload.name.length <= 4){
            //     alert('Preencha o nome com mais de 4 caracteres');
            //     return { ...state }
            // } 
            // apenas um exemplo de que pode sim ter lógica dentro das reducers

            return {
                ...state, //fazendo isso ele mantem o estado
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: null,
                }
            }
        },

        logoutUser: (state) => {
            return {
                ...state,
                user: null,
            }
        },

        addAddress: (state, action) => {

            if (action.payload.location === '' || action.payload.number === '') {
                alert('Preencha todos os campos!');
                return { ...state };
            }

            if(state.user === null){
                alert('Faça o login para cadastrar um endereço!');
                return;
            }

            alert('Dados Atualizados!');

            return {
                ...state,
                user: {
                    ...state.user,
                    address: {
                        location: action.payload.location,
                        number: action.payload.number,
                    }
                }
            }
        },
        deleteAddress: (state) => {
            return {
                ...state,
                user: {
                    ...state.user,
                    address: null,
                }
            }
        },
        fetchUsers: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action) => {
            state.users = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action) => {
            console.log('Caiu na failure')
            console.log(action.payload)
            state.loading = false;
        },
        fetchUserById: (state) => {
            console.log('Chamou o fetchId no slice')
        },
        fetchUserByIdSuccess: (state, action) => {
            state.userById = action.payload;
            console.log('Id do User: ')
            console.log(action.payload);
        },
        fetchUserByIdFailure: (state, action) => {
            console.log('Caiu no failure id')
            console.log(action.payload);
        }
    }
})

export const { createUser, logoutUser, addAddress, deleteAddress, fetchUsers,
    fetchUsersSuccess, fetchUsersFailure, fetchUserById, fetchUserByIdSuccess,
    fetchUserByIdFailure
 } = userSlice.actions //exportando as ações
export default userSlice.reducer;

