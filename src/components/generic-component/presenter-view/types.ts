import { GraphqlResponseWrapper } from 'bigbluebutton-html-plugin-sdk';
import { DataChannelEntryResponseType } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/types';
import { MoreInfoUser, UserH5pCurrentState } from '../types';

export interface PresenterViewComponentProps {
    currentUserId: string;
    usersList: MoreInfoUser[];
    h5pLatestStateUpdate: GraphqlResponseWrapper<
        DataChannelEntryResponseType<UserH5pCurrentState>[]>;
    contentAsJson: string;
    h5pAsJson: string;
}
