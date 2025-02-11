function delayFn(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function delayGreet(name) {
  await delayFn(2000);
  console.log(name);
}

delayGreet('chan');

async function division(num1, num2) {
  try {
    if (num2 === 0) {
      throw new Error('Cannot divide by zero');
    }
    return num1 / num2;
  } catch (error) {
    console.error('error', error);
    return null;
  }
}

async function mainFn() {
  console.log(await division(10, 5));
  console.log(await division(10, 0));
}

mainFn();
