"use strict";

const settings = {
    rowsCount: 10,
    colsCount: 10,
    startPositionX: 1,
    startPositionY: 2,
    startDirection: 'down',
    stepsInSecond: 5,
    playerCellColor: '#AA3333',
    emptyCellColor: '#EEEEEE'
};

const player = {
    x: null,
    y: null,
    direction: null,

    init(startX, startY, startDirection) {

        this.x = startX;
        this.y = startY;
        this.direction = startDirection;
    },

    setDirection(direction){
        this.direction = direction;
    },

    makeStep() {

        const nextPoint = this.getNextStepPoint();

        this.x = nextPoint.x;
        this.y = nextPoint.y;
    },
    getNextStepPoint() {
        const point = {
            x: this.x,
            y: this.y,
        };

        switch (this.direction) {
            case 'up':
                point.y--;
                break;
            case 'right':
                point.x++;
                break;
            case 'down':
                point.y++;
                break;
            case 'left':
                point.x--;
                break;
        }

        return point;
    }
};

const game = {
    settings: settings,
    player: player,
    containerElement: null,


    run() {
        this.init();
        this.render();

        setInterval(() => {
            if (this.canPlayerMakeStep()) {
                this.player.makeStep();
                this.render();
            }
        }, 1000 / this.settings.stepsInSecond);
    },

    init() {
        this.player.init(this.settings.startPositionX, this.settings.startPositionY, this.settings.startDirection);
        this.containerElement = document.querySelector('#game');
        this.initCells();
        this.initEventHandler();
    },

    initCells() {
        this.containerElement.innerHTML = '';
        this.cellElements = [];

        for (let row = 0; row < this.settings.rowsCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.settings.colsCount; col++) {
                const cell = document.createElement('td');
                this.cellElements.push(cell);
                trElem.appendChild(cell);
            }
        }
    },
    initEventHandler() {
        document.addEventListener('keydown', event => console.log(event.code));
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    keyDownHandler(event){
        switch (event.code) {
            case 'ArrowDown':
                this.player.setDirection('down');
                break;
            case 'ArrowUp':
               return this.player.setDirection('up');
            case 'ArrowRight':
                return this.player.setDirection('right');
            case 'ArrowLeft':
                return this.player.setDirection('left');

        }
    },

    render() {
        this.cellElements.forEach(cell => cell.style.backgroundColor = this.settings.emptyCellColor);


        const playerCell = document
            .querySelector(`tr:nth-child(${this.player.y + 1})`)
            .querySelector(`td:nth-child(${this.player.x + 1})`);
        playerCell.style.backgroundColor = this.settings.playerCellColor;
    },
    canPlayerMakeStep() {
        const nextPoint = this.player.getNextStepPoint();
        return nextPoint.x >= 0 &&
            nextPoint.x < this.settings.colsCount &&
            nextPoint.y >= 0 &&
            nextPoint.y < this.settings.rowsCount;
    },
};

window.addEventListener('load', () => game.run());

