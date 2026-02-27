<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import LionAndSun from './LionAndSun.vue'
import IR from './IR.vue'
import US from './US.vue'
import { Select, type SelectChangeEvent } from 'primevue'
import type { Component } from 'vue'
import { storeToRefs } from 'pinia'
import useLanguageStore from '@/stores/language'

const { languages, selectedLanguage } = storeToRefs(useLanguageStore())

const flag = (code: string): Component | undefined => {
  switch (code) {
    case 'FA':
      return IR

    case 'EN':
      return US

    default:
      break
  }
}

const handleLanguageChange = (event: SelectChangeEvent) => {
  switch (event.value.code) {
    case 'FA':
      document.documentElement.setAttribute('dir', 'rtl')
      break

    case 'EN':
      document.documentElement.setAttribute('dir', 'ltr')
      break

    default:
      break
  }
}
</script>

<template>
  <header class="h-header">
    <Toolbar :pt="{ root: { style: { 'border-width': 0, 'border-radius': 0 } } }">
      <template #start>
        <a href="/Flag_of_Iran_simplified.svg" target="_blank">
          <LionAndSun width="3.5rem" height="2rem" />
        </a>
      </template>
      <template #center>
        <span class="text-red-600 text-xl font-bold">SOS Iran</span>
      </template>
      <template #end>
        <div class="flex justify-start items-center gap-2">
          <i class="pi pi-language" />
          <Select
            v-model="selectedLanguage"
            :options="languages"
            class="w-32"
            @change="handleLanguageChange"
          >
            <template #option="{ index, option, selected }">
              <div class="flex justify-between items-center gap-2">
                <component :is="flag(option.code)" width="2rem" height="1.5rem" />
                <span>{{ option.name }}</span>
              </div>
            </template>
            <template #value="{ value }">
              <div class="flex justify-between items-center gap-2">
                <component :is="flag(value.code)" width="1rem" height="0.75rem" />
                <span class="text-xs">{{ value.name }}</span>
              </div>
            </template>
          </Select>
        </div>
      </template>
    </Toolbar>
  </header>
</template>
