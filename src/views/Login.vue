<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-card>
        <v-toolbar dark flat>
          <v-toolbar-title>Login form</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              class='loginInput'
              label="Login"
              name="login"
              type="text"
               v-model="username"
            />
            <v-text-field
              class='loginInput'
              id="password"
              label="Password"
              name="password"
              type="password"
              v-model="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import Parse from "parse";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const { username, password } = this;
      if (!username || !password)
        return alert("[ERROR] username and password are required");

      await Parse.User.logIn(username, password);

      const { redirect = null } = this.$route.query || {};

      if (redirect) return this.$router.replace({ name: "secret" });

      this.$router.replace({ name: "secret" });
    }
  },
  components: {}
};
</script>

<style scoped>
input {
  display: block;
  margin: auto;
}
.loginInput {
  min-width: 300px;
}
</style>