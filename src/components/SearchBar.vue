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
    margin-top: 1rem;
    display: flex;
    align-items: center;

    .input {
      position: relative;
      

      img {
        width: 24px;
        position: absolute;
        top: 6px;
        left: 6px;
      }

      input[type="search"] {
        padding: 0.625rem 1rem 0.625rem 2.5rem;
        box-sizing: border-box;
      }
    }

    input[type="submit"] {
      width: 100px;
      height: 39px;
      background: $accent;
      color: $light-font;
      border-radius: $border-radius;
      margin-left: 0.5rem;
      font-weight: 400;
    }
  }
}
</style>
