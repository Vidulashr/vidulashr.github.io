var range = document.getElementById("changeSize").value;
for (i = 0;i<range;i++){
    createArray(range,i);
}


//slider for color
var colortoggle = document.getElementById("color");
var background = document.body;
var head = document.getElementById("header");
var line1 = document.getElementById("horline");
var line2 = document.getElementById("horline2");
var arraysize = document.getElementById("slide_title");
var slidevalue = document.getElementById("indicator");
var title = document.getElementById("maintitle");
var lines1 = document.getElementById("line1");
var lines2 = document.getElementById("line2");
var lines3 = document.getElementById("line3");
var sortbutton = document.getElementById("sort");
var comparebutton = document.getElementById("compare");
var resetbutton = document.getElementById("reset");
var helpbutton = document.getElementById("myBtn");
var algonames = document.getElementsByClassName("algo-options");
var allnames = document.getElementsByClassName("allname");
var speedtitle = document.getElementById("speed_title");

colortoggle.addEventListener('change',e =>{
    if (!e.target.checked){
        background.style.backgroundImage ="linear-gradient(#D3D3D3,white)";
        line1.style.backgroundColor = "black";
        line2.style.backgroundColor = "dimgrey";
        head.style.backgroundColor="#D3D3D3";
        arraysize.style.color = "black";
        slidevalue.style.color = "dimgrey";
        title.style.color = "black";
        speedtitle.style.color = "black";
        lines1.style.backgroundColor = "black";
        lines2.style.backgroundColor = "black";
        lines3.style.backgroundColor = "black";
        sortbutton.style.border = "0.16em solid black";
        comparebutton.style.border = "0.16em solid black";
        resetbutton.style.border = "0.16em solid black";
        helpbutton.style.color = "black";
        if (selected!==null){
            if (selected===optioninsert){optioninsert.style.color="orange";}
            if (selected===optionbubble){optionbubble.style.color="orange";}
            if (selected===optionselect){optionselect.style.color="orange";}
            if (selected===optionshell){optionshell.style.color="orange";}
            if (selected===optionquick){optionquick.style.color="orange";}
            if (selected===optionmerge){optionmerge.style.color="orange";}}

        for (i in algonames) {
            algonames[i].style.color = 'black';
        }
        for (y in allnames) {
            allnames[y].style.color = 'dimgrey';
        }
    }
    else{
        background.style.backgroundImage ="linear-gradient(black, #161616)";
        line1.style.backgroundColor = "orange";
        line2.style.backgroundColor = "dodgerblue";
        head.style.backgroundColor="black";
        arraysize.style.color = "white";
        slidevalue.style.color = "lightblue";
        title.style.color = "white";
        speedtitle.style.color = "white";
        lines1.style.backgroundColor = "white";
        lines2.style.backgroundColor = "white";
        lines3.style.backgroundColor = "white";
        sortbutton.style.border = "0.16em solid white";
        comparebutton.style.border = "0.16em solid white";
        resetbutton.style.border = "0.16em solid white";
        helpbutton.style.color = "white";
        if (selected!==null){
            if (selected===optioninsert){optioninsert.style.color="orange";}
            if (selected===optionbubble){optionbubble.style.color="orange";}
            if (selected===optionselect){optionselect.style.color="orange";}
            if (selected===optionshell){optionshell.style.color="orange";}
            if (selected===optionquick){optionquick.style.color="orange";}
            if (selected===optionmerge){optionmerge.style.color="orange";}}
        for (i in algonames) {
            algonames[i].style.color = 'white';
        }
        for (y in allnames) {
            allnames[y].style.color = 'lightskyblue';
        }
    }
})


var selected=null;
var optioninsert = document.getElementById("insert");
var optionselect = document.getElementById("select");
var optionbubble = document.getElementById("bubble");
var optionmerge = document.getElementById("merge");
var optionquick = document.getElementById("quick");
var optionshell = document.getElementById("shell");



//var minimize = document.getElementById("footclose");
//var textbox = document.getElementById("text");
//minimize.onclick=(function () {
//    textbox.style.height = "10px";
//})


//Changes array size depending on slider range
var slider = document.getElementById("changeSize");

