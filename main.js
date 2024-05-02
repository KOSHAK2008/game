const Game = require("./game");
const tableShowHelp = require("./tableShow");

function main() {
    if (process.argv.length < 4 || process.argv.length % 2 === 0) {
        console.log("\nError! Incorrect number of arguments.Please enter an odd number of non - repeating moves.\n");
        console.log("Example: node main.js Rock Paper Scissors");
        console.log("Another example: node main.js Rock Paper Lizard Spock Scissors");
        process.exit(1);
    }

    const moves = process.argv.slice(2);
    const game = new Game(moves);

    console.log("\nWelcome to the Game!");

    const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function promptUser() {
        const compMove = moves[Math.floor(Math.random() * moves.length)];
        const hmac = game.createHMAC(compMove);
        console.log(`\nHMAC: ${hmac} `);

        console.log("\nAvailable moves:\n");
        moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move} `);
        });
        console.log("0 - Exit");
        console.log("? - Help");

        readline.question("\nEnter your move:", (userChoice) => {
            if (userChoice === "0") {
                readline.close();
                process.exit(0);
            } else if (userChoice.toLowerCase() === "?") {
                tableShowHelp(moves, game.determineWinner.bind(game));
                console.log(`\nKey: ${game.key} `);
                promptUser();
            } else if (
                !isNaN(userChoice) &&
                parseInt(userChoice) >= 1 &&
                parseInt(userChoice) <= moves.length
            ) {
                const userMove = moves[parseInt(userChoice) - 1];
                console.log(`\nYour move: ${userMove} `);
                console.log(`Computer move: ${compMove}`);
                const result = game.determineWinner(userMove, compMove);
                console.log(`\n You ${result}!`);
                console.log(`\nHMAC key: ${game.key}\n`);
                readline.close();
            } else {
                console.log("\nWrong choice. Please try again.");
                promptUser();
            }
        });
    }

    promptUser();
}

if (require.main === module) {
    main();
}
