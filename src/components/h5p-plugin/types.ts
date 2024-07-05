interface H5pPluginProps {
    pluginName: string,
    pluginUuid: string,
}

interface H5pContents {
  contentAsJson: string;
  h5pAsJson: string;
}

export {
  H5pPluginProps,
  H5pContents,
};
