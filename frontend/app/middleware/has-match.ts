export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  if (userStore.currentWordIndex === undefined) return navigateTo("/");
});
