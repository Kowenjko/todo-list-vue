<template>
  <div class="tab-content" id="ex1-content">
    <div
      class="tab-pane fade show active"
      id="ex1-tabs-1"
      role="tabpanel"
      aria-labelledby="ex1-tab-1"
    >
      <ul class="list-group mb-0">
        <todo-item
          class="hover-mouse"
          v-for="post in posts"
          :key="post.id"
          :post="post"
          :tabNav="tabNav"
          @click="$emit('change', post.id)"
          @remove="$emit('remove', $event)"
          @editPost="$emit('editPost', $event)"
          @returnPost="$emit('returnPost', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  components: { TodoItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    tabNav:{
        type:String,
        required: true,
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hover-mouse {
  cursor: cover;
}
</style>
