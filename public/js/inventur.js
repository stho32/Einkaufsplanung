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


var Inventur = function inventur(selektor) {
    "use strict";

    var publicApi;

    function AktualisiereAnzeige() {
        $(selektor).html(AlsHtml());
    }

    function AktualisiereDaten(neueDaten) {
        publicApi.Daten = neueDaten;
        AktualisiereAnzeige();
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
        var summe = 0;

        for (var i = 0; i < anzahl; i++) {

            ergebnis += "<tr><td style=\"text-align:right\">" + publicApi.Daten[i].anzahl.toFixed(2) +  
                        "</td><td>" + publicApi.Daten[i].einheit + "</td><td>" + publicApi.Daten[i].artikel + 
                        "</td>" + 
                        "<td><input type=\"text\" class=\"form-control\" id=\"lagerbestand-" + i + "\"></input></td>" + 
                        "<td id=\"restbedarf-" + i + "\" data-anzahl=\"\" data-artikel=\"\" data-einheit=\"\"></td>" + 
                        "</tr>";
                        
        }        

        ergebnis += "</table>";

        return ergebnis;
    }

    /* Ruft die durch die Inventur ggf. manuell modifizierte 
       Ergebnisliste ab.
    */
    function ErgebnisEinkaufsliste() {
        
    }

    publicApi = {
        AktualisiereDaten : AktualisiereDaten,
        AlsHtml : AlsHtml,
        ErgebnisEinkaufsliste : ErgebnisEinkaufsliste
    };
}