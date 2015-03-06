module gamep.Pomelo {
    export class PomeloEvent extends ProxyEvent{
        public static ON_HANDSHAKE:string = "PomeloEvent.ON_HANDSHAKE";
        public static ON_CONNECT:string = "PomeloEvent.ON_CONNECT";
        public static ON_DISCONNECT:string = "PomeloEvent.ON_DISCONNECT";
        public static ON_ERROE:string = "PomeloEvent.ON_ERROE";
        public static ON_DATA:string = "PomeloEvent.ON_DATA";

    }

    export class ConnectProxy extends gamep.WebSocketProxy{
        private _heartbeat:number;
        private _heartbeatTimeOut:number;
        private _heartbeatTimeoutId:number;

        protected onConnect():void {
            super.onConnect();
            this.handshake();
        }

        protected onData(data:any):void {
            data = Protocol.Package.decode(data);
            data = this.handelData(data);
            //super.onData(data);
        }

        protected onClose(){
            //console.log(this.host,this.port);
            this.emit(PomeloEvent.ON_DISCONNECT);
        }

        protected onError(e){
            //console.log(e);
            this.emit(PomeloEvent.ON_ERROE);
        }

        public send(data:any){
            var type = Pomelo.MessageType.NOTIFY;
            if(data.msgtype == Pomelo.MessageType.REQUEST){
                type = data.msgtype;
                delete data.msgtype;
                //console.log("data.potype....",data)
            }

            this.sendpomelo(data,data.route,type);
        }

        /*pomelo!*/
        private sendpomelo(data,route,type=Pomelo.MessageType.NOTIFY){
            var rid = 0;
            if(type==Pomelo.MessageType.REQUEST){
                Protocol.reqId++;
                rid = Protocol.reqId;
                //console.log("sendpomelo REQUEST...",data)
            }
            //if(gamep.isdebug)console.log('%c↓↓↓ send pomelo message ↓↓↓',"color:#1abc9c;font-weight:bold;",route,data);
            var data:any = Protocol.strencode(JSON.stringify(data));
            var msg = Protocol.Message.encode(rid, type, 0, route, data);
            msg = Protocol.Package.encode(Protocol.PackageType.DATA, msg);
            super.send(<any>msg.buffer);
        }

        private handshake(){
            if(gamep.isdebug)console.log("say hello to →",this.host,this.port)
            var hello = Protocol.Package.encode(Protocol.PackageType.HANDSHAKE, Protocol.strencode(JSON.stringify(Protocol.handshakeBuffer)));
            super.send(hello.buffer);
        }

        private handelData(data:any):any{
            switch (data.type){
                //握手
                case Protocol.PackageType.HANDSHAKE:{
                    data = JSON.parse(Protocol.strdecode(data.body));
                    var helloback = Protocol.Package.encode(Protocol.PackageType.HANDSHAKE_ACK);
                    super.send(helloback.buffer);//二次握手

                    if(data.sys){
                        if(data.sys.heartbeat){
                            this._heartbeat = <number>data.sys.heartbeat;
                            this._heartbeatTimeOut = this._heartbeat*2;
                            if(gamep.isdebug)console.log("%c[initheartbeat]..","color:#2c3e50;font-weight:bold;",this._heartbeat,this._heartbeatTimeOut);
                        }else{
                            if(gamep.isdebug)console.log("%c[noheartbeat]..","color:#95a5a6;font-weight:bold;");
                        }
                    }
                    if(gamep.isdebug)console.log("reseive hello ←",data);
                    this.emit(PomeloEvent.ON_CONNECT,{host:this.host,port:this.port});
                    break;
                }
                //普通数据
                case Protocol.PackageType.DATA:{
                    var msg:any = Protocol.Message.decode(data.body);
                    msg = Protocol.deCompose(msg);
                    data = msg;
                    this.emit(PomeloEvent.ON_DATA,data);
                    break;
                }
                //心跳包
                case Protocol.PackageType.HEARTBEAT:{
                    if(gamep.isdebug)console.log("%c[heartbeat<]..","color:#2ecc71;font-weight:bold;");
                    if(this._heartbeat){
                        gamep.GameFacade.instance.proxy(CountTimeProxy).addDisposableTimeCallback("pomeloheartbeat",this._heartbeat,this.heartbeat,this);
                    }
                }
            }
            //if(gamep.isdebug)console.log('%c↓↓↓ handel pomelo message ↓↓↓',"color:#f39c12;font-weight:bold;",data);
            return data;
        }

        private heartbeat() {
            if(gamep.isdebug)console.log("%c[heartbeat>]..","color:#27ae60;font-weight:bold;");
            var obj = Protocol.Package.encode(Protocol.PackageType.HEARTBEAT);
            super.send(obj.buffer);
        }

        private emit(event:string,data?:any){
            super.dispatchEvent(new PomeloEvent(event,data))
        }
    }

    export enum MessageType{
        REQUEST = 0,
        NOTIFY = 1,
        RESPONSE = 2,
        PUSH = 3
    }

    module Protocol{
        export var reqId:number = 0;

        export var roomData:any={
            user:undefined,
            serverinfo:undefined
        };

        var PKG_HEAD_BYTES = 4;
        var MSG_FLAG_BYTES = 1;
        var MSG_ROUTE_CODE_BYTES = 2;
        var MSG_ID_MAX_BYTES = 5;
        var MSG_ROUTE_LEN_BYTES = 1;

        var MSG_ROUTE_CODE_MAX = 0xffff;
        var MSG_COMPRESS_ROUTE_MASK = 0x1;
        var MSG_TYPE_MASK = 0x7;

        var JS_WS_CLIENT_TYPE = 'js-websocket';
        var JS_WS_CLIENT_VERSION = '0.0.1';
        export var handshakeBuffer = {
            'sys': {
                type: JS_WS_CLIENT_TYPE,
                version: JS_WS_CLIENT_VERSION
            },
            'user': undefined
        };

        var ByteArray = Uint8Array;

        export enum ResType{
            OK = 200,
            FAIL = 500,
            OLD_CLIENT = 501
        }

        export enum PackageType{
            HANDSHAKE = 1,
            HANDSHAKE_ACK = 2,//二次握手send
            HEARTBEAT = 3,
            DATA = 4,
            KICK = 5,
        }


        export function strencode(str){
            var byteArray = new ByteArray(str.length * 3);

            var offset = 0;
            for(var i = 0; i < str.length; i++){
                var charCode = str.charCodeAt(i);
                var codes:any;
                if(charCode <= 0x7f){
                    codes = [charCode];
                }else if(charCode <= 0x7ff){
                    codes = [0xc0|(charCode>>6), 0x80|(charCode & 0x3f)];
                }else{
                    codes = [0xe0|(charCode>>12), 0x80|((charCode & 0xfc0)>>6), 0x80|(charCode & 0x3f)];
                }
                for(var j = 0; j < codes.length; j++){
                    byteArray[offset] = codes[j];
                    ++offset;
                }
            }
            var _buffer = new ByteArray(offset);
            copyArray(_buffer, 0, byteArray, 0, offset);
            return _buffer;
        }

        export function strdecode(buffer){
            var bytes = new ByteArray(buffer);
            var array = [];
            var offset = 0;
            var charCode = 0;
            var end = bytes.length;
            while(offset < end){
                if(bytes[offset] < 128){
                    charCode = bytes[offset];
                    offset += 1;
                }else if(bytes[offset] < 224){
                    charCode = ((bytes[offset] & 0x3f)<<6) + (bytes[offset+1] & 0x3f);
                    offset += 2;
                }else{
                    charCode = ((bytes[offset] & 0x0f)<<12) + ((bytes[offset+1] & 0x3f)<<6) + (bytes[offset+2] & 0x3f);
                    offset += 3;
                }
                array.push(charCode);
            }
            return String.fromCharCode.apply(null, array);
        }

        export module Package{
            export function encode(type, body?){
                var length = body ? body.length : 0;
                var buffer = new ByteArray(PKG_HEAD_BYTES + length);
                var index = 0;
                buffer[index++] = type & 0xff;
                buffer[index++] = (length >> 16) & 0xff;
                buffer[index++] = (length >> 8) & 0xff;
                buffer[index++] = length & 0xff;
                if(body) {
                    copyArray(buffer, index, body, 0, length);
                }
                return buffer;
            }

            export function decode(buffer){
                var offset = 0;
                var bytes = new ByteArray(buffer);
                var length = 0;
                var rs = [];
                while(offset < bytes.length) {
                    var type = bytes[offset++];
                    length = ((bytes[offset++]) << 16 | (bytes[offset++]) << 8 | bytes[offset++]) >>> 0;
                    var body = length ? new ByteArray(length) : null;
                    copyArray(body, 0, bytes, offset, length);
                    offset += length;
                    rs.push({'type': type, 'body': body});
                }
                return rs.length === 1 ? rs[0]: rs;
            }
        }

        export module Message{
            export function encode(id, type, compressRoute, route, msg){
                var idBytes = msgHasId(type) ? caculateMsgIdBytes(id) : 0;
                var msgLen = MSG_FLAG_BYTES + idBytes;

                if(msgHasRoute(type)) {
                    if(compressRoute) {
                        if(typeof route !== 'number'){
                            throw new Error('error flag for number route!');
                        }
                        msgLen += MSG_ROUTE_CODE_BYTES;
                    } else {
                        msgLen += MSG_ROUTE_LEN_BYTES;
                        if(route) {
                            route = Protocol.strencode(route);
                            if(route.length>255) {
                                throw new Error('route maxlength is overflow');
                            }
                            msgLen += route.length;
                        }
                    }
                }

                if(msg) {
                    msgLen += msg.length;
                }

                var buffer = new ByteArray(msgLen);
                var offset = 0;

                // add flag
                offset = encodeMsgFlag(type, compressRoute, buffer, offset);

                // add message id
                if(msgHasId(type)) {
                    offset = encodeMsgId(id, idBytes, buffer, offset);
                }

                // add route
                if(msgHasRoute(type)) {
                    offset = encodeMsgRoute(compressRoute, route, buffer, offset);
                }

                // add body
                if(msg) {
                    offset = encodeMsgBody(msg, buffer, offset);
                }

                return buffer;
            }

            export function decode(buffer){

                var bytes =  new ByteArray(buffer);
                var bytesLen = bytes.length || bytes.byteLength;
                var offset = 0;
                var id = 0;
                var route:any;

                // parse flag
                var flag = bytes[offset++];
                var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
                var type = (flag >> 1) & MSG_TYPE_MASK;

                // parse id
                if(msgHasId(type)) {
                    var _by = bytes[offset++];
                    id = _by & 0x7f;
                    while(_by & 0x80) {
                        id <<= 7;
                        _by = bytes[offset++];
                        id |= _by & 0x7f;
                    }
                }

                // parse route
                if(msgHasRoute(type)) {
                    if(compressRoute) {
                        route = (bytes[offset++]) << 8 | bytes[offset++];
                    } else {
                        var routeLen = bytes[offset++];
                        if(routeLen) {
                            route = new ByteArray(routeLen);
                            copyArray(route, 0, bytes, offset, routeLen);
                            route = Protocol.strdecode(route);
                        } else {
                            route = '';
                        }
                        offset += routeLen;
                    }
                }

                // parse body
                var bodyLen = bytesLen - offset;
                var body = new ByteArray(bodyLen);

                copyArray(body, 0, bytes, offset, bodyLen);

                return {'id': id, 'type': type, 'compressRoute': compressRoute,
                    'route': route, 'body': body};
            }

            function msgHasId(type){
                return type === Pomelo.MessageType.REQUEST || type === Pomelo.MessageType.RESPONSE;
            }

            function msgHasRoute(type){
                return type === Pomelo.MessageType.REQUEST || type === Pomelo.MessageType.NOTIFY ||
                    type === Pomelo.MessageType.PUSH;
            }

            function caculateMsgIdBytes(id){
                var len = 0;
                do {
                    len += 1;
                    id >>= 7;
                } while(id > 0);
                return len;
            }

            function encodeMsgFlag(type, compressRoute, buffer, offset){
                if(type !== Pomelo.MessageType.REQUEST && type !== Pomelo.MessageType.NOTIFY &&
                    type !== Pomelo.MessageType.RESPONSE && type !== Pomelo.MessageType.PUSH) {
                    throw new Error('unkonw message type: ' + type);
                }

                buffer[offset] = (type << 1) | (compressRoute ? 1 : 0);

                return offset + MSG_FLAG_BYTES;
            }

            function encodeMsgId(id, idBytes, buffer, offset){
                var index = offset + idBytes - 1;
                buffer[index--] = id & 0x7f;
                while(index >= offset) {
                    id >>= 7;
                    buffer[index--] = id & 0x7f | 0x80;
                }
                return offset + idBytes;
            }

            function encodeMsgRoute(compressRoute, route, buffer, offset){
                if (compressRoute) {
                    if(route > MSG_ROUTE_CODE_MAX){
                        throw new Error('route number is overflow');
                    }

                    buffer[offset++] = (route >> 8) & 0xff;
                    buffer[offset++] = route & 0xff;
                } else {
                    if(route) {
                        buffer[offset++] = route.length & 0xff;
                        copyArray(buffer, offset, route, 0, route.length);
                        offset += route.length;
                    } else {
                        buffer[offset++] = 0;
                    }
                }

                return offset;
            }

            function encodeMsgBody(msg, buffer, offset){
                copyArray(buffer, offset, msg, 0, msg.length);
                return offset + msg.length;
            }
        }

        function copyArray(dest, doffset, src, soffset, length){
            if('function' === typeof src.copy) {
                // Buffer
                src.copy(dest, doffset, soffset, soffset + length);
            } else {
                // Uint8Array //←干丫的
                for(var index=0; index<length; index++){
                    dest[doffset++] = src[soffset++];
                }
            }
        }

        export function deCompose(msg){
            msg = JSON.parse(Protocol.strdecode(msg.body));
            return msg;
        }

    }
}