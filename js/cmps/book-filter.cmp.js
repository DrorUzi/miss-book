'use strict';

export default {
    template: `
    <section class="book-filter-container">
        <form class="form" @submit.prevent="getFilter">
            <input class="name" type="text" placeholder="Filter by Name" v-model="filterBy.title" />
            <span class="sort-price">Sort By Price</span>
            <input id="range" class="slider" type="range" min="0" max="200" step="1" v-model="filterBy.toPrice" /> 
            <span class="price">{{filterBy.toPrice}}</span>
            <button class="form-btn">Set Filter</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: 0,
                toPrice: 200

            }
        }
    },
    methods: {
        getFilter() {
            this.$emit('filtered', this.filterBy)
        }
    },
   


}