<template>
  <div id="container-register">
    <ImageSVG nameImage="welcome-home" width="95vw" />
    <h1 id="header-form">Appliance registration</h1>
    <p id="instruction-text" style="text-align:left;padding:10px">
      This is a first registration of the  home appliances, later on you will be able to modify them on settings
    </p>
    <br>
    <form id="formRegister" @submit="checkForm">
      <h3>Select your appliances to make an initial scheduling:</h3>
      <br>
      

      <div class="checkboxes">
        <label><input type="checkbox" value="Washing machine" v-model="washingMachineSel"> <span>Washing machine</span></label>
        <label><input type="checkbox" value="Diswasher" v-model="dishwasherSel"> <span>Diswasher</span></label>
        <label><input type="checkbox" value="Vacuum cleaner" v-model="vacuumCleanerSel"> <span>Vacuum cleaner</span></label>
        <label><input type="checkbox" value="Other" v-model="otherSel"> <span>Other</span></label>
        <span>Checked names: {{ washingMachineSel }} , {{ dishwasherSel }}, {{ vacuumCleanerSel }}, {{ otherSel }}</span>

        <div v-if="otherSel===true">
          <label for="nameAppli">Type of the appliance</label>
          <input type="text" id="nameAppli"  v-model="nameAppli2" />
          <label for="consumption">Consumption in W</label>
          <input type="text" id="consumption"  v-model="consumptionAppli2" />
          <label for="running_length">Normal working time in minutes</label>
          <input type="number" id="running_lenght"  v-model="running_lenAppli2" />
        </div>

      </div>
      
      


      <spam id="errors-form" v-if="errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index">
            {{ error }}
          </li>
        </ul>
      </spam>

      <input type="submit" value="Back" @click="comeBack()"/>
      <input type="submit" value="Finish" @click="saveData()"/>
      
    </form>

    
  </div>
</template>

