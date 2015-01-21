module gamep {

    /**
     * 布景控制器
     */

    export class SceneryManagerProxy extends gamep.GameProxyer{
        public enterScenery(command:any,scenery:string,data?:any){
            console.log('SceneryManagerProxy');
            this.dispatchEvent(new Event.SceneryManagerEvent(Event.SceneryManagerEvent.ENTER_SCENE,command,scenery,data));
        }
    }

    export module Event{
        export class SceneryManagerEvent extends gamep.Event.ProxyEvent{
            public static ENTER_SCENE:string = 'ENTER_SCENE';

            public constructor(type:string,command:Function, scene:string, data?:any[]) {
                //TODO:your code here
                super( type, command, {scene:scene,mail:data});
                console.log(this.type);
            }
        }
    }
}