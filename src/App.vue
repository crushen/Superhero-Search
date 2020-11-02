<template>
  <div id="app">
    <transition name="fade">
      <loader :loading="loading" />
    </transition>

    <mobile-nav class="mobile-nav" />
    <desktop-nav class="desktop-nav" />

    <div class="router-view">
      <router-view/>
    </div>

    <app-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loader from '@/components/loaders/Dots'
import mobileNav from '@/components/nav/MobileNav'
import desktopNav from '@/components/nav/DesktopNav'
import appFooter from '@/components/Footer'

export default {
  components: { loader, mobileNav, desktopNav, appFooter },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';
@import '@/assets/styles/form-reset.scss';

.desktop-nav {
  display: none;
}

.router-view {
  min-height: 100vh;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}

// Desktop
@media only screen and (min-width: 1000px) {
  .desktop-nav {
    display: block;
  }

  .mobile-nav {
    display: none;
  }
}
</style>
