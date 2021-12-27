<template>
  <section class="vh-100 gradient-custom">
    <div class="container pt-5 h-100" >
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card">
            <div class="card-body p-5">
              <add-todo @add-post="AddTodoForm" :post="post" />

              <!-- Tabs navs -->
              <div class="d-flex">
                <tabs-nav @selectNav="selectTabs" />
                <search-sort-post
                  @search="searchPostTitle"
                  @sortedDown="sortedDown"
                  @sortedUp="sortedUp"
                />
              </div>
              <!-- Tabs navs -->

              <!-- Tabs content -->
              <todo-list
                :sorted="sortedPost"
                :posts="searchPostsTodo"
                @change="chandgeStatus"
                :tabNav="tabNav"
                @remove="removePost"
                @editPost="editPost"
                @returnPost="returnPost"
              />
              <!-- Tabs content -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import AddTodo from "./components/AddTodo.vue";
import TodoList from "./components/TodoList.vue";
import { ref, watch, onMounted, reactive, computed } from "vue";
import TabsNav from "./components/TabsNav.vue";
import SearchSortPost from "./components/SearchSortPost.vue";
import { loadTodoList } from "./api";

export default {
  components: { AddTodo, TodoList, TabsNav, SearchSortPost },
  setup() {
    const posts = ref([]);
    const postRemove = ref([]);
    const tabNav = ref("All");
    const tempPost = ref([]);
    const post = reactive({});
    const searchPost = ref("");
    const sortedPost = ref("");

    const AddTodoForm = (post) => {
      posts.value = posts.value.filter((elem) => elem.id !== post.id);
      if (post.title) {
        posts.value.push(post);
      }
    };
    const searchPostTitle = (search) => (searchPost.value = search);

    const chandgeStatus = (id) => {
      posts.value.forEach((elem) => {
        if (elem.id === id) {
          elem.completed = !elem.completed;
        }
      });
    };
    const sortedDown = (sort) => (sortedPost.value = sort);

    const sortedUp = (sort) => (sortedPost.value = sort);

    const selectTabs = (tab) => (tabNav.value = tab);

    const returnPost = (id) => {
      posts.value = [
        ...posts.value,
        ...postRemove.value.filter((elem) => elem.id === id),
      ];
      postRemove.value = postRemove.value.filter((elem) => elem.id !== id);
    };
    const removePost = (id) => {
      postRemove.value = [
        ...postRemove.value,
        ...posts.value.filter((elem) => elem.id === id),
      ];
      posts.value = posts.value.filter((elem) => elem.id !== id);
    };

    const selectTabsNav = () => {
      if (tabNav.value === "All") {
        tempPost.value = posts.value;
      } else if (tabNav.value === "Active") {
        tempPost.value = posts.value.filter((elem) => !elem.completed);
      } else if (tabNav.value === "Completed") {
        tempPost.value = posts.value.filter((elem) => elem.completed);
      } else {
        tempPost.value = postRemove.value;
      }
    };
    const editPost = (id) =>
      Object.assign(post, posts.value.filter((elem) => elem.id === id)[0]);

    const searchPostsTodo = computed(() =>
      tempPost.value.filter((post) =>
        post.title.toLowerCase().includes(searchPost.value)
      )
    );

    onMounted(async () => {
      posts.value = await loadTodoList();
      tempPost.value = posts.value;
    });

    watch(tabNav, selectTabsNav);
    watch(posts, selectTabsNav);
    watch(posts.value, selectTabsNav);

    return {
      posts,
      AddTodoForm,
      chandgeStatus,
      selectTabs,
      tabNav,
      postRemove,
      removePost,
      returnPost,
      tempPost,
      editPost,
      post,
      searchPost,
      searchPostsTodo,
      sortedPost,
      sortedDown,
      sortedUp,
      searchPostTitle,
    };
  },
};
</script>

<style>
.gradient-custom {
  background: radial-gradient(50% 123.47% at 50% 50%, #00ff94 0%, #720059 100%),
    linear-gradient(121.28deg, #669600 0%, #ff0000 100%),
    linear-gradient(360deg, #0029ff 0%, #8fff00 100%),
    radial-gradient(100% 164.72% at 100% 100%, #6100ff 0%, #00ff57 100%),
    radial-gradient(100% 148.07% at 0% 0%, #fff500 0%, #51d500 100%);
  background-blend-mode: screen, color-dodge, overlay, difference, normal;
}
.hover-mouse {
  cursor: pointer;
}
</style>
