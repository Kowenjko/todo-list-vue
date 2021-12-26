<template>
  <section class="vh-100 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card">
            <div class="card-body p-5">
              <add-todo @add-post="AddTodoForm" :post="post" />

              <!-- Tabs navs -->
              <tabs-nav @selectNav="selectTabs" />
              <!-- Tabs navs -->

              <!-- Tabs content -->
              <todo-list
                :posts="tempPost"
                @change="chandgeStatus"
                :tabNav="tabNav"
                @remove="removeTodo"
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
import { ref, watch, onMounted, reactive } from "vue";
import TabsNav from "./components/TabsNav.vue";

export default {
  components: { AddTodo, TodoList, TabsNav },
  setup() {
    const posts = ref([
      { id: 1, title: "dflksdjfklsdfjlsdf", checkout: false },
      { id: 2, title: "dflksdjfk", checkout: true },
      { id: 3, title: "dflksdjfjnkljnkljk", checkout: false },
    ]);
    const postActive = ref([]);
    const postCompleted = ref([]);
    const postRemove = ref([]);
    const tabNav = ref("All");
    const tempPost = ref([]);
    const post = reactive({});

    const AddTodoForm = (post) => {
      posts.value = posts.value.filter((elem) => elem.id !== post.id);
      posts.value.push(post);
    };

    const chandgeStatus = (id) => {
      posts.value.forEach((item) => {
        if (item.id === id) {
          item.checkout = !item.checkout;
        }
      });
    };
    const addAvtive = () => {
      postCompleted.value = [];
      postActive.value = [];
      posts.value.forEach((elem) => {
        elem.checkout
          ? postCompleted.value.push(elem)
          : postActive.value.push(elem);
      });
    };
    const selectTabs = (tab) => {
      tabNav.value = tab;
      if (tab === "All") {
        tempPost.value = posts.value;
      } else if (tab === "Active") {
        addAvtive();
        tempPost.value = postActive.value;
      }
    };
    const returnPost = (id) => {
      posts.value = [
        ...posts.value,
        ...postRemove.value.filter((r) => r.id === id),
      ];
      postRemove.value = postRemove.value.filter((r) => r.id !== id);
    };
    const removeTodo = (id) => {
      postRemove.value = [
        ...postRemove.value,
        ...posts.value.filter((r) => r.id === id),
      ];
      posts.value = posts.value.filter((r) => r.id !== id);
      postCompleted.value = postCompleted.value.filter((r) => r.id !== id);
    };

    // const selectTabsNav = () => {
    //   if (tabNav.value === "All") {
    //     tempPost.value = posts.value;
    //   } else if (tabNav.value === "Active") {
    //     tempPost.value = postActive.value;
    //   } else if (tabNav.value === "Completed") {
    //     tempPost.value = postCompleted.value;
    //   } else {
    //     tempPost.value = postRemove.value;
    //   }
    // };
    const editPost = (id) => {
      Object.assign(post, posts.value.filter((r) => r.id === id)[0]);
    };
    onMounted(() => {
      tempPost.value = posts.value;
      // selectTabsNav();
      // posts.value.forEach((elem) => {
      //   elem.checkout
      //     ? postCompleted.value.push(elem)
      //     : postActive.value.push(elem);
      // });
    });
    watch(tabNav, () => {
      console.log("Табс");
      // selectTabsNav();
    });
    watch(posts, () => {
      // selectTabsNav();
      postCompleted.value = [];
      postActive.value = [];
      posts.value.forEach((elem) => {
        elem.checkout
          ? postCompleted.value.push(elem)
          : postActive.value.push(elem);
      });
    });
    watch(posts.value, () => {
      // selectTabsNav();

      postCompleted.value = [];
      postActive.value = [];
      posts.value.forEach((elem) => {
        elem.checkout
          ? postCompleted.value.push(elem)
          : postActive.value.push(elem);
      });
    });
    return {
      posts,
      AddTodoForm,
      chandgeStatus,
      postActive,
      postCompleted,
      selectTabs,
      tabNav,
      postRemove,
      removeTodo,
      returnPost,
      tempPost,
      editPost,
      post,
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
</style>
