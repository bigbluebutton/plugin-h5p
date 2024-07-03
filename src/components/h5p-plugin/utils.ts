import { H5pContents } from './types';

interface H5pContentsObject {
  contentAsJson: object;
  h5pAsJson: object;
}

export const isValidJSON = (obj: string) => {
  try {
    JSON.parse(obj);
    return true;
  } catch (e) {
    return false;
  }
};

export const extractH5pContents = (obj: string): H5pContents | undefined => {
  try {
    const parseResult: H5pContentsObject = JSON.parse(obj);

    const h5pContents: H5pContents = {
      contentAsJson: JSON.stringify(parseResult.contentAsJson),
      h5pAsJson: JSON.stringify(parseResult.h5pAsJson),
    };
    return h5pContents;
  } catch (e) {
    return undefined;
  }
};
