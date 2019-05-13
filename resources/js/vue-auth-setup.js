import Vue from 'vue';
import User from './utils/User';

Vue.use(require('@websanova/vue-auth'), {
    auth: require('./auth-driver'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    refreshData: {enabled: false},
    fetchData: {
        url: 'profile',
        method: 'GET', enabled: true,
        success({data}) {
            Vue.auth.user(new User(data));
        }
    },
    authRedirect: {path: '/login'},
    forbiddenRedirect: {name: '403'},
    notFoundRedirect: {name: '404'},
    parseUserData(data) {
        return data;
    }
});