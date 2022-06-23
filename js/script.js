var baseURL = "https://mini.tikroko.ovh/~webcent" // Florent

$(document).ready(function(){
    if (sessionStorage.getItem('token')==undefined){
        $('#btnConnexion').show();
        $('#btnProfil').hide();
    }
    else    {
        $('#btnConnexion').hide();
        $('#btnProfil').show();
    }

    var popup = $('<div id="popupConnexion" class="popup">')
    .append('<h2>Connexion</h2>')
    .append($('<img src="./images/cross.jpg" class="croix">'))
    .append($(/*'<form action="">'
        +*/'<input type="text" id="login" class="textInputModif" placeholder="Email"><br/>'
        + '<input type="password" id="motDePasse" class="textInputModif" placeholder="Mot de passe"><br/>'
        + '<input type="button" id="btnConfirmerConnexion" class="button darkBluebckg" value="Se connecter">'))
    .append($('<div class="creation-compte">'
        + '<p>Pas encore de compte ?</p>'
        + '<a href="inscription.html" class="lien">'
            +'<input type="button" id="btnCreerCompte" class="button darkBlue2bckg" value="Créer mon compte">'
            +'</a></div>'))
    .append($('<span id="#feedbackco"></span>'))
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
       //fonction inscription Emilie
       $("#btnConfirmerConnexion").click(function() {
        console.log("click confirmer connexion");
        var login = $("#login").val();
        var passe = $("#motDePasse").val();
        var token = false;
        console.log("login: " + login + " passe: " + passe);
        //$("#feedback").hide(); //A rajouter si on a le temps
        $.ajax({
            type: "POST",
            url: "https://mini.tikroko.ovh/~webcent/api/authentification",
            data: {"pseudo": login, "mdp": passe},
            success: function (oRep) {
                console.log(oRep);
                token = oRep.hash;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('idUser', oRep.id);

                $('#btnConnexion').hide();
                $('#btnProfil').show();
                $('#popupConnexion').hide();
            },
            error: function () {
                console.log("erreur");
                $('#feedbackco').append('<p class="alerte">*Pseudo et/ou Mot de passe incorrect</p>');

            },
            dataType: "json"
        });
    });

    //creer un nouvel utilisateur - inscription - Emilie
    $("#btnInscriptionConfirmation").click(function() {
        console.log("click confirmer inscription");
        $('#feedback').empty();
        var pseudo = $("#pseudoInscription").val();
        var email = $("#emailInscription").val();
        var mdp = $("#mdpInscription").val();
        var mdpConfirmation = $("#mdpConfirmationInscription").val();
        var etatCheckBox = document.getElementById("cdUtilisations").checked;
        console.log("pseudo: " + pseudo + " mail: " + email + " mdp: " + mdp + " mdp Conf: " + mdpConfirmation + " check : " + etatCheckBox);
        if (pseudo == "" || pseudo == " ") {
            console.log("pseudo vide"); //rajouter feedback erreur
            $('#feedback').append('<p class="alerte">*Pseudo maquant</p>');
            return false;
        } 
        else if (email == "" || email == " ") {
            console.log("email vide"); //rajouter feedback erreur
            $('#feedback').append('<p class="alerte">*Email maquant</p>');
            return false;
        } 
        
        else if (mdp == "" || mdp == " ") {
            console.log("mdp vide"); //rajouter feedback erreur
            $('#feedback').append('<p class="alerte">*Mot de passe maquant</p>');
            return false;
        }
        else if (mdp != mdpConfirmation) {
            console.log("mdp different mdpConfirmation"); //rajouter feedback erreur
            $('#feedback').append('<p class="alerte">*Confirmation mot de passe différente mot de passe</p>');
            return false;
        }
        else if (!etatCheckBox){
            console.log("checkbox pas coché"); //rajouter feedback erreur
            $('#feedback').append('<p class="alerte">*Il faut accepter les conditions générales d utilisation</p>');
            return false;
        }
        
        
       
       
        //$("#feedback").hide(); //A rajouter si on a le temps
        console.log("avant requête ajax")
        $.ajax({
            type: "POST",
            url: "https://mini.tikroko.ovh/~webcent/api/inscription",
            data: {"pseudo": pseudo, "email": email, "mdp": mdp},
            success: function (oRep) {
                console.log(oRep);
                sessionStorage.setItem('token', oRep.hash);
                sessionStorage.setItem('idUser', oRep.id);
                window.location.replace("index.html"); //redirection accueil avec popup connexion ouvert
            },
            error: function () {
                console.log("erreur, pseudo ou email deja existant");
                $('#feedback').append('<p class="alerte">*Pseudo ou E-mail déjà existant</p>');
            },
            dataType: "json"
        });
    });
    
});



