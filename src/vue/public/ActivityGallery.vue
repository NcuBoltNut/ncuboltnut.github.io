<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  photos: string[];
  alt: string;
}>();

const active = ref(0);

function go(delta: number) {
  active.value = (active.value + delta + props.photos.length) % props.photos.length;
}
</script>

<template>
  <div class="gallery">
    <div class="gallery-viewport">
      <img
        v-for="(photo, i) in photos"
        :key="photo"
        :src="photo"
        :alt="alt"
        class="gallery-slide"
        :class="{ active: i === active }"
      />
    </div>

    <template v-if="photos.length > 1">
      <button type="button" class="gallery-arrow prev" aria-label="上一張照片" @click="go(-1)">‹</button>
      <button type="button" class="gallery-arrow next" aria-label="下一張照片" @click="go(1)">›</button>
      <div class="gallery-dots">
        <button
          v-for="(photo, i) in photos"
          :key="photo"
          type="button"
          class="gallery-dot"
          :class="{ active: i === active }"
          :aria-label="`第 ${i + 1} 張照片`"
          @click="active = i"
        ></button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.gallery {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.gallery-viewport {
  position: relative;
  width: 100%;
  height: 100%;
}
.gallery-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: scale(1);
  pointer-events: none;
}
.gallery-slide.active {
  opacity: 1;
  pointer-events: auto;
}
.gallery:hover .gallery-slide.active {
  transform: scale(1.06);
}
.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, opacity 0.2s ease;
  opacity: 0;
}
.gallery:hover .gallery-arrow {
  opacity: 1;
}
.gallery-arrow:hover {
  background: var(--orange);
}
.gallery-arrow.prev {
  left: 10px;
}
.gallery-arrow.next {
  right: 10px;
}
.gallery-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}
.gallery-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s ease, transform 0.2s ease;
}
.gallery-dot.active {
  background: var(--orange);
  transform: scale(1.3);
}
@media (prefers-reduced-motion: reduce) {
  .gallery-slide,
  .gallery:hover .gallery-slide.active {
    transition: none;
    transform: none;
  }
}
</style>
