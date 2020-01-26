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
        <v-app-bar
          app
          color="indigo"
          dark
        >
          <v-toolbar-title>Application</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn text>
            <router-link to="/">Home</router-link> 
          </v-btn>
          <v-btn text v-if="!user">
            <router-link to="/login">Login</router-link> 
          </v-btn>
          <v-btn text v-if="!!user">
            <router-link to="/logout">Logout</router-link> 
          </v-btn>
          <v-btn text v-if="!!user">
            <router-link to="/secret">Secret</router-link> 
          </v-btn>
        </v-app-bar>


        <v-content>
          <v-container
            class="fill-height"
            fluid
          >
          <router-view/>
          </v-container>
        </v-content>
      </div>
    </v-layout>
  </v-app>
</template>
<script>
import Parse from 'parse'

export default {
  computed: {
    user: function() {
      return Parse.User.current()
    },
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