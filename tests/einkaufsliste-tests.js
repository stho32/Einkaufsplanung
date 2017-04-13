QUnit.module("Einkaufsliste");

QUnit.test("Das Hinzufügen eines Rezeptes funktioniert.", function(assert) {
    var einkaufsliste = Einkaufsliste();
    var rezepte = Rezepte();

    einkaufsliste.FuegeRezeptHinzu("Gurkenwurstbrot", rezepte);

    assert.equal(einkaufsliste.Daten.length, 3, "Dafür sind 3 Zutaten notwendig.");

});