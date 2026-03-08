<template>
  <div class="flex min-h-svh w-full flex-col items-center justify-center gap-20">
    <h2 class="text-center text-4xl font-medium text-white">Scan this QR Code with a mobile device</h2>
    <canvas ref="qr-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import QRCode from "qrcode";

definePageMeta({
  background: "grove"
});

const images = [
  "/backgrounds/reef/base.webp",
  "/backgrounds/reef/layer-1.webp",
  "/backgrounds/reef/layer-2.webp",
  "/backgrounds/reef/layer-3.webp",
  "/backgrounds/reef-2/base.webp",
  "/backgrounds/reef-2/layer-1.webp",
  "/backgrounds/reef-2/layer-2.webp",
  "/backgrounds/reef-2/layer-3.webp",
  "/backgrounds/dory/base.webp",
  "/backgrounds/dory/layer-1.webp",
  "/backgrounds/dory/layer-2.webp",
  "/backgrounds/dory-2/base.webp",
  "/backgrounds/dory-2/layer-1.webp",
  "/backgrounds/dory-2/layer-2.webp",
  "/backgrounds/pond-2/base.webp",
  "/backgrounds/pond-2/layer-1.webp",
  "/backgrounds/pond-2/layer-2.webp"
] as const;

useHead({
  link: images.map((src) => ({
    rel: "preload",
    as: "image",
    href: src
  }))
});

const { $socket } = useNuxtApp();

const userStore = useUserStore();
const { pairingCode } = storeToRefs(userStore);

const qrCanvas = useTemplateRef("qr-canvas");
const unwatchCanvas = watch(qrCanvas, (canvas) => {
  if (!canvas) return;
  $socket.connect();

  const normalizedHref = window.location.href.endsWith("/") ? window.location.href.slice(0, -1) : window.location.href;
  $socket.emit("connectMainSocket", (_, code) => {
    pairingCode.value = code;
    QRCode.toCanvas(qrCanvas.value, `${normalizedHref}/${code}`, { color: { light: "#8a79a3", dark: "#0f121c" }, width: 275, margin: 1, errorCorrectionLevel: "low" });
  });

  unwatchCanvas();
});

onMounted(() => {
  if (!$socket.hasListeners("getFrame"))
    $socket.on("getFrame", (blob) => {
      if (blob) return navigateTo("/pair/confirm");
    });
});
onBeforeUnmount(() => {
  if ($socket.hasListeners("getFrame")) $socket.off("getFrame");
});

useStandardTerminate();
</script>

<style scoped></style>
