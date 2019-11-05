'use strict';

import bookApp from './cmps/book-app.cmp.js'
import homePage from './cmps/home-page.cmp.js'
import bookDetails from './cmps/book-details.cmp.js';
import addReview from './cmps/add-review.cmp.js';

const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    // {
    //     path: '/about',
    //     component: about
    // },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:id',
        component: bookDetails
    },
    {
        path: '/review/:id',
        component: addReview
    },
  
]
const myRouter = new VueRouter({routes: myRoutes})

export default myRouter;