new Vue({
    el: '#game',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        logs: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits Lizard for ' + damage + 'hp'
            });
            if(this.checkWin()) return;

            this.monsterAttack();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits Lizard hard for ' + damage + 'hp!'
            });
            if(this.checkWin()) return;

            this.monsterAttack();
        },
        monsterAttack: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.logs.unshift({
                isPlayer: false,
                text: 'Lizard hits Player for ' + damage + 'hp'
            });
            this.checkWin()
        },
        heal: function() {
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }

            this.logs.unshift({
                isPlayer: true,
                text: 'Player heals for 10 hp'
            });

            this.monsterAttack();
        },
        retreat: function() {
            this.gameIsRunning = false;
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if(this.monsterHealth <= 0) {
                this.proptUser(true);
                return true;
            } else if(this.playerHealth <= 0) {
                this.proptUser(false);
                return true;
            }

            return false;
        },
        proptUser: function(isWin) {
            var message = isWin ? 'You won! New game?' : 'You lost! Wanna try again?';

            if(confirm(message)) {
                this.startGame();
            } else {
                this.gameIsRunning = false;
            }
        }
    }
});
