<template>
  <div class="tab-content" id="ex1-content">
    <div
      class="tab-pane fade show active"
      id="ex1-tabs-1"
      role="tabpanel"
      aria-labelledby="ex1-tab-1"
    >
      <p>{{ sortedPost }}</p>
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
import { watch, computed, toRefs } from "vue";
export default {
  components: { TodoItem },
  props: {
    posts: {
      type: Array,
      required: true,
    },
    tabNav: {
      type: String,
      required: true,
    },  
    sortedPost: {
      type: String,
      required: true,
    },  
  },
  setup(props) {
    const { sortedPost, posts } = toRefs(props);
    
    
    watch(sortedPost, () => {
      console.log(props.posts);
    });
    return {  };
  },
};
</script>

<style scoped></style>
