$(document).ready(function() {
    const space = $('#space');

    //Function that controls the range slider for the mass of the planet
    const sizerange = $('#changeSize');
    const sizeindicator = $('#indicator');
    sizerange.click('input', function () {
        const color = (sizerange.val()/1000)*(1.75);
        const percentc = 255-(color/17.5)*255;
        const cname= "rgba(30,"+ percentc+", 255, 1)";

        //When user gets to max mass on slider
        if (sizerange.val()==10000){
            sizeindicator.html("MAX");
            sizeindicator.css("color", cname);
        }
        //When user gets to min mass on slider
        else if (sizerange.val()==10){
            sizeindicator.html("MIN");
            sizeindicator.css("color", cname);
        }
        else{
            sizeindicator.html(sizerange.val());
            sizeindicator.css("color", cname);
        }
    });

    //Track mouse position
    var posy = 0;
    var posx = 0;
    $(document).on('mousemove', function(e){
        posy = e.pageY;
        posx = e.pageX;
    });

    //Function that clears all planets out of the space
    const clearplanets = $('#clear-planets');
    clearplanets.click(function () {
        space.empty();
        space.append("<div id='sun'></div>");
        if(sunv){
            sun.css("display","block");
        }
        else{
            sun.css("display","none");}
    })

    //Function to turn on and off the sun
    var sunv = true;
    const sun = $('#sun');
    const sunvisible = $('#color');
    sunvisible.change(function () {
        const sun = $('#sun');
        if (!sunv){
            sunv = true;
            sun.css("display","block");
        }
        else{
            sunv = false;
            sun.css("display","none");
        }
    })

    space.mousedown(function () {

    })



    //Function that adds a planet at the location the user presses
    var planetcount = 0;
    space.mouseup(function() {
        //Create planet
        const planetname = "<span class='planet' id= planet-"+planetcount.toString();
        space.append(planetname+"></span");
        //Adjust position depending on mouse position
        const planetid = $('#planet-'+planetcount.toString());
        planetid.css("position","absolute");
        planetid.css("top",posy-7);
        planetid.css("left",posx-6);

        //Adjusts radius of planet depending on slider range value
        const planetsize = (sizerange.val()/1000)*(1.75);
        const percentcolor = 255-(planetsize/17.5)*255;
        const planetcolor = "rgba(30,"+ percentcolor+", 255, 1)";
        planetid.css("height",planetsize+"px");
        planetid.css("width",planetsize+"px");
        planetid.css("background-color",planetcolor);
        //planetid.css("border","0.1px white solid");
        //Increment planet id
        planetcount +=1;
    });

});








