console.log("   1.O functie care primeste un sir de caractere si returneaza cifrele din sirul respectiv");
  function returnNumbers(n){
    var strFinal = "";
    for(let i = 0; i < n.length; i++){
      if(!isNaN(parseInt(n[i]))){
        strFinal = strFinal + n[i];
      }
    }
    return strFinal;
  }

  console.log(returnNumbers("1d3rew34"));

console.log("   2.O functie care primeste un sir de caractere si returneaza doar literele din sirul respectiv");
  function returnLetters(n){
    var strFinal = "";
    for(let i = 0; i < n.length; i++){
      if(isNaN(parseInt(n[i]))){
        strFinal = strFinal + n[i];
      }
    }
    return strFinal;
  }
  console.log(returnLetters("a34sfd342"));

console.log("   3.O functie care primeste un sir de caractere si returneaza primele 5 litere(daca exista)");
  function firstFive(n){
    var strFinal = "";
    var i = 0;
    while(strFinal.length < 5) {
      if(!n[i]){
        break;
      }
      if(isNaN(parseInt(n[i]))){
        strFinal = strFinal + n[i];
      }
      i++;
    }
    return strFinal;
  }

  console.log(firstFive("ds31a24re"));
  console.log(firstFive("d124qt"));

console.log("   4.O functie care primeste o lista de siruri de caractere si returneaza sirurile concatenate");
  function concatenate(a){
    var strFinal = "";
    for(let i = 0; i < a.length; i++){
      strFinal = strFinal + a[i];
    }
    return strFinal;
  }

  console.log(concatenate(["Alex","are","mere"]));

console.log("   5.O functie care primeste o lista de siruri de caractere si returneaza cifrele din toate sirurile");
  function concatenateNumbers(a){
    var strFinal = "";
    for(let i = 0; i < a.length; i++){
      for(let j = 0; j < a[i].length; j++){
        if(!isNaN(parseInt(a[i][j]))){
          strFinal = strFinal + a[i][j];
        }
      }
    }
    return strFinal;
  }

  console.log(concatenateNumbers(["alex1","are2","do3ua","4mere"]));

console.log("   6.O functie care primeste o lista de siruri de caractere si returneaza lista de siruri de caractere inversate");
  function stringInverse(a){
    arrFinal = [];
    for(let i = 0; i < a.length; i++){
      let str = "";
      for(let j = a[i].length-1; j >=0; j--){
        str = str + a[i][j];
      }
      arrFinal.push(str);
    }
    return arrFinal;
  }

  console.log(stringInverse(["alex","are","un","laptop"]));

console.log("   7.Calculeaza factorialul unui numar");
  function factorial(n){
    fact = 1;
    for(let i = 1; i <= n; i++){
      fact = fact * i;
    }
    return fact;
  }

  console.log(factorial(3));
  console.log(factorial(6));

console.log("   8.Calculeaza cel mai mare divizor comun al 2 numere");
  function mareDivizor(a,b) {
    if(b < a){
      var aux = a;
      a = b;
      b = aux;
    }
    for(let i = a; i > 0; i--){
      if(a % i === 0){
        if(b % i === 0) {
          return i;
        }
      }
    }
  }

  console.log(mareDivizor(26,16));

  console.log("   9.Calculeaza cel mai mic multiplu comun al 2 numere");
