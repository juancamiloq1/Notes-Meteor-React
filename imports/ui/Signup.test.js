import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import expect from 'expect';
import { mount } from 'enzyme';  

import { Signup } from './Signup';

if ( Meteor.isClient ){
    describe('Signup', function(){

        it ('Deberia mostrar los mensajes de error', function(){
            const error = 'Esto no esta funcionando';
            const wrapper = mount(
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={() => {}} />
                </MemoryRouter>
            );
            const signup = wrapper.find(Signup).node;

            // .state() belongs to wrapper (the root) so it will not work with the const "login".
            // It doesn't matter, you've just declared 'login' as the Login component node, so now with it you have access
            // to all of Login's objects!
            // The state inside "login" is an array and you can get the values as such:
            
            expect(signup.state['error'].length).toBe(0); 
            signup.setState({ error }); // <- you also get access to .setState()!
        
            // I think the following 2 lines are the ones that caused your error.
            // Try to use .text() in the following fashion:    
            const errorElement = wrapper.find('p'); // First, get the element.
            expect(errorElement.text()).toBe(error); // Then get its text.
        
            signup.setState({ error: '' });
            expect(wrapper.find('p').length).toBe(0);
        });

        it('Deberia call createUser con los datos del form', function(){
            const email = 'juancamilo@gmail.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount( 
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );

            wrapper.find(Signup).node.refs['email'].value = email;
            wrapper.find(Signup).node.refs['password'].value = password;

            wrapper.find('form').simulate('submit');

            expect(spy).toHaveBeenCalled();
            expect(spy.calls[0].arguments[0]).toEqual({ email: email, password: password });
            
        });

        it('Deberia set error if short password', function(){
            const email = 'juancamilo@gmail.com';
            const password = '123               ';
            const spy = expect.createSpy();
            const wrapper = mount( 
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );

            wrapper.find(Signup).node.refs['email'].value = email;
            wrapper.find(Signup).node.refs['password'].value = password;

            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toNotBe(0);
        });
        
        it('Deberia set createUser callback errors', function(){
            const password = 'password123!';
            const reason = 'Esto es por lo que ha fallado';
            const spy = expect.createSpy();
            const wrapper = mount( 
                <MemoryRouter initialEntries={['/']} initialIndex={0}>
                    <Signup createUser={spy} />
                </MemoryRouter>
            );
            wrapper.find(Signup).node.refs['password'].value = password;
            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({ reason: reason });  
            expect(wrapper.state('error')).toBe(reason);
            
            spy.calls[0].arguments[1]();
            expect(wrapper.state('error').length).toBe(0);

        });
    });
}