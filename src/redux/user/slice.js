import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: null,
}
            //Bom sempre seguir o padrão do Nome do arquivo + Slice
export const userSlice = createSlice({
    //Passando propriedades sobre a Slice
    name: "user",
    initialState,
    reducers: { //Ações que vão ter para atualizar o estado inicial do Slice
        createUser: (state, action) => {
                    //State nada mais é do que o estado inicial (tudo que tem em initialState)
                    //Action eu recebo qual o tipo e payload dela (payload nada mais é do que os itens que vao ser enviados para cá)
            
            return { 
                ...state, //fazendo isso ele mantem o estado
                user: {
                    name: action.payload.name,
                    email: action.payload.email,
                    address: {
                        location: 'Rua Santos Dumont',
                        number: '667',
                    },
                }
            }
        }
    }
})

export const { createUser } = userSlice.actions //exportando as ações
export default userSlice.reducer;

