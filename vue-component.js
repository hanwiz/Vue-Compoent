Vue.component('no-ui-slider', {
    template: "<div :id='sliderId' :ref='sliderId'></div>",
    props: {
        sliderId: String,
        sliderConfig: Object,
        sliderValue: Array
    },

    data: function () {
        return {
            slider: null
        }
    },
    methods: {
        updateValue: function (value, handle) {
            this.$emit('update:sliderValue', value);
        }
    },
    mounted: function () {
        this.slider = this.$refs[this.sliderId];
        this.sliderConfig.start = this.sliderValue;

        noUiSlider.create(this.slider, this.sliderConfig);

        this.slider.noUiSlider.on('update', this.updateValue);
    }
});

Vue.component('percentage-input', {
    props: {
        value: {
            type: Number,
            default: 50
        },
        numberOnly: {
            type:Boolean,
            default: false
        },
        max: {
            type: Number,
            default: 100
        },
        min: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 10
        }
    },
    data: function () {
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
            this.$emit('update:value', this.counter);
        }
    },
    template: `<div class="mt-3 mb-3 number-input">
                <button @click="stepNumberInput(-step)" class="minus"></button>
                <input min="0" max="100" type="number" @change="validateInput(parseInt($event.target.value))"
                    v-bind:value="counter">
                <button @click="stepNumberInput(step)" :class="['plus', {'number-only' : numberOnly }]"></button>
                <div class="input-group-append" v-if="!numberOnly">
                        <span class="input-group-text">%</span>
                </div>
            </div>`
});

new Vue({
    el: '#test',
    data: {
        counter: [50, 50, 50],
        numbers: [1, 1, 1],
        sliderConfig: {
            step: 1,
            connect: true,
            range: {
                'min': [1],
                'max': [10]
            },
            pips: {
                mode: 'steps',
                values: [1, 10],
                filter: function (value, type) {
                    return value * 2 % 2 ? 0 : 1;
                },
                format: wNumb({
                    decimal: 1
                }),
                density: 100
            }
        },
        sliderValues: [[3, 6],[1,7], [2,5]],
    }
});
