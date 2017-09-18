import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if( Meteor.isServer ) {
    describe( 'notes', function () {

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
    });
}