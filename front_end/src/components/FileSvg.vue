<template>
  <img
    :width="width"
    :height="height"
    :src="require(`../assets/Images/${nameImage}.svg`)"
  />

  <!-- src="urlImage + nameImage" -->
</template>

<script>
// @ is an alias to /src

export default {
  props: {
    nameImage: String,
    width: String,
    height: String,
  },
  name: "Image2",
};
</script>
