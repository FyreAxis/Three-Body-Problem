//A class will help us organize relevant functions and
//Functions regarding objects

class Body{
    //Since we'll be constructing multiple
    //bodies, let's create a class and constructor
    //We'll take mass as a scalar
    //And velocity and position as a mathematical
    //vector, but we'll use arrays as a stand-in
    constructor(name, mass, startingVelocity, startingPos){
        this.name = name;
        this.mass = mass;
        //Bodies shouldn't have a starting acceleration
        this.acceleration = [0, 0, 0];
        this.velocity = startingVelocity;
        this.pos = startingPos;
    }
    
    //Here are some getters and setters for the body's properties
    get n(){
        return this.name;
    }

    set n(newName){
        this.name = newName;
    }
    get m(){ 
        return this.mass;
    }

    set m(newMass){
        this.mass = newMass;
    }

    get a(){
        return this.acceleration;
    }
    
    set a(newAccel){
        this.acceleration = newAccel;
    }

    get v(){
        return this.velocity;
    }

    set v(newVelocity){
        this.velocity = newVelocity;
    }
    
    get p(){
        return this.pos;
    }

    set p(newPos){
        this.pos = newPos;
    }

    //Visualization Functions

    show(){ //This shows the vector values currently
        let result = this.n + " has a mass of ";
        result += this.m + ",\nan acceleration of ";
        result += JSON.stringify(this.a) + ",\na velocity of ";
        result += JSON.stringify(this.v) + ",\nand a position of ";
        result += JSON.stringify(this.p);
        return result;
    }

    static magnitudeOfVector(vector){
        let magnitude = 0;
        for (let i = 0; i < 3; i++){
            magnitude += (vector[i] * vector[i]);
        }
        return Math.sqrt(magnitude);
    }

    //Update Functions
    newPosition(duration){
        for (let i = 0; i < 3; i++){
            this.p[i] += this.v[i] * duration;
        }
    }

    newVelocity(duration){
        for (let i = 0; i < 3; i++){
            this.v[i] += this.a[i] * duration; 
        }
    }

    newAccel(netAccel){
        for (let i = 0; i < 3; i++){
            this.a[i] = netAccel[i];
        }
    }

    //Newton's law of gravity needs a radius
    //So let's pass two objects to get the radius    
    //The first parameter is the start, and the second is the end
    static vectorDistance(body1, body2){
        let distance = [0, 0, 0];
        for (let i = 0; i < 3; i++){
            distance[i] += body2.p[i] - body1.p[i];
        }
        return distance;
    }

    //This calculates the acceleration due to gravity of the first body on the second body
    static vectorGravAccel(body1, body2){
        //A_g = G (m_1) / (r^2)
        //This calculates what the second body's acceleration due to gravity is
        const g = 6.67e-11;
        let gravAccels = [0, 0, 0];
        let distances = Body.vectorDistance(body1, body2);
        for (let i = 0; i < 3; i++){
            //TODO: Case of zero
            if (distances[i] != 0){
                gravAccels[i] += g * body1.m;
                gravAccels[i] /= (distances[i] * distances[i]);
                //Reverse direction if body2's pos is bigger
                //TODO: Turn into ternary statement
                if (body2.p[i] > body1.p[i]){ gravAccels[i] *= -1; }
            }
        }
        return gravAccels;
    }

    static netAccel(body1, body2, body3){
        //2 on 1 and 3 on 1
        let netAccel = [0, 0, 0];
        let a1 = Body.vectorGravAccel(body2, body1);
        let a2 = Body.vectorGravAccel(body3, body1);
        for (let i = 0; i < 3; i++){
            netAccel[i] += a1[i] + a2[i];
        }
        return netAccel;
    }

    //This calculates the force of the first body on the second body
    static vectorGravForce(body1, body2){
        //|F_g| = G (m_1 * m_2) / (r^2)
        const g = 6.67e-11;
        let gravForces = [0, 0, 0];
        let distances = Body.vectorDistance(body1, body2);
        for (let i = 0; i < 3; i++){
            //Case when the component is zero. TODO: if scalar distance is zero, gravity should be big
            if (distances[i] != 0){  
                gravForces[i] += g * body1.m * body2.m;
                gravForces[i] /= (distances[i] * distances[i]);
                if (body2.p[i] > body1.p[i]) { gravForces[i] *= -1; }
            }
        }
        return gravForces;
    }

