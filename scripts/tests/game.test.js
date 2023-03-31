/**
 * @jest-environment jsdom
 */


const {game, newGame} = require("../game");

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
        expect(game.choices).toEqual(["button1","button2","button3","button4"]);
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
    test("should clear computer sequence array", () => {
        expect(game.currentGame.length).toBe(0);
    });
    test("should clear player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for ID score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});