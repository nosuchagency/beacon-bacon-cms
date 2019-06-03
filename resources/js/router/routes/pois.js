import Vue from 'vue';

export default [
    {
        path: '/pois',
        name: 'pois-index',
        component: require('../../views/pois'),
        meta: {
            auth: true
        },
        beforeEnter: (to, from, next) => {
            if (Vue.auth.user().hasPermissionTo('pois.read')) {
                next();
            } else {
                next({name: '403'});
            }
        }
    }
];
