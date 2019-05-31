import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/components/User/module'
import show from '@/components/Show/module'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        show
    }
})