  let win;
  let map;
  let tileset;
  let layer;
  let layer2;
  let coeur1;
  let coeur2;
  let coeur3;
  let tombe = [];
  let zombie = [];
  let jacko = [];
  let potion = [];
  let currentMonster =[];
  let dateTest = new Date().getTime();
  let monsters_velocity = -50;
  let dead = false;
  let isAttacking = false;
  let music;
  let musicZombie;
  let background;
  let playerPosition;

class Level_1 extends Phaser.Scene{
  constructor(){
    super({key: 'level1'});
  }
  
    preload = () => {
    this.load.image('background', '../Assets/Jordan/BG-game.png');
    this.load.image('zombie', '../Assets/Characters/Zombies/png/male/Idle (1).png');
    this.load.image('tiles', '../Assets/Map/Graveyard/spritesheet.png');
    this.load.tilemapTiledJSON('map', '../Assets/Map/Graveyard/map.json');
    this.load.image('life', '../Assets/Life/coeursPlein.png');
    this.load.image('middleLife', '../Assets/Life/coeurs2.png');
    this.load.image('noLife', '../Assets/Life/coeurs3.png');
    this.load.image('gainLife', '../Assets/Life/FioleSang.png');
    this.load.image('tombe', '../Assets/Map/Graveyard/png/Objects/TombStone.png')
    this.load.image('jacko', '../Assets/Characters/JackO/png/Idle.png');
  
    this.load.audio('theme', '../Assets/Music/music.mp3');
    this.load.audio('zombieDies', '../Assets/Music/zombie.mp3');
  
    this.load.atlas('vampire', './Assets/Characters/Vampire/vampireDouble.png', './Assets/Characters/Vampire/vampireDouble.json');
  }
  
  create = () => {
    background = this.add.image(375, 325, 'background').setScrollFactor(0);
    music = this.sound.add('theme');
    musicZombie = this.sound.add('zombieDies');
  
    music.play();
    // IMAGE COEUR 
    coeur1 = this.add.image(1250, 70, 'life').setScrollFactor(0);
    coeur2 = this.add.image(1150, 70, 'middleLife').setScrollFactor(0);
    coeur3 = this.add.image(1150, 70, 'noLife').setScrollFactor(0);
  
    this.player = this.physics.add.sprite(375, 325, 'vampire');
    this.player.life = 300
  
    let frameNames = this.textures.get('vampire').getFrameNames();
    this.anims.create({
      key: 'walk',
      frames: [
        {
          key: 'vampire',
          frame: 'walk_000.png'
        },
        {
          key: 'vampire',
          frame: 'walk_001.png'
        },
        {
          key: 'vampire',
          frame: 'walk_002.png'
        },
        {
          key: 'vampire',
          frame: 'walk_003.png'
        },
      ],
      frameRate: 8,
      repeat: 0
    });
    this.anims.create({
      key: 'attack',
      frames: [
        {
          key: 'vampire',
          frame: 'attack_000.png'
        },
        {
          key: 'vampire',
          frame: 'attack_001.png'
        },
        {
          key: 'vampire',
          frame: 'attack_002.png'
        },
        {
          key: 'vampire',
          frame: 'attack_003.png'
        },
        {
          key: 'vampire',
          frame: 'attack_004.png'
        },
      ],
      frameRate: 8,
      repeat: 1
    });
  
    const stopGame = ( player, tombe) => {
      if(player.life > 1){
        tombe.life = 0
      }
     } 
     
     const hitPotion = (player, potion) => {
       potion.destroy();
       if(player.life === 300){
         potion.life = 0
       }
       player.life += potion.life
       console.log(player.life)
     }
     
     const damage = (player,zombie) => {
       if(player.anims.currentAnim.key === 'attack'){
         zombie.destroy();
         musicZombie.play();
       }else{
         player.life -= 50;
         player.setTint(0xff0000);
         zombie.setVelocityX(500)
       }
       setTimeout(()=> {
         zombie.setVelocityX(this.monsters_velocity);
         player.setTint(0xffffff);
       }, 1000);
     }
    
    this.player.setScale(0.4);
    this.player.setCollideWorldBounds(true);
    playerPosition = this.player.body.setGravityY(200);
  
    map = this.make.tilemap({ key: 'map' });
    tileset = map.addTilesetImage('spritesheet', 'tiles');
    layer = map.createDynamicLayer('top', tileset, 0, 20);
    layer2 = map.createDynamicLayer('below', tileset, 0, 20)
  
    layer.setCollisionByProperty({ collides: true });
    layer.setCollisionByExclusion([-1]);
    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = 1500;
    this.physics.add.collider(layer, this.player);
  
   
    // Pop des zombies aleatoirement 
    for(let i = 0; i < 50; i++){
      zombie[i] = this.physics.add.sprite((Math.random()*5000 + 800), 500, 'zombie').setScale(0.2);
      zombie[i].life = 50
      this.physics.add.collider(this.player,zombie[i], damage);
      this.physics.add.collider(layer, zombie[i]);
      zombie[i].flipX = true;
    }
  
    // Pop des JACKOs aleatoirement 
    for(let i = 0; i < 40; i++){
      jacko[i] = this.physics.add.sprite((Math.random()*5000 + 800), 500, 'jacko').setScale(0.15);
      jacko[i].life = 50
      this.physics.add.collider(this.player,jacko[i], damage);
      this.physics.add.collider(layer, jacko[i]);
      jacko[i].flipX = true;
      }
    
    
    // Pop des fioles aleatoirement 
    for(let i = 0; i < 5; i++){
      potion[i] = this.physics.add.sprite(Math.random()*5000, 500, 'gainLife').setScale(0.7);
      potion[i].life = 50
      this.physics.add.collider(this.player,potion[i], hitPotion);
      this.physics.add.collider(layer, potion[i]);
    }
  
    // YOU WIN
    tombe = this.physics.add.sprite(6300, 9, 'tombe').setScale(1.2)
    this.physics.add.collider(this.player,tombe, stopGame);
    this.physics.add.collider(layer, tombe);
    tombe.life = 50;
}
  
