<template>
  <div class="container-app">
    <div id="indicator">
      <!-- other logo -->
      <div class="logoIndicator">
        <Logo nameImage="welcome-home" width="36vw" />
        <p>SHEMS</p>
      </div>
    </div>
    <div id="InfoContent">
      <router-view></router-view>
    </div>

    <template id="sidebar"><Sidebar /></template>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Logo from "../components/FileSvg.vue";
export default {
  components: {
    Sidebar,
    Logo,
  },
};
</script>

<style lang="scss" scoped>
.container-app {
  display: grid;
  grid-template-rows: 10vh 80vh 9.4vh;
  position: fixed;
  width: 100%;
  #indicator {
    grid-row: 1/2;
    display: flex;
    flex-direction: row;

    justify-content: space-around;
    align-items: center;
    .logoIndicator {
      text-align: center;
      img {
        margin: 0 auto;
      }
      p {
        color: #92cbfe;
        font-size: clamp(0.5em, 1.5vw, 2em);
      }
    }
  }
  #InfoContent {
    grid-row: 2/3;
    display: block;
    max-height: 100%;
    overflow-y: scroll;
  }
  #sidebar {
    grid-row: 3/4;
  }
}
</style>
