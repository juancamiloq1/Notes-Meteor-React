import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount } from 'enzyme';  

import { Login } from './Login';

if ( Meteor.isClient ){
    describe('Login', function(){

        it ('Deberia mostrar los mensajes de error', function(){
            const error = 'Esto no esta funcionando';
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Login loginWithPassword={() => {}} />
                </MemoryRouter>
            );
            const login = wrapper.find(Login).node;

            // .state() belongs to wrapper (the root) so it will not work with the const "login".
            // It doesn't matter, you've just declared 'login' as the Login component node, so now with it you have access
            // to all of Login's objects!
            // The state inside "login" is an array and you can get the values as such:
            
            expect(login.state['error'].length).toBe(0); 
            login.setState({ error }); // <- you also get access to .setState()!
        
            // I think the following 2 lines are the ones that caused your error.
            // Try to use .text() in the following fashion:    
            const errorElement = wrapper.find('p'); // First, get the element.
            expect(errorElement.text()).toBe(error); // Then get its text.
        
            login.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('Deberia call loginWithPassword con los datos del form', function(){
            const email = 'juancamilo@gmail.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount( 
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Login loginWithPassword={spy} />
                </MemoryRouter>
            );

            wrapper.find(Login).node.refs['email'].value = email;
            wrapper.find(Login).node.refs['password'].value = password;

            wrapper.find('form').simulate('submit');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({ email: email });
            
        });
        
        it('Deberia set loginWithPassword callback errors', function(){
            const spy = expect.createSpy();
            const wrapper = mount( 
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Login loginWithPassword={spy} />
                </MemoryRouter>
            );

            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[2]({});
            expect(wrapper.state('error').length).toNotBe(0);
            
            spy.calls[0].arguments[2]();
            expect(wrapper.state('error').length).toBe(0);

        });
    });
}