
var Einkaufsliste = function() {
    "use strict";

    var publicApi;

    /**
     * Füge eine Zutat mit Menge der Einkaufsliste hinzu
     */
    function FuegeZutatHinzu(zutat) {
        for (var i = 0; i < publicApi.Daten.length; i++) {
            if (publicApi.Daten[i].artikel === zutat.artikel &&
                publicApi.Daten[i].einheit === zutat.einheit) {
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
            if (rezeptliste[i].rezeptNummer === rezeptnameOderNummer ||
                rezeptliste[i].name === rezeptnameOderNummer) {

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
                if (umrechnungsmatrix[i].einheit === einheit &&
                    umrechnungsmatrix[i].artikel === artikel) {
                    return umrechnungsmatrix[i];
                }
            }
        }

        var ergebnis = [];

        for (var i = 0; i < publicApi.Daten.length; i++) {
            var umrechnungskurs = FindeUmrechnungskursFuer(publicApi.Daten[i].einheit, publicApi.Daten[i].artikel);

            if (umrechnungskurs !== null) {

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

    publicApi = {
        Daten : [],
        FuegeZutatHinzu : FuegeZutatHinzu,
        FuegeRezeptHinzu : FuegeRezeptHinzu,
        VerrechneUeberUmrechnungsmatrix : VerrechneUeberUmrechnungsmatrix,
        Runde : Runde, 
        Ausgabe : Ausgabe,
        AlsHtmlLi : AlsHtmlLi,
        AlsHtmlTabelle : AlsHtmlTabelle,
        AlsEinzelpreisHtmlTabelle : AlsEinzelpreisHtmlTabelle
    };

    return publicApi;
};
