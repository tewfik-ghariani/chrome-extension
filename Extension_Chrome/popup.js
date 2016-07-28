

var button = document.getElementById("btn");


button.addEventListener("click", function(){

chrome.runtime.sendMessage('tawa',function(Response){

if (Response=='behi') 
{

document.getElementById("demo").innerHTML= "Go To Post page";
button.parentNode.removeChild(button);
document.getElementById("first").style.color="red";
document.getElementById("first").innerHTML= "Good Job!";

alert(" You can analyze any Facebook post/video/photo's comments");


}



});
});



 
