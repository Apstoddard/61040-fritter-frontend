<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="category"
    @click="$emit('category-click', category)"
  >
    <header>
      <h3>
        {{ category.title }}
      </h3>
    </header>
    <section>
      <h5>
        Circles: {{ category.count }}
      </h5>
    </section>
  </article>
</template>

<script>
export default {
  name: 'CategoryComponent',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.category {
  width: 416px;
  height: 192px;
  background-color: #D9D9D9;
  font-family: Helvetica;
  text-align: center;
  cursor: pointer;
}

header {
  width: 100%;
  height: 124px;
  text-align: center;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size: 18px;
}

h5 {
  color: #0D579A;
}
</style>
