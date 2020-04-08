var squareArray;
var size;
const ComputerSign = 'O'
const EnemySign = 'X'

const dirs = [
    { "row": -1, "col": 0 }, // Up
    { "row": 0, "col": 1 },  // Right
    { "row": 1, "col": 0 },  // Down
    { "row": 0, "col": -1 }  // Left
]

// Returns point { row, col } of the computers best move.
export function getBest(squareArrayP, sizeP, difficultyLevel) {
    squareArray = squareArrayP;
    size = sizeP;
    let bestPoint = null;

    bestPoint = step_1()

    if (bestPoint === null) {
        bestPoint = step_2_3_4(ComputerSign)
    }

    if (bestPoint === null) {
        bestPoint = step_2_3_4(EnemySign);
    }
    
    if (difficultyLevel >= 2) {
        if (bestPoint === null) {
            bestPoint = step_5_6();
        }
    }

    if (difficultyLevel >= 3) {
        if (bestPoint === null) {
            bestPoint = step_7();
        }

        if (bestPoint === null) {
            bestPoint = step_11();
        }
    }

    if (bestPoint !== null) {
        return bestPoint
    }

    return getRandomFreeCell()
}

function step_1() {
    if ((countSignedCells() <= 1) &&
        (squareArray[parseInt(size / 2)][parseInt(size / 2)] === null)) {
        return { "row": parseInt(size / 2), "col": parseInt(size / 2) };
    }

    return null;
}

function step_2_3_4(signToLookFor) {
    let point = checkTwoOfSignsInRowOrCol(signToLookFor)

    if (point === null) {
        point = checkTwoOfSignsInSlants(signToLookFor)
    }

    return point;
}

function step_5_6() {
    if ((countSignedCells() === 3) &&
        (squareArray[parseInt(size / 2)][parseInt(size / 2)] === ComputerSign)) {
        let optionalPoint = step_5();

        if (optionalPoint === null) {
            optionalPoint = step_6();
        }

        if (optionalPoint !== null) {
            return optionalPoint;
        }
    }

    return null;
}

function step_7() {
    let optionalPoints = [];

    if (isEmptyLine(true, 0) && isEmptyLine(false, 0)) {
        optionalPoints.push({ "row": 0, "col": 0 });
    } if (isEmptyLine(true, 0) && isEmptyLine(false, size - 1)) {
        optionalPoints.push({ "row": 0, "col": size - 1 });
    } if (isEmptyLine(true, size - 1) && isEmptyLine(false, 0)) {
        optionalPoints.push({ "row": size - 1, "col": 0 });
    } if (isEmptyLine(true, size - 1) && isEmptyLine(false, size - 1)) {
        optionalPoints.push({ "row": size - 1, "col": size - 1 });
    }

    if (optionalPoints.length !== 0) {
        let point = optionalPoints[Math.floor(Math.random() * optionalPoints.length)];
        return point;
    }

    return null;
}

function step_11() {
    let optionalPoints = [];
    if (squareArray[0][0] === null) {
        optionalPoints.push({ "row": 0, "col": 0 });
    } if (squareArray[0][size - 1] === null) {
        optionalPoints.push({ "row": 0, "col": size - 1 });
    } if (squareArray[size - 1][0] === null) {
        optionalPoints.push({ "row": size - 1, "col": 0 });
    } if (squareArray[size - 1][size - 1] === null) {
        optionalPoints.push({ "row": size - 1, "col": size - 1 });
    }

    if (optionalPoints.length !== 0) {
        let point = optionalPoints[Math.floor(Math.random() * optionalPoints.length)];
        return point;
    }

    return null;
}

function countSignedCells() {
    let count = 0;
    for (let curRow = 0; curRow < size; curRow++) {
        for (let curCol = 0; curCol < size; curCol++) {
            if (squareArray[curRow][curCol] !== null) {
                count++;
            }
        }
    }

    return count;
}

function checkTwoOfSignsInRowOrCol(signToLookFor) {
    let optionalPoint = checkTwoOfMySignInRowOrCol(true, signToLookFor);

    if (optionalPoint === null) {
        optionalPoint = checkTwoOfMySignInRowOrCol(false, signToLookFor);
    }

    return optionalPoint;
}

