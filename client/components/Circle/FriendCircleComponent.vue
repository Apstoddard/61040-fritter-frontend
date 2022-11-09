<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="circle"
  >
    <header
      @click="$store.commit('refreshFollowing'); $router.push(`/my-circles/following`)"
    >
      <h3 class="title">
        Following 🤝
      </h3>
    </header>
  </article>
</template>

<script>

export default {
  name: 'FollowingCircleComponent'
};
</script>

<style scoped>
.circle {
  width: 192px;
  height: 192px;
  background-color: #D9D9D9;
  font-family: Helvetica;
  cursor: pointer;
}


header {
  width: 100%;
  height: 192px;
  text-align: center;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size: 18px;
  color: #0D579A;
}



</style>
