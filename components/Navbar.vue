<template>
  <div class="center example">
    <vs-navbar color="primary" text-white square center-collapsed>
      <template #left>
        <NuxtLink to="/">
          <img class="logo" src="/logo.png" alt="logo">
        </NuxtLink>
      </template>
      <NuxtLink to="/">
        <h3>STARSTRUCK</h3>
      </NuxtLink>
      <template #right>
        <NuxtLink to="/">
          <vs-navbar-item id="artists" :active="active === 'artists'">
            Artists
          </vs-navbar-item>
        </NuxtLink>
        <NuxtLink :to="'/playlists'">
          <vs-navbar-item id="playlists" :active="active === 'playlists'">
            Playlists
          </vs-navbar-item>
        </NuxtLink>
      </template>
    </vs-navbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: 'artists'
  })
};
</script>

<style lang="scss" scoped>
  .logo {
    max-width: 70px;
    -webkit-filter: drop-shadow(3px 3px 5px rgba(0,0,0,0.2));
  }
  .vs-navbar__item {
    font-size: 15px;
  }
  .nuxt-link-exact-active {
    .vs-navbar__item {
      background: #232323;
      color: white;
    }
  }
  a {
    text-decoration: none;
    color: black;
  }
  h3 {
    margin-left: 80px;
  }
</style>
