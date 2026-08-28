<script setup lang="ts">
import { ref, computed } from 'vue';

interface AlumniMember {
  id: string;
  name: string;
  class: string;
  role: string;
  isLeader: boolean;
  roleTag: boolean;
  photo: string;
  photoStyle?: string;
}

interface AlumniGeneration {
  id: string;
  label: string;
  year: string;
}

const props = defineProps<{
  generations: AlumniGeneration[];
  membersByGeneration: Record<string, AlumniMember[]>;
}>();

const selected = ref('');

const selectedMembers = computed(() => props.membersByGeneration[selected.value] ?? []);
const leader = computed(() => selectedMembers.value.find((m) => m.isLeader));
const rest = computed(() => selectedMembers.value.filter((m) => !m.isLeader));
</script>

<template>
  <div class="alumni-select-row">
    <label for="alumni-gen-select">選擇屆別</label>
    <select id="alumni-gen-select" v-model="selected">
      <option value="" disabled>請選擇畢業屆別…</option>
      <option v-for="gen in generations" :key="gen.id" :value="gen.id">{{ gen.label }}（{{ gen.year }}）</option>
    </select>
  </div>

  <div v-if="selected" class="alumni-result">
    <div v-if="leader" class="leader-card">
      <div class="leader-photo"><img :src="leader.photo" :alt="leader.name" :style="leader.photoStyle" /></div>
      <div>
        <p class="name">{{ leader.name }}</p>
        <p class="class">{{ leader.class }}</p>
        <p class="role">{{ leader.role }}</p>
      </div>
    </div>
    <div class="member-grid">
      <div v-for="member in rest" :key="member.id" class="member-cell">
        <div class="member-photo"><img :src="member.photo" :alt="member.name" :style="member.photoStyle" /></div>
        <p class="name">{{ member.name }}</p>
        <p class="class">{{ member.class }}</p>
        <p class="role" :class="{ tag: member.roleTag }">{{ member.role }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alumni-select-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.alumni-select-row label {
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
}
.alumni-select-row select {
  font-family: inherit;
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  background: #fff;
  border: 1px solid var(--line2);
  border-radius: 2px;
  padding: 10px 16px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}
.alumni-select-row select:hover,
.alumni-select-row select:focus {
  border-color: var(--orange);
  outline: none;
}
.alumni-result {
  margin-top: 28px;
}
</style>
