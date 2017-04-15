describe("Die Rezepte", function() {

    describe("koennen nach ihrem Namen abgerufen werden.", function() {
        
        it("Sollte ein Rezept nicht zugreifbar sein, wird undefined zurückgegeben.", function() {

            var rezepte = Rezepte();
            expect(rezepte).toBeDefined();
            expect(rezepte.IstRezeptBekannt("Gurkenwurstbrot")).toBe(true);
            expect(rezepte.IstRezeptBekannt("Nicht bekanntes Rezept")).toBe(false);

        });

    });

});