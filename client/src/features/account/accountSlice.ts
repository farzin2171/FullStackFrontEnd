import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit"
import { User } from "../modules/User"
import { FieldValues } from "react-hook-form"
import agent from "../../api/agent"
import { router } from "../../router/router"
import { json } from "react-router-dom"
import { toast } from "react-toastify"

type AccountState = {
    user:User | null
}

const initialState : AccountState = {
    user :null
}

export const signInUser = createAsyncThunk<User , FieldValues>(
    'account/signInUser',
    async (data, thunkAPI)=>{
        try{
            const user = await agent.account.login(data);
            localStorage.setItem('user',JSON.stringify(user));
            return user;

        } catch(error:any){
            return thunkAPI.rejectWithValue({error:error.data});

        }

    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI)=> {
        console.log(JSON.parse(localStorage.getItem('user')!));

        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try{
            const user = await agent.account.currentUser();
            localStorage.setItem('user',JSON.stringify(user));
            return user;

        } catch(error:any){
            console.log(error);
            return thunkAPI.rejectWithValue({error:error.data});

        }
    },
    {
        condition :() => {
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name:'account',
    initialState,
    reducers :{
        signOut :(state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser : (state,action) => {
            state.user = action.payload;
        }
    },
    extraReducers:(builder => {
        builder.addCase(fetchCurrentUser.rejected,(state)=>{
             state.user = null;
             localStorage.removeItem('user');
             toast.error('Session expired');
             router.navigate('/');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state,action)=>{
            state.user = action.payload
        });

         builder.addMatcher(isAnyOf(signInUser.rejected),(state,action)=>{
            console.log(action.payload)
        });
    })
})

export const {signOut , setUser} = accountSlice.actions;