'use strict';

export default {
    props: ['txt'],
    template: `
    <section class="text">
       <div class="new-text"><h3>Description: </h3>{{newText}}</div>
       <button class="read-btn" :class="{hidden : isMore || isLong}" @click="changeTxt">Read More</button>
       <button class="read-btn" :class="{hidden : !isMore || isLong}" @click="changeTxt">Read Less</button>
    </section>
    `,  
    data() {
        return {
            isMore: false,
          
        }
    },

    methods: {
        changeTxt() {
            this.isMore = !this.isMore
        }
    },
    computed: {
        isLong(){
            if(this.txt.length <= 100)
            return {hidden : true}
        },
        newText() {
            if (this.isMore)
                return this.txt
            else return this.txt.substring(0, 100);
        }
    },

}