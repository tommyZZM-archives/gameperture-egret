module gp.util{
    export class GameProfiler {

        public static s_fps:number = 0;

        private _fps:number = 0;
        private _lastTime:number = 0;

        public constructor() {
            //TODO:your code here
            this.run();
        }

        private run(){
            rootscene.addEventListener(egret.Event.ENTER_FRAME,this.calculateFPS,this)
        }

        private calculateFPS(){
            var nowTime:number = egret.getTimer();
            this._fps = 1000/(nowTime-this._lastTime);
            this._lastTime = nowTime;

            GameProfiler.s_fps = this._fps;
        }
    }
}

module gp.FPS {
    export function $60():any {
        return util.GameProfiler.s_fps.toFixed(0);
    }

    export function rateoffest(worldrate:number = 60):number {
        return worldrate / FPS.$60();
    }
}
