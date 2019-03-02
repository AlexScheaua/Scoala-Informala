class Elev {
  constructor(name){
    this.name = name;
    this.grades = [];
  }

  average(){
    var s = 0;
    for(let i = 0; i < this.grades.length; i++){
        s += this.grades[i];
        if(i === this.grades.length - 1){
          s = s / this.grades.length;
        }
    }
    return s;
  }
}
