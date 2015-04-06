module gamep {
    //ParticleSystem
    export module canvasele {
        export class ParticleSystem extends egret.DisplayObject {

            public emissionRate:number;
            private frameTime:number = 0;

            /**
             * 表示粒子所使用的纹理（实际没有作用）
             * @member {egret.Texture} particle.ParticleSystem#texture
             */
            public texture:egret.Texture;

            /**
             * 表示粒子出现总时间，单位毫秒，取值范围(0,Number.MAX_VALUE]，-1表示无限时间
             * @member {number} particle.ParticleSystem#emissionTime
             * @default -1
             */
            public emissionTime:number = -1;

            /**
             * 表示粒子出现点X坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterX
             * @default 0
             */
            public emitterX:number = 0;

            /**
             * 表示粒子出现点Y坐标，取值范围[-Number.MAX_VALUE,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#emitterY
             * @default 0
             */
            public emitterY:number = 0;

            /**
             * 表示粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
             * @member {number} particle.ParticleSystem#maxParticles
             * @default 200
             */
            public maxParticles:number = 200;

            private _particles:{active:Array;disactive:Array};

            private numParticles:number = 0;

            constructor(texture:egret.Texture, emissionRate:number) {
                super();
                this._texture_to_render = texture;//指定准备渲染的纹理贴图
                this.emissionRate = emissionRate;
                this.texture = texture;
                this._particles = {
                    active:[],
                    disactive:[]
                }
            }

            public changeTexture(texture:egret.Texture):void {
                if (this.texture != texture) {
                    this.texture = texture;
                    this._texture_to_render = texture;
                }
            }

            private getParticle():Particle {
                var result:Particle;
                if (this._particles.active.length) {
                    result = this._particles.active.pop();
                } else {
                    result = new Particle();
                }
                return result;
            }

            public start(duration:number = -1):void {
                if (this.emissionRate != 0) {
                    this.emissionTime = duration;
                    //a$.addTimeListener(TickerType.ON_MILLSECOND100,this.update,this);
                    egret.Ticker.getInstance().register(this.update, this);
                }
            }


            private update(dt:number):void {
                //粒子数很少的时候可能会错过添加粒子的时机
                if (this.emissionTime == -1 || this.emissionTime > 0) {
                    this.frameTime += dt;
                    while (this.frameTime > 0) {
                        if (this.numParticles < this.maxParticles) {//需要添加粒子
                            this.addOneParticle();
                        }
                        this.frameTime -= this.emissionRate;
                    }
                    if (this.emissionTime != -1) {
                        this.emissionTime -= dt;
                        if (this.emissionTime < 0) {
                            this.emissionTime = 0;
                        }
                    }
                }

                var particle:Particle;
                var particleIndex:number = 0;
                while (particleIndex < this.numParticles) {
                    particle = <Particle>this._particles.active[particleIndex];
                    if (particle.currentTime < particle.totalTime) {
                        this.advanceParticle(particle, dt);
                        particle.currentTime += dt;
                        particleIndex++;
                    }
                    else {
                        this.removeParticle(particle);

                        if (this.numParticles == 0 && this.emissionTime == 0) {
                            this.dispatchEventWith(egret.Event.COMPLETE);
                        }
                    }
                }
            }

            public initParticle(particle:Particle):void {
                particle.x = this.emitterX;
                particle.y = this.emitterY;
                particle.currentTime = 0;
                particle.totalTime = 1000;
            }

            public advanceParticle(particle:Particle, dt:number):void {
                particle.y -= dt / 6;
            }

            private addOneParticle():void {
                //todo 这里可能需要返回成功与否
                var particle:Particle = this.getParticle();
                this.initParticle(particle);
                if (particle.totalTime > 0) {
                    particle.oncreate();
                    this._particles.active.push(particle);
                    this.numParticles++;
                }
            }

            private removeParticle(particle:Particle):boolean {
                var index = this._particles.active.indexOf(particle);
                if (index != -1) {
                    particle.ondestory();
                    this._particles.active.splice(index, 1);
                    this._particles.disactive.push(particle);
                    this.numParticles--;
                    return true;
                }
                else {
                    return false;
                }
            }

            private transform:egret.Matrix = new egret.Matrix();
            public _render(renderContext:egret.RendererContext):void {
                if (this.numParticles > 0) {
                    var renderFilter = egret.RenderFilter.getInstance();

                    //todo 考虑不同粒子使用不同的texture，或者使用egret.SpriteSheet
                    var texture:egret.Texture = this.texture;
                    var textureW:number = texture._textureWidth;
                    var textureH:number = texture._textureHeight;
                    var offsetX = texture._offsetX;
                    var offsetY = texture._offsetY;
                    var bitmapX = texture._bitmapX;
                    var bitmapY = texture._bitmapY;
                    var bitmapWidth = texture._bitmapWidth;
                    var bitmapHeight = texture._bitmapHeight;

                    var particle:Particle;
                    for (var i:number = 0; i < this.numParticles; i++) {
                        particle = this._particles.active[i];
                        this.transform.identityMatrix(this._worldTransform);
                        this.transform.appendTransform(particle.x, particle.y, particle.scale, particle.scale, particle.rotation, 0, 0, textureW / 2, textureH / 2);
                        renderContext.setTransform(this.transform);
                        renderContext.setAlpha(particle.alpha, egret.BlendMode.NORMAL);
                        renderFilter.drawImage(renderContext, this, bitmapX, bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureW, textureH);
                    }
                }
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

            public oncreate(){

            }

            public ondestory(){

            }
        }
    }
}