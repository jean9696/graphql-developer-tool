import gql from 'graphql-tag'
import { OperationDefinitionNode } from 'graphql/language/ast'
import { print } from 'graphql/language/printer'
import * as React from 'react'

import {
  Button,
  HeaderBar,
  Provider,
  ThemeProvider,
  EuclidFont,
  Title,
  Icon,
} from '@habx/ui-core'

import { AppContainer, AppContent } from './App.style'
import { GqlNetworkTable } from './GqlNetworkTable'
import { GlobalStyle } from './styles'
import { GqlNetworkElement } from './types'

export const App: React.VoidFunctionComponent = () => {
  const [networkList, setNetworkList] = React.useState<GqlNetworkElement[]>([])

  React.useEffect(() => {
    const listenRequests = async (req: chrome.devtools.network.Request) => {
      try {
        const postData = req.request.postData?.text
        const url = req.request.url
        const status = req.response.status

        if (postData) {
          const rawRequestData = JSON.parse(postData)
          const requestDataList = Array.isArray(rawRequestData)
            ? rawRequestData
            : [rawRequestData]

          const rawResponseData = await new Promise((resolve, reject) => {
            req.getContent((c) => {
              try {
                resolve(JSON.parse(c))
              } catch (e) {
                reject(e)
              }
            })
          })
          const responseDataList = Array.isArray(rawResponseData)
            ? rawResponseData
            : [rawResponseData]

          for (const dataIndex in requestDataList) {
            console.log(req)

            const requestData = requestDataList[dataIndex]
            const responseData = responseDataList[dataIndex]

            const parsedQuery = gql`
              ${requestData.query}
            `
            if (parsedQuery.kind === 'Document') {
              setNetworkList((prev) => [
                ...prev,
                {
                  request: {
                    ...requestData,
                    headers: Object.fromEntries(req.request.headers?.map(({ value, name}) => [name, value])) ?? {},
                    query: print(parsedQuery),
                    documentNode: parsedQuery,
                    operation: (
                      parsedQuery.definitions.find(
                        (def) => (def as OperationDefinitionNode).operation
                      ) as OperationDefinitionNode | undefined
                    )?.operation,
                    url,
                  },
                  response: {
                    status,
                    data: responseData,
                    headers: Object.fromEntries(req.response.headers?.map(({ value, name}) => [name, value])) ?? {},
                  },
                },
              ])
            }
          }
        }
      } catch {} // eslint-disable-line
    }

    const resetPage = () => setNetworkList([])
    chrome.devtools.network.onRequestFinished.addListener(listenRequests)
    chrome.devtools.network.onNavigated.addListener(resetPage)
    return () => {
      chrome.devtools.network.onRequestFinished.removeListener(listenRequests)
      chrome.devtools.network.onNavigated.removeListener(resetPage)
    }
  })
  return (
    <Provider>
      <ThemeProvider preset="dark">
        <AppContainer>
          <HeaderBar sticky>
            <Title type="regular">Graphql Network</Title>
            <Button
              small
              ghost
              onClick={() => setNetworkList([])}
              elementRight={<Icon icon="trash-outline" />}
            >
              Clear
            </Button>
          </HeaderBar>
          <React.Suspense fallback={null}>
            <AppContent>
              <GqlNetworkTable data={networkList} />
            </AppContent>
          </React.Suspense>
        </AppContainer>
        <GlobalStyle />
        <EuclidFont />
      </ThemeProvider>
    </Provider>
  )
}
