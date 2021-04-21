<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__nav">
        <div class="footer__description">
          <div class="footer__description-title">
            <Logo class="footer__description-logo" />New Kind of Network
          </div>
          <div class="footer__description-text">
            NKN is a New Kind of Network, a Cellular Automata powered,
            decentralized data relay network built on Blockchain & incentivized
            by a native token.
          </div>
          <div class="footer__description-socials">
            <a
              href="https://twitter.com/NKN_ORG"
              target="_blank"
              class="footer__description-social"
            >
              <Twitter />
            </a>
            <a
              href="https://t.me/nknorg"
              target="_blank"
              class="footer__description-social"
            >
              <Telegram />
            </a>
            <a
              href="https://medium.com/nknetwork"
              target="_blank"
              class="footer__description-social"
            >
              <Medium />
            </a>
            <a
              href="https://discord.gg/fvK2Egm"
              target="_blank"
              class="footer__description-social"
            >
              <Discord />
            </a>
          </div>
        </div>

        <div
          v-for="nav in navigation"
          :key="nav.title"
          class="footer__nav-item"
        >
          <div class="footer__nav-title">{{ nav.title }}</div>
          <a
            v-for="link in nav.links"
            :key="link.title"
            :href="link.url"
            class="footer__nav-link"
            target="_blank"
            >{{ link.title }}</a
          >
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__bottom-item">
          © NKNxVanity 2019. All Rights Reserved.
        </div>
        <div class="footer__bottom-item">
          {{ Donate: NKNXXXXXGKct2cZuhSGW6xqiqeFVd5nJtAzg
        </div>
        <div class="footer__bottom-item">
          Coded with
          <span class="fe fe-heart"></span> by Christian Busch & Andrew Tawking
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
@import './Footer';
</style>

<script>
import Logo from '@/assets/icons/Logo.svg'
import Twitter from '@/assets/icons/Twitter.svg'
import Telegram from '@/assets/icons/Telegram.svg'
import Medium from '@/assets/icons/MediumSymbol.svg'
import Discord from '@/assets/icons/Discord.svg'

export default {
  components: {
    Logo,
    Twitter,
    Telegram,
    Medium,
    Discord
  },
  data: () => {
    return {
      navigation: [
        {
          title: 'nkn',
          links: [
            {
              title: 'About',
              url: 'https://www.nkn.org/#/about'
            },
            {
              title: 'Official Website',
              url: 'https://www.nkn.org/'
            },
            {
              title: 'NKN Wallet',
              url: 'https://wallet.nkn.org/'
            }
          ]
        },
        {
          title: 'nknxEcosystem',
          links: [
            {
              title: 'NKNx Ecosystem',
              url: 'https://www.nknx.org'
            },
            {
              title: 'nScan',
              url: 'https://nscan.io'
            },
            {
              title: 'Vault',
              url: 'https://vault.rule110.io'
            },
            {
              title: 'NKNx Vanity',
              url: 'https://vanity.nknx.org'
            }
          ]
        }
      ],
      socials: [
        { icon: 'Twitter', url: 'https://twitter.com/NKN_ORG' },
        { icon: 'Telegram', url: 'https://t.me/nknorg' },
        { icon: 'Medium', url: 'https://medium.com/nknetwork' },
        { icon: 'Discord', url: 'https://discord.gg/fvK2Egm' }
      ]
    }
  }
}
</script>
