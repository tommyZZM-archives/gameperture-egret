module gamep{
    export module canvasele {
        export class GIDisplay {
            public removeFromParent(child:egret.DisplayObject) {
                if (child.parent) {
                    child.parent.removeChild(child);
                }
            }

            public transParent(child:egret.DisplayObject, target:egret.DisplayObjectContainer):egret.DisplayObject {
                var gpos:egret.Point;
                var npos:egret.Point;
                if (child.parent) {
                    gpos = child.parent.localToGlobal(child.x, child.y);
                    child.parent.removeChild(child);
                }
                target.addChild(child);
                //child.visible = false;
                if (gpos) {
                    npos = target.globalToLocal(gpos.x, gpos.y);
                    child.x = npos.x;
                    child.y = npos.y;
                }
                return child;
            }

            public scaleTo(target:egret.DisplayObject, width:number, height?:number) {
                var scale = width ? width / target.width : height / target.height;
                target.scaleX = target.scaleY = scale;
                if (!target["_size"])target["_size"] = {};
                target["_size"].scaleX = target.scaleX;
                target["_size"].scaleY = target.scaleY;
                target["_size"].height = target.height * target.scaleY;
                target["_size"].width = target.width * target.scaleY;
            }

            public pivot(target:egret.DisplayObject, pivotX:number, pivotY:number):void {
                target.anchorX = pivotX;
                target.anchorY = pivotY;
                if (!target["_size"])target["_size"] = {};
                target["_size"].scaleX = target.scaleX;
                target["_size"].scaleY = target.scaleY;
            }

            public show(target:egret.DisplayObject):void {
                target.visible = true;
            }

            public hide(target:egret.DisplayObject):void {
                target.visible = false;
            }

            public tween(target:egret.DisplayObject):egret.Tween {
                var tween = egret.Tween.get(target);
                tween.setPaused(false);
                return tween;
            }
            public removeTween(target:egret.DisplayObject) {
                egret.Tween.removeTweens(target);
            }

            public get position():canvasele.GIPosition{
                return canvasele.GIPosition.instance;
            }

            private static _instance:GIDisplay;
            public static get instance():GIDisplay{
                if (GIDisplay._instance == null) {
                    GIDisplay._instance = new GIDisplay();
                }
                return GIDisplay._instance;
            }
        }
    }
}