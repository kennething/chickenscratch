<template>
  <Background :background="currentBackground" />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { currentBackground } = storeToRefs(userStore);

const images = [
  "/sprites/chicken/neutral.webp",
  "/sprites/chicken/annoyed.webp",
  "/sprites/chicken/ashamed.webp",
  "/sprites/chicken/proud.webp",
  "/sprites/chicken/startled.webp",
  "/sprites/chicken/hehe.webp",
  "/sprites/chicken/surprised.webp",
  "/backgrounds/grove/base.webp",
  "/backgrounds/grove/layer-1.webp",
  "/backgrounds/grove/layer-2.webp",
  "/backgrounds/grove/layer-3.webp",
  "/backgrounds/grove-2/base.webp",
  "/backgrounds/grove-2/layer-1.webp",
  "/backgrounds/grove-2/layer-2.webp",
  "/backgrounds/grove-2/layer-3.webp",
  "/backgrounds/pond/base.webp",
  "/backgrounds/pond/layer-1.webp",
  "/backgrounds/pond/layer-2.webp",
  "/backgrounds/pond/layer-3.webp"
] as const;

useHead({
  link: images.map((src) => ({
    rel: "preload",
    as: "image",
    href: src
  }))
});
</script>

<style>
.page-enter-active {
  transition: opacity 1s;
}
.page-leave-active {
  transition: opacity 1.5s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
