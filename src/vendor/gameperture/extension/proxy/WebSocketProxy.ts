module gamep {
    export class WebSocketProxy extends gamep.GameProxyer{

        protected _socket:egret.WebSocket;

        public connect(ip:string, port:number,...arg):void {
            this._socket = new egret.WebSocket();
            this._socket.connect(ip, port);
            this._socket.addEventListener(egret.Event.CONNECT, this.onConnect,this);
            this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData,this);
        }

        protected onConnect(e:egret.Event):void {
            trace("onOpen ... ",this._socket);
            this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_CONNECT));
        }

        protected onData(e:egret.Event):void {
            var data = this._socket.readUTF();
            this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_DATA,data));
        }

        protected send(data:any):void {
            this._socket.writeUTF(data);
        }

        protected close():void {
            this._socket.close();
            this.dispatchEvent(new Event.WebSocketEvent(Event.WebSocketEvent.ON_CLOSE));
        }
    }
}