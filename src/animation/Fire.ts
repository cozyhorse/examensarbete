import CampFire from "@/assets/spritesheet/Campfire.png";



export const dataFire = {
   frames: {
       idle1: {
           frame:{x:0,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle2: {
           frame:{x:32,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle3: {
           frame:{x:64,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle4: {
           frame:{x:96,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle5: {
           frame:{x:128,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle6: {
           frame:{x:160,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle7: {
           frame:{x:192,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       },
       idle8: {
           frame:{x:224,y:0,w:32,h:25},
           sourceSize: {w:0,h:0},
           spriteSourceSize:{x:0,y:0,w:0,h:0}
       }
   },
   meta: {
       image: CampFire,
       format: 'RGBA8888',
       size: {w:160,h:192},
       scale: 0.4
   },
   animations: {
       movement: ['idle1', 'idle2','idle3','idle4', "idle5", "idle6", "idle7", "idle8",]
   }

}
