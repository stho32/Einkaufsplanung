/**
 * 
 * Wir generieren eine zentrale HTML Seite. Alles wichtige passiert in Javascript.
 * 
 */

var rezepte = require("./stefans-rezepte/rezepte");
var ejs = require("ejs");
var fs = require("fs");

ejs.renderFile("views/pages/index.ejs", { rezepte : rezepte.Rezepte }, {}, function(err, html) {
    if ( err !== null ) {
        console.log("FEHLER : " + err);
        return;
    }

    fs.writeFile("public/index.html", html);

    console.log("index.html wurde erfolgreich erstellt!");
});
