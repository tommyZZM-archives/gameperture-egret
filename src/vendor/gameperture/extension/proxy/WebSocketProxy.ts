module gamep {
    /**
     * Support for HTML5WebSocket on WebView
     */
    export class WebSocketProxy extends gamep.GameProxyer{

        private _socket:egret.HTML5WebSocket;

        public connect(ip:any, port:any,binary:any = BinaryType.Blob,...arg):void {
            this._socket = new egret.HTML5WebSocket();
            this._socket.connect(ip, port);
            this._socket["socket"].binaryType = binary;
            //console.log(this.socketObj.socket);
            this._socket.addCallBacks(this.onConnect,this.onClose,this.onData,this.onError,this);
        }

        protected onConnect(data?:any):void {
            trace("onOpen ... "+this._socket["host"]+":"+this._socket["port"]);
            this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_CONNECT,data));
        }

        protected onData(data:any):void {
            //data = this._socket.readUTF();
            if(data)this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_DATA,data));
        }

        protected onClose(){
            this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_CLOSE));
        }

        protected onError(){
            this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_ERROR));
        }

        public send(data:any):void {
            this._socket.send(data);
        }

        public close():void {
            this._socket.close();
        }

        /*protected get is_connected():boolean{
            return this._socket.connected;
        }*/

        protected get socket():egret.HTML5WebSocket{
            return this._socket;
        }
    }
}

var BinaryType = {
    Blob:"blob",
    ArrayBuffer:"arraybuffer"
};