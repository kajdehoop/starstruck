<template>
  <div class="playlist">
    <NuxtLink :to="`playlist-detail/${playlist.id}`">
      <div class="left">
        <p>{{ playlist.name }}</p>
      </div>
    </NuxtLink>
    <div v-if="canRemove" class="right">
      <vs-button
        square
        icon
        class="add-btn"
        @click="removePlaylist"
      >
        <i class="bx bx-x" />
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
    canRemove: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async removePlaylist () {
      await this.$store.dispatch('removePlaylist', this.playlist.id);

      this.$vs.notification({
        duration: 3000,
        square: true,
        color: '#232323',
        progress: 'auto',
        title: 'Playlist successfully deleted!',
        text: `The playlist ${this.playlist.name} has been deleted`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .playlist {
    padding: 15px;
    background: #232323;
    color: white;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    a {
      width: 100%;
      color: white;
      text-decoration: none;
      line-height: 38px;
    }
  }
</style>
