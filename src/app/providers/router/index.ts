import { createRouter, createWebHistory } from "vue-router";
import HomePage from '@/pages/home'
import CartPage from '@/pages/cart'
import EditPage from '@/pages/edit'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },

    {
        path: '/cart',
        name: 'cart',
        component: CartPage
    },

    {
        path: '/edit',
        name: 'edit',
        component: EditPage
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})


