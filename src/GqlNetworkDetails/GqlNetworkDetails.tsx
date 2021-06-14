import * as React from 'react'

import { HeaderBar, TabsBar, TabsBarItem, Title } from '@habx/ui-core'

import { GraphqlHighlight } from '@components/atoms/GraphqlHighlight'
import { ReactJson } from '@components/atoms/ReactJson'

import { GqlNetworkElement } from '../types'

enum Tabs {
  request = 'request',
  variables = 'variables',
  response = 'response',
  headers = 'headers',
}

const tabsConfig: Record<Tabs, { label: string }> = {
  [Tabs.request]: { label: 'Request' },
  [Tabs.variables]: { label: 'Variables' },
  [Tabs.response]: { label: 'Response' },
  [Tabs.headers]: { label: 'Headers' },
}

export const GqlNetworkDetails: React.VoidFunctionComponent<GqlNetworkDetailsProps> =
  ({ element }) => {
    const [currentTab, setTab] = React.useState<Tabs>(Tabs.request)
    return (
      <div>
        <HeaderBar>
          <Title type="regular">
            {element.request.operation} {element.request.operationName}
          </Title>
        </HeaderBar>
        <HeaderBar small>
          <TabsBar>
            {Object.entries(tabsConfig).map(([value, tabConfig]) => {
              return (
                <TabsBarItem
                  key={value}
                  onClick={() => setTab(value as Tabs)}
                  active={value === currentTab}
                >
                  {tabConfig.label}
                </TabsBarItem>
              )
            })}
          </TabsBar>
        </HeaderBar>
        {currentTab === Tabs.request && (
          <GraphqlHighlight documentNode={element.request.documentNode} />
        )}
        {currentTab === Tabs.variables && (
          <ReactJson src={element.request.variables} name="variables" />
        )}
        {currentTab === Tabs.response && (
          <ReactJson
            src={element.response.data}
            name="response"
            shouldCollapse={({ name }) => name === 'extensions'}
          />
        )}
        {currentTab === Tabs.headers && (
          <ReactJson
            src={{
              request: element.request.headers,
              response: element.response.headers,
            }}
            name="headers"
          />
        )}
      </div>
    )
  }

export interface GqlNetworkDetailsProps {
  element: GqlNetworkElement
}
