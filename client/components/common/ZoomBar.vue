<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="zoomBar">
      <button 
        class="top" 
        @click="zoomIn"
      >
        <BIconPlus class="buttonIcon" />
      </button>
      <BIconGeoAltFill 
        :class="[{ selected: route === 'around-me'}, 'icon', 'top']" 
        @click="$router.push('/around-me'); route = 'around-me'"
      />
      <div class="line top" />
      <BIconPeopleFill 
        :class="[{ selected: route === 'my-circles'}, 'icon', 'middle']" 
        @click="$router.push('/my-circles'); route = 'my-circles'"
      />
      <div class="line bottom" />
      <BIconGlobe 
        :class="[{ selected: route === 'global'}, 'icon', 'bottom']" 
        @click="$router.push('/global'); route = 'global'"
      />
      <button 
        class="bottom" 
        @click="zoomOut"
      >
        <BIconDash class="buttonIcon" />
      </button>
    </div>
  </nav>
</template>

<script>
import { BIconDash, BIconPlus, BIconGeoAltFill, BIconPeopleFill, BIconGlobe } from 'bootstrap-vue'

export default {
  name: 'ZoomBar',
  components: {BIconDash, BIconPlus, BIconGeoAltFill, BIconPeopleFill, BIconGlobe},
  data() {
    return {
      route: this.$router.currentRoute.path.split("/")[1],
    }
  },
  methods: {
    zoomIn() {
      const route = this.$router.currentRoute.path;
      const routeName = route.split("/")[1];
      switch (routeName) {
        case 'global':
          this.$router.push('/my-circles');
          this.route = 'my-circles';
          break;
        case 'my-circles':
          this.$router.push('/around-me');
          this.route = 'around-me';
          break;
        default:
          break;
      }
    },
    zoomOut() {
      const route = this.$router.currentRoute.path;
      const routeName = route.split("/")[1];
      switch (routeName) {
        case 'around-me':
          this.$router.push('/my-circles');
          this.route = 'my-circles';
          break;
        case 'my-circles':
          this.$router.push('/global');
          this.route = 'global';
          break;
        default:
          break;
      }
    }
  }
};
</script>


<style scoped>
nav {
    position: fixed;
    left: 24px;
    top: 64px;
    width: 48px;
    height: calc(100% - 232px);
    max-height: 840px;
    box-sizing: border-box;
    border: 4px solid #ADC6DD;

}
button {
  position: absolute;
  left: 0px;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #ADC6DD;
  padding: 0px;
  cursor: pointer;
}
.top {
  top: 0px;
}
.bottom {
  bottom: 0px;
}

.buttonIcon {
  width: 32px;
  height: 32px;
  margin: 4px;
}

.icon {
  width: 24px;
  height: 24px;
  margin: 8px;
  position: absolute;
  color: #D9D9D9;
  cursor: pointer;
}
.icon.top {
  top: 48px;
}

.icon.middle {
  top: calc(50% - 20px);
}

.icon.bottom {
  bottom: 48px;
}
.icon.selected {
  color: #0D579A;
}

.line {
  position: absolute;
  height: calc(50% - 124px);
  width: 2px;
  background-color: #D9D9D9;
  left: calc(50% - 1px);
}
.line.top {
  top: 96px;
}

.line.bottom {
  bottom: 96px;
}
.alerts {
    width: 25%;
}
</style>