slider.addEventListener('input',function () {
    clearArray();
    for (i = 0;i<slider.value;i++){
        createArray(slider.value,i+1);
    }
    speed = 1000/slider.value;
    incr = speed*(slider.value/100);

    if (slider.value==100){
        slidevalue.textContent = "MAX";
        slidevalue.style.color = "darkorange";
    }
    else if(slider.value==4){
        slidevalue.textContent = "MIN";
        slidevalue.style.color = "darkorange";
    }
    else{slidevalue.textContent = slider.value;
        slidevalue.style.color = "lightblue";}
 })

var speed = 1000/slider.value;
var incr =  speed*(slider.value/100);

optioninsert.addEventListener('click',function () {
    var x = document.getElementById("colortoggle").checked;
    if (!x){
        optionshell.style.color="black";
        optionselect.style.color="black";
        optionbubble.style.color="black";
        optionmerge.style.color="black";
        optionquick.style.color="black";
        optioninsert.style.color="orange";
    }
    else{
        optionshell.style.color="white";
        optionselect.style.color="white";
        optionbubble.style.color="white";
        optionmerge.style.color="white";
        optionquick.style.color="white";
        optioninsert.style.color="orange";}
    selected = optioninsert;
})

optionmerge.addEventListener('click',function () {
    var x = document.getElementById("colortoggle").checked;
    if (!x){
        optionshell.style.color="black";
        optionselect.style.color="black";
        optionbubble.style.color="black";
        optioninsert.style.color="black";
        optionquick.style.color="black";
        optionmerge.style.color="orange";
    }
    else{
        optionshell.style.color="white";
        optionselect.style.color="white";
        optionbubble.style.color="white";
        optioninsert.style.color="white";
        optionquick.style.color="white";
        optionmerge.style.color="orange";}
        selected = optionmerge;
})

optionselect.addEventListener('click',function () {
    var x = document.getElementById("colortoggle").checked;
    if (!x){
        optionshell.style.color="black";
        optioninsert.style.color="black";
        optionbubble.style.color="black";
        optionmerge.style.color="black";
        optionquick.style.color="black";
        optionselect.style.color="orange";
    }
    else{
        optionshell.style.color="white";
        optioninsert.style.color="white";
        optionbubble.style.color="white";
        optionmerge.style.color="white";
        optionquick.style.color="white";
        optionselect.style.color="orange";}
        selected = optionselect;
})

optionshell.addEventListener('click',function () {
    var x = document.getElementById("colortoggle").checked;
    if (!x){
        optioninsert.style.color="black";
        optionselect.style.color="black";
        optionbubble.style.color="black";
        optionmerge.style.color="black";
        optionquick.style.color="black";
        optionshell.style.color="orange";
    }
    else{
        optioninsert.style.color="white";
        optionselect.style.color="white";
        optionbubble.style.color="white";
        optionmerge.style.color="white";
        optionquick.style.color="white";
        optionshell.style.color="orange";}
        selected = optionshell;
})

optionquick.addEventListener('click',function () {
    var x = document.getElementById("colortoggle").checked;
    if (!x){
        optionshell.style.color="black";
        optionselect.style.color="black";
        optionbubble.style.color="black";
        optionmerge.style.color="black";
        optioninsert.style.color="black";
        optionquick.style.color="orange";
    }
    else{
    optionshell.style.color="white";
    optionselect.style.color="white";
    optionbubble.style.color="white";
    optionmerge.style.color="white";
    optioninsert.style.color="white";
    optionquick.style.color="orange";}
    selected = optionquick;
})

optionbubble.addEventListener('click',function () {
    var x = document.getElementById("colortoggle").checked;
    if (!x){
        optionshell.style.color="black";
        optionselect.style.color="black";
        optioninsert.style.color="black";
        optionmerge.style.color="black";
        optionquick.style.color="black";
        optionbubble.style.color="orange";
    }
    else{
    optionshell.style.color="white";
    optionselect.style.color="white";
    optioninsert.style.color="white";
    optionmerge.style.color="white";
    optionquick.style.color="white";
    optionbubble.style.color="orange";}
    selected = optionbubble;

})



var sort = document.getElementById("sort");
var reset = document.getElementById("reset");
var arraytitle = document.getElementById("slide_title");
var allbutton = document.getElementById("compare");
var helpbutton = document.getElementById("myBtn");
var spinner = document.getElementById("loader");
var slider2 = document.getElementById("changeSpeed"); //speed
var speedcontainer = document.getElementById("speedcontainer");

