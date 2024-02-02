export interface ReportProps {
    totalProfit: number
    totalCost: number
    totalPart: number
    totalLiquid: number
    chart: Chart[]
  }
  
  export interface Chart {
    chart: Chart2[]
    domain: Domain
    title: string
  }
  
  export interface Chart2 {
    legend: string
    x: string
    y: number
    qtd: number
  }
  
  export interface Domain {
    max: number
    min: number
  }