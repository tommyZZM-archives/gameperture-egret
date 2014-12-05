module gp.display.ui{
    export class TextFiledEx extends gp.viewc.GameUiObject{

        public _charlist:any;

        public constructor(name:string,texture:string,x:number=0,y:number=0,
                           pivotX:number=0.5,pivotY:number=0.5) {
            this._texture = RES.getRes(texture);
            super(name,x,y,'custom',pivotX,pivotY);
            //TODO:your code here
        }

        public _display(){
            this._skin = new egret.BitmapText();
            this._skin.spriteSheet = this._texture;
            var d:any;
            for(var i in this._texture['charList']){d=i;break;}
            this._skin.text = d;
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
            this.width = this._skin.width;
            this.height = this._skin.height;
        }
    }
}
