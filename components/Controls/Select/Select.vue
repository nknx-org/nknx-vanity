<template>
  <div :class="`select__wrapper_${type}`" class="select__wrapper">
    <div
      :class="[open ? 'select__button_active' : null, `select__button_${type}`]"
      @click="toggleSelect()"
      class="select__button"
    >
      {{ $t(activeItem) }}
      <span
        :class="open ? 'select__icon_open' : null"
        class="select__icon fe fe-chevron-down"
      />
    </div>

    <ul
      :class="[open ? 'select__list_open' : null, `select__list_${type}`]"
      class="select__list"
    >
      <li
        v-for="item in items"
        :key="item"
        :class="`select__item_${type}`"
        @click="setSelect(item), toggleSelect()"
        class="select__item"
      >
        {{ $t(item) }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import './Select.scss';
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    activeItem: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      open: false
    }
  },
  computed: {},
  methods: {
    toggleSelect() {
      this.open = !this.open
    },
    setSelect(item) {
      this.$emit('update', item)
    }
  }
}
</script>
