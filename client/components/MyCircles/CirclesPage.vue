<!-- Default page that also displays circles -->

<template>
  <main>
    <CirclesPage 
      :circles="$store.state.myCirclesCircles" 
      header="My Circles"
      friends-circle
      @circle-click="handleCircleClick"
    />
  </main>
</template>

<script>
import CirclesPage from '@/components/Circle/CirclesPage.vue';

export default {
  name: 'MyCirclesCirclesPage',
  components: {CirclesPage},
  mounted() {
    this.$store.commit('refreshSubscribes');
  },
  methods: {
    handleCircleClick(circle) {
      this.$store.commit('updateMyCirclesFreetsFilter', circle._id);
      this.$store.commit('refreshMyCirclesFreets');
      this.$router.push(`/my-circles/circle/${circle.title}`)
    }
  }
  
};
</script>