<template>
  <form
    @submit.prevent="$emit('submit-search')"
    id="search"
    class="search-container">
    <label for="search" v-html="label" />
    <div class="search">
      <div class="input">
        <img src="@/assets/icons/search.svg" alt="">
        <input
          :value="value"
          @input="emitInput($event)"
          id="search"
          type="search"
          autocomplete="off"
          data-testid="search-input">
      </div>
      <input type="submit" value="Search">
    </div>
  </form>
</template>

<script>
export default {
  props: ['label', 'value'],
  methods: {
    emitInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.search-container {
  label {
    width: 100%;
    text-align: center;
  }

  .search {
    height: 2.5rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .input {
      width: 68%;
      height: 100%;
      position: relative;
      
      img {
        width: 1.5rem;
        position: absolute;
        top: 0.375rem;
        left: 0.375rem;
      }

      input[type="search"] {
        padding: 0.625rem 1rem 0.625rem 2.5rem;
        box-sizing: border-box;
      }
    }

    input[type="submit"] {
      min-width: 100px;
      width: 30%;
      height: 100%;
      background: $orange;
      color: $light-font;
      border-radius: $border-radius;
      margin-left: 0.5em;
      font-weight: 600;
    }
  }
}

// Tablet
@media only screen and (min-width: 700px) {

}
</style>
