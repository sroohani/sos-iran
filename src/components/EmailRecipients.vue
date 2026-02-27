<script setup lang="ts">
import useDirectionalityStore from '@/stores/directionality'
import { Card, Message, Divider } from 'primevue'

const { dirString } = useDirectionalityStore()
</script>

<template>
  <Card class="w-full max-w-lg h-fit mx-auto border border-p-border">
    <template #title>
      <div class="flex flex-col justify-start items-center">
        <Message severity="success" variant="simple" class="w-full justify-center">
          <span>{{ dirString('email recipients') }}</span>
        </Message>
      </div>
      <Divider />
    </template>
  </Card>
</template>
