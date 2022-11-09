<!-- Default page that also displays freets -->

<template>
  <main>
    <header>
      <h1>Global</h1>
    </header>
    <section
      v-if="$store.state.globalCategories.length"
    >
      <CategoryComponent
        v-for="category in $store.state.globalCategories"
        :key="category.title"
        :category="category"
        @category-click="handleCategoryClick"
      />
    </section>
    <article
      v-else
    >
      <h3>No categories found.</h3>
    </article>
  </main>
</template>

<script>

import CategoryComponent from '@/components/Category/CategoryComponent.vue';


export default {
  name: 'GlobalCategoriesPage',
  components: {CategoryComponent},
  mounted() {
    this.$store.commit('refreshGlobalCategories');
  },
  methods: {
    handleCategoryClick(category) {
      this.$store.commit('updateGlobalCirclesFilter', category.title);
      this.$store.commit('refreshGlobalCircles');
      this.$router.push(`/global/category/${category.title}`);
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

section {
  display: flex;
  gap: 32px;
  flex-direction: row;
  flex-wrap: wrap;
}


</style>
