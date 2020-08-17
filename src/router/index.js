import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StuInfo from '../views/StuInfo'
import store from '../store'
import { checkToken } from '../utils/httpRequest'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/stuinfo',
        name: StuInfo,
        component: StuInfo
    }, {
        path: '/register',
        name: 'Register',
        component: () =>
            import ('../views/Register.vue')
    },
    // {
    //     path: '/myinfo',
    //     name: MyInfo,
    //     component: MyInfo
    // },
    {
        // 会匹配所有路径
        path: '*',
        name: 'H404',
        component: () =>
            import ('../views/H404.vue')
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    store.commit("getToken");
    let token = store.state.token;
    checkToken(token);
    let isAuthenticated = store.state.ans;
    console.log(isAuthenticated);
    if ((to.name !== "Login" /* || to.name !== "Register" */ ) && !isAuthenticated) next({ path: '/login' });
    else { next(); }
})
export default router