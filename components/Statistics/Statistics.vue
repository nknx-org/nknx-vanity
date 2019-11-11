<template>
  <div class="panel">
    <div>
      Difficulty: <span v-text="formatNum(difficulty)" class="output">1</span>
    </div>
    <div>
      Generated:
      <span
        v-text="formatNum(count) + (count === 1 ? ' address' : ' addresses')"
        class="output"
        >0 addresses</span
      >
      >
    </div>
    <div>
      50% probability:
      <span v-text="probability50" class="output">0 addresses</span>
    </div>
    <div>
      Speed: <span v-text="speed + ' addr/s'" class="output">0 addr/s</span>
    </div>
    <div>Status: <span v-text="status" class="output">Waiting</span></div>

    <!--Probability-->
    <div class="probability">
      <div :style="'width:' + probability + '%'" class="probability-bar"></div>
    </div>
    <div class="percentage">
      <h4 v-text="probability + '%'">0%</h4>
      <div>Probability</div>
    </div>
  </div>
</template>

<script>
import nknVanity from '~/plugins/nknVanity'

export default {
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
    probability50() {
      return this.inputError
        ? 'N/A'
        : this.formatNum(
            Math.floor(Math.log(0.5) / Math.log(1 - 1 / this.difficulty))
          ) + ' addresses'
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
      this.count += incr > 0 ? incr : -this.count
      this.speed =
        incr > 0
          ? Math.floor(
              (1000 * this.count) / (performance.now() - this.firstTick)
            )
          : 0
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
