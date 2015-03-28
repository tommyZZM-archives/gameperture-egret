module gamep{
    /**
     * 游戏舞台
     */
    //export enum GameUIType{
    //    Normal=0,
    //    DomUI=23
    //}

    export class GameStage extends egret.DisplayObjectContainer{// extends GameContainer

        private _sceneryroot;
        /** 舞台 **/

        private _uinterface:GIDomUi;
        /** 界面 **/
        public static SCENERY_ROOT:string = 'sceneryroot0112';

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            gamep.root = root;
            gamep.rootscene = this;
            root.addChild(this);
            this._sceneryroot   = new GameScenery(GameStage.SCENERY_ROOT);
            //this._uinterface= new GameScenery(GameStage.UI_INTERFACE);
            super.addChild(this._sceneryroot);
            //super.addChild(this._uinterface);
            GameFacade.instance['_display']=this;

            this.name = this['__proto__']['__class__'];
            this.name = /\.?(\w+)$/.exec(this.name)[1];
            this._uinterface = new GIDomUi();

            //this._scenerypool = new Dict();
        }

        private startup(){
            this._uinterface.active();
            var courier = this.onStartup();
            root.dispatchEvent(new Core.FacadeEvent(NotifyType.Cmd,Notify.Cmd.GameReady+getClassName(a$['_game']),courier));
        }

        protected onStartup(){

        }

        protected get uinterface():GIDomUi{
            return this._uinterface;
        }

        //TO/DO:实现场景切换的功能~
        public forceAddChild(child: egret.DisplayObject): egret.DisplayObject{
            return super.addChild(child);
        }

        public forceRemoveChild(child: egret.DisplayObject): egret.DisplayObject{
            if(child==this._sceneryroot){return null;}
            return super.removeChild(child);
        }

        /** @deprecated */public addChild(child: egret.DisplayObject): egret.DisplayObject{return null}
        /** @deprecated */public addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject{return null}
        /** @deprecated */public removeChild(child: egret.DisplayObject): egret.DisplayObject{return null}
        /** @deprecated */public removeChildAt(index: number): egret.DisplayObject{return null}
        /** @deprecated */public setChildIndex(child: egret.DisplayObject, index: number){}
        /** @deprecated */public removeChildren(){}

        /** @deprecated */
        public addEventListener(type:string, listener:Function, thisObject:any, useCapture?:boolean, priority?:number):void {
            console.warn('addEventListener(' + type + ') has been deprecated!');
            //super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        /** @deprecated */
        public dispatchEvent(event:egret.Event):boolean {
            if (event._type == egret.Event.ADDED_TO_STAGE
                || event._type == egret.Event.ADDED
                || event._type == egret.Event.REMOVED
                || event._type == egret.Event.REMOVED_FROM_STAGE) {
                super.dispatchEvent(event);
                return !(!event);
            }
            console.warn('dispatchEvent() has been deprecated!use dispatchCmd() instead~', 'type:' + event._type);
            return null;
            //return super.dispatchEvent(event);
        }
    }
}
