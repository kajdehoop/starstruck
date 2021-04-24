<template>
  <div class="center">
    <vs-dialog v-model="active" not-close>
      <template #header>
        <h4 class="not-margin">
          Add song to playlist
        </h4>
      </template>
      <div class="modal-content">
        <div class="center content-inputs">
          <div
            v-for="playlist in playlists"
            :key="playlist.id"
            class="playlist"
            @click="addSong(playlist.id, playlist.name)"
          >
            <p>{{ playlist.name }}</p>
          </div>
          <p v-if="!playlists.length > 0" class="error-message">
            You don't have any playlists yet. Add them in the Playlists page
          </p>
        </div>
      </div>
    </vs-dialog>
  </div>
</template>
<script>
export default {
  props: {
    songId: {
      type: Number,
      required: true,
    },
    songName: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    active: false,
  }),
  computed: {
    playlists () {
      return this.$store.getters.getAllPlaylists;
    }
  },
  methods: {
    open () {
      this.active = true;
    },
    async addSong (playlistId, playlistName) {
      await this.$store.dispatch('addSongToPlaylist', { songId: this.songId, playlistId });

      this.$vs.notification({
        duration: 3000,
        square: true,
        color: '#232323',
        progress: 'auto',
        title: 'Song successfully added!',
        text: `The song ${this.songName} has been added to your playlist ${playlistName}`
      });

      this.active = false;
    },
  }
};
</script>
<style lang="scss" scoped>
  .playlist {
    padding: 15px;
    background: #232323;
    color: white;
    margin-bottom: 5px;
    width: 100%;
    cursor: pointer;
  }
</style>
