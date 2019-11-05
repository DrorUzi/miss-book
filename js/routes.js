'use strict';

import bookApp from './pages/book-app.cmp.js'
import homePage from './pages/home-page.cmp.js'
import bookDetails from './pages/book-details.cmp.js';
import addReview from './pages/add-review.cmp.js';
import addBook from './pages/add-book.cmp.js';
import contact from './cmps/contact.cmp.js';
import team from './cmps/team.cmp.js';
import about from './cmps/about.cmp.js'




const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: about,
        children:[
            {
            path: 'team', 
            component: team
            },
            {
                path: 'contact',
                component: contact
            }
        ]
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:id',
        component: bookDetails,
    
    },
    {
        path: '/review/:id',
        component: addReview
    },
    {
        path: '/add',
        component: addBook
    },

]
const myRouter = new VueRouter({routes: myRoutes})

export default myRouter;