//Changes speed of sorting
slider2.addEventListener('input',function () {
    speed = slider2.value/slider.value;
    incr = speed*(slider.value/(0.1*slider2.value));
})




sort.onclick=(function () {
    slider.style.display = "none";
    arraytitle.style.display ="none";
    slidevalue.style.display="none";
    allbutton.style.display="none";
    helpbutton.style.display="none";
    spinner.style.animationPlayState ="running";
    spinner.style.display="inline-block";
    slider2.style.display="inline-block";
    speedcontainer.style.display="inline-block";



    if (selected===null){
        modal2.style.display = "block";
        slider.style.display = "inline-block";
        arraytitle.style.display ="initial";
        slidevalue.style.display="initial";
        allbutton.style.display="initial";
        helpbutton.style.display="initial";
        spinner.style.animationPlayState ="paused";
        spinner.style.display="none";
        slider2.style.display="none";
        speedcontainer.style.display="none";
    }

    else if (selected===optionselect){
        selectionSort2(0,"bodycontainer");
        sort.style.display = "none";
        reset.style.display = "inline-block";
    }

    else if (selected===optioninsert){
        insertionSort(1,0,0,"bodycontainer");
        sort.style.display = "none";
        reset.style.display = "inline-block";
    }

    else if (selected===optionbubble){
        bubbleSort(slider.value-1,"bodycontainer");
        sort.style.display = "none";
        reset.style.display = "inline-block";
    }

    else if (selected===optionmerge){
        shellSort(0,slider.value-1,"bodycontainer");
        sort.style.display = "none";
        reset.style.display = "inline-block";
    }

    //SHELL IS NOW COCKTAIL
    else if (selected===optionshell){
        cocktailSort1(0,slider.value-1,"bodycontainer",0);
        sort.style.display = "none";
        reset.style.display = "inline-block";
    }

    //QUICK IS NOW HEAP
    else if (selected===optionquick){
        maxheap(slider.value-1,"bodycontainer");
        sort.style.display = "none";
        reset.style.display = "inline-block";
    }

    else {
        alert("working on it");
        slider.style.display = "inline-block";
        arraytitle.style.display ="initial";
        slidevalue.style.display="initial";
        allbutton.style.display="initial";
        helpbutton.style.display="initial";
        spinner.style.animationPlayState ="paused";
        spinner.style.display="none";
    }
})

