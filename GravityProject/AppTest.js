$(document).ready(function() {
    //Function that controls the range slider for the mass of the planet
    const sizerange = $('#changeSize');
    const sizeindicator = $('#indicator');
    sizerange.on('input',function () {
        const color = (sizerange.val() / 1000) * (1.75);
        const percentc = 255 - (color / 17.5) * 255;
        const cname = "rgba(30," + percentc + ", 255, 1)";

        //When user gets to max mass on slider
        if (sizerange.val() == 10000) {
            sizeindicator.html("MAX");
            sizeindicator.css("color", cname);
        }
        //When user gets to min mass on slider
        else if (sizerange.val() == 10) {
            sizeindicator.html("MIN");
            sizeindicator.css("color", cname);
        } else {
            sizeindicator.html(sizerange.val());
            sizeindicator.css("color", cname);
        }
    });

    //Function to turn on and off the sun
    var sunv = true;
    const sun = $('#sun');
    const sunvisible = $('#color');
    sunvisible.change(function () {
        const sun = $('#sun');
        if (!sunv){
            sunv = true;
            sun.css("display","block");
            if (starswitch) {
                slider.css("background-color","#b0dcff");}
            else{
                slider.css("background-color","orange");}
        }
        else{
            sunv = false;
            sun.css("display","none");
            slider.css("background-color","#2196F3");


        }
    })

    var info = $('#info-box');
    var title = $('#main-title');
    var option = $('#option-icon');
    var optioninfo = $('#option-box');
    var title_opened = false;
    var option_opened = false;
    var alloptions = $('.container');
    var title_gra = $('#main-title-gra');

    title.click( function () {
        if (!title_opened){
            info.css("right","168vh");
            title.text("Gravity Visualizer");
            title.css("color","black");
            title_gra.css("color","black");
            title.css('font-weight','bold');
            title_opened = true;}
        else{
            info.css("right","250vh");
            title.text("GraVisualizer");
            title.css("color","white");
            title_gra.css("color","#fabc14");
            title.css('font-weight','unset');
            title_opened= false;}
        })

    option.click(function () {
        if (!option_opened){
            option_opened =true;
            optioninfo.css(    "height", "25vh");
            optioninfo.css(    "width", "30vh");
            optioninfo.css(    "left", "85%");
            alloptions.css("display",'block');
            optioninfo.css("border","   0.2vh white dashed");
            optioninfo.css("background-color","rgba(217, 153, 23, 0.21)")
        }
        else{
            option_opened =false;
            optioninfo.css(    "height", "0");
            optioninfo.css(    "width", "0");
            optioninfo.css(    "left", "100%");
            alloptions.css("display",'none');
            optioninfo.css("border","   0.2vh black dashed");
            optioninfo.css("background-color","black");

        }
    })


    var option_back = $('#option-background');
    var option_star = $('#option-star');
    var option_gravity = $('#option-gravity');
    var option_planet = $('#option-planets');
    var slider = $('.slider');
    var bg = $('#background');
    var bgonoff = false;
    var starswitch = false;


    //Option to remove starry background for clearer visibility
    option_back.change(function () {
        if(!bgonoff){
            bg.css("background-image","unset");
            bgonoff = true;
        }
        else{
            bg.css("background-image","url(\"space.jpg\")");
            bgonoff = false;
        }
    });

    //Option to switch from regular sun to white dwarf sun
    option_star.change(function () {
        if(!starswitch){
            sun.css(    "width", "2.0125em");
            sun.css("height","2em");
            sun.css("box-shadow","0 0 6px 4px #b0dcff, 0 0 15px 5px #0f79e7, 0 0 11px 5px #86cddc")
            sun.css("background","linear-gradient(#eee, #ebebeb)")
            sun.css("animation","rotatewhitesun 5s linear infinite");
            slider.css("background-color","#b0dcff");
            starswitch = true;
        }
        else{
            sun.css(    "width", "3.025em");
            sun.css("height","3em");
            sun.css("box-shadow",  "0 0 6px 3px #fbe602, 0 0 10px 6px #e70f14, 0 0 14px 9px #fabc14");
            sun.css("background", "linear-gradient(white, #ffff00)");
            sun.css("animation","rotatesun 5s linear infinite");
            slider.css("background-color","orange");
            starswitch= false;
        }
    });

    //Option to turn off gravity
    option_gravity.change(function () {
        alert("working on it");
    })

    //Option to use preset planet sizes
    option_planet.change(function () {
        alert("working on it");
    })

    //Automatically closes option and info tab when user clicks on space
    var canvas = $('#canvas');
    canvas.click(function () {
        if (option_opened){
            option.trigger('click');
        }
        if (title_opened){
            title.trigger('click');
        }
    });

});

