let converter = {
  convert: function(letterMap) {
    let letters = "";
    let numberMap = [];
    let flag = true;
    for(let i = 0;i<letterMap.length;i++){
      if(letterMap.charAt(i)=='o')
        numberMap.push(0);
      else if(letterMap.charAt(i)=='x')
          numberMap.push(300);
        else if(letterMap.charAt(i)=='A'){
          if(flag) {
            numberMap.push(100);
            flag = false;
          }
          else
            numberMap.push(0);
        }
          else {
            if(letters.indexOf(letterMap.charAt(i))!=-1)
              numberMap.push(letters.indexOf(letterMap.charAt(i))+1);
            else {
              letters += letterMap.charAt(i);
              numberMap.push(letters.indexOf(letterMap.charAt(i))+1);
            }
          }
    }
    let numberArray = [[],[],[],[],[],[]];
    let counter = 0;
    for(let i = 0;i<6;i++)
      for(let j = 0;j<6;j++){
        numberArray[i][j] = numberMap[counter++];
      }
    return numberArray;
  }
}

export default converter;