$(function(){

    var $profil,$reglages,$creation,$validation,$administrateur,$messageConfirmation;
    $profil=$('.profilStandard');
    $reglages=$('.profilReglage');
    $validation=$('.profilValidationTournoi');
    $creation=$('#creationTournoi');
    $administrateur=$('#administrateur');
    $messageConfirmation=$('#mssgModif');



    $('#btnAdmin1').click(function(){
        console.log("annulation");
        $reglages.hide();
        $profil.hide();
        $validation.hide();
        $creation.hide();
        $administrateur.show();
        $('#btnAdmin1').hide();})

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
        $administrateur.hide();
        $('#btnAdmin1').show();})

    $('.btnConfirmation').click(function(){
        console.log("confirmation");
        $reglages.hide();
        $profil.show();
        $validation.hide();
        $creation.hide();
        $administrateur.hide();
        $messageConfirmation.fadeIn().delay(2000).fadeOut();})

    var $resume, $resultats, $reglement, $gestion, $inscription, $valideScore, $valideCreation,$messageInscription,$messageDesinscription,$popupdes;
    $resume=$('.partieResume');
    $reglement=$('.partieReglement');
    $resultats=$('.partieResultats');
    $gestion=$('#gestion');
    $valideCreation=$('#validationCreationTournoi');
    $valideScore=$('#validationScore');
    $inscription=$('#inscrireEquipe');
    $messageInscription=$('#mssgInscription');
    $messageDesinscription=$('#mssgDesinscription');
    $popupdes=$('#popupDesinscription');
    $messageScore1=$('#mssgScore1');
    $messageScore2=$('#mssgScore2');
    $messageScore3=$('#mssgScore3');
    $compet1=$('#compet1');
    $compet2=$('#compet2');
    $compet3=$('#compet3');
    $messageAdmin=$('#mssgAdmin')

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
    $('#btnInscription').click(function(){
        console.log("inscription équipe confirmée");
        $resume.show();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
        $messageInscription.fadeIn().delay(2000).fadeOut();

    })
    $('#confirmerDesinscription').click(function(){
        console.log("inscription équipe confirmée");
        $resume.show();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
        $popupdes.hide()
        $messageDesinscription.fadeIn().delay(2000).fadeOut();

    })
    $('#btnOk1').click(function(){
        $messageScore1.fadeIn().delay(2000).fadeOut();
        $compet1.hide();

    })
    $('#btnOk2').click(function(){
        $messageScore2.fadeIn().delay(2000).fadeOut();
        $compet2.hide();

    })
    $('#btnOk3').click(function(){
        $messageScore3.fadeIn().delay(2000).fadeOut();
        $compet3.hide();
    })
    $('#btnValidationAdmin').click(function(){
        $messageAdmin.fadeIn().delay(2000).fadeOut();
    })

    var $messageAccepterTournoi,$messageRefuserTournoi,$competition;
    $messageAccepterTournoi=$('.mssgAccepterTournoi');
    $messageRefuserTournoi=$('.mssgRefuserTournoi');
    $competition=$('.competitionValide')

    $('#btnAccepterTournoi').click(function(){
        $messageAccepterTournoi.fadeIn().delay(2000).fadeOut();
        $competition.hide();
    })
    $('#btnRefuserTournoi').click(function(){
        $messageRefuserTournoi.fadeIn().delay(2000).fadeOut();
        $competition.hide()
    })
    $('.logo').click(function(){
        window.location.replace("./index.html")
    })
})  

