
/* 10153618368638869

https://graph.facebook.com/v2.5/184599864915751_10153618368638869/comments?access_token=1111807272202643%7Cch4YwW19DBYQd80NV0G4sJQbh5M
*/

/*chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {

if (request == 'Go' ) {
*/



//function httpsend(theUrl,content)
 


//---------------------__________2éme méthode___________-----------------(port)
B=0;
chrome.runtime.onConnect.addListener(function(port) {
console.assert(port.name =='test_port');

port.onMessage.addListener(function(msg){
if ((msg=='Extract' && B==1) ) {

var answer=prompt('Would you like to start ? y/n');
			if (answer=='y' || answer=='Y') 		
				{
	
		port.postMessage('start');
				}
else { alert('As you like...');
B=0;

}

  			}
else if (msg.alarme=='loading')
{
alert("analysis in progress");

 //reception des commentaires

//envoi de la requête ici
console.log(msg.content);

req_ajax= $.ajax({
        type : "POST",
	crossDomain: true,
        url : "http://localhost:8005",
        data: JSON.stringify(msg.content),
        dataType: "json",
	
	
	
    });
    req_ajax.success(function(data1){ 
//data =  JSON.parse(data1);
//alert(data.msg);




an = { content : data1 , alarme : 'analyzed'};
//resultat du serveur
port.postMessage(an);
} );	


B=0;

}



});

});



chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
if (request=='tawa')
{
B=1;

sendResponse('behi');
}


});


/*
A=0;
//---------------------------------------re-runscript
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
        console.log('Page uses History API and we heard a pushSate/replaceState.');
        // do your thing
A=1; 

});
*/




