module gamep{

    export var FPS:number = 0;
    export function rateoffest(worldrate:number = 60):number {
        return worldrate / FPS;
    }
    var countsecond:number = 0;
    var countmicrosecond:number = 0;

    export class GameProfiler extends egret.EventDispatcher{

        private _fps:number = 0;
        private _lastTime:number = 0;

        private _countmillisecond:number = 0;
        private _countsecond:number = 0;

        public constructor() {
            super();
            this.egretHack();
            this.run();
        }

        private run(){
            root.addEventListener(egret.Event.ENTER_FRAME,this.calculateFPS,this);
            gamep.d$.ready(()=>{
                this.onResize();
                gamep.d$.resize(()=>{
                    this.onResize();
                    //stage().changeSize();
                });
                //root.anchorX = root.anchorY = 0.5;
            });

        }

        private calculateFPS(){
            var nowTime:number = egret.getTimer();
            var dt = nowTime-this._lastTime;
            this._countsecond+=dt;
            this._countmillisecond+=dt;

            for(var i:number=0;i<(+(this._countmillisecond/100)^0);i++){
                countmicrosecond++;
                this.dispatchEvent(new gamep.Core.ProfilerEvent(TimeEvent.ON_MILLSECOND100,countmicrosecond));
                if(i>=(+(this._countmillisecond/100)^0)-1){
                    this._countmillisecond = 0;
                }
            }

            for(var i:number=0;i<(+(this._countsecond/1000)^0);i++){
                countsecond++;
                this.dispatchEvent(new gamep.Core.ProfilerEvent(TimeEvent.ON_SECOND,countsecond));
                if(i>=(+(this._countsecond/1000)^0)-1){
                    this._countsecond = 0;
                }
            }

            this._fps = 1000/dt;
            this._lastTime = nowTime;

            FPS = this._fps;
        }

        //TODO:优化
        private _hastransitionendlisten:boolean;
        private onResize(){
            var container = new egret.EqualToFrame();
            this._contentstrategy = new gamep.AutoOrient();
            var policy = new egret.ResolutionPolicy(container, this._contentstrategy);
            egret.StageDelegate.getInstance()._setResolutionPolicy(policy);
            if(!this._hastransitionendlisten) {
                this._hastransitionendlisten = true;
                client.canvas_container().addEventListener('webkitTransitionEnd', ()=> {
                    client.canvas_container().removeEventListener('webkitTransitionEnd', <any>arguments.callee, false);
                    this._hastransitionendlisten = false;
                    stage().dispatchEventWith(egret.Event.RESIZE);
                }, false)
            }
            client.context().rendererContext["onResize"]();
            egret.RenderFilter.getInstance()["_defaultDrawAreaList"] = null;
            root.width = stageWidth();
            root.height = stageHeight();
        }

        /**
         * 改进egret内置的方法
         */
        private _contentstrategy:gamep.AutoOrient;
        private egretHack(){
            /**
             * improve TouchContext
             */
            var relocationtouch = (x,y)=>{
                var tmp:number;
                switch (this._contentstrategy.orient){
                    default :
                    case 0:{
                        break;
                    }
                    case -90:{
                        tmp = x;
                        x = stageWidth()-y;
                        y = tmp;
                        break;
                    }
                    case 90:{
                        tmp = x;
                        x = y;
                        y = stageHeight()-tmp;
                        break;
                    }
                }
                return {x:x,y:y}
            };
            implementMethod(client.context().touchContext, "onTouchBegan",
                (x:number, y:number, identifier:number)=>{
                    var result = relocationtouch(x,y);
                    x = result.x;
                    y = result.y;
                    client.context().touchContext["__origin__"]["onTouchBegan"](x,y,identifier)
                }
            );
            implementMethod(client.context().touchContext, "onTouchMove",
                (x:number, y:number, identifier:number)=>{
                    var result = relocationtouch(x,y);
                    x = result.x;
                    y = result.y;
                    client.context().touchContext["__origin__"]["onTouchMove"](x,y,identifier)
                }
            );
            implementMethod(client.context().touchContext, "onTouchEnd",
                (x:number, y:number, identifier:number)=>{
                    var result = relocationtouch(x,y);
                    x = result.x;
                    y = result.y;
                    client.context().touchContext["__origin__"]["onTouchEnd"](x,y,identifier)
                }
            );
        }

        //instance mode
        private static _instance:GameProfiler;
        public static get instance():GameProfiler{
            if (GameProfiler._instance == null) {
                GameProfiler._instance = new GameProfiler();
            }
            return GameProfiler._instance;
        }
    }
}
