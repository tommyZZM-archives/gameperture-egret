module gamep {
    //ParticleSystem
    export module canvasele {
        export class ParticleSystem extends egret.DisplayObject {

            public emissionRate:number;

            public texture:egret.Texture|egret.SpriteSheet;

            public emitterX:number = 0;

            public emitterY:number = 0;

            public maxParticles:number = 200;

            public particleClass:any = null;

            private _particlesPool:any;//{active:Array;disactive:Array};

            private numParticles:number = 0;

            constructor(texture:egret.Texture, emissionRate:number) {
                super();
                this._texture_to_render = texture;
                this.emissionRate = emissionRate;
                this.texture = texture;
                this._particlesPool = []
            }

            private getParticle():Particle {
                var result:Particle;
                if (this._particlesPool.active.length) {
                    result = this._particlesPool.active.pop();
                } else {
                    result = new Particle();
                }
                return result;
            }

            public _render(renderContext:egret.RendererContext):void {

            }
        }

        export class Particle{
            public x:number;

            public y:number;

            public scale:number;

            public rotation:number;

            public alpha:number;

            public currentTime:number;

            public totalTime:number;

            public texture:any;

            protected oncreate:Function;

            protected ondestory:Function;
        }
    }
}