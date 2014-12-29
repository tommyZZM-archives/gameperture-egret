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
            this._scenery   = new GameScenery(GameStage.SCENERY_ROOT,this);
            this._uinterface= new GameScenery(GameStage.UI_INTERFACE,this);
            GameFacade.instance['_display']=this;
            GameFacade.instance['_logicPostals'].setRoutes(this.createRoutes());
        }

        private startup(){this.onReady();this.dispatchCmd(notify.CMD.GameReady)}

        protected onReady(){

        }

        //TODO:实现场景切换的功能~

        //TODO:实现OnEnterMicroSecond()~

        /**
         *
         * @returns {null}
         */
        protected callRoutes():{ notify: string; displayobj:egret.DisplayObject; callback: Function; }[]{
            return null;
        }

        /** @deprecated */
        private createRoutes():{ notify: string; thisobj:any; callback: Function; }[]{
            var prs:any = this.callRoutes();
            var rs:any = []
            for(var i in prs){
                rs[i] = {};
                rs[i].notify = prs[i].notify;
                rs[i].callback = prs[i].callback;
                rs[i].thisobj = prs[i].displayobj;
            }
            return rs;
        }

        //@public @final
        public dispatchCmd(cmd:string, ...courier:any[]){
            root.dispatchEvent(new Event.FacadeEvent(notify.cmd,cmd,courier));
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

    }
}