<script>
import ImageSVG from "../components/FileSvg.vue";
import axios from "axios";
export default {
  data() {
    return {
      washingMachineSel:false,
      dishwasherSel:false,
      vacuumCleanerSel:false,
      otherSel:false,
      checkedNames:[],
      nameAppli2:"",
      consumptionAppli2:"",  
      running_lenAppli2:"",

      errors: [],
      selected: '',

      payload: {
        family_name:{
          family_name: ""
        },
        EV:{
          Time_departure: "",
          Cpev_thresh_high: "",
          Cpev_thresh_low: ""
        },
        setpoints:{
          Tin_max: "",
          Tin_min: "",
          Tewh_max: "",
          Tewh_min: ""

        },
        home_batteries:{
          Cess_thresh_high: "",
          Cess_thresh_low: ""
        },
        applianceData:[
          {
            name:"none",
            consumption:"",
            running_len:"",
          },
          {
            name:"none",
            consumption:"",
            running_len:"",
          },
          {
            name:"none",
            consumption:"",
            running_len:"",
          },
          {
            name:"none",
            consumption:"",
            running_len:"",
          },
        ]
  },
    };


  },
  methods: {
    async comeBack() {
      //save the data with axios
      console.log("Data saved");
      //switch to the other layout
      this.$router.push({ path: "ev-registration2" });
    },
    async DeleteInfo(){
        //axios.delete((process.env.VUE_APP_API_URL + "scheduling",this.newDevice))
        console.log("Its working")
    },
    checkForm(e) {
      this.errors = [];
      e.preventDefault();
      if (this.device == "") {
        this.errors.push("Model is mandatory");
      }
      if (this.newTime2 == "") {
        this.errors.push("newTime2 is mandatory");
      }
      if (this.errors.length == 0) {
        //Save the information
      }
    },
/*     fillInformation(){
      if (this.selected == "Washing machine"){this.newAppliance.name=this.selected,this.newAppliance.action="addAppliances"}
      if (this.selected == "Diswasher"){this.newAppliance.name=this.selected,this.newAppliance.action="addAppliances"}
      if (this.selected == "Vacuum cleaner"){this.newAppliance.name=this.selected,this.newAppliance.action="addAppliances"}
      if (this.selected == "Other"){this.newAppliance.action="addAppliances"}
    }, */
    reset(){
      this.name="",
      this.consumption="",
      this.running_len=""

    },
    fillData(){
      this.payload.family_name.family_name=this.$store.state.name
      this.payload.setpoints.Tin_max=this.$store.state.Tin_max
      this.payload.setpoints.Tin_min=this.$store.state.Tin_min
      this.payload.setpoints.Tewh_max=this.$store.state.Tewh_max
      this.payload.setpoints.Tewh_min=this.$store.state.Tewh_min
      this.payload.home_batteries.Cess_thresh_high=this.$store.state.Cess_thresh_high
      this.payload.home_batteries.Cess_thresh_low=this.$store.state.Cess_thresh_low
      this.payload.EV.Time_departure=this.$store.state.Time_departure
      this.payload.EV.Cpev_thresh_high=this.$store.state.Cpev_thresh_high
      this.payload.EV.Cpev_thresh_low=this.$store.state.Cpev_thresh_low

    },
    fillApplianceData(){
      if(this.washingMachineSel===true){
        this.payload.applianceData[0].name="washing_machine"
      }
      if(this.dishwasherSel===true){
        this.payload.applianceData[1].name="dishwasher"
      }
      if(this.vacuumCleanerSel===true){
        this.payload.applianceData[2].name="vacuum_cleaner"
      }
      if(this.otherSel===true){
        this.payload.applianceData[3].name=this.nameAppli2
        this.payload.applianceData[3].consumption=this.consumptionAppli2
        this.payload.applianceData[3].running_len=this.running_lenAppli2
      }
    },
    /* async saveData2(){
      try{
        this.fillInformation()
        //const res = await axios.post(process.env.VUE_APP_API_URL + "appliances-registered", this.newAppliance)
        const res = await axios.post(process.env.VUE_APP_API_URL + "settings", this.newAppliance)
        this.reset()
        console.log(this.payload)
        alert("Appliance registered succesfully")
        console.log(res)
      }catch (e){
        console.error(e)
      }
    }, */
    async saveData() {
      this.fillData()
      this.fillApplianceData()
      try {
        console.log(this.$store.Time_departure)
        //const res = await axios.post(process.env.VUE_APP_API_URL + "appliances-registered", this.newAppliance)
        //this.fillData();
        //const res = await axios.post(process.env.VUE_APP_API_URL + "user", {name:this.$store.state.name})
        const res = await axios.post(process.env.VUE_APP_API_URL + "registration",this.payload);
        alert("Information registered succesfully");
        console.log(res);
        localStorage.setItem("auth", true);
        this.$router.push({ path: "/dashboard/home-resume" });
      } catch (e) {
        console.error(e);
      }
    },
  },
  components: {
    ImageSVG,
  },
};
</script>

<style lang="scss" scoped>
#container-register {
  text-align: center;
  margin-top: 50px;
  

  #instruction-text {
    font-size: clamp(1em, 1.3vw, 1.6em);
    margin-top: 1em;
  }
  img {
    margin: 0 auto;
  }
  #formRegister {
    display: flex;
    margin-top: 1em;
    flex-direction: column;
    padding: 0em 1em;
    text-align: center;
    gap: 0.5em;
    input[type="text"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    }
    input[type="number"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    }
    input[type="time"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    }
    input[type="submit"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      margin-top: 1em;
      width: 100%;
      align-self: center;
      font-size: clamp(1.5em, 1.8vw, 2em);
      margin-bottom: 1em;
      background-color: #95cafe;
      border-radius: 5px;
    }
    input[type="checkbox"] {
      vertical-align: middle;
      margin-left: 5px;
      padding-left: 5px;
      bottom: 1px;
    }
    label {
      text-align: start;
      font-weight: bold;
      font-size: clamp(1.2em, 1.4vw, 1.8em);
    }
  }
  #errors-form {
    color: rgb(168, 14, 14);
    font-weight: bold;
    font-size: clamp(1em, 1.3vw, 1.6em);
    ul {
      list-style-type: none;
    }
  }
  .checkboxes label {
  display: block;
  padding-right: 10px;
  padding-left: 22px;
  text-indent: -22px;
  }
  .checkboxes input {
    vertical-align: middle;
  }
  .checkboxes label span {
    vertical-align: middle;
}
}
</style>
