import type { emailRecipientMap } from '@/types'
import denmark from './denmark'
import europianParliament from './eup'
import india from './india'
import italy from './italy'
import romania from './romania'

const emailList: emailRecipientMap = new Map([
  ['IN', india],
  ['DK', denmark],
  ['IT', italy],
  ['RO', romania],
  ['EUP', europianParliament],
])

export default emailList

/*
import type { Email } from '@/types'


const temp: Email = {
  to: [],
  cc: [],
  bcc: [],
  subject:
    '',
  body: `
`,
}

export default temp

*/
