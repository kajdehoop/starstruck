<template>
  <div class="center">
    <vs-dialog v-model="active" not-close>
      <template #header>
        <h4 class="not-margin">
          New playlist
        </h4>
      </template>
      <div class="modal-content">
        <div class="center content-inputs">
          <vs-input v-model="name" square placeholder="Name your playlist">
            <template v-if="error && (!name || name === '')" #message-danger>
              Playlist needs to have a name
            </template>
          </vs-input>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block class="continue-btn" @click="createPlaylist">
            Create
            <template #animate>
              <i class="bx bx-plus" />
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
    active: false,
    name: '',
    error: false,
  }),
  methods: {
    async createPlaylist () {
      if (this.name && this.name !== '') {
        await this.$store.dispatch('createPlaylist', this.name);

        this.$vs.notification({
          duration: 3000,
          square: true,
          color: '#232323',
          progress: 'auto',
          title: 'Playlist successfully created!',
          text: `The playlist ${this.name} has been created`
        });

        this.active = false;
      } else {
        this.error = true;
      }
    },
    open () {
      this.active = true;
    },
  }
};
</script>
