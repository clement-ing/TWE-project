$(document).ready(function(){

    var dialog = $("#popupConnexion").dialog({
        autoOpen: false,
        width: 600,
        modal: true,
        draggable:false,
        dialogClass: "no-close",
        close: function() {
            console.log("click close");
        }
    });
    
    $("#btnConnexion").click(function(){
        console.log("click login");
        dialog.dialog("open" ); 
    });

    $("#btnRejoindre").click(function(){
        console.log("click rejoindre");
        dialog.dialog("open" ); 
    });

    $(".croix").click(function(){
        console.log("click fermer inscription");
        dialog.dialog("close" ); 
    });
    
});

function toggle(refOrId){
    if (typeof(refOrId)== "object"){ //c'est une reference
        console.log(refOrId.style.display);
        if (refOrId.style.display == "" || refOrId.style.display=="none"){
            refOrId.style.display = "block";
        }
        else{
            refOrId.style.display = "none";
        }
    }
    else{ //c'est un id
        var element = document.getElementById(refOrId);
        if (element.style.display == undefined || element.style.display=="none"){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    }

}