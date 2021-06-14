import styled from 'styled-components'
import {theme} from '@habx/ui-core'

export const AppContainer = styled.div`
  background: ${theme.color('background')};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`

export const AppContent = styled.div`
  position: relative;
  justify-content: stretch;
  flex: 1 1 auto;
`
