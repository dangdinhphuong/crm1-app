import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { ROUTE_NAME } from "@/constants/RouteNameConstant";


// const privateRoute: RouteRecordRaw['beforeEnter'] = function(to, from, next) {
//   if (!store.state.user.isAuthenticated) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// };

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/login',
    component: () => import('@/views/Auth/Login.vue'),
    name: ROUTE_NAME.LOGIN,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        name: ROUTE_NAME.HOME_PAGE,
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
