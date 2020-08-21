<template>
  <div id="app">
    <app-nav />
    <router-view/>
  </div>
</template>

<script>
import appNav from '@/components/nav/Nav'

export default {
  components: {
    appNav
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/main.scss';
@import '@/assets/styles/form-reset.scss';
</style>
