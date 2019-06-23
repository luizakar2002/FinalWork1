function setup() {
    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassHashiv');
    //! let grassEaterCountElement = document.getElementById('grassEaterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        season = data.s;
        //grassCountElement.innerText = data.grassHashiv;

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(season == "winter"){
                    fill("white");

                }
                else{
                    fill("#0FAE18");

                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("#F3EF76");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#cccccc");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("#720EA8");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("#DD1313");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                if(season == "winter"){
                    fill("black");

                }
                else{
                    fill("#061ECE");

                }
                rect(x * side, y * side, side, side);
            }
        }
    }
    }
}

function End(){
    socket.emit("spanel")
}   