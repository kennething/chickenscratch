<template>
  <div class="flex min-h-svh w-full flex-col items-center justify-between px-4 pt-20 pb-4">
    <h1 class="title text-6xl font-medium">You're connected!</h1>

    <div class="flex w-full items-center justify-center gap-6">
      <div v-for="button in buttons" :key="button.to" class="h-96 w-full">
        <NuxtLink v-if="!button.disabled" :to="button.to" class="flex h-full w-full shrink-0 flex-col items-center justify-center rounded-4xl bg-sky-600/75 p-6">
          <h2 class="text-4xl font-medium text-neutral-200">{{ button.title }}</h2>
          <p class="text-center text-lg text-neutral-200">{{ button.description }}</p>
        </NuxtLink>
        <div v-else class="flex h-full w-full shrink-0 cursor-not-allowed flex-col items-center justify-center rounded-4xl bg-neutral-600/75 p-6">
          <h2 class="text-4xl font-medium text-black">{{ button.title }}</h2>
          <p class="text-center text-lg text-black">{{ button.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "reef-2",
  middleware: "has-pair",
  layout: "connected"
});

const userStore = useUserStore();
const { videoFeedOptions } = storeToRefs(userStore);

onMounted(() => (videoFeedOptions.value.size = "small"));

const buttons = [
  {
    title: "Race",
    description: "Compete against another player to write as many words as possible!",
    to: "/play/queue",
    img: "",
    hoverImg: "",
    disabled: false
  },
  {
    title: "Practice",
    description: "Practice your typing skills against a timer!",
    to: "",
    img: "",
    hoverImg: "",
    disabled: true
  },
  {
    title: "Leaderboard",
    description: "See how you rank against other players!",
    to: "",
    img: "",
    hoverImg: "",
    disabled: true
  }
] as const satisfies {
  title: string;
  description: string;
  to: string;
  img: string;
  hoverImg: string;
  disabled: boolean;
}[];

useStandardTerminate();
</script>

<style scoped></style>