allbutton.onclick=(function () {
    //creates copy
    var mainbody = document.getElementById("tiles");
    slider.style.display = "none";
    arraytitle.style.display ="none";
    slidevalue.style.display="none";
    allbutton.style.display="none";
    sort.style.display = "none";
    helpbutton.style.display="none";
    spinner.style.display="inline-block";
    spinner.style.animationPlayState ="running";
    slider2.style.display="inline-block";
    speedcontainer.style.display="inline-block";


    reset.style.display = "inline-block";
    var all = document.getElementById("bodycontainer");
    var parent = document.getElementById("tiles");
    var clone = all.cloneNode(true);
    clone.setAttribute("id","bodycontainer2");
    clone.style.transform = "rotate(180deg)";
    clone.style["display"] = "inline-block";
    clone.style.textAlign= "center";
    clone.style.width = "49%";
    parent.appendChild(clone);

    var clone2 = all.cloneNode(true);
    clone2.setAttribute("id","bodycontainer3");
    clone2.style.transform = "rotate(180deg)";
    clone2.style["display"] = "inline-block";
    clone2.style.textAlign= "center";
    clone2.style.width = "50%";
    parent.appendChild(clone2)

    var clone3 = all.cloneNode(true);
    clone3.setAttribute("id","bodycontainer4");
    clone3.style.transform = "rotate(180deg)";
    clone3.style["display"] = "inline-block";
    clone3.style.textAlign= "center";
    clone3.style.width = "50%";
    parent.appendChild(clone3);

    var clone4 = all.cloneNode(true);
    clone4.setAttribute("id","bodycontainer5");
    clone4.style.transform = "rotate(180deg)";
    clone4.style["display"] = "inline-block";
    clone4.style.textAlign= "center";
    clone4.style.width = "100%";
    parent.appendChild(clone4);




    all.style.width = "50%";
    all.style.display = "inline-block";


    rescale();


    //naming
    var selectname = document.createElement("a");
    selectname.innerText= "SELECTION SORT";
    selectname.style.fontFamily = 'Montserrat';
    selectname.style.fontSize = 'large';
    selectname.style.color = "dodgerblue";
    selectname.style.fontWeight = "bold";
    selectname.style.width = "50%";
    selectname.style.textAlign = "center";
    selectname.style["display"] = "inline-block";
    selectname.setAttribute("class","allname");


    var bubblename = document.createElement("a");
    bubblename.innerText= "BUBBLE SORT";
    bubblename.style.fontFamily = 'Montserrat';
    bubblename.style.fontSize = 'large';
    bubblename.style.color = "dodgerblue";
    bubblename.style.fontWeight = "bold";
    bubblename.style.width = "50%";
    bubblename.style.textAlign = "center";
    bubblename.style["display"] = "inline-block";
    bubblename.setAttribute("class","allname");


    var insertname = document.createElement("a");
    insertname.innerText= "INSERTION SORT";
    insertname.style.fontFamily = 'Montserrat';
    insertname.style.fontSize = 'large';
    insertname.style.color = "dodgerblue";
    insertname.style.fontWeight = "bold";
    insertname.style.width = "50%";
    insertname.style.textAlign = "center";
    insertname.style["display"] = "inline-block";
    insertname.setAttribute("class","allname");


    var cocktailname = document.createElement("a");
    cocktailname.innerText= "COCKTAIL SORT";
    cocktailname.style.fontFamily = 'Montserrat';
    cocktailname.style.fontSize = 'large';
    cocktailname.style.color = "dodgerblue";
    cocktailname.style.fontWeight = "bold";
    cocktailname.style.width = "50%";
    cocktailname.style.textAlign = "center";
    cocktailname.style["display"] = "inline-block";
    cocktailname.setAttribute("class","allname");

    var heapname = document.createElement("a");
    heapname.innerText= "HEAP SORT";
    heapname.style.fontFamily = 'Montserrat';
    heapname.style.fontSize = 'large';
    heapname.style.color = "dodgerblue";
    heapname.style.fontWeight = "bold";
    heapname.style.width = "100%";
    heapname.style.textAlign = "center";
    heapname.style["display"] = "inline-block";
    heapname.setAttribute("class","allname");



    mainbody.insertBefore(bubblename,all);
    mainbody.insertBefore(selectname,bubblename);
    mainbody.insertBefore(cocktailname,clone2);
    mainbody.insertBefore(insertname,cocktailname);
    mainbody.insertBefore(heapname,clone4);


    //start algos
    selectionSort2(0,"bodycontainer");
    bubbleSort(slider.value-1,"bodycontainer2");
    insertionSort(1,0,0,"bodycontainer3");
    cocktailSort1(0,slider.value-1,"bodycontainer4",0);
    maxheap(slider.value-1,"bodycontainer5");

})

//rescales size of tiles
function rescale(){
    var e = document.getElementById("bodycontainer").querySelectorAll(".tile");
    for (let y = 0;y<e.length;y++){
        var newheight = parseInt(e[y].style.getPropertyValue("height"),10)/2;
        var newwidth = parseInt(e[y].style.getPropertyValue("width"),10)/2;
        e[y].style.height = newheight+"px";
        e[y].style.width = newwidth+"px";
    }
    var e2 = document.getElementById("bodycontainer2").querySelectorAll(".tile");
    for (let y = 0;y<e2.length;y++){
        var newheight2 = parseInt(e2[y].style.getPropertyValue("height"),10)/2;
        var newwidth2 = parseInt(e2[y].style.getPropertyValue("width"),10)/2;
        e2[y].style.height = newheight2+"px";
        e2[y].style.width = newwidth2+"px";
    }

    var e3 = document.getElementById("bodycontainer3").querySelectorAll(".tile");
    for (let y = 0;y<e3.length;y++){
        var newheight3 = parseInt(e3[y].style.getPropertyValue("height"),10)/2;
        var newwidth3 = parseInt(e3[y].style.getPropertyValue("width"),10)/2;
        e3[y].style.height = newheight3+"px";
        e3[y].style.width = newwidth3+"px";
    }

    var e4 = document.getElementById("bodycontainer4").querySelectorAll(".tile");
    for (let y = 0;y<e4.length;y++){
        var newheight4 = parseInt(e4[y].style.getPropertyValue("height"),10)/2;
        var newwidth4 = parseInt(e4[y].style.getPropertyValue("width"),10)/2;
        e4[y].style.height = newheight4+"px";
        e4[y].style.width = newwidth4+"px";
    }

    var e5 = document.getElementById("bodycontainer5").querySelectorAll(".tile");
    for (let y = 0;y<e5.length;y++){
        var newheight5 = parseInt(e5[y].style.getPropertyValue("height"),10)/2;
        var newwidth5 = parseInt(e5[y].style.getPropertyValue("width"),10)/2;
        e5[y].style.height = newheight5+"px";
        e5[y].style.width = newwidth5+"px";
    }
}

