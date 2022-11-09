<!-- Default page that also displays circles -->

<template>
  <main>
    <header>
      <h1>
        {{ header }}
      </h1>
      <FritterButton 
        v-if="back"
        class="backButton"
        label="Back"
        back-icon
        @click.native="$router.go(-1)"
      />
    </header>
    <section
      class="circles"
    >
      <FriendCircleComponent 
        v-if="friendsCircle"
      />
      <CircleComponent
        v-for="circle in circles"
        :key="circle.id"
        :circle="circle"
        v-on="$listeners"
      />
    </section>
  </main>
</template>

<script>
import CircleComponent from '@/components/Circle/CircleComponent.vue';
import FriendCircleComponent from '@/components/Circle/FriendCircleComponent.vue';
import FritterButton from '@/components/common/FritterButton.vue';

export default {
  name: 'CirclesPage',
  components: {CircleComponent, FritterButton, FriendCircleComponent},
  props: {
    circles: {
      type: Array,
      default: null
    },
    header: {
      type: String,
      default: 'Circles'
    },
    back: {
      type: Boolean
    },
    friendsCircle: {
      type: Boolean
    }
  }
};
</script>

<style scoped>
header {
  height: 80px;
  margin-bottom: 16px;

}

h1 {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 72px;
  color: #000000;
  text-transform: uppercase;
  margin: 0px;
  float: left;
  line-height: 80px;
}

.circles {
  display: flex;
  gap: 32px;
  flex-direction: row;
  flex-wrap: wrap;
}

.backButton {
  float: right;
  margin-right: 24px;
}


</style>
