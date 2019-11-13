class Instructions extends Phaser.Scene {
  constructor() {
    super({key: 'instructions'});
  }

  preload() {
    this.load.image('backgroundInstructions','../Assets/Jordan/InstructionsBG.png');
    this.load.audio('music', '../Assets/Music/Musique_fond_video.mp3');
  }

  create(){
    this.add.image(375, 325, 'backgroundInstructions');

    let instruction = this.add.text(550, 580, '< RETURN >', 
    { fontFamily: 'Verdana',
      fontSize: 20 + 'px',
      color: 'white',
    }).setScrollFactor(0);

    instruction.setInteractive({ useHandCursor: true });
    instruction.on('pointerdown', () => {
      this.scene.switch('TitleScene');
      music.stop();
    });
  }
}