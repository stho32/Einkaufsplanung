QUnit.test( "Der Zugriff auf die Rezeptdaten über das Array funktioniert.", function( assert ) {

    var rezepte = Rezepte();

    assert.equal(rezepte.Rezepte.length, 15, "Es sind aktuell 15 Rezepte verfügbar.");

});


QUnit.test( "Prüfung, ob ein Rezept verfügbar ist", function( assert ) {

    var rezepte = Rezepte();

    assert.equal(true, rezepte.IstRezeptBekannt("Gurkenwurstbrot"), "Gurkenwurstbrot ist als Rezept bekannt.");
    assert.equal(false, rezepte.IstRezeptBekannt("Schurkenwurstbrot"), "Ein Schurkenwurstbrot ist nicht bekannt.");

    assert.equal(true, rezepte.IstRezeptBekannt("1"), "Gurkenwurstbrot ist als Rezept bekannt. (nach ID)");
    assert.equal(false, rezepte.IstRezeptBekannt("1000000000"), "Unbekannte ID");


    var gurkenwurstbrot = rezepte.Rezept("Gurkenwurstbrot");

    assert.equal("Brot", gurkenwurstbrot.zutaten[0].artikel, "Zutat Nr. 1 ist Brot");
    assert.equal(2, gurkenwurstbrot.zutaten[1].anzahl, "2 Stück");
    assert.equal("Scheiben", gurkenwurstbrot.zutaten[2].einheit, "Einheit sind Scheiben");

    var unbekanntesRezept = rezepte.Rezept("Unbekanntes Rezept");

    assert.equal(undefined, unbekanntesRezept, "Wenn ein Rezept unbekannt ist, dann wird undefined zurückgegeben.")

});

