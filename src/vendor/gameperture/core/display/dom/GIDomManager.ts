module gamep{
    export module domele{
        export class GIDomManager{
            private init(){
                //root.anchorX = root.anchorY = 0.5;
                window.onresize = this.resized.bind(this);
                this.$ = this.query.bind(this);
            }

            /**
             * ready
             */
            public checkready(){
                //console.log(this._readytask,document.readyState);
                if ( document.readyState === "complete" ) {
                    this.readyed();

                } else {
                    // Use the handy event callback
                    document.addEventListener( "DOMContentLoaded", this.readyed.bind(this), false );
                    // A fallback to window.onload, that will always work
                    window.addEventListener( "load", this.readyed.bind(this), false );
                }
            }

            private readyed(){
                document.removeEventListener( "DOMContentLoaded", this.readyed, false );
                window.removeEventListener( "load", this.readyed, false );

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
                task = []
                return task;
            }

            /**
             * ele queryer
             */
            public $(ele:any,disabletouch?:boolean):domele.GIDomElement{return null}
            public query(ele:any,disabletouch?:boolean):domele.GIDomElement{
                return new domele.GIDomElement(ele,disabletouch);
            }

            public compare(node1:Node,node2:Node):boolean{
                var boo = (node1===node2);
                if(node1.isSameNode)boo = node1.isSameNode(node2);
                return boo;
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