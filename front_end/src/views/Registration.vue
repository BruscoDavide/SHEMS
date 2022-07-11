<template>
  <div class="container">
    <p id="title-welcome">Welcome to</p>
    <ImageShow nameImage="welcome-home" width="250vw" height="auto" />
    <p id="name-app">SHEMS</p>
    <p id="title-welcome">Registration</p>
    <div class="input-house">
      <div id="username" class="input-text">
        <p>Family name</p>
        <input type="text" v-model="familyName" />
      </div>
      <button @click="Next()">Next</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageShow from "@/components/FileSvg.vue";

export default {
  name: "Registration",
  data() {
    return {
      familyName: "",
      state: false,
    };
  },
  components: {
    ImageShow,
  },
  methods: {
    Next() {{
        // this.$store.dispatch("loggedUserAction"); ///Save in vuex
        //Consulta Api para verificar usuario con AXIOS
        this.$store.commit('newName',this.familyName)
        this.$router.push({ path: "/comfort-parameters2" });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  padding: 1em 0em;
  grid-template-rows: repeat(3, auto);
  gap: 1em;
  p {
    text-align: center;
    &#title-welcome {
      font-size: clamp(2em, 10vw, 18em);
    }
    &#name-app {
      font-size: clamp(4em, 15vw, 17em);
      color: #5eaffb;
      letter-spacing: 5px;
    }
  }
  img {
    margin: 0 auto;
  }
  .input-house {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.6em;
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
    }
    #text-code {
      margin-top: 5px;
      padding: 0.2em 0em;
      font-size: clamp(1.5em, 4vw, 6em);
    }
    #text-code-input {
      padding: 0.1em 0em;
      font-size: clamp(2em, 2vw, 6em);
      border: 2px solid black;
      width: 80%;
      align-self: center;
    }
    button {
      margin-top: 1em;
      border: 2px solid black;
      padding: 5px 0px;
      background-color: #94cafe;
      font-weight: bold;
      font-size: clamp(1em, 4vw, 4em);
      border-radius: 5px;
      width: 80%;
      align-self: center;
    }
  }
}
</style>
