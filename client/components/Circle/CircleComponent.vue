<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="circle"
  >
    <header
      @click="$emit('circle-click', circle)"
    >
      <h3 
        class="title" 
      >
        {{ circle.title }}
      </h3>
    </header>
    <section>
      <div
        v-if="$store.state.username"
        class="actionsLeft"
      >
        <button 
          v-if="!$store.state.userSubscribes.includes(circle.title)"
          class="textButton"
          @click="subscribeCircle"
        >
          Subscribe
        </button>
        <button 
          v-else
          class="textButton"
          @click="unsubscribeCircle"
        >
          Unsubscribe
        </button>
      </div>
      <div
        v-if="$store.state.username === circle.author"
        class="actionsRight"
      >
        <button @click="deleteFreet">
          <BIconTrash class="icon" />
        </button>
      </div>
    </section>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>

<script>
import { BIconTrash } from 'bootstrap-vue'

export default {
  name: 'CircleComponent',
  components: {BIconTrash},
  props: {
    // Data from the stored freet
    circle: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    deleteFreet() {
      /**
       * Deletes this freet.
       */
      const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted freet!', status: 'success'
          });
        }
      };
      this.request(params);
    },

    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/circles/${this.circle._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshGlobalCategories');
        this.$store.commit('refreshGlobalCircles');
        this.$store.commit('refreshAroundMeLocation');
        this.$store.commit('refreshSubscribes');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    subscribeCircle() {
      const params = {
        method: 'POST',
        message: 'Successfully subscribed to circle!',
        body: JSON.stringify({circleId: this.circle._id}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.subscribeRequest(params);
    },
    unsubscribeCircle() {
       const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted subscription!', status: 'success'
          });
        }
      };
      this.unsubscribeRequest(params);
    },
    async subscribeRequest(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/subscribes`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshGlobalCategories');
        this.$store.commit('refreshGlobalCircles');
        this.$store.commit('refreshAroundMeLocation');
        this.$store.commit('refreshSubscribes');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async unsubscribeRequest(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/subscribes/${this.circle._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshGlobalCategories');
        this.$store.commit('refreshGlobalCircles');
        this.$store.commit('refreshAroundMeLocation');
        this.$store.commit('refreshSubscribes');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  }
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
  height: 124px;
  text-align: center;
  display: flex;
  justify-content:center;
  align-items: center;
  font-size: 18px;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: Helvetica;
  float: left;
}

.actionsLeft {
  margin-left: 16px;
  float: left;
}

.actionsRight {
  float: right;
  margin-right: 16px;
}
.textButton {
  background-color: white;
  color: black;
  height: 40px;
  line-height: 40px;
  padding: 0px 8px;
  color: #0D579A;
}

.icon {
  width: 24px;
  height: 24px;
  margin: 8px;
  color: #0D579A;
}

</style>
