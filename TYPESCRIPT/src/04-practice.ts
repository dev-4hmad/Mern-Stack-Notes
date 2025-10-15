function bouncingBall(h: number, bounce:number, window: number) {
  if (h <= 0 || bounce <= 0 || bounce >= 1 || window >= h) {
    return -1;
  }

  let count = 1; 

  while ((h = h * bounce) > window) {
    count += 2; 
  }

  return count;
}
console.log(bouncingBall(3, 0.66, 1.5));
console.log(bouncingBall(30, 0.75, 1.5)); 
