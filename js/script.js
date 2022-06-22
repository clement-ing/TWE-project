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