<template>
  <div class="container">
    <div class="icon-image">
      <SvgImage nameImage="welcome-home" width="100px" height="auto" />
      <p id="letter-icon">SHEMS</p>
    </div>
    <h2>Settings</h2>
    <div id="username" class="input-text">
      <p>Family name: {{newRegistration.new_values.family_name}} </p>
    </div>

    
    <div id="Comfort">
      <h2><strong>Comfort Parameters</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum interior temperature: {{newRegistration.new_values.Tin_max}} </p>
        <input type="number" v-model="newRegistration2.new_values.Tin_max" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum interior temperature: {{newRegistration.new_values.Tin_min}}</p>
        <input type="number" v-model="newRegistration2.new_values.Tin_min" />
      </div>
      <div id="temMaxEnvi" class="input-text">
        <p>Maximum temperature of the water: {{newRegistration.new_values.Tewh_max}}</p>
        <input type="number" v-model="newRegistration2.new_values.Tewh_max" />
      </div>
      <div id="temMinEnvi" class="input-text">
        <p>Minimum temperature of the water: {{newRegistration.new_values.Tewh_min}}</p>
        <input type="number" v-model="newRegistration2.new_values.Tewh_min" />
      </div>
    </div>
    <div id="Comfort">
      <h2><strong>Energy storage system</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum level of the batteries: {{newRegistration.new_values.Cess_thresh_high}} </p>
        <input type="number" v-model="newRegistration2.new_values.Cess_thresh_high" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum level of the batteries:  {{newRegistration.new_values.Cess_thresh_low}} </p>
        <input type="number" v-model="newRegistration2.new_values.Cess_thresh_low" />
      </div>
    </div>
    <div id="Comfort">
      <h2><strong>Electric vehicle</strong></h2>
      <div id="temMax" class="input-text">
        <p>Maximum level: {{newRegistration.new_values.Cpev_thresh_high}} </p>
        <input type="number" v-model="newRegistration2.new_values.Cpev_thresh_high" />
      </div>
      <div id="temMin" class="input-text">
        <p>Minimum level: {{newRegistration.new_values.Cpev_thresh_low}} </p>
        <input type="number" v-model="newRegistration2.new_values.Cpev_thresh_low" />
      </div>
      <div id="temMin" class="input-text">
        <p>Usually time of arrival: {{newRegistration.new_values.time_dep}} </p>
        <input type="time" v-model="newRegistration2.new_values.time_dep" />
      </div>
    </div>


    <div id="registerButoon" class="input-text">
      <input  value="Register" type="submit" @click="postData()"/>
      <input  value="Next" type="submit" @click="nextData()"/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import SvgImage from "../components/FileSvg.vue";
import axios from "axios";
export default {
  async mounted() {
    //let url = process.env.VUE_APP_API_URL + "settingsoldParameters";
    let url = process.env.VUE_APP_API_URL + "settings/oldParameters";
    //let url = process.env.VUE_APP_API_URL + "/SHEMS/settings/oldParameters";
    await axios
      .get(url)
      .then((response) => {
        console.log(response)
        this.response2=response.data.replace(/'/g, '"')
        console.log('1')
        this.response3=JSON.parse(this.response2)
        console.log('2')
        this.newRegistration = this.response3;
        console.log(this.newRegistration.new_values.time_dep)
      })
      .catch((err) => {
        switch (err) {
          case 401:
            console.log("error");
            break;
        }
      });
  },
  data() {
    return {
      response2:"",
      response3:{},
      newRegistration:{
        new_values:{
        action:"",
        family_name: "",
        Tin_max: "",
        Tin_min: "",
        Tewh_max: "",
        Tewh_min: "",
        Cess_thresh_low: "",
        Cess_thresh_high: "",
        Cpev_thresh_low: "",
        Cpev_thresh_high: "",
        time_dep: "",
        }
        
      },
      newRegistration2:{
        action:"",
        new_values:{
          Tin_max: "",
          Tin_min: "",
          Tewh_max: "",
          Tewh_min: "",
          Cess_thresh_low: "",
          Cess_thresh_high: "",
          Cpev_thresh_low: "",
          Cpev_thresh_high: "",
          time_dep: ""

        }
        
      }
      
    };
  },
  components: {
    SvgImage,
  },
  methods:{
    async postData(){
      try{
        this.fillData()
        console.log(this.newRegistration2)
        this.newRegistration2.action="changeSetpoints"
        const res = await axios.post(process.env.VUE_APP_API_URL + "settings",this.newRegistration2)
        //const res = await axios.post(process.env.VUE_APP_API_URL + "settings",this.newRegistration)
        //const res = await axios.post(process.env.VUE_APP_API_URL + "settings/oldParameters",this.newRegistration)
        alert("Information saved succesfully")
      }catch (e){
        console.error(e)
      }
    },
    async nextData() {
      //save the data with axios
      console.log("Data saved");
      //switch to the other layout
      this.$router.push({ name: "applianceRegister" });
    },
    fillData(){
      if (this.newRegistration2.new_values.Tin_min == ""){this.newRegistration2.new_values.Tin_min=this.newRegistration.new_values.Tin_min}
      if (this.newRegistration2.new_values.Tin_max == ""){this.newRegistration2.new_values.Tin_max=this.newRegistration.new_values.Tin_max}
      if (this.newRegistration2.new_values.Tewh_max == ""){this.newRegistration2.new_values.Tewh_max=this.newRegistration.new_values.Tewh_max}
      if (this.newRegistration2.new_values.Tewh_min == ""){this.newRegistration2.new_values.Tewh_min=this.newRegistration.new_values.Tewh_min}
      if (this.newRegistration2.new_values.Cess_thresh_low == ""){this.newRegistration2.new_values.Cess_thresh_low=this.newRegistration.new_values.Cess_thresh_low}
      if (this.newRegistration2.new_values.Cess_thresh_high == ""){this.newRegistration2.new_values.Cess_thresh_high=this.newRegistration.new_values.Cess_thresh_high}
      if (this.newRegistration2.new_values.Cpev_thresh_low == ""){this.newRegistration2.new_values.Cpev_thresh_low=this.newRegistration.new_values.Cpev_thresh_low}
      if (this.newRegistration2.new_values.Cpev_thresh_high == ""){this.newRegistration2.new_values.Cpev_thresh_high=this.newRegistration.new_values.Cpev_thresh_high}
      if (this.newRegistration2.new_values.time_dep == ""){this.newRegistration2.new_values.time_dep=this.newRegistration.new_values.time_dep}
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 100%;
  text-align: center;
  .icon-image {
    text-align: center;

    #letter-icon {
      font-size: 1.4em;
      font-weight: bold;
      letter-spacing: 5px;
      color: #5eaffb;
    }
  }
  h2 {
    padding: 1em 0em;
  }
  .input-text {
    display: flex;
    flex-direction: column;
    padding: 1em 2em;
    p {
      align-self: start;
      font-weight: bold;
    }
    input[type="text"],
    input[type="password"] {
      padding: 0.5em 0.5em;
      font-size: clamp(0.8em, 2vw, 4em);
    }
    input[type="submit"] {
      width: 30vw;
      margin: 0 auto;
      font-size: clamp(0.8em, 2vw, 6em);
      padding: 0.5em;
      border: 2px solid black;
      border-radius: 7px;
      font-weight: bold;
      background-color: #94cafe;
    }
  }
}
</style>
