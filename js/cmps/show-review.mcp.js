'use strict';

import bookService from '../services/book-service.js'

export default {
    props:['review','idx', 'id'],
    template: `
    <section class="list-container">
        <ul class="reviews-list"><h4 class="review-header">{{review.name}}:</h4>
        <li><h5>Reading Date: </h5>{{review.date}}</li>
        <li><h5>Rate: </h5>{{review.rate}}</li>
        <li><h5>Review: </h5>{{review.txt}}</li>
        <button @click="onDeleteReview" class="delete-btn">Delete</button>
        </ul>
    </section>
    `,
    methods:{
        onDeleteReview(){
            bookService.deleteReview(this.idx,this.id)
            .then(() => {
                const msg = {
                    txt: `The review succefully deleted`,
                    type: 'success'
                }
                eventBus.$emit('show-msg', msg);

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
    created(){
    }
}

