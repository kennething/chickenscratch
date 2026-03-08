<template>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="flex min-h-svh w-full flex-col items-center justify-center gap-20">
      <h2 class="text-center text-4xl font-medium">{{ !isPaired ? "Is this you?" : "Follow the instructions on your other device" }}</h2>

      <div class="flex w-full items-center justify-around">
        <Transition name="confirmation-button">
          <div
            role="button"
            v-show="!isPaired"
            class="group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-double border-lime-300 bg-lime-300/25 px-14 py-5 transition hover:bg-lime-300/50"
            @click="confirmPair"
          >
            <p class="text-2xl text-white">Yes</p>
            <img class="size-28 group-hover:hidden" src="/sprites/chicken/neutral.webp" aria-hidden="true" />
            <img class="hidden size-28 group-hover:block group-hover:scale-110" src="/sprites/chicken/proud.webp" aria-hidden="true" />
          </div>
        </Transition>
        <VideoFeed class="overflow-hidden rounded-4xl" />
        <Transition name="confirmation-button">
          <div
            role="button"
            v-show="!isPaired"
            class="group flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-double border-neutral-300 bg-neutral-300/25 px-14 py-5 transition hover:bg-neutral-300/50"
            @click="$socket.emit('terminatePairing')"
          >
            <p class="text-2xl text-white">No</p>
            <img class="size-28 group-hover:hidden" src="/sprites/chicken/neutral.webp" aria-hidden="true" />
            <img class="hidden size-28 group-hover:block group-hover:scale-110" src="/sprites/chicken/annoyed.webp" aria-hidden="true" />
          </div>
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
