var baseURL = "https://mini.tikroko.ovh/~webcent" // Florent

$(document).ready(function(){

    if (sessionStorage.getItem('token')==undefined){
        $('#btnConnexion').show();
        $('#btnProfil').hide();
        $('#notifHautNombre').hide();
    }
    else    {
        $('#btnConnexion').hide();
        $('#btnProfil').show();
        if (sessionStorage.getItem('notifnombre')==0){
            console.log("testnotifrouge2");
            $('#notifHautNombre').hide();
        }
        else {
            $('#notifhaut').text(sessionStorage.getItem('notifnombre'));
            $('#notifhaut').show();
        }
    }

        
    //page profil : rajout du pseudo de l'utilisateur et email emiliev2
    if (window.location.pathname=="/Applications/MAMP/htdocs/00h36/profil.html"){ //adresse à modif en fonction de son serveur local
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
        if (sessionStorage.getItem('isAdmin')==0){
            $('#btnAdmin1').hide();
        }

        //notif
        $("notifbas").text(sessionStorage.getItem('notifnombre'))

        //tous les users du site pour admin :
        if (sessionStorage.getItem('isAdmin')==1){
            $.ajax({
                type: "GET",
                url: "https://mini.tikroko.ovh/~webcent/api/liste_utilisateurs",
                data: {"debutPseudo": ""},
                success: function (oRep) {
                    console.log("liste user");
                    for (i = 1; i < oRep.length; i++) {
                        //console.log(oRep[i].pseudo);
                        $("#listeUser").append("<option value=" + i + ">" + oRep[i].pseudo + "</option>");
                    }
                },
                error: function () {
                    console.log("erreur liste user");
                },
                dataType: "json"
            });

        }

        $.ajax({
            type: "GET",
            url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/stats",
            data: {"idUtilisateur": sessionStorage.getItem('idUser')},
            success: function (oRep) {
                console.log("stat :" + oRep);
                sessionStorage.setItem('nbMatch', oRep.nbMatch);
                sessionStorage.setItem('nbMatchWin', oRep.nbMatchWin);
                sessionStorage.setItem('nbCompet', oRep.nbCompet);
                sessionStorage.setItem('nbCompetWin', oRep.nbCompetWin);
                if (oRep==false){
                    $("#competWinProfilInfo").text("Nombre compétition gagné : " + "aucune");
                }
                else {
                    $("#competWinProfilInfo").text("Nombre compétition gagné : " + sessionStorage.getItem('nbCompetWin'));
                }
            },
            error: function () {
                console.log("erreur stat");
            },
            dataType: "json"
        });

        //pie chart <3
        //$("piechartMatch")
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
        .append($('<span id="feedbackco"></span>'))
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
        $('#feedbackco').empty();
        var login = $("#login").val();
        var passe = $("#motDePasse").val();
        var token = false;
        console.log("login: " + login + " passe: " + passe);

        if (login == "" || login == " ") {
               console.log("pseudo vide"); //rajouter feedback erreur
               //Melinav3
               $('#feedbackco').append('<p class="alerte">*Pseudo maquant</p>');
               return false;}

        else if (passe == "" || passe == " ") {
               console.log("mdp vide"); //rajouter feedback erreur
               //Melinav3
               $('#feedbackco').append('<p class="alerte">*Mot de passe maquant</p>');                return false;
        }

        $.ajax({
            type: "POST",
            url: "https://mini.tikroko.ovh/~webcent/api/authentification",
            data: {"pseudo": login, "mdp": passe},
            success: function (oRep) {
                if (!oRep){
                    //Melinav3
                    $('#feedbackco').append('<p class="alerte">*Pseudo et/ou Mot de passe incorrect</p>');
                    return false;
                }
                console.log(oRep);
                token = oRep.hash;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('idUser', oRep.id);
                sessionStorage.setItem('pseudo', oRep.pseudo);
                sessionStorage.setItem('email', oRep.email);
                sessionStorage.setItem('isAdmin', oRep.isAdmin);
                $('#btnConnexion').hide();
                $('#btnProfil').show();
                $('#popupConnexion').hide();

                $.ajax({
                    type: "GET",
                    url: "https://mini.tikroko.ovh/~webcent/api/liste_compet",
                    data: {"idUtilisateur": sessionStorage.getItem('idUser'), "attenteValid": true},
                    success: function (oRep) {
                        console.log("attente validation" + (oRep));
                        if (oRep==false){
                            $('#notifhaut').hide();
                            sessionStorage.setItem('notifnombre', 0);
                            console.log("hide notif haut");
                        }
                        else {
                            console.log(oRep.length);
                            $('#notifhaut').text(oRep.length);
                            sessionStorage.setItem('notifnombre', oRep.length);
                            sessionStorage.setItem('notif', oRep);
                        }
                    },
                    error: function () {
                        console.log("erreur recup notif");

                    },
                    dataType: "json"
                });
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
        if (window.location.pathname=="/Applications/MAMP/htdocs/00h36/competResultat.html"){ //adresse à modif en fonction de son serveur local
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
        $('#feedbackRegPseudo').empty();
        var pseudoNV = $("#pseudoReglage").val();
        console.log("pseudo: " + pseudoNV );
        //$("#feedback").hide(); //A rajouter si on a le temps
        if ($("#pseudoReglage").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("pseudo vide");
            //Melinav3
            $('#feedbackRegPseudo').append('<p class="alerte">*Pseudo vide</p>');
            return false;
        }
        else {
            $.ajax({
                type: "POST",
                url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/modification",
                data: {"hash": sessionStorage.getItem('token'), "pseudo": pseudoNV},
                success: function (oRep) {
                    console.log(oRep);
                    if (!oRep){
                        $('#feedbackRegPseudo').append('<p class="alerte">*Pseudo déjà utilisé</p>');
                        return false;}
                    else {
                        $('#feedbackRegPseudo').append('<p class="green" id="mssgModif"> Modification effectuée </p>');
                        console.log("success");
                    }
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
        $('#feedbackRegMail').empty();
        //$("#feedback").hide(); //A rajouter si on a le temps
        if ($("#emailReglage").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("email vide");
            $('#feedbackRegMail').append('<p class="alerte">*E-mail vide</p>');
            return false;
        }
        else {
            $.ajax({
                type: "POST",
                url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/modification",
                data: {"hash": sessionStorage.getItem('token'), "email": emailNV},
                success: function (oRep) {
                    console.log("success");
                    if(!oRep){
                        console.log("mail utilisé");
                        $('#feedbackRegMail').append('<p class="alerte">*E-mail déjà utilisé</p>');
                        return false;
                    }
                    else {
                        $('#feedbackRegMail').append('<p class="green" id="mssgModif"> Modification effectuée </p>');
                        console.log("success");
                    }
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
        $('#feedbackRegMdp').empty();
        var passeNV = $("#mdpReglage").val();
        var passeConfirmNV = $("#mdpConfirmationReglage").val();
        console.log(" passe: " + passeNV + " passe conf: " + passeConfirmNV);
        //$("#feedback").hide(); //A rajouter si on a le temps
        if (passeNV != passeConfirmNV) {
            console.log("mdp different mdpConfirmation");
            $('#feedbackRegMdp').append('<p class="alerte">*Mots de passe différents</p>');
            return false;
        }
        if ($("#mdpReglage").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("mdp vide");
            $('#feedbackRegMdp').append('<p class="alerte">*Mot(s) de passe vide</p>');
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
                    $('#feedbackRegMdp').append('<p class="green">Modification réussie</p>');
                    window.location.replace("profil.html");
                },
                error: function () {
                    console.log("erreur");
                },
                dataType: "json"
            });
        }
    });

    //creation de tournoi - emiliev3
    $("#btnCreationTournoi").click(function() {
        console.log("click confirmer tournoi");
        $('#feedbackCrea').empty();
        var nom = $("#nomTournoi").val();
        var type = $("#typeTournoi").val();
        var date = $("#dateTournoi").val();
        var heure = $("#heureTournoi").val();
        var nombreEquipe = $("#nombreEquipeTournoi").val();
        var discord = $("#discordTournoi").val();
        var reglement = $("#reglementTournoi").val();
        var bo = $("#boTournoi").val();
        console.log("hash " + sessionStorage.getItem('token') + " nom " + nom + " dateDebut " + date + " nbEquipes " + nombreEquipe + " discord " + discord + " reglement " + reglement + " type " + type + " bo " + bo);
        if ($("#nomTournoi").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("nom vide");
            $('#feedbackCrea').append('<p class="alerte"> *Nom du tournoi manquant </p>');
            return false;
        }
        else if ($("#dateTournoi").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("date vide");
            $('#feedbackCrea').append('<p class="alerte"> *Date du tournoi manquant </p>');
            return false;
        }
        else if ($("#heureTournoi").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("heure vide");
            $('#feedbackCrea').append('<p class="alerte"> *Heure du tournoi manquant </p>');
            return false;
        }
        else if ($("#discordTournoi").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("discord vide");
            $('#feedbackCrea').append('<p class="alerte"> *Discord manquant </p>');
            return false;
        }
        else if ($("#reglementTournoi").val().replace(/^\s+|\s+$/g, "").length == 0) {
            console.log("reglement vide");
            $('#feedbackCrea').append('<p class="alerte"> *Règlement du tournoi manquant </p>');
            return false;
        }
        else if (type==0){
            console.log("fonction pas dev");
            $('#feedbackCrea').append('<p class="alerte"> *Fonctionnalité championnat pas encore disponible </p>');
            return false;
        }
        else {
            console.log("avant ajax");
            $.ajax({
                type: "POST",
                url: "https://mini.tikroko.ovh/~webcent/api/creation_compet",
                data: {"hash": sessionStorage.getItem('token'), "nom": nom, "dateDebut": date, "nbEquipes": nombreEquipe, "discord": discord, "reglement": reglement, "type": type,"bo": bo},
                success: function () {
                    console.log("success");
                    $('#feedbackCrea').append('<p class="green"> *Tournoi créé! </p>');
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
        console.log("desinscription équipe confirmée");
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

    //emiliev3
    $('#btnValidationAdmin').click(function(){
        var idUser = document.getElementById('listeUser').value;
        console.log(idUser);
        $.ajax({
            type: "POST",
            url: "https://mini.tikroko.ovh/~webcent/api/utilisateur/modification_admin",
            data: {"hash": sessionStorage.getItem('token'),"idUtilisateur": idUser, "choix": 1},
            success: function () {
                console.log("success");
                $messageAdmin.fadeIn().delay(2000).fadeOut();
            },
            error: function () {
                console.log("erreur passage admin");
            },
            dataType: "json"
        });
        $messageAdmin.fadeIn().delay(2000).fadeOut();
    })

    var $messageAccepterTournoi,$messageRefuserTournoi,$competition;
    $messageAccepterTournoi=$('.mssgAccepterTournoi');
    $messageRefuserTournoi=$('.mssgRefuserTournoi');
    $competition=$('.competitionValide');

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
            if(window.location.pathname=="/Applications/MAMP/htdocs/00h36/planning.html"){ //adresse à modif en fonction du localhost
                var ini=oRep[0];
                var date=ini.startDate;
                var statut=ini.status;

                console.log(date);
                console.log(statut);
  
                if(statut!='2'){
                    var ligneDate = $('<li class="compet-jour">')
                        .append('<p class="jour">'+ini.startDate.substr(0,10)+'</p>');
                    $('body').append(ligneDate);
                    //Melinav3
                    var lienCompet = $('<input type="button" name='+ ini.id+' value="'+ini.name +'-'+ ini.startDate+'-'+ini.type+'/'+ini.capacity+'" class="rectangleCompet lien">');
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
                            //Melinav3
                            var lienCompet = $('<input type="button" name='+ ini.id+' value="Nom de la compétition :' + oRep[i].name
                                +'- Heure de début : '+ oRep[i].startDate.substr(10)
                                +'- Nombre de places : '+oRep[i].capacity+'" class="rectangleCompet lien">');
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
            if(window.location.pathname=="/Applications/MAMP/htdocs/00h36/resultats.html"){ //adresse à modif en fonction du localhost
                var ini=oRep[0];
                var date=ini.startDate;
                var statut=ini.status;

                console.log(date);
                console.log(statut);

                if(statut=='2'){
                    var ligneDate = $('<li class="compet-jour">')
                        .append('<p class="jour">'+ini.startDate.substr(0,10)+'</p>');
                    $('body').append(ligneDate);
                    var lienCompet=$('<input type="button" name='+ ini.id+' class="rectangleCompet lien" value="' + ini.name +'-'+ ini.startDate+'-'+ini.type+'/'+ini.capacity+'">')

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
                            //Melinav3
                            var lienCompet=$('<input type="button" name='+ oRep[i].id+' class="rectangleCompet lien" value="Nom de la compétition : ' + oRep[i].name
                                +'- Heure de début : '+ oRep[i].startDate.substr(10)
                                +'- Nombre de places : '+oRep[i].capacity+'">');
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
