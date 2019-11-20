<template>
  <div>
    <Header />
    <CardContainer>
      <Description />
      <UserInput
        :running="running"
        :cores="cores"
        @startGen="startGen"
        @stopGen="stopGen"
        @input-change="setInput"
      ></UserInput>
      <Statistics
        :name="input.name"
        :status="status"
        :first-tick="firstTick"
        :incrementCounter="incrementCounter"
        :time="time"
      ></Statistics>
      <Result :result="result" />
    </CardContainer>
    <Footer />
  </div>
</template>

<script>
import Worker from '~/assets/nknVanityWorker'

import CardContainer from '~/components/CardContainer/CardContainer'
import UserInput from '~/components/UserInput/UserInput'
import Statistics from '~/components/Statistics/Statistics'
import Result from '~/components/Result/Result'
import Footer from '~/components/Footer/Footer'
import Description from '~/components/Description/Description'
import Header from '~/components/Header/Header'

export default {
  components: {
    CardContainer,
    UserInput,
    Statistics,
    Result,
    Footer,
    Description,
    Header
  },
  data() {
    return {
      running: false,
      status: 'waiting',
      workers: [],
      threads: 4,
      cores: 0,
      result: { address: '', wallet: {}, pk: '' },
      input: { name: '', password: '', suffix: false },
      firstTick: null,
      error: null,
      incrementCounter: 0,
      time: 0,
      totalAttempts: [],
      startCollectTime: 0
    }
  },
  watch: {
    threads() {
      if (!this.running) {
        this.initWorkers()
      }
    }
  },
  created() {
    this.startCollectTime = this.$moment().valueOf()
    this.countCores()
    this.initWorkers()
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.benchmark = this.benchmark
  },
  methods: {
    countCores() {
      // Estimate number of cores on machine
      let cores = 0
      try {
        cores = parseInt(navigator.hardwareConcurrency, 10)
      } catch (err) {
        console.error(err)
      }
      if (cores) {
        this.cores = cores
      }
    },
    setInput(inputType, value) {
      switch (inputType) {
        case 'name':
          this.input.name = value
          break
        case 'threads':
          this.threads = value
          break
        case 'password':
          this.input.password = value
          break
        case 'suffix':
          this.input.suffix = value
      }
    },
    startGen() {
      if (!window.Worker) {
        this.error = 'workers_unsupported'
        return
      }
      this.clearResult()
      this.running = true
      for (let w = 0; w < this.workers.length; w++) {
        this.workers[w].postMessage(this.input)
      }
      this.status = 'running'
      this.firstTick = performance.now()
    },
    stopGen() {
      this.running = false
      this.status = 'stopped'
      for (let i = 0; i < this.workers.length; i++) {
        this.workers[i].terminate()
      }
      this.workers = []
      this.initWorkers()
    },
    parseWorkerMessage(message) {
      const { error, wallet, attempts } = message
      if (error) {
        this.stopGen()
        this.error = error
        this.status = 'error'
        console.error(this.error)
        return
      }
      if (wallet) {
        this.stopGen()
        return this.displayResult(message)
      }
      this.totalAttempts.push(attempts)

      const totalAttemptsLength = this.totalAttempts.length

      if (totalAttemptsLength === this.threads) {
        this.countIncrements(0)
        this.totalAttempts = []
        const start = this.startCollectTime
        const now = this.$moment().valueOf()
        this.time = this.$moment
          .duration(this.$moment(now).diff(this.$moment(start)))
          .asSeconds()
        this.startCollectTime = this.$moment().valueOf()
      }
    },
    displayResult(result) {
      const wallet = JSON.parse(result.wallet)
      const { pk } = result
      const currentAttempts = result.attempts
      this.countIncrements(currentAttempts)
      this.time = performance.now()
      this.result.wallet = wallet
      this.result.address = wallet.Address
      this.result.pk = pk
      this.status = 'addressFound'
    },
    clearResult() {
      this.result.address = ''
      this.incrementCounter = 0
      this.time = 0
      this.firstTick = 0
      this.totalAttempts = []
    },
    countIncrements(currentAttempts) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const totalAttempts = this.totalAttempts
      this.incrementCounter = totalAttempts.length
        ? totalAttempts.reduce(reducer)
        : currentAttempts
    },
    /**
     * Create missing workers, remove the unwanted ones.
     */
    initWorkers() {
      const self = this
      const threads = this.threads

      if (this.workers.length === threads) {
        return
      }
      // Remove unwanted workers
      if (this.workers.length > threads) {
        for (let w = threads; w < this.workers.length; w++) {
          this.workers[w].terminate()
        }
        this.workers = this.workers.slice(0, threads)
        return
      }
      // Create workers
      for (let w = this.workers.length; w < threads; w++) {
        try {
          this.workers[w] = new Worker()
          this.workers[w].onmessage = (event) => {
            self.parseWorkerMessage(event.data)
          }
        } catch (err) {
          this.error = err
          this.status = 'error'
          console.error(this.error)
          break
        }
      }
    },
    benchmark(max) {
      max = max || 2000
      const step = 100
      const worker = new Worker()
      let attempts = 0
      const times = []
      const durations = []
      const timeTaken = (a, d) => Math.round((1000 * a) / d)
      worker.onmessage = () => {
        times.push(performance.now())
        if (times.length === 1) {
          return
        }
        durations.push(times[times.length - 1] - times[times.length - 2])
        attempts += step
        console.log(
          attempts +
            '/' +
            max +
            '...' +
            timeTaken(step, durations[durations.length - 1]) +
            ' addr/s'
        )
        if (attempts >= max) {
          console.log(
            '\nSpeed range: ' +
              timeTaken(step, Math.max(...durations)) +
              ' - ' +
              timeTaken(step, Math.min(...durations)) +
              ' addr/s'
          )
          console.log(
            'Average: ' +
              timeTaken(attempts, times[times.length - 1] - times[0]) +
              ' addr/s'
          )
          worker.terminate()
        }
      }
      const input = { name: 'XXX', password: 'password', suffix: false }
      console.log('Starting benchmark with 1 core...')
      worker.postMessage(input)
    }
  }
}
</script>
