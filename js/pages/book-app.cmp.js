'use strict';

import bookService from '../services/book-service.js';
import bookFilter from  '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';
import bookList from '../cmps/book-list.cmp.js';



export default {
    template: `
    <section class="main-container" >
        <book-filter  @filtered="setFilter"></book-filter>
        <book-list v-if="books.length" :books="booksToShow"
          @selected="selectBook"></book-list>
    </section>
    `,
    data() {
        return {
        books: [],
        filterBy: null,
        selectedBook: null,
        isClicked: false
        }
    },
    methods: {
        selectBook(id) {
            this.isClicked = true
            bookService.findBook(id)
                .then(currBook => {
                    this.selectedBook = currBook
                })
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        closeModal() {
            this.isClicked = false;
        },

    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            let regex = new RegExp(`${this.filterBy.title}`, 'i');
            return this.books.filter(book => {
                return regex.test(book.title) &&
                    book.listPrice.amount > this.filterBy.fromPrice &&
                    book.listPrice.amount < this.filterBy.toPrice
            })
        }

    },
    created() {
       bookService.getBooks()
        .then(books => {
            this.books = books
            console.log(books);
        })
    },
    components: {
       bookDetails,
       bookList,
       bookFilter
    }
}




