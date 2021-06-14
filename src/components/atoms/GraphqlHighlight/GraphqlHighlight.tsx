import { DocumentNode } from 'graphql'
import { print } from 'graphql/language/printer'
import * as React from 'react'

import {
  GQL_VARIABLE_CLASS,
  GraphqlHighlightContainer,
} from './GraphqlHighlight.style'

const VARIABLES_REGEXP = /\$[a-z]+/gi

export const GraphqlHighlight: React.FunctionComponent<GraphqlHighlightProps> =
  ({ documentNode }) => {
    const __html = React.useMemo(() => {
      // TODO: highlight graphql
      const stringQuery = print(documentNode)
      return stringQuery.replace(
        VARIABLES_REGEXP,
        (variable) => `<span class="${GQL_VARIABLE_CLASS}">${variable}</span>`
      )
    }, [documentNode])
    return <GraphqlHighlightContainer dangerouslySetInnerHTML={{ __html }} />
  }

interface GraphqlHighlightProps {
  documentNode: DocumentNode
}