    static netForce(body1, body2, body3){
        //2 on 1 and 3 on 1
        let netForce = [0, 0, 0];
        let f1 = Body.vectorGravForce(body2, body1);
        let f2 = Body.vectorGravForce(body3, body1);
        for (let i = 0; i < 3; i++){
            netForce[i] += f1[i] + f2[i];
        }
        return netForce;
    }

    //Resolution is how often calculations are simulated (how accurate)
    //Total duration is how long the simulation goes for
    //These are both in seconds in terms of the simulation, not computation
    static simulate(body1, body2, body3, resolutionTime, totalDuration){
        for (let time = 0; time < totalDuration; time += resolutionTime){
            let netAccelOn1 = Body.netAccel(body1, body2, body3);
            let netAccelOn2 = Body.netAccel(body2, body3, body1);
            let netAccelOn3 = Body.netAccel(body3, body1, body2);
            body1.newAccel(netAccelOn1);
            body2.newAccel(netAccelOn2);
            body3.newAccel(netAccelOn3);
            body1.newVelocity(resolutionTime);
            body2.newVelocity(resolutionTime);
            body3.newVelocity(resolutionTime);
            body1.newPosition(resolutionTime);
            body2.newPosition(resolutionTime);
            body3.newPosition(resolutionTime);
            console.log(myBody1.show());
            console.log(myBody2.show());
            console.log(myBody3.show());
        }
    }
}

//Creating test planets (no z-axis)
//(name, mass, velocity, position) starting values
let myBody1 = new Body("The Sun", 1.9891e30, [0, 0, 0], [0, 0, 0]);
let myBody2 = new Body("Earth", 5.972e24, [0, 29.78e3, 0], [1.496e11, 0, 0]);
let myBody3 = new Body("The Moon", 7.34767309e22, [0, 1.022e3, 0], [1.499844e11, 0, 0]);

//General Overview
console.log(myBody1.show());
console.log(myBody2.show());
console.log(myBody3.show());

//Logging individual distances
console.log("Distance between 1 and 2: " + JSON.stringify(Body.vectorDistance(myBody1, myBody2)));
console.log("Distance between 2 and 1: " + JSON.stringify(Body.vectorDistance(myBody2, myBody1)));
console.log("Distance between 1 and 3: " + JSON.stringify(Body.vectorDistance(myBody1, myBody3)));
console.log("Distance between 3 and 1: " + JSON.stringify(Body.vectorDistance(myBody3, myBody1)));
console.log("Distance between 2 and 3: " + JSON.stringify(Body.vectorDistance(myBody2, myBody3)));
console.log("Distance between 3 and 2: " + JSON.stringify(Body.vectorDistance(myBody3, myBody2)));

//Logging individual gravitational forces
console.log("Gravitational force of 1 on 2: " + JSON.stringify(Body.vectorGravForce(myBody1, myBody2)));
console.log("Gravitational force of 2 on 1: " + JSON.stringify(Body.vectorGravForce(myBody2, myBody1)));
console.log("Gravitational force of 1 on 3: " + JSON.stringify(Body.vectorGravForce(myBody1, myBody3)));
console.log("Gravitational force of 3 on 1: " + JSON.stringify(Body.vectorGravForce(myBody3, myBody1)));
console.log("Gravitational force of 2 on 3: " + JSON.stringify(Body.vectorGravForce(myBody2, myBody3)));
console.log("Gravitational force of 3 on 2: " + JSON.stringify(Body.vectorGravForce(myBody3, myBody2)));

//Logging individual net forces
console.log("Net force of other bodies on " + myBody1.n + ": " + JSON.stringify(Body.netForce(myBody1, myBody2, myBody3)));
console.log("Net force of other bodies on " + myBody2.n + ": " + JSON.stringify(Body.netForce(myBody2, myBody3, myBody1)));
console.log("Net force of other bodies on " + myBody3.n + ": " + JSON.stringify(Body.netForce(myBody3, myBody1, myBody2)));

//Simulate!
Body.simulate(myBody1, myBody2, myBody3, 1, 100);