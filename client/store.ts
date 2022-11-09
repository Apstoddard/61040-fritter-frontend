import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    globalCategories: [],
    globalCircles: [],
    globalCirclesFilter: null,
    globalFreets: [],
    globalFreetsFilter: null,

    myCirclesCircles: [],
    myCirclesFreets: [],
    myCirclesFreetsFilter: null,

    aroundMeCircle: null,
    aroundMeFreets: [],

    username: null, // Username of the logged in user
    bio: null, // Bio of the logged in user
    firstName: null, // First name of the logged in user
    lastName: null, // Last name of the logged in user
    email: null, // Email of the logged in user
    dateJoined: null, // Date the logged in user joined

    alerts: {}, // global success/error messages encountered during submissions to non-visible forms

    userLikes: [],
    userFollowing: [],
    userSubscribes: [],

    followingFreets: [],

  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setFirstName(state, firstName) {
      /**
       * Update the stored first name to the specified one.
       * @param firstName - new first name to set
       */
      state.firstName = firstName;
    },
    setLastName(state, lastName) {
      /**
       * Update the stored last name to the specified one.
       * @param lastName - new last name to set
       */
      state.lastName = lastName;
    },
    setEmail(state, email) {
      /**
       * Update the stored email to the specified one.
       * @param email - new email to set
       */
      state.email = email;
    },
    setBio(state, bio) {
      /**
       * Update the stored username to the specified one.
       * @param bio - new bio to set
       */
      state.bio = bio;
    },
    setDateJoined(state, dateJoined) {
      /**
       * Update the stored username to the specified one.
       * @param bio - new bio to set
       */
      state.dateJoined = dateJoined;
    },



    // Global Freets
    updateGlobalFreets(state, globalFreets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.globalFreets = globalFreets;
    },
    updateGlobalFreetsFilter(state, globalFreetsFilter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param freetFilter - id of the circle to filter freets by
       */
      state.globalFreetsFilter = globalFreetsFilter;
    },
    async refreshGlobalFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      //const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const url = state.globalFreetsFilter ? `/api/freets?circleId=${state.globalFreetsFilter}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.globalFreets = res;
    },

    // Global Circles
    updateGlobalCircles(state, globalCircles) {
      /**
       * Update the stored circles to the provided circles.
       * @param globalCircles - Circles to store
       */
      state.globalCircles = globalCircles;
    },
    updateGlobalCirclesFilter(state, globalCirclesFilter) {
      /**
       * Update the stored circles to the be in the specified category
       * @param circleFilter - category to filter circles by
       */
      state.globalCirclesFilter = globalCirclesFilter;
    },
    async refreshGlobalCircles(state) {
      /**
       * Request the server for the currently available circles.
       */
      const url = state.globalCirclesFilter ? `/api/circles?category=${state.globalCirclesFilter}` : '/api/circles';
      const res = await fetch(url).then(async r => r.json());
      state.globalCircles = res;
    },


    // Global Categories
    async refreshGlobalCategories(state) {
      const url = '/api/circles';
      const res = await fetch(url).then(async r => r.json());
      const categoryMap = new Map();
      for(const circle of res) {
        const category = circle.category;
        if(categoryMap.has(category)) {
          categoryMap.set(category, categoryMap.get(category) + 1)
        } else {
          categoryMap.set(category, 1)
        }
      }
      const categoryArray = Array.from(categoryMap, function (category) {
        return { title: category[0], count: category[1] }
      });
      state.globalCategories = categoryArray;

    },


    // My Circles Freets
    updateMyCirclesFreets(state, myCirclesFreets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.myCirclesFreets = myCirclesFreets;
    },
    updateMyCirclesFreetsFilter(state, myCirclesFreetsFilter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param freetFilter - id of the circle to filter freets by
       */
      state.myCirclesFreetsFilter = myCirclesFreetsFilter;
    },
    async refreshMyCirclesFreets(state) {
      const url = state.myCirclesFreetsFilter ? `/api/freets?circleId=${state.myCirclesFreetsFilter}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.myCirclesFreets = res;
    },


    // Around Me Freets
    setAroundMeCircle(state, aroundMeCircle) {
      state.aroundMeCircle = aroundMeCircle;
    },

    async refreshAroundMeFreets(state) {
      
      const url = state.aroundMeCircle ? `/api/freets?circleId=${state.aroundMeCircle._id}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.aroundMeFreets = res;
    },


    async refreshLikes(state) {
      const url = `/api/likes?author=${state.username}`;
      const res = await fetch(url).then(async r => r.json());
      state.userLikes = res.map(like => like.freet);
    },

    async refreshFollowing(state) {
      const url = `/api/follows?following=${state.username}`;
      const res = await fetch(url).then(async r => r.json());
      const userFollowing = res.map(follow => follow.following);
      
      const freetsRes = await fetch('/api/freets').then(async r => r.json());
      state.followingFreets = freetsRes.filter(freet => userFollowing.includes(freet.author));
      state.userFollowing = userFollowing;
    },

    async refreshSubscribes(state) {
      const url = `/api/subscribes?user=${state.username}`;
      const res = await fetch(url).then(async r => r.json());
      const subscribes = res.map(subscribe => subscribe.circle);

      const circlesRes = await fetch('/api/circles').then(async r => r.json());
      state.myCirclesCircles = circlesRes.filter(circle => subscribes.includes(circle.title));
      state.userSubscribes = subscribes;
    },


    async refreshAroundMeLocation(state) {
      function earthCircle() {
        console.log("trying");
        fetch(`/api/circles/Earth`, {
          credentials: 'same-origin' // Sends express-session credentials with request
        }).then(res => res.json()).then(res => {
          if(res.error) {
            let data = {title: "Earth", bio: `Around Me Circle for Earth`, category: "Places"};
            fetch("/api/circles", {
              method: "POST",
              headers: {'Content-Type': 'application/json'}, 
              body: JSON.stringify(data)
            }).then(res => res.json()).then(res => {
              if(!res.error) {
                state.aroundMeCircle = res;
                const url = state.aroundMeCircle ? `/api/freets?circleId=${state.aroundMeCircle._id}` : '/api/freets';
                fetch(url).then(async r => r.json()).then(freetRes => {
                  state.aroundMeFreets = freetRes;
                });
              }
            });
          } else {
            state.aroundMeCircle = res;
            const url = state.aroundMeCircle ? `/api/freets?circleId=${state.aroundMeCircle._id}` : '/api/freets';
            fetch(url).then(async r => r.json()).then(freetRes => {
              state.aroundMeFreets = freetRes;
            });
          }
        });
      }


      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`;
          const res = await fetch(url).then(async r => r.json());
          let aroundMeCircleName = [res.city, res.principalSubdivision].join(", ");
          if(aroundMeCircleName === "") {
            aroundMeCircleName = "Earth";
          }
          fetch(`/api/circles/${aroundMeCircleName}`, {
            credentials: 'same-origin' // Sends express-session credentials with request
          }).then(res => res.json()).then(res => {
            if(res.error) {
              let data = {title: aroundMeCircleName, bio: `Around Me Circle for ${aroundMeCircleName}`, category: "Places"};
              fetch("/api/circles", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(data)
              }).then(res => res.json()).then(res => {
                if(!res.error) {
                  state.aroundMeCircle = res;
                  const url = state.aroundMeCircle ? `/api/freets?circleId=${state.aroundMeCircle._id}` : '/api/freets';
                  fetch(url).then(async r => r.json()).then(freetRes => {
                    state.aroundMeFreets = freetRes;
                  });
                }
              });
            } else {
              state.aroundMeCircle = res;
              const url = state.aroundMeCircle ? `/api/freets?circleId=${state.aroundMeCircle._id}` : '/api/freets';
              fetch(url).then(async r => r.json()).then(freetRes => {
                state.aroundMeFreets = freetRes;
              });
            }
          });
          
        }, earthCircle);
      } else {
        earthCircle();
      }
    }

  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
