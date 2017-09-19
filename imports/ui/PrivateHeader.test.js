import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

if( Meteor.isClient ) {
    describe('PrivateHeader', function(){
        it('Deberia poner el texto del boton a Cerrar Sesión', function(){
           const wrapper = mount( <PrivateHeader title='Test title' handleLogout={ () => {}}/> );

           const buttonText = wrapper.find('button').text();

           expect(buttonText).toBe('Cerrar Sesión');
        });

        it('Deberia usar title prop como texto en h1', function(){
            const title = 'Test title here';
            const wrapper = mount( <PrivateHeader title={title}/> );
            const actualTitle = wrapper.find('h1').text();

            expect(actualTitle).toBe(title);
        });

        it('Deberia call handleLogout on Click', function(){
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title='Title' handleLogout={spy} /> );

            wrapper.find('button').simulate('click');

            expect(spy).toHaveBeenCalled();
        });
    });
}