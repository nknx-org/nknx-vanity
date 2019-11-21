<template>
  <header class="header">
    <div class="header__title">
      Get your own, custom NKN wallet address like
    </div>
    <div class="header__container">
      <span class="header__prefix">NKN</span>
      <ul class="header__list">
        <li v-for="item in items" :key="item" class="header__list-item">
          {{ item }}
        </li>
      </ul>
    </div>
    <h1 class="header__descr">with NKNxVanity</h1>
  </header>
</template>

<style lang="scss">
@import './Header';
</style>

<script>
export default {
  components: {},
  data: () => {
    return {
      items: [
        'NKNXXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg',
        'NKNChrisLhnz4KMf1Q4HmzJuvFWUYxdToQDa',
        'NKNIsGreatqpAJV4f1WxK14yNESaAAPVGHCA',
        'NKNLambonq1ikpj3Z5MxNjqNqgZBu7764ijq'
      ]
    }
  }
}
</script>
