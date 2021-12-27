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
          v-for="post in sortedPost"
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
import TodoItem from "@/components/TodoItem.vue";
import { computed, toRefs } from "vue";
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
    sorted: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { sorted, posts } = toRefs(props);

    const sortedPost = computed(() => {
      if (sorted.value === "Up") {
        return posts.value.sort((a, b) => (a.title < b.title ? 1 : -1));
      }
      if (sorted.value === "Down") {
        return posts.value.sort((a, b) => (a.title > b.title ? 1 : -1));
      }
      return posts.value;
    });

    return { sortedPost };
  },
};
</script>

<style scoped></style>
