<script setup lang="ts">
import { computed, ref } from 'vue';

interface NewsItem {
  num: string;
  date: string;
  year: string;
  title: string;
  html: string;
}

const props = defineProps<{ items: NewsItem[] }>();

const years = computed(() => {
  const set = new Set(props.items.map((item) => item.year));
  return ['all', ...Array.from(set).sort((a, b) => Number(b) - Number(a))];
});

const activeYear = ref('all');

const visibleItems = computed(() =>
  activeYear.value === 'all' ? props.items : props.items.filter((item) => item.year === activeYear.value)
);

function selectYear(year: string) {
  activeYear.value = year;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const list = years.value;
  const idx = list.indexOf(activeYear.value);
  const dir = e.key === 'ArrowRight' ? 1 : -1;
  const next = (idx + dir + list.length) % list.length;
  activeYear.value = list[next];
}
</script>

<template>
  <div @keydown="onKeydown">
    <div class="news-tabs">
      <button
        v-for="year in years"
        :key="year"
        class="news-tab"
        :class="{ active: activeYear === year }"
        type="button"
        @click="selectYear(year)"
      >
        {{ year === 'all' ? '全部' : year }}
      </button>
    </div>

    <div class="news-list" :key="activeYear">
      <div v-for="item in visibleItems" :key="item.num" class="news-item">
        <span class="news-num">{{ item.num }}</span>
        <div class="news-item-body">
          <div class="news-item-meta">
            <span class="news-date">{{ item.date }}</span>
            <span class="news-year-tag">{{ item.year }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p v-html="item.html"></p>
        </div>
      </div>
      <p v-if="visibleItems.length === 0" class="news-empty">此分類目前尚無動態。</p>
    </div>
  </div>
</template>
