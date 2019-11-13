<template>
  <Card width="half">
    <div class="statistics">
      <div class="statistics__item">
        {{ $t('difficulty') }}:
        <span v-text="formatNum(difficulty)" class="statistics__output">1</span>
      </div>
      <div class="statistics__item">
        {{ $t('generated') }}:
        <span class="statistics__output"
          >{{ formatNum(count) }} {{ $t('addresses') }}</span
        >
      </div>
      <div class="statistics__item">
        {{ $t('speed') }}:
        <span class="statistics__output">{{ speed }} {{ $t('addr/s') }}</span>
      </div>
      <div class="statistics__item">
        {{ $t('status') }}:
        <span class="statistics__output">{{ $t(status) }}</span>
      </div>

      <!--Probability-->
      <div class="statistics__item">
        <div class="statistics__probability">
          <div class="statistics__probability-wrapper">
            <div
              :style="'width:' + probability + '%'"
              class="statistics__probability-bar"
            ></div>
          </div>
          <div class="statistics__probability-percentage">
            {{ probability }}%
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style lang="scss">
@import './Statistics.scss';
</style>

<script>
import nknVanity from '~/plugins/nknVanity'
import Card from '~/components/Card/Card'

export default {
  components: {
    Card
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    firstTick: {
      type: Number,
      default: 0
    },
    incrementCounter: {
      type: Number,
      default: 0
    },
    time: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      speed: 0,
      count: 0
    }
  },
  computed: {
    difficulty() {
      return this.inputError ? 'N/A' : nknVanity.getVanityOutcomes(this.name)
    },
    probability() {
      return (
        Math.round(
          10000 * this.computeProbability(this.difficulty, this.count)
        ) / 100
      )
    }
  },
  watch: {
    name() {
      this.count = 0
    },
    time() {
      const incr = this.incrementCounter
      const time = this.time
      if (time === 0) {
        this.count = 0
      }
      this.count += incr
      this.speed = time !== 0 ? (incr / time).toFixed(0) : 0
    }
  },
  created() {},
  methods: {
    formatNum(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    },
    computeProbability(difficulty, attempts) {
      return 1 - (1 - 1 / difficulty) ** attempts
    }
  }
}
</script>
