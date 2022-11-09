<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article
    class="freet"
  >
    <section class="content">
      {{ freet.content }}
    </section>
    <footer>
      <section class="info">
        <h3 
          class="author" 
          @click="$router.push({name: 'User', params: { username: freet.author }})"
        >
          @{{ freet.author }}
        </h3>
        <p class="date">
          {{ freet.dateCreated }}
        </p>
      </section>
      <button 
        v-if="$store.state.username && !$store.state.userLikes.includes(freet._id)"
        class="action"
        @click="likeFreet"
      >
        <BIconHeart class="icon" />
        {{ likes }}
      </button>
      <button 
        v-if="$store.state.username && $store.state.userLikes.includes(freet._id)"
        class="action"
        @click="unlikeFreet"
      >
        <BIconHeartFill class="icon" />
        {{ likes }}
      </button>
      <button 
        v-if="$store.state.username === freet.author"
        class="action"
        @click="deleteFreet"
      >
        <BIconTrash class="icon" />
      </button>
    </footer>
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
import { BIconTrash, BIconHeart, BIconHeartFill} from 'bootstrap-vue'

export default {
  name: 'FreetComponent',
  components: {BIconTrash, BIconHeart, BIconHeartFill},
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false, // Whether or not this freet is in edit mode
      draft: this.freet.content, // Potentially-new content for this freet
      alerts: {}, // Displays success/error messages encountered during freet modification
      likes: 0,
    };
  },
  async mounted() {
    this.refreshLikeCount();
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
    likeFreet() {
      /**
       * Updates freet to have the submitted draft content.
       */

      const params = {
        method: 'POST',
        message: 'Successfully liked freet!',
        body: JSON.stringify({freetId: this.freet._id}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.likeRequest(params);

      
    },
    unlikeFreet() {
      /**
       * Updates freet to have the submitted draft content.
       */

       const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted like!', status: 'success'
          });
        }
      };
      this.unlikeRequest(params);

      
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
        const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;
        this.$store.commit('refreshGlobalFreets');
        this.$store.commit('refreshMyCirclesFreets');
        this.$store.commit('refreshAroundMeFreets');
        this.$store.commit('refreshAroundMeLocation');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async likeRequest(params) {
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
        const r = await fetch(`/api/likes`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshLikes');
        this.refreshLikeCount();

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async unlikeRequest(params) {
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
        const r = await fetch(`/api/likes/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshLikes');
        this.refreshLikeCount();

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async refreshLikeCount() {
      const url = `/api/likes?freetId=${this.freet._id}`;
      const res = await fetch(url).then(async r => r.json());
      this.likes = res.length;
    }
  }
};
</script>

<style scoped>
.freet {
    position: relative;
    border: 4px solid #ADC6DD;
    width: 384px;
    min-width: min-content;
    height: calc(100% - 32px);
    flex: none;
    background-color: #ADC6DD;
    font-family: Helvetica;
}
.content {
  height: calc(100% - 96px);
  background-color: white;
  padding: 16px;
}
.info {
  float: left;
  height: 96px;
  width: calc(100% - 128px);
  margin: 0px;
  padding-left: 16px;
}
.action {
  height: 48px;
  margin: 24px 16px;
  float: right;
}
h3, p {
  margin: 0px;
}
h3 {
  font-size: 32px;
  height: 48px;
  line-height: 48px;
  margin-top: 8px;
}
p {
  font-size: 16px;
  height: 32px;
  line-height: 16px;
  margin-bottom: 8px;
  color: #727272;
}
button {
  background-color: transparent;
  border: none;
  margin: 0px;
  padding: 0px;
}
.icon {
  height: 24px;
  width: 24px;
}

</style>
