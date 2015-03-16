module gamep{
    export module canvasele {
        export function removeFromParent(child:egret.DisplayObject) {
            if (child.parent) {
                child.parent.removeChild(child);
            }
        }

        export function transParent(child:egret.DisplayObject, target:egret.DisplayObjectContainer):egret.DisplayObject {
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

        export function scaleTo(target:egret.DisplayObject, width:number, height:number) {
            var scale = width ? width / target.width : height / target.height;
            target.scaleX = target.scaleY = scale;
            if (!target["_size"])target["_size"] = {};
            target["_size"].scaleX = target.scaleX;
            target["_size"].scaleY = target.scaleY;
            target["_size"].height = target.height * target.scaleY;
            target["_size"].width = target.width * target.scaleY;
        }

        export function pivotFix(target:egret.DisplayObject, pivotX:number, pivotY:number):void {
            target.anchorX = pivotX;
            target.anchorY = pivotY;
            if (!target["_size"])target["_size"] = {};
            target["_size"].scaleX = target.scaleX;
            target["_size"].scaleY = target.scaleY;
        }

        export function show(target:egret.DisplayObject):void {
            target.visible = true;
        }

        export function hide(target:egret.DisplayObject):void {
            target.visible = false;
        }

        export function tween(target:egret.DisplayObject):egret.Tween {
            var tween = egret.Tween.get(target);
            tween.setPaused(false);
            return tween;
        }

        export function fadeIn(target:egret.DisplayObject, duration:number = 200) {
            show(target);
            target.alpha = 0;
            tween(target).to({alpha: 1}, duration);
        }

        export function fadeOut(target:egret.DisplayObject, duration:number = 200) {
            tween(target).to({alpha: 0}, duration).call(hide, this, [target]);
        }

        export function removeTween(target:egret.DisplayObject) {
            egret.Tween.removeTweens(target);
        }
    }
}