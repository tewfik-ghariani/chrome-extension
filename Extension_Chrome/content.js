
// exemple id_post 10153618368638869
// exemple id_page 184599864915751



/* var url="https://graph.facebook.com/v2.5/"+ id_page + "_" + id_post + "/comments?access_token=1111807272202643%7Cch4YwW19DBYQd80NV0G4sJQbh5M"
*/

/*
var first_comment=document.getElementsByClassName("UFICommentBody")[0].innerHTML.split('<span>')[1].split('</span>')[0];
//console.log(first_comment);
*/



//------------------------------------->fonction pour changer les couleur de tous les commentaires en rouge
function colorify (){
var comments=document.getElementsByClassName("UFICommentBody");
var longueur=comments.length;
for (i=0;i< longueur;i++){
document.getElementsByClassName("UFICommentBody")[i].style.color="red";
}
}




//------------------------------------->fonction pour colorier les commentaires selon leur degré 

function color (i,pol){
i = i-1;
if (pol != "fail" ) {

var comment= document.getElementsByClassName("UFICommentBody")[i];
var actor = document.getElementsByClassName("UFICommentActorName")[i];

if (pol == 1 )
{
comment.style.color = "#CC00FF" ;

actor.innerHTML +=   ' <span class="emoticon_text"></span><span title="<3" class="emoticon emoticon_heart"></span> { Great } ' ;
//console.log("blue");
//console.log(comment);
//console.log("____________");
 }

else if ( pol < 0) {
comment.style.color = "red";

actor.innerHTML += ' <span class="emoticon_text"></span><span title=":\'(" class="emoticon emoticon_cry"></span> { Bad } ' ;

//console.log(comment);
//console.log("____________");

}
else if (pol == 0) {
comment.style.color = "grey";
actor.innerHTML += ' <span class="emoticon_text"></span><span title=":p" class="emoticon emoticon_tongue"></span>  { Neutre } ' ;
//console.log(comment);
//console.log("____________");
} 
else if (pol > 0.5 && pol < 1)
{
actor.innerHTML+=' <span class="emoticon_text"></span><span title=":D" class="emoticon emoticon_grin"></span> { Nice } ' ;

//console.log(comment);
//console.log("____________");
comment.style.color = "#66CC00" ; 
}
else if (pol> 1)
{
actor.innerHTML+=' <span class="emoticon_text"></span><span title=":D" class="emoticon emoticon_like"></span> { Super } ' ;

//console.log(comment);
//console.log("____________");
comment.style.color = "#33FF33" ; 
}
else 
{
actor.innerHTML += ' <span class="emoticon_text"></span><span title=":)" class="emoticon emoticon_smile"></span> { Amazing } ';
//console.log(comment);
//console.log("____________");
comment.style.color = "#00FF33" ; 
}

}

}




//-------------------------------------> fonction scrapping
function scrapping(){
var comments = document.getElementsByClassName("UFICommentBody");
var nbre_comments= comments.length;
 var comments_json = [];
//émettre les commentaire dans une variable json
for (i=0;i< nbre_comments; i++){
var contenu_comment=comments[i].innerHTML;


//vérifier que le comm n'est pas une image
if (contenu_comment.indexOf('span')>-1)
{
un_commentaire= contenu_comment.split('<span>')[1];
lIndex = un_commentaire.lastIndexOf("</span>");
un_commentaire= un_commentaire.substring(0,lIndex);



//emoticon
comments_json[i] =  un_commentaire ;
}

}
//alert('en cours');
return comments_json;
console.log(comments_json);
}
//-------------------------------------->



//------------------------------------------Fonction pour enlever les emoticons---------
function disable_emoticon(comment)
{




return
}






/*chrome.runtime.onMessage.addListener(function(background_request,sender,sendResponse){
if (background_request=='start'){
alert('la7dha');
var comments = document.getElementsByClassName("UFICommentBody");
var nbre_comments= comments.length;
 var comments_json = [];




//émettre les commentaires dans une variable json
for (i=0;i< nbre_comments; i++){

var contenu_comment=comments[i].innerHTML;
//vérifier que le comm n'est pas une image
if (contenu_comment.indexOf('span')>-1)
{
un_commentaire= contenu_comment.split('<span>')[1].split('</span>')[0];
comments_json[i] =  un_commentaire ;
}

}
alert('en cours');
console.log(comments_json);
sendResponse('loading');
}
});


*/






/* problème émoticone && problèmes 'Voir plus' */
/* choix du format json - Avantages */




//appuyer sur une touche pour activer la fonction de colorisation
document.addEventListener('keypress', colorify );


//more comments
if ((document.getElementsByClassName("UFIPagerLink").length)>0){
var more=document.getElementsByClassName("UFIPagerLink")[0];
more.addEventListener("click",colorify);
}


//---------------------__________2éme méthode___________-----------------(port)


var port= chrome.runtime.connect({name: "test_port"});


port.postMessage('Extract');
port.onMessage.addListener(function(msg) {


if (msg=='start'){


comments_json = scrapping();
//console.log(comments_json);





d={ content : comments_json, alarme : 'loading'};

port.postMessage(d);

}

else if (msg.alarme =='analyzed')
	{

	console.log("Roger That");
  
	i=1;
	phrase = msg.content[i];
	var score=0;
	while (typeof (phrase) != 'undefined' )

{	
		
		console.log(phrase);
		//alert(typeof(phrase));
		if (phrase!='fail')
		{score = score + parseFloat(phrase);}
		color( i, phrase );	
		i++;		
   		phrase = msg.content[i];
		
		
}

alert ("Done!");
alert(" Average sentiment polarity : " + score / i);
	}


});






