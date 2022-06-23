$(document).ready(function(){

    var popup = $('<div id="popupConnexion" class="popup">')
    .append('<h2>Connexion</h2>')
    .append($('<img src="./images/cross.jpg" class="croix">'))
    .append($('<form action="">'
        + '<input type="text" class="textInputModif" placeholder="Email"><br/>'
        + '<input type="text" class="textInputModif" placeholder="Mot de passe"><br/>'
        + '<input type="submit" class="button darkBluebckg" value="Se connecter"></form>'))
    .append($('<div class="creation-compte">'
        + '<p>Pas encore de compte ?</p>'
        + '<a href="inscription.html" class="lien">'
            +'<input type="button" id="btnCreerCompte" class="button darkBlue2bckg" value="Créer mon compte">'
            +'</a></div>'))
    .append($('<div class="paratext flex-container">'
        +'<p>Mentions légales</p><p>Politique de confidentialité</p></div>'))
    $('body').append(popup);

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

    
    var dialogAnnulation = $("#popupDesinscription").dialog({
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
        dialogAnnulation.dialog("close" );
        dialog.dialog("close" ); 
    });

    $("#btnDesisncription").click(function(){
        console.log("click rejoindre");
        dialogAnnulation.dialog("open" ); 
    });
    
});

$(function(){

    var $profil,$reglages,$creation,$validation,$administrateur,$messageConfirmation;
    $profil=$('.profilStandard');
    $reglages=$('.profilReglage');
    $validation=$('.profilValidationTournoi');
    $creation=$('#creationTournoi');
    $administrateur=$('#administrateur');
    $messageConfirmation=$('.cache');


    $('#btnAdmin1').click(function(){
        console.log("annulation");
        $reglages.hide();
        $profil.hide();
        $validation.hide();
        $creation.hide();
        $administrateur.show();})

    $('#btnModif').click(function(){
        console.log("modification infos");
        $reglages.show();
        $profil.hide();
        $validation.hide();
        $creation.hide();
        $administrateur.hide();})

    $('#btnCrea').click(function(){
        console.log("création tournoi");
        $reglages.hide();
        $profil.hide();
        $validation.hide();
        $creation.show();
        $administrateur.hide();})
    
    $('#btnConfirmerTournoi').click(function(){
        console.log("validation tournoi");
        $reglages.hide();
        $profil.hide();
        $validation.show();
        $creation.hide();
        $administrateur.hide();})

    $('.btnAnnuler').click(function(){
        console.log("annulation");
        $reglages.hide();
        $profil.show();
        $validation.hide();
        $creation.hide();
        $administrateur.hide();})

    $('.btnConfirmation').click(function(){
        console.log("confirmation");
        $reglages.hide();
        $profil.show();
        $validation.hide();
        $creation.hide();
        $administrateur.hide();
        $messageConfirmation.fadeIn().delay(2000).fadeOut();})

    var $resume, $resultats, $reglement, $gestion, $inscription, $valideScore, $valideCreation;
    $resume=$('.partieResume');
    $reglement=$('.partieReglement');
    $resultats=$('.partieResultats');
    $gestion=$('#gestion');
    $valideCreation=$('#validationCreationTournoi');
    $valideScore=$('#validationScore');
    $inscription=$('#inscrireEquipe');
    

    $('.lienResume').click(function(){
        console.log("resume");
        $resume.show();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
    })

    $('.lienResultats').click(function(){
        console.log("resultats");
        $resume.hide();
        $resultats.show();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
    })

    $('.lienReglement').click(function(){
        console.log("reglement");
        $resume.hide();
        $resultats.hide();
        $reglement.show();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
    })

    $('.lienGestion').click(function(){
        console.log("gestion non admin");
        $resume.hide();
        $resultats.hide();
        $reglement.hide();
        $gestion.show();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
    })

    $('#btnInscriptionEquipe').click(function(){
        console.log("inscription equipe");
        $resume.hide();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.show();
    })

    $('#btnAnnulerInscription').click(function(){
        console.log("annulation inscription equipe");
        $resume.show();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
    })

    $('#btnAdmin2').click(function(){
        console.log("gestion admin des scores");
        $resume.hide();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.show();
        $inscription.hide();
    })

    $('#okScore').click(function(){
        console.log("clique ok scores");
        $resume.hide();
        $resultats.hide();
        $reglement.hide();
        $gestion.show();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
    })
})