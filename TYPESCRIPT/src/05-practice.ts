function high(x: string) {
  const words = x.split(' ');
  let highestScore = 0;
  let highestWord = '';

  for (let word of words) {
    // calculate word score
    let score = 0;
    for (let char of word) {
      score += char.charCodeAt(0) - 96; 
    }

    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
    }
  }

  return highestWord;
}
console.log(high("I love coding"))