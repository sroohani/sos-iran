import type { DirectionalString, DirStringKey, DocumentDirection, EmailRecipient } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Location } from '@/types'
import { countries, flagsPngDirectory } from '@/constants'
import emailList from '@/email'

const useDirectionalityStore = defineStore('directionality', () => {
  const enRegionNames = new Intl.DisplayNames(['en'], { type: 'region' })
  const faRegionNames = new Intl.DisplayNames(['fa'], { type: 'region' })

  const dir = ref<DocumentDirection>('ltr')

  const userInfoImportaanceLtr =
    'By providing this information, you help use write emails that are less likely to be falsely detected as spam.'
  const userInfoImportaanceRtl =
    'با فراهم کردن این اطلاعات به ما کمک می‌کنید ایمیل‌هایی بنویسیم که کمتر احتمال داشته باشد به عنوان هرزنامه تشخیص داده شوند.'
  const directionalStrings = new Map<DirStringKey, DirectionalString>([
    ['full name', { ltr: 'Full name', rtl: 'نام کامل' }],
    ['country of residence', { ltr: 'Country of residence', rtl: 'کشور کنونی ' }],
    ['optional info', { ltr: 'Optional Iinformation', rtl: 'اطلاعات اختیاری' }],
    ['user info importance', { ltr: userInfoImportaanceLtr, rtl: userInfoImportaanceRtl }],
    ['email recipients', { ltr: 'Email Recipients', rtl: 'گیرندگان ایمیل' }],
    ['view', { ltr: 'View', rtl: 'دیدن' }],
    ['send', { ltr: 'Send', rtl: 'فرستادن' }],
    ['reset', { ltr: 'Reset', rtl: 'بازنشانی' }],
    ['apply', { ltr: 'Apply', rtl: 'ثبت' }],
    ['close', { ltr: 'Close', rtl: 'بستن' }],
    ['view original campaign', { ltr: 'View Original Campaign', rtl: 'دیدن کارزار اصلی' }],
  ])

  const dirString = (key: DirStringKey): string => {
    if (directionalStrings.has(key)) {
      return dir.value === 'ltr'
        ? directionalStrings.get(key)!.ltr
        : directionalStrings.get(key)!.rtl
    }

    return '--'
  }

  const observer = new MutationObserver(() => {
    dir.value = (document.documentElement.getAttribute('dir') ?? 'ltr') as DocumentDirection
  })

  observer.observe(document.documentElement, {
    subtree: false,
    childList: false,
    attributes: true,
    attributeFilter: ['dir'],
  })

  const buttonIconPosition = () => (dir.value === 'ltr' ? 'right' : 'left')

  const emailRecipientName = (code: EmailRecipient) => {
    if (code === 'EUP') {
      return dir.value === 'ltr' ? 'European Parliament' : 'پارلمان اروپا'
    }

    return emailList.has(code)
      ? dir.value === 'ltr'
        ? (enRegionNames.of(code) ?? '--')
        : (faRegionNames.of(code) ?? '--')
      : '--'
  }

  const locations = computed<Location[]>(() => {
    const regionNames = new Intl.DisplayNames([dir.value === 'ltr' ? 'en' : 'fa'], {
      type: 'region',
    })
    return countries.map((c) => ({
      alpha2: c.baseInfo.alpha2,
      name: regionNames.of(c.baseInfo.alpha2)!,
      flag: `${flagsPngDirectory}/${c.baseInfo.alpha2}.png`,
    }))
  })

  return { dir, dirString, locations, emailRecipientName, buttonIconPosition }
})

export default useDirectionalityStore
