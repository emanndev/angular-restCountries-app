export interface Country {
  name: string;
  cca3: string;
  capital: string[];
  region: string;
  population: number;
  flags: {
    png: string;
    alt: string;
  };
  borders: string[];
  subregion?: string;
  tld?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
}
