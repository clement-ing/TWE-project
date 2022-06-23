var current_div = null;

function init(){
    current_div = document.getElementById('resume');
    console.log('init')
}

function affiche(idDiv){
    var div = document.getElementById(idDiv);
    current_div.style.display = "none";
    div.style.display = "block";
    current_div=div;
}