//Removes all tiles from array
function clearArray() {
    var e = document.getElementById("bodycontainer");
    //e.firstElementChild can be used.
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

//creates tile
function createArray(width,n) {
    var id = n.toString();
    var h = Math.floor(Math.random() * 500) + 10;
    var w = 500/width*1.5;
    // create a new div element
    var tile = document.createElement("div");
    tile.style["width"] = w+'px';
    tile.style.height = h+'px';
    tile.style["marginRight"] = "5px";
    tile.style["backgroundColor"] = "white";
    tile.style["position"]= "relative";
    tile.style["display"] = "inline-block";
    tile.setAttribute("class","tile");
    tile.setAttribute("id",id);
    document.getElementById("bodycontainer").appendChild(tile);
}

//swaps position of two tiles
function swap(node1,node2){
    var e = document.getElementById("bodycontainer");
    node2_copy = node2.cloneNode(true);
    e.insertBefore(node2_copy, node1);
    e.insertBefore(node1, node2);
    e.removeChild(node2, node2_copy);

}

function animateColor(i,color,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    if (color===1){
        e[i].style.backgroundColor= "grey";}
    else if (color===2){
        e[i].style.backgroundColor= "white";
    }
    else{
        e[i].style.backgroundColor="orange";
    }
}

//If sorting is complete return true
function sorted(container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    var start = e[0];
    var check = true;
    for (let y = 0;y<e.length-1;y++){
        if ((parseInt(start.nextElementSibling.style.getPropertyValue("height"), 10))<(parseInt(start.style.getPropertyValue("height"), 10))){
            check=false;
        }
        start = start.nextElementSibling;
    }
    return check;
}



function colorflash(container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    var start = e[0];
    for (let y = 0;y<e.length+1;y++){
        start.style.backgroundColor="darkgrey";
        start = start.nextElementSibling;
    }
}

function colorflash2(n,except,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = n;y<e.length;y++){
        if (y===except){
            e[y].style.backgroundColor="#DC143C";
        }
        else{
            e[y].style.backgroundColor="white";}
    }
}
function colorflash3(n,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = 0;y<n;y++){
        e[y].style.backgroundColor="white";
    }
}

function colorflash4(n,s,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = e.length-1;y>=n;y--){
        e[y].style.backgroundColor="white";
    }
    for (let y = 0;y<s;y++){
        e[y].style.backgroundColor="orange";
    }
}

function colorcock1(n,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = n;y<e.length;y++){
        e[y].style.backgroundColor="orange";
    }
}
function colorcock2(n,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = 0;y<n;y++){
        e[y].style.backgroundColor="orange";
    }
}

function colorheap(n,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = 0;y<n;y++){
        e[y].style.backgroundColor="white";
    }
}

function colorinbetween(v,n,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    for (let y = v;y<n;y++){
        e[y].style.backgroundColor="white";
    }
}



