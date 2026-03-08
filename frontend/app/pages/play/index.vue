<template>
  <div class="ml-104 flex min-h-svh w-[calc(100vw-26rem)] flex-col items-center justify-center px-10">
    <div v-show="countdown > -1" class="flex flex-col items-center justify-center gap-4">
      <h1>Get ready!</h1>
      <p>{{ countdown }}</p>
    </div>
    <div v-show="countdown === -1" class="flex min-h-svh w-full flex-col items-center justify-between gap-4 py-6">
      <div class="relative h-5 w-3/4 overflow-hidden rounded-full bg-neutral-600">
        <div class="absolute top-0 left-0 h-full bg-green-500" :style="{ width: `${(stageTimer / 1000 / (20 + currentStage * 10)) * 100}%` }"></div>
      </div>

      <div class="relative flex h-20 w-full items-center justify-center overflow-hidden" v-if="currentWordIndex !== undefined">
        <p
          v-for="(word, index) in wordHistory"
          class="absolute top-0 left-1/2 w-40 -translate-x-1/2 text-center text-3xl transition duration-1000 ease-[cubic-bezier(.8,0,.2,1)] select-none"
          :class="index === currentWordIndex ? 'scale-150 text-black' : 'text-neutral-600'"
          :style="{ transform: `translateX(${(index - currentWordIndex) * 200}%)` }"
        >
          {{ word }}
        </p>
      </div>

      <p>Stage {{ currentStage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "forest",
  middleware: "has-pair",
  layout: "connected"
});

const { $socket } = useNuxtApp();
const userStore = useUserStore();
const { videoFeedOptions, currentWordIndex, wordHistory } = storeToRefs(userStore);

const countdown = ref(3);
onMounted(() => {
  videoFeedOptions.value.size = "large";
  videoFeedOptions.value.position = "left";
  const interval = setInterval(() => {
    countdown.value--;
    if (countdown.value === -1) clearInterval(interval);
  }, 1000);
});

const currentStage = ref(-1);
const stageTimer = ref(0);
watch(countdown, () => {
  if (countdown.value !== -1) return;
  startNewStage(0);
});
function startNewStage(stage: number) {
  currentStage.value = stage;
  stageTimer.value = (20 + stage * 10) * 1000;
  const interval = setInterval(() => {
    stageTimer.value -= 10;
    if (stageTimer.value <= 0) clearInterval(interval);
  }, 10);
}

onMounted(() => {
  if (!$socket.hasListeners("getResult"))
    $socket.on("getResult", (isCorrect, nextWord) => {
      if (isCorrect) {
        currentWordIndex.value!++;
        wordHistory.value.push(nextWord!);
      }
    });

  if (!$socket.hasListeners("advanceSplit"))
    $socket.on("advanceSplit", (newSplit, newWord) => {
      console.log("b");
      startNewStage(newSplit);
      wordHistory.value.push(newWord);
    });

  if (!$socket.hasListeners("endGame"))
    $socket.on("endGame", () => {
      navigateTo("/play/results");
    });
});
onBeforeUnmount(() => {
  if ($socket.hasListeners("getResult")) $socket.off("getResult");
  if ($socket.hasListeners("advanceSplit")) $socket.off("advanceSplit");
  if ($socket.hasListeners("endGame")) $socket.off("endGame");
});

useStandardTerminate();
</script>

<style scoped></style>
