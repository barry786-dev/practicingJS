const arr = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  f: 5
};

const func = (a,b,c,d,f) => {
  console.log(a,b,c,d,f);
}


const [a,b,c,d,f] = arr;
func(a,b,c,d,f);