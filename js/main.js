var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 650,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: false
        }
    },
    scene: [
        TitleScene, Level_1, Instructions
    ]
};
var game = new Phaser.Game(config);
