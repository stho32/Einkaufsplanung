QUnit.module("Lieferant - Rewe");

QUnit.test( "Zugriff auf die Umrechnungen von Rewe", function(assert) {

    var umrechnungen = Umrechnungen();

    assert.equal(22, umrechnungen.length, "Zugriff auf die Umrechnungen von Rewe")

} );