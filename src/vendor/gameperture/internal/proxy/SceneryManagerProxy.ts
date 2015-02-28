module gamep {

    /**
     * 布景控制器
     */

    export class SceneryManagerProxy extends gamep.GameProxyer{
        public enterScenery(command:any,scenery:string,data?:any){
            this.dispatchSceneryFeedback(command,SceneryManagerEvent.ENTER_SCENE,scenery,data);
        }

        public leaveScenery(command:any,scenery:string,data?:any){
            this.dispatchSceneryFeedback(command,SceneryManagerEvent.LEAVE_SCENE,scenery,data);
        }

        public toogleScenery(command:any,scenery:string,data?:any){
            this.dispatchSceneryFeedback(command,SceneryManagerEvent.TOGGLE_SCENERY,scenery,data);
        }

        private dispatchSceneryFeedback(command:any,type:string,scenery:string,data?:any){
            if(getClassName(command)){
                type = getClassName(command)+type;
                var feeback = {scenery:scenery,mail:data};
                this.dispatchBroadcast(type,feeback);
            }
        }
    }

    export module SceneryManagerEvent{
        export var ENTER_SCENE:string = 'ENTER_SCENE';
        export var LEAVE_SCENE:string = 'LEAVE_SCENE';
        export var TOGGLE_SCENERY:string = 'TOGGLE_SCENERY~~';
    }
}