<!-- Default page that also displays freets -->

<template>
  <main>
    <FreetsPage 
      :freets="$store.state.myCirclesFreets" 
      header="My Circles"
      :circle="$route.params.circle"
      back
    />
  </main>
</template>

<script>
import FreetsPage from '@/components/Freet/FreetsPage.vue';

export default {
  name: 'MyCirclesFreetsPage',
  components: {FreetsPage},
  mounted() {
    this.$store.commit('refreshMyCirclesFreets');
  }
};
</script>
