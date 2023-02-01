// Get UI
const balance = document.getElementById('balance');
const moneydeb = document.getElementById('money-deb');
const moneycrd = document.getElementById('money-crd');

const getform = document.getElementById('form')
const gettranstatuses = document.querySelectorAll('.form-check-input');
const getamount = document.getElementById('amount');
const getdate = document.getElementById('date');
const getremark = document.getElementById('remark');

const openbtn = document.getElementById('open-btn');
const gethisbox = document.querySelector('.history-box');
const getlistgroup = document.getElementById('list-group');


const dummydatas = [
	{id:1,transtauts:'+',remark:'Petty Cash',amount:1000,date:'2023-01-20'},
	{id:2,transtauts:'-',remark:'Pen',amount:-20,date:'2023-01-21'},
	{id:3,transtauts:'+',remark:'Other Income',amount:300,date:'2023-01-25'},
	{id:4,transtauts:'-',remark:'Book',amount:-10,date:'2023-01-25'},
	{id:5,transtauts:'+',remark:'Water',amount:-150,date:'2023-01-25'},
	{id:6,transtauts:'-',remark:'Teamix',amount:1000,date:'2023-01-25'}
];

// console.log(dummydatas);

const getlsdatas = JSON.parse(localStorage.getItem('transactions'));
let gethistories = localStorage.getItem('transactions') !== null ? getlsdatas : [];


// Initial App 
function init(){
	getlistgroup.innerHTML = '';

	// Method 1
	// dummydatas.forEach(function(dummydata){
	// 	// console.log(dummydata);
	// 	addtoui(dummydata);
	// });

	// Method 2
	// dummydatas.forEach(dummydata=>addtoui(dummydata));

	// Method 3  ****
	// dummydatas.forEach(addtoui);

	gethistories.forEach(addtoui);
	totalvalue();
}

init();


// Create li to ul
function addtoui(transaction){
	// console.log(transaction);
	// console.log(transaction.amount, typeof transaction.amount);

	const newli = document.createElement('li');

	newli.innerHTML = `${transaction.remark} <span>${transaction.transtauts}${Math.abs(transaction.amount)}</span><span>${transaction.date}</span><button type="button" class="delete-btn" onclick="removetransaction(${transaction.id})">&times;</button>`;

	newli.className = 'list-group-item';

	newli.classList.add(transaction.transtauts === "+" ? 'inc' : 'dec');

	// console.log(newli);

	getlistgroup.appendChild(newli);
}




var sign = "-";

gettranstatuses.forEach(function(gettranstatuse){
	gettranstatuse.addEventListener('change',function(){
	// console.log(this.value);

		if(this.value === "debit"){
			sign = "+";
		}else if(this.value === "credit"){
			sign = "-";
		}
	});
});



function newtransaction(e){
	// console.log('hay');
	// console.log(sign);

	if(isNaN(getamount.value) || getamount.value.trim() === '' || getdate.value.trim() === '' || getremark.value.trim() === ''){
		alert("Ohh!!! Some data are missing.");
	}else{
		const transaction = {
			id:generateidx(),
			transtauts:sign,
			amount:sign === "-" ? Number(-getamount.value) : Number(getamount.value),
			date:getdate.value,
			remark:getremark.value
		};

		// console.log(transaction);

		gethistories.push(transaction);

		addtoui(transaction);

		totalvalue();

		updatelocalstorage();

		getamount.value = '';
		getdate.value = '';
		getremark.value = '';

		getamount.focus();

	}

	e.preventDefault();
}


//Update Local Storage
function updatelocalstorage(){	
	localStorage.setItem('transactions',JSON.stringify(gethistories));
}

function generateidx(){
	return Math.floor(Math.random() * 100000);
}
// console.log(generateidx());

function totalvalue(){
	const amounts = gethistories.map(gethistory=>gethistory.amount);
	// console.log(amounts);

	// Method 1 
	const result = amounts.reduce(function(total,curvalue){
		total += curvalue;
		return total;
	},0).toFixed(2);

	// Method 2
	totalresult = amounts.reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
	// console.log(result);

	const debitresult = amounts.filter(amount=>amount > 0).reduce((total,curvalue)=>(total += curvalue),0).toFixed(2);
	
	const creditresult = (amounts.filter(amount=>amount < 0).reduce((total,curvalue)=>(total += curvalue),0)* -1).toFixed(2); 
	

	balance.innerText = `${totalresult}`;
	moneydeb.innerText = `${debitresult}`;
	moneycrd.innerText = `${creditresult}`

}

totalvalue();

function removetransaction(tranid){
	gethistories = gethistories.filter(gethistory => gethistory.id !== tranid);

	init();

	updatelocalstorage();
}



openbtn.addEventListener('click',function(){
	gethisbox.classList.toggle('show');
});

getform.addEventListener('submit',newtransaction);


































// var myarrs = [10,20,30,40,50,60,70,80,90,100];

// // Array.reduce(function(total,currentValue,currentIndex,array){}.initialValue);
// var result = myarrs.reduce(function(total,curvalue,curidx,arr){
// 	console.log('this is total =' ,total); //0 undefined // if we use q parameter 10 undefined 
// 	console.log('this is curvalue = ' ,curvalue); //10 to 100 by number // if we use 1 parameter 20 to 100 by number 
// 	console.log('this is cridx = ' , curidx); //0 to 9 index number //if we use 1 parameter 1 to 9 index number  
// 	console.log(arr); 

// 	total += curvalue;
// 	return total;
// },0);

// console.log(result);


// 25TR

// 1DB