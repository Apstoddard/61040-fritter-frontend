<!-- Default page that also displays freets -->

<template>
  <main>
    <FreetsPage 
      :freets="$store.state.aroundMeFreets" 
      header="Around Me"
      :circle="$store.state.aroundMeCircle ? $store.state.aroundMeCircle.title : 'Loading'"
    />
  </main>
</template>

<script>
import FreetsPage from '@/components/Freet/FreetsPage.vue';

export default {
  name: 'AroundMePage',
  components: {FreetsPage},
};
</script>