function checkTwoOfSignsInSlants(signToLookFor) {
    let optionalPoint = checkTwoOfSignsInFirstSlant(signToLookFor);

    if (optionalPoint === null) {
        optionalPoint = checkTwoOfSignsInSecondSlant(signToLookFor)
    }

    return optionalPoint;
}


// isRowChecking === true :  a - row, b - col
// isRowChecking === false: a - col, b - row
function checkTwoOfMySignInRowOrCol(isRowChecking, signToLookFor) {
    for (let a = 0; a < size; a++) {
        let point = null;
        for (let b = 0; b < size; b++) {
            if (squareArray[isRowChecking ? a : b][isRowChecking ? b : a] === null) {
                if (point === null) {
                    point = { "row": isRowChecking ? a : b, "col": isRowChecking ? b : a }
                } else {
                    point = null;
                    break;
                }
            } else if (squareArray[isRowChecking ? a : b][isRowChecking ? b : a] !== signToLookFor) {
                point = null;
                break;
            }
        }

        if (point !== null) {
            return point;
        }
    }

    return null;
}

function checkTwoOfSignsInFirstSlant(signToLookFor) {
    let point = null;
    for (let index = 0; index < size; index++) {
        if (squareArray[index][index] === null) {
            if (point === null) {
                point = { "row": index, "col": index }
            } else {
                return null;
            }
        } else if (squareArray[index][index] !== signToLookFor) {
            return null;
        }
    }

    return point;
}

function checkTwoOfSignsInSecondSlant(signToLookFor) {
    let point = null;
    for (let index = size - 1; index >= 0; index--) {
        if (squareArray[size - 1 - index][index] === null) {
            if (point === null) {
                point = { "row": size - 1 - index, "col": index }
            } else {
                return null;
            }
        } else if (squareArray[size - 1 - index][index] !== signToLookFor) {
            return null;
        }
    }

    return point;
}

function step_5() {
    if (((squareArray[0][0] === squareArray[size - 1][size - 1]) &&
        (squareArray[0][0] === EnemySign)) ||
        ((squareArray[0][size - 1] === squareArray[size - 1][0]) &&
            (squareArray[0][size - 1] === EnemySign))) {

        let optionalPoints = [];
        for (let dirIndex = 0; dirIndex < dirs.length; dirIndex++) {
            let curRow = parseInt(size / 2) + dirs[dirIndex].row;
            let curCol = parseInt(size / 2) + dirs[dirIndex].col;
            if (squareArray[curRow][curCol] === null) {
                optionalPoints.push({ "row": curRow, "col": curCol })
            }
        }

        if (optionalPoints.length !== 0) {
            return optionalPoints[Math.floor(Math.random() * optionalPoints.length)];
        }
    }

    return null;
}

function step_6() {
    let point = null;

    for (let dirIndex = 0; dirIndex < dirs.length; dirIndex++) {
        let curSquare =
        {
            "row": parseInt(size / 2) + dirs[dirIndex].row,
            "col": parseInt(size / 2) + dirs[dirIndex].col
        };
        let nextSquare =
        {
            "row": parseInt(size / 2) + dirs[(dirIndex + 1) % dirs.length].row,
            "col": parseInt(size / 2) + dirs[(dirIndex + 1) % dirs.length].col
        };

        if ((squareArray[curSquare.row][curSquare.col] ===
            squareArray[nextSquare.row][nextSquare.col]) &&
            (squareArray[curSquare.row][curSquare.col] ===
                EnemySign)) {

            point =
            {
                "row": (dirIndex % 2 === 0) ? curSquare.row : nextSquare.row,
                "col": (dirIndex % 2 === 0) ? nextSquare.col : curSquare.col
            };
        }
    }

    return point;
}

function isEmptyLine(isRow, numLine) {
    let isEmptyLine = true;
    for (let index = 0; index < size; index++) {
        if (squareArray[isRow ? numLine : index][isRow ? index : numLine] !== null) {
            isEmptyLine = false;
        }
    }

    return isEmptyLine;
}

function getRandomFreeCell() {
    let row, col;
    do {
        row = Math.floor(Math.random() * size)
        col = Math.floor(Math.random() * size)
    } while (squareArray[row][col] !== null)

    return { "row": row, "col": col };
}