export interface Country {
  name: {
    [x: string]: any;
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
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
