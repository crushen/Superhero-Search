<template>
  <div>
    <div class="nav-bar">
      <button
        @click="openNav"
        class="nav-button">
        <div class="nav-line"></div>
        <div class="nav-line"></div>
        <div class="nav-line"></div>
      </button>
    </div>

    <transition 
      enter-active-class="animate__animated animate__slideInLeft" 
      leave-active-class="animate__animated animate__slideOutLeft">
      <div
        v-if="active" 
        v-on-clickaway="closeNav"
        class="nav-container padding-top"
        data-testid="nav">
        <nav>
          <router-link 
            :to="{ name: 'Home' }" 
            exact 
            @click.native="closeNav"
            data-testid="router-link">
            Home
          </router-link>

          <router-link 
            :to="{ name: 'Superheroes' }"
            @click.native="closeNav">
            Superheroes
          </router-link>

          <router-link 
            :to="{ name: 'Comics' }"
            @click.native="closeNav">
            Comics
          </router-link>
        </nav>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'

export default {
  mixins: [ clickaway ],
  data() {
    return {
      active: false
    }
  },
  methods: {
    openNav() {
      this.active = true
      document.querySelector('body').style.overflow = 'hidden'
    },
    closeNav() {
      this.active = false
      document.querySelector('body').style.overflow = 'auto'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.animate__animated {
  &.animate__slideInLeft,
  &.animate__slideOutLeft {
    --animate-duration: 0.4s;
  }
}

.nav-bar {
  width: 100%;
  position: absolute;
  padding: 1.5rem 7.5vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav-button {
  background: none;
  border: none;
  height: 25px;
  width: 25px;
  cursor: pointer;
}

.nav-line {
  width: 100%;
  height: 10%;
  background: white;
  
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
}

/* RIGHT NAV DRAWER */

.nav-container {
  height: 100vh;
  width: 80%;
  background: $accent;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
}

nav {
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
}

nav a {
  font-size: 18px;
  font-weight: 600;
  animation-duration: 0.4s;
  animation-timing-function: ease-out;
  text-decoration: none;
  color: $light-font;
  opacity: 0.7;

  &:not(:first-of-type) {
    margin-top: 16px;
  }
}

nav .router-link-active {
  opacity: 1;
}
</style>
