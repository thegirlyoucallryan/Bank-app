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

const credentialModal = document.querySelector('.login-container')

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const openModal = (e) => {
  credentialModal.style.opacity = 100;
  credentialModal.style.display = "unset";
  

};

const closeModal = (e) => {
  
  credentialModal.style.display = "none";

};

inputLoginUsername.addEventListener('mouseover', openModal);

inputTransferTo.addEventListener('click', openModal);

inputTransferTo.addEventListener('blur', closeModal)




const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b)=> a - b) : movements;


  movs.forEach(function (mov, i) {

    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">$${mov}</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html)

  })

};


const calcPrintBalance = (acc) => {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  labelBalance.textContent = `$${balance.toFixed(2)} USD`
};





const createUserName = (acc) => {
  acc.forEach(acc => {
    acc.userName = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
};


  const calcDepositTotal = acc => {
    const deposit = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
    labelSumIn.innerHTML = `$${deposit} USD`;
  };
  

  const calcWithdrawTotal = acc => {
    const withdrawal = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
    labelSumOut.innerHTML = `$${Math.abs(withdrawal)} USD`;
  };
 

  const calcInterest = acc => {
 
    const rate = acc.interestRate/100;
    const deposit =acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov * rate , 0);
    labelSumInterest.innerHTML = `$${deposit}`
  };

 



createUserName(accounts);


const updateUI = (acc) => {
  displayMovements(acc.movements);
  calcPrintBalance(acc);
  calcDepositTotal(acc);
  calcWithdrawTotal(acc);
  
}

let currentAcc;

const now = new Date();
const day = now.getDate();
const month = now.getMonth() + 1;
const year = now.getFullYear();
labelDate.textContent = `${month}/${day}/${year}`

btnLogin.addEventListener('click', function(e){
  e.preventDefault();

  currentAcc = accounts.find(acc => acc.userName === inputLoginUsername.value);
 
  if(currentAcc?.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent = `Welcome back, ${
      currentAcc.owner.split(' ')[0]
    }`;
    credentialModal.style.display = "none";
    containerApp.style.opacity = 100;
    inputLoginUsername.value = ' ';
    inputLoginPin.value = ' ';
    inputLoginPin.blur();
    updateUI(currentAcc);
  
    calcInterest(currentAcc);
  }


});

const moneyTransfer = (e) => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiver = accounts.find(acc => acc.userName === inputTransferTo.value);

  inputTransferTo.value = inputTransferAmount.value = '';

  if(amount > 0 && receiver && currentAcc.balance >= amount && receiver?.userName !== currentAcc.userName){
    currentAcc.movements.push(-amount);
    receiver.movements.push(amount);
    updateUI(currentAcc)
   


  }
}

btnTransfer.addEventListener('click', moneyTransfer);

const deleteHandler = (e) => {
  e.preventDefault();

  


  if(currentAcc.userName === inputCloseUsername.value && currentAcc.pin === +inputClosePin.value){
    const index = accounts.findIndex(acc => acc.userName === currentAcc.userName)
    accounts.splice(index, 1)
   
   
    containerApp.style.opacity = 0;

  }
  inputClosePin.value = inputCloseUsername.value = '';
  labelWelcome.textContent = 'Log in to get started';
}

btnClose.addEventListener('click', deleteHandler)

let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAcc.movements, !sorted);
  sorted = !sorted;

})



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
