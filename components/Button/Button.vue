<template>
  <button
    v-if="type=='button'"
    class="button"
    :class="[theme ? `button_theme_${theme}` : null, full ? `button_full` : null, disabled === true ? 'button_disabled' : null]"
    @click="onClickButton"
  >
    <Unlock v-if="icon === 'unlock'" class="button__icon" />
    <slot />
  </button>
  <a
    v-else-if="type==='link'"
    :href="url"
    target="_blank"
    class="button"
    :class="[theme ? `button_theme_${theme}` : null, full ? `button_full` : null]"
  >    <Unlock v-if="icon === 'unlock'" class="button__icon" />

    <slot />
  </a>
  <nuxt-link
    v-else-if="type==='router'"
    :to="localePath(url)"
    class="button"
    :class="[theme ? `button_theme_${theme}` : null, full ? `button_full` : null]"
  >
    <Unlock v-if="icon === 'unlock'" class="button__icon" />
    <slot />
  </nuxt-link>
</template>

<style lang="scss">
@import "./Button";
</style>

<script>
import Unlock from '~/assets/icons/unlock.svg'

export default {
  components: { Unlock },
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    url: {
      type: String,
      default: ''
    },
    full: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    click: {
      type: Function,
      default: () => {}
    }
  },
  data: () => {
    return {}
  },
  mounted () {},
  methods: {
    onClickButton (event) {
      if (this.disabled !== true) {
        this.click()
      } else {
        event.preventDefault()
      }
    }
  }
}
</script>
