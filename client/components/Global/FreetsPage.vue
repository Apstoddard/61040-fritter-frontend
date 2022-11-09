<!-- Default page that also displays freets -->

<template>
  <main>
    <FreetsPage 
      :freets="$store.state.globalFreets" 
      header="Global"
      :circle="$route.params.circle"
      back
    />
  </main>
</template>

<script>
import FreetsPage from '@/components/Freet/FreetsPage.vue';

export default {
  name: 'GlobalFreetsPage',
  components: {FreetsPage},
  mounted() {
    this.$store.commit('refreshGlobalFreets');
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
