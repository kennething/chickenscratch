<template>
  <div class="mr-104 flex min-h-svh flex-col items-center justify-center gap-6">
    <h1 class="title text-6xl font-medium">You {{ gameWon ? "won!" : "lost..." }}</h1>
    <NuxtLink to="/home" class="rounded-2xl bg-amber-300 px-10 py-4 text-3xl font-medium text-black">Back</NuxtLink>
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
