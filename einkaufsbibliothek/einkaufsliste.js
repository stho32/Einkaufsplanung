
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
     *
     * @param rezeptnameOderNummer string
     * @param rezeptliste Rezepte
     */
    function FuegeRezeptHinzu(rezeptnameOderNummer, rezeptliste) {

        var rezept = rezeptliste.Rezept(rezeptnameOderNummer);

        if ( rezept === undefined )
        {
            console.log("Das Rezept " + rezeptnameOderNummer + " ist unbekannt.");
            return;
        }

        // Zutaten mergen mit Einkaufsliste
        for (var i = 0; i < rezept.zutaten.length; i++) {
            publicApi.FuegeZutatHinzu(rezept.zutaten[i]);
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

    function AlsHtmlLi() {
        var ergebnis = ""; 
        var anzahl = publicApi.Daten.length;

        for (var i = 0; i < anzahl; i++) {
            ergebnis += "<li>" + publicApi.Daten[i].anzahl.toFixed(2) + " " + publicApi.Daten[i].einheit + " " + publicApi.Daten[i].artikel + "</li>";
        }        

        return ergebnis;
    }

    publicApi = {
        Daten : [],
        FuegeZutatHinzu : FuegeZutatHinzu,
        FuegeRezeptHinzu : FuegeRezeptHinzu,
        VerrechneUeberUmrechnungsmatrix : VerrechneUeberUmrechnungsmatrix,
        AlsHtmlLi : AlsHtmlLi
    };

    return publicApi;
};
