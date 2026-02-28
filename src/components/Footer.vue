<script setup lang="ts">
import useDirectionalityStore from '@/stores/directionality'
import Button from 'primevue/button'

const { dirString, buttonIconPosition } = useDirectionalityStore()
</script>

<template>
  <footer class="h-footer flex justify-start items-center px-4 bg-p-background">
    <Button
      as="a"
      :label="dirString('view original campaign')"
      href="https://www.sosiran.eu/"
      target="_blank"
      rel="noopener"
      severity="secondary"
      size="small"
      icon="pi pi-external-link"
      :icon-pos="buttonIconPosition()"
      variant="link"
    />
  </footer>
</template>
