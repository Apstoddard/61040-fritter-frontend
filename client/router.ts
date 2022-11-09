import Vue from 'vue';
import VueRouter from 'vue-router';

import FreetsPage from './components/old/FreetsPage.vue';

import GlobalCategoriesPage from './components/Global/CategoriesPage.vue';
import GlobalCiclesPage from './components/Global/CirclesPage.vue';
import GlobalFreetsPage from './components/Global/FreetsPage.vue';

import MyCirclesCirclesPage from './components/MyCircles/CirclesPage.vue';
import MyCirclesFreetsPage from './components/MyCircles/FreetsPage.vue';
import MyCirclesFollowingFreetsPage from './components/MyCircles/FollowingFreetsPage.vue'

import AroundMePage from './components/AroundMe/AroundMePage.vue';

import UserPage from './components/User/UserPage.vue';

import NewFreetPage from './components/Freet/NewFreetPage.vue';
import NewCirclePage from './components/Circle/NewCirclePage.vue';

import AccountPage from './components/Account/AccountPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', redirect: '/global'},

  {path: '/global', name: 'Global', component: GlobalCategoriesPage},
  {path: '/global/category/:category', name: 'Global - Category', component: GlobalCiclesPage},
  {path: '/global/category/:category/circle/:circle', name: 'Global - Circle', component: GlobalFreetsPage},

  {path: '/my-circles', name: 'My Circles', component: MyCirclesCirclesPage},
  {path: '/my-circles/following', name: 'My Circles - Following', component: MyCirclesFollowingFreetsPage},
  {path: '/my-circles/circle/:circle', name: 'My Circles - Circle', component: MyCirclesFreetsPage},

  {path: '/around-me', name: 'Around Me', component: AroundMePage},

  {path: '/user/:username', name: 'User', component: UserPage},

  {path: '/new/freet', name: 'New Freet', component: NewFreetPage},
  {path: '/new/circle', name: 'New Circle', component: NewCirclePage},

  {path: '/account', name: 'Account', component: AccountPage},
  {path: '/login', name: 'Login', component: LoginPage},
  {path: '*', name: 'Not Found', component: NotFound}
];

const router = new VueRouter({routes});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
  if (router.app.$store) {
    if (to.name === 'Login' && router.app.$store.state.username) {
      next({name: 'Account'}); // Go to Account page if user navigates to Login and are signed in
      return;
    }

    if ((to.name === 'Account' || to.name === 'My Circles' || to.name === 'My Circles - Circle'|| to.name === 'My Circles - Following' || to.name === 'Around Me' || to.name === 'New Circle' || to.name === 'New Freet') && !router.app.$store.state.username) {
      next({name: 'Login'}); // Go to Login page if user navigates to Account and are not signed in
      return;
    }
  }

  next();
});

export default router;
