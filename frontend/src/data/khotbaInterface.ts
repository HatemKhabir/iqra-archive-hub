interface Khotba{
    mosqueId:string;
    khotbaId:string;
    title:string;
    creationDate:Date;
    city:string;
    isPedning:boolean;
    country:string;
    mosqueName:string;
    officialLanguage:string;
    khotbaType:string;
    content?:string;
    hasAudio:boolean;
    audioUrl?:string;
    pdfUrl?:string;
}

interface PaginatedKhotbas {
  content: Khotba[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  empty: boolean;
}

export type { Khotba,PaginatedKhotbas };