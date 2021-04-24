<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <img class="dancing" src="/dancing.gif" alt="guitar">
    <p>Don't mind me, I'm just dancing on my own</p>
    <NuxtLink to="/">
      Back to Artists page
    </NuxtLink>
  </div>
</template>

<script>
export default {
  layout: 'error',
  props: ['error'] // you can set a custom layout for the error page
};
</script>

<style lang="scss" scoped>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    .dancing {
      max-width: 150px;
    }
  }
</style>
