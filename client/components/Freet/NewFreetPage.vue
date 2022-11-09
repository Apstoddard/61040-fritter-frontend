<!-- Default page that also displays circles -->

<template>
  <main>
    <header>
      <h1>New Freet</h1>
      <FritterButton 
        label="Back"
        class="backButton"
        back-icon
        @click.native="$router.go(-1)"
      />
    </header>
    <section>
      <CreateFreetForm />
    </section>
  </main>
</template>

<script>
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import FritterButton from '@/components/common/FritterButton.vue'

export default {
  name: 'NewFreetPage',
  components: {CreateFreetForm, FritterButton}
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
.backButton {
  float: right;
  margin-right: 24px;
}
</style>
