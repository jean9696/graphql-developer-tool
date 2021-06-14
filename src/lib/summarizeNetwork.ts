import { omit } from 'lodash'

import { GqlNetworkElement } from '../types'

export const summarizeNetwork = (element: GqlNetworkElement) => {
  return `
## Request

${element.request.query}

## Variables

${JSON.stringify(element.request.variables, undefined, 2)}

## Response

${JSON.stringify(omit(element.response.data, 'extensions'), undefined, 2)}
`
}
