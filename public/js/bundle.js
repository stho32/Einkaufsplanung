(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var Einkaufsliste = function() {
    "use strict";

    var publicApi;

    /**
     * Füge eine Zutat mit Menge der Einkaufsliste hinzu
     */
    function FuegeZutatHinzu(zutat) {
        for (var i = 0; i < publicApi.Daten.length; i++) {
            if (publicApi.Daten[i].artikel == zutat.artikel &&
                publicApi.Daten[i].einheit == zutat.einheit) {
                publicApi.Daten[i].anzahl  += zutat.anzahl;
                return;
            }
        }

        publicApi.Daten.push({
            anzahl  : zutat.anzahl,
            einheit : zutat.einheit,
            artikel : zutat.artikel
        });        
    }

    /**
     * Füge ein Rezept aus einer Rezeptliste in die Einkaufsliste ein.
     */
    function FuegeRezeptHinzu(rezeptnameOderNummer, rezeptliste) {
        // 1. Rezept finden
        for (var i = 0; i < rezeptliste.length; i++) {
            if (rezeptliste[i].rezeptNummer == rezeptnameOderNummer || rezeptliste[i].name == rezeptnameOderNummer) {

                // Zutaten mergen mit Einkaufsliste
                for (var j = 0; j < rezeptliste[i].zutaten.length; j++) {
                    publicApi.FuegeZutatHinzu(rezeptliste[i].zutaten[j]);
                }

            }
        }        
    }

    /**
     * Verrechnung mit Umrechnungskursen
     * 
     * Hierbei ist offen, was das für welche sind. Es könnte sein, dass wir z.B. Brot brauchen und dieses
     * auf Mehl, Milch und so aufrechnen müssen, weil wir ein Bäcker sind. 
     * Es könnte sein, dass wir Brot brauchen und das bei Rewe kaufen.
     */
    function VerrechneUeberUmrechnungsmatrix(umrechnungsmatrix) {

        function FindeUmrechnungskursFuer(einheit, artikel) {
            for (var i = 0; i < umrechnungsmatrix.length; i++) {
                if (umrechnungsmatrix[i].einheit == einheit &&
                    umrechnungsmatrix[i].artikel == artikel) {
                    return umrechnungsmatrix[i];
                }
            }
        }

        var ergebnis = [];

        for (var i = 0; i < publicApi.Daten.length; i++) {
            var umrechnungskurs = FindeUmrechnungskursFuer(publicApi.Daten[i].einheit, publicApi.Daten[i].artikel);

            if (umrechnungskurs != null) {

                var neu = umrechnungskurs.umrechnung(publicApi.Daten[i].anzahl);
                publicApi.Daten[i].anzahl = neu.anzahl;
                publicApi.Daten[i].anzahlGerundet = Math.ceil(neu.anzahl);
                if ( umrechnungskurs.einzelpreis !== undefined ) {
                    publicApi.Daten[i].preis = Math.ceil(neu.anzahl) * umrechnungskurs.einzelpreis;
                }
                publicApi.Daten[i].einzelpreis = umrechnungskurs.einzelpreis;
                publicApi.Daten[i].einheit = neu.einheit;
                publicApi.Daten[i].artikel = neu.artikel;

            }

            var t = publicApi.Daten[i];

            ergebnis.push({ anzahl: t.anzahl, einheit : t.einheit, artikel : t.artikel, anzahlGerundet : Math.ceil(t.anzahl), preis : t.preis, einzelpreis: t.einzelpreis });
        }

        var ergebnisEk = new Einkaufsliste();
        ergebnisEk.Daten = ergebnis;
        return ergebnisEk;
    }

    /**
     * Wenn eine Einkaufsliste das Ergebnis von Berechnungen ist, dann sind die Mengenangaben meistens etwas 
     * daneben. Wie "Kaufe 2.8 Gurken...". 
     * Diese Routine rundet die Mengen auf, damit Du weisst, was du kaufen musst.
     */
    function Runde() {
        for (var i = 0; i < publicApi.Daten.length; i++) {
            publicApi.Daten[i].anzahl = Math.ceil(publicApi.Daten[i].anzahl);
        }
    }

    function Ausgabe() {
        for (var i = 0; i < publicApi.Daten.length; i++) {
            console.log(publicApi.Daten[i].anzahl.toFixed(2) + " " + publicApi.Daten[i].einheit + " " + publicApi.Daten[i].artikel);
        }
    }

    function AlsHtmlLi() {
        var ergebnis = ""; 
        var anzahl = publicApi.Daten.length;

        for (var i = 0; i < anzahl; i++) {
            ergebnis += "<li>" + publicApi.Daten[i].anzahl.toFixed(2) + " " + publicApi.Daten[i].einheit + " " + publicApi.Daten[i].artikel + "</li>";
        }        

        return ergebnis;
    }

    function AlsHtmlTabelle() {
        var ergebnis = "<table class=\"table table-condensed\">"; 
        ergebnis += "<tr><th style=\"text-align:right\">Anzahl</th><th>Einheit</th><th>Artikel</th><th colspan=5 style=\"text-align:right;\">Preis</th></tr>";

        var anzahl = publicApi.Daten.length;
        var summe = 0;

        for (var i = 0; i < anzahl; i++) {

            var einzelpreis = 0;
            if ( publicApi.Daten[i].einzelpreis !== undefined)
                einzelpreis = publicApi.Daten[i].einzelpreis;
            var preis = 0;
            if ( publicApi.Daten[i].preis !== undefined)
                preis = publicApi.Daten[i].preis;

            ergebnis += "<tr><td style=\"text-align:right\">" + publicApi.Daten[i].anzahl.toFixed(2) +  
                        "</td><td>" + publicApi.Daten[i].einheit + "</td><td>" + publicApi.Daten[i].artikel + 
                        "</td>" + 
                        "<td style=\"text-align:right\">" + publicApi.Daten[i].anzahlGerundet + "</td>" + 
                        "<td> x </td>" + 
                        "<td style=\"text-align:right\">" + einzelpreis.toFixed(2) + " € </td>" + 
                        "<td> = </td>" + 
                        "<td style=\"text-align:right\">" + preis.toFixed(2) + " € </td></tr>";
                        
            if (publicApi.Daten[i].preis !== undefined) {
                summe += publicApi.Daten[i].preis;
            }
        }        

        ergebnis += "<tr><th></th><th></th><th style=\"text-align:right\" colspan=5>Summe:</th><th style=\"text-align:right;\">" + summe.toFixed(2) + " € </th></tr>";
        ergebnis += "</table>";

        return ergebnis;
    }

    function AlsEinzelpreisHtmlTabelle() {
        var ergebnis = "<table class=\"table table-condensed\">"; 
        ergebnis += "<tr><th style=\"text-align:right\">Anzahl</th><th>Einheit</th><th>Artikel</th><th colspan=5 style=\"text-align:right;\">Preis</th></tr>";

        var anzahl = publicApi.Daten.length;
        var summe = 0;

        for (var i = 0; i < anzahl; i++) {

            var einzelpreis = 0;
            if ( publicApi.Daten[i].einzelpreis !== undefined)
                einzelpreis = publicApi.Daten[i].einzelpreis;
            var preis = einzelpreis * publicApi.Daten[i].anzahl;

            ergebnis += "<tr><td style=\"text-align:right\">" + publicApi.Daten[i].anzahl.toFixed(2) +  
                        "</td><td>" + publicApi.Daten[i].einheit + "</td><td>" + publicApi.Daten[i].artikel + 
                        "</td>" + 
                        "<td style=\"text-align:right\">" + publicApi.Daten[i].anzahl.toFixed(2) + "</td>" + 
                        "<td> x </td>" + 
                        "<td style=\"text-align:right\">" + einzelpreis.toFixed(2) + " € </td>" + 
                        "<td> = </td>" + 
                        "<td style=\"text-align:right\">" + preis.toFixed(2) + " € </td></tr>";
                        
            summe += preis;
        }        

        ergebnis += "<tr><th></th><th></th><th style=\"text-align:right\" colspan=5>Summe:</th><th style=\"text-align:right;\">" + summe.toFixed(2) + " € </th></tr>";
        ergebnis += "</table>";

        return ergebnis;
    }

    var publicApi = {
        Daten : [],
        FuegeZutatHinzu : FuegeZutatHinzu,
        FuegeRezeptHinzu : FuegeRezeptHinzu,
        VerrechneUeberUmrechnungsmatrix : VerrechneUeberUmrechnungsmatrix,
        Runde : Runde, 
        Ausgabe : Ausgabe,
        AlsHtmlLi : AlsHtmlLi,
        AlsHtmlTabelle : AlsHtmlTabelle,
        AlsEinzelpreisHtmlTabelle : AlsEinzelpreisHtmlTabelle
    }

    return publicApi;
};

module.exports = Einkaufsliste;
},{}],2:[function(require,module,exports){
/**
 * 
 * Einkauf über REWE
 * 
 */


var Umrechnungen = [
    {
        einheit: "Scheiben",
        artikel: "Brot",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 9;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "ja Bauernbrot (9-Scheiben)" }
        },
        einzelpreis: 0.65
    },
    {
        einheit: "Scheiben",
        artikel: "Wurst",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 12;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "12-Scheiben-Wurst" }
        },
        einzelpreis: 0.80
    },
    {
        einheit: "Scheiben",
        artikel: "Gurke",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 35;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "Gurke" }
        },
        einzelpreis : 0.89
    },
    {
        einheit: "Gramm",
        artikel: "Nudeln",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 500;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "500g Spirelli Nudeln-Tüte" }
        },
        einzelpreis : 1.29
    },
    {
        einheit: "Glas",
        artikel: "Bolognesesoße",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl;
            return { anzahl: neueAnzahl, einheit: "Glas", artikel: "Bolognesesoße" }
        },
        einzelpreis : 2.99
    },
    {
        einheit: "Glas",
        artikel: "Basilico-Soße",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl;
            return { anzahl: neueAnzahl, einheit: "Glas", artikel: "Basilico-Soße" }
        },
        einzelpreis : 2.29
    },
    {
        einheit: "ml",
        artikel: "Ketchup",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 500;
            return { anzahl: neueAnzahl, einheit: "Flasche", artikel: "ja! Ketchup 500ml" }
        },
        einzelpreis : 0.79       
    },
    {
        einheit: "Stück",
        artikel: "Würstchen",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 5;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "5 Geflügelwürstchenpackung a 300g" }
        },
        einzelpreis : 1.79  
    },
    {
        einheit: "g",
        artikel: "Mehl",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 1000;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1 kg Mehl Packung" }
        },
        einzelpreis : 0.9  
    },
    {
        einheit: "Stück",
        artikel: "Eier",
        umrechnung: function(anzahl) {
            var neueAnzahl = anzahl / 10;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "10 Eier aus Freilandhaltung-Packung" }            
        },
        einzelpreis : 2.19
    },
    {
        einheit: "ml",
        artikel: "Milch",
        umrechnung: function(anzahl) {
            var neueAnzahl = anzahl / 1000;
            return { anzahl: neueAnzahl, einheit: "l", artikel: "1l Milch" }            
        },
        einzelpreis : 0.46        
    },
    {
        einheit: "g",
        artikel: "Zucker",
        umrechnung: function(anzahl) {
            var neueAnzahl = anzahl / 1000;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1000g Packung Ja! Rafinadezucker" }            
        },
        einzelpreis : 0.65        
    },
    {
        einheit: "g",
        artikel: "Kartoffeln",
        umrechnung: function(anzahl) {
            var neueAnzahl = anzahl / 2000;
            return { anzahl: neueAnzahl, einheit: "Sack", artikel: "2kg Sack Kartoffeln" }            
        },
        einzelpreis : 3.49        
    }, 
    {
        einheit: "Stück",
        artikel: "Zwiebel",
        umrechnung: function(anzahl) {
            var neueAnzahl = anzahl / 14;
            return { anzahl: neueAnzahl, einheit: "Sack", artikel: "1kg Sack/Beutel Zwiebeln" }            
        },
        einzelpreis : 1.50  
    },
    {
        einheit: "Scheiben",
        artikel: "Banane",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / (24 * 5);
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "Bio-Bananenstaude mit 5 Bananen (Max)" }
        },
        einzelpreis : 2.21
    },
    {
        einheit: "g",
        artikel: "Dunkles Mandelmuß",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 350;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1x 350g Glas dunkles Mandelmuß" }
        },
        einzelpreis : 8.99
    },   
    {
        einheit: "g",
        artikel: "Agavendicksaft",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 500;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1x 500g Glas Agavendicksaft" }
        },
        einzelpreis : 4.90
    }, 
    {
        einheit: "g",
        artikel: "Vollkorn-Dinkel-Mehl",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 1000;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1x 1000g Vollkorn-Dinkel-Mehl" }
        },
        einzelpreis : 1.95
    }, 
    {
        einheit: "g",
        artikel: "Backpulver",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / (4*17);
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1x 4 Stück 17g Backpulver Packung" }
        },
        einzelpreis : 0.95
    }, 
    {
        einheit: "g",
        artikel: "Salz",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 500;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1x 500g Salz Packung" }
        },
        einzelpreis : 0.95
    }, 
    {
        einheit: "g",
        artikel: "Zucker",
        umrechnung: function (anzahl) {
            var neueAnzahl = anzahl / 500;
            return { anzahl: neueAnzahl, einheit: "Stück", artikel: "1x 500g Zucker Packung" }
        },
        einzelpreis : 0.95
    }, 

    
]

