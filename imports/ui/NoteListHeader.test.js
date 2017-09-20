import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from './NoteListHeader';

if ( Meteor.isClient ) {
    describe('NoteListHeader', function(){
        it('Deberia call meteorCall on click', function(){
            const spy = expect.createSpy();
            const wrapper = mount( <NoteListHeader meteorCall={spy}/> );
            wrapper.find('button').simulate('click');      // Se simula el click en el botón        

            expect(spy).toHaveBeenCalledWith('notes.insert');
        });
    });
}