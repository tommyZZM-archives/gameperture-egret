module gamep{
    export class GDomUi extends egret.EventDispatcher{
        private _active:boolean;
        public constructor(){
            super();
        }

        private _uiroot:domele.GIDomElement;
        private _gameroot:domele.GIDomElement;
        public active(){
            if(!this._active){
                this._active = true;
                this.init();
            }else{
                warn("domui alreay active!");
            }
        }

        private init(){
            this._uiroot = d$.$("<div></div>");
            this._gameroot = d$.$(client.canvas());
            client.canvas_container().insertBefore(this._uiroot.node, this._gameroot.node);
            this._uiroot.id = "gameUi";
            this._uiroot.css({
                //width:"100%",
                //height: "100%"
            });
            //debug
            var test = d$.$('<div style=width:100px;height:100px;background-color:bisque;></div>');

            this._gameroot.css()["z-index"] = 0;
            this._uiroot.css()["z-index"] = 1;

            this._uiroot.appendChild(test);

            //this.
        }

        private onMouse(e){
            //e.stopPropagation();
        }

        public createBtn(){

        }

        //instance mode
        private static _instance:GDomUi;
        public static get instance():GDomUi{
            if (GDomUi._instance == null) {
                GDomUi._instance = new GDomUi();
            }
            return GDomUi._instance;
        }
    }
}