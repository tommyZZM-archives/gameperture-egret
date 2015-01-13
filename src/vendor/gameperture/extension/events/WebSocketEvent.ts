module gamep.Event {
    export class WebSocketEvent extends ProxyEvent{

        public static ON_CONNECT:string = "gamep.Event.WebSocketEvent.ON_CONNECT";
        public static ON_DATA:string = "gamep.Event.WebSocketEvent.ON_DATA";
        public static ON_CLOSE:string = "gamep.Event.WebSocketEvent.ON_CLOSE";
        public static ON_ERROR:string = "gamep.Event.WebSocketEvent.ON_ERROR";

        public constructor(type:string,data?:any) {
            super(type,data);
        }
    }
}