<template>
  <div>
    <h2 style="text-align: center; margin-bottom: 2em">{{this.name3}}</h2>
    <!-- <div v-if="this.name3==='Washing machine'" > -->
    <div  >
      <bar-line v-if="loaded" :chartData="chartData2" />
    </div>

    <div style="text-align:center;margin:20px">
      <input type="submit" value="Update graph" @click="updateGraph()" style="background-color: #95cafe;"/>
    </div>


  </div>
</template>

<script>
/* eslint-disable */
import LineGraphic from "../components/LineChart2.vue";

export default {
  
  async mounted() {
    //this.llamada1();
    //this.llamada2();
    this.updateGraph()

    
  },
  data() {
    //vue-chart.vue
    return {
      title:"",
      loaded:false,
      chartData2: {
        labels: [],
        datasets: [
          {
            label: "Consumption in Watts",
            borderWidth: 1,
            fill: false,
            backgroundColor: '#95cafe',
            borderColor: 'rgb(75, 192, 192)',
            pointBorderColor: "#2554FF",
            data: []
          },
        ],
      },
    };
  },
  components: {
    "bar-line": LineGraphic,
  },
  props:{
    name3:String,
    labels3:Array,
    data3:Array


  },
  methods:{
    updateGraph(){
      this.loaded=!this.loaded
      this.chartData2.labels=this.labels3
      this.chartData2.datasets[0].data=this.data3
    },
  }


  
};
</script>

<style lang="scss" scoped></style>
