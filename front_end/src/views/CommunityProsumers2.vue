<template>
  <div id="container-registerDevices" >
    <h2>Community transactions</h2>
    <table class="list-devices" >
      <tr
        id="deviceElement"
        v-for="(device, index) in listDevices"
        :key="index"
      >
        <td>
          <div class="details-devices" style="background-color: #95cafe;padding:10px">
            <p><strong>Name: </strong>{{ device.name }}</p>
            <p><strong>Interactions: </strong>{{ device.interactions }}</p>
            <p><strong>Total energy sold: </strong>{{ device.tot_energy_sold }}</p>
            <p><strong>Total energy bought: </strong>{{ device.tot_energy_bought }}</p>
            <p><strong>Mean price sold: </strong>{{ device.mean_price_sold }}</p>
            <p><strong>Mean price bought: </strong>{{ device.mean_price_bought }}</p>
<!--             <p><strong>From: </strong>{{ device.starting_time}}</p>
            <p><strong>To: </strong>{{ device.ending_time}}</p> -->
          </div>
        </td>
      </tr>
    </table>
    <div style="margin-top:20px">
      <bar-line v-if="loaded" :chartData="chartData" :options="options" />
    </div>
    <div style="text-align:center;margin-top:40px;margin-bottom:40px;padding-bottom:40px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('energySold')">Energy Sold</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('energyBought')">Energy Bought</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import FileImage from "../components/FileSvg.vue";
import BartGraphic from "../components/BarChart.vue";
import axios from "axios";
export default {
  data() {
    return {
      response2:"",
      response3:{},
      response4:"",
      response5:{},
      listDevices: [],
      modalIsOpen: false,
      optionGraph:"energySold",
      loaded:false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Resume",
            borderWidth: 1,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  async mounted() {

    //PROSUMERS
    //let url = process.env.VUE_APP_API_URL + "communityprosumers";
    let url = process.env.VUE_APP_API_URL + "community/prosumers";
    await axios
      .get(url)
      .then((response) => {
        this.response2=response.data.replace(/'/g, '"')
        this.response3=JSON.parse(this.response2)
        this.listDevices = this.response3;
        console.log(this.listDevices)
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });

    //PLOTS
    let url2 = process.env.VUE_APP_API_URL + "community/plots";
    await axios
      //.get(url)
      .get(url2,{params:{period:this.optionGraph}})
      .then((response) => {
        console.log(response.data)
        this.response4=response.data.replace(/'/g, '"')
        this.response5=JSON.parse(this.response4)
        this.chartData.datasets[0].data = this.response5.data
        this.chartData.labels = this.response5.labels
        this.loaded=true
        //this.listDevices = response.data;
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
        case "comfort":
          this.$router.push({ name: "comfortParameters" });
          return;
        default:
          return;
      }
    },
    changeGraph(energyType) {
      this.loaded=false
      console.log(energyType);
      this.optionGraph = energyType;
      this.updateData()
    },
    async updateData() {
    //we update the data for the graph;
    let url = process.env.VUE_APP_API_URL + "community/plots";
    await axios
      .get(url,{params:{period:this.optionGraph}})
      .then((response) => {
        console.log(response.data)
        this.response4=response.data.replace(/'/g, '"')
        this.response5=JSON.parse(this.response4)
        this.chartData.datasets[0].data = this.response5.data
        this.chartData.labels = this.response5.labels
        this.loaded=true
        //this.listDevices = response.data;
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            console.log("error");
            break;
        }
      });
    },
  },
  components: {
    FileImage,
    "bar-line": BartGraphic,
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

    text-align: left;
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
