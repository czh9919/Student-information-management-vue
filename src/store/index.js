import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        ans: ''
    },
    mutations: {
        setToken(state, param) { //n is an Object 
            state.token = param.token;
            console.log(param.token);
            Cookie.set('token', param.token); //刷新后vuex的state会丢失，故使用Cookie
        },
        clearToken(state) {
            state.token = '';
            Cookie.remove('token');
        },
        getToken(state) {
            state.token = Cookie.get('token');
        },
        setAns(state, payload) {
            state.ans = payload.param;
        }
    },
    actions: {},
    modules: {}
})