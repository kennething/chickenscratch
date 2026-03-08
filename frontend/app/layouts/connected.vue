<template>
  <div>
    <div class="fixed top-4 right-4 overflow-hidden rounded-2xl transition-all duration-1000" ref="container">
      <VideoFeed ref="video-feed" class="aspect-3/4 transition-all duration-1000" :class="videoFeedOptions.size === 'small' ? 'w-32' : 'w-100'" />
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { videoFeedOptions } = storeToRefs(userStore);

const videoFeed = useTemplateRef("video-feed");
const container = useTemplateRef("container");

watch(
  videoFeedOptions.value,
  (options) => {
    if (!container.value || !videoFeed.value) return;

    if (options.position === "left") container.value.style.right = `calc(100vw - 1rem - ${container.value.clientWidth}px)`;
    else container.value.style.right = "1rem";
  },
  { immediate: true }
);
</script>

<style scoped></style>
