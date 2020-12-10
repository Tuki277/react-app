import axios from 'axios'
import * as Config from './../constants/Config'

export default function callApi (method = 'GET', body) {
    return axios({
        method : method,
        url : `${Config.API_URL}`,
        data : body
    }).catch(err => {
        console.log(err)
    })
}