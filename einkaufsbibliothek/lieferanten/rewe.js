/**
 * 
 * Einkauf über REWE
 * 
 */


function Umrechnungen()
{
    return [
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
        {
            einheit: "Glass",
            artikel: "Apfelmus",
            umrechnung: function(anzahl) {
                return { anzahl: anzahl, einheit: "Glass", artikel: "Apfelmus Glass 350g"}
            },
            einzelpreis : 1.09
        }

    ];
}