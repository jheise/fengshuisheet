function addEdit(contain,character){
    contain.append("<div class='edit' id='"+character+"'></div>");
    var editdiv = contain.find(".edit");
    editdiv.append("<span class='editbutton' id='"+character+"'><button type='button'>Edit</button></span>");
    $(".editbutton#"+character).click(function(event){
        console.log( "you clicked edit on "+character );
        $(".schitickadd#"+character).slideToggle(0);
        $(".removethis").slideToggle(0);
    });
}

function addCharacter(character){
    console.log("addCharacter called for " + character)
    /* add a div for the character to the characters div */
    $('.characters').append( '<div class="character" id="' + character + '">' + "</div>");
    /* grab the div that just got made and add basic divs to be filled out */ 
    var contain = $(".character#"+character);
    contain.append("<span class='char_id'>"+ character + "</span>");
    contain.append("<div class='char_data'></div>");
    var char_data = contain.find(".char_data");

    loadInfo(char_data,character);
    loadSkills(char_data,character);
    loadSchiticks(char_data,character);
    loadAttacks(char_data,character);
    loadGear(char_data,character);

    /* all character info is loaded, create edit button and do things */
    addEdit(char_data,character);
}

$(document).ready(function() {
    $.get("../characters",function(content){
        var characters = $.parseJSON(content);
        for ( x in characters ){
            console.log("adding " + characters[x]);
            addCharacter(characters[x]);
        }
        /*$(".char_data").slideToggle(5);*/
        $(".char_id").click(function(event){
            console.log(".character has been clicked " + characters[x]);
            $(this).next(this).slideToggle(300);
            $(".dice").slideToggle(300);
        });
    });
});
