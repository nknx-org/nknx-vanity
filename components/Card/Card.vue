<template>
  <div
    :class="[
      width ? `card_width_${width}` : null,
      border ? `card_border` : null
    ]"
    class="card"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@import './Card.scss';
</style>

<script>
export default {
  components: {},
  props: {
    width: {
      type: String,
      default: 'full'
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
