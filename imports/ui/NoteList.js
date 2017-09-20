import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';

import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {    //Stateless Functional Component
    return(
        <div>
            <NoteListHeader />
            { props.notes.length === 0 ? <NoteListEmptyItem/> : undefined }
            { props.notes.map( (note) => {
                return <NoteListItem key={note._id} note={note} />
            })} 

            Numero de Notas {props.notes.length}
        </div>
    );
};

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {  //Version  contenerizada 
    Meteor.subscribe('notes');

    return{
        notes: Notes.find().fetch()
    };
}, NoteList);