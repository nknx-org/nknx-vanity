<template>
  <div id="input-panel" class="panel">
    <form :class="{ error: inputError }" @submit.prevent="startGen">
      <div class="error-text">Numbers and letters from A to F only</div>
      <input
        id="input"
        :placeholder="'placeholder'"
        v-model="name"
        :disabled="running"
        type="text"
      />
      <input
        :placeholder="'password'"
        v-model="password"
        :disabled="running"
        type="text"
      />
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
      </div>
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <input
            @click="startGen"
            :disabled="running || inputError || error || password.length <= 0"
            type="button"
            value="Generate"
            class="button-large hide-prerender"
          />
        </div>
        <div class="col-lg-6 col-sm-12">
          <input
            @click="stopGen"
            :disabled="!running"
            type="button"
            value="Stop"
            class="button-large"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import nknVanity from '~/plugins/nknVanity'

export default {
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
      password: '',
      addressTemplate: 'XXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg'
    }
  },
  computed: {
    inputError() {
      return !nknVanity.isValidName(this.name)
    },
    example() {
      if (this.inputError) {
        return 'N/A'
      }
      const chosen = this.name
      let random = 'NKN' + chosen
      random += this.addressTemplate.slice(chosen.length)

      return { random, chosen }
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
    }
  },
  methods: {
    startGen() {
      if (!this.running && !this.inputError && !this.error) {
        this.$emit('start')
      }
    },
    stopGen() {
      this.$emit('stop')
    }
  }
}
</script>