   update = () => {
    let monsterMove = () => {
      zombie.map(monster =>  monster.body && monster.setVelocityX(monsters_velocity));
      jacko.map(monster =>  monster.body && monster.setVelocityX(monsters_velocity));
    }
    let cursors = this.input.keyboard.createCursorKeys(); 
  
    if (zombie[0].y < 717 && jacko[0].y < 717) {
      monsterMove();
    }
  
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('walk', true)
      this.player.flipX = true
    }
    else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('walk', true)
      this.player.flipX = false
    }
    else if (cursors.space.isDown) {
    isAttacking = true;
    this.player.anims.play('attack', true)
    this.player.flipX = false
    }
    else {
      this.player.setVelocityX(0);
    };
  
    if ((cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-500); // jump up
    }
  
    if (this.player.y > 1400) {
      dead = true
      if(dead = true){
        this.player.life = 0
      };
      this.add.text(450, 750, '< GAME OVER >', 
      { fontFamily: 'Verdana',
        fontSize: 100 + 'px',
        color: 'red',
      }).setScrollFactor(0);
      this.physics.pause();
      this.player.setTint(0xff0000); //put the player in red
      this.player.anims.play('walk', false);
    }
  
    
    if (this.player.life ===  300) {
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'life').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'life').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'life').setScrollFactor(0).setScale(0.3);
    } else if (this.player.life === 250){
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'middleLife').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'life').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'life').setScrollFactor(0).setScale(0.3);
    }else if (this.player.life === 200){
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'life').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'life').setScrollFactor(0).setScale(0.3);
    }else if (this.player.life === 150){
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'middleLife').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'life').setScrollFactor(0).setScale(0.3);
    }else if (this.player.life === 100){
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'life').setScrollFactor(0).setScale(0.3);
    }else if (this.player.life === 50){
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'middleLife').setScrollFactor(0).setScale(0.3);
    }else if (this.player.life <= 0) {
      coeur1.destroy();
      coeur1 = this.add.image(150, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur2.destroy();
      coeur2 = this.add.image(100, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      coeur3.destroy();
      coeur3 = this.add.image(50, 50, 'noLife').setScrollFactor(0).setScale(0.3);
      this.physics.pause();
      this.player.setTint(0xff0000);
      this.player.anims.play('walk', false);
      this.add.text(298, 450, '< GAME OVER >', 
      { fontFamily: 'Verdana',
      fontSize: 30 + 'px',
        color: 'red',
      }).setScrollFactor(0);
      let goback = this.add.text(298, 450, '< REPLAY >', 
      { fontFamily: 'Verdana',
        fontSize: 40 + 'px',
        color: 'black',
      }).setScrollFactor(0);
      goback.setInteractive({ useHandCursor: true });
      goback.on('pointerdown', () => {
        this.scene.switch('TitleScene');
        music.stop();
      });
    }

    if(tombe.life === 0){
      this.add.text(200, 250, '< YOU WIN >', 
      { fontFamily: 'Verdana',
        fontSize: 50 + 'px',
        color: 'green',
      }).setScrollFactor(0);
      music.stop();
      this.physics.pause();
      this.player.anims.play('walk', false);
      let replay = this.add.text(310, 300, '< REPLAY >', 
      { fontFamily: 'Verdana',
        fontSize: 20 + 'px',
        color: 'white',
      }).setScrollFactor(0);
      replay.setInteractive({ useHandCursor: true });
      replay.on('pointerdown', () => {
        scene.scene.restart();
        music.stop();
      });
    }
  
  
    // set bounds so the camera won't go outside the game world
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // make the camera follow the this.player
    this.cameras.main.startFollow(this.player);
  
  }
}