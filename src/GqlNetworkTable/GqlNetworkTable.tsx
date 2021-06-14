import * as React from 'react'
import { useFilters, useSortBy } from 'react-table'

import {LightBox, useThemeVariant, stringifyColor, Title} from '@habx/ui-core'
import { useTable, Table } from '@habx/ui-table'

import { GqlNetworkDetails } from '../GqlNetworkDetails'
import { GqlNetworkElement } from '../types'

import { useColumns } from './GqlNetworkTable.columns'
import {PlaceholderContainer} from './GqlNetworkTable.style'

const Placeholder: React.VoidFunctionComponent = () => <PlaceholderContainer><Title type='section'>No data captured</Title></PlaceholderContainer>

export const GqlNetworkTable: React.FunctionComponent<GqlNetworkTableProps> = ({
  data,
}) => {
  const theme = useThemeVariant()

  const columns = useColumns()
  const instance = useTable(
    {
      data,
      columns,
    },
    useFilters,
    useSortBy
  )
  const [selectedValue, setSelectedValue] =
    React.useState<GqlNetworkElement | null>(null)
  return (
    <React.Fragment>
      <Table
        getRowCharacteristics={(row) =>
          row.original?.response?.status !== 200
            ? { backgroundColor: stringifyColor(theme.colors.error.calm) }
            : {}
        }
        instance={instance}
        virtualized
        onRowClick={(row) => setSelectedValue(row.original)}
        noDataComponent={Placeholder}
      />
      <LightBox
        spacing="regular"
        value={selectedValue}
        open={!!selectedValue}
        onClose={() => setSelectedValue(null)}
      >
        {(modal) =>
          modal.state !== 'closed' && (
            <GqlNetworkDetails element={modal.value} />
          )
        }
      </LightBox>
    </React.Fragment>
  )
}

interface GqlNetworkTableProps {
  data: GqlNetworkElement[]
}

export default GqlNetworkTable

