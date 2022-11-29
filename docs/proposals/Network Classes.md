# Network Class Proposals for Ecma-419
Updated November 29, 2022<br>
Copyright 2022 Moddable Tech Inc.<br>

This document is a draft of classes to support operations on TCP/IP networks.  It builds on the [Ecma-419](https://419.ecma-international.org), particularly the [TCP](https://419.ecma-international.org/#-10-io-classes-tcp-socket) and [UDP](https://419.ecma-international.org/#-10-io-classes-udp-socket) sockets. The APIs are intended to follow the conventions established in the first edition of Ecma-419.

### Class specifications

- [Network Interface](#network-interface)
- [DNS Resolver](#network-dns-resolver)
- [HTTP Request](#network-http-request)
- [WebSocket Client](#network-websocket-client)
- [MQTT Client](#network-mqtt-client)

### References

When this draft is merged into Ecma-419, the following references need to be added.

#### Normative
- HTTP RFC
- WebSocket RFC
- MQTT OASIS Standard
- DNS RFC 
- DoH RFC

#### Non-normative
- MQTT module for Node

<a id="network-interface"></a>
## Network Interface Class Pattern

Instances of the Network Interface Class Pattern provide scripts with access to  each network interface on the device. It is used to:

- manage the interface
- access interface properties
- receive interface events

> **Note**: The network interface is managed by the host. The host creates the interface before the JavaScript machine starts. Creating an instance of the Network Interface Class Pattern does not create the network interface and closing the instance does not close the network interface. 

There may be multiple simultaneous instances of a single Network Interface class. 

Network interfaces may be physically built into the microcontroller as a separate peripheral. (Does the latter oblige us to define Network Interface on an IO Provider???)

### constructor(options)

| Property | Description |
| :---: | :--- |
| `onEvent(event)` | A function that will be called when events occur on the network interface. The event argument is a string. This property is optional. |

Network Interface event values:

| String | Description |
| :---: | :--- |
| `"ready"` | Network interface ready for connection |
| `"connected"` | Network connection status changed |
| `"address"` | Interface has an IP address assigned |

### close()

As per Base Class Pattern.

### get(property)

Returns the current value of the property. Property names are strings. If the property name is unknown or has no current value, `get` returns `undefined`.

| Property | Description |
| :---: | :--- |
| `"ready"` | Interface ready to use as a Boolean|
| `"connected"` | Physically connected to network as a Boolean |
| `"address"` | IP address of the interface as a String |
| `"MAC"` | MAC address of this network interface as a XXXXX |

### set(property)

Sets the current value of the property. Property names are strings. If the property name is unknown or is read-only, `set` throws an exception.

### Wi-Fi Network Interface

Wi-Fi Network Interface events:

| String | Description |
| :---: | :--- |
| `"connected"` | Connection status to Wi-Fi base station changed |

W-Fi Network Interface properties:

| String | Description |
| :---: | :--- |
| `"ssid"` | Name of currently connected base station as a String |
| `"bssid"` | BSSID ofo currently connected base station as a XXXXX |
| `"rssi"` | Signal strength of current connection as a Number |
| `"channel"` | Wi-Fi channel number of current connection as a Number |

#### connect(options)

Initiates the process of connecting to a  Wi-Fi base station. The connection is defined by the properties of the options object.

Throws if a connection attempt is already in progress.

| String | Description |
| :---: | :--- |
| `"ssid"` | Name of base station as a String |
| `"password"` | Base station password as a String. This property is optional. |
| `"channel"` | Wi-Fi channel of base station as a Number. This property is optional. |
| `"bssid"` | BSSID of base station as a XXXXXX. This property is optional. |

> To-do: Property to assert security requirements (e.g. don't connect to open access point, require certain security support, etc.)

#### disconnect()

Disconnects from the currently connected Wi-Fi base station. If already disconnected, does nothing.

#### scan(options)

Begins a scan for Wi-Fi base stations. The scan is time limited to no more than 10 seconds. A continuous scan may be performed by repeated scans.

Properties of the `scan` options object:

| String | Description |
| :---: | :--- |
| `"channel"` | Wi-Fi channel number to scan as a Number. This property is optional. |
| `"frequency"` | Wi-Fi frequency to scan: 2.4 or 5. This property is optional. |
| `"security"` | Limit scan results to secure or open access points as a a Boolean. This property is optional. |
| `"onFound(found)"` | A callback function to receive an object containing information about an access point discovered by the scan. This property is required. |
| `"onComplete()"` | A callback function called when the scan is complete. This property is optional. |

Properties of the `onFound` options object for each scanned access point :

| String | Description |
| :---: | :--- |
| `"ssid"` | Name of the access point as a String. |
| `"bssid"` | BSSID as a XXXXX. |
| `"channel"` | Channel number as a Number. |
| `"rssi"` | Signal strength as a Number. |
| `"security"` | Security mode as a String. |

The scan cannot be canceled.

After the Wi-Fi network interface instance is closed, the scan callbacks are not called.

### Ethernet Network Interface

Network Interface event values:

| String | Description |
| :---: | :--- |
| `"connected"` | Physically connected to Ethernet network changed |

### Others

- Cellular Radio
- Bluetooth PAN
- Wi-Fi access point (internal)
- Ad-Hoc Wi-Fi connections
- Wi-Fi Direct

### Network Interfaces on Host Provider Instance

The Host Instance Provider may contain an object of Network Interface constructors:

```js
const wifi = new device.network.interfaces.WiFi({});
wifi.scan({
	....
});

const eth0 = new device.network.interfaces.Ethernet0({});
console.log(`Ethernet addresss: ${eth0.get("address")}`);
```

<a id="network-dns-resolver"></a>
## DNS Resolver Class Pattern

```
import Resolver from "embedded:network/dns/resolver";
```

### constructor(options)

The DNS Resolver Class Pattern does not define any properties for the options object. These are defined by specific uses  of the DNS Resolver Class Pattern, such as DNS over UDP and DNS over HTTP

### close()

Any pending `resolve` requests are canceled by close and their callbacks will not be invoked.

### resolve(options)

#### Properties of resolve options object

| Property | Description |
| :---: | :--- |
| `host` | A string indicating the hostname to resolve. This property is required. |
| `onResolved(host, address)` | A function to invoke with the resolved address. This property is required. |
| `onError(host)` | A function to invoke if the hostname cannot be resolved to an address. This property is optional. |

Either `onResolved`  or `onError` is called once.

#### Example of invoking the constructor:

```
const r = new Resolver({});
```

In this case, the method used to resolve hostnames is unspecified (for example, it may use the host's DNS resolver,  the details of which are opaque).

### DNS over UDP

Extensions to the DNS Resolver to work with DNS resolution over UDP ([RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)).

```
import Resolver from "embedded:network/dns/resolver/udp";
```

### constructor(options)

| Property | Description |
| :---: | :--- |
| `socket` | A UDP socket construtor. This property is required. |
| `servers` | An array of one or more IP addresses Strings to use as DNS servers. This property is required. |


#### Example of invoking the constructor:

```
import UDP from "embedded:io/socket/udp";

const r = new Resolver({
	socket: UDP
	servers: ["8.8.8.8", "1.1.1.1"]
});
```

### DNS over HTTPS (DoH)

Extensions to the DNS Resolver to work with DNS resolution over HTTPS (DoH) ([RFC 8484](https://datatracker.ietf.org/doc/html/rfc8484)).

```
import Resolver from "embedded:network/dns/resolver/doh";
```

### constructor(options)

| Property | Description |
| :---: | :--- |
| `http` | An object containing an HTTP constructor and its constructor options object (details TBD). This property is required. |
| `servers` | An array of one or more objects containing `host` and `address` properties to use as DoH servers. This property is required. |

#### Example of invoking the constructor:

```
const r = new Resolver({
	http: {...},
	servers: [
		{
			host: "dns.google",
			address: "8.8.8.8"
		}
	]
});
```

### DNS on Host Provider Instance

The Host Provider instance may contain a resolve function, matching the behavior of the the DNS Resolver Class Pattern at `device.network.dns.resolve`:

```js
device.network.dns.resolve({
	host: "moddable.com",
	onResolved(address) {
	}
});
```

The instance at `device.network.dns` does not have to be an instance of the DNS Resolver Class Pattern. Specifically, it does not need to have a constructor or `close` method as the lifecycle of the resolver is managed by the host.

The implementation of `resolve` must not depend on `this`. This should work:

```js
const resolve = device.network.dns.resolve;
resolve({
	host: "moddable.com",
	onResolved(address) {
	}
});
```

<a id="network-http-request"></a>
## HTTP Request Class

```
import HTTPRequest from "embedded:network/http/request";
```

The HTTP Request Class makes one or more HTTP (RFC 7230-7237) requests to a single host.

### constructor(options)

| Property | Description |
| :---: | :--- |
| `socket` |  An object containing a Socket constructor and its constructor options object (details TBD). This property is required. |
| `port` |  The remote port number to connect to as a Number. This property is required. |
| `host` |  The remote hostname to connect to as a String. This property is optional. |
| `address` |  The remote address to connect to as a String. This property is optional. |
| `resolver` |  A DNS Resolver instance to use to resolve the `address`. This property is optional. |
| `onClose` |  A function to invoke when the remote connection closes. This property is optional. |

Either `address` is required or both `host` and `resolver` are required.

> **Note**: TCP socket is incorrect for some modern HTTP variants. Option to pass TCP and/or UDP??

### close()

Releases all resources associated with this instance. Incomplete and pending requests are canceled.

### request(options)

Queues an HTTP request described by the options object. Multiple requests may be pending simultaneously. The requests may operate in serial or parallel and may complete in any order (implementation dependent).

The options object supports the following properties:

| Property | Description |
| :---: | :--- |
| `path` |  The HTTP resource to access as a String. This property is optional and defaults to `"/"`. |
| `method` |  The HTTP method to use to access the resource as as a String. This property is optional and defaults to `"GET"`. |
| `headers` |  A `Map` instance containing request headers. The map keys are the header names and their values are the header values. This property is optional. |
| `onHeaders(status, headers)` |  A function to invoke to provide the HTTP status result code and a Map containing the response headers. The map keys are the header names normalized to lowercase and their values are the header values. This property is optional. |
| `onReadable(count)` |  A function to invoke when bytes are available to read from the HTTP response body. The `count` argument is a Number indicating the number of bytes available to read. This property is optional. |
| `onWritable(count)` |  A function to invoke when the HTTP request is ready to receive bytes for the request body. The `count` argument is a Number indicating the maximum number of bytes that may be written. This property is optional. |
| `onDone()` |  A function to invoke when the HTTP request has been completed successfully. This property is optional. |

The return value of the `request` method is a request instance. This instance is the receiver when the callback functions of the options object are invoked. The request instance has `read` and `write` methods.

#### read(count)
When bytes are available to be read from the response body, `read` returns an `ArrayBuffer` with the number of bytes specified by `count`. If `count` specifies more bytes than are available, the available bytes are returned immediately.  If this request is not currently receiving the response body, returns `undefined`.

**Note**: Considering use the IO technique of read to read directly into existing buffer.

#### write(data)
Writes the `ArrayBuffer` specified by the `data` argument to the request body. If more bytes are provided than can be written, no bytes are written and an exception is thrown and no bytes are written. If this HTTP request is not currently sending the request body, `write` throws an exception.

To signal that a request has a request body, set either the `content-length` header to a non-zero value or the `transfer-encoding` header to `"chunked"`. The `onWritable` callback is only invoked if a request has a request body. To indicate the end of the request body when using `"chunked"` transfer-encoding, call `write` with no arguments.

<a id="network-websocket-client"></a>
## WebSocket Client Class

```
import WebSocketClient from "embedded:network/websocket/client";
```

The WebSocket Client Class establishes a connection to a remote endpoint hosting a WebSocket server and exchanges messages using the WebSocket protocol ([RFC 6455](https://www.rfc-editor.org/rfc/rfc6455.html)). It allows messages of unlimited size to be sent and received, and supports all control messages.

The WebSocket Client replies to `ping` and `close` messages by replying with a `pong` or `close` message with the same payload received, as required by the protocol.

### constructor(options)

| Property | Description |
| :---: | :--- |
| `socket` |  An object containing a Socket constructor and its constructor options object (details TBD). This property is required. |
| `port` |  The remote port number to connect to as a Number. This property is required. |
| `host` |  The remote hostname to connect to as a String. This property is optional. |
| `address` |  The remote address to connect to as a String. This property is optional. |
| `headers` |  A `Map` of HTTP headers to add to the request. This property is optional. |
| `resolver` |  A DNS Resolver instance to use to resolve the `address`. This property is optional. |
| `onReadable` |  A function to invoke when part of a WebSocket binary or text message  is available to read. The first argument is the number of bytes available to read. The second argument is an options object. It  has a `more` property set to `false` if this is the last fragment of a message and `true` if there is at least one more fragment. It has a `binary`  property set to `true` for binary messages and `false` for text messages. This property is optional. |
| `onWritable` |  A function to invoke when more data may be written to the connection. The sole argument indicates the number of bytes that maybe written. This property is optional. |
| `onError` |  A function to invoke when the remote connection terminates  unexpectedly. This property is optional. |
| `onControl` |  A function to invoke when a control message is received. The first argument is the control message opcode. The second argument is an `ArrayBuffer` containing the complete control message payload. This property is optional. |
| `onClose` |  A function to invoke when the connection closes cleanly. This property is optional. |

Either `address` is required or both `host` and `resolver` are required.

### close()

Releases all resources associated with this instance. The `close` method does not initiate a clean close, as defined by the WebSocket protocol, of the connection (use `write` with a `close` opcode instead).

### read(count)

The `read` method returns an `ArrayBuffer` with the number of bytes specified by `count`. If `count` specifies more bytes than are available, all available bytes are returned. If no bytes are available, `read` returns `undefined`.

A single call to `read` only returns bytes from a single message. Once the current message has been completely read, the `onReadable` callback is invoked when the next message is available to read.

### write(data[, options])

The `write` method sends both message data and control messages. The data argument is an `ArrayBuffer` with the message payload.

The options object has the following properties to specify the binary, text, or control message to send.

| Property | Description |
| :---: | :--- |
| `binary` |  A  boolean value set to `true` for a binary payload and `false` for a text payload. This property is optional and defaults to `true`. |
| `more` |  A Boolean value set to `false` for the last fragment of a message and `true` for all others. This property is optional and defaults to `false`. |
| `opcode` |  This property is a number specifying the `opcode` of a control message (the `data` argument is the control message's payload). This property is optional. Because control messages cannot be fragmented, the `more` property is ignored when `opcode` is present. |

The options object is optional. If not provided, the default values are used.

The return value is the number of bytes that may be written.

#### Examples
Send two binary messages:

```js
this.write(new ArrayBuffer(10));
this.write(new ArrayBuffer(10), {binary: true});
```

Send one binary message in two fragments:

```js
this.write(new ArrayBuffer(10), {more: true});
this.write(new ArrayBuffer(10));
```

Send a text message:

```js
let encoder = new TextEncoder;
this.write(encoder.encode("hello"), {text: true});
```

Send a ping message:

```js
this.write(Uint32Array.of(1).buffer, {opcode: WebSocketClient.ping});
```

Send an unsolicited pong message:

```js
this.write(Uint32Array.of(2).buffer, {opcode: WebSocketClient.pong});
```

Initiate a clean close:

```js
this.write(Uint16Array.of(0).buffer, {opcode: WebSocketClient.close});
```

### Static properties of the constructor

The following properties are present on the constructor. The property names and values correspond to WebSocket opcodes. The values are numbers and the properties are read-only.

| Property | Value |
| :---: | ---: |
| `text` |  1 |
| `binary` |  2 |
| `close` |  8 |
| `ping` |  9 |
| `pong` |  10 |

<a id="network-mqtt-client"></a>
## MQTT Client Class

```
import MQTTClient from "embedded:network/mqtt/client";
```

The MQTT Client Class establishes a connection to a remote endpoint hosting an MQTT server (broker) and exchanges messages using the MQTT protocol ([MQTT Version 3.1.1, OASIS Standard, 29 October 2014 6455](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.doc)). It allows messages of unlimited size to be sent and received, and supports all control messages.

The MQTT Client must implement the following:

- Transmit keep alive message if configured with a non-zero keepalive interval
- Reply to `PINGREQ` messages with `PINGREQ`
- Reply to `PUBLISH` with `PUBACK` for quality of service 1
- Reply to `PUBLISH` with `PUBREC` for quality of service 2
- Reply to `PUBREL` with `PUBCOMP` for quality of service 2
- Reply to `PUBREC` with `PUBREL` for quality of service 2

The MQTT client does not cache messages and therefore does not retransmit messages. The MQTT client does not implement reconnect. The MQTT client does not maintain a list of active subscriptions. These capabilities may be implemented by higher layers.

> **Note**: This specification supports MQTT Version 3. It is intended to be extensible to support MQTT Version 5.

### constructor(options)

| Property | Description |
| :---: | :--- |
| `socket` |  An object containing a Socket constructor and its constructor options object (details TBD). This property is required. |
| `port` |  The remote port number to connect to as a Number. This property is required. |
| `host` |  The remote hostname to connect to as a String. This property is optional. |
| `address` |  The remote address to connect to as a String. This property is optional. |
| `resolver` |  A DNS Resolver instance to use to resolve the `address`. This property is optional. |
| `onReadable` |  A function to invoke when part of an MQTT message  is available to read. The first argument is the number of bytes available to read. The second argument is an options object. It has a `more` property set to `false` if this is the last fragment of a message and `true` if there is at least one more fragment.   For the first fragment of a message, the options object contains `topic` property with a String indicating the message topic, a `QoS` property with a Number indicating the quality of service, and a `byteLength` property with a Number indicating the total number of bytes in the message. The `onReadable` property is optional. |
| `onWritable` |  A function to invoke when more data may be written to the connection. The sole argument indicates the number of bytes that maybe written. This property is optional. |
| `onError` |  A function to invoke when the remote connection terminates. This property is optional. |
| `onControl` |  A function to invoke when a control message is received. The first argument is the control message opcode. The second argument is an object containing an `operation` property indicating the control message (`CONNACK`, `PUBACK`, `PUBREC `, `PUBREL`, `PUBCOMP`, `SUBACK`, `UNSUBACK`, `PINGREQ `, etc.) and an `id` property if included in the message. The `SUBACK` message payload is provided on the `payload` property as an array of byte values. The `onControl` property is optional. |
| `id` |   The MQTT client identifier as a String. This property is optional and defaults to an empty string. |
| `user` |   The MQTT user for establishing a connection as a String. This property is optional and defaults to an empty string. |
| `password` |   The MQTT password for establishing a connection as a String or ArrayBuffer. This property is optional and defaults to an empty string. |
| `keepalive` |   The MQTT connection keep-alive time in milliseconds as a Number.  This property is optional and defaults to 0. |
| `will.topic` |   The topic for the MQTT will for this connection as a String. This property is optional. |
| `will.message` |   The message for the MQTT will for this connection as a String or ArrayBuffer. This property is optional. |
| `will.QoS` |   The requested quality of service for the will message for this connection as number with values 0, 1, or 2. This property is optional and defaults to 0. |
| `will.retain` |   A Boolean indicating whether the will message should be retained by the server. This property is optional and defaults to `false`. |

Either `address` is required or both `host` and `resolver` are required.

### close()

Releases all resources associated with this instance. The `close` method does not send an MQTT `close` messages (use `write` with a `DISCONNECT` opcode to do initiate a disconnect).

### read(count)

The `read` method returns an `ArrayBuffer` with the number of bytes specified by `count`. If `count` specifies more bytes than are available, all available bytes are returned. If no bytes are available, `read` returns `undefined`.

A single call to `read` only returns bytes from a single message. Once the current message has been completely read, the `onReadable` callback is invoked when the next message is available to read.

### write(data[, options])

The `write` method sends both message data and control messages. The data argument is an `ArrayBuffer` with the message payload.

The options object has the following properties to specify the message to publish or control message to send.

| Property | Description |
| :---: | :--- |
| `operation` |  This property is a number specifying the `opcode` of a control message (the `data` argument is the control message's payload). This property is optional and defaults to `PUBLISH`.  |
| `id` |  A number specifying the `id` for the message. If an `id` is not provided the MQTT client generates one. As a rule, either the caller should provide the `id` for all messages or none, to avoid the possibility of values colliding. This property is optional.  |
| `topic` |  A string specifying an MQTT topic for a `PUBLISH` message.  This property is for `PUBLISH` messages only. It is required.  |
| `QoS` |  A number specifying the quality of service of `PUBLISH` message.  Allowed values are 0, 1, and 2. This property is for `PUBLISH` messages only. It is optional and defaults to 0.  |
| `retain` |  A boolean indicating if a `PUBLISH` message should be retained by the server.  This property is for `PUBLISH` messages only. It is optional and default to `false`.  |
| `duplicate` |  A boolean indicating if a `PUBLISH` message is being retransmitted by the client.  This property is for `PUBLISH` messages only. It is optional and default to `false`.  |
| `items` |  An array of objects indicating the topics to subscribe or unsubscribe from. Each object must contain a `topic` property with a string indicating the topic and, for `SUBSCRIBE` messages, may contain an optional `QoS` property with the requested quality of service as a value of 0, 1, or 2. This property is for `SUBSCRIBE` and `UNSUBSCRIBE` messages only. It is required and must contain at least one element.  |

The options object is required, except when writing fragments of a `PUBLISH` message after the first fragment.

It is an error to call `write` before the `CONNACK` control message has been received.

The return value is the number of bytes that may be written.

### Static properties of the constructor

The following properties are present on the constructor. The property names and values correspond to MQTT Control Packet types in Section 2.1.1 of the MQTT 3.1.1 Standard. The values are numbers and the properties are read-only.


| Property | Value |
| :---: | ---: |
| `CONNECT ` |  1 |
| `CONNACK ` |  2 |
| `PUBLISH ` |  3|
| `PUBACK ` |  4 |
| `PUBREC ` |  5 |
| `PUBREL ` |  6 |
| `PUBCOMP ` |  7 |
| `SUBSCRIBE ` |  8 |
| `SUBACK ` |  9 |
| `UNSUBSCRIBE ` |  10 |
| `UNSUBACK ` |  11 |
| `PINGREQ ` |  12 |
| `PINGRESP ` |  13 |
| `DISCONNECT ` |  14 |


### Examples

Subscribe to two topics, with quality of service 2 and 0:

```js
this.write(null, {
	operation: MQTTClient.SUBSCRIBE,
	items: [
		{topic: "foo/bar/+", QoS: 2},
		{topic: "bar/foo"}
	]
});
```

Unsubscribe from two topics:

```js
this.write(null, {
	operation: MQTTClient.UNSUBSCRIBE,
	items: [
		{topic: "frogs"},
		{topic: "bar/foo"}
	]
});
```

Publish a message with quality of service 0:

```js
this.write(ArrayBuffer.fromString("small"), {
	topic: "foo/bar/small"
});
```

Publish a message with quality of service 2:

```js
this.write(ArrayBuffer.fromString("small"), {
	topic: "foo/bar/small",
	QoS: 2
});
```

Publish a message in two fragments:

```js
this.write(ArrayBuffer.fromString("SM"), {
	topic: "foo/bar/small",
	byteLength: 6
});
this.write(ArrayBuffer.fromString("ALL\n"));
```

Request a ping:

```js
this.write(null, {operation: MQTTClient.PINGREQ});
```
