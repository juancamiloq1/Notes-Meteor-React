import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';

const notes = [
    {
        _id: 'noteId1',
        title: 'Test title',
        body: '',
        updatedAt: 0,
        userId: 'userId1'
    }, {
        _id: 'noteId2',
        title: '',
        body: 'Algo por aqui en el body',
        updatedAt: 0,
        userId: 'userId2'
    }
];

if ( Meteor.isClient ) {
    describe('NoteList', function(){
        it ( 'Deberia render NoteListItem for each note', function(){
            const wrapper = mount( <NoteList notes={notes}/> );
            
            expect(wrapper.find('NoteListItem').length).toBe(2);  //Tambien se puede usar para encontrar React Components)
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0); 
        });

        it('Deberia render NoteListEmptyItem if zero notes', function(){
            const wrapper = mount( <NoteList notes={[]}/> );
            
            expect(wrapper.find('NoteListItem').length).toBe(0);  //Tambien se puede usar para encontrar React Components)
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });
    });
}