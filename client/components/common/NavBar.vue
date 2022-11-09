<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <FritterButton 
        v-if="$store.state.username"
        label="Account"
        white
        @click.native="$router.push('/account')"
      />
      <FritterButton 
        v-else
        label="Login"
        white
        @click.native="$router.push('/login')"
      />
      <FritterButton 
        v-if="$store.state.username"
        label="New Freet"
        
        @click.native="$router.push('/new/freet')"
      />
      <FritterButton 
        v-if="$store.state.username"
        label="New Circle"
        
        @click.native="$router.push('/new/circle')"
      />
    </div>
    <div class="right">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<script>
import FritterButton from '@/components/common/FritterButton.vue';

export default {
  name: 'NavBar',
  components: {FritterButton}
};
</script>

<style scoped>
nav {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 104px;
    background-color: #0D579A;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    font-family: 'Helvetica';
    color: white;

}

.title {
    font-size: 32px;
    color: white;
    letter-spacing: 0.2em;
    text-transform: uppercase;

}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
  gap: 16px;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>