//Complete
function bubbleSort(end,container) {
    var e = document.getElementById(container).querySelectorAll(".tile");
    var currentnode = 0;
    var id = setInterval(frame,speed);
    function frame() {
        colorflash3(end,container);
        if (end===0){
            colorflash(container);
            clearInterval(id);
        }
        else if (sorted(container)){
            colorflash(container);
            clearInterval(id);
        }
        else if (currentnode === end) {
            clearInterval(id);
            animateColor(end,3,container);
            bubbleSort(end-1,container);//reset node
        }
        else{
            if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))>(parseInt(e[currentnode].nextElementSibling.style.getPropertyValue("height"),10))){
                e[currentnode].style.backgroundColor="#DC143C";
                e[currentnode].nextElementSibling.style.backgroundColor="#DC143C";
                var h1 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                e[currentnode].style.height= parseInt(e[currentnode].nextElementSibling.style.getPropertyValue("height"), 10)+"px";
                e[currentnode].nextElementSibling.style.height=h1+"px";
                currentnode++;
            }
            else{
                e[currentnode].style.backgroundColor="limegreen";
                e[currentnode].nextElementSibling.style.backgroundColor="limegreen";
                currentnode+=1;
            }
        }
    }
}
//Complete
function selectionSort2(start,container) {
    var e = document.getElementById(container).querySelectorAll(".tile");
    var lowest = parseInt(e[start].style.getPropertyValue("height"), 10);
    var lownode = start;
    var count = start;
    var id = setInterval(frame,speed);
    function frame() {
        colorflash2(start,lownode,container);
        if (start===e.length-1){
            colorflash(container);
            clearInterval(id);
        }
        else if (sorted(container)){
            colorflash(container);
            clearInterval(id);
        }
        else if(count===e.length){
            clearInterval(id);
            swap(e[lownode],e[start]);
            animateColor(start,3,container);
            selectionSort2(start+1,container);}

        else{
            if (parseInt(e[count].style.getPropertyValue("height"), 10) < lowest) {
                lowest = parseInt(e[count].style.getPropertyValue("height"), 10);
                lownode = count;
                }
            e[count].style.backgroundColor="dodgerblue";
            count++
    }
}}
//complete
function insertionSort(n,end,final,container) {
    var e = document.getElementById(container).querySelectorAll(".tile");
    var currentnode = n;
    var id = setInterval(frame, speed);
    function frame() {
        colorflash4(end,n,container);
        if (final===e.length-1){
            colorflash(container);
            clearInterval(id);
        }
        if (currentnode===0) {
            clearInterval(id);
            animateColor(end,3,container);
            insertionSort(n+1,end+1,final+1,container);

        }

        if (sorted(container)){
            colorflash(container);
            clearInterval(id);
        }

        else {
            if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10)) < (parseInt(e[currentnode].previousElementSibling.style.getPropertyValue("height"), 10))) {
                e[currentnode].previousElementSibling.style.backgroundColor="dodgerblue";
                var h1 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                e[currentnode].style.height = parseInt(e[currentnode].previousElementSibling.style.getPropertyValue("height"), 10) + "px";
                e[currentnode].previousElementSibling.style.height = h1 + "px";
                currentnode--;

            }
            else{
                currentnode--;
                clearInterval(id);
                animateColor(end,3,container);
                insertionSort(n+1,end+1,final+1,container);
            }
        }
    }
}



//PENDING

function mergeSort(curr,n,start,end,container) {
    var e = document.getElementById(container).querySelectorAll(".tile");
    var middle =n/2;
    var currentnode = start;
    if (n===2){
        return
    }
    var id = setInterval(frame,speed);
    function frame() {
        if (end === e.length-1){
            colorflash(container);
            clearInterval(id);
        }
        else if (currentnode===middle){
            clearInterval(id);
            mergeSort(middle,n-middle,middle,end+1,container);//reset node
        }
        else{
            if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))>(parseInt(e[currentnode].nextElementSibling.style.getPropertyValue("height"),10))){
                var h1 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                e[currentnode].style.height= parseInt(e[currentnode].nextElementSibling.style.getPropertyValue("height"), 10)+"px";
                e[currentnode].nextElementSibling.style.height=h1+"px";
                currentnode+=2;
            }
            else{
                currentnode+=2;
            }
        }
    }
}
function merger(a,b){
    for (let x= 0;x<a.length;x++){
        if ((parseInt(a[x].style.getPropertyValue("height"), 10))>(parseInt(b[x].nextElementSibling.style.getPropertyValue("height"),10))){
            swap(a[x],b[x]);
        }
    }
}

