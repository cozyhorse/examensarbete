import CharacterWalk from "@/assets/spritesheet/CharacterWalk.png";

export const dataWalkLeft = {
   frames: {
       walkLeft1: {
           frame:{x:10,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkLeft2: {
           frame:{x:45,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkLeft3: {
           frame:{x:92,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkLeft4: {
           frame:{x:124,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterWalk,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['walkLeft1', 'walkLeft2','walkLeft3','walkLeft4']
   }

}

export const dataWalkRight = {
   frames: {
       walkRight1: {
           frame:{x:0,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkRight2: {
           frame:{x:40,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkRight3: {
           frame:{x:80,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkRight4: {
           frame:{x:120,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterWalk,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['walkRight1', 'walkRight2','walkRight3','walkRight4']
   }

}

export const dataWalkUp = {
   frames: {
       walkUp1: {
           frame:{x:0,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkUp2: {
           frame:{x:40,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkUp3: {
           frame:{x:80,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkUp4: {
           frame:{x:120,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterWalk,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['walkUp1', 'walkUp2','walkUp3','walkUp4']
   }

}

export const dataWalkDown = {
   frames: {
       walkRight1: {
           frame:{x:0,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkRight2: {
           frame:{x:40,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkRight3: {
           frame:{x:80,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       walkRight4: {
           frame:{x:120,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterWalk,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['walkRight1', 'walkRight2','walkRight3','walkRight4']
   }

}
