<template>
  <CardContainer>
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
  </CardContainer>
</template>

<script>
import Worker from '~/assets/nknVanityWorker'

import CardContainer from '~/components/CardContainer/CardContainer'
import UserInput from '~/components/UserInput/UserInput'
import Statistics from '~/components/Statistics/Statistics'

export default {
  components: {
    CardContainer,
    UserInput,
    Statistics
  },
  data() {
    return {
      running: false,
      status: 'Waiting',
      workers: [],
      threads: 4,
      cores: 0,
      result: { address: '' },
      input: { name: '', password: '' },
      firstTick: null,
      error: null,
      incrementCounter: 0,
      time: 0,
      totalAttempts: []
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
    this.countCores()
    this.initWorkers()
    // eslint-disable-next-line nuxt/no-globals-in-created
    window.benchmark = this.benchmark
  },
  methods: {
    setInput(inputType, value) {
      // eslint-disable-next-line default-case
      switch (inputType) {
        case 'name':
          this.input.name = value
          break
        case 'threads':
          this.threads = value
          break
        case 'password':
          this.input.password = value
      }
    },
    displayResult(result) {
      const wallet = JSON.parse(result.wallet)
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const totalAttempts = this.totalAttempts
      this.incrementCounter = totalAttempts.length
        ? totalAttempts.reduce(reducer)
        : result.attempts
      this.time = performance.now()
      this.result.address = wallet.Address
      this.status = 'Address found'

      console.log(wallet)
    },
    clearResult() {
      this.result.address = ''
      this.incrementCounter = -1
      this.time = 0
    },
    /**
     * Create missing workers, remove the unwanted ones.
     */
    initWorkers() {
      const self = this
      if (this.workers.length === this.threads) {
        return
      }
      // Remove unwanted workers
      if (this.workers.length > this.threads) {
        for (let w = this.threads; w < this.workers.length; w++) {
          this.workers[w].terminate()
        }
        this.workers = this.workers.slice(0, this.threads)
        return
      }
      // Create workers
      for (let w = this.workers.length; w < this.threads; w++) {
        try {
          this.workers[w] = new Worker()
          this.workers[w].onmessage = (event) => {
            self.parseWorkerMessage(event.data)
          }
        } catch (err) {
          this.error = err
          this.status = 'Error'
          console.error(this.error)
          break
        }
      }
    },
    parseWorkerMessage(wallet) {
      if (wallet.error) {
        this.stopGen()
        this.error = wallet.error
        this.status = 'Error'
        console.error(this.error)
        return
      }
      if (wallet.wallet) {
        this.stopGen()
        return this.displayResult(wallet)
      }
      this.totalAttempts.push(wallet.attempts)

      if (this.totalAttempts.length === 1) {
        this.startCollectTime = performance.now()
      }

      if (this.totalAttempts.length === 10) {
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue
        this.incrementCounter = this.totalAttempts.reduce(reducer)

        this.totalAttempts = []
        this.time = (performance.now() - this.startCollectTime) / 1000 // to seconds
        this.startCollectTime = 0
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
      this.status = 'Running'
      this.firstTick = performance.now()
    },
    stopGen() {
      this.running = false
      this.status = 'Stopped'
      for (let i = 0; i < this.workers.length; i++) {
        this.workers[i].terminate()
      }
      this.workers = []
      this.initWorkers()
    },
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
        this.threads = this.cores
      }
    },
    benchmark(max) {
      max = max || 10000
      const step = 500
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
      const input = { name: 'XXX', password: 'password' }
      console.log('Starting benchmark with 1 core...')
      worker.postMessage(input)
    }
  }
}
</script>
