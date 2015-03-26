module gamep {
    export module domele {
        export var _rcssprop:RegExp = /^(\d+)(\w+)$/i;

        export class GIDomElement extends egret.EventDispatcher{
            private _node:HTMLElement;
            private _rotation:number;
            //private _nodesuccess:boolean;

            public constructor(node:HTMLElement) {
                super();
                this._node = node//this.init(selector);
                if(this.success){
                    this.initTouchEvent();
                }

                this._rotation = 0;
            }

            private initTouchEvent():void{
                //console.log(d$.compare(this._node,client.canvas())||d$.compare(this._node,client.canvas_container()));
                if(d$.compare(this._node,client.canvas())
                    ||d$.compare(this._node,client.canvas_container())
                    ||this._node.id=="gameUi"){
                    return;//不对egretCanvas和CanvasDiv进行侦听
                }

                //trace(client.devicetype());
                if(client.devicetype()===client.DeviceType.PC){
                    this._node.addEventListener("mousedown",this.onmousedown.bind(this));
                    this._node.addEventListener("mouseup",this.onmouseup.bind(this));
                    this._node.addEventListener("click",this.onmouseclick.bind(this));
                    this._node.addEventListener("mouseenter",this.onmouseenter.bind(this));
                    this._node.addEventListener("mouseleave",this.onmouseleave.bind(this));
                }else{
                    this._node.addEventListener("touchstart",this.ontouchbegin.bind(this));
                    this._node.addEventListener("touchmove",this.ontouchmove.bind(this));
                    this._node.addEventListener("touchend",this.ontouchend.bind(this));
                    this._node.addEventListener("touchcancel",this.ontouchend.bind(this));
                    this._node.addEventListener("tap",this.ontouchtap.bind(this));
                }
            }

            public set id(id:string){
                if(!document.getElementById(id)){
                    this._node.id = id;
                }else{
                    warn("duplicate id assignment. ",id);
                }
            }


            /**
             * Document Object Model
             */

            public data(key,value?:string):any{
                if(value)this._node.setAttribute("data-"+key,value);
                return this._node.getAttribute("data-"+key);
            }

            public prop(key,boo:boolean):void{
                if(boo){
                    this._node.setAttribute("data-"+key)
                }else{
                    delete this._node.removeAttribute("data-"+key);
                }
                //return this;
            }

            public appendChild(ele:GIDomElement):GIDomElement{
                this.node.appendChild(ele.node);
                return ele;
            }

            public prependChild(ele:GIDomElement):GIDomElement{
                this.node.insertBefore(ele.node,this.node.children[0])
                return ele;
            }

            public removeChild(ele:GIDomElement):GIDomElement{
                this.node.removeChild(ele.node);
                return ele;
            }

            public children(fn?:(child)=>any,thisArg?:any){
                var children = this._node.children;
                for(var i=0;i<children.length;i++){
                    var child = children[i]
                    if(fn){
                        thisArg?fn.call(thisArg,child):fn(child);
                    }
                }
                return children;
            }

            public get node():HTMLElement {
                return this._node;
            }

            public get success():boolean{
                return !!this._node;
            }

            /**
             * Css style
             */
            //public set x(value:number){}
            public get x():number{
                return this._node.offsetLeft;
            }

            //public set y(value:number){}
            public get y():number{
                return this._node.offsetTop;
            }

            public width():number{
                return this.getcsspropvalue("width")
            }

            public height():number{
                return this.getcsspropvalue("height")
            }

            public getcsspropvalue(name:string,fn?:string):any{
                var result:any = this.css()[name];
                if(!result||result=="auto")result = this.abscss()[name];
                if(result!="auto"&&_rcssprop.exec(result)){
                    this[name]["unit"] = _rcssprop.exec(result)[2];
                    //console.log(_rcssprop.exec(result))
                    result = _rcssprop.exec(result)[1]
                }
                return result
            }

            public css(cssprops?:any):any {
                if(cssprops){
                    for(var prop in cssprops){
                        this._node.style[prop] = cssprops[prop]
                    }
                    return this._node;
                }else{
                    return this._node.style;
                }
            }

            public abscss():any{
                var result = window.getComputedStyle?window.getComputedStyle(this._node):this._node.style;
                return result;
            }

            public rotate(angle:number, transition:number = 1000){
                this.transition = transition;

                if (angle == 0 || angle ||angle!=this._rotation) {
                    var rotate = angle;// - this._rotation;
                    //trace(this._rotation);
                    this._node.style.transform = "rotate(" + angle + "deg)";
                    this._node.style["-webkit-transform"] = "rotate(" + angle + "deg)";
                    this._rotation = rotate;
                }
            }

            public set transition(ms:number){
                this._node.style.transition = ms + "ms";
                this._node.style["-webkit-transition"] = ms + "ms";
            }

            private ontransitionend(){
                console.log("ontransitionend");
            }

            /**
             * Touch事件
             */
            private _touchObserver:any;
            private ontouchbegin(e){
                e.stopPropagation();
                e.preventDefault();
                //trace("ontouchbegin");
                this._touchObserver = {
                    startx:e.touches[0].clientX,
                    starty:e.touches[0].clientY,
                    ctrlKey:e.ctrlKey,
                    altKey:e.altKey,
                    shiftKey:e.shiftKey,
                    touchDown:true
                };
                this.dispatchEvent(new domele.TouchEvent(egret.TouchEvent.TOUCH_BEGIN,
                    false,false,e.touches[0].clientX,e.touches[0].clientY
                    ,this._touchObserver.ctrlKey
                    ,this._touchObserver.altKey,this._touchObserver.shiftKey));
            }

            private ontouchmove(e){
                e.stopPropagation();
                e.preventDefault();
                //trace("ontouchmove",e);
                if (Math.abs(e.touches[0].clientX - this._touchObserver.startx) > 20
                    || Math.abs(e.touches[0].clientY - this._touchObserver.start) > 20) {
                    this._touchObserver.moved = true;
                    this._touchObserver.lastx = e.touches[0].clientX - this._touchObserver.startx;
                    this._touchObserver.lasty = e.touches[0].clientY - this._touchObserver.starty;
                }
            }

            private ontouchend(e){
                e.stopPropagation();
                e.preventDefault();
                //trace("ontouchend");//TODO
                this._touchObserver.touchDown = false;
                this.dispatchEvent(new domele.TouchEvent(egret.TouchEvent.TOUCH_END,
                    false,false,this._touchObserver.lastx,this._touchObserver.lasty
                    ,this._touchObserver.ctrlKey
                    ,this._touchObserver.altKey,this._touchObserver.shiftKey));
                if (!this._touchObserver.moved) {
                    //create custom event
                    var evt;
                    if (window["CustomEvent"]) {
                        evt = new window["CustomEvent"]('tap', {
                            bubbles: true,
                            cancelable: true
                        });
                    } else {
                        evt = document.createEvent('Event');
                        evt.initEvent('tap', true, true);
                    }

                    e.stopPropagation();
                    if (!e.target.dispatchEvent(evt)) {
                        e.preventDefault();
                    }
                    //console.log("tap.....",e.target,evt)
                }

                //trace("here");
            }

            private ontouchtap(e){
                e.stopPropagation();
                e.preventDefault();
                //trace("ontouchtap",e);
                var e:any = new domele.TouchEvent(egret.TouchEvent.TOUCH_TAP,
                    false,false,this._touchObserver.lastx,this._touchObserver.lasty
                    ,this._touchObserver.ctrlKey
                    ,this._touchObserver.altKey,this._touchObserver.shiftKey);
                delete e.localX;
                delete e.localY;
                //trace("before tap",e);
                this.dispatchEvent(e);
            }

            /**
             * Mouse事件
             */
            private onmousedown(e){
                e.stopPropagation();
                trace("onmousedown");
            }

            private onmouseup(e){
                trace("onmouseup");
                e.stopPropagation();
            }

            private onmouseclick(e){
                e.stopPropagation();
                trace("onmouseclick");
            }

            private onmouseenter(e){
                e.stopPropagation();
                //trace("onmouseenter",e);
            }

            private onmouseleave(e){
                e.stopPropagation();
                //trace("onmouseleave",e);
            }

            private onmousemove(e){}
            private onmouseover(e){}
            private onmouseout(e){}


        }

        export class TouchEvent extends egret.Event{
            public stageX:number;
            public stageY:number;
            public ctrlKey:boolean;
            public altKey:boolean;
            public shiftKey:boolean;
            public constructor(type_:string, bubbles:boolean = true, cancelable:boolean = true,
                               stageX:number = 0, stageY:number = 0,
                               ctrlKey:boolean=false,altKey:boolean=false,shiftKey:boolean=false){
                super(type_,bubbles,cancelable);
                this.stageX = stageX;
                this.stageY = stageY;
                this.ctrlKey = ctrlKey;
                this.altKey = altKey;
                this.shiftKey = shiftKey;
            }
        }

    }
}