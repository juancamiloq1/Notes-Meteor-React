import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default class Dashboard extends React.Component{
    componentWillMount() {
        if ( !Meteor.userId() ) {
            this.props.browserHistory.replace('/');
        }
    }
    render() {
        return (
            <div>
                <PrivateHeader title='Dashboard'/>
                <div className='page-content'>
                    <NoteList />
                </div>
            </div>
        );
    }
}