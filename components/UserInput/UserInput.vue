<template>
  <Card width="half">
    <div :class="['error-text', inputError ? 'error-text_visible' : null]">
      {{ $t('genErrorDescr') }}
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <label class="form__label">
          {{ $t('walletName') }}
          <span
            v-tooltip="{
              content: $t('walletNameTooltip'),
              placement: 'top-center',
              offset: 5
            }"
            class="form__info fe fe-info"
          />
          <div class="form__input">
            <input
              :placeholder="'placeholder'"
              v-model="name"
              :disabled="running"
              class="form__controller"
              type="text"
            />
          </div>
        </label>
      </div>
      <div class="col-lg-6 col-sm-12">
        <label class="form__label">
          {{ $t('walletPassword') }}
          <span
            v-tooltip="{
              content: $t('walletPasswordTooltip'),
              placement: 'top-center',
              offset: 5
            }"
            class="form__info fe fe-info"
          />
          <div class="form__input">
            <input
              :placeholder="'password'"
              v-model="password"
              :disabled="running"
              class="form__controller"
              type="text"
            />
          </div>
        </label>
      </div>
    </div>
    <div class="example hide-prerender">
      E.g.&nbsp;
      <span class="monospace">
        <span v-text="example.random"></span>
      </span>
    </div>
    <div class="threads hide-prerender">
      <input
        @click="threads--"
        :disabled="running || threads <= 1"
        type="button"
        class="square-btn button-large"
        value="-"
      />
      <input
        @click="threads++"
        :disabled="running"
        type="button"
        class="square-btn arrow button-large"
        value="+"
      />
      <h4 v-text="threads"></h4>
      <span>threads</span>
      <span v-if="threads === cores">(recommended)</span>
      <div class="col-12 col-sm-6 col-md-12 col-lg-6">
        <span>Prefix</span>
        <label class="switch">
          <input v-model="suffix" :disabled="running" type="checkbox" />
          <span class="slider"></span>
        </label>
        <span>Suffix</span>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-sm-12">
        <Button
          :click="startGen"
          :disabled="isReady"
          :full="true"
          theme="success"
          >{{ $t('generate') }}</Button
        >
      </div>
      <div class="col-lg-6 col-sm-12">
        <Button
          :click="stopGen"
          :full="true"
          :disabled="!running"
          theme="error"
          >{{ $t('stop') }}</Button
        >
      </div>
    </div>
  </Card>
</template>

<script>
import nknVanity from '~/plugins/nknVanity'
import Card from '~/components/Card/Card'
import Button from '~/components/Button/Button'

export default {
  components: {
    Card,
    Button
  },
  props: {
    running: {
      type: Boolean,
      default: false
    },
    cores: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      threads: 4,
      name: '',
      error: false,
      suffix: false,
      password: ''
    }
  },
  computed: {
    inputError() {
      return !nknVanity.isValidName(this.name)
    },
    isReady() {
      return (
        this.running ||
        this.inputError ||
        this.error ||
        this.password.length <= 0
      )
    },
    example() {
      if (this.inputError) {
        return 'N/A'
      }
      const name = this.name
      const random = nknVanity.getAddressSample(name, this.suffix)
      return { random, name }
    }
  },
  watch: {
    name() {
      this.$emit('input-change', 'name', this.name)
    },
    password() {
      this.$emit('input-change', 'password', this.password)
    },
    threads() {
      this.$emit('input-change', 'threads', this.threads)
    },
    suffix() {
      this.$emit('input-change', 'suffix', this.suffix)
    }
  },
  methods: {
    startGen() {
      if (!this.running && !this.inputError && !this.error) {
        this.$emit('startGen')
      }
    },
    stopGen() {
      this.$emit('stopGen')
    }
  }
}
</script>
