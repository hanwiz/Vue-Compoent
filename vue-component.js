Vue.component('percentage-input', {
    props: {
        value: {
            type: Number,
            default: 50
        },
        max: {
            type: Number,
            default: 100
        },
        min: {
            type: Number,
            default: 0
        }
    },
    data: function() {
        return {
            counter: this.value
        }
    },
    methods: {
        stepNumberInput(step) {
            this.counter += step;
            this.validateInput(this.counter);
        },

        validateInput(val) {
            this.counter = val;
            if (this.counter < this.min) this.counter = this.min;
            if (this.counter > this.max) this.counter = this.max;
        }
    },
    watch: {
        counter: function(val) {
            this.$emit('update:value', val);
        }
    },
    template: `<div class="mt-3 mb-3 number-input">
                <button @click="stepNumberInput(-10)" class="minus"></button>
                <input min="0" max="100" type="number" @change="validateInput(parseInt($event.target.value))"
                    v-bind:value="value">
                <button @click="stepNumberInput(10)" class="plus"></button>
                <div class="input-group-append">
                    <span class="input-group-text">%</span>
                </div>
            </div>`
});

new Vue({
    el: '#test',
    data: {
        value: 50,
        counter: [50,50,50],
        searchText: ""
    }
});
