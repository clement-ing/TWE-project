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

    //Florent V2
    if (window.location.pathname=="/competPlanning.html"){ //adresse à modif en fonction de son serveur local
        console.log("info profil");
        $("#nomCompetitionCompetPlanning").text(sessionStorage.getItem('nomTournoi'));
        $("#dateCompetInfo").text("Date : " + sessionStorage.getItem('dateTournoi').substring(0,10));
        $("#heureCompetInfo").text("Heure de début : " + sessionStorage.getItem('dateTournoi').substring(10,16));
        $("#effectifCompetInfo").text("Nombre maximale d'équipes : " + sessionStorage.getItem('capaciteTournoi'));
        $("#placeRestanteCompetInfo").text("Places restantes : " + (parseInt(sessionStorage.getItem('capaciteTournoi'))-parseInt(sessionStorage.getItem('placesrestantesTournoi'))).toString());
        $("#typeCompetInfo").text("Type de tournoi : " + sessionStorage.getItem('typeTournoi'));
        $("#statutCompetInfo").text("Statut : " + sessionStorage.getItem('statutTournoi'));
    }

    if (window.location.pathname=="/competResultat.html"){ //adresse à modif en fonction de son serveur local
        console.log("info profil");
        $("#nomCompetitionCompetPlanning").text(sessionStorage.getItem('nomTournoi'));
        $("#gagnantTournoi").text("Equipe gagnante : " + sessionStorage.getItem('gagnantTournoi'));
        $("#dateCompetInfo").text("Date : " + sessionStorage.getItem('dateTournoi').substring(0,10));
        $("#heureCompetInfo").text("Heure de début : " + sessionStorage.getItem('dateTournoi').substring(10,16));
        $("#placeRestanteCompetInfo").text("Nombre d'équipes inscrites: " + sessionStorage.getItem('placesrestantesTournoi'));
        $("#typeCompetInfo").text("Type de tournoi : " + sessionStorage.getItem('typeTournoi'));
        $("#statutCompetInfo").text("Statut : " + sessionStorage.getItem('statutTournoi'));
    }
    
         
    //page profil : rajout du pseudo de l'utilisateur et email emiliev2
    if (window.location.pathname=="/profil.html"){ //adresse à modif en fonction de son serveur local
        console.log("info profil");
        $("#pseudoProfilInfo").text("Pseudo : " + sessionStorage.getItem('pseudo'));
        $("#emailProfilInfo").text("Email : " + sessionStorage.getItem('email'));

        //on va chercher plus de donnée sur le joueur : EmilieV2
        // d'abord les équipes du joueur
        $.ajax({
            type: "GET",
            url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/equipes",
            data: {"idUtilisateur": sessionStorage.getItem('idUser')},
            success: function (oRep2) {
                console.log(oRep2);
                sessionStorage.setItem('equipes', oRep2);
                if (oRep2==false){
                    $("#equipeProfilInfo").text("Equipe : " + "aucune");
                }
                else {
                    $("#equipeProfilInfo").text("Equipe(s) : " + sessionStorage.getItem('equipe'));
                }
            },
            error: function () {
                console.log("erreur equipe");
                $("#equipeProfilInfo").text("Equipe : " + "aucune");
            },
            dataType: "json"
        });

        //$("piechartMatch")
    }

    var popup = $('<div id="popupConnexion" class="popup">')
    .append('<h2>Connexion</h2>')
    .append($('<img src="./images/cross.jpg" class="croix">'))
    .append($(/*'<form action="">'
        +*/'<input type="text" id="login" class="textInputModif" placeholder="Pseudo"><br/>'
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
                if (!oRep){
                    return false;
                }
                console.log(oRep);
                token = oRep.hash;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('idUser', oRep.id);
                sessionStorage.setItem('pseudo', oRep.pseudo);
                sessionStorage.setItem('email', oRep.email);
                sessionStorage.setItem('isAdmin', oRep.isAdmin)
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
        if (!etatCheckBox){
            console.log("checkbox pas coché"); //rajouter feedback erreur
            return false;
        }
        else if (mdp != mdpConfirmation) {
            console.log("mdp different mdpConfirmation"); //rajouter feedback erreur
            return false;
        }
        else if (pseudo == "" || pseudo == " ") {
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
        
        //page competResultat : rajout du pseudo de l'utilisateur et email clementV2
        if (window.location.pathname=="/competResultat.html"){ //adresse à modif en fonction de son serveur local
            $("#showDate").text("date :" + sessionStorage.getItem('Gagnant'));
            console.log("info profil");
            $.ajax({
                url:"https://mini.tikroko.ovh/~webcent/api/gagnant_compet",
                data: {"idCompet":"1"},
                method: "GET",
                dataType:"json",
                success: function(response){
                    let data=JSON.stringify(response);
                    console.log(data);
                    // $("#showDate").text("date :" + sessionStorage.getItem('date'));
                    // sessionStorage.setItem("Gagnant :" + data);
                },
                error: function(error){
                    console.log("La requête s'est terminée en échec. Infos : " + JSON.stringify(error))
                },
                always: function(){
                    console.log("Requête effectuée");
                }
            });
            $("#showDate").text("date :" + sessionStorage.getItem('Gagnant'));
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
                sessionStorage.setItem('pseudo', oRep.pseudo);
                sessionStorage.setItem('email', oRep.email);
                window.location.replace("index.html"); //redirection accueil avec popup connexion ouvert
            },
            error: function () {
                console.log("erreur, pseudo ou email deja existant");
                $('#feedback').append('<p class="alerte">*Pseudo ou E-mail déjà existant</p>');
            },
            dataType: "json"
        });
    });
   


    //deconnexion profil emiliev2
    $("#btnDeconnexion").click(function() {
        console.log("click deconnexion");
        sessionStorage.clear();
        window.location.replace("index.html");
    });

    //reglage profil emiliev2
    //reglage profil emiliev2

    //profil reglage - modifier pseudo - emilie
    $("#btnConfirmerReglagePseudo").click(function() {
        console.log("click confirmer reglage");
        var pseudoNV = $("#pseudoReglage").val();
        console.log("pseudo: " + pseudoNV );
        //$("#feedback").hide(); //A rajouter si on a le temps
        if ($("#pseudoReglage").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("pseudo vide");
            return false;
        }
        else {
            $.ajax({
                type: "POST",
                url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/modification",
                data: {"hash": sessionStorage.getItem('token'), "pseudo": pseudoNV},
                success: function () {
                    console.log("success");
                    sessionStorage.setItem('pseudo', pseudoNV);
                    window.location.replace("profil.html");
                },
                error: function () {
                    console.log("erreur");
                },
                dataType: "json"
            });
        }
    });

    //profil reglage - modifier email - emilie
    $("#btnConfirmerReglageEmail").click(function() {
        console.log("click confirmer reglage");
        var emailNV = $("#emailReglage").val();
        console.log("email: " + emailNV);
        //$("#feedback").hide(); //A rajouter si on a le temps
        if ($("#emailReglage").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("email vide");
            return false;
        }
        else {
            $.ajax({
                type: "POST",
                url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/modification",
                data: {"hash": sessionStorage.getItem('token'), "email": emailNV},
                success: function () {
                    console.log("success");
                    sessionStorage.setItem('email', emailNV);
                    window.location.replace("profil.html");
                },
                error: function () {
                    console.log("erreur");
                },
                dataType: "json"
            });
        }
    });

    //profil reglage - modifier mdp - emilie
    $("#btnConfirmerReglageMdp").click(function() {
        console.log("click confirmer reglage");
        var passeNV = $("#mdpReglage").val();
        var passeConfirmNV = $("#mdpConfirmationReglage").val();
        console.log(" passe: " + passeNV + " passe conf: " + passeConfirmNV);
        //$("#feedback").hide(); //A rajouter si on a le temps
        if (passeNV != passeConfirmNV) {
            console.log("mdp different mdpConfirmation");
            return false;
        }
        if ($("#mdpReglage").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("mdp vide");
            return false;
        }
        else {
            $.ajax({
                type: "POST",
                url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/modification",
                data: {"hash": sessionStorage.getItem('token'), "mdp": passeNV},
                success: function () {
                    console.log("success");
                    sessionStorage.setItem('mdp', passeNV);
                    window.location.replace("profil.html");
                },
                error: function () {
                    console.log("erreur");
                },
                dataType: "json"
            });
        }
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
    $planning=$('.partiePlanning'); //Florentv2
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
        $planning.hide();
        $('compet-jour').remove();
        $('btnMatch').remove();
    })

    // Florent v2
    if(sessionStorage.getItem('isAdmin')=='1'){
        $('#btnAdmin2').show();
    }
    
    //Florent v2. NOTE : ajout de $planning.hide(); sur tous les autre lien.click
    $('.lienPlanning').click(function(){
        console.log("resume");
        $resume.hide();
        $resultats.hide();
        $reglement.hide();
        $gestion.hide();
        $valideCreation.hide();
        $valideScore.hide();
        $inscription.hide();
        $planning.show();
        $.ajax({
            type: "GET",
            url: baseURL + '/api/competition/liste_matchs',
            data:{'idCompet':sessionStorage.getItem('idTournoi')},
            success: function(oRep){
                if(window.location.pathname=="/competPlanning.html"){//adresse à modif en fonction du localhost
                    console.log(oRep)
                    console.log("ok")
                    if(!oRep){
                        $('#planningCompetInfo').text('Plus de matchs prévus pour cette compétition !');
                    } else {
                        var liste= $('<li class="compet-jour">')
                            .append('<p class="jour">'+sessionStorage.getItem('startDate').substring(0,10)+'</p>')
                        $('body').append(liste)
                        $.each(oRep, function(i){
                            var match=oRep[i];
                            var rectangleMatch = $('<input type="button" name='+ match.id+' class="btnMatch rectangleCompet lien'
                            +'value=Phase :'+match.id+'-'+match+'>')
                            $('body').append(rectangleMatch);
                        });
                    };
                }
            }
        });
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
        $planning.hide();

        $.ajax({
            type: "GET",
            url: baseURL + '/api/competition/liste_matchs',
            data:{'idCompet':sessionStorage.getItem('idTournoi')},
            success: function(oRep){
                if(window.location.pathname=="/competPlanning.html"){//adresse à modif en fonction du localhost
                    console.log(oRep)
                    console.log("ok")
                    console.log(sessionStorage.getItem('idTournoi'))

                    var liste= $('<li class="compet-jour">')
                        .append('<p class="jour">'+sessionStorage.getItem('startDate')+'</p>')
                    $('body').append(liste)

                    if(!oRep){
                        $('#planningCompetInfo').text('Plus de matchs prévus pour cette compétition !');
                    } else{
                        $.each(oRep, function(i){
                            var match=oRep[i];
                            var rectangleMatch = $('<input type="button" name='+ match.id+' class="btnMatch rectangleCompet lien'
                            +'value=Phase :'+match.id+'-'+match+'>')
                            rectangleMatch.append('<div style="display:none;">'
                                +'<p>Equipe 1</p><input type="text">'
                                +'<p>Equipe 2</p><input type="text">'
                                +'<input type="button" class="okScore button lightBluebckg" value="ok"></div>')
                            $('body').append(rectangleMatch);
                        });
                    }
                }
            }
        });
    })  

    $('.btnMatch').click(function(){
        sessionStorage.setItem('idMatch',this.name);
        (this).children().show();
        $.ajax({
            type: "GET",
            url: baseURL + '/api/match/equipes',
            data:{'idMatch': sessionStorage.getItem('idMatch')},
            success:function(oRep){
                console.log("obtention des équipes ")
            }
        });
    });

        //florent v2
        $('.okScore').click(function(){
            // console.log("clique ok scores");
            // $resume.hide();
            // $resultats.hide();
            // $reglement.hide();
            // $gestion.show();
            // $valideCreation.hide();
            // $valideScore.hide();
            // $inscription.hide();
            // $planning.hide();
           
            // $.ajax({
            //     var 
            //     type: "POST",
            //     url: baseURL + '/api/match/score',
            //     data:{'hash': sessionStorage.getItem('token'),
            //         'idMatch': sessionStorage.getItem('idMatch'),
            //         'idEquipe1':
            //         'idEquipe2':
            //         'scoreEquipe1':
            //         'scoreEquipe2':
                    
            //         sessionStorage.setItem('idUser', oRep.id);
            //         sessionStorage.setItem('pseudo', oRep.pseudo);
            //         sessionStorage.setItem('email', oRep.email);
            //         sessionStorage.setItem('isAdmin', oRep.isAdmin)
            //     },
            //     success:function(oREp){
    
            //     }
            // });
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
        $planning.hide();
        $.ajax({
            type: "GET",
            url: baseURL + '/api/competition/liste_matchs',
            data:{'idCompet':sessionStorage.getItem('idTournoi')},
            success: function(oRep){
                if(window.location.pathname=="/competResultat.html"){//adresse à modif en fonction du localhost
                    console.log(oRep)
                    console.log("ok")
                    if(!oRep){
                        $('#planningCompetInfo').text('Plus de matchs prévus pour cette compétition !');
                    } else {
                        $('#jourInfoCompetResultat').text(sessionStorage.getItem('dateTournoi').substring(0,10))
                        var enregistre = $('<div>');
                        $.each(oRep, function(i){
                            var match=oRep[i];
                            var rectangleMatch = $('<input type="button" name='+ match.id+' class="btnMatch rectangleCompet lien"'
                            +'value=Phase :'+match.id+'-'+match+'>');
                            enregistre.append(rectangleMatch);
                        });
                        $('#listeMatchCoompetInfo').html(enregistre);
                    };
                }
            }
        });
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
        $planning.hide();
        $("#reglementCompetInfo").text(sessionStorage.getItem('reglementTournoi'));
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
        $planning.hide();
        
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
        $planning.hide();
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
        $planning.hide();
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
        $planning.hide();
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
        $planning.hide();
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
            if(window.location.pathname=="/planning.html"){ //adresse à modif en fonction du localhost
                var ini=oRep[0];
                var date=ini.startDate;
                var statut=ini.status;

                console.log(date);
                console.log(statut);
  
                if(statut!='2'){
                    var ligneDate = $('<li class="compet-jour">')
                        .append('<p class="jour">'+ini.startDate.substr(0,10)+'</p>');
                    $('body').append(ligneDate);
                    var lienCompet = $('<input type="button" name='+ ini.id+' value="Nom de la compétition : '+ini.name 
                    +'- Heure de début : '+ ini.startDate
                    +' - Type de compétition : '+ini.type
                    +" - Nombre maximale d'équipes :"+ini.capacity+'" class="rectangleCompet lien"' 
                    +'onclick="setIdTournoi(this.name,' + "'competPlanning.html')" +';">');
                     $('body').append(lienCompet);
                }
                $.each(oRep, function(i){
                    if(i!='0'){
                        if(oRep[i].status!='2' && oRep[i].startDate.substr(0,14)!=date.substr(0,14)){
                            var ligneDate = $('<li class="compet-jour">')
                                .append('<p class="jour">'+ oRep[i].startDate.substr(0,10)+'</p>')
                            $('body').append(ligneDate);
                            date=oRep[i].startDate;
                        }
                        if(oRep[i].status!='2'){
                            statut=oRep[i].status;
                            var lienCompet=$('<input type="button" name='+ oRep[i].id+' class="rectangleCompet lien" value="Nom de la compétition : ' + oRep[i].name 
                            +'- Heure de début : '+ oRep[i].startDate.substr(10)
                            +'- Type de compétition : '+oRep[i].type
                            +" - Nombre maximale d'équipes :"+oRep[i].capacity+'" onclick="setIdTournoi(this.name,' + "'competPlanning.html')" +';">');
                            if(statut=='1') {
                                lienCompet.value+='- En cours ';
                                lienCompet.className+="en-cours";
                            }
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
            if(window.location.pathname=="/resultats.html"){ //adresse à modif en fonction du localhost
                var ini=oRep[0];
                var date=ini.startDate;
                var statut=ini.status;

                console.log(date);
                console.log(statut);

                if(statut=='2'){
                    var ligneDate = $('<li class="compet-jour">')
                        .append('<p class="jour">'+ini.startDate.substr(0,10)+'</p>');
                    $('body').append(ligneDate);
                    var lienCompet = $('<input type="button" name='+ ini.id+' value="Nom de la compétition : '+ini.name 
                        +'- Heure de début : '+ ini.startDate
                        +' - Type de compétition : '+ini.type
                        +" - Nombre maximale d'équipes :"+ini.capacity+'" class="rectangleCompet lien"' 
                        +'onclick="setIdTournoi(this.name,' + "'competResultat.html')" +';">');
                    $('body').append(lienCompet);
                }
                $.each(oRep, function(i){
                    if(i!='0'){
                        if(oRep[i].status=='2' && oRep[i].startDate.substr(0,10)!=date.substr(0,10)){
                            var ligneDate = $('<li class="compet-jour">')
                                .append('<p class="jour">'+ oRep[i].startDate.substr(0,10)+'</p>')
                            $('body').append(ligneDate);
                            date=oRep[i].startDate;
                        }
                        if(oRep[i].status=='2'){
                            var lienCompet=$('<input type="button" name='+ oRep[i].id+' class="rectangleCompet lien" value="Nom de la compétition : ' + oRep[i].name 
                            +' - Heure de début : '+ oRep[i].startDate.substr(10)
                            +' - Type de compétition : '+oRep[i].type
                            +" - Nombre maximale d'équipes :"+oRep[i].capacity+'" onclick="setIdTournoi(this.name,' + "'competResultat.html')" +';">');
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

// clementv4
function setIdTournoi(idTournoi,page){
    console.log("setIdTournoi");
    console.log(idTournoi);
    $.ajax({
        type:"GET",
        url:baseURL+'/api/competition',
        data:{'idCompet':parseInt(idTournoi)},
        success:function(oRep){
            console.log(oRep);
            sessionStorage.setItem("idTournoi", idTournoi);
            sessionStorage.setItem("nomTournoi", oRep.name);
            sessionStorage.setItem("idAdminTournoi", oRep.idAdmin);
            sessionStorage.setItem("dateTournoi", oRep.startDate);
            sessionStorage.setItem("capaciteTournoi", oRep.capacity);
            sessionStorage.setItem("statutTournoi", oRep.status);
            sessionStorage.setItem("typeTournoi", oRep.type);
            sessionStorage.setItem("reglementTournoi", oRep.reglement);
            console.log("infos tournoi attribuées")
        },
        error:function(){
            console.log("erreur à la recuperation des informations du tournoi")
        },
    });
    $.ajax({
        type:"GET",
        url:baseURL+'/api/competition/nombre_equipes',
        data:{'idCompet':idTournoi, 'verifValid':'1'},
        success:function(oRep){
            sessionStorage.setItem("placesrestantesTournoi", oRep);
            console.log("gagnant tournoi attribué si existant")
        },
        error:function(){
            console.log("erreur à la recuperation des informations du tournoi")
        },
    });
    $.ajax({
        type:"GET",
        url:baseURL+'/api/gagnant_compet',
        data:{'idCompet':idTournoi},
        success:function(oRep){
            sessionStorage.setItem("gagnantTournoi", oRep);
            window.location.replace(page);
        },
        error:function(){
            console.log("erreur à la recuperation des informations du tournoi")
        },
    });
}



    