module gamep {

    /**
     * 布景控制器
     */

    export class SceneryManagerProxy extends gamep.GameProxyer{
        public enterScenery(command:any,scenery:string,data?:any){
            var type = SceneryManagerEvent.ENTER_SCENE;
            if(getClassName(command)){
                type = getClassName(command)+type;
                console.log('SceneryManagerProxy');
                var feeback = {scene:scenery,mail:data};
                this.dispatchSimpleFeedback(type,feeback);
            }

        }
    }

    export module SceneryManagerEvent{
        export var ENTER_SCENE:string = 'ENTER_SCENE';
    }
}