<template>
  <div class="center content-inputs">
    <vs-input v-model="query" square placeholder="Find artist..." @keyup.enter="search" />
    <vs-button square icon @click="search">
      <i class="bx bx-search" />
    </vs-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    query: ''
  }),
  methods: {
    search () {
      this.$store.dispatch('updateQuery', this.query);
    }
  }
};
</script>

<style lang="scss" scoped>
  .content-inputs {
    display: flex;
    margin: 20px;
    justify-content: center;
  }
</style>
