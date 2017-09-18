import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { validateNewUser } from './users';

if ( Meteor.isServer ) {
    describe('users', function() {
        it('Deberia permitir email válido', function() {
            const testUser = {
                emails: [
                    {
                        address: 'Test@example.com'
                    }
                ]
            };
            const res = validateNewUser(testUser);
    
            expect(res).toBe(true);
        });
        
        it('Deberia rechazar email inválido', function () {
            const testUser = {
                emails: [
                    {
                        address: 'Testom'
                    }
                ]
            }
            expect( () => {
                validateNewUser(testUser);
            }).toThrow();
        });
    });
}

