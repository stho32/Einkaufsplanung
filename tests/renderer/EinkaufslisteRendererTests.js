QUnit.module("Tests der Renderer");

QUnit.test("Rendern der Einkaufsliste als HTML-Tabelle", function(assert) {

    var einkaufsliste = Einkaufsliste();
    var rezepte = Rezepte();
    einkaufsliste.FuegeRezeptHinzu("Gurkenwurstbrot", rezepte);

    var renderer = EinkaufslisteAlsHtmlTabelleRenderer(einkaufsliste);

    var html = renderer.Render();

    $("#testzwischenausgabe").append("<strong>EinkaufslisteAlsHtmlTabelleRenderer / Gurkenwurstbrot</strong><br/>")
                             .append(html);


});