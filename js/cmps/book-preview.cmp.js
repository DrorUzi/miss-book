'use strict';



export default {
    props: ['book'],
    template: `
    <section class="book-preview">
        <div class="book-card">
            <h2  class="book-header">{{book.title}}</h2>
            <img class="book-img" :src="book.thumbnail">
                <h3>
                    Price: {{book.listPrice.amount}}{{currencyIcon}}
                </h3>
        </div>
    </section>
    `,
    created() {
    },

    computed: {
        currencyIcon() {
            let currency = this.book.listPrice.currencyCode
            if (currency === 'EUR') return '€';
            if (currency === 'ILS') return '₪';
            if (currency === 'USD') return '$';

        }

    },

}

