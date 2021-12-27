<template>
  <ul class="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
    <nav-item
      v-for="(tab, index) in tabsName"
      :key="index"
      :tab="tab"
      @click="chandgeNav(tab)"
      :active="tabsActive === tab"
    />
  </ul>
</template>
<script>
import { ref } from "vue";
import NavItem from "@/components/NavItem.vue";
export default {
  components: { NavItem },
  setup(_, context) {
    const tabsName = ["All", "Active", "Completed", "Remove"];
    const tabsActive = ref("All");
    const chandgeNav = (tab) => {
      tabsActive.value = tab;
      context.emit("selectNav", tab);
    };
    return {
      tabsName,
      chandgeNav,
      tabsActive,
    };
  },
};
</script>
<style scoped></style>
