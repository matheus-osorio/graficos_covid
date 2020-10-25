import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
    state:{
        urls:{
            'visita': 'http://localhost:3003/visitas'
        }
    },
    getters:{
        link: (state) => (url, params) => {
            console.log('entrou')
            const chaves = Object.keys(params)
            const link = state.urls[url]
            return chaves.reduce((troca, chave) => {
                return troca.replace('{{'+ chave + '}}',params[chave])
            },link)
        }
    }
})