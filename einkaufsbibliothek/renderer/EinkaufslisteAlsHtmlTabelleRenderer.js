/**
 * Rendern der Einkaufsliste als Html-Tabelle
 *
 * Dabei steht der "Einkauf" im Vordergrund, d.h. der
 * Gesamtbedarf, sowie die tatsächliche Zahl von Artikeln
 * die eingekauft werden muss.
 *
 * @param einkaufsliste Einkaufsliste
 * @constructor
 */

var EinkaufslisteAlsHtmlTabelleRenderer = function(einkaufsliste) {
    var publicApi = {};

    publicApi.einkaufsliste = einkaufsliste;

    /**
     * @return {string}
     */
    publicApi.Render = function() {
        var einkaufsliste = publicApi.einkaufsliste;
        var ergebnis = "<table class=\"table table-condensed\">";
        ergebnis += "<tr><th style=\"text-align:right\">Anzahl</th><th>Einheit</th><th>Artikel</th><th colspan=5 style=\"text-align:right;\">Preis</th></tr>";

        var anzahl = einkaufsliste.Daten.length;
        var summe = 0;

        for (var i = 0; i < anzahl; i++) {

            var einzelpreis = 0;
            if ( einkaufsliste.Daten[i].einzelpreis !== undefined)
                einzelpreis = einkaufsliste.Daten[i].einzelpreis;
            var preis = 0;
            if ( einkaufsliste.Daten[i].preis !== undefined)
                preis = einkaufsliste.Daten[i].preis;
            var anzahlGerundet = Math.ceil(einkaufsliste.Daten[i].anzahl);


            ergebnis += "<tr><td style=\"text-align:right\">" + einkaufsliste.Daten[i].anzahl.toFixed(2) +
                "</td><td>" + einkaufsliste.Daten[i].einheit + "</td><td>" + einkaufsliste.Daten[i].artikel +
                "</td>" +
                "<td style=\"text-align:right\">" + anzahlGerundet + "</td>" +
                "<td> x </td>" +
                "<td style=\"text-align:right\">" + einzelpreis.toFixed(2) + " € </td>" +
                "<td> = </td>" +
                "<td style=\"text-align:right\">" + preis.toFixed(2) + " € </td></tr>";

            if (einkaufsliste.Daten[i].preis !== undefined) {
                summe += einkaufsliste.Daten[i].preis;
            }
        }

        ergebnis += "<tr><th></th><th></th><th style=\"text-align:right\" colspan=5>Summe:</th><th style=\"text-align:right;\">" + summe.toFixed(2) + " € </th></tr>";
        ergebnis += "</table>";

        return ergebnis;
    };

    return publicApi;
};