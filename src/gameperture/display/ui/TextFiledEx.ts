module gp.display.ui{
    export class TextFiledEx extends gp.viewc.GameUiObject{

        public constructor(name:string,texture:string,x:number=0,y:number=0) {
            this._texture = RES.getRes(texture);
            super(name,x,y);
            //TODO:your code here
        }

        public _display(){
            this._skin = new egret.BitmapText();
            this._skin.spriteSheet = this._texture;
            super._display();
        }

        public get text(){
            return this._skin.text;
        }

        public update(text,is_animate=false,maxSize:number=1.6,duration:number = 500){
            if(is_animate){
                var currscX = this.scaleX;
                var currscY = this.scaleY;
                this.tween.to({scaleX:maxSize,scaleY:maxSize},500).to({scaleX:currscX,scaleY:currscY},500);
            }
            this._skin.text = text+'';
        }
    }
}
