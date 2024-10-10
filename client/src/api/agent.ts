import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

axios.defaults.baseURL = 'https://localhost:7295/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
  const token = store.getState().account.user?.token;
  
  if(token)
  {
    config.headers.Authorization = `Bearer ${token}`;
  }
   return config;
});

axios.interceptors.response.use(async response => {
  
   return response
},(error:AxiosError)=>{
    const {data,status} = error.response as AxiosResponse

    switch(status){
        case 200:
            toast.success("Success");
            break;
        case 400:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
         case 401:
            toast.error(data.title || 'Unauthorised');
            break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const request ={
    get : (url:string) => axios.get(url).then(responseBody),
    post : (url:string , body: object) => axios.post(url,body).then(responseBody),
    put : (url:string, body: object) => axios.put(url,body).then(responseBody),
    delete : (url:string) => axios.delete(url).then(responseBody),
};

const catalog ={
    lsit:() => request.get('products'),
    details:(id:string|undefined) =>request.get(`products/${id}`)
}

const basket = {
    get :()=> request.get('basket?buyerId=3e2048e4-44b8-4bb1-978b-5d4df95859b3'),
    addItem :(productId:number,quantity:number=1)=> request.post(`basket?productId=${productId}&quantity=${quantity}&buyerId=3e2048e4-44b8-4bb1-978b-5d4df95859b3`,{}),
    removeItem :(productId:number,quantity:number=1)=> request.delete(`basket?productId=${productId}&quantity=${quantity}&buyerId=3e2048e4-44b8-4bb1-978b-5d4df95859b3`)

}

const account = {
    login : (value:any) => request.post('account/login',value),
    register : (value:any) => request.post('account/register',value),
    currentUser : () => request.get('account/currentuser')

}

const agent = {
    catalog,
    basket,
    account
}


export default agent

