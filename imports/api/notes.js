import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
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
    }
});
