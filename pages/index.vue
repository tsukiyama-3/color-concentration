<script setup lang="ts">
import { useDots } from '~~/composables/dot'
const { loginWithGoogle, user } = useAuth()
const {
  col,
  row,
  dots,
  currentColor,
  changeColor,
  myCanvas,
  myContext,
  imageUrl,
  storeImage,
  onMousedown,
  onMouseup,
  onMousemove,
  onMouseleave,
  fillFlug,
  gridFlug,
} = useDots()
</script>

<template>
  <div
    class="flex flex-col min-h-100vh"
    @mouseleave="onMouseleave"
    @mouseup="onMouseup"
    onselectstart="return false"
  >
    <Header />
    <p @click="loginWithGoogle">Google認証</p>
    <p v-if="user">ようこそ{{ user.displayName }}さん</p>
    <div class="flex-grow flex justify-center gap-4 mt-8">
      <div class="w-512px h-514px border-1 border-hex-000000">
        <div class="grid grid-cols-64">
            <div
              class="w-8px h-8px hover:bg-hex-dddddd"
              v-for="dot of dots"
              :key="dot"
              :style="{ backgroundColor: dot.color }"
              :class="{ dotgrid : gridFlug }"
              @click="changeColor(dot)"
              @mousedown="onMousedown"
              @mouseup="onMouseup"
              @mousemove="onMousemove(dot)"
              onSelectStart="return false"
            >
            </div>
        </div>
      </div>
      <div>
        <p>preview</p>
        <canvas ref="myCanvas" width="256" height="256" class="border-1"></canvas>
        <input class="mt-2 inline-block" type="color" v-model="currentColor">
        <input class="block" type="color.hex" v-model="currentColor">
        <div class="mt-2">
          <input type="radio" id="pen" :value="false" v-model="fillFlug">
          <label for="pen">pen</label>
          <input class="ml-2" type="radio" id="fill" :value="true" v-model="fillFlug">
          <label for="fill">fill</label>
        </div>
        <div class="mt-2">
          <input type="checkbox" id="grid" v-model="gridFlug">
          <label for="grid">grid</label>
        </div>
        <a
          class="mt-2 inline-block"
          @click="storeImage"
          :href="imageUrl"
          download
        >
          store
        </a>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.dotgrid {
  border: 1px solid #eee;
  border-collapse: collapse;
  box-sizing: border-box;
}
</style>