//Complete
function cocktailSort1(start,end,container,main){
    var e = document.getElementById(container).querySelectorAll(".tile");
    var currentnode = start;
    var id = setInterval(frame,speed);
    function frame() {
        colorcock2(start,container);
        colorinbetween(start,end,container);
        if (main===e.length){
            colorflash(container);
            clearInterval(id);
        }

        else if (sorted(container)){
            colorflash(container);
            clearInterval(id);
        }

        else if (currentnode === end) {
            clearInterval(id);
            cocktailSort2(end,start,container,main+1);//reset node
        }
        else{
            if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))>(parseInt(e[currentnode].nextElementSibling.style.getPropertyValue("height"),10))){
                e[currentnode].nextElementSibling.style.backgroundColor="dodgerblue";
                var h1 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                e[currentnode].style.height= parseInt(e[currentnode].nextElementSibling.style.getPropertyValue("height"), 10)+"px";
                e[currentnode].nextElementSibling.style.height=h1+"px";
                currentnode++;
            }
            else{
                e[currentnode].style.backgroundColor="dodgerblue";
                currentnode+=1;
            }
        }
    }
}
function cocktailSort2(start,end,container,main){
    var e = document.getElementById(container).querySelectorAll(".tile");
    var currentnode = start;
    var id = setInterval(frame,speed);
    function frame() {
        colorcock1(start,container);
        colorinbetween(end,start,container);
        if (main===e.length){
            colorflash(container);
            clearInterval(id);
        }

        else if (sorted(container)){
            colorflash(container);
            clearInterval(id);
        }

        else if (currentnode === end) {
            clearInterval(id);
            cocktailSort1(end+1,start-1,container,main+1);//reset node
        }
        else{
            if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))<(parseInt(e[currentnode].previousElementSibling.style.getPropertyValue("height"),10))){
                e[currentnode].previousElementSibling.style.backgroundColor="dodgerblue";
                var h1 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                e[currentnode].style.height= parseInt(e[currentnode].previousElementSibling.style.getPropertyValue("height"), 10)+"px";
                e[currentnode].previousElementSibling.style.height=h1+"px";
                currentnode--;
            }
            else{
                e[currentnode].style.backgroundColor="dodgerblue";
                currentnode-=1;
            }
        }
    }
}



