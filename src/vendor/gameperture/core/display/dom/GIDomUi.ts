module gamep{
    export class GIDomUi extends egret.EventDispatcher{
        private _active:boolean;
        public constructor(){
            super();
        }

        private _uiroot:domele.GIDomElement;
        private _gameroot:domele.GIDomElement;
        public active(){
            if(!this._active){
                this._active = true;
                this._uiroot = d$.$("#gameUi");
                if(this._uiroot.success){
                    this.init();
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
            client.canvas_container().insertBefore(this._uiroot.node, this._gameroot.node);
            //this._disableBubble2Canvas();
            this._gameroot.css()["z-index"] = 0;
            this._uiroot.css()["z-index"] = 1;
            this._uiroot.css({width:"100%",display:"block"});

            //this.onResize();
            stage().addEventListener(egret.Event.RESIZE,this.onResize,this);

            //debug
            //var test = d$.$('<div style=width:100px;height:100px;background-color:bisque;></div>',true);
            //this._uiroot.appendChild(test);
            var test = d$.$("#testbtn");
            test.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
            test.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);

        }

        private touchBegin(e){
            e.target.css()["border-radius"]= "100%";
            e.target.css()["-webkit-transform"]= "scale(0.8,0.8)";
            //trace(e.target.css()["border-radius"]);
        }

        private touchEnd(e){
            e.target.css()["border-radius"]= "20%";
            e.target.css()["-webkit-transform"]= "scale(1,1)";

            //trace(e.target.css()["border-radius"]);
        }

        private onResize(){
            trace("domui resize");
            this._uiroot.children((child)=>{
                console.log(d$.$(child).abscss().left,d$.$(child).x);
                //console.log(d$.$(child).data("centeroffsetx"))
                //console.log(d$.$(child).data("centeroffsety"))

            })
        }

        //instance mode
        private static _instance:GIDomUi;
        public static get instance():GIDomUi{
            if (GIDomUi._instance == null) {
                GIDomUi._instance = new GIDomUi();
            }
            return GIDomUi._instance;
        }

        //防止touch事件冒泡被canvas容器接收
        //private replaceTouch = (e)=> {
        //    //e.stopPropagation();
        //};
        //private _disableBubble2Canvas() {
        //    if(!this._uiroot.node["data-"+"egretmousedisabled"]) {
        //        this._uiroot.prop("egretmousedisabled", true);
        //        this._uiroot.node.addEventListener("mousedown", this.replaceTouch);
        //        this._uiroot.node.addEventListener("mousemove", this.replaceTouch);
        //        this._uiroot.node.addEventListener("mouseup", this.replaceTouch);
        //        this._uiroot.node.addEventListener("touchstart", this.replaceTouch);
        //        this._uiroot.node.addEventListener("touchmove", this.replaceTouch);
        //        this._uiroot.node.addEventListener("touchend", this.replaceTouch);
        //        this._uiroot.node.addEventListener("touchcancel", this.replaceTouch);
        //    }
        //}
    }
}