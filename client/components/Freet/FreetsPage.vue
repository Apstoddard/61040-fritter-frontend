<!-- Default page that also displays freets -->

<template>
  <main>    
    <section class="freetsPage">
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
      <article class="freets">
        <h3 class="freetsHeader">
          {{ circle }}
        </h3>
        <section
          v-if="freets.length"
          class="freetsSection"
        >
          <FreetComponent
            v-for="freet in freets"
            :key="freet.id"
            :freet="freet"
          />
        </section>
        <article
          v-else
        >
          <h3>No freets found.</h3>
        </article>
      </article>
    </section>
  </main>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';
import FritterButton from '@/components/common/FritterButton.vue';

export default {
  name: 'FreetPage',
  components: {FreetComponent, FritterButton},
  props: {
    freets: {
      type: Array,
      default: null
    },
    header: {
      type: String,
      default: 'Freets'
    },
    circle: {
      type: String,
      default: 'Circle'
    },
    back: {
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

h3 {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  color: #000000;
  margin: 0px;
}

main {
  height: 100%;
  max-height: 840px;
}

.freets {
  background-color: #D9D9D9;
  height: calc(100% - 96px);
}
.backButton {
  float: right;
  margin-right: 24px;
}

.freetsPage {
  height: 100%;
}

.freetsHeader {
  height: 96px;
  line-height: 96px;
  margin-left: 32px;
}

.freetsSection {
  height: calc(100% - 96px);
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 32px;
  overflow-x: scroll;
  margin-left: 32px;

}

</style>
