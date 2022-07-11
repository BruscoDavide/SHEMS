import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    name: "",
    Tin_max: "",
    Tin_min: "",
    Tewh_max: "",
    Tewh_min: "",
    Cess_thresh_high: "",
    Cess_thresh_low: "",
    Time_departure: "",
    Cpev_thresh_high: "",
    Cpev_thresh_low: ""
    
  },
  mutations:{
    newName(state,familyName){
      state.name = familyName
    },
    newTin_max(state,valueA){
      state.Tin_max = valueA
    },
    newTin_min(state,valueB){
      state.Tin_min = valueB
    },
    newTewh_max(state,valueC){
      state.Tewh_max = valueC
    },
    newTewh_min(state,valueD){
      state.Tewh_min = valueD
    },
    newCess_thresh_high(state,valueE){
      state.Cess_thresh_high = valueE
    },
    newCess_thresh_low(state,valueF){
      state.Cess_thresh_low = valueF
    },
    newTime_departure(state,valueG){
      state.Time_departure = valueG
    },
    newCpev_thresh_high(state,valueH){
      state.Cpev_thresh_high = valueH
    },
    newCpev_thresh_low(state,valueI){
      state.Cpev_thresh_low = valueI
    },
  },

});

/* registration:{
  name: "",
  Tin_max: "",
  Tin_min: "",
  Tewh_max: "",
  Tewh_min: "",
  Cess_thresh_low: "",
  Cess_thresh_high: "",
  Cpev_thresh_low: "",
  Cpev_thresh_high: "",
  time_arrival: ""
} */
