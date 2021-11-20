import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Authentication from '../components/page/Authentication.vue'
import SharePage from '../components/stepPage/SharePage.vue'
import FileLink from '../components/stepPage/FileLink.vue'
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/authentication',
        name: 'Authentication',
        component: Authentication
    },
    {
        path: '/sharePage/:id',
        name: 'SharePage',
        component: SharePage
    },
    {
        path: '/fileLink',
        name: 'FileLink',
        component: FileLink
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
