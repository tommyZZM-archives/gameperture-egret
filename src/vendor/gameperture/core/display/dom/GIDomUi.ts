module gamep{
    export class GIDomUi extends egret.EventDispatcher{
        private static _active:boolean;
        public constructor(){
            super();
            this._touchEvent = new gamep.domele.TouchEvent();
        }

        private _uiroot:domele.GIDomElement;
        private _gameroot:domele.GIDomElement;
        public active(){
            if(!GIDomUi._active){
                GIDomUi._active = true;
                this._uiroot = d$.$("#gameUi");
                if(!this._uiroot)this._uiroot = d$.queryex("<div id='gameUi'></div>");
                if(this._uiroot.success){
                    this.uiElementRepose(true);
                    stage().addEventListener(egret.Event.RESIZE,()=>{
                        //trace("here");
                        this._uiroot.css({width:"100%"}).show();
                        stage().removeEventListener(egret.Event.RESIZE,<any>arguments.callee,this);
                        this.init();
                    },this);
                }else{
                    error("domui init fail! check if has <div id='gameUi'></div> ?");
                }

            }else{
                warn("domui alreay active!");
            }
        }

        private init(){
            trace("%cdomui init success!","color:#1ABC9C;font-weight:bold;");
            this._gameroot = d$.$(client.canvas());
            //client.canvas_container().addEventListener("DOMSubtreeModified",()=>{
            //    trace("DOMSubtreeModified");
            //});
            client.canvas_container().insertBefore(this._uiroot.node, this._gameroot.node);
            d$.$(client.canvas()).addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
            d$.$(client.canvas()).addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
            d$.$(client.canvas()).addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);

            this._gameroot.css()["z-index"] = this._gameroot.abscss()["z-index"]=="auto"?9:this._gameroot.abscss()["z-index"];
            this._uiroot.css()["z-index"] = Math.add(this._gameroot.abscss()["z-index"],1);

            this.uiElementRepose();
            stage().addEventListener(egret.Event.RESIZE,this.onResize,this);
            this._uiroot.addEventListener(domele.DomEvent.DOM_MODIFIED,this.onModified,this)

            //console.log(test);
        }

        private _touchEvent:gamep.domele.TouchEvent;
        private onTouch(e){
            //console.log(e.type);
            this._touchEvent.setFlag(e.type,this._uiroot,e.stageX,e.stageY,e.ctrlKey,e.altKey,e.shiftKey);
            this.dispatchEvent(this._touchEvent);
        }

        private onResize(){
            this.uiElementRepose();
        }

        private _uiobserverelements:any;
        private onModified(){
            if(!this._uiobserverelements){
                this._uiobserverelements = [];
            }
            this._uiroot.descendant((child)=>{
                child = d$.$(child);
                if(child.isuiobneeded) {
                    this._uiobserverelements.push(child)
                }
            });
        }

        private uiElementRepose(first?:boolean){
            if(!this._uiobserverelements)this.onModified();
            for(var i=0;i<this._uiobserverelements.length;i++){
                var child = this._uiobserverelements[i];

                child.uiobPosUpdate();

                if(first===true) {
                    child.hide();
                }else{
                    child.show();
                }
            }
            //console.log(this._uiroot.descendant(),this._uiobserverelements);
        }
    }
}