// Florent
    //requet liste compet planning
    $.ajax({
        type: "GET",
        url: baseURL + '/api/liste_compet',
        success: function(oRep){
            console.log("récupération liste compet");
            if(window.location.pathname=="/Projey/planning.html"){ //adresse à modif en fonction du localhost
                var ini=oRep[0];
                var date=ini.startDate;
                var statut=ini.status;

                console.log(date);
                console.log(statut);
  
                if(statut!='2'){
                    var ligneDate = $('<li class="compet-jour">')
                        .append('<p class="jour">'+ini.startDate.substr(0,10)+'</p>');
                    $('body').append(ligneDate);
                    var lienCompet = $('<a href="competPlanning.html" class="rectangleCompet lien">')
                        .append('<p>' + ini.name +'-'+ ini.startDate+'-'+ini.type+'/'+ini.capacity+'</p>');
                    if(statut=='1') lienCompet.append('<p class="en-cours">En cours</p>');
                    $('body').append(lienCompet);
                }
                $.each(oRep, function(i){
                    if(i!='0'){
                        if(oRep[i].status!='2'){
                            var ligneDate = $('<li class="compet-jour">')
                                .append('<p class="jour">'+ oRep[i].startDate.substr(0,10)+'</p>')
                            $('body').append(ligneDate);
                            date=oRep[i].startDate;
                        }
                        if(oRep[i].status!='2'){
                            statut=oRep[i].status;
                            var lienCompet = $('<a href="competPlanning.html" class="rectangleCompet lien">')
                                .append('<p>Nom de la compétition : ' + oRep[i].name 
                                    +'- Heure de début : '+ oRep[i].startDate.substr(10)
                                    +'- Type de compétition : '+oRep[i].type
                                    +'- Nombre de places : '+oRep[i].capacity+'</p>');
                            if(statut=='1') lienCompet.append('<p class="en-cours">En cours</p>');
                            $('body').append(lienCompet);
                        } 
                    }
                })
            }
        },
        error: function() {
            console.log("erreur au chargement de la liste des competes");
        }
    });

    //Florent
    //requete pour liste compete resultat
    $.ajax({
        type: "GET",
        url: baseURL + '/api/liste_compet',
        success: function(oRep){
            console.log("récupération liste compet");
            console.log(oRep);
            if(window.location.pathname=="/Projey/resultats.html"){ //adresse à modif en fonction du localhost
                var ini=oRep[0];
                var date=ini.startDate;
                var statut=ini.status;

                console.log(date);
                console.log(statut);

                if(statut=='2'){
                    var ligneDate = $('<li class="compet-jour">')
                        .append('<p class="jour">'+ini.startDate.substr(0,10)+'</p>');
                    $('body').append(ligneDate);
                    var lienCompet = $('<a href="competPlanning.html" class="rectangleCompet lien">')
                        .append('<p>' + ini.name +'-'+ ini.startDate+'-'+ini.type+'/'+ini.capacity+'</p>');
                    if(statut=='1') lienCompet.append('<p class="en-cours">En cours</p>');
                    $('body').append(lienCompet);
                }
                $.each(oRep, function(i){
                    if(i!='0'){
                        if(oRep[i].status=='2' && oRep[i].startDate.substr(0,17)!=date.substr(0,17)){
                            var ligneDate = $('<li class="compet-jour">')
                                .append('<p class="jour">'+ oRep[i].startDate.substr(0,10)+'</p>')
                            $('body').append(ligneDate);
                            date=oRep[i].startDate;
                        }
                        if(oRep[i].status=='2'){
                            statut=oRep[i].status;
                                var lienCompet = $('<a href="competPlanning.html" class="rectangleCompet lien">')
                                    .append('<p>Nom de la compétition : ' + oRep[i].name 
                                        +'- Heure de début : '+ oRep[i].startDate.substr(10)
                                        +'- Type de compétition : '+oRep[i].type
                                        +'- Nombre de places : '+oRep[i].capacity+'</p>');
                                if(statut=='1') lienCompet.append('<p class="en-cours">En cours</p>');
                                $('body').append(lienCompet);
                            }
                    }
                })
            }

        },
    });
    //fin des requetes de Florent

//deconnexion profil emiliev2
$("#btnDeconnexion").click(function() {
    console.log("click deconnexion");
    sessionStorage.clear();
    window.location.replace("index.html");
});
