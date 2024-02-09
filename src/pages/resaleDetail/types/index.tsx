export type CostListProps = CostProps[]

export interface CostProps {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  totalResale: number
  totalSold: number
  amount: number
  price: number
  priceResale: number
  amountStock: number
  select?: boolean
  amountSelect?: number
}

export type HandleToggleSelectProps = ({index}: {index: number}) => void