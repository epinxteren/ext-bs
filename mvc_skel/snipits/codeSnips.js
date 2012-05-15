/************************
 * Opening from assosiation
 ************************/

movieGridSelChange(view, selection) {
    if (!selection.length) {
        return;
    }
    var movie = selection [0];
    var actors = movie.actors();
    actorsGrid.reconfigure(actors);
}



//GRID WERKT NIET met assosiation, gebruik hiervoor:
/*
{
    text:'Artist',
        renderer: function(value, meta, record, rowIndex, colIndex, store, view) {
    return record.getArtist().get("name");
    }
}
*/


//Mapping werkt niet teglijk met assosiation