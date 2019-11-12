<template>
  <Card width="half">
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
        Speed: <span v-text="speed + ' addr/s'" class="output">0 addr/s</span>
      </div>
      <div>Status: <span v-text="status" class="output">Waiting</span></div>

      <!--Probability-->
      <div class="probability">
        <div
          :style="'width:' + probability + '%'"
          class="probability-bar"
        ></div>
      </div>
      <div class="percentage">
        <h4 v-text="probability + '%'">0%</h4>
        <div>Probability</div>
      </div>
    </div>
  </Card>
</template>

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
