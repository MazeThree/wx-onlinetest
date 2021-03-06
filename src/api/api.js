import axios from 'axios';

//qs用于序列化数组，解决无法传参问题
import qs from 'qs';

let base = '';

axios.defaults.headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}

var instance = axios.create({ 
    headers: {'content-type': 'application/x-www-form-urlencoded'} }); 

// 获取php后台返回数据

//post方法一定要用qs的方法序列化参数，否则参数无法传递

export const Login = params => { return instance.post('/api/wx/login.php',qs.stringify(params)).then(res=>res.data); };

// 班级管理
export const getclassinfo= params =>{return instance.get('/api/wx/class/getclassinfo.php').then(res=>res.data);};

//班级空间获取班级成员分页
export const getmember= params =>{return instance.post('/api/wx/class/getmember.php',qs.stringify(params)).then(res=>res.data);};

//班级空间班级信息
export const getclasslist= params =>{return instance.post('/api/wx/class/getclasslist.php',qs.stringify(params)).then(res=>res.data);};

//班级空间成员试卷
export const getuser_paper= params =>{return instance.post('/api/wx/class/user_paper.php',qs.stringify(params)).then(res=>res.data);};

//班级信息修改
export const classinfo= params =>{return instance.post('/api/wx/class-info/classinfo.php',qs.stringify(params)).then(res=>res.data);};

// 试卷管理
export const test_new = params => { return instance.post('/api/wx/testpaper/new.php',qs.stringify(params)).then(res=>res.data); };
export const getPaperList= params =>{return instance.get('/api/wx/testpaper/getpaperlist.php').then(res=>res.data);};

export const getpaperinfo = params =>{ return instance.post('/api/wx/testpaper/getinfo.php',qs.stringify(params)).then(res=>res.data);};

// 试卷试题添加
export const add_que = params =>{ return instance.post('/api/wx/testpaper/add_que.php',qs.stringify(params)).then(res=>res.data);};

// 更新试卷信息
export const update = params =>{ return instance.post('/api/wx/testpaper/updateinfo.php',qs.stringify(params)).then(res=>res.data);};

// 试题发布
export const paperissue = params =>{ return instance.post('/api/wx/testpaper/issue.php',qs.stringify(params)).then(res=>res.data);};

// 暂时无用
// export const getpapermember = params =>{ return instance.post('/api/wx/testpaper/getmember.php',qs.stringify(params)).then(res=>res.data);};

//班级管理
export const class_new = params => { return instance.post('/api/wx/class/new.php',qs.stringify(params)).then(res=>res.data); };
export const usernew = params => { return instance.post('/api/wx/user/new.php',qs.stringify(params)).then(res=>res.data); };

//试题导入
export const add_question = params =>{ return instance.post('/api/wx/question/add_que.php',qs.stringify(params)).then(res=>res.data);};

export const get_question = params =>{ return instance.post('/api/wx/question/get_que.php',qs.stringify(params)).then(res=>res.data);};

//mock模拟数据拦截
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };



export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserList1 = params => { return axios.get(`${base}/member/get`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };