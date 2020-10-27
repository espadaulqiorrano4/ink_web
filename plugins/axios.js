import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


export default function({ $axios, store }) {
    $axios.onError(error => {
        if (error.response.status === 422) {
            store.dispatch('validation/setErrors', error.response.data.errors)
        }
        return Promise.reject(error)
    })

    $axios.onRequest(() => {
        store.dispatch('validation/clearErrors')
    })
}

const request = axios.create({
    baseURL: '/api',
})
Vue.use(VueAxios, request)