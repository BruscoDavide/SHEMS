<template>
  <div id="container-register">
    <ImageSVG nameImage="welcome-home" width="95vw" />
    <h1 id="header-form">New appliance schedule</h1>
    <p id="instruction-text">
      Please fil out the following information about your appliance
    </p>
    <form id="formRegister" @submit="checkForm">
      <label for="device">Select your appliance</label>
      <select id="device" v-model="selected">
        <option disabled value="">Please select one</option>
        <option v-for="(device,index) in listDevices" v-bind:key="index">{{device}}</option>
<!--         <option>Diswasher</option>
        <option>Hair dryer</option>
        <option>Humidifier</option>
        <option>Oven</option>
        <option>Rice cooker</option>
        <option>Robot cleaner</option>
        <option>Vacuum cleaner</option>
        <option>Washing machine</option> -->

      </select>
      <span>Selected: {{selected }}</span>
      
      <div style="border:1px solid black;margin-bottom:20px">
        <label for="newTime2">Specific time</label>
        <br>
        <input type="time" id="newTime2" v-model="newTime2" />
       <!--  <br>
        <br>
        <label for="newTime3">Actual time</label>
        <br>
        <input type="button"  value="Time now" style="margin-bottom:5px"/> -->
      </div>
<!--       <label for="newTime2">New schedule time</label>
      <input type="time" id="newTime2" v-model="newTime2" />

      <input type="button" id="TimeNow" /> -->

      <spam id="errors-form" v-if="errors.length > 0">
        <ul>
          <li v-for="(error, index) in errors" v-bind:key="index">
            {{ error }}
          </li>
        </ul>
      </spam>
      
      <input type="button" value="Save" @click="updateData();getTime()"/>

      <input type="button" value="Back" @click="comeBack()"/>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import ImageSVG from "../components/FileSvg.vue";
import axios from "axios";
export default {
 
 async mounted() {
    //let url = process.env.VUE_APP_API_URL + "changeScheduling";
    let url = process.env.VUE_APP_API_URL + "changeScheduling/listDevice";
    await axios
      .get(url)
      .then((response) => {
        console.log(response)
        this.response2=response.data.replace(/'/g, '"')
        console.log('1')
        this.response3=JSON.parse(this.response2)
        console.log('2')
        this.listDevices = this.response3.listDevices;
        console.log(this.listDevices)
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
  },
  data() {
    return {
     // device: "",
      //newTime2: "",
      response2:"",
      response3:{},
      listDevices:[],
      id:1,
      errors: [],
      newTime2:"",
      selected:"",
      timeNow2:"",
      newSchedule:
      {
      id:"",
      name: "",
      imgSrc: "",
      details: "Putprove",
      state: "Putprove",
      time: "",
      consumption:"Putprove"
      },
      newSchedule2:{
        which:"",
        when:""
      }
    
    };
  },

  methods: {
    
    async comeBack() {
      //save the data with axios
      console.log("Data saved");
      //switch to the other layout
      this.$router.push({ name: "scheduling" });
    },
/*     fillInformation(){
      if (this.selected == "Washing machine"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="washingMachine",this.newSchedule.time=this.newTime2,this.newSchedule.id=2}
      if (this.selected == "Diswasher"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="dishWasher",this.newSchedule.time=this.newTime2,this.newSchedule.id=3}
      if (this.selected == "Oven"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="oven",this.newSchedule.time=this.newTime2,this.newSchedule.id=4}
      if (this.selected == "Rice cooker"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="riceCooker",this.newSchedule.time=this.newTime2,this.newSchedule.id=5}
      if (this.selected == "Hair dryer"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="hairDryer",this.newSchedule.time=this.newTime2,this.newSchedule.id=6}
      if (this.selected == "Humidifier"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="humidifier",this.newSchedule.time=this.newTime2,this.newSchedule.id=7}
      if (this.selected == "Robot cleaner"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="robotCleaner",this.newSchedule.time=this.newTime2,this.newSchedule.id=8}
      if (this.selected == "Vacuum cleaner"){this.newSchedule.name=this.selected,this.newSchedule.imgSrc="vacuumCleaner",this.newSchedule.time=this.newTime2,this.newSchedule.id=9}
    }, */
    fillInformation2(){
      this.newSchedule2.which = this.selected,
      //this.newSchedule2.when = this.getTime()
      this.newSchedule2.when = this.newTime2
    },
    async updateData(){
      try{
        this.fillInformation2()
        
        //const res = await axios.put(process.env.VUE_APP_API_URL + "scheduling/" + this.newSchedule.id, this.newSchedule)
        const res = await axios.post(process.env.VUE_APP_API_URL + "changeScheduling" , this.newSchedule2)
        console.log(res)
        console.log(this.newSchedule)
        alert("Appliance registered succesfully")
        
      }catch (e){
        console.error(e)
      }
    },
    
    checkForm(e) {
      this.errors = [];
      e.preventDefault();
      if (this.payload.selected == "") {
        this.errors.push("Select a device is mandatory");
      }
      if (this.payload.newTime2 == "") {
        this.errors.push("newTime2 is mandatory");
      }
      if (this.errors.length == 0) {
        //Save the information
        this.updateData();
      }
    },
    getTime(){
      var timeNow = new Date().toISOString()
      console.log(timeNow)
      console.log(typeof timeNow)
      //this.timeNow2 = timeNow
      return timeNow
    }
  },
  components: {
    ImageSVG,
  },

};
</script>

<style lang="scss" scoped>
#container-register {
  text-align: center;

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
    /* input[type="time"] {
      border: 2px solid black;
      padding: 0.2em 0.2em;
      font-size: clamp(1.8em, 2.1vw, 2.2em);
    } */
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
}
</style>
