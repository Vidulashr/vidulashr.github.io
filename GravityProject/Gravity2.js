//Gravity Constants
const g = 39.5;
const dt = 0.008;
const sConstant = 0.15;
const scale = 70;
var trail = 1;

//Checks whether sun is in the canvas
var suninitiated = false;

//Get all elements and the canvas to begin drawing masses
const canvas = document.getElementById('canvas');
const ctx = document.getElementById('canvas').getContext('2d');
const sizerange = document.getElementById('changeSize');
const clear = document.getElementById('clear-planets');
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

var sunmass = 1

//Array that records all the masses that are in the canvas
var masses =
    [{
        m: sunmass,
        x: -1.50324727873647e-6-0.6,
        y: -3.93762725944737e-6-0.75,
        z: -4.86567877183925e-8,
        vx: 3.1669325898331e-5,
        vy: -6.85489559263319e-6,
        vz: -7.90076642683254e-7
    }];

//Sun position and mass value
const sun ={      m: sunmass,
    x: -1.50324727873647e-6-0.6,
    y: -3.93762725944737e-6-0.75,
    z: -4.86567877183925e-8,
    vx: 3.1669325898331e-5,
    vy: -6.85489559263319e-6,
    vz: -7.90076642683254e-7
};


//Gravity algorithm
class nBody{
    constructor(params) {
        this.g = params.g;
        this.dt = params.dt;
        this.sConstant = params.sConstant;
        this.masses = params.masses;
    }

    updatePositionVectors() {
        const massesLen = this.masses.length;
        for (let i = 0; i < massesLen; i++) {
            const massI = this.masses[i];
            massI.x += massI.vx * this.dt;
            massI.y += massI.vy * this.dt;
            massI.z += massI.vz * this.dt;
        }
        return this;
    }

    updateVelocityVectors() {
        const massesLen = this.masses.length;
        for (let i = 0; i < massesLen; i++) {
            const massI = this.masses[i];
            massI.vx += massI.ax * this.dt;
            massI.vy += massI.ay * this.dt;
            massI.vz += massI.az * this.dt;
        }
    }

    updateAccelerationVectors() {
        const massesLen = this.masses.length;
        for (let i = 0; i < massesLen; i++) {
            let ax = 0;
            let ay = 0;
            let az = 0;
            const massI = this.masses[i];
            for (let j = 0; j < massesLen; j++) {
                if (i !== j) {
                    const massJ = this.masses[j];
                    const dx = massJ.x - massI.x;
                    const dy = massJ.y - massI.y;
                    const dz = massJ.z - massI.z;
                    const distSq = dx * dx + dy * dy + dz * dz;
                    const f =
                        (this.g * massJ.m) /
                        (distSq * Math.sqrt(distSq + this.sConstant));
                    ax += dx * f;
                    ay += dy * f;
                    az += dz * f;
                }
            }
            massI.ax = ax;
            massI.ay = ay;
            massI.az = az;
        }
        return this;
    }
}

//Creating initial solar system
const SolarSystem = new nBody({g, dt, masses: JSON.parse(JSON.stringify(masses)), sConstant});

//Function to remove all planets and masses from the canvas
clear.onclick = (function () {
    if (!sunonoff){
        sunvisible.click();
    }
    suninitiated = false;
    SolarSystem.masses.splice(0,SolarSystem.masses.length);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    SolarSystem.masses.push({
        m: sunmass,
        x: -1.50324727873647e-6-0.6,
        y: -3.93762725944737e-6-0.75,
        z: -4.86567877183925e-8,
        vx: 3.1669325898331e-5,
        vy: -6.85489559263319e-6,
        vz: -7.90076642683254e-7,
        manifestation: new Manifestation(ctx, trail)});
})

//Functions that edit the options
var suntypeswith = document.getElementById("option-star");
var changedsun = false;
suntypeswith.onchange = function () {
    if (!changedsun){
        changedsun = true;
        suninitiated = false;
        sunmass = 0.15; //mass of white dwarf
        clear.click();
    }
    else{
        changedsun = false;
        suninitiated = false;
        sunmass=1; //revert back to mass of sun
        clear.click();
    }
}


//Function to add a trail behind the masses
var addtrail = document.getElementById("option-gravity");
var trailon = false;
addtrail.onchange = function () {
    if (!trailon){
        trailon = true;
        trail = 250;
    }
    else{
        trailon= false;
        trail =1;
    }
}

