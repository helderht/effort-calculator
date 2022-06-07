import {createRouter, createWebHistory} from 'vue-router'
import HomePage from './pages/Home.vue'
import FunctionPage from './pages/Function.vue'
import UseCasesPage from './pages/UseCases.vue'

const router=createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/functionp',
      name: 'functionp',
      component: FunctionPage
    },
    {
      path: '/usecasesp',
      name: 'usecasesp',
      component: UseCasesPage
    }
  ]
})

export default router