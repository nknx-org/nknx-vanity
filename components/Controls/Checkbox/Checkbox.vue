<template>
  <div class="checkbox">
    <input
      v-model="radioButtonValue"
      :checked="value"
      :name="name"
      class="checkbox__control"
      type="checkbox"
    />
    <label class="checkbox__label" />
    <span class="checkbox__text">
      <slot />
    </span>
  </div>
</template>

<style lang="scss">
@import './Checkbox.scss';
</style>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    radioButtonValue: {
      get() {
        return this.value
      },
      set() {
        this.$emit('change', this.label)
      }
    }
  }
}
</script>
