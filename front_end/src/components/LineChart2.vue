<script>
import { Line} from "vue-chartjs";
//const { reactiveProp } = mixins;
export default {
  extends: Line,
  //mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
/*     options: {
      type: Object,
      default: null,
    }, */
  },
  async mounted() {
    this.renderChart(this.chartData, this.options);
  },
  data(){
    return{
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
    }
  }
};
</script>
