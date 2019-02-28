import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

//班级管理
import Classes from './views/class-manager/classes.vue'
import Create from './views/class-manager/create.vue'
import user from './views/class-manager/user.vue'
//账户管理
import userinfo from './views/user-manager/info.vue'
import usernew from './views/user-manager/new.vue'
import change from './views/user-manager/change.vue'

//试卷管理
import newpaper from './views/testpaper/new.vue'
import paperlist from './views/testpaper/paperlist.vue'
import paperdetial from './views/testpaper/detial.vue'


//试题管理
import Test from './views/test-manager/test.vue'
import Question  from './views/test-manager/test-question.vue'
import TestDetial  from './views/test-manager/test-detial.vue'

// 班级信息
import Classinfo from './views/class-info/class-info.vue'
import info from './views/class-info/info.vue'
import Member from './views/class-info/member.vue'
import class_test from './views/class-info/class-test.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/classinfo/:id',
        component:Classinfo,
        name: 'classinfo',
        children:[
            {path:'/info/:id', component: info, name: 'info'},
            {path:'/member/:id', component: Member, name: 'member'},
            {path:'/test/:id', component: class_test, name: 'test'},
        ],
        hidden:true
    },
    {
        path:'/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '主页',hidden:true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '班级管理',
        iconCls: 'el-icon-view',//图标样式class
        children: [
            { path: '/classes', component: Classes, name: '我管理的班级' },
            { path: '/create', component: Create, name: '创建班级' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    //该功能暂时不用
    // {
    //     path: '/',
    //     component: Home,
    //     name: '试卷批阅',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/userinfo', component: userinfo, name: '按班级批阅' },
    //         { path: '/usernew', component: usernew, name: '按分类批阅' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '试卷管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/newpaper', component: newpaper, name: '添加试卷' },
            { path: '/paperlist', component: paperlist, name: '已有试卷' },
            { path: '/paperdetial/:test_id', component: paperdetial, name: '试卷详情',hidden:true },
            // { path: '/user', component: user, name: '已发布试题卷' },
    
        ]
    },
    {
        path: '/',
        component: Home,
        name: '试题管理',
        iconCls: 'el-icon-edit',
        children: [
            { path: '/test', component: Test, name: '已有试题' },
            { path: '/test-question', component: Question, name: '添加试题' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '账户管理',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/userinfo', component: userinfo, name: '信息修改' },
            { path: '/usernew', component: usernew, name: '添加新用户' },
            { path: '/change', component:change, name: '用户管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;