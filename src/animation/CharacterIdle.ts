import CharacterIdle from "@/assets/spritesheet/CharacterIdle.png";

export const dataIdleLeft = {
   frames: {
       idleLeft1: {
           frame:{x:0,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleLeft2: {
           frame:{x:40,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleLeft3: {
           frame:{x:80,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleLeft4: {
           frame:{x:120,y:0,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterIdle,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['idleLeft1', 'idleLeft2','idleLeft3','idleLeft4']
   }

}

export const dataIdleRight = {
   frames: {
       idleRight1: {
           frame:{x:0,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleRight2: {
           frame:{x:40,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleRight3: {
           frame:{x:80,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleRight4: {
           frame:{x:120,y:48,w:40,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterIdle,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['idleRight1', 'idleRight2','idleRight3','idleRight4']
   }

}

export const dataIdleUp = {
   frames: {
       idleUp1: {
           frame:{x:0,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleUp2: {
           frame:{x:40,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleUp3: {
           frame:{x:80,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleUp4: {
           frame:{x:120,y:96,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterIdle,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['idleUp1', 'idleUp2','idleUp3','idleUp4']
   }

}

export const dataIdleDown = {
   frames: {
       idleRight1: {
           frame:{x:0,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleRight2: {
           frame:{x:40,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleRight3: {
           frame:{x:80,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idleRight4: {
           frame:{x:120,y:144,w:30,h:42},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CharacterIdle,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 1
   },
   animations: {
       movement: ['idleRight1', 'idleRight2','idleRight3','idleRight4']
   }

}
