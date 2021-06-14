import styled from 'styled-components'

import { theme } from '@habx/ui-core'

export const GQL_VARIABLE_CLASS = 'gql-variable'

export const GraphqlHighlightContainer = styled.pre`
  font-size: 13px;
  line-height: 18px;
  color: ${theme.textColor({ variation: 'title' })};
  .${GQL_VARIABLE_CLASS} {
    color: ${theme.color('primary')};
  }
`
