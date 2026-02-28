<script setup lang="ts">
import useDirectionalityStore from '@/stores/directionality'
import { Card, Message, Divider, Listbox, Button } from 'primevue'
import emailList from '@/email'
import { flagsSvgDirectory } from '@/constants'
import type { EmailRecipient } from '@/types'
import useEmailStore from '@/stores/email'
import { storeToRefs } from 'pinia'

const { dirString, emailRecipientName, buttonIconPosition } = useDirectionalityStore()
const { isEmailEditorVisible, emailRecipient } = storeToRefs(useEmailStore())

const view = (code: EmailRecipient) => {
  emailRecipient.value = code
  isEmailEditorVisible.value = true
}
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
      <Listbox :options="Array.from(emailList.keys())" scrollHeight="16rem">
        <template #option="{ option: code }">
          <div class="w-full flex flex-col justify-start items-start gap-2 mb-4">
            <div class="w-full flex justify-start items-center gap-4">
              <div class="w-16 h-12">
                <img
                  :src="`${flagsSvgDirectory}/${code === 'EUP' ? '../Flag_of_Europe.svg' : `${code.toLowerCase()}.svg`}`"
                />
              </div>
              <span class="text-sm">{{ emailRecipientName(code) }}</span>
            </div>
            <div class="w-full flex justify-start items-center gap-4">
              <Button
                :label="dirString('view')"
                icon="pi pi-eye"
                :icon-pos="buttonIconPosition()"
                severity="secondary"
                size="small"
                variant="outline"
                @click="view(code)"
              />
              <Button
                as="a"
                href=""
                :label="dirString('send')"
                icon="pi pi-send"
                :icon-pos="buttonIconPosition()"
                severity="primary"
                size="small"
                variant="link"
              />
            </div>
            <Divider
              :pt="{
                root: { style: { 'margin-bottom': 0, 'margin-top': 0 } },
              }"
            />
          </div>
        </template>
      </Listbox>
    </template>
  </Card>
</template>
