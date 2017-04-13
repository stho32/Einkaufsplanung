/**
 * 
 * Diese Datei beinhaltet die Rezepte, die die Anwendung kennt. 
 * 
 * 
 */

function Rezepte() {
    "use strict";

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
                        { anzahl: 7, einheit: "Scheiben", artikel: "Gurke" },
                        { anzahl: 0.01, einheit: "g", artikel: "Magarine" }
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
                        { anzahl: 1, einheit: "Glas", artikel: "Apfelmus" }
                    ]
            },
            {
                rezeptNummer: "6",
                name: "Wurstkartoffeln",
                zutaten:
                    [
                        { anzahl: 250, einheit: "g", artikel: "Kartoffeln" },
                        { anzahl: 2.5, einheit: "Stück", artikel: "Würstchen" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Zwiebel" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Knoblauchzehe" },
                        { anzahl: 0.5, einheit: "tl", artikel: "Paprikapulver"},
                        { anzahl: 0.5, einheit: "tl", artikel: "Majoran"},
                        { anzahl: 20, einheit: "ml", artikel: "Ketchup" },
                    ]
            },
            {
                rezeptNummer: "7",
                name: "Bratkartoffeln",
                zutaten:
                    [
                        { anzahl: 250, einheit: "g", artikel: "Kartoffeln" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Zwiebel" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Knoblauchzehe" },
                        { anzahl: 125.0 / 2, einheit: "g", artikel: "Schinkenwürfel"},
                        { anzahl: 0.5, einheit: "tl", artikel: "Majoran"},
                        { anzahl: 20, einheit: "ml", artikel: "Ketchup" }
                    ]
            },
            {
                rezeptNummer: "8",
                name: "Schlesischer Gurkensalat",
                zutaten:
                    [
                        { anzahl: 0.25, einheit: "Stück", artikel: "Gurke" },
                        { anzahl: 0.01, einheit: "g", artikel: "Salz" },
                        { anzahl: 0.01, einheit: "g", artikel: "Pfeffer" },
                        { anzahl: 0.25, einheit: "Esslöffel", artikel: "Geschmacksneutrales Öl" },
                        { anzahl: 0.25, einheit: "Esslöffel", artikel: "Essig/Essigessenz"},
                        { anzahl: 0.01, einheit: "g", artikel: "Zucker"},
                        { anzahl: 0.5, einheit: "Esslöffel", artikel: "gehackter Dill" }
                    ]
            },
            {
                rezeptNummer: "9",
                name: "Korsische Kartoffelpfanne",
                zutaten:
                    [
                        { anzahl: 150, einheit: "g", artikel: "Kartoffeln" },
                        { anzahl: 1, einheit: "Esslöffel", artikel: "Olivenöl" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Paprikaschote (rot + gelb)" },
                        { anzahl: 50, einheit: "g", artikel: "Zuccini" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Frühlingszwiebel"},
                        { anzahl: 0.25, einheit: "Zweig", artikel: "Oregano"},
                        { anzahl: 0.25, einheit: "Zweig", artikel: "Rosmarin"},
                        { anzahl: 0.25, einheit: "Stück", artikel: "Knoblauchzehe" },
                        { anzahl: 25, einheit: "g", artikel: "schwarze Oliven" },
                        { anzahl: 25, einheit: "g", artikel: "Schafskäse" },
                        { anzahl: 0.01, einheit: "g", artikel: "Salz" },
                        { anzahl: 0.01, einheit: "g", artikel: "Pfeffer" },
                        { anzahl: 0.01, einheit: "g", artikel: "Muskat" },
                    ]
            },
            {
                rezeptNummer: "10",
                name: "Gefüllte Paprika",
                zutaten:
                    [
                        { anzahl: 1, einheit: "Stück", artikel: "Paprika" },
                        { anzahl: 125, einheit: "g", artikel: "Rind" },
                        { anzahl: 0.25, einheit: "Bund", artikel: "Schnittlauch, klein geschnitten" },
                        { anzahl: 0.25, einheit: "Stück", artikel: "Zuccini, klein geschnitten" },
                        { anzahl: 25, einheit: "g", artikel: "Feta Käse" },
                        { anzahl: 0.01, einheit: "g", artikel: "Salz" },
                        { anzahl: 0.01, einheit: "g", artikel: "Pfeffer" },
                        { anzahl: 0.01, einheit: "g", artikel: "Paprikapulver" },
                    ]
            },
            {
                rezeptNummer: "11",
                name: "Chop Suey mit Rinderfilet und Reis",
                zutaten:
                    [
                        { anzahl: 0.5, einheit: "Beutel", artikel: "Basmati-Reis" },
                        { anzahl: 150, einheit: "g", artikel: "Rinderfilet" },
                        { anzahl: 1, einheit: "Stück", artikel: "Karotte" },
                        { anzahl: 0.5, einheit: "Bund", artikel: "Frühlingszwiebel" },
                        { anzahl: 1, einheit: "Stück", artikel: "Paprikaschote (rot)" },
                        { anzahl: 0.5, einheit: "Glass", artikel: "Mungobohnenkeimlinge" },
                        { anzahl: 2.5, einheit: "Stück", artikel: "Champignons" },
                        { anzahl: 2, einheit: "Esslöffel", artikel: "Sojasoße, dunkel" },
                        { anzahl: 0.5, einheit: "Teelöffel", artikel: "Brühe" },
                        { anzahl: 0.5, einheit: "Teelöffel", artikel: "Speisestärke" },
                        { anzahl: 0.01, einheit: "g", artikel: "Salz" },
                        { anzahl: 0.01, einheit: "g", artikel: "Pfeffer" },
                        { anzahl: 0.5, einheit: "Messerspitze", artikel: "Sambal Oelek" },
                        { anzahl: 0.01, einheit: "g", artikel: "Öl" },
                    ]
            },
            {
                rezeptNummer: "12",
                name: "Rinderfilet mit Paprika",
                zutaten:
                    [
                        { anzahl: 150, einheit: "g", artikel: "Rinderfilet" },
                        { anzahl: 0.25, einheit: "Bund", artikel: "Frühlingszwiebel" },
                        { anzahl: 1, einheit: "Stück", artikel: "Paprikaschote (rot/gelb)" },
                        { anzahl: 0.5, einheit: "Stück", artikel: "Knoblauchzehe" },
                        { anzahl: 0.5, einheit: "Teelöffel", artikel: "Rosmarin, frisch gehackt" },
                        { anzahl: 0.5, einheit: "Teelöffel", artikel: "Olivenöl" },
                        { anzahl: 0.5, einheit: "Esslöffel", artikel: "Sojasauce" },
                        { anzahl: 0.5, einheit: "Esslöffel", artikel: "Sherry" },
                        { anzahl: 0.01, einheit: "g", artikel: "Salz" },
                        { anzahl: 0.01, einheit: "g", artikel: "Pfeffer" },
                    ]
            },

            {
                rezeptNummer: "1000",
                name: "Reinigungsmittel",
                zutaten:
                    [
                        { anzahl: 1, einheit: "Flasche", artikel: "Geschirrspülmittel" },
                        { anzahl: 1, einheit: "Flasche", artikel: "Perwoll Wolle und Feines" },
                        { anzahl: 1, einheit: "Flasche", artikel: "Haarwaschzeug" },
                        { anzahl: 1, einheit: "Flasche", artikel: "Duschlotion" },
                        { anzahl: 1, einheit: "Tube", artikel: "Zahnpasta" },
                        { anzahl: 1, einheit: "Flasche", artikel: "Handwaschspender" },
                        { anzahl: 1, einheit: "Flasche", artikel: "Essigreiniger" },
                        { anzahl: 3, einheit: "Stück", artikel: "Lappen" },
                        { anzahl: 3, einheit: "Stück", artikel: "Topfschwämme" },
                        { anzahl: 3, einheit: "Rolle", artikel: "Toilettenpapier" },
                        { anzahl: 3, einheit: "Packung", artikel: "Taschentücher" },
                        { anzahl: 1, einheit: "Flasche", artikel: "W5 eco WC Reiniger"}
                    ]
            },

            {
                rezeptNummer: "5000",
                name: "Rezeptunabhängige Ergänzungsnahrung",
                zutaten:
                    [
                        { anzahl: 1, einheit: "Stück", artikel: "Paprikamix" },
                        { anzahl: 1, einheit: "Stück", artikel: "Romarispentomaten" },
                        { anzahl: 1, einheit: "Stück", artikel: "Sonnenblumenmagarine" },
                        { anzahl: 1, einheit: "Stück", artikel: "Kartoffelsalat" },
                        { anzahl: 1, einheit: "Stück", artikel: "Bautzener Tafel-Essig" },
                        { anzahl: 1, einheit: "Stück", artikel: "Rahmspinat" },
                        { anzahl: 1, einheit: "Liter", artikel: "Rapsöl zum Braten"}
                    ]
            },

            {
                rezeptNummer: "9000",
                name: "Samstagsaufgaben",
                zutaten:
                    [
                        { anzahl: 1, einheit: "Mal", artikel: "Friseur?" },
                        { anzahl: 1, einheit: "Mal", artikel: "Morgentraining" },
                        { anzahl: 1, einheit: "Mal", artikel: "Wäsche waschen" },
                        { anzahl: 1, einheit: "Mal", artikel: "Abrechnung durchführen" },
                        { anzahl: 1, einheit: "Mal", artikel: "Sockenvorrat prüfen" },
                        { anzahl: 1, einheit: "Mal", artikel: "Pflanzen gießen" },
                        { anzahl: 1, einheit: "Mal", artikel: "Müll raus"},
                        { anzahl: 1, einheit: "Mal", artikel: "Wischwasser austauschen"},
                        { anzahl: 1, einheit: "Mal", artikel: "Ein bisschen Abwaschen"}
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

    /**
     * Sucht ein Rezept aus der Liste heraus und gibt dieses zurück.
     * Wird das Rezept nicht gefunden, so wird undefined zurückgegeben.
     *
     * @return object|{undefined}
     */
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

    return publicApi;
}


