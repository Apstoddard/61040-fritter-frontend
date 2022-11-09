<!-- Default page that also displays freets -->

<template>
  <main>
    <FreetsPage 
      :freets="$store.state.followingFreets" 
      header="My Circles"
      circle="Following"
      back
    />
  </main>
</template>

<script>
import FreetsPage from '@/components/Freet/FreetsPage.vue';

export default {
  name: 'MyCirclesFollowingFreetsPage',
  components: {FreetsPage},
  mounted() {
    this.$store.commit('refreshFollowing');
  }
};
</script>
