// Init 
let getcurmonth = document.getElementById('curmonth');
let getcuryear = document.getElementById('curyear');
var getcaldays = document.getElementById('caldays');
var getuimonths = document.getElementById('months');
var getuiyears = document.getElementById('years');
var getyearbtn = document.querySelector('.year-btn');


var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var startyear = 2010;
var endyear = 2030;

var month,year;

window.addEventListener('load',function(){
    // console.log('hi');
    var svday = new Date();
    month = svday.getMonth();
    year = svday.getFullYear();
    // console.log(svday); //Mon Feb 20 2023 7:24:26 GMT+0630 (Myanmar Time)
    // console.log(month); //1
    // console.log(year);  //2023

    getcurmonth = textContent = months[month];
    getcuryear.innerText = year;

    initmonths();
    inityears();
    initdays();
});

function initmonths(){
    getuimonths.innerHTML = '';

    console.log('hay i am working');

    for(var x=0; x < months.length ; x++){
        // <div class='dropdown-item'>Jan</div>
        var newdiv = document.createElement('div');
        newdiv.textContent = months[x];
        newdiv.classList.add('dropdown-item');

        // console.log(newdiv);

        newdiv.onclick = (
            function (){
                console.log('hi');

                return function(){
                    initdays();
                }
            }
        )

        getuimonths.appendChild(newdiv);

        

    }

}

function inityears(){
    for(var x = startyear; x <= endyear ; x++){
        // console.log(x);
        // <div class='dropdown-item'>2000</div>

        var newdiv = document.createElement('div');
        newdiv.textContent = x;
        newdiv.className = 'dropdown-item';

        // console.log(newdiv);
        getuiyears.appendChild(newdiv);
    }
}

function initdays(){
    getcaldays.innerHTML = '';


    var tmpdays = new Date(year,month,0);
    // console.log(tmpdays);//Tue Jan 31 2023 00:00:00 GMT+0630 (Myanmar Time)
    var getalldays = alldays(year,month);
    // console.log(tmpendday);
    var getweekday = tmpdays.getDay();
    // console.log(getweekday);// 2

    //<div id="" class="day">1</div>

    // get curry space for previous days
    for(var i = 0; i <= getweekday; i++){
        console.log(i);
        var newdiv = document.createElement('div');
        newdiv.classList = 'day blank';
        console.log(newdiv);
        getcaldays.appendChild(newdiv);
    }


    for(var x = 0; x < getalldays; x++){

        var newdiv = document.createElement('div');
        newdiv.textContent = x;
        newdiv.classList.add('day');

        // console.log(newdiv);

        getcaldays.appendChild(newdiv);

    };

}

function alldays(year,month){
    // console.log(year,month);
    console.log(new Date());
    
    // console.log(new Date(2023,1,10)); //Fri Feb 10 2023 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023,1,0)); //Tue Jan 31 2023 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023,0,0)); //Sat Dec 31 2022 00:00:00 GMT+0630 (Myanmar Time)
    // console.log(new Date(2023,5,0)); //Wed May 31 2023 00:00:00 GMT+0630 (Myanmar Time)
    console.log(new Date(2023,1,30)); //Thu Mar 02 2023 00:00:00 GMT+0630 (Myanmar Time)
    
    var curalldays = new Date(year,month+1,0);
    // console.log(curalldays);
    curalldays = curalldays.getDate();
    console.log(curalldays);

    return curalldays;
}

getyearbtn.addEventListener('click',function(){
    if(this.lastElementChild.classList.contains('show')){
        this.lastElementChild.classList.remove('show');
    }else{
        this.lastElementChild.classList.add('show');
        
    }
});


// 20CL