<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main class="mainPage">
    <section class="userPage">
      <header class="userInfo">
        <section class="userDetails">
          <h1>@{{ user.username }}</h1>
          <h3 class="joined">
            Joined on {{ user.dateJoined }}
          </h3>
        </section>
        <article class="userBio">
          {{ user.bio }}
        </article>
        <section class="userActions">
          <FritterButton 
            v-if="$store.state.username && $store.state.username !== user.username && !$store.state.userFollowing.includes(user.username)"
            label="Follow"
            primary
            @click.native="followUser"
          />
          <FritterButton 
            v-if="$store.state.username && $store.state.username !== user.username && $store.state.userFollowing.includes(user.username)"
            label="Unfollow"
            primary
            @click.native="unfollowUser"
          />
          <FritterButton 
            v-if="$store.state.username === user.username"
            label="Edit"
            primary
            @click.native="$router.push('/account')"
          />
          <FritterButton 
            label="Back"
            back-icon
            @click.native="$router.go(-1)"
          />
        </section>
      </header>
      <article class="freets">
        <h3 class="freetsHeader">
          Freets
        </h3>
        <section
          v-if="freets.length"
          class="freetsSection"
        >
          <FreetComponent
            v-for="freet in freets"
            :key="freet.id"
            :freet="freet"
            @freet-update="handleFreetUpdate"
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
import FritterButton from '@/components/common/FritterButton.vue';
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'UserPage',
  components: {FritterButton, FreetComponent},
  beforeRouteUpdate (to, from, next) {
    this.getUser(to.params.username)
    next();
  },
  data() {
    return {
      user: {},
      freets: {},
      alerts: {}
    };
  },
  mounted() {
    this.$store.commit('refreshFollowing');
    this.getUser(this.$route.params.username);
    this.getUserFreets(this.$route.params.username);

  },
  methods: {
    handleFreetUpdate() {
      this.getUserFreets(this.$route.params.username);
    },
    async getUser(username) {
      const url = `/api/users/${username}`;
      const res = await fetch(url).then(async r => r.json());
      if(res.error) {
        this.$router.push({name: "Not Found"});
      }
      this.user = res;
    },
    async getUserFreets(username) {
      const url = `api/freets?author=${username}`;
      const res = await fetch(url).then(async r => r.json());
      if(res.error) {
        this.$router.push({name: "Not Found"});
      }
      this.freets = res;
    },
    followUser() {
      const params = {
        method: 'POST',
        message: 'Successfully followed user!',
        body: JSON.stringify({user: this.user.username}),
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.followRequest(params);
    },
    async followRequest(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/follows`, options);
        console.log(r);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshFollowing');

        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    unfollowUser() {
       const params = {
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted follow!', status: 'success'
          });
        }
      };
      this.unfollowRequest(params);

      
    },
    async unfollowRequest(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}, credentials: 'same-origin'
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(`/api/follows/${this.user.username}`, options);
        console.log(r);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshFollowing');

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

.userPage {
  height: 100%;
}
.userInfo {
  display: grid;
  grid-template-columns: max-content auto max-content;
  grid-gap: 16px;
}

.mainPage {
  font-family: Helvetica;
  height: 100%;
  max-height: 840px;
}

h1 {
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  color: #000000;
  margin: 0px;
  margin-bottom: 16px;
}

h3 {
  font-family: 'Helvetica';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  color: #000000;
  margin: 0px;
}

.joined {
  font-size: 24px;
  color: #727272;
}

.userBio {
  background: #D9D9D9;
  float: right;
  height: 112px;
}

.freets {
  background-color: #D9D9D9;
  height: calc(100% - 160px);
  margin-top: 48px;
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

.userActions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-right: 24px;
}

</style>