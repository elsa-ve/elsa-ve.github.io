// alert("Hello World");

/* let message = "Hello World";
alert(message);
message ="Hallo Welt";
alert(message);
 */

const LINK_COLOR = "#ff0000"; // string
console.log("Link bitte in der Farbe", LINK_COLOR);

let highscore = 536520;
console.log(highscore / 12);

let firstname = "John";
let lastname = "Smith";
console.log("Name:", firstname, lastname);

let fullname = 'Jeffrey "The Dude" Lebowski';
console.log(fullname);

let template = `Dein Heighscore sind ${highscore} Punkte`;
console.log(template);

let isOver18 = true;
console.log(isOver18);

let age = 19;
console.log("über 18?", age > 18);

let participants = ["John", "Jane", "Max"];
console.log(participants);
console.log("einträge in Array:", participants.length);
console.log(participants[1]);

let gameHighscore = [2099, 3010, 3333, 5000];
console.log(gameHighscore);

let user = { //geschwungene Klammern... Properties werden mit Doppelpunkt zugeordnet!
    firstname: "John",
    lastname: "Smith",
    age: 25,
};

console.log(user);
console.log(user.firstname);
user.highscore = 2000; //variable Highscore wird dann aktualisiert und dem user zugewiesen! Zugriff auf den user mit der . Notation zB .highscore
user["highscore ever"] = 3575; //eckige Klmmern auch mit sonderzeichen
console.log(user);

let a = 2;
let b = 4;
console.log(a+b);
console.log(b/(a-1));
a++;
console.log(a);

/* let myAge = prompt("Wie alt bist du?");
console.log(`Du bist ${myAge} Jahre alt.`);
console.log(`Über 18? ${myAge > 18}`);

if (myAge > 18) {
    console.log("Glückwunsch über 18");
} elsa {
    console.log("Leider unter 18");
}
 */

 