const ur = async (insertion_element, square_size, square_unit="px", nr_tokens=7) => {
    const UR_GAME_HTML = `
    <div id="ur-game-area">
        <div id="ur-error">

        </div>
        <br>
        <br>
        <div id="ur-instruction">

        </div>
        <br>
        <br>
        <div class="token-holder" id="blue-token-holder">
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
        </div>
        <div class="host" id="ur-host">

            <div class="square reroll"></div>
            <div class="square normal-5-dice"></div>
            <div class="square reroll"></div>

            <div class="square normal-eye"></div>
            <div class="square normal-dice"></div>
            <div class="square normal-eye"></div>

            <div class="square normal-dice"></div>
            <div class="square normal-5-dice"></div>
            <div class="square normal-dice"></div>

            <div class="square normal-eye"></div>
            <div class="square reroll"></div>
            <div class="square normal-eye"></div>

            <div class="square outside"></div>
            <div class="square normal-dice"></div>
            <div class="square outside"></div>

            <div class="square outside"></div>
            <div class="square normal-5-dice"></div>
            <div class="square outside"></div>

            <div class="square reroll"></div>
            <div class="square normal-eye"></div>
            <div class="square reroll"></div>

            <div class="square normal-5-dice"></div>
            <div class="square normal-dice"></div>
            <div class="square normal-5-dice"></div>
        </div>
        <div class="token-holder" id="red-token-holder">
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
            <div class="square"></div>
        </div>
        <br>
        <br>
        <div id="die-area">
            <div class="ur-dice ur-dice-zero"></div>
            <div class="ur-dice ur-dice-one"></div>
            <div class="ur-dice ur-dice-one"></div>
            <div class="ur-dice ur-dice-zero"></div>
        </div>
        <br>
        <br>
        <div id="pass-button">
            Pass your turn
        </div>
    </div>`;

    const UR_GAME_CSS = `#ur-game-area {
        width: 100%;
        height: 100%;
        text-align: center;
        margin-top: 40px;
    }

    #pass-button {
        display: inline-block;
        text-align: center;
        width: ${square_size * 4.8}${square_unit};
        padding-top: ${square_size * 1/4}${square_unit};
        padding-bottom: ${square_size * 1/4}${square_unit};
        background-color: rgb(66,66,66);
        color: rgb(244,244,244);
        font-size: 21px;
        font-weight: bold;
        cursor: pointer;
    }

    #ur-error {
        display: none
    }

    .ur-error-active {
        display: inline-block !important;
        background-color: rgb(66,66,66);
        color: rgb(244,244,244);
        width: ${square_size * 5}${square_unit};
        padding-top: 12px;
        padding-bottom: 12px;
    }

    #ur-instruction {
        display: inline-block;
        background-color: rgb(244,244,228);
        color: rgb(32,32,32);
        font-size: 19px;
        height: 62px;;
        width: ${square_size * 5}${square_unit};
        padding-top: 2px;
        padding-bottom: 2px;
    }

    #die-area {
        display: inline-block;
        width: ${square_size * 4.8}${square_unit};
        height: ${square_size}${square_unit};
        background-color: rgb(222,255,222);
        text-align: center;
        cursor: pointer;
    }

    .ur-dice {
        width: ${square_size}${square_unit};
        height: ${square_size}${square_unit};
        display: inline-block;
    }

    .ur-dice-zero {
        background-image: url(https://i.imgur.com/jN35ZHL.png);
        background-size: cover;
    }

    .ur-dice-one {
        background-image: url(https://i.imgur.com/5lsyGZH.png);
        background-size: cover;
    }

    .token-holder {
        display: inline-grid;
        grid-column-gap: 0px;
        grid-template-columns: auto;
        background-color: rgb(245,245,195);
        width: ${square_size}${square_unit};
        padding-bottom: ${square_size}${square_unit};
    }

    .token-blue:after  {
        border-radius: ${square_size}${square_unit};
        background-color: rgba(44,44,88,0.4);
        box-sizing: border-box;
        position: absolute;
        content: '';
        cursor: pointer;
        background-image: url(https://i.imgur.com/CbGmsqt.png);
        background-size: ${square_size*1.2}${square_unit};
        background-position: center;
        width: ${square_size}${square_unit};
        height: ${square_size}${square_unit};
        pointer-events: none;
        display: block;
    }

    .token-red:after  {
        border-radius: ${square_size}${square_unit};
        background-color: rgba(88,44,44,0.4);
        box-sizing: border-box;
        position: absolute;
        content: '';
        cursor: pointer;
        background-image: url(https://i.imgur.com/VfxMs02.png);
        background-size: ${square_size*1.2}${square_unit};
        background-position: center;
        width: ${square_size}${square_unit};
        height: ${square_size}${square_unit};
        pointer-events: none;
        display: block;
    }

    .host {
        display: inline-grid;
        grid-column-gap: 0px;
        grid-template-columns: auto auto auto;
        width: ${square_size * 3}${square_unit};
        background-color: rgb(238,238,238);
        padding-bottom: ${square_size * 1/5}${square_unit};
        padding-right: ${square_size * 1/5}${square_unit};
        padding-left: ${square_size * 1/5}${square_unit};
        padding-top: ${square_size * 1/5}${square_unit};
    }

    .square {
        box-sizing: border-box;
        margin: 0 0 0 0;
        padding: 0 0 0 0;
        height: ${square_size}${square_unit};
    }


    .reroll {
        background-color: rgb(255,255,240);
        border: 2px solid rgba(80, 80, 60, 0.8);
        background-image: url(https://i.imgur.com/PK3AFo1.png);
        background-size: cover;
    }

    .normal-5-dice {
        background-color: rgb(255,255,240);
        border: 2px solid rgba(80, 80, 60, 0.8);
        background-image: url(https://i.imgur.com/wRJPbXE.png);
        background-size: cover;
    }

    .normal-dice {
        background-color: rgb(255,255,240);
        border: 2px solid rgba(80, 80, 60, 0.8);
        background-image: url(https://i.imgur.com/Ey4tOQR.png);
        background-size: cover;
    }

    .normal-eye {
        background-color: rgb(255,255,240);
        border: 2px solid rgba(80, 80, 60, 0.8);
        background-image: url(https://i.imgur.com/R0RzPZi.png);
        background-size: cover;
    }

    .outside {
        background-color: rgb(238,238,238);
    }

    .selected-blue {
        border: 4px solid rgba(80, 80, 222, 0.8) !important;
    }

    .selected-red {
        border: 4px solid rgba(222, 80, 80, 0.8) !important;
    }`;

    //Auxiliary functions
    const sleep = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const clear_classes = (divs, classes) => {
        for(let i = 0; i < divs.length; i++) {
            for (let c of classes) {
                divs[i].classList.remove(c);
            }
        }
    }

    // Some constants for the game
    const HOME = [0, 1, 2, 3];
    const TRACK = [4, 5, 6, 7, 8, 9, 10, 11]
    const FINAL = [12, 13]
    const REROLL = [3, 7, 13];
    const WIN = 14;


    // The game
    const remove_error = () => {
        const err_div = document.getElementById('ur-error');
        err_div.classList.remove('ur-error-active')
    }

    const show_error = (message) => {
        const err_div = document.getElementById('ur-error');
        err_div.classList.remove('ur-error-active');
        err_div.classList.add('ur-error-active');
        err_div.innerHTML = message;
    }

    const determine_position = (position, player) => {
        let move_to = null;
        if (player == "blue") {
            if(HOME.includes(position)) {
                move_to = 9 - position*3;
            } else if(FINAL.includes(position)) {
                move_to = 21 - (position - 12)*3;
            } else if(TRACK.includes(position)) {
                move_to = position * 3 - 11;
            } else {
                move_to = 12
            }
        } else if(player == "red") {
            if(HOME.includes(position)) {
                move_to = 11 - position*3;
            } else if(FINAL.includes(position)) {
                move_to = 23 - (position - 12)*3;
            }  else if(TRACK.includes(position)) {
                move_to = position * 3 - 11;
            } else {
                move_to = 14
            }
        } else {
            console.error(`Unknown player ${player}!`);
        }
        return move_to;
    }
    // Render the board from tokens_blue
    const render = (token_sets) => {
        const host = document.getElementById("ur-host");
        const squares = host.getElementsByClassName("square");
        clear_classes(squares, ["token-blue", "token-red"])

        for (let tokens of token_sets) {
            const token_holder = document.getElementById(`${tokens.player}-token-holder`);
            const unused_tokens = token_holder.getElementsByClassName("square");

            clear_classes(unused_tokens, [`token-${tokens.player}`]);
            for(let i in tokens.positions) {
                const position = tokens.positions[i];
                if(position !== -1) {
                    const move_to = determine_position(position, tokens.player);
                    squares[move_to].classList.add(`token-${tokens.player}`);
                } else {
                    unused_tokens[i].classList.add(`token-${tokens.player}`);
                }
            }
        }
    }

    // Activate events listeners that trigger token movement
    const select_token = (tokens) => {
        const positions = tokens.positions;
        const player = tokens.player;

        const host = document.getElementById("ur-host");
        const squares = host.getElementsByClassName("square");

        const token_holder = document.getElementById(`${player}-token-holder`);
        const unused_tokens = token_holder.getElementsByClassName("square");

        const possible_moves = []

        for(let i = 0; i < squares.length; i++) {
            const promise =  new Promise((resolve, reject) => {
                squares[i].addEventListener('click', () => {
                    for(let index in positions) {
                        if(determine_position(positions[index], player) === i) {
                            resolve(index);
                        }
                    }
                    reject("Please select a valid token !");
                });
            });
            possible_moves.push(promise);
        }

        for(let i = 0; i < unused_tokens.length; i++) {
            const promise =  new Promise((resolve, reject) => {
                unused_tokens[i].addEventListener('click', () => {
                    for(let index in positions) {
                        if(positions[i] === -1) {
                            resolve(i);
                        }
                    }
                    reject("Please select a valid token !");
                });
            });
            possible_moves.push(promise);
        }
        const pass_promise = new Promise((resolve) => {
            document.getElementById('pass-button').addEventListener('click', () => {
                resolve("pass");
            });
        });
        possible_moves.push(pass_promise);

        return Promise.race(possible_moves);
    }

    const roll = async () => {
        const roll_promise =  new Promise((resolve) => {
            document.getElementById('die-area').addEventListener('click', () => {
                const rolls = Array.apply(null, {length: 4}).map(() => { return Math.round(Math.random())});

                const dices = document.getElementsByClassName('ur-dice');
                clear_classes(dices, ['ur-dice-one', 'ur-dice-zero']);

                for(let i = 0; i < dices.length; i++) {
                    if(rolls[i] === 1) {
                        dices[i].classList.add('ur-dice-one');
                    } else {
                        dices[i].classList.add('ur-dice-zero');
                    }
                }
                resolve(rolls.reduce((x,y) => x + y, 0));
            });
        });
        const pass_promise = new Promise((resolve) => {
            document.getElementById('pass-button').addEventListener('click', () => {
                resolve(-1);
            });
        });
        return Promise.race([roll_promise, pass_promise]);
    }


    const move = (moves, tokens, enemy_tokens, moving_token) => {
        if(tokens.indexOf(tokens[moving_token] + moves) >= 0 && (tokens[moving_token] + moves) < WIN) {
            return "Can't move over your own token !";
        }
        tokens[moving_token] += moves;
        const kick_out = enemy_tokens.indexOf(tokens[moving_token]);
        const enemy_token_position = enemy_tokens[kick_out];

        if (!(FINAL.includes(enemy_token_position)) && !(HOME.includes(enemy_token_position)) && !(kick_out === -1) && kick_out < WIN) {
            if(REROLL.includes(enemy_token_position)) {
                return move(1, tokens, tokens, enemy_tokens, moving_token);
            }
            enemy_tokens[kick_out] = -1;
        }
        return tokens[moving_token];
    }


    const turn = async (current_tokens, other_tokens, extra_message = '') => {
        remove_error();
        const instructions = document.getElementById('ur-instruction');
        instructions.innerHTML = `${extra_message}${current_tokens.player.charAt(0).toUpperCase() + current_tokens.player.slice(1)}'s turn !
        <br> Please roll the dice.`;

        const moves = await roll();
        // Pass turn during roll
        if(moves === -1) {
            instructions.innerHTML = `${current_tokens.player.charAt(0).toUpperCase() + current_tokens.player.slice(1)} passed his turn !`
            await sleep(1200);
            return turn(other_tokens, current_tokens);
        }
        instructions.innerHTML = `${current_tokens.player.charAt(0).toUpperCase() + current_tokens.player.slice(1)} rolled a total of: ${moves} !`;

        if(moves === 0) {
            await sleep(1200);
            return turn(other_tokens, current_tokens);
        }

        while(true) {
            try {
                const moving_token = await select_token(current_tokens);
                // Pass turn during move
                if(moving_token === "pass") {
                    instructions.innerHTML = `${current_tokens.player.charAt(0).toUpperCase() + current_tokens.player.slice(1)} passed his turn !`
                    await sleep(1200);
                    return turn(other_tokens, current_tokens);
                }
                const current_square = move(moves, current_tokens.positions, other_tokens.positions, moving_token);

                if(isNaN(current_square)) {
                    show_error(current_square);
                    continue
                }
                render([current_tokens, other_tokens]);
                await sleep(400);
                const win = current_tokens.positions.reduce((acc, pos) => {
                    return (pos >= WIN) && acc;
                }, true);

                if(win) {
                    return current_tokens.player;
                }

                if(REROLL.includes(current_square) ) {
                    return turn(current_tokens, other_tokens, '(You got a reroll)<br>');
                }
                return turn(other_tokens, current_tokens);

            } catch(err) {
                show_error(err);
            }
        }
    }

    insertion_element.innerHTML = UR_GAME_HTML;
    const node = document.createElement('style');
    node.innerHTML = UR_GAME_CSS;
    document.body.appendChild(node);

    const blue_tokens = {
        positions: Array.apply(null, {length: nr_tokens}).map(() => { return -1}),
        player: "blue"
    };

    const red_tokens = {
        positions: Array.apply(null, {length: nr_tokens}).map(() => { return -1}),
        player: "red"
    };

    render([blue_tokens, red_tokens]);
    const winner = await turn(blue_tokens, red_tokens);
    document.getElementById('ur-instruction').innerHTML = `Player: ${winner} has won !`;
    return winner;
}
