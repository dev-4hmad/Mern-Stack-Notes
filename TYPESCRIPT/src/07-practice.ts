function doubleChar(str:string) {
  return str.split('').map(s=>s+s+s).join('')
}
console.log(doubleChar("Ahmad"))