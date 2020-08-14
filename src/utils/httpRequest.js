import axios from 'axios'
import store from '../store'
export function checkToken(token) {
    return axios({
        method: 'post',
        url: '/users/check',
        data: {
            token: token,
        }
    }).then(response => {
        store.commit({ type: "setAns", param: response.data })
    }).catch(response => {
        alert(response) //failed
        store.commit({ type: "setAns", param: false })
    })
}