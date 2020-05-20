<template>
  <v-app>

    <Navbar />

    <v-content>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>

    <Footer/>

    <v-snackbar v-model="$store.state.snackState" color="success" :timeout="timeout" top right>
      {{$store.state.snackText}}
      <v-btn color="white" flat icon @click="$store.state.snackState = !$store.state.snackState">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      timeout: 9000
    }
  }
}
</script>
