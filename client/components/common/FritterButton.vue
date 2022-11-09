<template>
  <button 
    class="button" 
    :class="['button', { primary }, { white }]" 
  >
    <section 
      v-if="backIcon"
      class="iconSection"
    >
      <BIconArrowLeft class="icon" />
    </section>
    <section class="label">
      {{ label }}
    </section>
  </button>
</template>

<script>
import { BIconArrowLeft } from 'bootstrap-vue'

export default {
  name: 'FritterButton',
  components: {BIconArrowLeft},
  props: {
    label: {
      type: String,
      required: true
    },
    backIcon: {
      type: Boolean,
    },
    primary: {
      type: Boolean,
    },
    white: {
      type: Boolean,
    }
  },
};
</script>

<style scoped>
button {
  width: auto;
  height: 48px;
  background: #ADC6DD;
  border: none;
  padding: 0px;
  cursor: pointer;
  color: #FFFFFF;
}
.primary {
  background: #0D579A;
}

.white {
  color: #0D579A;
  background: white;
}
.label {
  width: auto;
  font-size: 24px;
  font-family: Helvetica;
  margin-left: 32px;
  margin-right: 32px;
  float: left;
  height: 48px;
  line-height: 48px;
}

.iconSection {
  width: 48px;
  height: 48px;
  float: left;
}
.icon {
  width: 32px;
  height: 32px;
  margin: 8px;
  margin-left: 32px;
  margin-right: 0px;
  color: white;
}

</style>
