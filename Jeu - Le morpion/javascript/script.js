//corps du script de l'exercice presentiel le morpion 

function creercalque(nom,largeur,hauteur,posix,posiy,couleur,paramsup,contenu,visibilite,zindex)
{
	//nom,couleur,contenu et paramsup sont des chaines de caractère; largeur,hauteur,posix,posiy,zindex sont des entiers
	//Action: crée un calque
	document.write("<div id="+nom+" style='position:absolute;height:"+hauteur+"px;width:"+largeur+"px;left:"+posix+"px;top:"+posiy+"px;background-color:"+couleur+";visibility:"+visibilite+";z-index:"+zindex+"' "+paramsup+">"+contenu+"</div>");
}

function couleurcalque(nom,couleur)
{
	//nom et couleur sont des chaînes
	//Action: modifie la couleur du calque
	document.getElementById(nom).style.backgroundColor=couleur;
}

function contenucalque(nom,contenu)
{
	//nom et contenu sont des chaînes
	//Action: modifie le contenu du calque
	document.getElementById(nom).innerHTML=contenu;	
}

function lire_contenucalque(nom)
{
	//nom est une chaîne
	//Action: retourne dans une chaîne le contenu du calque
	return document.getElementById(nom).innerHTML;
}

function visibilitecalque(nom,visi)
{
	//nom est une chaîne, visi est une chaîne acceptant 2 valeurs "hidden" ou "visible"
	//Action: masque ou affiche le calque
	document.getElementById(nom).style.visibility=visi;
}

function indiquervisibilite(nom)
{
	//nom est une chaîne
	//Action: retourne une variable qui vaut 1 si le calque est visible, 0 dans le cas contraire
	var visi=0;
	if(document.getElementById(nom).style.visibility=="visible")
	{
		visi=1;
	}
	return visi;
}

function lire_largeurfenetre()
{
	//Action: retourne la largeur de la fenetre en pixels
	//Attention le script qui emploie cette fonction doit être situé entre les balises <body> et </body>
	if(gecko>0){var LargeurFenetre=self.innerWidth}
	else{var LargeurFenetre=document.body.clientWidth}
	return LargeurFenetre;
}

function lire_hauteurfenetre()
{
	//Action: retourne la hauteur de la fenetre en pixels
	//Attention le script qui emploie cette fonction doit être situé entre les balises <body> et </body>	
	if(gecko>0){var HauteurFenetre=self.innerHeight}
	else{var HauteurFenetre=document.body.clientHeight}
	return HauteurFenetre;
}

function positioncalque_x(nom,distance)
{
	//la variable distance(entier) indique la distance du calque en pixel par rapport au bord gauche de votre fenêtre
	//nom est une chaîne
	//Action: replace le calque
	document.getElementById(nom).style.left=distance;
}

function positioncalque_y(nom,distance)
{
	//la variable distance(entier) indique la distance du calque en pixel par rapport au bord supérieur de votre fenêtre
	//nom est une chaîne
	//Action: replace le calque
	document.getElementById(nom).style.top=distance;
}

function lire_positioncalque_x(nom)
{
	//nom est une chaîne
	//Action : retourne un entier indiquant la position du calque par rapport au bord gauche de la fenetre
	var posicalquex=document.getElementById(nom).style.left;
	posicalquex=eval(posicalquex.substring(0,posicalquex.indexOf("px")));
	return posicalquex;
}

function lire_positioncalque_y(nom)
{
	//nom est une chaîne
	//Action : retourne un entier indiquant la position du calque par rapport au bord supérieur de la fenetre
	var posicalquey=document.getElementById(nom).style.top;
	posicalquey=eval(posicalquey.substring(0,posicalquey.indexOf("px")));
	return posicalquey;	
}

function largeurcalque(nom,largeur)
{
	//nom est une chaîne, largeur est un entier qui indique la largeur du calque en pixels
	//Action : modifie la largeur du calque

	document.getElementById(nom).width=largeur;	
}

function lire_largeurcalque(nom)
{
	//nom est une chaîne
	//Action : retourne la largeur du calque

	return document.getElementById(nom).width;
}

