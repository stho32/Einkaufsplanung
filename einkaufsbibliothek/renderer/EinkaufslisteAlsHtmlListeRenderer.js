/**
 * Rendern der Einkaufsliste als <LI>-Elemente
 *
 * Gibt einfach den Inhalt der Einkaufsliste
 * als Listenelemente aus.
 * Das ist zwar nicht so schön wie eine Tabelle, aber
 * dafür viel platzsparender!
 *
 * @param einkaufsliste Einkaufsliste
 * @constructor
 */

var EinkaufslisteAlsHtmlListeRenderer = function(einkaufsliste) {
    var publicApi = {};

    publicApi.einkaufsliste = einkaufsliste;

    /**
     * Rendert die Html-Ausgabe
     *
     * @returns {string}
     */
    publicApi.Render = function() {
        var einkaufsliste = publicApi.einkaufsliste;
        var ergebnis = "";
        var anzahl = einkaufsliste.Daten.length;

        for (var i = 0; i < anzahl; i++) {
            ergebnis += "<li>" + einkaufsliste.Daten[i].anzahl.toFixed(2) + " " + einkaufsliste.Daten[i].einheit + " " + einkaufsliste.Daten[i].artikel + "</li>";
        }

        return ergebnis;
    };

    return publicApi;
};