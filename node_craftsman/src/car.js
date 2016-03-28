//
// // plain JS object created by hand
// var myCar = {};
//
// myCar.honk = function () {
//     console.log('honk honk');
// };
//
// myCar.drive = function () {
//     console.log('vrooom');
// };
//
// // node car.js
// myCar.honk(); // honk honk
// myCar.drive(); // vrooom

// ============================

// plain function that creates objects
// In the most simple case, we can write a function which creates “plain” objects that are exactly
// like our “ex nihilo” object, and that don’t really share any behaviour - they just happen to roll
// out of the factory with the same behaviour copied onto every single one, if you want so.
// For every myCar object that is created, a new honk function is created and attached - creating 1,000 objects
// means that the JavaScript interpreter has to allocate memory for 1,000 functions, although they all implement
// the same behaviour. This results in an unnecessarily high memory footprint of the application.
// Secondly, this approach deprives us of some interesting opportunities. These myCar objects don’t share anything
// - they were built by the same creator function, but are completely independent from each other.
// It’s really like with real cars from a real car factory: They all look the same, but once they
// leave the assembly line, they are totally independent. If the manufacturer should decide that
// pushing the horn on already produced cars should result in a different type of honk, all cars
// would have to be returned to the factory and modified.
//
// var makeCar = function() {
//     var newCar = {};
//
//     newCar.honk = function() {
//         console.log('honk honk');
//     };
//
//     newCar.drive = function() {
//         console.log('vrooom');
//     };
//
//     return newCar;
// };
//
// myCar1 = makeCar(); // honk honk
// myCar2 = makeCar();


// ============================

// Constructor function that creates objects that share behaviour, from a prototype.
// All objects from same prototype are a class of related objects, and not just a bunch of objects that happen to have
// similar names and identical functions.
//
// Constructor function is somewhat like a class, because it does some of the things a class (with a constructor method)
// does in a traditional OOP language. However, the approach is not identical, which is why constructor functions
// are often called pseudo-classes or prototypes.
// Common practice is to name such function with capital letter.

// var Car = function() {
//     this.honk = function() {
//         console.log('honk honk');
//     };
// };
//
// var myCar1 = new Car(); // new Car object with honk function _attached_. Unlike eg Java, there is no "return this"
// var myCar2 = new Car();
//
// console.log(myCar1.constructor); // outputs [Function: Car]. Nope, simply [Function]
// console.log(myCar2.constructor); // outputs [Function: Car]

// But where is the object that is the prototype of our myCar objects - we didn’t create one!
// It has been implicitly created for us, and is assigned to the Car.prototype property (in case you wondered,
// JavaScript functions are objects too, and they therefore have properties).
// var Car = function() {};
//
// // honk function added to prototype ends up in my myCar objects that now know how to honk
// Car.prototype.honk = function() {
//     console.log('honk honk');
// };
//
// var myCar1 = new Car();
// var myCar2 = new Car();
//
// myCar1.honk(); // executes Car.prototype.honk() and outputs "honk honk"
// myCar2.honk(); // same
//
// // we can update a function at runtime
// Car.prototype.honk = function() {
//     console.log('meep meep');
// };
// myCar1.honk(); // executes updated Car.prototype.honk() and outputs "meep meep"
// myCar2.honk(); // same
//
// // we can add a function at runtime
// Car.prototype.drive = function() {
//     console.log('vrooom');
// };
//
// myCar1.drive(); // executes updated Car.prototype.drive() and outputs "vrooom"
// myCar2.drive(); // same
//
//
// // But we could even decide to treat only one of our cars differently:
// myCar2.honk = function () {
//     console.log('meow meow');
// };
//
// myCar1.honk(); // executes Car.prototype.honk() and outputs "meep meep"
// myCar2.honk(); // executes myCar2.honk() and outputs "meow meow"



// ================================
// inheritance
//
// // empty prototype object
// var Vehicle = function () { };
//
// // added a function to prototype
// Vehicle.prototype.drive = function () {
//     console.log('vrooom...');
// };
//
// var Car = function () { };
//
// // In JavaScript, inheritance runs through a chain of prototypes.
// Car.prototype = new Vehicle();
//
// Car.prototype.honk = function () {
//     console.log('honky honky')
// };
//
// var myCar = new Car();
//
// myCar.honk();
// myCar.drive();
//
// var Cycle = function () {};
//
// Cycle.prototype = new Vehicle();
// Cycle.prototype.honk = function () {
//     console.log('ring ring');
// };
//
// var myCycle = new Cycle();
// myCycle.honk();
// myCycle.drive();


// =======================================
// another solution which allows objects to inherit from each other directly. It’s the Object.create() function
// Object.create = function (o) {
//     var F = function () {};
//     F.prototype = o;
//     return new F();
// };


var vehicle = function () { }; // Note the small 'v'
vehicle.drive = function () {
    console.log('vrooom...');
};

var car = Object.create(vehicle);
car.honk = function () {
    console.log('honk honk');
};

var myCar = Object.create(car);

myCar.honk();
myCar.drive();




