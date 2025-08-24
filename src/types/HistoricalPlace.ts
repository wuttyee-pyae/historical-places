export interface HistoricalPlace {
  id: number;
  name: string;
  image: string;
  description: string;
  location: string;
  year: number;
  visited?: boolean;
  history?: string;
}
