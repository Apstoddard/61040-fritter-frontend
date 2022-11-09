<!-- Default page that also displays circles -->

<template>
  <main>
    <CirclesPage 
      :circles="$store.state.globalCircles" 
      header="Global"
      back
      @circle-click="handleCircleClick"
    />
  </main>
</template>

<script>
import CirclesPage from '@/components/Circle/CirclesPage.vue';

export default {
  name: 'GlobalCirclesPage',
  components: {CirclesPage},
  mounted() {
    this.$store.commit('refreshGlobalCircles');
  },
  methods: {
    handleCircleClick(circle) {
      this.$store.commit('updateGlobalFreetsFilter', circle._id);
      this.$store.commit('refreshGlobalFreets');
      this.$router.push(`/global/category/${circle.category}/circle/${circle.title}`)
    }
  }
  
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
