<script setup lang="ts">
import useDirectionalityStore from '@/stores/directionality'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'

const { dir } = storeToRefs(useDirectionalityStore())
</script>

<template>
  <footer class="h-footer flex justify-start items-center px-4 bg-p-background">
    <Button
      as="a"
      :label="dir === 'ltr' ? 'View Original Campaign' : 'دیدن کارزار اصلی'"
      href="https://www.sosiran.eu/"
      target="_blank"
      rel="noopener"
      severity="secondary"
      size="small"
      icon="pi pi-external-link"
      :icon-pos="dir === 'ltr' ? 'right' : 'left'"
      variant="link"
    />
  </footer>
</template>
