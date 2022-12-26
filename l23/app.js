// console.log('hi')

var getbox = document.querySelectorAll('.box');

for(var x=0; x<getbox.length; x++){
    getbox[x].addEventListener('mouseenter',function(){
        console.log(this);
        
        if(this.classList.contains('left')){
            this.classList.remove('left');
            this.classList.add('right');
        }else{
            this.classList.remove('right');
            this.classList.toggle('left');
        }
    })
}