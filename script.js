/*

Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
*/

/*****************
    INIT
*****************/
let secondsToWait = 5;
const totalNumbers = 5;
const randomNumbers = [];



/*****************
    FUNCTIONS
*****************/
const getRandomNumber = (min, max) =>{
    return Math.floor(Math.random() * (max - min +1) + min);
}

const printMessages = (message, numbers) =>{
    document.getElementById('message').innerHTML = message;
    document.getElementById('numbers').innerHTML = numbers;
}

const getUserNumbers = () =>{
    /*
        1. genero tutti i prompt
        2. salvo i numeri (univoci) in un array
        3. restituisco l'array
    */

    const numbers = [];
    while(numbers.length < totalNumbers){
        const newNumber = parseInt(prompt('Inserisci un numero'));
        // controllo di univocità
        if(!numbers.includes(newNumber)){
            numbers.push(newNumber)
        }
    }
    return numbers;
}

const checkGussedUserNumbers = (numbersToCheck) =>{
    /*
        1. salvare in un array le corrispondenze esatte
        2. restituire l'array con l'elenco dei numeri giusti
    */
    
    // Modalità filter
    /*const guessed = randomNumbers.filter(number => {
        return numbersToCheck.includes(number);
    });
    ;*/


    // modalità ciclo for
    const guessed = [];
    for(let number of randomNumbers){
        if(numbersToCheck.includes(number)){
            guessed.push(number)
        }
    }

    return guessed;

}


// timing function
const countdown = setInterval(function(){
    secondsToWait--;
    printMessages(`Hai ${secondsToWait} secondi per memorizzare i seguenti numeri:`, randomNumbers);
},1000);

setTimeout(function(){
    printMessages(`Te li ricordi tutti?`, '');
    clearInterval(countdown);
},secondsToWait * 1000);

setTimeout(function(){
    printMessages(`Scrivi tutti i numeri`, '');
    // richiedo all'utente i numeri
    const userNumbers = getUserNumbers();
    // verifico quali sono i numeri vincenti
    const guessedUserNumbers = checkGussedUserNumbers(userNumbers);
    // messaggio finale
    if(guessedUserNumbers.length === 0){
        printMessages(`Non hai indivinato nulla!!!!`, '');
    }else{
        printMessages(`Hai indivinato ${guessedUserNumbers.length} numeri:`, guessedUserNumbers);
    }

},(secondsToWait + 1) * 1000);


/*****************
    START APP
*****************/
// estrazione numeri casuali
while(randomNumbers.length < totalNumbers){
    // estraggo un numero random
    const newRandomNumer = getRandomNumber(1, 100);
    // controllo di univocità
    if(!randomNumbers.includes(newRandomNumer)){
        randomNumbers.push(newRandomNumer);
    }
}

printMessages(`Hai ${secondsToWait} secondi per memorizzare i seguenti numeri:`, randomNumbers);
console.log(randomNumbers);
