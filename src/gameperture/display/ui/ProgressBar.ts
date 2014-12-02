module gp.display.ui{
    export class ProgressBar extends gp.viewc.GameUiObject{

        private _emptyclour:number;
        private _fillclour:number;

        private _emptycrumb:any;
        private _fillcrumb:any;

        public constructor(name:string,x:number,y:number, width:number, heigth:number, emptyclour?:number, fillclour?:number) {
            this._width = width;
            this._height = heigth;
            emptyclour?this._emptyclour = emptyclour:this._emptyclour=Art.colour('d6d6d6');
            fillclour?this._fillclour = fillclour:this._fillclour=Art.colour('1ac2ff');
            super(name,x,y,'center');
            //TODO:your code
        }

        public _display(){
            this._emptycrumb =  new egret.Shape();
            this._emptycrumb = new egret.Shape();
            this._emptycrumb.graphics.beginFill(this._emptyclour,1);
            this._emptycrumb.graphics.drawRoundRect(0,0,this.width,this.height,10);
            this._emptycrumb.graphics.endFill();

            this._fillcrumb = new egret.Shape();
            this._fillcrumb.graphics.beginFill(this._fillclour,1);
            this._fillcrumb.graphics.drawRoundRect(0,0,this.width,this.height,10);
            this._fillcrumb.graphics.endFill();
            this._fillcrumb.mask = new egret.Rectangle(-1,-1,this.width+1,this.height+1);
            this._fillcrumb.mask.width = 0;

            this.addChild(this._emptycrumb);
            this.addChild(this._fillcrumb);
        }

        public update(pct):void{
            if(pct>1){
                pct = pct/100;
            }
            this._fillcrumb.mask.width = (this.width+2)*pct;
        }

    }
}
