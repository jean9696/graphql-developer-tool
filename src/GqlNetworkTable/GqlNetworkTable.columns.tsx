import * as React from 'react'
import * as ReactTable from 'react-table'

import { IconButton, Tooltip } from '@habx/ui-core'
import { CellProps, Column } from '@habx/ui-table'

import { GqlNetworkElement } from '../types'
import {copyToClipboard} from '@lib/clipboard'
import {summarizeNetwork} from '@lib/summarizeNetwork'

export const useColumns = () =>
  React.useMemo<Column<GqlNetworkElement>[]>(
    () => [
      {
        Header: '',
        id: 'copy',
        Filter: () => null,
        minWidth: 40,
        maxWidth: 40,
        Cell: (({ row: { original } }) => {
          const copyNetworkDetails = async (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            copyToClipboard(summarizeNetwork(original))
          }
          return (
            <Tooltip title="Copy network data">
              <IconButton
                icon="copy-outline"
                tiny
                onClick={copyNetworkDetails}
              />
            </Tooltip>
          )
        }) as ReactTable.Renderer<CellProps<GqlNetworkElement, undefined>>,
      },
      {
        Header: 'Operation Name',
        accessor: (el) => el.request.operationName,
      },
      {
        Header: 'Type',
        accessor: (el) =>
          el.request.operation,
        maxWidth: 120,
      },
      {
        Header: 'URL',
        accessor: (el) => el.request.url,
      },
      {
        Header: 'Status',
        accessor: (el) => el.response.status,
        maxWidth: 100,
      },
    ],
    []
  )

