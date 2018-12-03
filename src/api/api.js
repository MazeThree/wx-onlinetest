import axios from 'axios';
import qs from 'qs';

let base = '';

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}

var instance = axios.create({ 
    headers: {'content-type': 'application/x-www-form-urlencoded'} }); 

// 获取php后台返回数据
export const Login = params => { return instance.post('/api/wx/login.php',qs.stringify(params)).then(res=>res.data); };

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserList1 = params => { return axios.get(`${base}/member/get`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };