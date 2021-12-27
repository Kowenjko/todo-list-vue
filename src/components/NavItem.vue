<template>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="ex1-tab-1"
      data-mdb-toggle="tab"
      :class="{ active: active }"
      role="tab"
      aria-controls="ex1-tabs-1"
      aria-selected="true"
      >{{ tab }}</a
    >
  </li>
</template>
<script>
export default {
  props: {
    tab: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },   
  },
};
</script>
<style scoped></style>
