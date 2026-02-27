import type { CountriesJson, Country } from './types'
import conutriesJson from './assets/json/countries.json'

export const countries: Country[] = (<CountriesJson>conutriesJson).map((cje) => {
  const country: Country = {
    baseInfo: { id: -1, alpha2: '', alpha3: '' },
    localeToNames: {},
  }

  Object.entries(cje).forEach((e) => {
    if (e[0] === 'id') {
      country.baseInfo.id = +e[1]
    } else if (e[0] === 'alpha2') {
      country.baseInfo.alpha2 = e[1] as string
    } else if (e[0] === 'alpha3') {
      country.baseInfo.alpha3 = e[1] as string
    } else {
      country.localeToNames[e[0]] = e[1] as string
    }
  })
  return country
})

export const flagsPngDirectory = '/flags/png/24x24'
export const flagsSvgDirectory = '/flags/svg/4x3'
