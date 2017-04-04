/**
 * 
 * Der Essensplan ist eine Auflistung von Gerichten, die ich mampfen möchte. 
 * Es wird aus irgendeiner vorbereiten Datei gelesen und vermutlich muss man erstmal 
 * prüfen, ob die Angaben daraus einigermaßen Sinn ergeben.
 * 
 */
rezepte = require("./rezepte");

var Essensplan = (function() {
    "use strict";

    var publicApi;

    function AusTextdateiEinlesen(dateiname) {

        var data = fs.readFileSync(dateiname).toString();
        var zeilen = data.split("\n");

        for( var i = 0; i < zeilen.length; i++ ){

            zeilen[i] = zeilen[i].trim();

            if ( zeilen[i] === "" || 
                    zeilen[i].indexOf("#") === 0 ) {
                /* Kommentare und Leerzeilen lassen wir weg */
                continue;
            }

            if (!rezepte.IstRezeptBekannt(zeilen[i])) {
                console.log();
                console.log("FEHLER! Das Rezept " + zeilen[i] + " ist unbekannt!");
                console.log();
                continue;
            }

            publicApi.Daten.push(zeilen[i]);
        }
    }

    publicApi = {
        Daten: [],
        AusTextdateiEinlesen : AusTextdateiEinlesen       
    };

    return publicApi;
});

module.exports = Essensplan;
