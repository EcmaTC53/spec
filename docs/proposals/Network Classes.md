# Network Class Proposals for Ecma-419
Updated February 23, 2022<br>
Copyright 2022 Moddable Tech Inc.<br>

This document is a draft of classes to support operations on TCP/IP networks.  It builds on the [Ecma-419](https://419.ecma-international.org), particularly the [TCP](https://419.ecma-international.org/#-10-io-classes-tcp-socket) and [UDP](https://419.ecma-international.org/#-10-io-classes-udp-socket) sockets. The APIs are intended to follow the conventions established in the first edition of Ecma-419.

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
| `"address"` | Interface has an IP address assigned changed |

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
| `onResolved(address)` | A function that will be called with the resolved address. This property is required. |
| `onError()` | A function that will be called if the hostname cannot be resolved to an address. This property is optional. |

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

## HTTP Request Class

```
import HTTPRequest from "embedded:network/http/request";
```

The HTTP Request Class makes one or more HTTP requests to a single host.

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
| `onHeaders(status, headers)` |  A function that is invoked to provide the HTTP status result code and a Map containing the response headers. The map keys are the header names normalized to lowercase and their values are the header values. This property is optional. |
| `onReadable(count)` |  A function that is invoked when bytes are available to read from the HTTP response body. The `count` argument is a Number indicating the number of bytes available to read. This property is optional. |
| `onWritable(count)` |  A function that is invoked when the HTTP request is ready to receive bytes for the request body. The `count` argument is a Number indicating the maximum number of bytes that may be written. This property is optional. |
| `onDone()` |  A function that is invoked with the HTTP request has been completed successfully. This property is optional. |

The return value of the `request` method is a request instance. This instance is the receiver when the callback functions of the options object are invoked. The request instance has `read` and `write` methods.

#### read(count)
When bytes are available to be read from the response body, `read` returns an `ArrayBuffer` with the number of bytes specified by `count`. If `count` specifies more bytes than are available, the available bytes are returned immediately.  If this request is not currently receiving the response body, returns `undefined`.

**Note**: Considering use the IO technique of read to read directly into existing buffer.

#### write(data)
Writes the `ArrayBuffer` specified by the `data` argument to the request body. If more bytes are provided than can be written, no bytes are written and an exception is thrown and no bytes are written. If this HTTP request is not currently sending the request body, `write` throws an exception.

To signal that a request has a request body, set either the `content-length` header to a non-zero value or the `transfer-encoding` header to `"chunked"`. The `onWritable` callback is only invoked if a request has a request body. To indicate the end of the request body when using `"chunked"` transfer-encoding, call `write` with no arguments.
