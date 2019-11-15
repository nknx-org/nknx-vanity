<template>
  <Card width="half" class="user-input">
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
              :placeholder="$t('enterWalletName')"
              v-model="name"
              :disabled="running"
              :class="inputError ? 'form__controller_error' : null"
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
              :placeholder="$t('enterWalletPassword')"
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
      {{ $t('example') }}:
      <span v-text="example.random"></span>
    </div>
    <div class="user-input__config">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-12 col-lg-6">
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
              >{{ threads }} {{ $t('threads') }}
              <span
                v-if="threads === cores"
                v-tooltip="{
                  content: $t('threadsRecommendedTooltip'),
                  placement: 'top-center',
                  offset: 5
                }"
                class="form__info form__info_recommend fe fe-alert-octagon"
              />
              <span
                v-if="threads > cores"
                v-tooltip="{
                  content: $t('threadsWarningTooltip'),
                  placement: 'top-center',
                  offset: 5
                }"
                class="form__info form__info_warning fe fe-alert-octagon"
              />
            </span>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-12 col-lg-6">
          <div class="user-input__suffix">
            <span>{{ $t('prefix') }}</span>
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
            <span>{{ $t('suffix') }}</span>
          </div>
        </div>
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
