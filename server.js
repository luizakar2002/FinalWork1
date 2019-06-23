
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Monster = require("./modules/Monster.js");
var FirstCharacter = require("./modules/FirstCharacter.js");
var SecondCharacter = require("./modules/SecondCharacter.js");
let random = require('./modules/random');
var fs = require('fs');
timeforseason = 0;
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
MonsterArr = [];
FirstCharacterArr = [];
SecondCharacterArr = [];
matrix = [];
grassHashiv = 0;
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, Grass, GrassEater, Monster, FirstCharacter, SecondCharacter) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < Grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < GrassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < Monster; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < FirstCharacter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < SecondCharacter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 15, 10, 11, 13, 15);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var mn = new Monster(x,y,3);
                MonsterArr.push(mn);
                
            }
            else if (matrix[y][x] == 4) {
                var mn = new FirstCharacter(x,y,4);
                FirstCharacterArr.push(mn);
                
            }
            else if (matrix[y][x] == 5) {
                var mn = new SecondCharacter(x,y,5);
                SecondCharacterArr.push(mn);
                
            }
        }
    }
}
creatingObjects();

function game() {
    timeforseason++;
    if (timeforseason >= 0 && timeforseason <= 8) {
        season = "winter";
    }
    else if (timeforseason >= 9 && timeforseason <= 12) {
        season = "summer";
    }
    else{
        timeforseason = 0;
    }    
    console.log(season);
    
/*
    if (season == "winter") {
        for (var i in grassArr) {
            grassArr[i].mul(6);
        }
    }
    else {
        for (var i in grassArr) {
            grassArr[i].mul(2);
        }
    }

*/


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }
    if (MonsterArr[0] !== undefined) {
        for (var i in MonsterArr) {
            MonsterArr[i].move();
            MonsterArr[i].eat();
            MonsterArr[i].mul();
            MonsterArr[i].die();
        }
    }
    if (FirstCharacterArr[0] !== undefined) {
        for (var i in FirstCharacterArr) {
            FirstCharacterArr[i].jump();
            FirstCharacterArr[i].eat();
            FirstCharacterArr[i].mul();
            FirstCharacterArr[i].die();
        }
    }
    if (SecondCharacterArr[0] !== undefined) {
        for (var i in SecondCharacterArr) {
            SecondCharacterArr[i].move();
            SecondCharacterArr[i].eat();
            SecondCharacterArr[i].mul();
            SecondCharacterArr[i].die();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        s: season
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}




function End() {
    grassArr = [];
    grassEaterArr = [];
    MonsterArr = [];
    FirstCharacterArr = [];
    SecondCharacterArr = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[0].length; x++) {
            matrix[y][x] = 0;
        }
     }
 }
 
 io.on('connection', function (socket) {
    socket.on("spanel", End)
});


setInterval(game, 1000)

/*
var statistics = {};
    setInterval(function(){
    statistics.Grass = grassArr.length;
    statistics.GrassEater = grassEaterArr.length;
    statistics.Monster = MonsterArr.length;
    statistics.frch = FirstCharacterArr.length;
    statistics.scch = SecondCharacterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics),function(){
        console.log("send");
    })
    },10)
    */