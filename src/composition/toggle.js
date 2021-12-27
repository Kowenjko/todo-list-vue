export function useToggle(posts) {
  const toggle = (elem) => (elem.completed = !elem.completed);

  const chandgeStatus = (id) => {
    posts.value.forEach((elem) => {
      if (elem.id === id) toggle(elem);
    });
  };
  return { chandgeStatus };
}
