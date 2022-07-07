<template>
  <div class="input-wrap">
    <label>{{ name }}*</label>
    <div class="select-wrap">
    <select
      :name="name"
      :class="{
        'cl-tertiary' : options.length === 0,
        'empty': !selected
      }"
      class="form-control"
      id="reason"
      :autocomplete="autocomplete"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
    >
      <option disabled selected value v-if="!selected" />

      <option
        v-for="(option, key) in options"
        :key="key"
        :value="option"
        v-bind="{selected: option === selected}"
      >
        {{ option }}
      </option>
    </select>
  </div>
    

    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue'

export default {
  name: 'BaseSelect',
  components: {
    ValidationMessages
  },
  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    }
    // validations: {
    //   type: Array,
    //   default: () => []
    // }
  }
}
</script>