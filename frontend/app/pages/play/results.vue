<template>
  <div class="mr-104 flex min-h-svh flex-col items-center justify-center gap-16">
    <h1 class="title text-6xl font-medium">You {{ gameWon ? "won!" : "lost..." }}</h1>

    <NuxtLink to="/home" class="group flex flex-col items-center justify-center">
      <img v-if="!gameWon" class="size-36 group-hover:hidden" src="/sprites/chicken/ashamed.webp" aria-hidden="true" />
      <img v-else class="size-36 group-hover:hidden" src="/sprites/chicken/surprised.webp" aria-hidden="true" />
      <img class="hidden size-36 group-hover:block group-hover:scale-110" src="/sprites/chicken/proud.webp" aria-hidden="true" />

      <p class="-mt-2.5 rounded-2xl bg-amber-300 px-10 py-4 text-3xl font-medium text-black">Back</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "dory-2",
  middleware: ["has-pair", "has-match"],
  layout: "connected"
});

const { $socket } = useNuxtApp();
const userStore = useUserStore();
const { videoFeedOptions, gameWon } = storeToRefs(userStore);

onMounted(() => (videoFeedOptions.value.position = "right"));

useStandardTerminate();
</script>

<style scoped></style>
