<template>
  <div class="d-flex">
    <div
      class="d-flex justify-content-center align-items-center mb-4 ms-2 form-outline"
    >
      <input
        @input="$emit('search', searchPost)"
        v-model="searchPost"
        type="text"
        id="form3"
        class="form-control form-control border"
      />
      <label class="form-label" for="form3">Search</label>
    </div>
    <div class="mt-2 ps-4 pb-2 text-muted">
      <span>Sorted:</span>
      <a @click="$emit('sortedDown', 'Down')" class="ps-2 text-info hover-mouse"
        ><i class="fas fa-long-arrow-alt-down"></i
      ></a>
      <a @click="$emit('sortedUp', 'Up')" class="ps-2 text-info hover-mouse"
        ><i class="fas fa-long-arrow-alt-up"></i
      ></a>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const searchPost = ref("");

    return { searchPost };
  },
};
</script>
