module gamep{
    /**
     * 游戏舞台
     */
    export class GameStage extends GameContainer implements ISceneryComponent{

        private _scenery;
        /** 舞台 **/

        private _uinterface;
        /** 界面 **/

        public static SCENERY_ROOT:string = 'sceneryroot0112';
        public static UI_INTERFACE:string = 'uinterface0112';

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            gamep.root = root;
            gamep.rootscene = this;
            root.addChild(this);
            this._scenery   = new GameScenery(GameStage.SCENERY_ROOT);
            this._uinterface= new GameScenery(GameStage.UI_INTERFACE);
            super.addChild(this._scenery);
            super.addChild(this._uinterface);
            GameFacade.instance['_display']=this;

            this.name = this['__proto__']['__class__'];
            this.name = /\.?(\w+)$/.exec(this.name)[1];
        }

        private startup(){this.dispatchCmd(GameFacade.instance['_game'],Notify.Cmd.GameReady)}

        protected onReady(){

        }

        //TODO:实现场景切换的功能~

        //TODO:实现OnEnterMicroSecond()~

        //@public @final
        public dispatchCmd(controller:any,cmd:string, ...courier:any[]){
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Cmd,cmd+controller.name,courier));
        }

        //TODO:添加多个侦听有BUG...
        public addFeedbackListener(feed: string, callback: Function,thisObject: egret.DisplayObject = this):void{
            GameFacade.instance['_postals'].get(NotifyType.Feedback).set(feed,{thisobj:thisObject, callback: callback})
        }

        //禁用方法
        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
            console.warn('addEventListener('+type+') has been deprecated!');
            //super.addEventListener(type,listener,thisObject,useCapture,priority);
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

        /** @deprecated */public addChild(child: egret.DisplayObject): egret.DisplayObject{return null}
        /** @deprecated */public addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject{return null}
        /** @deprecated */public removeChild(child: egret.DisplayObject): egret.DisplayObject{return null}
        /** @deprecated */public removeChildAt(index: number): egret.DisplayObject{return null}
        /** @deprecated */public setChildIndex(child: egret.DisplayObject, index: number){}
        /** @deprecated */public removeChildren(){}
    }
}
