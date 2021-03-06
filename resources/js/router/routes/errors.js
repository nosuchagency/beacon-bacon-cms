export default [
    {
        path: '/401',
        name: '401',
        component: require('../../views/errors/401'),
    },
    {
        path: '/403',
        name: '403',
        component: require('../../views/errors/403'),
    },
    {
        name: '404',
        path: '/404',
        component: require('../../views/errors/404')
    },
    {
        path: '*',
        redirect: '404'
    }
];
