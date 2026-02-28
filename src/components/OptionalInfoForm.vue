<script setup lang="ts">
import useRandomString from '@/composables/use-random-string'
import { optionalInfoSchema, type OptionalInfoSchema } from '@/schemas/optional-info'
import useDirectionalityStore from '@/stores/directionality'
import { Form } from '@primevue/forms'
import Card from 'primevue/card'
import Message from 'primevue/message'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { ref } from 'vue'
import { Divider } from 'primevue'
import TextEntry from './TextEntry.vue'
import LocationEntry from './LocationEntry.vue'
import { storeToRefs } from 'pinia'

const { dirString } = useDirectionalityStore()
const { locations } = storeToRefs(useDirectionalityStore())
const initialValues: OptionalInfoSchema = {}
const resolver = ref(zodResolver(optionalInfoSchema))
const genRandStr = useRandomString(4, false, '0123456789')
const fullNameRef = ref()
const countryOfResidenceRef = ref()
</script>

<template>
  <Card class="w-full max-w-lg h-fit border border-p-border">
    <template #title>
      <div class="flex flex-col justify-start items-center">
        <Message severity="success" variant="simple" class="w-full justify-center">
          <span>{{ dirString('optional info') }}</span>
        </Message>
        <Divider />
        <Message
          severity="error"
          icon="pi pi-info-circle"
          size="large"
          variant="simple"
          :pt="{
            contentWrapper: {
              style: {
                display: 'flex',
                'justify-content': 'flex-start',
                'align-items': 'flex-center',
                gap: '2rem',
              },
            },
            content: {
              style: {
                display: 'flex',
                'justify-content': 'flex-start',
                'align-items': 'flex-center',
                gap: '2rem',
              },
            },
          }"
          >{{ dirString('user info importance') }}</Message
        >
      </div>
      <Divider />
    </template>
    <template #content>
      <Form v-slot="$form" :initial-values :resolver class="flex flex-col gap-2 px-4 my-4">
        <TextEntry
          ref="fullNameRef"
          id="fullName"
          name="fullName"
          :label="dirString('full name')"
          inputId="fullName"
        />
        <LocationEntry
          ref="countryOfResidenceRef"
          id="countryOfResidence"
          :locations
          flagPlaceholderImage="/flags/png/24x24/placeholder.png"
          inputId="countryOfResidence"
          name="countryOfResidence"
          :label="dirString('country of residence')"
        />
      </Form>
    </template>
  </Card>
</template>
