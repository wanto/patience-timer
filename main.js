var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.start_game = function () {
        var _this = this;
        game.init();
        var input = document.getElementById("playtime-input").value.split("/");
        this.bonus_time = +input[1];
        this.player1_time = (+input[0]) * 60;
        this.player2_time = (+input[0]) * 60;
        this.turn = "starting";
        this.player1_nextmove_button.disabled = false;
        this.player1_nextmove_button.classList.remove("disabled-button");
        this.player2_nextmove_button.disabled = false;
        this.player2_nextmove_button.classList.remove("disabled-button");
        this.player1_endturn_button.disabled = true;
        this.player2_endturn_button.disabled = true;
        setInterval(function () {
            _this.refresh_timer();
        }, 1000);
    };
    Game.prototype.refresh_timer = function () {
        if (this.turn === "starting") {
            this.player1_player_timer.childNodes[1].textContent = this.player1_time / 60 + ":" + (this.player1_time % 60 < 10 ? "0" : "") + this.player1_time % 60;
            this.player2_player_timer.childNodes[1].textContent = this.player2_time / 60 + ":" + (this.player2_time % 60 < 10 ? "0" : "") + this.player2_time % 60;
        }
        if (this.turn === "player1") {
            var diff = ((new Date().getTime() - this.turn_started.getTime()) / 1000) - this.bonus_time;
            var bonus;
            var timer;
            if (diff < 0) {
                bonus = Math.trunc(Math.abs(diff));
                timer = this.player1_time;
            }
            else {
                bonus = 0;
                timer = Math.trunc(this.player1_time - diff);
            }
            this.player1_player_timer.childNodes[1].textContent = Math.trunc(timer / 60) + ":" + (timer % 60 < 10 ? "0" : "") + Math.trunc(timer % 60);
            this.player1_player_timer.childNodes[3].textContent = "" + bonus;
            this.player2_player_timer.childNodes[3].textContent = "0";
        }
        if (this.turn === "player2") {
            var diff = ((new Date().getTime() - this.turn_started.getTime()) / 1000) - this.bonus_time;
            var bonus;
            var timer;
            if (diff < 0) {
                bonus = Math.trunc(Math.abs(diff));
                timer = this.player2_time;
            }
            else {
                bonus = 0;
                timer = Math.trunc(this.player2_time - diff);
            }
            this.player2_player_timer.childNodes[1].textContent = Math.trunc(timer / 60) + ":" + (timer % 60 < 10 ? "0" : "") + Math.trunc(timer % 60);
            this.player2_player_timer.childNodes[3].textContent = "" + bonus;
            this.player1_player_timer.childNodes[3].textContent = "0";
        }
    };
    Game.prototype.set_turn_player1 = function () {
        if (this.turn === "player2") {
            var diff = ((new Date().getTime() - this.turn_started.getTime()) / 1000) - this.bonus_time;
            this.player2_time -= diff > 0 ? diff : 0;
        }
        this.turn_started = new Date();
        this.turn = "player1";
        this.player1_nextmove_button.disabled = false;
        this.player1_nextmove_button.classList.remove("disabled-button");
        this.player1_endturn_button.disabled = false;
        this.player1_endturn_button.classList.remove("disabled-button");
        this.player2_nextmove_button.disabled = true;
        this.player2_nextmove_button.classList.add("disabled-button");
        this.player2_endturn_button.disabled = true;
        this.player2_endturn_button.classList.add("disabled-button");
        this.refresh_timer();
    };
    Game.prototype.set_turn_player2 = function () {
        if (this.turn === "player1") {
            var diff = ((new Date().getTime() - this.turn_started.getTime()) / 1000) - this.bonus_time;
            this.player1_time -= diff > 0 ? diff : 0;
        }
        this.turn_started = new Date();
        this.turn = "player2";
        this.player2_nextmove_button.disabled = false;
        this.player2_nextmove_button.classList.remove("disabled-button");
        this.player2_endturn_button.disabled = false;
        this.player2_endturn_button.classList.remove("disabled-button");
        this.player1_nextmove_button.disabled = true;
        this.player1_nextmove_button.classList.add("disabled-button");
        this.player1_endturn_button.disabled = true;
        this.player1_endturn_button.classList.add("disabled-button");
        this.refresh_timer();
    };
    Game.prototype.next_move = function () {
        var diff = ((new Date().getTime() - this.turn_started.getTime()) / 1000) - this.bonus_time;
        if (diff > 0) {
            if (this.turn === "player1")
                this.player1_time -= diff;
            if (this.turn === "player2")
                this.player2_time -= diff;
        }
        this.turn_started = new Date();
        this.refresh_timer();
    };
    Game.prototype.nextmove_handler_player1 = function () {
        if (this.turn === "starting")
            this.set_turn_player1();
        else
            this.next_move();
    };
    Game.prototype.nextmove_handler_player2 = function () {
        if (this.turn === "starting")
            this.set_turn_player2();
        else
            this.next_move();
    };
    Game.prototype.init = function () {
        this.player1_nextmove_button = document.getElementById("player1-nextmove-button");
        this.player2_nextmove_button = document.getElementById("player2-nextmove-button");
        this.player1_endturn_button = document.getElementById("player1-endturn-button");
        this.player2_endturn_button = document.getElementById("player2-endturn-button");
        this.player1_player_timer = document.getElementById("player1-player-timer");
        this.player2_player_timer = document.getElementById("player2-player-timer");
    };
    return Game;
}());
var game = new Game();
