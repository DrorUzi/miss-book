'use strict';

import longText from './long-text.cmp.js'
import bookService from '../services/book-service.js'
import showReview from './show-review.mcp.js'

export default {
    template: `
    <section class="book-details">
    <ul class="details-header" v-if="book">
            <li :class="{hidden : !isSale}"><img class="sale-icon" :src="isOnSale"></li>
            <li class="book-title">{{book.title}}</li>
            <li><h2>{{book.subtitle}}</h2></li>
    </ul>
    <ul class="details" v-if="book">
            <li class="width" v-for="author in book.authors "><h3>Author:</h3> {{author}}</li>
            <li class="width"><h3>Published at:</h3> {{book.publishedDate}}  {{publishedTime}}</li>
            <li class="width" v-for="category in book.categories"><h3>Categories: </h3>{{category}}</li>
            <li class="width"><h3>Page count: </h3>{{pageCount}}</li>            
            <li class="width"><h3>Language: </h3>{{book.language}}</li>
            <li class="width" :class="color" ><h3>Price</h3>{{book.listPrice.amount}} {{currencyIcon}}</li>
            <li class="width"><long-text :txt="book.description"></long-text></li>

        </ul>
        <ul class="reviews" v-if="book"><h3 :class="{hidden: book.reviews.length === 0}">Reviews:</h3>
            <h3 :class="{hidden : book.reviews.length !== 0}">No Reviews Yet</h3>
            <show-review :id="book.id" :idx="idx" :review="review" v-for="(review,idx) in book.reviews" :key="idx"></show-review>
            <router-link class="back-btn" :to="'/review/'+book.id" >Add a review</router-link>

        </ul>
    </section>
    `,
    data() {
        return {
            book: null,
            isSale: false
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
        }
    },
    computed: {
        publishedTime() {
            let date = this.book.publishedDate;
            if (date < 2009) return 'Veteran Book'
            if (date > 2009 && date < 2018) return 'New!'

        },
        isOnSale() {
            let isOnSale = this.book.listPrice.isOnSale
            if (isOnSale) {
                this.isSale = true; return 'img/sale.png'
            }
            else return ''
        },
        color() {
            if (this.book.listPrice.amount > 150)
                return { red: true }
            if (this.book.listPrice.amount < 20) return { green: true }
        },
        pageCount() {
            let pages = this.book.pageCount;
            if (pages > 500) return 'Long Reading';
            if (pages > 200) return 'Decent Reading';
            if (pages < 100) return 'Light Reading'
        },
        currencyIcon() {
            let currency = this.book.listPrice.currencyCode
            if (currency === 'EUR') return '€';
            if (currency === 'ILS') return '₪';
            if (currency === 'USD') return '$'

        },
    },
    components:{
        longText,
        showReview
    },
    created(){
        const bookId = this.$route.params.id;
        bookService.findBook(bookId)
            .then(book => this.book = book)
    }
}




