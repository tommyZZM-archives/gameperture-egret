module gamep.utils{

    export var FPS:number = 0;
    export function rateoffest(worldrate:number = 60):number {
        return worldrate / FPS;
    }
    export var counttime:number = 0;

    export class GameProfiler extends egret.EventDispatcher{

        private _fps:number = 0;
        private _lastTime:number = 0;
        private _countTime:number = 0;

        public constructor() {
            super();
            this.run();
        }

        private run(){
            rootscene.addEventListener(egret.Event.ENTER_FRAME,this.calculateFPS,this)
        }

        private calculateFPS(){
            var nowTime:number = egret.getTimer();
            var dt = nowTime-this._lastTime;
            this._countTime+=dt;
            if(this._countTime>=1000){
                this._countTime = 0;
                counttime++;
                this.dispatchEvent(new event.ProfilerEvent(event.ProfilerEvent.ON_SECOND));
            }

            this._fps = 1000/dt;
            this._lastTime = nowTime;

            FPS = this._fps;
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
