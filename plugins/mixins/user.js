import Vue from 'vue';

import { mapGetters } from 'vuex';

const Validation = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapGetters({
                    user: 'a/user',
                    authenticated: 'a/authenticated'
                })
            }
        })
    }
}

Vue.use(Validation);