//complete
function maxheap(end,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    var currentnode = 0;
    var position = 0;
    var swapped = false;
    var begin = true;
    var id = setInterval(frame,speed);
    function frame() {
        colorheap(end,container);
        if (sorted(container)){
            colorflash(container);
            clearInterval(id);
        }
        else if (currentnode===Math.ceil(end/2)){
            clearInterval(id);
            swaphighlow(0,end,container);
            maxheap(end-1,container);
        }
        else{
            if ((currentnode===Math.floor(end/2))){
                e[currentnode].style.backgroundColor="dodgerblue";
                e[(currentnode*2)+1].style.backgroundColor="#8A2BE2";
                if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))<(parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"),10))){
                    var h4 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                    e[currentnode].style.height= parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"), 10)+"px";
                    e[(currentnode*2)+1].style.height=h4+"px";
                    if (!begin){
                        if (!swapped){
                            position = currentnode + 1;
                        }
                        if (Math.ceil(currentnode/2)-1<0){
                            currentnode= 0;}
                        else{
                            currentnode= Math.ceil(currentnode/2)-1;
                        }
                        swapped = true;

                    }
                    else if (position!==0){
                        currentnode+=1;
                        position = currentnode;
                    }
                }
                else{
                    if (swapped){
                        currentnode=position;
                        swapped=false;
                    }
                    else{
                        clearInterval(id);
                        swaphighlow(0,end,container);
                        maxheap(end-1,container);
                    }
                }

            }
            else{
                if ((parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"), 10))<(parseInt(e[(currentnode*2)+2].style.getPropertyValue("height"),10))){
                e[currentnode].style.backgroundColor="dodgerblue";
                e[(currentnode*2)+1].style.backgroundColor="#8A2BE2";
                e[(currentnode*2)+2].style.backgroundColor="#8A2BE2";
                if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))<(parseInt(e[(currentnode*2)+2].style.getPropertyValue("height"),10))){
                    var h1 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                    e[currentnode].style.height= parseInt(e[(currentnode*2)+2].style.getPropertyValue("height"), 10)+"px";
                    e[(currentnode*2)+2].style.height=h1+"px";
                    if (!begin){
                        if (!swapped){
                            position = currentnode + 1;
                        }
                        if (Math.ceil(currentnode/2)-1<0){
                            currentnode= 0;}
                        else{
                            currentnode= Math.ceil(currentnode/2)-1;
                        }
                        swapped = true;
                        }
                    else if (position!==0){
                        currentnode+=1;
                        position = currentnode;
                        }
                    }

                else{
                    if (swapped){
                        currentnode=position;
                        swapped=false;
                    }
                    else{currentnode+=1;
                        position = currentnode;}}
            }
            else if ((parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"), 10))>(parseInt(e[(currentnode*2)+2].style.getPropertyValue("height"),10))){
                e[currentnode].style.backgroundColor="dodgerblue";
                e[(currentnode*2)+2].style.backgroundColor="#8A2BE2";
                e[(currentnode*2)+1].style.backgroundColor="#8A2BE2";
                if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))<(parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"),10))){
                    var h2 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                    e[currentnode].style.height= parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"), 10)+"px";
                    e[(currentnode*2)+1].style.height=h2+"px";
                    if (!begin){
                        if (!swapped){
                            position = currentnode + 1;
                        }
                        if (Math.ceil(currentnode/2)-1<0){
                            currentnode= 0;}
                        else{
                            currentnode= Math.ceil(currentnode/2)-1;
                        }
                        swapped = true;

                    }
                    else if (position!==0){
                        currentnode+=1;
                        position = currentnode;}
                    }
                else{
                    if (swapped){
                        currentnode=position;
                        swapped=false;
                    }
                    else{currentnode+=1;
                        position = currentnode;}}
            }
            else if ((parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"), 10))===(parseInt(e[(currentnode*2)+2].style.getPropertyValue("height"),10))){
                e[currentnode].style.backgroundColor="dodgerblue";
                e[(currentnode*2)+2].style.backgroundColor="#8A2BE2";
                e[(currentnode*2)+1].style.backgroundColor="#8A2BE2";
                if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10))<(parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"),10))){
                    var h3 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                    e[currentnode].style.height= parseInt(e[(currentnode*2)+1].style.getPropertyValue("height"), 10)+"px";
                    e[(currentnode*2)+1].style.height=h3+"px";
                    if (!begin){
                        if (!swapped){
                            position = currentnode + 1;
                        }
                        if (Math.ceil(currentnode/2)-1<0){
                            currentnode= 0;}
                        else{
                            currentnode= Math.ceil(currentnode/2)-1;
                        }
                        swapped = true;

                    }
                    else if (position!==0){
                        currentnode+=1;
                        position = currentnode;
                    }
                }
                else{
                    if (swapped){
                        currentnode=position;
                        swapped=false;
                    }
                    else{currentnode+=1;
                        position = currentnode;}
                }
            }
        }}
        begin=false;}
}
function swaphighlow(start,end,container){
    var e = document.getElementById(container).querySelectorAll(".tile");
    e[start].style.backgroundColor="dodgerblue";
    e[end].style.backgroundColor="orange";
    var h1 = parseInt(e[end].style.getPropertyValue("height"), 10);
    e[end].style.height= parseInt(e[start].style.getPropertyValue("height"), 10)+"px";
    e[start].style.height=h1+"px";
}




function shellSort(start,end, container, iteration,n,array){
    var e = document.getElementById(container).querySelectorAll(".tile");
    var gap = Math.floor(end/2);
    var n = start;
    var array = [];
    var temp = 0;
    var iteration = gap;
    var id = setInterval(frame,100);
    function frame() {
        colorheap(e.length,container);
        temp = array[gap]
        if (iteration===n) {
            clearInterval(id);
            shellSort(start,end,container,iteration);

        } else if (sorted(container)) {
            colorflash(container);
            clearInterval(id);
        } else {
            if ((parseInt(e[currentnode].style.getPropertyValue("height"), 10)) < (parseInt(e[startnode].style.getPropertyValue("height"), 10))) {
                e[startnode].style.backgroundColor="red";
                e[currentnode].style.backgroundColor="red";
                var h3 = parseInt(e[currentnode].style.getPropertyValue("height"), 10);
                e[currentnode].style.height = parseInt(e[startnode].style.getPropertyValue("height"), 10) + "px";
                e[startnode].style.height = h3 + "px";
                currentnode += 1;
                startnode += 1;
            } else {
                e[startnode].style.backgroundColor="green";
                e[currentnode].style.backgroundColor="green";
                currentnode += 1;
                startnode += 1;
            }
        }
    }

}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

//ALERT
var modal2 = document.getElementById("myModal2");

// Get the <span> element that closes the modal
var spa2n = document.getElementsByClassName("close2")[0];


// When the user clicks on <span> (x), close the modal
spa2n.onclick = function() {
    modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal2) {
        modal2.style.display = "none";
    }
}



