module gp.util{
    export class GameProfiler {

        public static s_time:number = 0;
        public static s_fps:number = 0;

        private _fps:number = 0;
        private _lastTime:number = 0;
        private _countTime:number = 0;

        public constructor() {
            //TODO:your code here
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
                GameProfiler.s_time++;
            }

            this._fps = 1000/dt;
            this._lastTime = nowTime;

            GameProfiler.s_fps = this._fps;
        }
    }
}

module gp {
    export class FPS {
        public static get $60():any {
            return util.GameProfiler.s_fps.toFixed(0);
        }

        public static rateoffest(worldrate:number = 60):number {
            return worldrate / FPS.$60;
        }

        public static get counttime():number{
            return util.GameProfiler.s_time;
        }

    }

}
