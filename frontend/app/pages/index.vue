<template>
  <div class="flex min-h-svh flex-col items-center justify-center gap-8">
    <h1 class="title text-6xl text-white">ChickenScratch</h1>
    <p class="text-lg text-white">Fix your doctor's handwriting and become a software engineer instead!</p>

    <NuxtLink to="/pair" class="group flex flex-col items-center justify-center">
      <img class="size-52 group-hover:hidden" src="/sprites/chicken/neutral.webp" aria-hidden="true" />
      <img class="hidden size-52 group-hover:block group-hover:scale-110" src="/sprites/chicken/startled.webp" aria-hidden="true" />
      <p class="-mt-4 rounded-2xl bg-sky-300 px-10 py-2 text-2xl font-bold text-black">Start Pairing</p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "grove-2"
});
</script>

<style scoped></style>
