/**
 * @jest-environment jsdom
 */


const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => {});

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game objct contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("turnNumber key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value false", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1","button2"];
        game.currentGame = ["button1","button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game scor to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one element in computer array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should show data-listner set to 'true'", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true"); 
        }
    });
    test("should display 0 for ID score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("Game works as intended", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = []; 
    });
    test("Add turn as a new turn", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("Should add correct css", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("Should increment score if turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("Should alert if move wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong Move");
    });
    test("Should toggle turn in progress to be true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("Click during computer turn should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});