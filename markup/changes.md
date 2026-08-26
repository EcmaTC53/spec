## Changes since the fourth edition

- Note adoption of 4th Edition by General Assembly
- Fix step 5.d of the Asynchronous IO Class Pattern `close` method [algorithm](#alg-io-async-class-pattern-prototype-close)
- HTTP Server [constructor option](#http-server-class-pattern) `io` renamed to `socket` (matches HTTP Client and consistent with other IO constructor options objects)
- add `remoteAddress` and `disconnect()` to [BLE Server GATT Connection](#bluetoothle-gattserverconnection)
- setting `format` to unsupported value throws, type of exception is not specified
- Be explicit when constructor options object is extended with an `io` property
- Add `onSample` callback and explain `sample()` may return `undefined` in [Sensor Class Pattern](#sensor-class-pattern)
- [Symbol.dispose]
- Add `protocol` getter to [WebSocket client](#websocket-client) for negotiated subprotocol
- Add [Location sensor](#sensor-location)
- Add [Cryptographic Digest Class Pattern](#cryptographic-digest-class-pattern)
- Add [Wi-Fi Access Point Network Interface](#network-interface-wifi-accesspoint) amd small supporting updates to other [network interfaces](##network-interface).
- Add note about ephemeral ports to TCP Listener and HTTP Server. Add port property to HTTP Server

> **WARNING**: This is a working draft. It is likely to change. Feedback is welcome.

> **NOTE**: This change log is maintained for the convenience of reviewers and will not be incorporated into the Standard.


## To do for the fifth edition

- Add fifth edition text to intro
- New sections in Annex
	- Location
	- Cryptographic Digest
	- Wi-Fi Access Point
- DNS-SD (missing from fourth edition)

