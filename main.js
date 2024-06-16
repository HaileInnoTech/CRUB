const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: login,
      name: "login",
    },
    {
      path: "/logout",
      name: "logout",
    },
    {
      path: "/dashboard",
      component: dashboard,
    },
  ],
});

const app = Vue.createApp({
  data: function () {
    return {
      authenticated: false,
      authenticatedUser: "",
      error: false,
      errorMsg: "",
    };
  },
  mounted() {
    if (!this.authenticated) {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
  },
});

app.component("app-nav", {
  template: `
	<div>
  <router-link to="/login" v-on:click="logout()" tag="button" class="btn btn-secondary" replace>
  Logout <span class="mdi mdi-logout"></span>
</router-link>
    </div>
  `,
  methods: {
    logout() {
      this.$root.logout();
    },
  },
});
app.component("app-view", view);
app.component("app-insert", insert);
app.component("paginate", VuejsPaginateNext);
app.component("app-update", update);
app.component("app-delete", delete_course);

app.use(router);
app.mount("#app");
