import {notify} from '@habx/ui-core'

const INPUT_TO_CLIPBOARD_ID = 'gql-dev-input-id'

export const copyToClipboard = (value: string | object) => {
  try {
    const textarea = document.createElement('textarea')
    textarea.id = INPUT_TO_CLIPBOARD_ID
    textarea.value = typeof value !== 'string' ? JSON.stringify(value) : value
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    notify('Copied to clipboard !', { type: 'success'})
  } catch {
    notify('Unable to copy value to clipboard !', { type: 'error'})
  }
}
