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
