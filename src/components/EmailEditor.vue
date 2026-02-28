<script setup lang="ts">
import { Button, Dialog, Divider, InputGroup, InputGroupAddon, InputText, Textarea } from 'primevue'
import useDirectionalityStore from '@/stores/directionality'
import useEmailStore from '@/stores/email'
import { storeToRefs } from 'pinia'
import { flagsSvgDirectory } from '@/constants'
import { computed, ref } from 'vue'
import emailList from '@/email'

const { dirString, buttonIconPosition, emailRecipientName } = useDirectionalityStore()
const { isEmailEditorVisible, emailRecipient } = storeToRefs(useEmailStore())

const recipient = computed(() => emailList.get(emailRecipient.value))

const emailBody = ref(recipient.value?.body)

const close = () => {
  isEmailEditorVisible.value = false
}

const apply = () => {
  isEmailEditorVisible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="isEmailEditorVisible"
    maximizable
    modal
    :style="{ width: '50vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="w-8 h-6">
        <img
          :src="`${flagsSvgDirectory}/${emailRecipient === 'EUP' ? '../Flag_of_Europe.svg' : `${emailRecipient.toLowerCase()}.svg`}`"
        />
      </div>
      <span class="text-sm">{{ emailRecipientName(emailRecipient) }}</span>
    </template>
    <div class="w-full flex flex-col justify-start items-start gap-2 mb-4">
      <InputGroup :pt="{ root: { style: { direction: 'ltr' } } }">
        <InputGroupAddon>
          <span class="w-[3ch]">To</span>
        </InputGroupAddon>
        <InputText :value="recipient?.to.join(' ')" readonly />
      </InputGroup>
      <InputGroup :pt="{ root: { style: { direction: 'ltr' } } }">
        <InputGroupAddon>
          <span class="w-[3ch]">Cc</span>
        </InputGroupAddon>
        <InputText :value="recipient?.cc.join(' ')" readonly />
      </InputGroup>
      <InputGroup :pt="{ root: { style: { direction: 'ltr' } } }">
        <InputGroupAddon>
          <span class="w-[3ch]">Bcc</span>
        </InputGroupAddon>
        <InputText :value="recipient?.bcc.join(' ')" readonly />
      </InputGroup>
      <Divider />
      <InputGroup :pt="{ root: { style: { direction: 'ltr' } } }">
        <InputGroupAddon>
          <span class="w-[7ch]">Subject</span>
        </InputGroupAddon>
        <InputText :value="recipient?.subject" readonly />
      </InputGroup>
      <InputGroup :pt="{ root: { style: { direction: 'ltr' } } }">
        <InputGroupAddon :pt="{ root: { style: { 'flex-shrink': 0 } } }">
          <span class="w-[7ch] shrink-0">Body</span>
        </InputGroupAddon>
        <Textarea id="body" v-model="emailBody" rows="8" class="resize-none" size="small" fluid />
      </InputGroup>
    </div>
    <template #footer>
      <Button
        :label="dirString('apply')"
        severity="primary"
        size="small"
        icon="pi pi-check"
        :icon-pos="buttonIconPosition()"
        variant="outlined"
        @click="apply"
      />
      <Button
        :label="dirString('close')"
        severity="secondary"
        size="small"
        icon="pi pi-times"
        :icon-pos="buttonIconPosition()"
        variant="outlined"
        @click="close"
      />
    </template>
  </Dialog>
</template>
