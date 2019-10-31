var nbTour = 0; // variable du nombre de tours, cette variable sert uniquement de repère avec la console...inutile dans le fonctionnement du jeu
var ia = Math.floor(Math.random() * 10 + 1); //choix aléatoire du chiffre à deviner
console.log('pour commencer, l\'ia a choisi le ' + ia); //vérif console
console.log("le nombre de tour est de : " + nbTour); //vérif console

var lancer = document.getElementById('lancer'); //création variabie lié au DOM
lancer.addEventListener('click',recup); //création d'un event au clic et qui lance la fonction recup()

var corp = document.getElementById('budy'); //création variable lié au DOM
var childr = corp.children //création variable pour avoir tout les "enfants" de "corp"( tout les enfants du body pour le code konami)

var tabres = []; //création d'un tableau pour insérer les essais du joueur
var tabproba = []; //création d'un tableau de probabilité
y = 1
while(y<=10){
    tabproba.push(y);
    y++
}
console.log("tableau tabproba : " + tabproba); //vérif console
var resultat = document.getElementById('result'); //création variable lié au DOM
var rejouer = document.getElementById('rejouer'); //création variable lié au DOM
rejouer.addEventListener('click',refresh); //création d'un event au clic et qui lance la fonction refresh()
rejouer.style.visibility = "hidden"; // on cache le bouton "rejouer" à defaut
var historik = document.getElementById('histo'); //création variable lié au DOM
historik.addEventListener('click',historique); //création d'un event au clic et qui lance la fonction historique()
var help = document.getElementById('cheat'); //création variable lié au DOM
help.addEventListener('click',astuce); //création d'un event au clic et qui lance la fonction astuce()

/* ------------------ FONCTIONS ---------------------- */

// fonction du bouton de soumission
function recup(){
    console.log("le joueur a choisi le chiffre "+joueur); //vérif console
    nbTour = nbTour + 1; //ajout d'un nombre de tour à chaque soumission du joueur
    console.log("nombre de tour est de " + nbTour); //vérif console
    tabres.push(joueur); //insertion de la soumission du joueur dans le tableau tabres
    lancer.disabled = true; //le bouton de soumission est désactivé après soumission
    help.disabled = false; //le bouton d'aide est activé après soumission
    console.log(joueur); //vérif console
    // CONDITION
    if(joueur > ia){ 
            resultat.innerHTML = "Ce chiffre est trop grand !"
            x = joueur - 1;
            while(x<tabproba.length){
                tabproba[x] = false;
                x++
            }
    // si le joueur a choisi un chiffre plus grand que l'ia alors on va transformer les valeurs du tableau proba en "false" les une après les autre avec une boucle while. Celle ci commencera un chiffre en dessous de celui choisi par le joueur car on va chercher l'index du tableau proba, puis il va aller jusqu'à la fin du tableau (chiffre 10 à l'index 9)
    }else if(joueur < ia){
            resultat.innerHTML = "Ce chiffre est trop petit !"
            x = 0;
            while(x<joueur){
                tabproba[x] = false;
                x++
            }
    // même chose si le joueur choisi un chiffre trop petit... On transformera à partir de l'index 0 du tableau jusqu'au chiffre soumis par le joueur, ici pas besoin de chercher l'index puisqu'ici on veut "false" que un nombre précis d'index
    }else if(joueur == ia && nbTour == 1){
        // si le joueur trouve le chiffre du premier coup !!
        resultat.innerHTML = "Bravo ! Vous avez trouvé le bon nombre du premier coup !!" // insertion d'un texte dans le DOM
        lancer.style.visibility = "hidden"; // On cache le bouton de soumission 
        rejouer.style.visibility = "visible"; // on fait apparaitre le bouton pour rejouer 
        help.disabled = true; // on desactive le bouton d'aide
        up.disabled = true; //on desactive les boutons de choix de chiffre
        down.disabled = true; //on desactive les boutons de choix de chiffre
    }else{
            // si le chiffre est ni trop grand et ni trop petit... Alors c'est gagné ! et ce qu'il s'y passe :
            resultat.innerHTML = "Bravo ! Vous avez trouvé le bon nombre en " + nbTour + " essais !" // insertion d'un texte dans le DOM
            lancer.style.visibility = "hidden"; // On cache le bouton de soumission 
            rejouer.style.visibility = "visible"; // on fait apparaitre le bouton pour rejouer   
            help.disabled = true; // on desactive le bouton d'aide
            up.disabled = true; //on desactive les boutons de choix de chiffre
            down.disabled = true; //on desactive les boutons de choix de chiffre
    }
    return joueur;
}

//fonction du bouton pour rejouer
function refresh(){
    ia = Math.floor(Math.random() * 6 + 1); //on réinitialise un nouveau chiffre à trouver
    nbTour = 0; // on réinitialise le nombre de tour
    console.log('j\'ai' + nbTour + 'tours'); //vérif console
    resultat.innerHTML = ""; //on efface la partie résultat
    lancer.style.visibility = "visible"; //on fait apparaitre le bouton de soumission
    rejouer.style.visibility = "hidden"; //on cache le bouton pour rejouer
    console.log('ia a choisi le ' + ia); //vérif console
    list.innerHTML = ""; //on efface la partie historique
    tabres = []; //on vide le tableau tabres
    tabproba = [];
    y = 1
    while(y<=10){
        tabproba.push(y);
        y++
    } //on reinitialise le tableau de probabilité
    lancer.disabled = false; //on active le bouton de soumission
    num.innerHTML = min; //on remet à "1" le chiffre qui apparait a défaut 
    joueur = min; //on réinitialise le choix du joueur à défaut à "1"
    document.getElementById('help').innerHTML = ""; // on efface la partie aide
    help.disabled = false; //on réactive le bouton d'aide
    up.disabled = false;
    down.disabled = false;
}

