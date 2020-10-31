<template>
  <footer class="padding-top padding-bottom">
    <div class="content">
      <h3 class="heading two cursive">Superhero<br>Search</h3>

      <ul class="margin-l top">
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

      <p>Project by <a>Charlotte Rushen</a></p>
      <p>Data provided by <a href="http://marvel.com">Marvel</a> © 2020 MARVEL</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

footer {
  background: lighten($color: $background, $amount: 7%);
}

li {
  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
}

p {
  font-size: 0.875rem;

  &:first-of-type {
    margin: 4rem 0 0.5rem 0;
  }
}

a {
  font-weight: 600;
}
</style>
