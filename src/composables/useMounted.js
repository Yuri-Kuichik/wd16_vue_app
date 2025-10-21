import { shallowRef, onMounted } from "vue";

export function useMounted() {
  const isMounted = shallowRef(false);

  onMounted(() => {
    isMounted.value = true;
  })

  return {
    isMounted
  }
}