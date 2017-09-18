import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if( Meteor.isServer ) {
    describe( 'notes', function () {

        beforeEach( function () {
            Notes.remove({});
            Notes.insert({
                _id: 'testNoteId1',
                title: 'My title',
                body: 'My Body for note',
                updatedAt: 0,
                userId: 'testUserId1'
            });
        });

        it( 'Deberia insertar nueva nota', function () {
            const userId = 'testid';
            const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });  //Con esta linea se llama el metodo en api/notes.js
            
            expect(Notes.findOne({ _id, userId })).toBeTruthy();
        });

        it('Deberia no insertar nota si no esta autenticado', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.insert']();
            }).toThrow();
        });

        it('Deberia eliminar nota', function(){
            Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1' }, ['testNoteId1']);

            expect(Notes.findOne({ _id: 'testNoteId1' })).toBeFalsy();
        });

        it('Deberia no eliminar nota si no esta autenticado', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.remove'].apply( {}, ['testNoteId1']);
            }).toThrow();
        });

        it('Deberia no eliminar nota si el Id es invalido', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.remove'].apply({ userId: 'testUserId1'});
            }).toThrow();
        });


    });
}