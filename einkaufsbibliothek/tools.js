function toCountByItem(items)
{
    var ergebnis = {};

    for ( var i = 0; i < items.length; i++ ) {
        if ( ergebnis[items[i]] === undefined ) {
            ergebnis[items[i]] = 1;
        }
        else {
            ergebnis[items[i]] += 1;
        }
    }

    return ergebnis;
}

module.exports = {
    toCountByItem : toCountByItem
};