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
      if(a % i === 0 && b % i === 0){
      }
    }
  }

  console.log(mareDivizor(26,16));

console.log("   9.Calculeaza cel mai mic multiplu comun al 2 numere");
  function multipluComun(a,b){
    if(b < a){
      var aux = a;
      a = b;
      b = aux;
    }
    for(let i = b; ;i++){
      if(i % b === 0 && i % a === 0){
        return i;
      }
    }
  }

  console.log(multipluComun(3,4));

console.log("   10.Returneaza un array care sa contina toti divizorii unui numar (ex pentru 64: trebuie sa returneze [2,4,8,16,32])");
  function totiDivizorii(n){
    var arrFinal = [];
    for(let i = 0; i <= n; i++){
      if(n % i === 0){
        arrFinal.push(i);
      }
    }
    return arrFinal;
  }

  console.log(totiDivizorii(64));

console.log("   11.O functie care verifica daca un numar este palindrom (ex: 121, 1234321)");
	function palindrom(str) {
    str = str + "";
		for(let i = 0; i < str.length / 2; i++) {
			if(str[i] !== str[str.length - i - 1]){
				return str + " NU este palindrom";
			}
		}
		return str + " este palindrom";
	}

  console.log(palindrom(1234321));
  console.log(palindrom(12345321));

console.log("   12.O functie care sorteaza numerele pare dintr-un sir de numere primit ca parametru.");
  function sortEven(n){
    n = n + "";
    var arrFinal = [];
    for(let i = 0; i < n.length; i++){
      if(parseInt(n[i]) % 2 ===0){
        arrFinal.push(parseInt(n[i]));
      }
    }
    arrFinal.sort(function(a,b) {
      return a - b;
    });
    return arrFinal;
  }

  console.log(sortEven(1236740918));

console.log("   13.O functie care primeste ca parametru un array de numere. Aceasta sorteaza ascendent numerele pare si descendent numerele impare, in cadrul aceluiasi array primit ca parameru.");
  function sortOddEven(arr) {
    arr.sort(function(a,b) {
      if(a % 2 === 0 && b % 2 !== 0 || a % 2 !== 0 && b % 2 === 0){
        return;
      } else if(a % 2 === 0 && b % 2 === 0){
        return a - b;
      } else if(a % 2 !== 0 && b % 2 !== 0){
        if(a < b){
          return 1;
        } else if(a > b) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    return arr;
  }

console.log("   14.O functie care primeste 2 parametri(un array si un numar). Folosind binary search verificati daca numarul primit ca parametru se gaseste in array. ");
  function existaBinar(arr,n) {
    var left = 0;
    var right = arr.length -1
    arr.sort(function(a,b){
      return a - b;
    })
    while(left <= right){
      var middle = parseInt((left + right)/2);
      if(arr[middle] < n){
        left = middle + 1;
      } else if(arr[middle] > n){
        right = middle - 1;
      } else {
        return n + " exista in array";
      }
    }
    return n +" NU EXISTA IN ARRAY";
  }

  console.log(existaBinar([1,2,3,4,5,6,7,8,8],1));
  console.log(existaBinar([1,2,3,4,5,6,7,8,8],9));

console.log("   15.O functie care implementeaza binary search pentru a verifica daca un numar se regaseste intr-un array. Dupa ce se termina executia functiei trebuie sa puteti afisa de cate ori s-a apelat functia recursiv. (hint: puteti folosi 2 functii sau variabila globala)");
  function recursivBinar(arr,n) {
    var left = 0;
    var right = arr.length -1
    arr.sort(function(a,b){
      return a - b;
    })

    var apelari = 0;
    recursivExistaBinar(left,right);

    function recursivExistaBinar(left,right){
      if(left <= right){
        var middle = parseInt((left + right)/2);
        if(arr[middle] < n){
          left = middle + 1;
          apelari++;
          recursivExistaBinar(left,right);
        } else if(arr[middle] > n){
          right = middle - 1;
          apelari++;
          recursivExistaBinar(left,right);
        } else if(arr[middle] === n) {
          apelari++;
          return apelari;
        }
      }
    }
    return apelari;
  }

console.log(recursivBinar([1,2,3,4,5,6,7,8,9],5));
console.log(recursivBinar([1,2,3,4,5,6,7,8,9],1));
console.log(recursivBinar([1,2,3,4,5,6,7,8,9],0));
