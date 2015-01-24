/**
 * IProtected专门用于解决IDEA对于protected的提示问题
 * 禁止export!
 */
module gamep {
    /*class GameCmder{
        protected getProxy(proxy:any){}
    }

    class GameCycler{
        protected onStartup(){}
        protected get stage(){}
    }

    class GameStage{
        protected addScenery(scene:GameScenery){}
        protected toggleToScenery(name:string,mail:any,transitions?){}
    }*/

    class GameLogicer{
        public getObject(scenery:string,obj:string):any{}
        public onEnter100MillSecond(e:Event.ProfilerEvent){}
        public onEnterSecond(e:Event.ProfilerEvent){}
    }

    /*class GameSprite extends egret.DisplayObjectContainer{
        public display(...arg);
    }*/

    class WebSocketProxy {
        public onConnect(...arg){}
        public onData(...arg){}
        public send(data:any){}
        public close(...arg){}
    }
}