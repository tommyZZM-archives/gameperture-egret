module gamep {
    export module domele {
        export var _rcssprop:RegExp = /^(\d+\.?\d+)(\w+)$/i;

        export class GIDomElement extends egret.EventDispatcher{
            private _node:HTMLElement;
            //private _nodesuccess:boolean;

            public constructor(node:HTMLElement) {
                super();
                this._node = node;//this.init(selector);
                if(this.success){
                    this.initEvent();
                }

                this._rotation = 0;
                this._designedcss = this.abscss();
            }

            private initEvent():void{
                //console.log(d$.compare(this._node,client.canvas())||d$.compare(this._node,client.canvas_container()));
                this._touchBubble = (d$.compare(this._node,client.canvas_container())
                ||(d$.compare(this._node,client.canvas())
                ||this._node.id=="gameUi"
                ||this.node.nodeName.toLowerCase()=="html"
                ||this.node.nodeName.toLowerCase()=="body"));

                this._touchAble = !this._touchBubble||(d$.compare(this._node,client.canvas()));

                this.bindTouch();

                this._node.addEventListener("DOMSubtreeModified",this.onDomModified.bind(this));
            }

            private _touchAble:boolean;
            private _touchBubble:boolean;
            private _touchEvent:TouchEvent;//TODO:实现多点触控,手势
            private bindTouch(){
                var touchcallback = (e,fn)=>{
                    //trace(this._touchBubble,this._touchAble,this.tagname)
                    if(!this._touchBubble){
                        e.stopPropagation();
                        e.preventDefault();
                    }
                    if(this._touchAble){
                        fn.call(this,e);
                    }
                };
                //trace(client.devicetype());
                if(client.devicetype()===client.DeviceType.PC){
                    this._node.addEventListener("mousedown",(e)=>{touchcallback(e,this.onmousedown)},true);
                    this._node.addEventListener("mouseup",(e)=>{touchcallback(e,this.onmouseup)},true);
                    this._node.addEventListener("click",(e)=>{touchcallback(e,this.onmouseclick)},true);
                    this._node.addEventListener("mouseenter",(e)=>{touchcallback(e,this.onmouseenter)},true);
                    this._node.addEventListener("mouseleave",(e)=>{touchcallback(e,this.onmouseleave)},true);
                }else{
                    this._node.addEventListener("touchstart",(e)=>{touchcallback(e,this.ontouchbegin)},true);
                    this._node.addEventListener("touchmove",(e)=>{touchcallback(e,this.ontouchmove)},true);
                    this._node.addEventListener("touchend",(e)=>{touchcallback(e,this.ontouchend)},true);
                    this._node.addEventListener("touchcancel",(e)=>{touchcallback(e,this.ontouchend)},true);
                    this._node.addEventListener("tap",(e)=>{touchcallback(e,this.ontouchtap)},true);
                }

                this._touchEvent = new gamep.domele.TouchEvent();
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

            public prop(key,boo?:boolean):any{
                if(boo===true){
                    this._node.setAttribute("data-"+key)
                    return this;
                }else if(boo===false){
                    this._node.removeAttribute("data-"+key);
                    return this;
                }else{
                    return this._node.hasAttribute("data-"+key)
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

            public parent():GIDomElement{
                var parent:GIDomElement;
                if(this._node.parentElement){
                    parent = d$.query(this._node.parentElement)
                }
                return parent
            }

            private _parents;
            public parents(current?:boolean):GIDomElement[]{
                var currele = this;
                var result = [];
                if(!this._parents||current){
                    while(currele.parent()){
                        currele = currele.parent();
                        result.push(currele);
                    }
                    this._parents = result;
                }

                return this._parents;
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

            private _descendantElements:any;
            public descendant(fn?:(descendant)=>any,thisArg?:any,current?:boolean){
                if(!this._descendantElements || current){
                    var children = this._node.getElementsByTagName("*");
                    //trace("this._node.childNodes",children)
                    this._descendantElements = [];
                    for(var i=0;i<children.length;i++){
                        var child = children[i];
                        //trace(child.nodeType,child)
                        if(child.nodeType == NodeType.ELEMENT){
                            this._descendantElements.push(child);
                        }
                    }
                }
                for(var i=0;i<this._descendantElements.length;i++){
                    if(fn){
                        thisArg?fn.call(thisArg,this._descendantElements[i]):fn(this._descendantElements[i]);
                    }
                }
                return this._descendantElements;
            }

            public isdescendantOf(ele:GIDomElement){

            }

            public get node():HTMLElement {
                return this._node;
            }

            public get tagname():string {
                return this.node.nodeName.toLowerCase();
            }

            public get success():boolean{
                return !!this._node;
            }

            private onDomModified(){
                this.dispatchEvent(new DomEvent(DomEvent.DOM_MODIFIED));
                this.descendant(null,null,true);
                this.parents(true);
            }

            /**
             * Css style
             */
            private _display:string;
            public show():GIDomElement{
                //console.log("show",this,this._display);
                if(this._display){
                    this.css({display:this._display});
                }else{
                    this.css({display:"block"})
                }
                return this;
            }

            public hide():GIDomElement{
                this._display = this.abscss().display;
                //console.log("hide",this,this._display);
                this.css({display:"none"});
                return this;
            }

            public width():number{
                return this.getcsspropvalue("width")
            }

            public height():number{
                return this.getcsspropvalue("height")
            }

            public top():number{
                return this.getcsspropvalue("top")
            }

            public left():number{
                return this.getcsspropvalue("left")
            }

            public right():number{
                return this.getcsspropvalue("right")
            }

            public bottom():number{
                return this.getcsspropvalue("bottom")
            }

            public getcsspropvalue(name:string,fn?:string):any{
                //var result:any = this.css()[name];
                var result:any = this.css()[name];
                if(!result||result=="auto")result = this.abscss()[name];
                if(result!="auto"&&_rcssprop.exec(result)){
                    if(this[name])this[name]["unit"] = _rcssprop.exec(result)[2];
                    //console.log(_rcssprop.exec(result))
                    result = _rcssprop.exec(result)[1]
                }
                return result
            }

            public css(cssprops?:any):any {
                if(cssprops){
                    //console.log(cssprops)
                    for(var prop in cssprops){
                        this._node.style[prop] = cssprops[prop]
                    }
                    return this;
                }else{
                    return this._node.style;
                }
            }

            public abscss():any{
                var result = window.getComputedStyle?window.getComputedStyle(this._node):this._node.style;
                return result;
            }

            private _designedcss:number;
            public get designedCss(){
                return this._designedcss;
            }

            private _rotation:number;
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
                this._node.style["transition-duration"]= ms + "ms";
                this._node.style["-webkit-transition-duration"] = ms + "ms";
            }
            //private ontransitionend(){
            //    console.log("ontransitionend");
            //}

            /**
             * Position
             */
            public get anchorX():number{
                var result = this.data("anchorX");
                return (!!result&&Number(result)||result==0)?result:0.5;
            }

            public get anchorY():number{
                var result = this.data("anchorY");
                return (!!result&&Number(result)||result==0)?result:0.5;
            }

            public get uiobhorz():number{
                var result = this.data("uiobhorz");
                return (!!result&&Number(result)||result==0)?Number(result):0;
            }

            public get uiobvert():number{
                var result = this.data("uiobvert");
                return (!!result&&Number(result)||result==0)?Number(result):0;
            }

            private _isuiobneeded:boolean;
            public uiobPosUpdate():void{
                //trace("uiobPosUpdate",flag)
                if(this.isuiobneeded) {
                    this.css({position: "absolute"});
                    //console.log(Math.value(child.designedCss.top),child.uiobhorz,child.uiobvert);

                    var grid9x = d$.$(client.canvas_container()).width() * this.uiobhorz;
                    var grid9y = d$.$(client.canvas_container()).height() * this.uiobvert;

                    var achrox = this.anchorX;
                    var achroy = this.anchorY;

                    this.css()["margin-left"] = -this.width() * achrox + "px";
                    this.css()["margin-top"] = -this.height() * achroy + "px";

                    this.css().left = grid9x + "px";
                    this.css().top = grid9y + "px";
                }
            }
            public get isuiobneeded():boolean{
                this._isuiobneeded = (this.prop("gameuiobserve")||this.prop("gameuiob"))&&
                (!this.parent().prop("gameuiobserve")&&!this.parent().prop("gameuiob"));
                return this._isuiobneeded;
            }

            //public set x(value:number){}
            public get offsetLeft():number{
                return this._node.offsetLeft;
            }

            //public set y(value:number){}
            public get offsetTop():number{
                return this._node.offsetTop;
            }

            /**
             * Touch事件
             */
            private _touchObserver:any;
            private ontouchbegin(e){
                //e.stopPropagation();
                //e.preventDefault();
                //trace("ontouchbegin",e);
                this._touchObserver = {
                    startx:e.touches[0].clientX,
                    starty:e.touches[0].clientY,
                    ctrlKey:e.ctrlKey,
                    altKey:e.altKey,
                    shiftKey:e.shiftKey,
                    touchDown:true
                };
                this._touchEvent.setFlag(egret.TouchEvent["TOUCH_BEGIN"],
                    this,e.touches[0].clientX,e.touches[0].clientY
                    ,this._touchObserver.ctrlKey
                    ,this._touchObserver.altKey,this._touchObserver.shiftKey);
                //trace(this._touchEvent);
                this.dispatchEvent(this._touchEvent);
            }

            private ontouchmove(e){
                //e.stopPropagation();
                //e.preventDefault();
                //trace("ontouchmove",e);
                if (Math.abs(e.touches[0].clientX - this._touchObserver.startx) > 20
                    || Math.abs(e.touches[0].clientY - this._touchObserver.start) > 20) {
                    this._touchObserver.moved = true;
                    this._touchObserver.lastx = e.touches[0].clientX - this._touchObserver.startx;
                    this._touchObserver.lasty = e.touches[0].clientY - this._touchObserver.starty;
                }
            }

            private ontouchend(e){
                //e.stopPropagation();
                //e.preventDefault();
                //trace("ontouchend",e);
                this._touchObserver.touchDown = false;

                this._touchEvent.setFlag(egret.TouchEvent["TOUCH_END"],
                    this,this._touchObserver.lastx,this._touchObserver.lasty
                    ,this._touchObserver.ctrlKey
                    ,this._touchObserver.altKey,this._touchObserver.shiftKey)
                this.dispatchEvent(this._touchEvent);
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

                    //e.stopPropagation();
                    if (!e.target.dispatchEvent(evt)) {
                        e.preventDefault();
                    }
                    //console.log("tap.....",e.target,evt)
                }

                //trace("here");
            }

            private ontouchtap(e){
                //e.stopPropagation();
                //e.preventDefault();
                //trace("ontouchtap",e);

                this._touchEvent.setFlag(egret.TouchEvent["TOUCH_TAP"],
                    this,this._touchObserver.lastx,this._touchObserver.lasty
                    ,this._touchObserver.ctrlKey
                    ,this._touchObserver.altKey,this._touchObserver.shiftKey)
                this.dispatchEvent(this._touchEvent);

                //trace("before tap",e);
                //this.dispatchEvent(e);
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

        export class DomEvent extends egret.Event{
            public static DOM_MODIFIED:string = "DomEvent_DOM_MODIFIED"

            public constructor(type:string, bubbles:boolean = true, cancelable:boolean = true){
                super(type,bubbles,cancelable);
            }
        }

        export class TouchEvent extends ProxyEvent{
            public stageX:number;
            public stageY:number;
            public ctrlKey:boolean;
            public altKey:boolean;
            public shiftKey:boolean;
            public constructor(){
                super();
            }

            public setFlag(type:string,target:GIDomElement,
                           stageX:number = 0, stageY:number = 0,
                           ctrlKey:boolean=false,altKey:boolean=false,shiftKey:boolean=false){
                this._type = type;
                this.target = target;
                this.stageX = stageX;
                this.stageY = stageY;
                this.ctrlKey = ctrlKey;
                this.altKey = altKey;
                this.shiftKey = shiftKey;

            }
        }

    }
}