module gamep.utils{

    export var FPS:number = 0;
    export function rateoffest(worldrate:number = 60):number {
        return worldrate / FPS;
    }
    var countsecond:number = 0;
    var countmicrosecond:number = 0;

    export class GameProfiler extends egret.EventDispatcher{

        private _fps:number = 0;
        private _lastTime:number = 0;

        private _countMicroSecond:number = 0;
        private _countSecond:number = 0;

        public constructor() {
            super();
            this.run();
        }

        private run(){
            root.addEventListener(egret.Event.ENTER_FRAME,this.calculateFPS,this)
        }

        private calculateFPS(){
            var nowTime:number = egret.getTimer();
            var dt = nowTime-this._lastTime;
            this._countSecond+=dt;
            this._countMicroSecond+=dt;

            if(this._countMicroSecond>=10){
                this._countMicroSecond = 0;
                countmicrosecond++;
                this.dispatchEvent(new gamep.Event.ProfilerEvent(Event.IProfilerEvent.ON_MICROSECOND,countmicrosecond));
            }

            if(this._countSecond>=1000){
                this._countSecond = 0;
                countsecond++;
                this.dispatchEvent(new gamep.Event.ProfilerEvent(Event.IProfilerEvent.ON_SECOND,countsecond));
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