module.exports.Umrechnungen = Umrechnungen;
},{}],3:[function(require,module,exports){
/**
 * 
 * Diese Datei beinhaltet die Rezepte, die die Anwendung kennt. 
 * 
 * 
 */

var publicApi;


var Rezepte = 
    [
        {
            rezeptNummer: "1",
            name: "Gurkenwurstbrot",
            zutaten:
            [
                { anzahl: 2, einheit: "Scheiben", artikel: "Brot" },
                { anzahl: 2, einheit: "Scheiben", artikel: "Wurst" },
                { anzahl: 7, einheit: "Scheiben", artikel: "Gurke" }
            ]
        },
        {
            rezeptNummer: "2",
            name: "Nudeln-Bolognese",
            zutaten:
            [
                { anzahl: 250, einheit: "Gramm", artikel: "Nudeln" },
                { anzahl: 1, einheit: "Glas", artikel: "Bolognesesoße" },
            ]
        },
        {
            rezeptNummer: "3",
            name: "Nudeln-Basilico",
            zutaten:
            [
                { anzahl: 250, einheit: "Gramm", artikel: "Nudeln" },
                { anzahl: 1, einheit: "Glas", artikel: "Basilico-Soße" },
            ]
        },
        {
            rezeptNummer: "4",
            name: "Würstchen mit Ketchup",
            zutaten:
            [
                { anzahl: 2, einheit: "Scheiben", artikel: "Brot" },
                { anzahl: 2, einheit: "Stück", artikel: "Würstchen" },
                { anzahl: 20, einheit: "ml", artikel: "Ketchup" },                
            ]
        },
        {
            rezeptNummer: "5",
            name: "Pfannkuchen",
            zutaten:
            [
                { anzahl: 120, einheit: "g", artikel: "Mehl" },
                { anzahl: 3, einheit: "Stück", artikel: "Eier" },
                { anzahl: 240, einheit: "ml", artikel: "Milch" },   
                { anzahl: 15, einheit: "g", artikel: "Zucker" },  
                { anzahl: 0.5, einheit: "Glass", artikel: "Apfelmus" }                           
            ]
        },
        {
            rezeptNummer: "6",
            name: "Wurstkartoffeln",
            zutaten:
            [
                { anzahl: 500 / 2, einheit: "g", artikel: "Kartoffeln" },
                { anzahl: 5 / 2, einheit: "Stück", artikel: "Würstchen" },
                { anzahl: 1 / 2, einheit: "Stück", artikel: "Zwiebel" },   
                { anzahl: 1 / 2, einheit: "Stück", artikel: "Knoblauchzehe" },    
                { anzahl: 1 / 2, einheit: "tl", artikel: "Paprikapulver"},
                { anzahl: 1 / 2, einheit: "tl", artikel: "Majoran"}
            ]
        },
        {
            rezeptNummer: "7",
            name: "Champignon-Porree-Käse-Curry-Suppe",
            zutaten:
            [
                { anzahl: 400, einheit: "g", artikel: "Porree" },
                { anzahl: 400, einheit: "g", artikel: "Champignons" },
                { anzahl: 400, einheit: "ml", artikel: "Milch" },   
                { anzahl: 0.4, einheit: "Stück", artikel: "Große Zwiebel" },                             
                { anzahl: 200, einheit: "g", artikel: "Hackfleisch" },
                { anzahl: 320, einheit: "g", artikel: "Schmelzkäse" },
                { anzahl: 0.6, einheit: "l", artikel: "Gemüsebrühe" },
                { anzahl: 0.8, einheit: "el, gest.", artikel: "Curry" }
            ]
        },   
        {
            rezeptNummer: "8",
            name: "Bananen-Nuss-Brot",
            zutaten:
            [
                { anzahl: 1, einheit: "Scheiben", artikel: "Brot" },
                { anzahl: 13, einheit: "g", artikel: "Dunkles Mandelmuß" },
                { anzahl: 1, einheit: "g", artikel: "Agavendicksaft" },
                { anzahl: 12, einheit: "Scheiben", artikel: "Banane" }
            ]
        },  
        {
            rezeptNummer: "9",
            name: "Brot alla Max (zum selber Backen)",
            zutaten:
            [
                { anzahl: 1000, einheit: "g", artikel: "Vollkorn-Dinkel-Mehl" },
                { anzahl: 34, einheit: "g", artikel: "Backpulver" },
                { anzahl: 15, einheit: "g", artikel: "Salz" },
                { anzahl: 18, einheit: "g", artikel: "Zucker" }
            ]
        },          
    ];

function IstRezeptBekannt(nameOderRezeptnummer) {
    for ( var i = 0; i < Rezepte.length; i++ ) {
        if ( Rezepte[i].name === nameOderRezeptnummer || 
             Rezepte[i].rezeptNummer === nameOderRezeptnummer ) {
                 return true;
             }
    }

    return false;
}

function RezeptNachNameOderRezeptnummer(nameOderRezeptnummer) {
    for ( var i = 0; i < Rezepte.length; i++ ) {
        if ( Rezepte[i].name === nameOderRezeptnummer || 
             Rezepte[i].rezeptNummer === nameOderRezeptnummer ) {
                 return Rezepte[i];
             }
    }  

    return undefined;  
}


publicApi = {
    Rezepte : Rezepte,
    IstRezeptBekannt : IstRezeptBekannt,
    Rezept : RezeptNachNameOderRezeptnummer
};

module.exports = publicApi;


},{}],4:[function(require,module,exports){
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
},{"../../node_modules/einkauf-lib/einkaufsliste.js":1,"../../node_modules/einkauf-lib/lieferanten/rewe":2,"../../node_modules/stefans-rezepte/rezepte.js":3,"./inventur.js":5,"./tools.js":6}],5:[function(require,module,exports){
/**
 * 
 * Eine Inventur nimmt eine Einkaufsliste entgegen und zeigt
 * diese inhaltlich an. Des Weiteren stellt sie ein Eingabefeld
 * bereit, in dem die bereits vorhandene Menge eingeben werden kann, 
 * welche dann vom Bedarf abgezogen wird.
 * 
 * Das Ergebnis dieser Benutzerinteraktion kann wiederum als Einkaufsliste
 * abgerufen werden.
 * 
 * In der Essensplanung wird bei jeder Änderung des Ausgangsplanes 
 * eine Aktualisierung des Bedarfs ausgeführt, was bedeutet, dass 
 * dass neue Zeilen eingefügt oder bestehende aktualisert werden müssen ohne
 * dass die Eingabe des Benutzers verloren geht.
 * 
 */
var Einkaufsliste = require("../../node_modules/einkauf-lib/einkaufsliste.js");


var Inventur = function inventur(selektor) {
    "use strict";

    var publicApi;

    function AktualisiereRestmenge(eventTarget) {
        var wert = $(eventTarget).val();
        var i = $(eventTarget).data("position");

        if ( !isNaN(wert) ) {
            $(eventTarget).removeClass("has-error");
            wert = parseFloat(wert);
            publicApi.Daten[i].lagerbestand = wert;
            var restbedarf = (publicApi.Daten[i].anzahl - publicApi.Daten[i].lagerbestand).toFixed(2);
            $(selektor).find("#restbedarf-" + i).html(restbedarf);

            if (publicApi.Aenderungscallback !== undefined)
            {
                publicApi.Aenderungscallback();
            }
        }
        else
        {
            $(eventTarget).addClass("has-error");
            $(selektor).find("#restbedarf-" + i).html("Zahl wird benötigt");
        }
    }

    function AktualisiereAnzeige() {
        $(selektor).off("change");

        $(selektor).html(AlsHtml());

        $(selektor).on("change", "input", function(event) {
            AktualisiereRestmenge(event.target);
        });
    }

    function AktualisiereDaten(neueDaten) {
        publicApi.Daten = JSON.parse(JSON.stringify(neueDaten));

        for ( var i = 0; i < publicApi.Daten.length; i++ ) {
            if ( publicApi.Daten[i].lagerbestand === undefined ) {
                publicApi.Daten[i].lagerbestand = 0;
            }
        }

        AktualisiereAnzeige();

        if (publicApi.Aenderungscallback !== undefined)
        {
            publicApi.Aenderungscallback();
        }
    }
        
    /* Zweck einer Lagerbedarfstabelle ist die Auflistung der Inhalte mit der 
       Möglichkeit einen vorhandenen Lagerbestand anzugeben.
       Die Mengendifferenz kann dann wiederum weiterverarbeitet werden, so dass
       sich die Einkaufsliste ausschließlich auf Dinge bezieht, 
       die Du einkaufen musst. 
       Das bedeutet u.a. das Du einen Ereigniskonnektor für Änderungen in der 
       bereitgestellten UI benötigst.
    */
    function AlsHtml() {
        var ergebnis = "<table class=\"table table-condensed\">"; 
        ergebnis += "<tr><th style=\"text-align:right\">Anzahl nötig</th><th>Einheit</th><th>Artikel</th><th>Lagerbestand</th><th>Restbedarf</th></tr>";

        var anzahl = publicApi.Daten.length;

        for (var i = 0; i < anzahl; i++) {

            var bedarf          = publicApi.Daten[i].anzahl.toFixed(2);
            var lagerbestand    = publicApi.Daten[i].lagerbestand.toFixed(2);
            var restbedarf      = (parseFloat(bedarf) - parseFloat(lagerbestand)).toFixed(2);
            var einheit         = publicApi.Daten[i].einheit;
            var artikel         = publicApi.Daten[i].artikel;

            var template = 
                        "<tr>" + 
                            "<td style=\"text-align:right\">$bedarf$</td>" + 
                            "<td>$einheit$</td>" + 
                            "<td>$artikel$</td>" + 
                            "<td><input type=\"text\" class=\"form-control\" data-position=\"$i$\" value=\"0\"></input></td>" + 
                            "<td style=\"text-align:right\" id=\"restbedarf-$i$\">$restbedarf$</td>" + 
                        "</tr>";

            template = template.replace(/\$bedarf\$/g, bedarf);
            template = template.replace(/\$lagerbestand\$/g, lagerbestand);
            template = template.replace(/\$restbedarf\$/g, restbedarf);
            template = template.replace(/\$einheit\$/g, einheit);
            template = template.replace(/\$artikel\$/g, artikel);
            template = template.replace(/\$i\$/g, i);

            ergebnis += template;
        }        

        ergebnis += "</table>";

        return ergebnis;
    }

    /* Ruft die durch die Inventur ggf. manuell modifizierte Ergebnisliste ab. */
    function ErgebnisEinkaufsliste() {
        var einkaufsliste = new Einkaufsliste();

        for ( var i = 0; i < publicApi.Daten.length; i++ ) {
            var restbedarf = Math.round((publicApi.Daten[i].anzahl - publicApi.Daten[i].lagerbestand)*100)/100;
            
            if ( restbedarf > 0 ) {
                einkaufsliste.FuegeZutatHinzu({
                    artikel : publicApi.Daten[i].artikel,
                    einheit : publicApi.Daten[i].einheit,
                    anzahl  : restbedarf
                });
            }
        }

        return einkaufsliste;
    }

    publicApi = {
        AktualisiereDaten : AktualisiereDaten,
        AlsHtml : AlsHtml,
        ErgebnisEinkaufsliste : ErgebnisEinkaufsliste,
        Aenderungscallback : undefined
    };

    return publicApi;
}

module.exports = {
    Inventur : Inventur
}
},{"../../node_modules/einkauf-lib/einkaufsliste.js":1}],6:[function(require,module,exports){
function toCountByItem(items)
{
    var ergebnis = {};

    for ( var i = 0; i < items.length; i++ ) {
        if ( ergebnis[items[i]] === undefined ) {
            ergebnis[items[i]] = 1;
        }
        else {
            ergebnis[items[i]] += 1;
        }
    }

    return ergebnis;
}

module.exports = {
    toCountByItem : toCountByItem
};
},{}]},{},[4]);
