import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const userStore = new Vuex.Store({
  state: {
    userInfo: {},
    s:{},
    count:0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: true}
    ]
  },
  getters: {
    getUserInfo:state => {
      return state.userInfo
    },
    t:state =>{
      return state.s
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
     t(state,data){
       state.s =data
     },
    increment:state=>{
      state.count++
      
    }
  },
  actions:{
    setUserInfo ({commit}, user) {
      commit('setUserInfo', user)
    }
  }
})
export default userStore
