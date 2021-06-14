import { DocumentNode } from 'graphql'
import { OperationTypeNode } from 'graphql/language/ast'

export interface GqlNetworkElement {
  request: {
    operationName: string
    documentNode: DocumentNode
    query: string
    variables: object
    url: string
    operation: OperationTypeNode | undefined
    headers: object
  }
  response: {
    status: number
    data: any
    headers: object
  }
}
