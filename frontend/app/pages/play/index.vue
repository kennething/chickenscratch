<template>
  <div class="ml-104 flex min-h-svh w-[calc(100vw-26rem)] flex-col items-center justify-center px-10">
    <div v-show="countdown > -1" class="flex flex-col items-center justify-center gap-4">
      <h1 class="text-3xl font-medium text-black">Get ready!</h1>
      <p class="title px-6 py-3 text-6xl font-medium text-black">{{ countdown }}</p>
    </div>
    <div v-show="countdown === -1" class="flex min-h-svh w-full flex-col items-center justify-between gap-4 py-6">
      <div class="flex w-3/4 flex-col items-center justify-center">
        <div class="relative h-5 w-full overflow-hidden rounded-full bg-neutral-600">
          <div class="absolute top-0 left-0 h-full bg-green-500" :style="{ width: `${(stageTimer / 1000 / (20 + currentStage * 10)) * 100}%` }"></div>
        </div>
        <p class="text-2xl text-black">00:{{ String(Math.floor(stageTimer / 1000)).padStart(2, "0") }}:{{ String(stageTimer % 1000).padStart(3, "0") }}</p>
      </div>

      <div class="relative flex h-32 w-full items-center justify-center overflow-x-hidden overflow-y-clip" v-if="currentWordIndex !== undefined">
        <p
          v-for="(word, index) in wordHistory"
          class="absolute top-1/2 left-1/2 w-40 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/50 px-4 py-1 text-center text-3xl transition duration-1000 ease-[cubic-bezier(.8,0,.2,1)] select-none"
          :class="index === currentWordIndex ? 'scale-175 text-black' : 'text-neutral-600'"
          :style="{ transform: `translateX(${(index - currentWordIndex) * 200}%)` }"
        >
          {{ word }}
        </p>
      </div>

      <p class="text-2xl font-bold text-white">
        Stage <span :class="{ 'holy-cow': stageIsChanging }">{{ currentStage }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  background: "reef",
  middleware: ["has-pair", "has-match"],
  layout: "connected"
});

const { $socket } = useNuxtApp();
const userStore = useUserStore();
const { videoFeedOptions, currentWordIndex, wordHistory, gameWon } = storeToRefs(userStore);

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
const stageIsChanging = ref(false);
watch(countdown, () => {
  if (countdown.value !== -1) return;
  startNewStage(0);
});
function startNewStage(stage: number) {
  stageIsChanging.value = true;
  setTimeout(() => (stageIsChanging.value = false), 2000);

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
      startNewStage(newSplit);
      wordHistory.value.push(newWord);
    });

  if (!$socket.hasListeners("endGame"))
    $socket.on("endGame", (didWin) => {
      gameWon.value = didWin;
      // navigateTo("/play/results");
    });
});
onBeforeUnmount(() => {
  if ($socket.hasListeners("getResult")) $socket.off("getResult");
  if ($socket.hasListeners("advanceSplit")) $socket.off("advanceSplit");
  if ($socket.hasListeners("endGame")) $socket.off("endGame");
});

useStandardTerminate();
</script>

<style scoped>
@keyframes holy-cow {
  0%,
  100% {
    transform: scale(1) translateX(0) rotate(0deg) translateY(0);
  }
  50% {
    transform: scale(1.5) translateX(0) rotate(5deg) translateY(4rem);
  }
  67% {
    transform: scale(1.5) translateX(2rem) rotate(-10deg) translateY(4rem);
  }
  83% {
    transform: scale(1.5) translateX(-2rem) rotate(10deg) translateY(4rem);
  }
}
.holy-cow {
  animation: holy-cow 2s ease-in-out;
}
</style>
