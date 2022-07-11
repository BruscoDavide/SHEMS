<template>
  <div id="containerActivity">
    <h2>Scheduling</h2>
    <table>
      <tr v-for="(device, index) in listDevices" v-bind:key="index">
        <td>
          <div class="containerdDeviceImage" @click="graphConsumption(device.name)">
            <!-- <ImageSVG :nameImage="this.defalutNameImage" width="50vw"  /> -->
          </div>
        </td>
        <td>
          <div id="details-device">
            <h3>{{ device.name }}</h3>
            <!-- <p id="stateDevice">{{ device.name }}</p> -->
            <p id="stateDevice" style="color:#0d74dc">
              <strong>{{ device.state }}</strong>
            </p>
            <p id="hourDevice"><strong>From: </strong>{{ device.start }}</p>
            <p id="hourDevice"><strong>To: </strong>{{ device.end}}</p>
            <p id="hourDevice"><strong>Power: </strong>{{ device.consumption }}</p>
            <button style="background-color: #95cafe" @click="graphConsumption2(device.name,device.label,device.data)">See consumption below</button>
          </div>
        </td>
      </tr>
      <tr></tr>
      <tr id="addElement">
        <td><button @click="changeModal" id="addButtonDevice">+</button></td>
        <td><p for="addButtonDevice">Change schedule</p></td>
      </tr>
    </table>
    

    <div class="modal-select" v-if="modalIsOpen">
      <div id="containt-data">
        <button @click="registerData('NewDeviceSchedule')">New device schedule</button>
        <button @click="changeModal">Cancel</button>
      </div>
    </div>
    <consumAppli  :name3="this.name2" :data3="this.data2" :labels3="this.labels2"/>

  </div>
</template>

<script>
/* eslint-disable */
import ImageSVG from "../components/FileSvg.vue";
import consumAppli from "./consumptionAppli.vue"
import axios from "axios";
export default {
  async mounted() {
    let url = process.env.VUE_APP_API_URL + "scheduling";
    await axios
      .get(url)
      .then((response) => {
        //console.log(response.data)
        console.log(typeof response.data)
        this.response2=response.data.replace(/'/g, '"')
        this.response3=JSON.parse(this.response2)
        this.listDevices = this.response3.scheduling
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
      defalutNameImage:"welcome-home",
      listDevices: [],
      response2:"",
      response3:{},
      response4:{},
      modalIsOpen: false,
      name2:"",
      labels2:[],
      data2:[]
    };
  },
  components: {
    ImageSVG,
    consumAppli
  },
  methods:{
    //Pusehs posts to the server when called

    changeModal() {
      this.modalIsOpen = !this.modalIsOpen;
    },

    graphConsumption2(name,label,data){
      this.name2=name
      console.log(this.name2)
      this.labels2=label
      console.log(this.labels2)
      console.log(typeof this.labels2)
      this.data2=data
      console.log(this.data2)
      console.log(typeof this.data2)
    },
    registerData(type) {
      switch (type) {
        case "NewDeviceSchedule":
          this.$router.push({ name: "newSchedule" });
          return;
        default:
          return;
      }
    },
  }
};
</script>

<style lang="scss" scoped>


#containerActivity {
  h2 {
    text-align: center;
  }

  table {
    width: auto;
    margin: 2em 1em;
    border-collapse: none;
    border-spacing: 1em 1.2em;
    tr {
      td {
        &:nth-child(1) {
          .containerdDeviceImage {
            display: flex;
            justify-content: center;
            border-radius: 100%;
            background-color: #95cafe;
            //background-color: #0d74dc;
            width: clamp(6em, 14vw, 16em);
            height: clamp(6em, 14vw, 16em);
          }
        }
        &:nth-child(2) {
          #details-device {
            display: block;

            p {
              &:nth-child(1) {
                font-weight: bold;
                font-size: clamp(1em, 1.4vw, 1.6em);
                overflow-wrap: break-word;
                
              }
              &:nth-child(1) {
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    tr#addElement {
      td {
        &:nth-child(1) {
          button {
            background-color: #95cafe;
            border-radius: 100%;
            width: 20vw;
            height: 20vw;
            border: none;
            font-size: clamp(2.5em, 3vw, 4em);
            font-weight: bold;
          }
        }
        &:nth-child(2) {
          font-size: clamp(1.2em, 1.8vw, 2em);
          font-weight: bold;
        }
      }
    }
  }

  .modal-select {
    display: grid;
    position: absolute;
    width: 100%;
    height: 100vh;
    place-items: center;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    #containt-data {
      border: 2px solid black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1em;
      width: 80%;
      height: 50%;
      background-color: white;
      border-radius: 10px;
      padding: 1em;

      button {
        border: none;
        font-size: clamp(1.8em, 2.2vw, 2.5em);
        padding: 1em;
        border-radius: 5px;
        background-color: #95cafe;
      }
    }
  }
}
</style>
