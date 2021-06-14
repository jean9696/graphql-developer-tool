import * as React from 'react'
import type { ReactJsonViewProps } from 'react-json-view'

import { ReactJsonContainer } from './ReactJson.style'
import {copyToClipboard} from '@lib/clipboard'
const BaseReactJson = React.lazy(() => import('react-json-view'))

export const ReactJson: React.VoidFunctionComponent<ReactJsonProps> = (
  props
) => {
  return (
    <ReactJsonContainer>
      <React.Suspense fallback={null}>
        <BaseReactJson theme="solarized" iconStyle="circle" enableClipboard={({ src }) => copyToClipboard(src)} {...props} />
      </React.Suspense>
    </ReactJsonContainer>
  )
}

interface ReactJsonProps extends ReactJsonViewProps {}
