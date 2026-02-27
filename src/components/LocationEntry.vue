<script setup lang="ts">
import type { Location } from '@/types'
import { ref, watch } from 'vue'
import { InputGroup, IftaLabel, Select, InputGroupAddon, Button } from 'primevue'

interface Props {
  id: string
  locations: Location[]
  flagPlaceholderImage: string
  label?: string
  name?: string
  initialValue?: string
  showReset?: boolean
  resetTitle?: string
  showApply?: boolean
  applyTitle?: string
}

const props = defineProps<Props>()

const {
  id,
  flagPlaceholderImage,
  label = 'Location',
  name,
  initialValue,
  showReset = false,
  resetTitle = 'Reset',
  showApply = false,
  applyTitle = 'Apply',
} = props

const model = ref<Location | undefined>(
  props.locations.find((c: Location) => c.alpha2 === initialValue) as Location | undefined,
)

watch(
  () => props.locations,
  (value) => {
    model.value = props.locations.find((c: Location) => c.alpha2 === initialValue) as
      | Location
      | undefined
  },
)

const apply = () => {}
const reset = () => {}

const value = (): Location | undefined => {
  return model.value
}

export interface LocationEntryApi {
  value: () => Location | undefined
}

defineExpose<LocationEntryApi>({
  value,
})
</script>

<template>
  <InputGroup>
    <IftaLabel>
      <Select :options="locations" :name v-model="model" showClear filter fluid>
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex justify-start items-center gap-4">
            <img :src="slotProps.value.flag" class="w-6 h-6" />
            {{ slotProps.value.name }}
          </div>
          <div v-else class="flex justify-start items-center gap-4">
            <img :src="flagPlaceholderImage" class="w-6 h-6" />
            {{ slotProps.placeholder }}
          </div>
        </template>
        <template #option="slotProps">
          <div class="flex justify-start items-center gap-4">
            <img :src="slotProps.option.flag" class="w-6 h-6" />
            {{ slotProps.option.name }}
          </div>
        </template>
      </Select>
      <label :for="name">{{ label }}</label>
    </IftaLabel>
    <InputGroupAddon v-if="showApply || showReset">
      <Button
        v-if="showApply"
        icon="pi pi-check"
        severity="secondary"
        variant="text"
        :title="applyTitle"
        @click="apply"
        :disabled="model === initialValue"
        :pt="{
          root: {
            style: { height: '100%' },
          },
        }"
      />
      <Button
        v-if="showReset"
        icon="pi pi-replay"
        severity="secondary"
        variant="text"
        :title="resetTitle"
        @click="reset"
        :pt="{
          root: {
            style: { height: '100%' },
          },
        }"
      />
    </InputGroupAddon>
  </InputGroup>
</template>
