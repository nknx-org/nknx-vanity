<template>
  <CardContainer />
</template>

<script>
import nknVanity from '~/plugins/nknVanity'
import CardContainer from '~/components/CardContainer/CardContainer'

export default {
  components: {
    CardContainer
  },
  mounted() {
    console.log(nknVanity)
  }
}
</script>
