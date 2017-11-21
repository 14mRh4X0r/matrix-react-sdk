/*
Copyright 2017 New Vector Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import PropTypes from 'prop-types';
import GeminiScrollbar from 'react-gemini-scrollbar';
import sdk from '../../../index';
import { MatrixClient } from 'matrix-js-sdk';
import { _t } from '../../../languageHandler';

export default React.createClass({
    displayName: 'GroupUserSettings',

    contextTypes: {
        matrixClient: PropTypes.instanceOf(MatrixClient),
    },

    getInitialState() {
        return {
            err: null,
            groups: [],
        };
    },

    componentWillMount: function() {
        this.context.matrixClient.getJoinedGroups().done((result) => {
            this.setState({groups: result.groups, error: null});
        }, (err) => {
            console.error(err);
            this.setState({groups: null, error: err});
        });
    },

    render() {
        const GroupPublicityToggle = sdk.getComponent('groups.GroupPublicityToggle');
        const groupPublicityToggles = this.state.groups.map((groupId, index) => {
            return <GroupPublicityToggle key={index} groupId={groupId} />;
        });
        return <div>
            <h3>{ _t('Flair') }</h3>
            <div className="mx_UserSettings_section">
                <p>
                    { _t('Display your community flair in rooms configured to show it.') }
                </p>
                <div className="mx_GroupUserSettings_groupPublicity_scrollbox">
                    <GeminiScrollbar>
                        { groupPublicityToggles }
                    </GeminiScrollbar>
                </div>
            </div>
        </div>;
    },
});