import { reactive } from "vue";

export function usePost(posts, postRemove) {
  const post = reactive({});

  const AddTodoForm = (post) => {
    posts.value = posts.value.filter((elem) => elem.id !== post.id);
    if (post.title) {
      posts.value.push(post);
    }
  };

  const editPost = (id) =>
    Object.assign(post, posts.value.filter((elem) => elem.id === id)[0]);

  const removePost = (id) => {
    postRemove.value = [
      ...postRemove.value,
      ...posts.value.filter((elem) => elem.id === id),
    ];
    posts.value = posts.value.filter((elem) => elem.id !== id);
  };

  const returnPost = (id) => {
    posts.value = [
      ...posts.value,
      ...postRemove.value.filter((elem) => elem.id === id),
    ];
    postRemove.value = postRemove.value.filter((elem) => elem.id !== id);
  };
  return { AddTodoForm, editPost, removePost, returnPost, post };
}
