<template>
  <Card class="result">
    <div class="result__qr">
      <div v-if="!ready" class="result__qr-placeholder"></div>
      <VueQr
        v-else
        :text="result.address"
        :size="100"
        :margin="0"
        class="result__qr-code"
      ></VueQr>
    </div>
    <div class="result__info">
      <div class="result__info-item">
        <span class="result__info-heading">{{ $t('address') }}:</span>
        {{ result.address }}
      </div>
      <div class="result__info-item">
        <span class="result__info-heading">{{ $t('privateKey') }}:</span>
        <span
          :class="reveal ? 'result__info-pk' : 'result__info-reveal'"
          v-if="ready"
          @click="reveal = true"
          v-text="reveal ? result.pk : $t('clickToReveal')"
        >
        </span>
      </div>
    </div>
    <Button
      :disabled="!ready"
      :click="saveWallet"
      class="result__button"
      theme="success"
      >{{ $t('downloadWallet') }}</Button
    >
  </Card>
</template>

<style lang="scss">
@import './Result.scss';
</style>

<script>
import VueQr from 'vue-qr'
import FileSaver from 'file-saver'
import Card from '~/components/Card/Card'
import Button from '~/components/Button/Button'

export default {
  components: {
    Card,
    VueQr,
    Button
  },
  props: {
    result: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      speed: 0,
      count: 0,
      reveal: false
    }
  },
  computed: {
    ready() {
      return this.result.address.length > 0
    }
  },
  watch: {
    ready() {
      this.reveal = false
    }
  },
  created() {},
  methods: {
    saveWallet() {
      const jsonWallet = JSON.stringify(this.result.wallet)
      const blob = new Blob([jsonWallet], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'wallet.json')
    }
  }
}
</script>
