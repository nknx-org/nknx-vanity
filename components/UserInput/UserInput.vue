<template>
  <Card id="go" width="half" class="user-input">
    <div :class="['error-text', inputError ? 'error-text_visible' : null]">
      The wallet format doesn't meet the NKN specification.
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <label class="form__label">
          Wallet Name
          <span
            v-tooltip="{
              content: 'Enter the digits you want to have in your wallet.',
              placement: 'top-center',
              offset: 5
            }"
            class="form__info fe fe-info"
          />
          <div class="form__input">
            <input
              :placeholder="'Enter wallet name'"
              v-model="name"
              :disabled="running"
              :class="inputError ? 'form__controller_error' : null"
              class="form__controller"
              type="text"
            />
          </div>
        </label>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12">
        <label class="form__label">
          Wallet Password
          <span
            v-tooltip="{
              content: 'Enter a password for your wallet file.',
              placement: 'top-center',
              offset: 5
            }"
            class="form__info fe fe-info"
          />
          <div class="form__input">
            <input
              :placeholder="'Enter wallet password'"
              v-model="password"
              :disabled="running"
              :type="!passwordVisible ? 'password' : 'text'"
              class="form__controller"
            />
            <span
              :class="[
                'form__input-action',
                passwordVisible ? 'fe fe-eye-off' : 'fe fe-eye'
              ]"
              @click="togglePasswordVisible"
            />
          </div>
        </label>
      </div>
    </div>
    <div class="user-input__example">
      Example:
      <span v-text="example.random"></span>
    </div>
    <div class="user-input__config">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="user-input__threads">
            <input
              @click="threads--"
              :disabled="running || threads <= 1"
              :class="
                threads <= 1 || running
                  ? 'user-input__threads-control_disabled'
                  : ''
              "
              type="button"
              class="user-input__threads-control"
              value="-"
            />
            <input
              @click="threads++"
              :disabled="running"
              :class="running ? 'user-input__threads-control_disabled' : ''"
              type="button"
              class="user-input__threads-control"
              value="+"
            />
            <span class="user-input__threads-descr"
              >{{ threads }} Threads
              <span
                v-if="threads === cores"
                v-tooltip="{
                  content: 'Recommended number of threads',
                  placement: 'top-center',
                  offset: 5
                }"
                class="form__info form__info_recommend fe fe-alert-octagon"
              />
              <span
                v-if="threads > cores"
                v-tooltip="{
                  content:
                    'Number of threads exceeds the number you have available on this PC',
                  placement: 'top-center',
                  offset: 5
                }"
                class="form__info form__info_warning fe fe-alert-octagon"
              />
            </span>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6">
          <div class="user-input__suffix">
            <span>Prefix</span>
            <label class="user-input__suffix-switch">
              <input
                v-model="suffix"
                :disabled="running"
                type="checkbox"
                class="user-input__suffix-control"
              />
              <span
                :class="running ? 'user-input__suffix-slider_disabled' : ''"
                class="user-input__suffix-slider"
              ></span>
            </label>
            <span>Suffix</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <Button
          :click="startGen"
          :disabled="isReady"
          :full="true"
          theme="success"
          class="user-input__button"
          >Generate</Button
        >
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6">
        <Button
          :click="stopGen"
          :full="true"
          :disabled="!running"
          theme="error"
          class="user-input__button"
          >Stop</Button
        >
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './UserInput.scss';
</style>

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
      password: '',
      passwordVisible: false
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
    togglePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
    },
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
