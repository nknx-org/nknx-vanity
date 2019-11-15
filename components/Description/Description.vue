<template>
  <Card class="description">
    <h2 class="description__heading">New Kind Of Heading</h2>
    <p class="description__text">
      Lorem ipsum dolor sit,
      <a
        href="https://explorer.nknx.org/"
        target="_blank"
        class="description__link"
        >new kind of link</a
      >
      amet consectetur adipisicing elit. Magni ullam mollitia harum accusantium
      vero veniam enim quod sapiente beatae molestiae inventore iusto,
      repudiandae commodi explicabo porro, vel eaque quo praesentium?
    </p>
  </Card>
</template>

<style lang="scss">
@import './Description';
</style>

<script>
import Card from '~/components/Card/Card'

export default {
  components: { Card },
  data: () => {
    return {}
  }
}
</script>
