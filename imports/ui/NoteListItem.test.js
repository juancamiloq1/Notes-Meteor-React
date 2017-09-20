import React from 'react';
import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if ( Meteor.isClient ) {
    describe('NoteListItem', function(){
        it('Deberia render title y timestamp', function(){
            const title = 'Mi título aqui';
            const updatedAt = 1505935905910;
            const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('9/20/17');
        });

        it('Deberia set default title if no title set', function(){
            const title = '';
            const updatedAt = 1505935905910;
            const wrapper = mount( <NoteListItem note={{ title, updatedAt }} /> );

            expect(wrapper.find('h5').text()).toBe('Nota sin título');
        });
    });
}

