import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { ROUTE_NAME } from "@/constants/RouteNameConstant";
import { authStore } from '@/stores/AuthStore';



const privateRoute: RouteRecordRaw['beforeEnter'] = function(to, from, next) {
  
  // const store = await loadAndGetStore();
  // console.log('loadAndGetStore',loadAndGetStore())
  // if (!store.state.user.isAuthenticated) {
  //   next({ name: 'login' });
  // } else {
  //   next();
  // }
};

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
        name: ROUTE_NAME.HOME,
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
  history: createWebHistory(),
  routes
})

const loadAndGetStore = async () => {
  const store:any = {};
  store.authStore = authStore();
  await store.authStore.loadUser();

  return store;
}

const isRouteExist = (routeName:any) => {
  return !!routeName;
}

// router.beforeEach(async (to, from, next) => {
//   const routeExist = isRouteExist(to.name);

//   const store = await loadAndGetStore();
//   const user = store.authStore.getUser; // Lấy thông tin người dùng từ authStore

//   const context = {
//     to,
//     from,
//     next,
//     store,
//     user // Thêm thông tin người dùng vào context
//   };
//   console.log('loadAndGetStore',context)
// });


export default router
