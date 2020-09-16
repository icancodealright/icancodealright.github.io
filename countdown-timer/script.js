const newEve='1 JAN 2021';


 function insertTextIntoElementBy(id,text){
     document.getElementById(id).innerHTML=text;
 }

 function format(time){
     if(time<10){
         return '0'+time;
     }else{
         return time;
     }
 }
function evaluateDurationRemaining(){
    const currentDate=new Date();
    const difference=Math.floor((new Date(newEve)-currentDate)/1000);
    const second=format(Math.trunc(difference%60));
    const minutes=format(Math.trunc((difference/60)%60));
    const hours=format(Math.trunc((difference/3600)%24));
    const days=format(Math.trunc(difference/(60*60*24)));
    insertTextIntoElementBy('days',days);
    insertTextIntoElementBy('hours',hours);
    insertTextIntoElementBy('secs',second);
    insertTextIntoElementBy('mins',minutes);
}

evaluateDurationRemaining();
setInterval(evaluateDurationRemaining,1000);