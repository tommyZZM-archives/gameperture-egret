module gamep {
    /**
     * 游戏逻辑业务,具备获得场景中的物体的能力!
     */
    export class GameLogicer extends GameProxyer{

        public addTimeListener(type:Event.IProfilerEvent){
            var callback:Function;
            switch (type){
                case Event.IProfilerEvent.ON_MICROSECOND:
                    callback = this.onEnterMicrosecond;
                    break;
                case Event.IProfilerEvent.ON_SECOND:
                    callback = this.onEnterSecond;
                    break;
            }
            utils.GameProfiler.instance.addEventListener(type+'ProfilerEvent',callback,this);
        }

        protected getObject(scenery:string,obj:string):any{
            return GameFacade.instance['_display'].selectChild(scenery).selectChild(obj);
        }

        protected onEnterMicrosecond(e:Event.ProfilerEvent){

        }

        protected onEnterSecond(e:Event.ProfilerEvent){

        }

    }
}