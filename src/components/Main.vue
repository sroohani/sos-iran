<script setup lang="ts">
import OptionalInfoForm from './OptionalInfoForm.vue'
import useDirectionalityStore from '@/stores/directionality'
import EmailRecipients from './EmailRecipients.vue'
</script>

<template>
  <main class="h-main">
    <div class="grid grid-cols-1 p-4 gap-8">
      <OptionalInfoForm class="mx-auto" />
      <EmailRecipients />
    </div>
  </main>
</template>
