QUnit.module("Tests der Renderer");

QUnit.test("Rendern der Einkaufsliste als HTML-Tabelle", function(assert) {

    var einkaufsliste = Einkaufsliste();
    var rezepte = Rezepte();
    einkaufsliste.FuegeRezeptHinzu("Gurkenwurstbrot", rezepte);

    var renderer = EinkaufslisteAlsHtmlTabelleRenderer(einkaufsliste);

    var html = renderer.Render();

    $("#testzwischenausgabe").append("<strong>EinkaufslisteAlsHtmlTabelleRenderer / Gurkenwurstbrot</strong><br/>")
                             .append(html);

    assert.ok(html.indexOf("Gurke") > -1, "Gurke ist vorhanden");
    assert.ok(html.indexOf("Wurst") > -1, "Wurst ist vorhanden");
    assert.ok(html.indexOf("Brot")  > -1, "Brot ist vorhanden");
    assert.ok(html.indexOf("Magarine") > -1, "Magarine ist vorhanden");
    assert.ok(html.indexOf("undefined") === -1, "undefined darf nicht im Output sein");
});