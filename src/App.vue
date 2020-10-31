<template>
  <div id="app">
    <transition name="fade">
      <loader :loading="loading" />
    </transition>
    <app-nav />
    <router-view/>
    <app-footer />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import loader from '@/components/loaders/Dots'
import appNav from '@/components/nav/Nav'
import appFooter from '@/components/Footer'

export default {
  components: { loader, appNav, appFooter },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';
@import '@/assets/styles/form-reset.scss';

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}
</style>
