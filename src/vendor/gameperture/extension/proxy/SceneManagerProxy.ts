module gamep {
    export module Proxy{
        export class SceneManagerProxy extends gamep.GameProxyer{
            public enterScene(scene:string,data?:any){
                this.dispatchEvent(new Event.SceneManagerEvent(Event.SceneManagerEvent.ENTER_SCENE,scene,data));
            }
        }
    }

    export module Event{
        export class SceneManagerEvent extends gamep.Event.ProxyEvent{
            public static ENTER_SCENE:string = 'ENTER_SCENE';

            public constructor(type:string, scene:string, data?:any[]) {
                //TODO:your code here
                super(type, {scene:scene,mail:data});
            }
        }
    }
}