function hauteurcalque(nom,hauteur)
{
	//nom est une chaîne, hauteur est un entier qui indique la hauteur du calque en pixels
	//Action : modifie la hauteur du calque

	document.getElementById(nom).height=hauteur;	
}

function lire_hauteurcalque(nom)
{
	//nom est une chaîne
	//Action : retourne la hauteur du calque

	return document.getElementById(nom).height;
}

//initialisation à -1 pour que cette variable ne puisse désigner aucune touche à l'initialisation
toucheactive=-1;

if(gecko>0)
{
	//détecte le code d'une touche avec un navigateur disposant du moteur Gecko
	function touche_gecko(evnt){toucheactive=evnt.keyCode}
	document.onkeydown=touche_gecko;
}
else
{
	//détecte le code d'une touche avec Internet Explorer
	function touche_ie(){toucheactive=event.keyCode}
	document.onkeydown=touche_ie;
}


function clic(nom)
{
	coup++;	
	if(joueur1)
	{
		visibilitecalque(nom+"c","visible");
		jeu[nom.charAt(4)]=1;
		gagner();
		joueur1=0;
		joueur2=1;
		window.status="A vous "+document.form2.j2.value;
	}
	else
	{
		visibilitecalque(nom+"r","visible");		
		jeu[nom.charAt(4)]=2;
		gagner();
		joueur1=1;
		joueur2=0;
		window.status="A vous "+document.form1.j1.value;
	}
	
	if(j1_win)
	{
		endgame();
	}
	if(j2_win)
	{
		endgame();
	}
	if(nul)
	{
		endgame();
	}
}

function endgame()
{
	if(j1_win)
	{
		reponse=confirm("Felicitations !! :D "+document.form1.j1.value+" vous avez gagne.\nNouvelle partie ?");
		document.form1.resultj1.value++;
	}
	if(j2_win)
	{
		reponse=confirm("Felicitations !! :D "+document.form2.j2.value+" vous avez gagne.\nNouvelle partie ?");
		document.form2.resultj2.value++;		
	}
	if(nul)
	{
		reponse=confirm("Oups !! Match nul :(.\rNouvelle partie ?");
	}
	if(!reponse)
	{
		document.form1.resultj1.value=0;
		document.form2.resultj2.value=0;
		joueur1=1;
		joueur2=0;
	}	
	for(a=0;a<9;a++)
	{
		jeu[a]=0;
		visibilitecalque("case"+a+"c","hidden");		
		visibilitecalque("case"+a+"r","hidden");		
	}
	coup=0;
	nul=0;
	j1_win=0;
	j2_win=0;
}

function gagner()
{
	if(joueur1)
	{
		if(jeu[0]*jeu[1]*jeu[2]==1 || jeu[3]*jeu[4]*jeu[5]==1 || jeu[6]*jeu[7]*jeu[8]==1 || jeu[0]*jeu[3]*jeu[6]==1 || jeu[1]*jeu[4]*jeu[7]==1 || jeu[2]*jeu[5]*jeu[8]==1 || jeu[0]*jeu[4]*jeu[8]==1 || jeu[2]*jeu[4]*jeu[6]==1)
		{
			j1_win=1;
		}
	}
	else
	{
		if(jeu[0]*jeu[1]*jeu[2]==8 || jeu[3]*jeu[4]*jeu[5]==8 || jeu[6]*jeu[7]*jeu[8]==8 || jeu[0]*jeu[3]*jeu[6]==8 || jeu[1]*jeu[4]*jeu[7]==8 || jeu[2]*jeu[5]*jeu[8]==8 || jeu[0]*jeu[4]*jeu[8]==8 || jeu[2]*jeu[4]*jeu[6]==8)
		{
			j2_win=1;
		}
	}
	if(!j1_win && !j2_win && coup==9)
	{
		nul=1;
	}
}
function verif(formname)
{
	if(formname=="form1")
	{
		document.form1.j1.value=prompt("Quel est votre nom Joueur 1 ?",document.form1.j1.value);
		if(joueur1)
		{
			window.status="A vous "+document.form1.j1.value;
		}
	}
	if(formname=="form2")
	{
		document.form2.j2.value=prompt("Quel est votre nom Joueur 2 ?",document.form2.j2.value);
		if(joueur2)
		{
			window.status="A vous "+document.form2.j2.value;
		}
	}
}