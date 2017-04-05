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
var Einkaufsliste = require("einkaufsliste.js");


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