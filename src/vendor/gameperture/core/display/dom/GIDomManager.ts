module gamep{
    export module domele{
        var _rquickExpr:RegExp = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
        var _rsingleTag:RegExp = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
        var _rhtml:RegExp = /<|&#?\w+;/;
        var _rtagName:RegExp = /<([\w:]+)/;
        var _rxhtmlTag:RegExp = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
        var _rallLetter:RegExp = /^[A-Za-z]+$/;

        export enum NodeType{
            ELEMENT=1,
            ARRT = 2,
            TEXT = 3,
            COMMENTS = 8,
            DOCUMENT = 9
        }

        export class GIDomManager{
            private init(){
                //error("init........................")
                //root.anchorX = root.anchorY = 0.5;
                window.onresize = this.resized.bind(this);
                this._elequerypool = new Dict();
                this.$ = this.query.bind(this);
            }

            /**
             * ready
             */
            private _chekced:boolean;
            public checkready(){
                //console.log(this._readytask,document.readyState);
                //trace("checnkready",document.readyState)
                if ( document.readyState === "complete" ) {
                    this.readyed();

                } else {
                    // Use the handy event callback
                    //document.addEventListener( "DOMContentLoaded", this.readyed.bind(this) );
                    // A fallback to window.onload, that will always work
                    if(!this._chekced){
                        window.addEventListener("load", ()=>{
                            window.removeEventListener( "load", <any>arguments.callee, false );
                            trace("window loaded");
                            this.readyed()
                        }, false );
                        this._chekced = true;
                    }
                }
            }

            private _readyed:boolean;
            private readyed(){
                //document.removeEventListener( "DOMContentLoaded", this.readyed, false );
                this.init();
                this._readytask = this.runtask(this._readytask);
            }

            private _readytask:any;
            public ready(callback:Function,thisArg?:any,...param){
                if(!this._readytask){this._readytask = [];}
                this._readytask.push({callback:callback,thisArg:thisArg,paramArr:param});
                this.checkready();
            }

            /**
             * resized
             */
            private resized(){
                this.runtask(this._resizetask);
            }
            private _resizetask:any;
            public resize(callback:Function,thisArg?:any,...param){
                if(!this._resizetask){this._resizetask = [];}
                this._resizetask.push({callback:callback,thisArg:thisArg,paramArr:param});
            }
            private runtask(task){
                if(task){
                    for(var i=0;i<task.length;i++){
                        task[i].callback.apply(task[i].thisArg,task[i].paramArr);
                    }
                }
                task = [];
                return task;
            }

            /**
             * ele queryer
             */
            private _elequerypool:Dict;
            public $(ele:any):domele.GIDomElement{return null}
            public query(ele:any):domele.GIDomElement{
                if(ele instanceof domele.GIDomElement){return ele};
                var ele:any = this.prase(ele);
                var result;
                //console.log(ele,ele.getAttribute("data-gidomqueried"));
                if(ele){
                    if(!ele.getAttribute("data-gidomqueried")){
                        result = new domele.GIDomElement(ele);
                        //console.log(result);
                        ele.setAttribute("data-gidomqueried",result.hashCode);
                        this._elequerypool.set(result.hashCode+"",result);
                    }else{
                        //trace("has already")
                        result = this._elequerypool.get(ele.getAttribute("data-gidomqueried"));
                    }
                }
                //console.log(this._elequerypool,this._resizetask,ele.getAttribute("data-gidomqueried"));
                return result;
            }
            public queryex(ele:any):domele.GIDomElement{
                var result = this.query(ele);
                if(!result){
                    var ele:any = this.prase(ele,true);
                    result = this.query(ele);
                }
                return result
            }

            public compare(node1:Node,node2:Node):boolean{
                var boo = (node1===node2);
                if(node1.isSameNode)boo = node1.isSameNode(node2);
                return boo;
            }

            /**
             *
             * @param selector [create <tag></tag> | #id | htmlElemet]
             * @returns {*}
             */
            private prase(selector,create?):HTMLElement{
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
                            if(create===true){//如果开启创建dom节点
                                var parsed:any = _rsingleTag.exec(match[1]);
                                if(parsed){
                                    elem = document.createElement( parsed[1] );
                                }else{
                                    parsed = _rhtml.test(match[1]);
                                    if(parsed){
                                        elem = match[1];
                                        var fragment:any = document.createDocumentFragment();
                                        var fragment:any =fragment.appendChild( document.createElement("div") );
                                        //tag = ( _rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
                                        fragment.innerHTML =  elem.replace( _rxhtmlTag, "<$1></$2>" );
                                        var tmp = fragment.firstChild;
                                        elem = tmp;
                                        fragment.textContent = "";
                                    }
                                }
                            }
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
                } else if ( selector.nodeType == NodeType.ELEMENT ) {
                    result = selector;
                }

                if(!result){
                    //warn("query param useage: param[create <tag></tag> | #id | htmlElemet]");
                }

                //console.log(selector,match,result);

                return result;
            }

            //instance mode
            private static _instance:GIDomManager;
            public static get instance():GIDomManager{
                if (GIDomManager._instance == null) {
                    GIDomManager._instance = new GIDomManager();
                }
                return GIDomManager._instance;
            }
        }
    }
}