<template>
  <div class="mr-104 flex min-h-svh w-full flex-col items-center justify-center">
    <h1 class="title text-6xl font-medium text-white">Match found!</h1>
    <p class="mt-10 text-xl text-neutral-200">Are you ready to start?</p>
    <p class="mb-10 text-2xl font-medium text-neutral-100">Make sure your paper is centered!</p>

    <div class="group flex flex-col items-center justify-center">
      <img v-if="!isConfirmed" class="size-36 group-hover:hidden" src="/sprites/chicken/startled.webp" aria-hidden="true" />
      <img class="hidden size-36 group-hover:block group-hover:scale-110" :class="{ 'block!': isConfirmed }" src="/sprites/chicken/proud.webp" aria-hidden="true" />
      <button @click="confirmMatch" class="-mt-3 rounded-3xl bg-indigo-500 px-10 py-4">
        <p class="text-3xl font-medium text-white">Ready</p>
      </button>
    </div>
    <p v-show="isConfirmed" class="text-xl text-neutral-200">Waiting for other player...</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "grove-2",
  middleware: "has-pair",
  layout: "connected"
});

const { $socket } = useNuxtApp();
const userStore = useUserStore();
const { videoFeedOptions, currentWordIndex, wordHistory } = storeToRefs(userStore);

onMounted(() => (videoFeedOptions.value.size = "large"));

const isConfirmed = ref(false);
function confirmMatch() {
  $socket.emit("confirmMatch", (success, words) => {
    if (!success) return;
    currentWordIndex.value = 0;
    wordHistory.value = words!;
    console.log(words);
    navigateTo("/play");
  });
  isConfirmed.value = true;
}

useStandardTerminate();
</script>

<style scoped></style>
