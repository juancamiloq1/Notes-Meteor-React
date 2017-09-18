import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
    'notes.insert'(){
        if ( !this.userId ) {
            throw new Meteor.Error('no-autorizado');
        }

        return Notes.insert({
            title: '',
            body: '',
            userId: this.userId,
            updatedAt: moment().valueOf()  // Es lo mismo que usar esto SIN moment   new Date().getTime()
        });
    },
    'notes.remove'( _id ){
        if ( !this.userId ) {
            throw new Meteor.Error('no-autorizado');
        }

        new SimpleSchema({
            _id: {
              type: String,
              min: 1
            }
        }).validate({ _id });

        Notes.remove({ _id, userId: this.userId }); // solo puede eliminar el creador
    }
});
