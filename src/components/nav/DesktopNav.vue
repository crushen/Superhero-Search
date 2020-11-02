<template>
  <div>
    <nav>
      <ul class="content">
        <li>
          <router-link 
            :to="{ name: 'Home' }" 
            exact 
            @click.native="closeNav"
            data-testid="router-link">
            Home
          </router-link>
        </li>

        <li>
          <router-link 
            :to="{ name: 'Superheroes' }"
            @click.native="closeNav">
            Superheroes
          </router-link>
        </li>

        <li>
          <router-link 
            :to="{ name: 'Comics' }"
            @click.native="closeNav">
            Comics
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

nav {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.5rem;
  background: $blue-dark;
  z-index: 20;
}

.content {
  display: flex;
  justify-content: flex-end;
}

a {
  margin-left: 1rem;
}
</style>
