<template>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="flex min-h-svh w-full flex-col items-center justify-center gap-20">
      <h2 class="text-center text-4xl font-medium">{{ !isPaired ? "Is this you?" : "Follow the instructions on your other device" }}</h2>

      <div class="flex w-full items-center justify-around">
        <Transition name="confirmation-button">
          <button v-show="!isPaired" class="rounded-xl bg-neutral-300 px-20 py-5 text-2xl" @click="confirmPair">yes</button>
        </Transition>
        <VideoFeed class="overflow-hidden rounded-4xl" />
        <Transition name="confirmation-button">
          <button v-show="!isPaired" class="rounded-xl bg-neutral-300 px-20 py-5 text-2xl" @click="$socket.emit('terminatePairing')">no</button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "mountains",
  middleware: "has-pair"
});

const { $socket } = useNuxtApp();

const isPaired = ref(false);

function confirmPair() {
  isPaired.value = true;
  $socket.emit("confirmPair", () => navigateTo("/home"));
}

useStandardTerminate();
</script>

<style scoped>
.confirmation-button-enter-active,
.confirmation-button-leave-active {
  transition:
    transform 0.5s ease-out,
    opacity 0.35s ease-in-out;
}
.confirmation-button-enter-from,
.confirmation-button-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
