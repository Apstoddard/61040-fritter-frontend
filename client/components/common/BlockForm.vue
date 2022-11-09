<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <article
      v-if="fields.length"
    >
      <div
        v-for="field in fields"
        :key="field.id"
      >
        <textarea
          v-if="field.id === 'content' || field.id === 'bio'"
          :placeholder="field.label"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
        <multiselect 
          v-else-if="field.id === 'circles'" 
          v-model="field.value"
          class="multiselect"
          track-by="_id" 
          label="title"
          placeholder="Select Circles"
          :multiple="true"
          :options="field.options" 
        />
        <input
          v-else
          :type="field.id === 'password' ? 'password' : 'text'"
          :placeholder="field.label"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <button
      type="submit"
    >
      {{ title }}
    </button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>

import Multiselect from 'vue-multiselect'

export default {
  name: 'BlockForm',
  components: {Multiselect},
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setEmail: false,
      setFirstName: false,
      setLastName: false,
      setUsername: false, // Whether or not stored username should be updated after form submission
      setBio: false, // Whether or not stored bio should be updated after form submission
      setDateJoined: false,
      refreshFreets: false, // Whether or not stored freets should be updated after form submission
      refreshCircles: false, // Whether or not stored circles should be updated after form submission
      refreshAroundMe: false,
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null // Function to run after successful form submission
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        const text = await r.text();
        const res = text ? JSON.parse(text) : {user: null};

        if (this.setUsername) {
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.setEmail) {
          this.$store.commit('setEmail', res.user ? res.user.email : null);
        }

        if (this.setFirstName) {
          this.$store.commit('setFirstName', res.user ? res.user.first_name : null);
        }

        if (this.setLastName) {
          this.$store.commit('setLastName', res.user ? res.user.last_name : null);
        }

        if (this.setBio) {
          this.$store.commit('setBio', res.user ? res.user.bio : null);
        }

        if (this.setDateJoined) {
          this.$store.commit('setDateJoined', res.user ? res.user.dateJoined : null);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshGlobalFreets');
          this.$store.commit('refreshMyCirclesFreets');
          this.$store.commit('refreshAroundMeFreets');
          this.$store.commit('refreshAroundMeLocation');
          this.$store.commit('refreshLikes');
        }

        if (this.refreshCircles) {
          this.$store.commit('refreshGlobalCategories');
          this.$store.commit('refreshGlobalCircles');
          this.$store.commit('refreshAroundMeLocation');
          this.$store.commit('refreshSubscribes');
        }

        if(this.refreshAroundMe) {
          this.$store.commit('refreshAroundMeLocation');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
form {
  background-color: #D9D9D9;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
  font-family: Helvetica;
  width: calc(100% - 24px);
  
}

article > div {
  display: flex;
  flex-direction: column;
}

form > article p {
  margin: 0;
}

form h3 {
  margin-top: 0;
}

textarea, input {
  border: none;
  margin: 12px;
  font-size: 18px;
  font-family: Helvetica;
  padding: 12px 8px;
}
.multiselect {
  border: none;
  margin: 12px;
  font-size: 18px;
  font-family: Helvetica;
  width: calc(100% - 24px);
}


button {
  width: max-content;
  height: 48px;
  background: #0D579A;
  border: none;
  padding: 0px 32px;
  cursor: pointer;
  color: #FFFFFF;
  font-size: 24px;
  text-align: left;
  font-family: Helvetica;
  float: left;
  height: 48px;
  line-height: 48px;
  margin: 12px;
}

</style>
