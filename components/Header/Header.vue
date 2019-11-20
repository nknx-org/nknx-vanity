<template>
  <header class="header">
    <div class="header__title">{{ $t('getCustomNknWalletAddress') }}</div>
    <div class="header__container">
      <ul class="header__list">
        <li v-for="item in items" :key="item" class="header__list-item">
          {{ item }}
        </li>
      </ul>
    </div>
    <h1 class="header__descr">{{ $t('poweredBy') }} NKNxVanity</h1>
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
        'NKNChrisGKct2cZuhSGW6xqiqeFVd5nJtAzg',
        'NKNSEXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg',
        'NKNLamboGKct2cZuhSGW6xqiqeFVd5nJtAzg'
      ]
    }
  }
}
</script>
