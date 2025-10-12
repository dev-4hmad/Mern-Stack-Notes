function oddOrEven(array: number[]) {
   if (array.length === 0) return 0
  const sum = array.reduce((acc: number, cur:number) => acc + cur, 0);
  
  if (sum%2===0){
    return "even"
  } 
  return "odd"
}
console.log(oddOrEven([3,4,5,6]))