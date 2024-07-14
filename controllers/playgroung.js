const countDown = () => {
  const digits = [
    12345678, 2345678, 345678, 45678, 5678, 678, 78, 8, 8, 78, 678, 5678, 45678
  ];
  let index = 0;
  const interval = setInterval(function () {
    console.log(digits[index++]);
    if (index == digits.length) {
      clearInterval(interval);
      second()
    }
  }, 2000);
};

function second(){
  index = 0;
  const num = [345678, 2345678, 12345678]
  const intV = setInterval(() => {
    console.log(num[index++])
    if(index === num.length){
      clearInterval(intV)
      thirdCount()
    }
  }, 1200);
}

function thirdCount(){
  const intval = setTimeout(() => {
    console.log("Peace out!!")
    clearInterval(thirdCount)
  }, 2000);
}
countDown();