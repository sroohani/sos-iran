<script setup lang="ts">
import { ref } from 'vue'
import { type FieldResolver, type FieldResolverReturnType } from '@/types'
import {
  InputGroup,
  IftaLabel,
  IconField,
  InputIcon,
  InputText,
  InputGroupAddon,
  Button,
  Message,
} from 'primevue'

interface Props {
  id: string
  label: string
  name?: string
  inputId?: string
  initialValue?: string
  resolver?: FieldResolver<string>
  integratedMessage?: boolean
  showReset?: boolean
  resetTitle?: string
  showApply?: boolean
  applyTitle?: string
}

const {
  id,
  label,
  name,
  inputId,
  initialValue = '',
  resolver,
  integratedMessage = false,
  showReset = false,
  resetTitle = 'Reset',
  showApply = false,
  applyTitle = 'Apply',
} = defineProps<Props>()

const textRef = ref<any>(null)
const model = ref(initialValue)
const errorMessage = ref<FieldResolverReturnType>(null)

const focus = () => {
  if (textRef.value?.$el) {
    textRef.value.$el.focus()
  }
}

const value = () => {
  return model.value
}

const emit = defineEmits<{
  (e: 'apply', id: string, text: string): void
  (e: 'reset', id: string): void
}>()

export interface TextEntryApi {
  focus: () => void
  value: () => string | undefined
}

defineExpose<TextEntryApi>({
  focus,
  value,
})

const apply = () => emit('apply', id, model.value)
const reset = () => {
  model.value = initialValue
  validate()
  emit('reset', id)
}
const validate = () => {
  if (resolver) {
    errorMessage.value = resolver(model.value)
  }
}
</script>

<template>
  <InputGroup>
    <IftaLabel>
      <IconField>
        <InputIcon class="pi pi-id-card" :pt="{ root: { style: { 'z-index': 10 } } }" />
        <InputText
          ref="textRef"
          :name
          :id
          :inputId
          v-model="model"
          @input="validate"
          :pt="{
            root: {
              style: {
                'border-start-end-radius': 0,
                'border-end-end-radius': 0,
              },
            },
          }"
        />
      </IconField>
      <label :for="id" class="z-10">{{ label }}</label>
    </IftaLabel>
    <InputGroupAddon v-if="showApply || showReset">
      <Button
        v-if="showApply"
        icon="pi pi-check"
        severity="secondary"
        variant="text"
        :title="applyTitle"
        @click="apply"
        :disabled="model === initialValue || errorMessage !== null"
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
  <Message
    v-if="integratedMessage && errorMessage != null"
    severity="error"
    size="small"
    variant="simple"
    >{{ errorMessage.message }}</Message
  >
</template>
