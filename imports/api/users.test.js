const add = (a, b) => {
    if( typeof b != 'number' ) {
        return a + a;
    }
    return a + b;
};

describe('Suma', function(){
    it('deberia sumar dos numeros', function() {   // nombre y la funcion a testear
        const res = add(11,9);
        if (res != 20 ) { 
            throw new Error ('Suma no es igual al valor esperado.')
        }
    });
    
    it('deberia doblar un numero', function (){
        const res = add(44);
    
        if( res != 88){
            throw new Error('el numero no fue doblado');
        }
    });  
});



const square = (a) => a * a;

describe('Al Cuadrado', function(){
    it('deberia elevar al cuadrado un numero', function(){
        const res = square(4);
        if (res != 16){
            throw new Error('este no es el cuadrado');
        }
    });
});