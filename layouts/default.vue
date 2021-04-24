<template>
  <div>
    <Navbar />
    <Nuxt />
    <welcome-modal />
  </div>
</template>

<script>
import WelcomeModal from '../components/WelcomeModal';

export default {
  components: { WelcomeModal },
  async mounted () {
    await this.$store.dispatch('refreshToken');
    await this.$store.dispatch('fetchArtists');
    await this.$store.dispatch('fetchSongs');
    this.dropConfetti();
  },
  methods: {
    dropConfetti () {
      this.$confetti.start();
      this.$confetti.start({
        particles: [
          {
            type: 'circle',
          },
        ],
        defaultColors: [
          '#ffe000',
          '#232323',
        ],
        particlesPerFrame: 2,
        defaultDropRate: 10,
      });
      setTimeout(() => this.$confetti.stop(), 2000);
    },
  }
};
</script>

<style>
  #__layout {
    padding: 20px;
    padding-top: 80px;
  }
</style>
