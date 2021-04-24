<template>
  <div class="center">
    <vs-dialog v-model="active" not-close>
      <div class="modal-content">
        <img class="logo" src="/logo.png" alt="logo">
        <img class="guitar" src="/guitar.gif" alt="guitar">
        <h3>Welcome to ✨STARSTRUCK✨</h3>
        <p>Rock to your favorite tunes in this music library. Connected to the Spotify API for cover art & song previews</p>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block square class="continue-btn" @click="active = false">
            Rock on!
            <template #animate>
              🤘
            </template>
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: true,
  })
};
</script>
<style lang="scss" scoped>
  .modal-content {
    .logo {
      max-width: 100px;
    }
    .guitar {
      max-width: 150px;
      margin-bottom: 10px;
    }
  }
</style>
