import { PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { MoreInfoUser } from '../types';

export interface UserToBeRendered {
    userId: string;
    userName: string;
}
export interface PresenterViewComponentProps {
    pluginApi: PluginApi;
    listOfStudentsToBeRendered: UserToBeRendered[];
    usersList: MoreInfoUser[];
    contentAsJson: string;
    h5pAsJson: string;
}
