import axios from 'axios';
import qs from 'qs';

let base = '';

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}

var instance = axios.create({ 
    headers: {'content-type': 'application/x-www-form-urlencoded'} }); 

// 获取php后台返回数据
//

//一定要用qs的方法序列化参数，否则无法传递

export const Login = params => { return instance.post('/api/wx/login.php',qs.stringify(params)).then(res=>res.data); };

// 试卷管理
export const test_new = params => { return instance.post('/api/wx/testpaper/new.php',qs.stringify(params)).then(res=>res.data); };
export const getPaperList= params =>{return instance.get('/api/wx/testpaper/getpaperlist.php').then(res=>res.data);};

export const getpaperinfo = params =>{ return instance.post('/api/wx/testpaper/getinfo.php',qs.stringify(params)).then(res=>res.data);};

// 更新试卷信息
export const update = params =>{ return instance.post('/api/wx/testpaper/updateinfo.php',qs.stringify(params)).then(res=>res.data);};

export const getpapermember = params =>{ return instance.post('/api/wx/testpaper/getmember.php',qs.stringify(params)).then(res=>res.data);};


//试题管理
//班级管理
export const class_new = params => { return instance.post('/api/wx/class/new.php',qs.stringify(params)).then(res=>res.data); };
export const usernew = params => { return instance.post('/api/wx/user/new.php',qs.stringify(params)).then(res=>res.data); };




//mock模拟数据拦截
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getclassinfo = params => { return axios.get(`${base}/classes/get`, { params: params }); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserList1 = params => { return axios.get(`${base}/member/get`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };