export interface CurrentH5pStateWindow extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  H5P: any;
}

export interface H5pAsJsonObject {
  title:string ;
  mainLibrary:string ;
  language:string ;
  preloadedDependencies:string ;
  embedTypes:string ;
}
