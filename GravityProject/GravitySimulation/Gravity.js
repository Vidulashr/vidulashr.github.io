//Gravity Constants
const g = 39.5;
const dt = 0.008; //0.005 years is equal to 1.825 days
const sConstant = 0.15;

//Gravity algorithm
class nBody {
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
                        (distSq * Math.sqrt(distSq + this.softeningConstant));
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

/*
const masses =
    [{
        m: 1,
        x: -1.50324727873647e-6,
        y: -3.93762725944737e-6,
        z: -4.86567877183925e-8,
        vx: 3.1669325898331e-5,
        vy: -6.85489559263319e-6,
        vz: -7.90076642683254e-7
    }];
*/

/*
//Creating initial solar system
const SolarSystem = new nBody({
    g,
    dt,
    masses: JSON.parse(JSON.stringify(masses)),
    sConstant
});
*/


const canvas =  document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const sizerange = document.getElementById('changeSize');
const clear = document.getElementById('clear-planets');


function Planet(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
        ctx.fill();
    }
}

const masses = [];
const sun = []
sunv = true;
canvas.addEventListener('click',function (e) {
    const planetsize = (sizerange.value/2000)*(1.75);
    const percentcolor = 255-(planetsize/8.75)*255;
    const planetcolor = "rgba(30,"+ percentcolor+", 255, 1)";
    //Add new planet at user picked location and to array of masses
    masses.push(new Planet(e.clientX,e.clientY-80,planetsize,planetcolor));

    for (var i = 0;i<masses.length;i++){
        //Draw all planets
        masses[i].draw();
    }
})

//Function to remove all planets and masses from the canvas
clear.onclick = (function () {
    masses.splice(0,masses.length)
    ctx.clearRect(0,0,canvas.width,canvas.height);
})





