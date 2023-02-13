import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import CartView from '../views/CartView.vue'
import ProductView from '../views/SingleProductView.vue'
import ProductManagementDashboardView from '../views/ProductManagementDashboardView.vue'
import ShopView from '../views/ShopView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView,
    },
    {
      path: '/shop',
      name: 'Shop',
      component: ShopView,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: CartView,
    },
    {
      path: '/product/:id',
      name: 'Product',
      component: ProductView,
    },
    {
      path: '/productManagementDashboard',
      name: 'Product Management Dashboard',
      component: ProductManagementDashboardView,
    },
  ],
})

export default router
