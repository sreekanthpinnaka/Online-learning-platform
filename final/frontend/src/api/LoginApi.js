import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});
export const userId = payload =>api.post('/userId', payload);
export const SignUp = payload => api.post('/sign', payload);
export const LoginID = payload => api.post('/login', payload);
export  const createError = payload => api.post('/createError',payload);
export const createRoom = payload => api.post('/rooms', payload);
export const createdRoomdesc = payload => api.post('/createdRoomdesc', payload);
export const getdesc = payload => api.post('/getdesc', payload);

export const getRooms = payload => api.post('/getRooms',payload);
export const joinRoom =payload=> api.post('/joinRoom',payload);
export const joinRoom1= payload=> api.post('/joinRoom1',payload);
export const joinError=payload=>api.post('/joinError',payload)

const LoginApi = {
    SignUp,
    LoginID,
};

export const userIdApi ={
    userId,
};
export const SignUpApi = {
    SignUp,
    LoginID,
};
export const createRoomApi = {
    createRoom,
    createdRoomdesc,
    createError,getdesc
};
  
export const getRoomApi = {
    joinRoom,
    joinError,
    joinRoom1,
    getRooms,
};
export default LoginApi;