//fonction du bouton d'aide
function astuce(){
    console.log(tabproba); //vérif console
    var prob = tabproba.filter(element => typeof element === "number").length
    document.getElementById('help').innerHTML += "Vous avez 1 chance sur " + prob + " de trouver le bon chiffre <br>" // création d'une variable qui va filtrer le tableau tabproba, elle va chercherles éléments de type "number" et déterminer la longueur du tableau qu'avec ces éléments, et donc exclure tout les "false"
    help.disabled = true; //on desactive le bouton d'aide une fois celui ci utilisé
}

/* ----------------Selection du chiffre -------------------- */

var num = document.getElementById('number'); //création variable lié au DOM
var up = document.getElementById('up'); //création variable lié au DOM
var down = document.getElementById('down'); //création variable lié au DOM
var list = document.getElementById('historik'); //création variable lié au DOM

up.addEventListener('click',ajout); //création d'un event au clic et qui lance la fonction ajout()
down.addEventListener('click',enlev); //création d'un event au clic et qui lance la fonction enlev()

var min = 1; // création variable du chois minimum possible
var max = 10; //création variable du choix maximum
var joueurValid = joueur; //création variable pour déterminer une égalité ou une différence
num.innerHTML = min; //insertion du chiffre "min" dans le DOM
var joueur = min;//création variable choix du joueur

//fonction d'augmentation
function ajout(){
    if(joueur < max){
        joueur++
    }
    //condition de la fonction si le chiffre du joueur est inférieur à 10 alors celle ci ajoute 1
    resultat.innerHTML = "";//on efface la partie résultat à chaque nouvelle selection
    lancer.disabled = false;//le bouton de soumission redevien actif après une nouvelle selection
    return valor(); //la valeur de la fonction est retourné à la fonction valor()
}

//fonction de diminution
function enlev(){
    if(joueur > min){
        joueur--;
    }
    //condition de la fonction si le chiffre du joueur est supérieur à 1 alors celle ci enleve 1
    resultat.innerHTML = "";
    lancer.disabled = false;
    return valor();
}
//fonction de la valeur
function valor(){
    num.innerHTML = joueur; // insertion de la valeur dans le DOM
    if(joueur !== joueurValid){
        historik.disabled = false;
    }
    //condition pour savoir si le joueur à bien choisi un chiffre différent au choix d'avant, si oui, le bouton historique est activé (pour éviter spam de bouton)
    return joueur; // on retourne la valeur de la variable joueur
}

//fonction sur la partie historique
function historique(){
    list.innerHTML = "";//A chaque clique on remet a 0 l'historique pour éviter qu'il se repete a chaque clique
    var index = 0; //création variable de repère
    while(index < tabres.length){
        list.innerHTML += "Au tour n° " + (index+1) + " vous avez choisis le chiffre " +tabres[index] +"<br>"; // insertion d'un texte dans le DOM
        index++
    } 
    //création d'une boucle while. Tant que index est inférieur à la longueur du tableau tabres il va inserer le texte. Ici la variable index va nous servir de repère sur le nombre de tour et d'index du tableau tabres
    joueurValid = joueur; //c'est ici qu'on determine que la variable joueurValid aura la même valeur que la variable joueur
    historik.disabled = true; //le bouton historique est désactivé suite a son utilisation
}


/* ---------------- Code Konami -------------------------- */

//création d'une variable avec plusieurs objet. ici il s'agit des code ASCII des touche du clavier, auquel on leur donne une valeur
var touche = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

//création d'un tableau qui va définir la suite de touche à utiliser
var konami = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

var cheat = 0; // création variable de repère

//création d'un évent qui va lancer une fonction à la pression des touche du clavier
document.addEventListener('keydown', function(e){
    var link = touche[e.keyCode]; // ici l'argument (e) de la fonction est changer avec la valeur de l'objet (le KeyCode) du tableau touche et stocké dans la variable link. Par exemple, si il appuis surla touche "a" on va récuperer son KeyCode, 65, et le stocké ds la variable
    var valide = konami[cheat];//création variable de validité du code par rapport à son index, au debut, valide est égal à l'index 0 du tableau konami, donc égal à 'up'
    if(link == valide){
        cheat++;
    }
    else{
        cheat = 0;
    }
    if(cheat == konami.length){
        destroy();
        cheat = 0;
    }
    //condition si le keycode entré est égal à valide, on ajoute +1 à cheat et donc la validité suivante sera l'index suivant du tableau konami. Sinon on remet l'index cheat à 0. lorsque l'index cheat est égal à la longueur du tableau konami et donc de 10, alors la fonction destroy() est activé et on remet l'index du cheat à 0
});

//function de destruction du jeu suite au code konami
function destroy(){
    var fin = (childr.length - 1)//création variable
    for (let i = 0; i < childr.length; i++) {
        setTimeout(function (){
            childr[i].style.visibility = "hidden";
        }, 500 * i);
    }
    setTimeout(function() {
        document.body.style.backgroundColor = "black";
        rejouer.style.visibility = "hidden";
        lancer.style.visibility = "hidden"
    }, 500 * fin)
}
//cette fonction va effacer les élément du DOM les un après les autres à l'aide la boucle for toute les demi seconde avec le setTimout. Le deuxième setTimeout va définir la fin de la suppression des élément est va conclure avec un écran noir et retirer le bouton rejouer