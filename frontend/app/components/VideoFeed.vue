<template>
  <div class="flex flex-col items-center justify-center" v-if="currentImage">
    <img :src="currentImage" aria-hidden="true" class="h-full w-full" />
  </div>
</template>

<script setup lang="ts">
const { $socket } = useNuxtApp();

const currentFrame = ref<ArrayBuffer>();
const currentImage = computed(() => (currentFrame.value ? URL.createObjectURL(new Blob([currentFrame.value])) : undefined));
onMounted(() => {
  if (!$socket.hasListeners("getFrame")) $socket.on("getFrame", (blob) => (currentFrame.value = blob));
});
onBeforeUnmount(() => {
  if ($socket.hasListeners("getFrame")) $socket.off("getFrame");
});
</script>

<style scoped></style>
