import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	snackState: false,
    snackText: '',
    inputRules: [
          v => (v && v.length >= 1) || 'This Field is required!'
      ],
    mobileRules: [
          v => (v && v.length >= 1) || 'This Field is required!',
          v => Number.isInteger(Math.abs(v)) || 'Phone number must follow the format: "0705*******"',
          v => (v && v.length === 11) || 'Mobile Number should be 11 digits!'
      ],
    pwdRules: [
          v => (v && v.length !== '' && v.length >= 6) || 'Minimum length is 6  characters'
      ],
    userNameRules: [
          v => (v && v.length !== '' && v.length >= 3) || 'Minimum length is 3  characters'
      ],
    emailRules: [
          v => (v && v.length !== '' && v.length >= 1) || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
  },
  mutations: {
  	setSnackText: (state, payload) => {
      state.snackText = payload
      state.snackState = true
    }
  },
  actions: {
  	setSnackText: (context, payload) => {
      context.commit('setSnackText', payload)
    }
  }
})
