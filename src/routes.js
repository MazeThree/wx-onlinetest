import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Classes from './views/class-manager/classes.vue'
import Create from './views/class-manager/create.vue'
import user from './views/class-manager/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'

//添加试题
import Test from './views/test-manager/test.vue'
import TestPaper from './views/test-manager/test-paper.vue'
import Question  from './views/test-manager/test-question.vue'
import TestDetial  from './views/test-manager/test-detial.vue'

// 班级信息
import Classinfo from './views/class-info/class-info.vue'
import info from './views/class-info/info.vue'
import Member from './views/class-info/member.vue'

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
        ],
        hidden:true
    },
    {
        path:'/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '主页',hidden:true }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '班级管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/classes', component: Classes, name: '我管理的班级' },
            { path: '/create', component: Create, name: '创建班级' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '试题批阅',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '按班级批阅' },
            { path: '/page5', component: Page5, name: '按分类批阅' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '试题管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/test', component: Test, name: '已有试题' },
            { path: '/test-paper', component: TestPaper, name: '添加试卷' },
            { path: '/test-question', component: Question, name: '添加试题' },
            { path: '/test-detial/:testid', component: TestDetial, name: '试卷详情',hidden:true},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '账户管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '信息修改' },
            { path: '/page5', component: Page5, name: '添加新用户' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;