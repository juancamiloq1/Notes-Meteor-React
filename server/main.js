import { Meteor } from 'meteor/meteor';

import '../imports/api/users';   //Solo necesitamos que se ejecute (Validacion de users)
import '../imports/api/notes';
import '../imports/startup/simple-schema-config';

Meteor.startup(() => {
  
});
