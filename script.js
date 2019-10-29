'use strict';

let money;
let start = function() {
	do{
		money = prompt('Ваш месячный доход?');
	} while(isNaN(money) || money === '' || money === null);
	money = Number(money);
}
start();


let appData = {
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	income: {},
	expenses: {},
	addIncome: [],
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 50000,
	period: 0,

	dataType:function (n){
		while (isNaN(n) || n === '' || n === null){
			n = prompt('Вы ввели не верное значение. Повторите попытку.');
		}
		return Number(n);
	},

	getExpensesMonth: function() {
		for (let keys in appData.expenses){
			appData.expensesMonth += appData.expenses[keys];
		}
	},

	getBudget:function() { 
		 appData.budgetMonth = appData.budget - appData.expensesMonth;
		 appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},

	getTargetMonth:function() { 
		if (appData.budgetMonth <= 0){
			console.log ('Цель не будет достигнута');
		} else{
			appData.period = Math.round(appData.mission / appData.budgetMonth);
			console.log ('Сумма в размере ' + appData.mission + ' будет собрана через ' + appData.period + ' месяцев.');
		}	
	},

	getStatusIncome:function () {
		if(0 <= appData.budgetDay && appData.budgetDay < 300){
			return 'Низкий уровень дохода';
		} else if (300 <= appData.budgetDay && appData.budgetDay < 800) {
			return 'Средний уровень дохода';
		} else if (800 <= appData.budgetDay) {
			return 'Высокий уровень дохода';
		} else {
			return 'Что-то пошло не так';
		}
	},
	asking:function(){

		if (confirm('Есть ли у вас дополнительный источник заработка')){
			let itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Фриланс');
			let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
			appData.cashIncome = appData.dataType(cashIncome);
			appData.income[itemIncome] = cashIncome;
		}
		
		
			
			//Приведение к одному виду, если писалось с запятыми и пробелами и с запятыми без пробелов.
		function transformArr(expence){
			let arr = expence.split(', ');
			let res = [];
			for (let item of arr){
				res.push(item.split(','));
			}
			return res.reduce((acc, item) => acc.concat(item));
		}

			// Ищем цифры в массиве. Посимвольно
		function searchNum(array) {
			let i = 0;
			for ( let item of array){
				let oneAddition = item.split('');
				let check = oneAddition.some((item) => item == Number(item) && item !== ' ');
				check ? i += 1 : i;
			}
			return i;
		}

		let addExpenses = prompt('Перечислите возможные расходы');
			while (addExpenses === null){
				addExpenses = prompt('Введите названия возможных расходов');
			};
		addExpenses = transformArr(addExpenses);
		while (searchNum(addExpenses) > 0){
			addExpenses = prompt('В названии статьи расходов есть цифры, повторите ввод.');
			addExpenses = transformArr(addExpenses);
		};


		appData.addExpenses = addExpenses;
		

		let answerCost1;
		let answerCost2;
		for (let i = 0; i < 2; i++){
			if (i == 0){
				let questionCost1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Комунальные платежи');
				answerCost1 = prompt('Во сколько это обойдется?');
				answerCost1 = appData.dataType(answerCost1);
				appData.expenses[questionCost1] = answerCost1;
			}
			if (i == 1){
				let questionCost2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Питание');
				answerCost2 = prompt('Во сколько это обойдется?');
				answerCost2 = appData.dataType(answerCost2);
				appData.expenses[questionCost2] = answerCost2;
			}
		}
		
	},
	getInfoDeposit:function(){
		appData.deposit = confirm('Есть ли у вас депозит в банке');
		if (appData.deposit){
			appData.percentDeposit = prompt('Какой у вас годовой процент', 10);
			appData.dataType(appData.percentDeposit);
			appData.moneyDeposit = prompt('Какая сумма заложена', 10000);
			appData.dataType(appData.moneyDeposit);
		}
	},
	calcSavedMoney: function(){
		return appData.budgetMonth*appData.period;
	}
}


appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log('Ваши расходы за месяц: ' + appData.expensesMonth);
appData.getTargetMonth();
console.log (appData.getStatusIncome());
console.log('Наша программа включает в себя данные:')
for (let key in appData){
	console.log('Ключ: ' + key, 'Значение: ' + appData[key]);
}
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
let messageExpenses = '';

for (let i = 0; i < appData.addExpenses.length; i++){
	appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1).toLowerCase();
	
	
	if (i === appData.addExpenses.length - 1){
		messageExpenses += appData.addExpenses[i];
	}else{
		messageExpenses += appData.addExpenses[i] + ', ';
	}
}

console.log('Ваши дополнительные расходы: ' + messageExpenses);