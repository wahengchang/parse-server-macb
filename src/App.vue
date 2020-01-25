<template>
  <v-app>
    <v-layout row justify-center>
      <v-dialog :value='isLoading' persistent content content-class="centered-dialog">
        <v-container fill-height>
          <v-layout column justify-center align-center>
            <v-progress-circular indeterminate color="white"></v-progress-circular>
            <p v-if="msgLoading != null">{{msgLoading || 'Loading...'}}</p>
          </v-layout>
        </v-container>
      </v-dialog>

      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/login">Login</router-link> |
          <router-link to="/logout">Logout</router-link> |
          <router-link to="/secret">Secret</router-link> |
        </div>
        <router-view/>
      </div>
    </v-layout>
  </v-app>
</template>
<script>
export default {
  computed: {
    isLoading: function() {
      return this.$store.system.isLoading
    },
    msgLoading: function() {
      return this.$store.system.msgLoading
    }
  },
  methods: {
    updateLoading(_value) {
      console.log('updateLoading: ', _value)
      this.isLoading = !this._value
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.dialog.centered-dialog,
.v-dialog.centered-dialog
{
  background: #282c2dad;
  box-shadow: none;
  border-radius: 6px;
  width: auto;
  color: whitesmoke;
}
</style>