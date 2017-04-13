QUnit.module("Einkaufsliste");

QUnit.test("Das Hinzufügen eines Rezeptes funktioniert.", function(assert) {

    var einkaufsliste = Einkaufsliste();
    var rezepte = Rezepte();

    einkaufsliste.FuegeRezeptHinzu("Gurkenwurstbrot", rezepte);

    assert.equal(einkaufsliste.Daten.length, 4, "Dafür sind 3 Zutaten notwendig.");

    assert.equal(2, einkaufsliste.Daten[0].anzahl, "2 Stück");
    assert.equal("Scheiben", einkaufsliste.Daten[0].einheit, "Einheit sind Scheiben");
    assert.equal("Brot", einkaufsliste.Daten[0].artikel, "Zutat Nr. 1 ist Brot");

    assert.equal(2, einkaufsliste.Daten[1].anzahl, "2 Stück");
    assert.equal("Scheiben", einkaufsliste.Daten[1].einheit, "Einheit sind Scheiben");
    assert.equal("Wurst", einkaufsliste.Daten[1].artikel, "Wurst");

    assert.equal(7, einkaufsliste.Daten[2].anzahl, "7");
    assert.equal("Scheiben", einkaufsliste.Daten[2].einheit, "Einheit sind Scheiben");
    assert.equal("Gurke", einkaufsliste.Daten[2].artikel, "Gurke");

    assert.equal(0.01, einkaufsliste.Daten[3].anzahl, "0.01");
    assert.equal("g", einkaufsliste.Daten[3].einheit, "Einheit sind g");
    assert.equal("Magarine", einkaufsliste.Daten[3].artikel, "Zutat Nr. 1 ist Brot");

});