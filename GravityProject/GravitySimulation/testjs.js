//Gravity Constants
const g = 39.5;
const dt = 0.008;
const softeningConstant = 0.15;

//Get canvas background
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

//Get color depending on planet mass (darker -> heavier)
const sizerange = $('#changeSize');
var color = 255- ((sizerange.val()/10000)*255);

//Gravity algorithm
class nBodyProblem {
    constructor(params) {
        this.g = params.g;
        this.dt = params.dt;
        this.softeningConstant = params.softeningConstant;
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


//Start mass is sun which will be 1
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

//Create solar system with sun only
const innerSolarSystem = new nBodyProblem({
    g,
    dt,
    masses: JSON.parse(JSON.stringify(masses)),
    softeningConstant
});

class Manifestation {
    constructor(ctx, trailLength, radius) {
        this.ctx = ctx;

        this.trailLength = trailLength;

        this.radius = radius;

        this.positions = [];
    }

    storePosition(x, y) {
        this.positions.push({
            x,
            y
        });

        if (this.positions.length > this.trailLength) this.positions.shift();
    }

    draw(x, y) {
        this.storePosition(x, y);

        const positionsLen = this.positions.length;

        for (let i = 0; i < positionsLen; i++) {
            let transparency;
            let circleScaleFactor;

            const scaleFactor = i / positionsLen;

            if (i === positionsLen - 1) {
                transparency = 1;
                circleScaleFactor = 1;
            } else {
                transparency = scaleFactor / 2;
                circleScaleFactor = scaleFactor;
            }

            this.ctx.beginPath();
            this.ctx.arc(
                this.positions[i].x,
                this.positions[i].y,
                circleScaleFactor * this.radius,
                0,
                2 * Math.PI
            );
            this.ctx.fillStyle = `rgb(30, ${color}, 255, ${transparency})`;
            this.ctx.radiusX = 10;

            this.ctx.fill();
        }
    }
}

const scale = 70;
const radius = 4;
const trailLength = 1;

const populateManifestations = masses => {
    masses.forEach(
        mass =>
            (mass["manifestation"] = new Manifestation(
                ctx,
                trailLength,
                radius
            ))
    );
};

populateManifestations(innerSolarSystem.masses);



document.querySelector('#clear-planets').addEventListener('click', () => {
    innerSolarSystem.masses = JSON.parse(JSON.stringify(masses));
    populateManifestations(innerSolarSystem.masses);
}, false);


var sunv = true;
document.querySelector('#colortoggle').addEventListener('change', () => {
}, false);


let mousePressX = 0;
let mousePressY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let dragging = false;

canvas.addEventListener("mousedown", e => {
        mousePressX = e.clientX;
        mousePressY = e.clientY;
        dragging = true;},
    false
);

canvas.addEventListener("mousemove", e => {
        currentMouseX = e.clientX;
        currentMouseY = e.clientY;},
    false
);

canvas.addEventListener("mouseup", e => {
        const x = (mousePressX - width / 2) / scale;
        const y = (mousePressY - height / 2) / scale;
        const z = 0;
        const vx = (e.clientX - mousePressX) / 35;
        const vy = (e.clientY - mousePressY) / 35;
        const vz = 0;

        const sizerange = $('#changeSize');

        innerSolarSystem.masses.push({
            m: parseFloat(sizerange.val()/333000),
            x,
            y,
            z,
            vx,
            vy,
            vz,
            manifestation: new Manifestation(ctx, trailLength, radius)
        });

        dragging = false;
    },
    false
);

const animate = () => {
    console.log(innerSolarSystem.masses);
    innerSolarSystem
        .updatePositionVectors()
        .updateAccelerationVectors()
        .updateVelocityVectors();

    ctx.clearRect(0, 0, width, height);

    const massesLen = innerSolarSystem.masses.length;

    for (let i = 0; i < massesLen; i++) {
        const massI = innerSolarSystem.masses[i];
        const x = width / 2 + massI.x * scale;
        const y = height / 2 + massI.y * scale;
        massI.manifestation.draw(x, y);
    }
    if (dragging) {
        ctx.beginPath();
        ctx.moveTo(mousePressX, mousePressY);
        ctx.lineTo(currentMouseX, currentMouseY);
        ctx.strokeStyle = "green";
        ctx.stroke();
    }
    requestAnimationFrame(animate);
};
animate();