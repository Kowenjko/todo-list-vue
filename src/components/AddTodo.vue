<template>
  <form
    @submit.prevent="submit"
    class="d-flex justify-content-center align-items-center mb-4"
  >
    <div class="form-outline flex-fill">
      <input
        ref="input"
        type="text"
        id="form2"
        class="form-control"
        v-model.trim="post.title"
        @keydown.enter.prevent="submit"
      />

      <label class="form-label" for="form2">New task...</label>
    </div>
    <button type="submit" class="btn btn-info ms-2">
      {{ post.id ? "Edit" : "Add" }}
    </button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const input = ref(null);

    const submit = () => {
      const post = {
        title: props.post.title,
        id: props.post.id ?? Date.now(),
        completed: props.post.completed ?? false,
      };
      props.post.title = "";
      props.post.id = null;
      props.post.completed = false;
      context.emit("add-post", post);
    };
    watch(props.post, () => {
      if (props.post.id) {
        input.value.focus();
      }
    });
    return {
      submit,
      input,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
