"use strict";
var EASY_PUZZLE = "1-58-2----9--764-52--4--819-19--73-6762-83-9-----61-5---76---3-43--2-5-16--3-89--"; 
var MEDIUM_PUZZLE = "-3-5--8-45-42---1---8--9---79-8-61-3-----54---5------78-----7-2---7-46--61-3--5--"; 
var HARD_PUZZLE = "8--36------7--9-2---5---7-------457-----1---3---1----68--85---1--9----4--";

var TESTABLE = true;

var SudokuSolver = function (testable) {
    var solver;

    function solve(boardString) {
        var boardArray = boardString.split("");
        if (boardIsInvalid(boardArray)) { 
            return false;
        }
        return recursiveSolve(boardString);
    }

    function recursiveSolve(boardString){
        var boardArray = boardString.split("");
        if (boardIsSolved(boardArray)) {
            return boardArray.join("");
        }
        var cellPossibilities = getNextCellAndPossibilities(boardArray);
        var nextUnsolvedCellIndex = cellPossibilities.index;
        var possibilities = cellPossibilities.choices;
        for (var i = 0; i < possibilities.length; i++) { 
            boardArray[nextUnsolvedCellIndex] = possibilities[i]; 
            var solvedBoard = recursiveSolve(boardArray.join("")); 
            if (solvedBoard) {
                return solvedBoard;
            }
        }
        return false;
    }

    function boardIsInvalid(boardArray) {
        return !boardIsValid(boardArray);
    }

    function boardIsValid(boardArray) {
        return allRowsValid(boardArray) && allColumnsValid(boardArray) && allBoxesValid(boardArray);
    }

    function boardIsSolved(boardArray) {
        return !boardArray.includes("-");
    }

    function getNextCellAndPossibilities(boardArray){
        for (var i = 0; i < boardArray.length; i++) {
            if (boardArray[i] === "-") {
                var existingValues = getAllIntersections(boardArray, i);
                var choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(num => !existingValues.includes(num));
                return { index: i, choices: choices };
            }
        }
    }

    function getAllIntersections(boardArray, i){
        return getRow(boardArray, i).concat(getColumn(boardArray, i)).concat(getBox(boardArray, i));
    }

    function allRowsValid(boardArray){
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].every(i => collectionIsValid(getRow(boardArray, i)));
    }

    function getRow(boardArray, i) {
        var startingEl = Math.floor(i / 9) * 9;
        return boardArray.slice(startingEl, startingEl + 9);
    }

    function allColumnsValid(boardArray){
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(i => collectionIsValid(getColumn(boardArray, i)));
    }

    function getColumn(boardArray, i){
        var startingEl = i % 9;
        return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(num => boardArray[startingEl + num * 9]);
    }

    function allBoxesValid(boardArray){
        return [0, 3, 6, 27, 30, 33, 54, 57, 60].every(i => collectionIsValid(getBox(boardArray, i)));
    }

    function getBox(boardArray, i){
        var boxCol = Math.floor(i / 3) % 3; 
        var boxRow = Math.floor(i / 27);
        var startingIndex = boxCol * 3 + boxRow * 27;
        return [0, 1, 2, 9, 10, 11, 18, 19, 20].map(num => boardArray[startingIndex + num]);
    }

    function collectionIsValid(collection) {
        var numCounts = {};
        for (var num of collection) { 
            if (num !== "-") {
                if (numCounts[num]) {
                    return false;
                }
                numCounts[num] = 1;
            }
        }
        return true;
    }
    
    return solver = { solve };
}(TESTABLE);
