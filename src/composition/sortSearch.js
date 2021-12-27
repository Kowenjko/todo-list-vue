import { ref, computed } from "vue";

export function useSortSearch(tempPost) {
  const searchPost = ref("");
  const sortedPost = ref("");

  const searchPostTitle = (search) => (searchPost.value = search);
  const sortedDown = (sort) => (sortedPost.value = sort);
  const sortedUp = (sort) => (sortedPost.value = sort);

  const searchPostsTodo = computed(() =>
    tempPost.value.filter((post) =>
      post.title.toLowerCase().includes(searchPost.value)
    )
  );
  return {
    searchPost,
    sortedPost,
    searchPostTitle,
    sortedDown,
    sortedUp,   
    searchPostsTodo,
  };
}
