<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">Summary</h2>

    <div style="text-align:center;margin-top:20px;margin-bottom:20px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeObject('consumption')">Consumption</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeObject('EV_battery')">EV_battery</button>
      <button style="background-color: #95cafe;margin-right:30px" @click="changeObject('ESS_battery')">ESS_battery</button>
    </div>
    
    <!-- <div v-if="optionGraph==='day'"> -->
    <div >
      <bar-line v-if="loaded" :chartData="chartData" :options="options" />
    </div>


    <div style="text-align:center;margin-top:20px">
      <button style="background-color: #95cafe;margin-right:30px" @click="changeGraph('day')">Day</button>
      <button v-if="object==='consumption'" style="background-color: #95cafe;margin-right:30px" @click="changeGraph('week')">Week</button>
      <button v-if="object==='consumption'" style="background-color: #95cafe;margin-right:30px" @click="changeGraph('month')">Month</button>
      <button v-if="object==='consumption'" style="background-color: #95cafe;" @click="changeGraph('year')">Year</button>
    </div>

    <div style="margin:30px">
      <div id="detailsElem" style="background-color: #95cafe;text-align: center">
        <h2>{{this.mean.toFixed(2)}} kWh</h2>
        <p>Mean consumption</p>
      </div>
      <br>
      <div id="detailsElem" style="background-color: #95cafe;text-align: center">
        <h2>{{this.max.toFixed(2)}} kWh</h2>
        <p>Maximum consumption</p>
      </div>
      <br>
      <div id="detailsElem" style="background-color: #95cafe;text-align: center">
        <h2>{{this.min.toFixed(2)}} kWh</h2>
        <p>Minimum consumption</p>
      </div>
    </div>
    
    <!-- <h2>{{this.chartData.datasets.data}}</h2> -->
  </div>
</template>

<script>
/* eslint-disable */
import BartGraphic from "../components/BarChart.vue";
import axios from "axios";

export default {
  
  async mounted() {
    //Consulta los datos para graficar;
    let url = process.env.VUE_APP_API_URL + "summary";
    await axios
      //.get(url)
      .get(url,{params:{period:'day',object:'consumption'}})
      .then((response) => {
        this.response2=response.data.replace(/'/g, '"')
        this.response3=JSON.parse(this.response2)

        this.chartData.datasets[0].data = this.response3.data
        this.chartData.labels = this.response3.label
        this.mean = this.response3.mean
        this.max = this.response3.max
        this.min = this.response3.min
        

        this.loaded=true
        //this.listDevices = response.data;
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
    //vue-chart.vue
    return {
      response2:"",
      response3:{},
      optionGraph:"day",
      object:"consumption",
      loaded:false,
      loaded2:false,
      mean:"",
      max:"",
      min:"",
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Consumption in kWh",
            borderWidth: 1,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData2: {
        labels: [],
        datasets: [
          {
            label: "Consumption in kWh",
            borderWidth: 1,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData3: {
        labels: [],
        datasets: [
          {
            label: "Consumption in kWh",
            borderWidth: 1,
            backgroundColor: '#95cafe',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
      chartData4: {
        labels: [],
        datasets: [
          {
            label: "Consumption in kWh",
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
  components: {
    "bar-line": BartGraphic,
  },
  methods:{
    changeGraph(timeInterval) {
      this.loaded=false
      console.log(timeInterval);
      this.optionGraph = timeInterval;
      this.updateData()
    },
    //NEW PART ########################################
    changeObject(option) {
      this.loaded=false
      console.log(option);
      this.object = option;
    },
    async updateData() {
    //we update the data for the graph;
    let url = process.env.VUE_APP_API_URL + "summary";
    await axios
      .get(url,{params:{period:this.optionGraph,object:this.object}})
      .then((response) => {
        this.response2=response.data.replace(/'/g, '"')
        this.response3=JSON.parse(this.response2)
        //console.log(response.data)
        this.chartData.datasets[0].data = this.response3.data
        this.chartData.labels = this.response3.label
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
  }
};
</script>

<style lang="scss" scoped></style>
