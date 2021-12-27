<template>
  <li
    class="list-group-item d-flex align-items-center border-0 mb-2 rounded justify-content-between hover-mouse"
    style="background-color: #f4f6f7"
  >
    <div>
      <input
        class="form-check-input me-2"
        type="checkbox"
        value=""
        aria-label="..."
        :checked="post.completed"
      />
      <s v-if="post.completed">
        {{ post.title }}
      </s>
      <span v-else>{{ post.title }}</span>
    </div>
    <div v-if="tabNav==='Remove'">        
      <a data-mdb-toggle="tooltip" @click.stop="$emit('returnPost', post.id)">       
        <i class="fas fa-undo-alt text-info"></i>
      </a>
    </div>
    <div v-else>
        <a data-mdb-toggle="tooltip" @click.stop="$emit('editPost', post.id)"><i class="fas fa-pencil-alt me-3 text-info"></i></a>
      <a data-mdb-toggle="tooltip" @click.stop="$emit('remove', post.id)">
        <i class="fas fa-times text-primary"></i>
      </a>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
     tabNav: {
      type: String,
      required: true,
    },
  },
};
</script>
<style scoped>

</style>
