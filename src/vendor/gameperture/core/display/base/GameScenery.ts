module gamep {
    export class GameScenery extends GameContainer implements ISceneryComponent{

        public constructor(name:string,parent?:GameStage){
            super();
            this.name = name;
            if(parent)parent.addChild(this);
        }

        public dispatchCmd(cmd:string, ...courier:any[]){
            root.dispatchEvent(new Event.FacadeEvent(notify.cmd,cmd,courier));
        }

        public addCmdFeedback(notify: string, callback: Function,thisObject: egret.DisplayObject):void{
            GameFacade.instance['_cmdPostals'].setRoute(notify,thisObject,callback);
        }
        
        public clear(){this.removeChildren();}
        public hide(...arg):void{this.visible = false;}
        public show(...arg):void{this.visible = true;}

        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
            if(type==Event.ProfilerEvent.ON_MICROSECOND||type==Event.ProfilerEvent.ON_SECOND ){
                utils.GameProfiler.instance.addEventListener(type,listener,thisObject,useCapture,priority);
            }else{
                //console.warn('addEventListener('+type+') has been deprecated!');
                super.addEventListener(type,listener,thisObject,useCapture,priority);
            }
        }

        /** @deprecated */
        public dispatchEvent(event: egret.Event):boolean{
            if(event._type == egret.Event.ADDED_TO_STAGE || event._type == egret.Event.ADDED){
                super.dispatchEvent(event);
                return !(!event);
            }
            console.warn('dispatchEvent() has been deprecated!use dispatchCmd() instead~');
            return null;
            //return super.dispatchEvent(event);
        }
    }
}