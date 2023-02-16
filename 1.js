const time = (timer) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}
const ajax1 = () => time(1000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => time(3000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => time(5000).then(() => {
  console.log(3);
  return 3
})

function mergePromise(arr) {
  let temp = [];
  return arr.reduce((p, fn, i) => {
    return p.then(_ => {
      return  fn();
    }).then(res=>{
      temp[i] = result;
    })
  }, Promise.resolve()).then(_ => temp)
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});


Promise.resolve().then(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 100)
  }).then(() => {
    console.log(2);
    return 2
  })
})