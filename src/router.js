import Vue from 'vue'
import Router from 'vue-router'
import total from './views/total.vue'
import unicos from './views/unicos.vue'

const routes = [
    {
        path:'/total',
        component: total, 
        name:'total'
    },
    {
        path:'/unicos',
        component: unicos, 
        name:'unicos'
    }
]

Vue.use(Router)

export default new Router(
    {
        routes
    }
)