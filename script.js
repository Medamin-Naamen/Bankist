'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displaymovements = function (movements) {
  containerMovements.innerHTML = '';
  //.textcontent = 0

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);
//console.log(accounts);

const calCurrentbalence = acc => {
  acc.balance = acc.movements.reduce((accu, mov) => accu + mov);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (accu) {
  const incomes = accu.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = accu.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = accu.movements
    .filter(mov => mov > 0)
    .map(desposit => (desposit * accu.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const updateUI = function () {
  displaymovements(currentAccount.movements);
  calCurrentbalence(currentAccount);
  calcDisplaySummary(currentAccount);
};

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    // display account
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    //update
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputLoginPin.blur();
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //ADD movements
    currentAccount.movements.push(amount);
    //Update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(currentAccount);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log(`${currentAccount.username} 's account is deleted`);

    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //delete account
    accounts.splice(index, 1);
    // Hide UI
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('welcome');
  displaymovements(currentAccount.movements);
  const movsort = currentAccount.movements.sort((a, b) => a - b);
  movsort.forEach(
    element =>
      (document.querySelectorAll('.movements__value').textContent = element)
  );
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
for (const movement of movements) {
  if (movement > 0) {
    console.log(` You deposited ${movement}`)
  } else { console.log(`You withdrew ${Math.abs(movement)}`) }
}
console.log('-----ForEach--------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(` You deposited ${movement}`)
  } else { console.log(`You withdrew ${Math.abs(movement)}`) }
})
// 0: function(200)
// 1: function(450)
// 2: function(400)
/////////////////////////////////////////////////
/*
let array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.slice(2));
console.log(array.slice(2, 4));
console.log(array.slice(-2));
console.log(array.slice(1, -2));
//console.log(array.splice(2));
array.splice(-1);
console.log(array);

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currencies.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});
//set
const currenciesUnique = new Set([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log(currenciesUnique);

const juliadata = [3, 5, 2, 12, 7];
const katedata = [4, 1, 15, 8, 3];
const Julia_data = [9, 16, 6, 8, 3];
const Kate_data = [10, 5, 6, 1, 4];

const checkDogs = (juliadata, katedata) => {
  const juliadatacorrected = juliadata.slice();
  juliadatacorrected.splice(-2)
  juliadatacorrected.splice(0, 1);
  console.log(juliadata);
  console.log(juliadatacorrected);
  const dogsdata = juliadatacorrected.concat(katedata);
  console.log(dogsdata);
  dogsdata.forEach(function (value, i) {
    let age = value >= 3 ? 'adult' : 'puppy';
    console.log(`dog number ${i + 1} is  ${age}, and is ${value} years old`);
  });
}
checkDogs(juliadata, katedata);
checkDogs(Julia_data, Kate_data);

const eurToUsd = 1.1;
const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});
console.log(movements);
console.log(movementsUSD);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);
const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);


const balance = movements.reduce((acc, cur, i) => {
  console.log(`iteration ${i} : ${acc}   ${cur}`);
  return acc + cur;
}, 0);
console.log(balance);

const TESTDATA1 = [5, 2, 4, 1, 15, 8, 3];
const TESTDATA2 = [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = function (data) {
  const humanAge = data.map(age => age <= 2 ? 2 * age : age * 4 + 16);
  console.log(humanAge);
  const exclude = humanAge.filter(age => age >= 18);
  console.log(exclude);
  const avg = exclude.reduce((vc, vi) => vc + vi, 0) / exclude.length;
  console.log(avg);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

const calcAverageHumanAge = function (data) {
  const humanAge = data.map(age => age <= 2 ? 2 * age : age * 4 + 16)
    .filter(age => age >= 18)
    .reduce((vc, vi, i, arr) => vc + vi / arr.length, 0);
  console.log(humanAge);
}
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);
x.fill(1, 3, 7);
x.fill(23, 0, 3);
console.log(x);
const y = Array.from({ length: 7 }, (_, i) => i);
console.log(y); 
const bank = accounts.flatMap(acc => acc.movements);
console.log(bank);

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
dogs.forEach(element => element.recFood = Math.trunc(element.weight ** 0.75 * 28));
console.log(dogs);
const sarahdog = dogs.find(el => el.owners.includes('Sarah'));
console.log(sarahdog);
const sarahdogeat = sarahdog.curFood > sarahdog.recFood ? 'too little' : 'too much';
console.log(` sahar's dog eat ${sarahdogeat}`);
let ownersEatToomuch = [];
let ownersEatTooLitlle = [];
dogs.forEach(el => {
  (el.curFood > el.recFood) ? ownersEatToomuch.push(el.owners) : ownersEatTooLitlle.push(el.owners);
});

console.log(ownersEatTooLitlle.flat());
console.log(ownersEatToomuch.flat());
//4.
console.log(`${ownersEatToomuch.join(' and ')}'s dogs eat too much !`);
console.log(`${ownersEatTooLitlle.join(' and ')}'s dogs eat too Little !`);
//5.
const exactly = dogs.some(el => el.curFood === el.recFood);
console.log(exactly);
//6.
const okayy = dogs.some(el => el.curFood >= (el.recFood * 0.9) && el.curFood <= (el.recFood * 1.1));
console.log(okayy);
//7.
const okayamount = dogs.find(el => el.curFood >= (el.recFood * 0.9) && el.curFood <= (el.recFood * 1.1));
console.log(okayamount.owners.flat());
//8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);*/
