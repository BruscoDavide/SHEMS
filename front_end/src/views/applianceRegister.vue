<template>
  <div id="container-registerDevices">
    <h2>Appliances already registered</h2>
    <table class="list-devices">
      <tr
        id="deviceElement"
        v-for="(device, index) in listDevices"
        :key="index"
      >
        <td>
          <button><FileImage :nameImage="device.imgSrc" width="40vw" /></button>
        </td>
        <td>
          <div class="details-devices">
            <p>{{ device.name }}</p>
            <p>{{ device.details }}</p>
            <!--<p>{{device.id}}</p>-->
            <input
              value="delete"
              type="submit"
              style="background-color: #95cafe"
              @click="deleteData(device.name)"
            />
          </div>
        </td>
      </tr>

      <tr id="addElement">
        <td><button @click="changeModal" id="addButtonDevice">+</button></td>
        <td><p for="addButtonDevice">Add a new appliance</p></td>
      </tr>
    </table>

    <div class="modal-select" v-if="modalIsOpen">
      <div id="containt-data">
        <!-- <button @click="registerData('ev')">EV registration</button> -->
        <button @click="registerData('appliance')">New appliance</button>
        <button @click="changeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import FileImage from "../components/FileSvg.vue";
import axios from "axios";
export default {
  data() {
    return {
      response2:"",
      response3:{},
      listDevices: [],
      modalIsOpen: false,
      deleteAppliance:{
        action:"deleteAppliances",
        which:""
      }
    };
  },
  async mounted() {
    let url = process.env.VUE_APP_API_URL + "changeScheduling/listDevice";
    await axios
      .get(url)
      .then((response) => {
        this.response2=response.data.replace(/'/g, '"')
        this.response3=JSON.parse(this.response2)
        this.listDevices = this.response3.listDevices;
        console.log("works!!!")
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
  },
  methods: {
    changeModal() {
      this.modalIsOpen = !this.modalIsOpen;
    },

    registerData(type) {
      switch (type) {
        case "ev":
          this.$router.push({ name: "evregistration" });
          return;
        case "appliance":
          this.$router.push({ name: "newAppliance" });
          return;
        default:
          return;
      }
    },

    async updateList(){
      try{
        const response = await axios.get(process.env.VUE_APP_API_URL + "changeScheduling/listDevice")
        console.log(response)
        this.response2=response.data.replace(/'/g, '"')
        this.response3=JSON.parse(this.response2)
        this.listDevices = this.response3.listDevices;
      }catch(e){
        console.error(e)
      }
    },
    async deleteData(nameAppli2) {
      try {
        console.log(nameAppli2)
        this.deleteAppliance.which=nameAppli2
        const res = await axios.post(process.env.VUE_APP_API_URL + "settings",this.deleteAppliance);
        //const res = await axios.post(process.env.VUE_APP_API_URL + "settings");
        console.log(res)
        alert("device deleted");
        this.updateList()
      } catch (e) {
        console.error(e);
      }
    },
  },
  components: {
    FileImage,
  },
};
</script>

<style lang="scss" scoped>
#container-registerDevices {
  position: relative;
  height: 100%;
  h2 {
    margin-left: 1em;
  }
  table.list-devices {
    margin-top: 2em;

    text-align: center;
    width: 100%;
    border-collapse: none;
    border-spacing: 2em 1em;
    tr#deviceElement {
      td {
        &:nth-child(1) {
          button {
            border: none;
            background-color: #95cafe;
            border-radius: 100%;
            width: 20vw;
            height: 20vw;
          }
        }
        &:nth-child(2) {
          .details-devices {
            p {
              &:nth-child(1) {
                font-weight: bold;
                font-size: clamp(1.2em, 1.6vw, 2em);
              }
              &:nth-child(2) {
                font-size: clamp(1em, 1.3vw, 1.6em);
                color: #b8b7ba;
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
