import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';  // en vez de mount porque no me funciono. Salia que este podia reemplazarlo.

import { Login } from './Login';

if ( Meteor.isClient ){
    describe('Login', function(){

        it ('Deberia mostrar los mensajes de error', function(){
            const error = 'Esto no esta funcionando';
            const wrapper = shallow( <Login loginWithPassword={() => {}}/>);

            wrapper.setState({ error: error });
            expect(wrapper.find('p').text()).toBe(error);

            wrapper.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
            
        });
    });
}