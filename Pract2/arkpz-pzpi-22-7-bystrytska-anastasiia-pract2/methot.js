//МЕТОД Add Parameter

//ДО РЕФАКТОРИНГУ 

function greet() {
    console.log("Hello, John!");
}
//ПІСЛЯ РЕФАКТОРИНГУ 
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet("John");
greet("Jane");


// МЕТОД Encapsulate Field

//ДО РЕФАКТОРИНГУ
class User {
    constructor() {
        this.name = "John";
    }
}

const user = new User();
user.name = "";  // Можна задати некоректне значення
//ПІСЛЯ РЕФАКТОРИНГУ
class User {
    constructor() {
        this._name = "John";
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        if (newName) {
            this._name = newName;
        } else {
            console.error("Invalid name");
        }
    }
}


// МЕТОД Replace Nested Conditional with Guard Clauses

//ДО РЕФАКТОРИНГУ
function calculateDiscount(customer) {
    if (customer) {
        if (customer.isMember) {
            return 10;
        }
    }
    return 0;
}

//ПІСЛЯ РЕФАКТОРИНГУ
function calculateDiscount(customer) {
    if (!customer) return 0;
    if (!customer.isMember) return 0;
    return 10;
}

