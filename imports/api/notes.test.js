import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if( Meteor.isServer ) {
    describe( 'notes', function () {
        const noteOne = {
            _id: 'testNoteId1',
            title: 'My title',
            body: 'My Body for note',
            updatedAt: 0,
            userId: 'testUserId1'
        };
        const noteTwo = {
            _id: 'testNoteId2',
            title: 'Things to buy',
            body: 'Couch',
            updatedAt: 0,
            userId: 'testUserId2'
        };

        beforeEach( function () {
            Notes.remove({});
            Notes.insert(noteOne);
            Notes.insert(noteTwo);
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
            Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);

            expect(Notes.findOne({ _id: noteOne._id })).toBeFalsy();
        });

        it('Deberia no eliminar nota si no esta autenticado', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.remove'].apply( {}, [noteOne._id]);
            }).toThrow();
        });

        it('Deberia no eliminar nota si el Id es invalido', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.remove'].apply({ 
                    userId: noteOne.userId
                });
            }).toThrow();
        });

        it('Deberia actualizar nota', function(){
            const title = 'Este es un titulo actualizado';

            Meteor.server.method_handlers['notes.update'].apply({
                userId: noteOne.userId
            }, [
                noteOne._id, 
                { title }
            ]);

            const note = Notes.findOne( noteOne._id );
            
            expect(note.updatedAt).toBeGreaterThan(0);

            expect(note).toContain({
                title, 
                body: noteOne.body
            });
        });

        it('Deberia throw error si existen extra actualizaciones', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [noteOne._id, { title: 'Nuevo Titulo', name: 'JuanCamilo' }]);
            }).toThrow();
        });

        it('No deberia actualizar nota si el usuario no es el creador', function(){
            const title = 'Este es un titulo actualizado';
            
            Meteor.server.method_handlers['notes.update'].apply({
                userId: 'testid'
            }, [
                noteOne._id, 
                { title }
            ]);

            const note = Notes.findOne( noteOne._id );
            
            expect(note).toInclude(noteOne);
        });

        it('No deberia actualizar nota si no esta autenticado', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.update'].apply( {}, [noteOne._id]);
            }).toThrow();
        });

        it('No deberia actualizar nota si el Id es invalido', function(){
            expect( () => {
                Meteor.server.method_handlers['notes.update'].apply({ 
                    userId: noteOne.userId
                });
            }).toThrow();
        });

        it('Deberia return las notas del usuario actual', function(){
            const res = Meteor.server.publish_handlers.notes.apply({ userId: noteOne.userId });
            const notes = res.fetch();

            expect(notes.length).toBe(1);
            expect(notes[0]).toEqual(noteOne);
        });

        it('No deberia return ninguna nota para los usuarios que no tienen ninguna.', function(){
            const res = Meteor.server.publish_handlers.notes.apply({ userId: 'testid' });
            const notes = res.fetch();

            expect(notes.length).toBe(0);
        });
    });
}