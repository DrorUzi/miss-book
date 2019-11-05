'use strict';

import bookService from '../services/book-service.js'
import {eventBus} from '../services/event-bus-service.js'


export default {
    template: `
        <div class="add-book">
            <form class="add-form" @submit.prevent="searchBook">
                <input class="input-name" ref="inputName" type="text" placeholder="Enter The Book Name" v-model="title" />
                <button class="add-btn">Search</button>
            </form>
            <div class="results">
                <ul class="res-list" v-if="resToShow">
                    <li class="found-book" v-for="book in resToShow">
                        <h3>{{book.title}}</h3>
                        <h4>Authors: {{...book.authors}}</h4>
                        <button @click="onAddBook(book.id)" class="add-btn">Add book</button>
                    </li>
                </ul>
            </div>
        </div>
    `,
    data(){
        return{
            title: '',
            resToShow:null,
            bookSearchRes: null
        }
    },
    methods :{
        searchBook(){
            bookService.getBooksByTitle(this.title)
            .then(books => {
                var bookInfo = books.map(book => {
                    return {
                        id: book.id,
                        title: book.volumeInfo.title,
                        authors: book.volumeInfo.authors
                    }
                })
                this.bookSearchRes = books
                this.resToShow = bookInfo
                this.title = ''
            })
            .catch(title => {
                const msg = {
                    txt: `Book is not exict`,
                    type: 'error'
                }
                eventBus.$emit('show-msg', msg);
            })
        },
        onAddBook(id){
            var selectedBook = this.bookSearchRes.find(book => book.id === id)
            bookService.addBook(selectedBook)
            .then(book => {
                const msg = {
                    txt: `${book.title} was added succefully`,
                    type: 'success'
                }
                eventBus.$emit('show-msg', msg);
                this.$router.push(`/book/${book.id}`)
            })
            .catch(title => {
                const msg = {
                    txt: `${title} is already exist`,
                    type: 'error'
                }
                eventBus.$emit('show-msg', msg);
            })
        }
    }
  

}