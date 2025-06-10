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

    show(){
        let result = this.n + " has a mass of ";
        result += this.m + ",\nan acceleration of ";
        result += JSON.stringify(this.a) + ",\na velocity of ";
        result += JSON.stringify(this.v) + ",\nand a position of ";
        result += JSON.stringify(this.p);
        return result;
    }
    static displayArray(array){
        //We may even be able to use stringify()
        let result = "[";
        for (let i = 0; i < array.size; i++){
            result += array[i];
            if (i != array.size - 1){
                result += ", ";
            }
        }
        return result + "]";
    }

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

    //Newton's law of gravity needs a radius
    //So let's pass two objects to get the radius
    static scalarDistance(body1, body2){ //
        let distance = 0;
        let difference = [0, 0, 0];
        for (let i = 0; i < 3; i++){
            difference[i] = body2.p[i] - body1.p[i];
            difference[i] *= difference[i];
            distance += difference[i];
        }
        return Math.sqrt(distance);
    }

    static scalarGravForce(body1, body2){
        //|F_g| = G (m_1 * m_2) / (r^2)
        const g = 6.67 * Math.pow(10, -11);
        let numerator = g * body1.m * body2.m;
        let denominator = Math.pow(Body.scalarDistance(body1, body2), 2);
        return numerator / denominator;
    }
    
    //The first parameter is the start, and the second is the end
    static vectorDistance(body1, body2){
        let distance = [0, 0, 0];
        for (let i = 0; i < 3; i++){
            distance[i] += body2.p[i] - body1.p[i];
        }
        return distance;
    }

    static magnitudeOfVector(vector){
        let magnitude = 0;
        for (let i = 0; i < 3; i++){
            magnitude += (vector[i] * vector[i]);
        }
        return Math.sqrt(magnitude);
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
}

//Creating test planets
let myBody1 = new Body("The Sun", 1.9891e30, [0, 0, 0], [0, 0, 0]);
let myBody2 = new Body("Earth", 5.972e24, [0, 0, 0], [1.496e11, 0, 0]);
let myBody3 = new Body("The Moon", 7.34767309e22, [0, 0, 0], [1499844e11, 0, 0]);

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

//Do the above work?
console.log("Magnitude of Vector Calculation: " + Body.magnitudeOfVector(Body.vectorGravForce(myBody1, myBody2)));
console.log("Scalar Calculation: " + Body.scalarGravForce(myBody1, myBody2));

//Logging individual net forces
console.log("Net force of other bodies on " + myBody1.n + ": " + JSON.stringify(Body.netForce(myBody1, myBody2, myBody3)));
console.log("Net force of other bodies on " + myBody2.n + ": " + JSON.stringify(Body.netForce(myBody2, myBody3, myBody1)));
console.log("Net force of other bodies on " + myBody3.n + ": " + JSON.stringify(Body.netForce(myBody3, myBody1, myBody2)));