//Gives user the ability to turn the sun on and off
var sunvisible = document.getElementById("color");
var sunonoff = true;
var savedsun;
sunvisible.onchange= function () {
    if(sunonoff){
        savedsun = SolarSystem.masses[0];
        SolarSystem.masses.shift();
        sunonoff = false;
    }
    else{
        SolarSystem.masses.unshift(savedsun);
        sunonoff = true;
    }
}


class Manifestation {
    constructor(ctx, trail) {
        if (suninitiated) {
            const planetsize = (sizerange.value / 2000) * (1.75);
            const percentcolor = 255 - (planetsize / 8.75) * 255;
            const planetcolor = "rgba(30," + percentcolor + ", 255, 1)";

            this.ctx = ctx;
            this.trail = trail;
            this.positions = [];
            this.mass = planetsize;
            this.color = planetcolor;
            this.shadow = "blue";
            this.blur = 5;
        }
        else{
            if(!changedsun) {
                const planetsize = (5500 / 2000) * (9);
                var grd = ctx.createRadialGradient(sun.x, sun.y, planetsize / 100, sun.x, sun.y, planetsize);
                grd.addColorStop(0, "#ffffba");
                grd.addColorStop(1, "#ffffba");
                this.ctx = ctx;
                this.trail = 1;
                this.positions = [];
                this.mass = planetsize;
                this.color = grd;
                this.shadow = "#ffffba";
                this.blur = 45;
                suninitiated = true;
            }
            else{
                const planetsize = (5500 / 2000) * (6);
                var grd2 = ctx.createRadialGradient(sun.x, sun.y, planetsize / 100, sun.x, sun.y, planetsize);
                grd2.addColorStop(0, "#bae9ff");
                grd2.addColorStop(1, "#bae9ff");
                this.ctx = ctx;
                this.trail = 1;
                this.positions = [];
                this.mass = planetsize;
                this.color = grd2;
                this.shadow = "#bae9ff";
                this.blur = 35;
                suninitiated = true;
            }
        }
    }

    storePosition(x, y) {
        this.positions.push({x, y});
        if (this.positions.length > this.trail) this.positions.shift();
    }

    draw(x, y) {
        this.storePosition(x, y);
        const positionsLen = this.positions.length;

        for (let i = 0; i < positionsLen; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.positions[i].x, this.positions[i].y, this.mass, 0, Math.PI*2);
            this.ctx.fillStyle = this.color;
            this.ctx.shadowColor =  this.shadow;
            this.ctx.shadowBlur = this.blur;
            this.ctx.fill();
        }
    }
}

const populateManifestations = masses => {
    masses.forEach(
        mass =>
            (mass["manifestation"] = new Manifestation(ctx, trail)));
};

populateManifestations(SolarSystem.masses);

let mousePressX = 0;
let mousePressY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let dragging = false;

//Get start positions
canvas.addEventListener("mousedown", e => {
        mousePressX = e.clientX;
        mousePressY = e.clientY;
        dragging = true;},
    false
);
//Get end position
canvas.addEventListener("mousemove", e => {
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;},
    false
);
//When user finishes input, will animate masses
canvas.addEventListener("mouseup", e => {
        const x = (mousePressX-width/2)/scale;
        const y = ((mousePressY-height/2)/scale)-(80/scale);
        const z = 0;
        const vx = (e.clientX-mousePressX)/35;
        const vy = (e.clientY-mousePressY)/35;
        const vz = 0;

        SolarSystem.masses.push({
            m: parseFloat(sizerange.value/333000),x,y,z,vx,vy,vz,
            manifestation: new Manifestation(ctx, trail)});
        dragging = false;},
    false
);


const animate = () => {
    console.log(SolarSystem.masses);
    //Get new position for all masses in the system currently
    SolarSystem
        .updatePositionVectors()
        .updateAccelerationVectors()
        .updateVelocityVectors();

    //Clear the previous canvas
    ctx.clearRect(0, 0, width, height);

    //For all masses in the system
    const massesLen = SolarSystem.masses.length;

    //Draw each masses new position
    for (let i = 0; i < massesLen; i++) {
        const massI = SolarSystem.masses[i];
        const x = width / 2 + massI.x * scale;
        const y = height / 2 + massI.y * scale;
        massI.manifestation.draw(x, y);
    }

    //If user drags drawing of masses
    if (dragging) {
        ctx.beginPath();
        ctx.moveTo(mousePressX, mousePressY-(80));
        ctx.lineTo(currentMouseX, currentMouseY-(80));
        ctx.strokeStyle = "green";
        ctx.stroke();
    }
    //Animates the masses by frame
    requestAnimationFrame(animate);
};

//Call the animation
animate();