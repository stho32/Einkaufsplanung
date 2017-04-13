/**
 * Rendert die Einkaufsliste als HTML-Tabelle.
 *
 * Dabei werden keine gerundeten Anzahlen genutzt.
 * Also rechnet man z.B. mit 2.8 Gurken statt 3 Gurken.
 *
 * Das hat den Effekt, dass man hier als Summenpreis den
 * optimalen Preis eines Gerichtes ablesen kann.
 * Das ist der Preis, der zustande kommt, wenn man
 * genau die angegebene Menge der Zutaten verwendet und
 * alle Zutaten gleichermaßen aufbraucht.
 *
 * So kann man u.a., wenn man z.B. das Rezept für einen Döner
 * kennt und selbst einen macht, sehen, inwieweit, abzüglich
 * Zubereitungskosten, das Selbermachen Geld spart oder nicht.
 *
 */

var EinkaufslisteAlsEinzelpreisHtmlTabelleRenderer = function(einkaufsliste) {
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
            var preis = einzelpreis * einkaufsliste.Daten[i].anzahl;

            ergebnis += "<tr><td style=\"text-align:right\">" + einkaufsliste.Daten[i].anzahl.toFixed(2) +
                "</td><td>" + einkaufsliste.Daten[i].einheit + "</td><td>" + einkaufsliste.Daten[i].artikel +
                "</td>" +
                "<td style=\"text-align:right\">" + einkaufsliste.Daten[i].anzahl.toFixed(2) + "</td>" +
                "<td> x </td>" +
                "<td style=\"text-align:right\">" + einzelpreis.toFixed(2) + " € </td>" +
                "<td> = </td>" +
                "<td style=\"text-align:right\">" + preis.toFixed(2) + " € </td></tr>";

            summe += preis;
        }

        ergebnis += "<tr><th></th><th></th><th style=\"text-align:right\" colspan=5>Summe:</th><th style=\"text-align:right;\">" + summe.toFixed(2) + " € </th></tr>";
        ergebnis += "</table>";

        return ergebnis;
    };

    return publicApi;
};