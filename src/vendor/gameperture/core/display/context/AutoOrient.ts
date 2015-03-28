module gamep{
    export class AutoOrient extends egret.ContentStrategy {

        constructor() {
            super();
        }

        private _orient_flag:boolean;
        private _orient_angel:number;

        public _apply(delegate:egret.StageDelegate, designedResolutionWidth:number, designedResolutionHeight:number):void {
            var _client_height = client.height();
            var _client_width  = client.width();

            var game_height = client.renderHeight();
            var game_width = client.renderWidth();

            this._orient_angel = 0;

            var _domcsspos=()=>{};
            switch (client.orient){
                case client.Orient.Vertical:{
                    this._orient_flag = client.width()>client.height()
                    if(this._orient_flag){
                        _client_height = client.width();
                        _client_width  = client.height();
                        this._orient_angel = -90;
                    }
                    _domcsspos = ()=>{
                        if(per>=client.perfectSize()){
                            _client_height = _client_width*client.perfectSize();
                            game_width = game_height/client.perfectSize();
                        }else{
                            game_height = game_width*per;
                        }
                        //console.log(game_width,game_height,client.renderWidth(),client.renderHeight());
                        //client.canvas_container().style.top = (client.height()-_client_height)/2+"px";
                    };
                    break;
                }
                case client.Orient.Horizontal:{
                    this._orient_flag = client.height()>client.width();
                    if(this._orient_flag){
                        _client_height = client.width();
                        _client_width  = client.height();
                        this._orient_angel = 90;
                    }
                    _domcsspos = ()=>{
                        if(per>=client.perfectSize()){
                            game_width = game_height/per;
                        }else{
                            _client_width = _client_height/client.perfectSize();
                            game_height = game_width*client.perfectSize();
                        }
                        if(this._orient_flag){
                            client.canvas_container().style.left = (client.width()-_client_width)/2+"px";
                        }else{
                            client.canvas_container().style.left = 0+"px";
                        }
                    };
                    break;
                }
                default :{
                    _domcsspos = ()=>{
                        var _renderper = client.renderSize()<1?(1/client.renderSize()/client.renderOffset()):client.renderSize()*client.renderOffset();
                        /*if(per<_renderper){
                            //console.log(per,"per<<client.renderSize()",client.renderSize());
                            game_width = game_height/per;
                        }else{
                            //console.log(per,"per>>client.renderSize()",client.renderSize());
                            game_height = game_width*per;
                        }*/

                        if(client.renderSize()<1){
                            if(per>_renderper){//Gper
                                //GameWin.w = GameWin.h/per;
                                if(per>client.perfectSize())per=client.perfectSize();//TODO:here
                                game_height =  game_width*per;
                            }else{
                                game_height =  game_width*_renderper;
                                _client_width = client.height()/_renderper;
                                _client_height = client.height();
                            }
                        }else{
                            if(per>_renderper){//Gper
                                //GameWin.w = GameWin.h/per;
                                game_width =  game_height/per;
                            }else{
                                game_width =  game_height/_renderper;
                            }
                        }

                    };
                    break;
                }
            }

            var per = _client_height/_client_width;
            _domcsspos();
            client.canvas_container().style.top = (client.height()-_client_height)/2+"px";
            client.canvas_container().style.width = _client_width+"px";
            client.canvas_container().style.height = _client_height+"px";

            client.canvas().style.width = _client_width+"px";
            client.canvas().style.height = _client_height+"px";
            client.canvas().width = game_width;
            client.canvas().height = game_height;

            //trace(client.width(),client.height(),this._orient_angel);
            d$.query(client.canvas_container()).rotate(this._orient_angel);

            var scale:number = (per>=client.perfectSize())
                ? _client_width / client.canvas().width : _client_height / client.canvas().height;

            this.setEgretSize(client.canvas().width, client.canvas().height);

            delegate._scaleX = scale;
            delegate._scaleY = scale;

            //console.log("AutoOrient _apply",client.canvas().width, client.canvas().height)

        }

        public setEgretSize(w:number, h:number):void {
            egret.StageDelegate.getInstance()._stageWidth = Math.round(w);
            egret.StageDelegate.getInstance()._stageHeight = Math.round(h);
            egret.MainContext.instance.stage["_stageWidth"] = w;
            egret.MainContext.instance.stage["_stageHeight"] = h;
        }

        public get orient():number{
            return this._orient_angel;
        }
    }

}