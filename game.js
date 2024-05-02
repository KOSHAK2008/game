const crypto = require("crypto");

class Game {
  constructor(moves) {
    this.moves = moves;
    this.key = this.generateKey();
    this.hmac = this.createHMAC(moves.join());
  }

  generateKey() {
    return crypto.randomBytes(32).toString("hex");
  }

  createHMAC(move) {
    const hmac = crypto.createHmac("sha256", this.key);
    hmac.update(Buffer.from(move, "utf-8"));
    return hmac.digest("hex");
  }

  determineWinner(userMove, compMove) {
    const generalMoves = this.moves.length;
    const userIndex = this.moves.indexOf(userMove);
    const compIndex = this.moves.indexOf(compMove);
    console.log(`general:${generalMoves}`)
    console.log(`user:${userIndex}`)
    console.log(`comp:${compIndex}`)
    const a = userIndex;
    const b = compIndex;
    const p = (generalMoves - 1) / 2;
    const n = generalMoves;

    if (userIndex === compIndex) {
      return "draw";
    } else if (Math.sign((a - b + p + n) % n - p) === 1) {
      return "win"
    } else if (Math.sign((a - b + p + n) % n - p) === -1) {
      return "lose"
    }
  }

  getRules() {
    return "Rock wins scissors, scissors win paper, paper wins Rock.";
  }

}

module.exports = Game;