<template>
  <div class="mr-100 flex min-h-svh w-full flex-col items-center justify-center">
    <h1>Match found!</h1>
    <p>Are you ready to start?</p>
    <p>Make sure your paper is centered!</p>
    <button @click="confirmMatch">yes</button>

    <p v-show="isConfirmed">waiting for other player...</p>
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
