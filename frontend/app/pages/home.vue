<template>
  <div class="flex min-h-svh w-full flex-col items-center justify-between px-4 pt-20 pb-4">
    <h1 class="title text-6xl font-medium">You're connected!</h1>

    <div class="flex w-full items-center justify-center gap-6">
      <div v-for="button in buttons" :key="button.to" class="h-96 w-full">
        <NuxtLink v-if="!button.disabled" :to="button.to" class="group flex h-full w-full shrink-0 flex-col items-center justify-between rounded-4xl bg-sky-600/75 p-6">
          <div class="flex flex-col items-center justify-center gap-4">
            <h2 class="text-4xl font-medium text-neutral-200">{{ button.title }}</h2>
            <p class="text-center text-lg text-neutral-200">{{ button.description }}</p>
          </div>
          <div>
            <img class="size-44 group-hover:hidden" :src="button.img" aria-hidden="true" />
            <img class="hidden size-44 group-hover:block group-hover:scale-110" :src="button.hoverImg" aria-hidden="true" />
          </div>
        </NuxtLink>
        <div v-else class="flex h-full w-full shrink-0 cursor-not-allowed flex-col items-center justify-between rounded-4xl bg-neutral-600/75 p-6">
          <div class="flex flex-col items-center justify-center gap-4">
            <h2 class="text-4xl font-medium text-black">{{ button.title }}</h2>
            <p class="text-center text-lg text-black">{{ button.description }}</p>
          </div>
          <img class="size-44" :src="button.img" aria-hidden="true" />
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
    img: "/sprites/chicken/annoyed.webp",
    hoverImg: "/sprites/chicken/proud.webp",
    disabled: false
  },
  {
    title: "Practice",
    description: "Practice your typing skills against a timer!",
    to: "",
    img: "/sprites/chicken/ashamed.webp",
    hoverImg: "/sprites/chicken/startled.webp",
    disabled: true
  },
  {
    title: "Leaderboard",
    description: "See how you rank against other players!",
    to: "",
    img: "/sprites/chicken/neutral.webp",
    hoverImg: "/sprites/chicken/surprised.webp",
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
