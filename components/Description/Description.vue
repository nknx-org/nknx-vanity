<template>
  <Card class="description">
    <p class="description__text">
      NKNxVanity is an open source tool using your web browser to generate NKN
      vanity addresses. Enter a short prefix/suffix of your choice, and click
      'generate' to start.
    </p>
    <div
      class="col-lg-12"
      style="text-align: -webkit-center; margin: 16px 0 18px"
    >
      <button class="button user-input__button button_theme_success">
        No more reading - let's go!
      </button>
    </div>

    <h2 class="description__heading">What's a vanity address?</h2>
    <p class="description__text">
      A vanity address is an address which part of it is chosen by yourself,
      making it look less random. Examples:
      NKNXXXhzGKct2cZuhSGW6xqiqeFVd5nJtAzg, or
      NKNGW6hzGKct2cZuhSGW6xqiqeFVd5nJtXXX
    </p>
    <h2 class="description__heading">How it works</h2>
    <p class="description__text">
      Enter the prefix/suffix of your choice, and click ‘generate’ to start.
      Your browser will generate lots of random addresses until one matches your
      input. Once an address is found, you can reveal the private key, or click
      the 'Download wallet' button to download a password-encrypted wallet file.
      You can increase the number of working threads to reach higher speeds, or
      decrease it if you computer struggles. A little indicator shows you if you
      match or exceed the numbers of threads available on your device.
    </p>
    <h2 class="description__heading">Security</h2>
    <p class="description__text">
      As explained above, everything is computed only in your browser. Nothing
      ever leaves your machine, or even your browser tab. There is no database,
      no server-side code. Everything vanishes when you close your tab.
      NKNxVanity cannot and will never store your private key, and if you don't
      trust it, you have 3 ways to ensure your key remains private:
    </p>

    <ul>
      <li>
        - Once the web page is loaded, you can turn off the internet and
        continue playing, it will work seamlessly
      </li>
      <li>
        - You can also download the latest build of NKNxVanity
        <a
          href="https://github.com/nknx-org/nknx-vanity/releases"
          target="_blank"
          class="description__link"
          >here</a
        >
        and use it on a completely offline computer
      </li>
      <li>
        - The code is 100% open source and available
        <a
          href="https://github.com/nknx-org/nknx-vanity"
          target="_blank"
          class="description__link"
          >on Github</a
        >. You can review it as much as you want before using it
      </li>
    </ul>
    <p class="description__text">
      NKNxVanity uses the official NKN
      <a
        href="https://github.com/nknorg/nkn-wallet-js"
        target="_blank"
        class="description__link"
        >nkn-wallet-js</a
      >
      implementation to generate addresses. The wallet file is generated
      according to the standards of NKN.
    </p>

    <h2 class="description__heading">Performance</h2>
    <p class="description__text">
      For some reason, the performance of NKNxVanity can vary a lot from a
      browser to another. Currently, Chrome provides the best results. Using
      NKNxVanity on your phone or tablet will work, but don't expect to reach
      the speed of a good old computer.
    </p>

    <h2 class="description__heading">Compatibility</h2>
    <p class="description__text">
      Any address generated with NKNxVanity is 100% mainnet compatible, which
      means you can use it like an ordinary wallet. The wallet file is 100%
      compatible with every NKN web wallet as well with NKNxVault Desktop app.
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
