<template>
  <div id="container-registerDevices">
    <h2>Active devices</h2>
    <table class="list-devices">
      <tr
        id="deviceElement"
        v-for="(device, index) in allDevices2"
        :key="index"
      >
        <td>
          <button><FileImage :nameImage="device.imgSrc" width="40vw" /></button>
        </td>
        <td>
          <div class="details-devices">
            <p>{{ device.name }}</p>
            <p><strong>From: </strong>{{ device.starting_time}}</p>
            <p><strong>To: </strong>{{ device.ending_time}}</p>
          </div>
        </td>
      </tr>
    </table>
<!--
      <tr id="addElement">
        <td><button @click="changeModal" id="addButtonDevice">+</button></td>
        <td><p for="addButtonDevice">Add a new appliances</p></td>
      </tr>
    </table>

    <div class="modal-select" v-if="modalIsOpen">
      <div id="containt-data">
        <button @click="registerData('ev')">EV registration</button>
        <button @click="registerData('comfort')">Comfort Parameter</button>
        <button @click="changeModal">Cancel</button>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import FileImage from "../components/FileSvg.vue";
//import axios from "axios";
export default {
  data() {
    return {
      listDevices: [],
      modalIsOpen: false,
    };
  },
/*   async mounted() {
    let url = process.env.VUE_APP_API_URL + "home";
    await axios
      .get(url)
      .then((response) => {
        this.listDevices = response.data.listDevices;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
  }, */
  methods: {
    changeModal() {
      this.modalIsOpen = !this.modalIsOpen;
    },

  },
  components: {
    FileImage,
  },
  props: {
    allDevices2:Array,
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
                color: #1a1a1bc4;
              }
              &:nth-child(3) {
                font-size: clamp(1em, 1.3vw, 1.6em);
                color: #1a1a1bc4;
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
