$(document).ready(function() {
    $(".dice").hide();
$(".rollable").click(function(){
    var die = $(this).attr("id");
    var value = "foobar"
    switch(die){
        case "d4":
            value = 4;
            break;
        case "d6":
            value = 6;
            break;
        case "d8":
            value = 8;
            break;
        case "d10":
            value = 10;
            break;
        case "d12":
            value = 12;
            break;
        case "d20":
            value = 20;
            break;
        case "d100":
            value = 100;
            break;
    }
    var result = Math.floor(Math.random() * value + 1);
    $('.rolling').text(result);
});

});
