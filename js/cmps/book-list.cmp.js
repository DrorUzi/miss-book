'use strict';

import bookPreview from './book-preview.cmp.js'



export default {
    props: ['books'],
    template: `
    <section class="book-list-container">
        <div class="book-list">
            <router-link class="book-link" v-for="currBook in books" :to="'/book/'+currBook.id"                      :key="currBook.id">
                <book-preview :book="currBook">
                </book-preview>
            </router-link>
        </div>
    </section>
    `,
    components:{
        bookPreview
    },
   
}