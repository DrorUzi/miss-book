'use strict';

import bookService from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
        <section class="add-review">
    <form class="form-review" @submit.prevent="submitForm">
            <input class="input-name" ref="inputName" type="text" placeholder="Enter Your Full Name" v-model="review.name" />
            <select class="select-rate" v-model.number="review.rate">
                <option hidden value="">Rate</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <label for="date">Read At: </label>
            <input class="input-date" id="date"type="date" v-model="review.date" >
            <textarea class="input-text" placeholder="Your Review" v-model="review.txt">
            </textarea>
            <button class="add-btn">Add</button>
        </form>
        </section>
    `,
    data() {
        return {
            book: null,
            review: {
                name: '',
                rate: '',
                txt: '',
                date: ''
            }

        }
    },
    methods: {
        submitForm() {
            bookService.addReview(this.book, this.review)
                .then(() => {
                    const msg = {
                        txt: `Hey ${this.review.name},
                    Your review sent succefully`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                    this.$router.push(`/book/${this.book.id}`)
                })
                .catch(err => {
                    const msg = {
                        txt: `There was a problem ${err}`,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        }
    },
    created() {
        bookService.findBook(this.$route.params.id)
            .then(currBook => {
                this.book = currBook
            })
    },
    mounted() {
        this.$refs.inputName.focus();

    },


}