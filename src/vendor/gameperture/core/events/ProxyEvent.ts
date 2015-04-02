module gamep {
    export class ProxyEvent extends egret.Event{

        private static UNDIFINED:string = "UNDIFINED_ProxyEvent";
        protected _courier:any;

        public constructor(type?:string, courier?:any) {
            //:your code here
            this._courier = courier;
            super(type?type:ProxyEvent.UNDIFINED, false, false);
        }

        public setflag(type:any, courier?:any,...arg){
            this._type = type;
            this._courier = courier;
        }

        public get courier(){
            return this._courier;
        }

        private static _proxyeventpool:ProxyEventPool;
        public static newEvent(proxyevent:any=ProxyEvent,type?:string, courier?:any):ProxyEvent{
            if(!this._proxyeventpool){
                this._proxyeventpool = new gamep.ProxyEventPool();
            }
            var e = this._proxyeventpool.new(proxyevent);
            if(type)e.setflag(type,courier);
            //trace(this._proxyeventpool);
            return e;
        }

        public static dispatchProxyEvent(target:egret.IEventDispatcher,
                                         proxyevent:any=ProxyEvent,type?:string, courier?:any):any{
            var e = this.newEvent(proxyevent,type,courier);
            target.dispatchEvent(e);
            this._proxyeventpool.destory(e);
            return e;
        }
    }

    export class ProxyEventPool{

        private _eventlist:Dict;
        private _eventpool:Dict;

        public constructor(){
            this._eventlist = new Dict();
            this._eventpool = new Dict();
        }

        public new(event:any):ProxyEvent{
            var result;
            var eventtype = getClassName(event);
            var eventspool = this._eventpool.get(eventtype);if(!eventspool)eventspool = [];
            var eventslist = this._eventlist.get(eventtype);if(!eventslist)eventslist = [];
            if(eventspool.length==0){
                if(isOfClass(event,ProxyEvent)){
                    result = new event();
                }else if(event instanceof ProxyEvent){
                    result = event
                }else{
                    warn("incroect type",getClassName(event))
                }
            }else{
                result = eventspool.pop();
            }

            eventslist.push(result);
            this._eventpool.set(eventtype,eventspool);
            this._eventlist.set(eventtype,eventslist);

            //trace("create",this)

            return result
        }

        public destory(eventobj:ProxyEvent){
            var eventtype = getClassName(eventobj);

            var eventspool = this._eventpool.get(eventtype);if(!eventspool)eventspool = [];
            var eventslist = this._eventlist.get(eventtype);if(!eventslist)eventslist = [];

            eventspool.push(eventobj);

            var index = eventslist.indexOf(eventobj);
            if (index != -1) {
                eventslist.splice(index, 1);
            }

            //trace("destory",this)
        }
    }
}