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

//Arrays/Listen

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
console.log(a + b);
console.log(b / (a - 1));
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

// Schleifen: for Schleife

for (let i = 0; i < 10; i++) {
    console.log(`Schleife ${i}`);
}

for (let j = 0; j < participants.length; j++) {
    const participant = participants[j];
    console.log(`Teilnehmer*in ${j} ${participant}`);
}

participants.forEach(participant => {
    console.log(`Teilnehmer*in ${participant}`);
});

//Funktionen

function showAge(birthYear) {
    console.log(`Du bist ca. ${2020-birthYear} Jahre alt.`);
}

showAge(1995);

function calcAge(birthYear) {
    return 2020 - birthYear;
}

console.log(`Max ist ca. ${calcAge(1992)} Jahre alt.`);
console.log(`Verena ist ca. ${calcAge(1998)} Jahre alt.`);

//kombi Schleifen und Funktion
let birthYears = [1964, 1977, 1980, 1987, 1995];
console.log(birthYears);

birthYears.forEach(year => {
    console.log(`Geboren ${year}, heute ca. ${calcAge(year)} Jahre alt.`);
});

let users = [ //array
    {firstname: "John", lastname: "Smith", birthYear: 1964},
    {firstname: "Jane", lastname: "McGonagall", birthYear: 1977},
    {firstname: "Max", lastname: "Mustermann", birthYear: 1980},
]
console.log(users);
users.forEach(user => {
    console.log(`${user.firstname} ist oder wird heuer ${calcAge(user.birthYear)} Jahre alt.`);
});

let firstParagraph = document.querySelector("#pFirst");
console.log(firstParagraph);
//firstParagraph.remove();
firstParagraph.innerHTML = "Test";
firstParagraph.style.color = "red";

let indentedParas = document.querySelector(".indent");
console.log(indentedParas);
indentedParas.innerHTML ="Text2";
indentedParas.forEach((para, index) => {
    para.innerHTML = `Absatz ${index}`;
    //para.style.color = "Yellow";
});