module gamep {
    var _rquickExpr:RegExp = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    var _rsingleTag:RegExp = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
    var _rhtml:RegExp = /<|&#?\w+;/;
    var _rtagName:RegExp = /<([\w:]+)/;
    var _rxhtmlTag:RegExp = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
    var _rallLetter:RegExp = /^[A-Za-z]+$/;

    export module domele {
        export class GIDomElement extends egret.EventDispatcher{
            private _node:HTMLElement;
            private _rotation:number;
            private _nodesuccess:boolean;

            public constructor(selector:any,disabletouch:any) {
                super();

                this._node = this.init(selector);

                if(this.success){
                    this.initTouchEvent();
                }

                //
                this._rotation = 0;
            }

            /**
             *
             * @param selector [create <tag></tag> | #id | htmlElemet]
             * @returns {*}
             */
            private init(selector):HTMLElement{
                var match, elem, tag;
                var result;

                // HANDLE: $(""), $(null), $(undefined), $(false)
                if ( !selector ) {
                    return undefined;
                }

                // Handle HTML strings
                if ( typeof selector === "string" ) {
                    if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
                        // Assume that strings that start and end with <> are HTML and skip the regex check
                        match = [ null, selector, null ];
                    } else {
                        match = _rquickExpr.exec( selector );
                    }

                    // Match html or make sure no context is specified for #id
                    if ( match ) {
                        // HANDLE: $(html) -> $(array)
                        if ( match[1] ) {
                            var parsed:any = _rsingleTag.exec(match[1]);
                            if(parsed){
                                elem = document.createElement( parsed[1] );
                            }else{
                                parsed = _rhtml.test(match[1]);
                                if(parsed){
                                    elem = match[1];
                                    var fragment:any = document.createDocumentFragment();
                                    var fragment:any =fragment.appendChild( document.createElement("div") );
                                    tag = ( _rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                                    fragment.innerHTML =  elem.replace( _rxhtmlTag, "<$1></$2>" );
                                    var tmp = fragment.firstChild;
                                    elem = tmp;
                                    fragment.textContent = "";
                                }
                            }
                            result = elem;
                        } else {
                            elem = document.getElementById( match[2] );
                            if(!elem){
                                warn(match[2] ,"not found");
                                //elem = document.createElement("div");
                                //elem.id = match[2];
                            }
                            //console.log(" if ( !match[1] )",elem);
                        }
                    } else {
                        if(_rallLetter.test(selector)){
                            elem = document.createElement(selector);
                        }
                    }
                    result = elem;

                    // HANDLE: $(DOMElement)
                } else if ( selector.nodeType ) {
                    result = selector;
                }

                if(!result){
                    //warn("query param useage: param[create <tag></tag> | #id | htmlElemet]");
                }
                this._nodesuccess = !!result;

                //console.log(selector,match,result);

                return result;
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

            public rotate(angle:number, transition:number = 1000){
                this.transition = transition;

                if (angle == 0 || angle) {
                    var rotate = angle - this._rotation;
                    this._node.style.transform = "rotate(" + rotate + "deg)";
                    this._node.style["-webkit-transform"] = "rotate(" + rotate + "deg)";
                    this._rotation = rotate;
                }
            }

            public set transition(ms:number){
                this._node.style.transition = ms + "ms";
                this._node.style["-webkit-transition"] = ms + "ms";
            }

            public data(key,value?:string):any{
                if(value)this._node.setAttribute("data-"+key,value);
                return this._node.getAttribute("data-"+key);
            }

            public prop(key,boo:boolean):any{
                boo?this._node["data-"+key]=true:delete this._node["data-"+key];
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

            public get node():HTMLElement {
                return this._node;
            }

            public get success():boolean{
                return this._nodesuccess;
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