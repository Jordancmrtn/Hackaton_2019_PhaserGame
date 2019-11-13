class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    });
  }
  preload() {
    this.load.image('background_img','../Assets/Jordan/BG-solo-jordan.png');
    this.load.audio('music', '../Assets/Music/Musique_fond_video.mp3');
  }
  create() {
    this.add.image(375, 325, 'background_img');
    let play = this.add.text(298, 450, '< PLAY >', 
      { fontFamily: 'Verdana',
        fontSize: 30 + 'px',
        color: 'white',
      }).setScrollFactor(0);

    play.setInteractive({ useHandCursor: true });
    play.on('pointerdown', () => {
      this.scene.start('level1');
      music.stop();
    });

    let instruction = this.add.text(265, 500, '< INSTRUCTIONS >', 
      { fontFamily: 'Verdana',
        fontSize: 20 + 'px',
        color: 'white',
      }).setScrollFactor(0);
    
    instruction.setInteractive({ useHandCursor: true });
    instruction.on('pointerdown', () => {
      this.scene.switch('instructions');
    });


    music = this.sound.add('music');
    music.play();
  }
 }