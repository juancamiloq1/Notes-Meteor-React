import expect, { createSpy, spyOn, isSpy } from 'expect'

const add = (a, b) => {
    if( typeof b != 'number' ) {
        return a + a;
    }
    return a + b;
};

describe('Suma', function(){
    it('deberia sumar dos numeros', function() {   // nombre y la funcion a testear
        const res = add(11,9);

        expect(res).toBe(20);

    });
    
    it('deberia doblar un numero', function (){
        const res = add(44);

        expect(res).toBe(88);
    
    });  
});



const square = (a) => a * a;

describe('Al Cuadrado', function(){
    it('deberia elevar al cuadrado un numero', function(){
        const res = square(4);

        expect(res).toBe(16);
    });
});