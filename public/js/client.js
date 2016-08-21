/**
 * 
 * Der Einstiegspunkt für die Anwendung :)
 * 
 */

var rezepte = require("../../node_modules/stefans-rezepte/rezepte.js");
var Einkaufsliste = require("../../node_modules/einkauf-lib/einkaufsliste.js");
var Rewe = require("../../node_modules/einkauf-lib/lieferanten/rewe");
var Inventur = require("./inventur.js").Inventur;
var toCountByItem = require("./tools.js").toCountByItem;


/* Abstraktion der UI als Datenschicht */
var uiData = (function() {
    "use strict";

    var publicApi;

    function Essensauswahlen() {
        var ergebnis = [];
        
        $("select.essensauswahl").each(
            function(index, value) {
                ergebnis.push($(value).val());
            }
        );

        return ergebnis;
    }

    publicApi = {
        Essensauswahlen : Essensauswahlen
    };

    return publicApi;
})();

/* BL */
var client = (function () {
    "use strict";

    var publicApi;

    /**
     * Wenn das Inventurcontrol eine Aktualisierung meldet, dann aktualisieren wir
     * die Anzeige.
     * */
    function AktualisiereErgebnis() {
        var einkaufsliste = publicApi.Inventur.ErgebnisEinkaufsliste();
        console.log(einkaufsliste);
        /* ... und ab hier müsste jetzt das Inventurergebnis weiterverwendet werden. */
        var beiEinkaufUeberRewe = einkaufsliste.VerrechneUeberUmrechnungsmatrix(Rewe.Umrechnungen);
        $("#rewe").html(beiEinkaufUeberRewe.AlsHtmlTabelle());
        $("#optimalpreis").html(beiEinkaufUeberRewe.AlsEinzelpreisHtmlTabelle());
    }

    /**
     * Wir tragen die Einzelauswahlen zusammen und stellen daraus 
     * eine schöne Liste auf mit Anzahl und Gericht, die wir 
     * dann weiterverarbeiten können.
     */
    function ZusammenfassungErstellen() {
        var eintraege = uiData.Essensauswahlen();
        var ausgezaehlt = toCountByItem(eintraege);
        
        var ausgabe = ""; 
        var keys = Object.keys(ausgezaehlt);
        var einkaufsliste = new Einkaufsliste();

        for ( var i = 0; i < keys.length; i++ ) {
            var rezept = rezepte.Rezept(keys[i]);
            if (rezept !== undefined) {
                ausgabe += "<li>" +  ausgezaehlt[keys[i]] + "x " + rezept.name + "</li>";
                for ( var j = 0; j < ausgezaehlt[keys[i]]; j++ ) {
                    einkaufsliste.FuegeRezeptHinzu(keys[i], rezepte.Rezepte);
                }
            }
            else
            {
                ausgabe += "<li>" +  ausgezaehlt[keys[i]] + "x " + keys[i] + "</li>";
            }
        }

        $("#zusammenfassung").html(ausgabe); 

        /* Wir informieren das Inventur-Control, dass es sich ggf. anpassen muss. */
        publicApi.Inventur.AktualisiereDaten(einkaufsliste.Daten);


    }

    function Init() {
        /* Wenn eine Auswahl geändert wird, dann wollen wir gerne davon wissen */
        $("select.essensauswahl").on("change", ZusammenfassungErstellen );
        publicApi.Inventur = Inventur("#zutaten");
        publicApi.Inventur.Aenderungscallback = AktualisiereErgebnis;
        ZusammenfassungErstellen();
    }

    publicApi = {
        init : Init
    };

    return publicApi; 
})();



$(document).ready(function() {
    client.init();
});