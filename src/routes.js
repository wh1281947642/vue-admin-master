import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import MyVacTable from './views/nav1/MyVacTable.vue'
import MyAuditTable from './views/nav1/MyAuditTable.vue'
import MyVacRecordTable from './views/nav1/MyVacRecordTable.vue'
import MyAuditRecordTable from './views/nav1/MyAuditRecordTable.vue'
import applyVac from './views/nav1/applyVac.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

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
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '请假管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/applyVac', component: applyVac, name: '我要请假' },
            { path: '/MyVacTable', component: MyVacTable, name: '我正在申请的假' },
            { path: '/MyVacRecordTable', component: MyVacRecordTable, name: '我申请过的假' },
            { path: '/MyAuditTable', component: MyAuditTable, name: '待我审核的请假' },
            { path: '/MyAuditRecordTable', component: MyAuditRecordTable, name: '我的审核记录' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;