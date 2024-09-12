import { PluginApi } from 'bigbluebutton-html-plugin-sdk';

export interface UserToBeRendered {
    userId: string;
    userName: string;
}
export interface PresenterViewComponentProps {
    pluginApi: PluginApi;
    listOfStudentsToBeRendered: UserToBeRendered[];
    contentAsJson: string;
    h5pAsJson: string;
}

export interface H5pWrapperProps {
    numberOfColumns: number;
}
