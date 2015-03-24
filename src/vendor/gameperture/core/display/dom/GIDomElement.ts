module gamep {
    export module domele {
        export class GIDomElement {
            private _node:HTMLElement;
            private _rotation:number;

            private _rquickExpr:RegExp;
            private _rsingleTag:RegExp;

            private _rhtml:RegExp;
            private _rtagName:RegExp;
            private _rxhtmlTag:RegExp;

            private _rallLetter:RegExp;

            public constructor(selector:any) {
                this._rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
                this._rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
                this._rhtml = /<|&#?\w+;/;
                this._rtagName = /<([\w:]+)/;
                this._rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
                this._rallLetter = /^[A-Za-z]+$/;

                this._node = this.init(selector);

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
                        match = this._rquickExpr.exec( selector );
                    }

                    // Match html or make sure no context is specified for #id
                    if ( match ) {
                        // HANDLE: $(html) -> $(array)
                        if ( match[1] ) {
                            var parsed:any = this._rsingleTag.exec(match[1]);
                            if(parsed){
                                elem = document.createElement( parsed[1] );
                            }else{
                                parsed = this._rhtml.test(match[1]);
                                if(parsed){
                                    elem = match[1];
                                    var fragment:any = document.createDocumentFragment();
                                    var fragment:any =fragment.appendChild( document.createElement("div") );
                                    tag = ( this._rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                                    fragment.innerHTML =  elem.replace( this._rxhtmlTag, "<$1></$2>" );
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
                                elem = document.createElement("div");
                                elem.id = match[2];
                            }
                            //console.log(" if ( !match[1] )",elem);
                        }
                    } else {
                        if(this._rallLetter.test(selector)){
                            elem = document.createElement(selector);
                        }
                    }
                    result = elem;

                    // HANDLE: $(DOMElement)
                } else if ( selector.nodeType ) {
                    result = selector;
                }

                if(!result){
                    warn("query param useage: param[create <tag></tag> | #id | htmlElemet]");
                }

                //console.log(selector,match,result);

                return result;
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
        }

        /*function disableDefaultTouch( ele:GIDomElement ) {
            var disable = (e)=>{e.stopPropagation();};
            ele.node.addEventListener("mousedown",disable);
            ele.node.addEventListener("mousemove",disable);
            ele.node.addEventListener("mouseup",disable);
            ele.node.addEventListener("touchstart",disable);
            ele.node.addEventListener("touchmove",disable);
            ele.node.addEventListener("touchend",disable);
            ele.node.addEventListener("touchcancel",disable);
        }*/
    }
}