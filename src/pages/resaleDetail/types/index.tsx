export type CostListProps = CostProps[]

export interface CostProps {
  cost_history_id: number
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
  amount: number
  priceResale: number
  amountStock: number
  select?: boolean
  amountSelect?: number
  save?:number
}

export type HandleToggleSelectProps = ({index}: {index: number}) => void