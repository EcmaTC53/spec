# Formal algorithms

This annex defines formal algorithms for behaviors defined by this specification. These algorithms are useful primarily for implementing the specification and validating implementations.

### Internal fields

Internal fields are implementation-dependent and must not be accessible outside the implementation. For instance they can be C structure fields, ECMAScript private fields, or a combination of both.

Every object conforming to a Class Pattern is expected to have one or several internal fields. This document uses the following operators on internal fields.

#### **CheckInternalFields**(*object*)

1. For each internal field of the class being defined
	1. Let *name* be the name of the internal field
	2. Throw if *object* has no internal field named *name*

**CheckInternalFields** throws if an internal field is absent. That can be implicit when internal fields are ECMAScript private fields, or can be explicit when internal fields are C structure fields. The purpose of **CheckInternalFields** is to ensure that *object* is an instance of the class being defined.

#### **ClearInternalFields**(*object*)

1. For each internal field of the class being defined
	1. Let *name* be the name of the internal field
	2. Clear the internal field named *name* of *object*

**ClearInternalFields** zeroes all internal fields. That can be storing `null` in ECMAScript private fields, or can be storing NULL in C structure fields. The purpose of **ClearInternalFields** is to ensure that *object* is in a consistent state when constructed and closed.

#### **GetInternalField**(*object*, *name*)
1. Return the value stored in the internal field named *name* of *object*

**GetInternalField** is trivial for ECMAScript private fields, but can involve value conversion for C structure field like converting C `NULL` into ECMAScript `null`.

#### **SetInternalField**(*object*, *name*, *value*)
1. Store *value* in the internal field named *name* of *object*

**SetInternalField** is trivial for ECMAScript private fields, but can involve value conversion for C structure field like converting ECMAScript `null` into C `NULL`.

### Internal methods

Internal methods are implementation-dependent and must not be accessible outside the implementation. This document uses ECMAScript private method syntax to indicate internal methods, prefixing the names of internal methods with `#`.

### Ranges

#### Booleans

For boolean ranges, the value is converted into an ECMAScript boolean.

#### Numbers

For number ranges, the value is converted into an ECMAScript number, then the value is checked to be in range. The special value `NaN` is never in range.

For integer ranges, the value is converted into an ECMAScript number, then the value is checked to be an integer, then the value is checked to be in range.

| Range | From | To |
| :--- | ---: | ---: |
| number | `-Infinity` | `Infinity` |
| negative number | `-Infinity` | `-Number.MIN_VALUE` |
| positive number | `Number.MIN_VALUE` | `Infinity` |
| integer | `Number.MIN_SAFE_INTEGER` | `Number.MAX_SAFE_INTEGER` |
| negative integer | `Number.MIN_SAFE_INTEGER` | `-1` |
| positive integer | `1` | `Number.MAX_SAFE_INTEGER` |
| 8-bit integer | `-128` | `127` |
| 8-bit unsigned integer | `0` | `255` |
| 16-bit integer | `-32768` | `32767` |
| 16-bit unsigned integer | `0` | `65535` |
| 32-bit integer | `-2147483648` | `2147483647` |
| 32-bit unsigned integer | `0` | `4294967295` |

Further restrictions are specified with **from x to y**, meaning the value must be **>= x** and **<= y**.

#### Objects

For object ranges like `ArrayBuffer`, the value is checked to be an instance of one of specified class.

Further restrictions can be specified, for instance on the `byteLength` of the `ArrayBuffer` instance.

If the object can be `null`, it is explicitly specified like `Function` or `null`.

#### Byte buffers

For byte buffer ranges, the value is checked to be an instance of `ArrayBuffer`, `SharedArrayBuffer`, `Uint8Array`, `Int8Array` or `DataView`.

Further restrictions can be specified, for instance on the `byteLength`.

To access the data contained in a byte buffer, algorithms uses a host specific operator:

##### **GetBytePointer**(*buffer*)

The operator throws if *buffer* is not an instance of `ArrayBuffer`, `SharedArrayBuffer`, `Uint8Array`, `Int8Array`, or `DataView`, or if *buffer* is detached. For a `TypedArray` and `DataView` instances, the pointer takes the view's byte offset into account.

#### Strings

For string ranges like `"buffer"`, the value is converted into an ECMAScript string, then checked to be strictly equal to one of the specified values.

### Asynchronous operations

Asynchronous operations are never synchronous: the callback is never invoked directly by the method that starts the asynchronous operation, but indirectly at the end of the asynchronous operation.

To emphasize such a rule, the algorithms uses steps like:

1. Queue a task that performs
	1. **Call**(*callback*, `this`)

The mechanism can be similar to what is necessary to implement `setTimeout`.

	print(1);
	setTimeout(0, () => print(3));
	print(2);
	// 1 2 3

<a id="alg-base-class-pattern"></a>

## Base Class Pattern

### `constructor`(*options*)

1. **ClearInternalFields**(`this`)
2. Throw if *options* is not an object
3. Let *params* be an empty object
4. For each supported option
	1. Let *name* be the name of the supported option
	2. If **HasProperty**(*options*, *name*)
		1. Let *value* be **GetProperty**(*options*, *name*)
		2. Throw if *value* is not in the valid range of the supported option
	3. Else
		1. Throw if the supported option has no default value
		2. Let *value* be the default value of the supported option
	4. **DefineProperty**(*params*, *name*, *value*)
5. For each supported callback option
	1. Let *name* be the name of the supported callback option
	2. Let *callback* be **GetProperty**(*params*, *name*)
	3. If *callback* is not `null`
		1. **SetInternalField**(`this`, *name*, *callback*)
6.	Let *value* be **GetProperty**(*params*, `"target"`)
7. If *value* is not `undefined`
	1.	**DefineProperty**(`this`, `"target"`, *value*)
8. Mark `this` as ineligible for garbage collection

#### Notes

- Supported options, with their names, default values and valid ranges, are defined by a separate table for each class conforming to the Base Class Pattern.

- The *params* object is unobservable. Its purpose in the algorithm is to ensure that properties of the *options* object are only accessed once and that the *options* object can be frozen. Local variables can be used instead, for instance:

		let pin = 2;
		if (options !== undefined) {
			if ("pin" in options)) {
				pin = options.pin;
				if ((pin < 0) || (3 < pin))
					throw new RangeError(`invalid pin ${pin}`);
			}
		}

- Most classes conforming to the Base Class Pattern are expected to support one or several callbacks. Callbacks are supported options: their default value is `null`, their valid range is `null` or an ECMAScript function. Callbacks are stored in internal fields and are always called with `this` set to the constructed object.

- There is only one option that is always supported: its name is `"target"`, its default value is `undefined` and its range is any ECMAScript value.

### `close`()

1. **CheckInternalFields**(`this`)
2. Mark `this` as eligible for garbage collection
3. Cancel any pending callbacks for `this`
4. **ClearInternalFields**(`this`)

## Base Class Pattern – asynchronous

### `close`(*callback*)

1. **CheckInternalFields**(`this`)
2. Throw if *callback* is not `undefined` and not **IsCallable**(*callback*)
3. Optionally, cancel asynchronous operations
4. When all asynchronous operations succeeded or failed
	1. Mark `this` as eligible for garbage collection
	2. **ClearInternalFields**(`this`)
	3. If *callback* is not `undefined`
		1. Queue a task that performs
			1. **Call**(*callback*, `this`, `null`)

<a id="alg-io-class-pattern"></a>

## IO Class Pattern

### `constructor`(*options*)

1. Execute steps 1 to 7 of the Base Class Pattern `constructor`
2.	Let *value* be **GetProperty**(*params*, `"format"`)
3. **SetInternalField**(`this`, `"format"`, *value*)
4. Try
	1. Let *resources* be the hardware resources specified by *params*
	2. Throw if *resources* are unavailable
	3. Allocate and configure *resources*
	4. Throw if allocation or configuration failed
	5. **SetInternalField**(this, `"resources"`, *resources*)
5. Catch *exception*
	1. **Call**(**GetProperty**(`this`, `"close"`), `this`)
	2. Throw *exception*
6. Execute step 8 of the Base Class Pattern `constructor`

### `close`()

1. Execute step 1 of the Base Class Pattern `close` method
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Return if *resources* is `null`
4. Execute steps 2 and 3 of the Base Class Pattern `close` method
5. Free *resources*
6. Execute step 4 of the Base Class Pattern `close` method

### `read`([*option*])

1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. If *resources* is not readable
	1. Return `undefined`
5. Let *format* be **GetInternalField**(`this`, `"format"`)
6. If *format* is `"buffer"`
	1. Let *available* be the number of readable bytes
	2. If *option* is absent
		1. Throw if *available* is `undefined`
		2. Let *n* be *available*
		3. Let *data* be **Construct**(`"ArrayBuffer"`, *n*)
		4. Let *pointer* be **GetBytePointer**(*data*)
		5. Read *n* bytes from *resources* into *pointer*
		6. Return *data*
	3. Else if *option* is a number
		1. Throw if *option* is no positive integer
		2. Let *n* be *option*
		3. If *available* is not `undefined` and *n* > *available*
			1. 	Let *n* be *available*
		4. Let *data* be **Construct**(`"ArrayBuffer"`, *n*)
		5. Let *pointer* be **GetBytePointer**(*data*)
		6. Read *n* bytes from *resources* into *pointer*
		7. Return *data*
	4. Else
		1. Let *pointer* be **GetBytePointer**(*option*)
		2. Let *n* be **GetProperty**(*option*, `"byteLength"`)
		3. If *available* is not `undefined` and *n* > *available*
			1. 	Let *n* be *available*
		4. Read *n* bytes from *resources* into *pointer*
		5. Return *n*
7. Throw if *option* is present
8. Read *data* from *resources*
9. Format *data* according to *format*
10. Return *data*

### `write`(*data*)

1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null` or not writable
4. Throw if *data* is absent
5. Let *format* be **GetInternalField**(`this`, `"format"`)
6. If *format* is `"buffer"`
	1. Let *pointer* be **GetBytePointer**(*data*)
	2. Let *n* be **GetProperty**(*data*, `"byteLength"`)
	3. Throw if *n* bytes would overflow *resources*
	4. Write *n* bytes from *pointer* into *resources*
	5. Return
7. Throw if *data* is not formatted according to *format*
8. Write *data* into *resources*

### `set format`(*value*)

1. **CheckInternalFields**(`this`)
2. Throw if *value* is not in the valid range of `"format"`
3. **SetInternalField**(`this`, `"format"`, *value*)

### `get format`()

1. **CheckInternalFields**(`this`)
2. Return **GetInternalField**(`this`, `"format"`)

#### Notes

- Hardware resources can require one or several internal fields which should be all cleared and checked. The `"resources"` internal field is only a convention in this document.
- Several IO classes read/write bytes into/from buffers so the `read` and `write` methods detail the relevant steps, for instance to optimize the `read` method memory usage by passing a buffer.
- IO classes that do not use buffers can skip steps 6 of the `read` and `write` methods.
- The ranges of `read` and `write` *data* are defined by a separate table for each class conforming to the IO Class Pattern.
- When the parameters of `read` or `write` differ from the IO Class Pattern, they are defined by a separate table.

<a id="alg-io-async-class-pattern"></a>

## IO Class Pattern – asynchronous

### `close`(*callback*)
1. Execute step 1 of the Base Class Pattern `close` method
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Return if *resources* is `null`
4. Optionally, cancel asynchronous operations
5. When all asynchronous operations succeeded or failed
	1. Mark `this` as eligible for garbage collection
	2. **ClearInternalFields**(`this`)
	3. Free *resources*
	4. Execute step 5.2 and 5.3 of the Base Class Pattern `close` method

### `read`(*option*[, *callback*])

1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null` or not readable
4. Throw if *option* is absent
5. If *option* is a number
	1. Throw if *option* is no positive integer
	2. Let *n* be *option*
	3. Let *data* be **Construct**(`"ArrayBuffer"`, *n*)
6. Else
	1. Let *data* be *option*
	2. Let *pointer* be **GetBytePointer**(*data*)
	3. Let *n* be **GetProperty**(*data*, `"byteLength"`)
7. Throw if *callback* is not `undefined` and not **IsCallable**(*callback*)
8. Start an input operation to read *n* bytes into *data*
	1. When the input operation succeeded
		1. If *callback* is not `undefined`
			1. Queue a task that performs
				1. **Call**(*callback*, `this`, `null`, *data*, *n*)
	1. When the input operation failed
		1. If *callback* is not `undefined`
			1. Let *error* be an ECMAScript `Error` object describing the failure
			2. Queue a task that performs
				1. **Call**(*callback*, `this`, *error*)

### `write`(*data*[, *callback*])

1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null` or not writable
4. Throw if *data* is absent
5. Let *pointer* be **GetBytePointer**(*data*)
6. Let *n* be **GetProperty**(*data*, `"byteLength"`)
7. Throw if *callback* is not `undefined` and not **IsCallable**(*callback*)
8. Start an output operation to write *n* bytes from *data*
	1. When the output operation succeeded
		1. If *callback* is not `undefined`
			1. Queue a task that performs
				1. **Call**(*callback*, `this`, `null`, *data*, *n*)
	1. When the output operation failed
		1. If *callback* is not `undefined`
			1. Let *error* be an ECMAScript `Error` object describing the failure
			2. Queue a task that performs
				1. **Call**(*callback*, `this`, *error*)

#### Notes

- The input and output operations represent the implementation dependent mechanism that ensures that asynchronous read and write operations happen in the order issued.
- Step 4 of the `close` method is optional since operations can be cancellable or not. Cancelled operations fail with a corresponding `Error` object.
- Step 6.2 of the `read` method and step 5 of the `write` method ensures *data* is a byte buffer.

## IO Classes

<a id="alg-io-digital"></a>

### Digital

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | pin specifier | |
| `mode` | yes | `Digital.Input`, `Digital.InputPullUp`, `Digital.InputPullDown`, `Digital.InputPullUpDown`, `Digital.Output`, or `Digital.OutputOpenDrain`. | |
| `edge` | no* | `Digital.Rising`, `Digital.Falling`, and `Digital.Rising + Digital.Falling` | |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

* If the `onReadable` option is not `null`, `edge` is required to have a non-zero value.

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"number"` | `0` or `1` | `0` or `1` |

<a id="alg-io-digital-bank"></a>

### Digital bank

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pins` | yes | 32-bit unsigned integer | |
| `mode` | yes | `Digital.Input`, `Digital.InputPullUp`, `Digital.InputPullDown`, `Digital.InputPullUpDown`, `Digital.Output`, or `Digital.OutputOpenDrain`. | |
| `rises` | no* | 32-bit unsigned integer | 0
| `falls` | no* | 32-bit unsigned integer | 0
| `bank` | no | number or string | |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

* Both `rises` and `falls` cannot be `0`; at least one pin must be selected.

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"number"` | 32-bit unsigned integer | 32-bit unsigned integer |

<a id="alg-io-analog-input"></a>

### Analog input

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | pin specifier | |
| `resolution` | no | positive integer | host-dependent |
| `format` | no | `"number"` | `"number"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"number"` | all | &nbsp; |

<a id="alg-io-pulse-width-modulation"></a>

### Pulse-width modulation

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | pin specifier | |
| `hz` | no | positive number | host-dependent |
| `format` | no | `"number"` | `"number"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"number"` | | positive integer |

<a id="alg-io-i2c"></a>

### I²C – synchronous IO

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `data` | yes | pin specifier | |
| `clock` | yes | pin specifier | |
| `hz` | yes | positive integer | |
| `address` | yes | 8-bit unsigned integer from 0 to 127 | |
| `port` | no | port specifier | host-dependent |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"buffer"` | `"buffer"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

#### `read`(*option*[, *stop*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `option` | yes* | positive integer, byte buffer | |
| `stop` | no | `true` or `false` | `true`

- The number of readable bytes is undefined so *option* is required

#### `write`(*data*[, *stop*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `data` | yes | byte buffer | |
| `stop` | no | `true` or `false` | `true`

<a id="alg-io-i2c-async"></a>

### I²C – asynchronous IO

#### `read`(*option*[, *stop*][, *callback*])

1. Execute steps 1 to 7 of the IO.Async Class Pattern `read` method
2. If *callback* is not `undefined`
	1. Throw if not **IsCallable**(*callback*)
	2. Convert *stop* to an ECMAScript boolean
3. Else if *stop* is not `undefined`
	1. If **IsCallable**(*stop*)
		1. Let *callback* be *stop*
		2. Let *stop* be **true**
	2. Else
		1. Convert *stop* to an ECMAScript boolean
4. Else
	1. Let *stop* be **true**
5. Execute step 8 of the IO.Async Class Pattern `read` method

#### `write`(*data*[, *stop*][, *callback*])

1. Execute steps 1 to 6 of the IO.Async Class Pattern `write` method
2. If *callback* is not `undefined`
	1. Throw if not **IsCallable**(*callback*)
	2. Convert *stop* to an ECMAScript boolean
3. Else if *stop* is not `undefined`
	1. If **IsCallable**(*stop*)
		1. Let *callback* be *stop*
		2. Let *stop* be **true**
	2. Else
		1. Convert *stop* to an ECMAScript boolean
4. Else
	1. Let *stop* be **true**
5. Execute step 8 of the IO.Async Class Pattern `write` method

##### Notes

- The `read` and `write` methods algorithms describe how to handle an optional argument before the optional *callback* argument.

<a id="alg-io-smbus"></a>

### System management bus (SMBus) – synchronous IO

#### constructor *options*

All properties from I²C plus the following:

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `stop` | no | `true` or `false` | `false`

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | any | any |

#### `read`(*option*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `option` | yes* | positive integer, byte buffer | &nbsp; |

- The number of readable bytes is undefined so *option* is required

#### `readUint8`(*register*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | &nbsp; |

#### `writeUint8`(*register*, *value*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | |
| `value` | yes | 8-bit unsigned integer | &nbsp; |

#### `readUint16`(*register*, *bigEndian*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | |
| `bigEndian` | no | `true` or `false` | `false` |

#### `writeUint16`(*register*, *value*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | |
| `value` | yes | 16-bit unsigned integer | &nbsp; |

#### `readBuffer`(*register*, *buffer*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | |
| `buffer` | yes | byte buffer | &nbsp; |

#### `writeBuffer`(*register*, *buffer*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | |
| `buffer` | yes | byte buffer | &nbsp; |

<a id="alg-io-smbus-async"></a>

### System management bus (SMBus) – asynchronous IO

All properties from I²C.Async plus the following:

#### `readUint8`(*register*[, *callback*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | N/A |
| `callback` | no | `Function` | `null` |

#### `writeUint8`(*register*, *value*[, *callback*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | |
| `value` | yes | 8-bit unsigned integer | N/A |
| `callback` | no | `Function` | `null` |

#### `readUint16`(*register*[, *bigEndian*][, *callback*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | N/A|
| `bigEndian` | no | `true` or `false` | `false` |
| `callback` | no | `Function` | `null` |

#### `writeUint16`(*register*, *value*[, *bigEndian*][, *callback*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | N/A |
| `value` | yes | 16-bit unsigned integer | N/A |
| `callback` | no | `Function` | `null` |

#### `readBuffer`(*register*, *option*[, *callback*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | N/A |
| `buffer` | yes | number or byte buffer | N/A |
| `callback` | no | `Function` | `null` |

#### `writeBuffer`(*register*, *buffer*[, *callback*])

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer | N/A |
| `buffer` | yes | byte buffer | N/A |
| `callback` | no | `Function` | `null` |

#### Notes

- The asynchronous methods to read and write data behaves analogously to the I2C.Async `read` and `write` method.

<a id="alg-io-serial"></a>

### Serial

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `receive` | no* | pin specifier | |
| `transmit` | no* | pin specifier | |
| `baud` | yes | positive integer | |
| `flowControl` | no | `"hardware"` and `"none"` | `"none"` |
| `dataTerminalReady` | no | pin specifier | |
| `requestToSend` | no | pin specifier | |
| `clearToSend` | no | pin specifier | |
| `dataSetReady` | no | pin specifier | |
| `port` | no | port specifier | |
| `onReadable` | no | `null` or `Function` | `null`|
| `onWritable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` or `"buffer"` | `"buffer"` |

* A host may require the `receive` and/or `transmit` properties.

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"number"` | 8-bit unsigned integer | 8-bit unsigned integer |
| `"buffer"` | ArrayBuffer | byte buffer |

#### `flush`([*input*][, *output*])

1. **CheckInternalFields**(`this`)
2. If *input* and *output* are absent
	1. Let *flushInput* be `true`
	2. Let *flushOutput* be `true`
3. Else if *input* and *output* are present
	1. Convert *input* into an ECMAScript boolean
	2. Let *flushInput* be *input*
	3. Convert *output* into an ECMAScript boolean
	4. Let *flushOutput* be *output*
4. Else
	1. Throw
5. If *flushInput* is `true`
	1. Flush all received but unread data
6. If *flushOutput* is `true`
	1. Flush all written but unsent data

#### `set`(*options*)

1. **CheckInternalFields**(`this`)
2. Throw if *options* is not an object
3. If **HasProperty**(*options*, `"dataTerminalReady"`)
	1. Let *value* be **GetProperty**(*options*, `"dataTerminalReady"`)
	2. Convert *value* into an ECMAScript boolean
	3. If *value* is `true`, set serial connection's DTR pin
	4. Else clear serial connection's DTR pin
4. If **HasProperty**(*options*, `"requestToSend"`)
	1. Let *value* be **GetProperty**(*options*, `"requestToSend"`)
	2. Convert *value* into an ECMAScript boolean
	3. If *value* is `true`, set serial connection's RTS pin
	4. Else clear serial connection's RTS pin
5. If **HasProperty**(*options*, `"break"`)
	1. Let *value* be **GetProperty**(*options*, `"break"`)
	2. Convert *value* into an ECMAScript boolean
	3. If *value* is `true`, set serial connection's break signal
	4. Else clear serial connection's break signal

#### `get`([*options*])

1. **CheckInternalFields**(`this`)
2. If *options* is absent
	1. Let *result* be an empty object
3. Else
	1. Throw if *options* is not an object
	2. Let *result* be *options*
4. If serial connection's CTS pin is set
	1. **SetProperty**(*result*, `"clearToSend"`, `true`)
5. Else
	1. **SetProperty**(*result*, `"clearToSend"`, `false`)
6. If serial connection's DSR pin is set
	1. **SetProperty**(*result*, `"dataSetReady"`, `true`)
7. Else
	1. **SetProperty**(*result*, `"dataSetReady"`, `false`)
8. Return *result*

<a id="alg-io-spi"></a>

### Serial Peripheral Interface (SPI)

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `out` | no* | pin specifier | |
| `in` | no* | pin specifier | |
| `clock` | yes | pin specifier | |
| `select` | no* | pin specifier | |
| `active` | no | 0 or 1 | 0 |
| `hz` | yes | positive integer | |
| `mode` | no | 0, 1, 2, or 3 | 0 |
| `port` | no | port specifier | |
| `format` | no | `"buffer"` | `"buffer"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

#### `read`(*option*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `option` | yes* | positive integer, byte buffer | &nbsp; |

- The number of readable bytes is undefined so *option* is required

#### `transfer`(*buffer*)

1. **CheckInternalFields**(`this`)
2. If *buffer* is an ArrayBuffer
	1. Let *transferBuffer* be *buffer*
	2. Let *transferOffset* be 0
3. Else
	1. Let *transferBuffer* be **GetProperty**(*buffer*, "buffer")
	2. Let *transferOffset* be **GetProperty**(*buffer*, "byteOffset")
5. If **HasProperty**(*buffer*, "bitLength")
	1. Let *transferBits* be **GetProperty**(*buffer*, "bitLength")
	2. Let *availableBits* be **GetProperty**(*buffer*, "byteLength") * 8
	3. Throw if *transferBits* is greater than *availableBits*
6. Else
	1. Let *transferBits* be **GetProperty**(*buffer*, "byteLength") * 8
7. Simultaneously write and read *transferBits* bits into *buffer* starting at byte offset *transferOffset*
8. Return *buffer*

#### `flush`([*deselect*])

1. **CheckInternalFields**(`this`)
2. Flush all written but unsent data
3. If *deselect* is present
	1. Convert *deselect* into an ECMAScript boolean
	2. If *deselect* is `true`
		1. If **GetInternalField**(`this`, `"active"`) is 0
			1. Set the select pin to 1
		2. Else
			1. Set the select pin to 0

<a id="alg-io-pulse-count"></a>

### Pulse count

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `signal` | yes | pin specifier | |
| `control` | yes | pin specifier | |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"number"` | integer | integer |

<a id="alg-io-tcp-socket"></a>

### TCP socket

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `address` | yes | string | |
| `port` | yes | 16-bit unsigned integer | |
| `noDelay` | no | `true` or `false` | `false` |
| `keepAlive` | no | positive integer | N/A |
| `from` | no | instance of TCP Socket | N/A |
| `onError` | no | `null` or `Function` | `null` |
| `onWritable` | no | `null` or `Function` | `null` |
| `onReadable` | no | `null` or `Function` | `null` |
| `format` | no | `"number"` or `"buffer"` | `"buffer"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |
| `"number"` | 8-bit unsigned integer | 8-bit unsigned integer |

#### `write` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `more` | no | boolean | **false** |
| `byteLength` | no | positive integer | N/A |

<a id="alg-io-tcp-listener"></a>

### TCP listener socket

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `port` | no | 16-bit unsigned integer | 0 |
| `address` | no | string | N/A |
| `onError` | no | `null` or `Function` | `null` |
| `onReadable` | no | `null` or `Function` | `null` |
| `format` | no | `"socket/tcp"` | `"socket/tcp"` |

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"socket/tcp"` | instance of TCP Socket | &nbsp; |

#### `get port`()

1. **CheckInternalFields**(`this`)
2. Return the local port the listener is bound to as a number

<a id="alg-io-udp-socket"></a>

### UDP socket

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `address` | no | string | N/A
| `port` | no | 16-bit signed integer | N/A
<!-- | `timeToLive` | yes, if multicast used | integer from 1 to 255 | N/A -->
| `onError` | no | `null` or `Function` | `null`
| `onWritable` | no | `null` or `Function` | `null`
| `format` | no | `"buffer"` | `"buffer"`

#### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

#### `write`(*data*, *address*, *port*)

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `data` | yes | byte buffer | |
| `address` | yes | string | |
| `port` | yes | 16-bit unsigned integer | &nbsp; |

<a id="alg-peripheral-class-pattern"></a>

## Peripheral Class Pattern

### `constructor`(*options*)

1. Execute steps 1 to 7 of the Base Class Pattern `constructor`
2. Try
	1. For each supported IO connection
		1. Let *name* be the name of the supported IO connection.
		2. Let *ioOptions* be **GetProperty**(*params*, *name*)
		3. Let *ioConstructor* be **GetProperty**(*ioOptions*, `"io"`)
		4. Let *ioConnection* be **Construct**(*ioConstructor*, *ioOptions*)
		5. **SetInternalField**(`this`, *name*, *ioConnection*)
	2. Configure the peripheral with *params*
	3. Throw if the communication with the peripheral is not operational
	4. Activate the peripheral
	5. **SetInternalField**(`this`, `"status"`, `"ready"`)
3. Catch *exception*
	1. **Call**(**GetProperty**(`this`, `"close"`), `this`)
	2. Throw *exception*
4. Execute step 8 of the Base Class Pattern `constructor`

### `close`()

1. Execute step 1 of the Base Class Pattern `close` method
2. Let *status* be **GetInternalField**(`this`, `"status"`)
3. Return if *status* is `null`
4. Execute steps 2 and 3 of the Base Class Pattern `close` method
5. Deactivate the peripheral
6. For each supported IO connection
	1. Let *name* be the name of the supported IO connection.
	2. Let *ioConnection* be **GetInternalField**(`this`, *name*)
	3. If *ioConnection* is not `null`
		1. **Call**(**GetProperty**(*ioConnection*, `"close"`), *ioConnection*)
7. Execute step 4 of the Base Class Pattern `close` method

### `configure`(*options*)

1. **CheckInternalFields**(`this`)
2. Let *status* be **GetInternalField**(`this`, `"status"`)
3. Throw if *status* is `null`
4. Throw if *options* is `undefined` or `null`
5. For each supported option
	1. Let *name* be the name of the supported option
	2. If **HasProperty**(*options*, *name*)
		1. Let *value* be **GetProperty**(*options*, *name*)
		2. Throw if *value* is not in the valid range of the supported option
6. Configure the peripheral with *options*

#### Notes

- Supported IO connections are supported options. Their value must be an object with an `io` property, which is the class of the IO connection.

<a id="alg-sensor-class-pattern"></a>

## Sensor Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Peripheral Class Pattern `constructor`

### `close`()

1. Execute all steps of the Peripheral Class Pattern `close` method

### `configure`(*options*)

1. Execute all steps of the Peripheral Class Pattern `configure` method

### `sample`([*params*])

1. **CheckInternalFields**(`this`)
2. Let *status* be **GetInternalField**(`this`, `"status"`)
3. Throw if *status* is `null`
4. Throw if *params* are absent but required, or present but not in the valid range
5. If the peripheral is readable
	1. Let *result* be an empty object
	2. For each sample property
		1. Let *name* be the name of the sample property
		2. Let *value* be `undefined`
		3. Read from the peripheral into *value*
		4. **DefineProperty**(*result*, *name*, *value*)
6. Else
	1. Let *result* be `undefined`
7. Return *result*

#### Notes

- The order, requirements and ranges of `sample` *params* are defined by a separate table for each class conforming to the Sensor Class Pattern.
- The requirements and ranges of properties in `sample` *result* are defined by a separate table for each class conforming to the Sensor Class Pattern.

## Sensor Classes

<a id="alg-sensor-accelerometer"></a>

### Accelerometer

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `x` | yes | number | acceleration along the x axis in meters per second squared |
| `y` | yes | number | acceleration along the y axis in meters per second squared |
| `z` | yes | number | acceleration along the z axis in meters per second squared |

<a id="alg-sensor-ambient-light"></a>

### Ambient light

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `illuminance` | yes | positive number | ambient light level in lux |

<a id="alg-sensor-atmospheric-pressure"></a>

### Atmospheric pressure

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `pressure` | yes | number | atmospheric pressure in Pascal |

<a id="alg-sensor-carbonDioxide"></a>

### Carbon Dioxide

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `CO2` | yes | number | carbon dioxide in parts per million |

<a id="alg-sensor-carbonMonoxide"></a>

### Carbon Monoxide

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `CO` | yes | number | carbon monoxide in parts per million |

<a id="alg-sensor-dust"></a>

### Dust

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `dust` | yes | number | dust levels in micrograms per cubic meter |

<a id="alg-sensor-gyroscope"></a>

### Gyroscope

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `x` | yes | number | angular velocity around the x axis in radian per second |
| `y` | yes | number | angular velocity around the y axis in radian per second |
| `z` | yes | number | angular velocity around the z axis in radian per second |

<a id="alg-sensor-humidity"></a>

### Humidity

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `humidity` | yes | number from 0 to 1 | relative humidity as a percentage |

<a id="alg-sensor-hydrogen"></a>

### Hydrogen

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `H` | yes | number | hydrogen in parts per million |

<a id="alg-sensor-hydrogenSulfide"></a>

### Hydrogen Sulfide

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `H2S` | yes | number | hydrogen sulfide in parts per million |

<a id="alg-sensor-magnetometer"></a>

### Magnetometer

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `x` | yes | number | magnetic field around the x axis in microtesla |
| `y` | yes | number | magnetic field around the y axis in microtesla |
| `z` | yes | number | magnetic field around the z axis in microtesla |

<a id="alg-sensor-methane"></a>

### Methane

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `CH4` | yes | number | methane in parts per million |

<a id="alg-sensor-nitricOxide"></a>

### Nitric Oxide

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `NO` | yes | number | nitric oxide in parts per million |

<a id="alg-sensor-nitricDioxide"></a>

### Nitric Dioxide

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `NO2` | yes | number | nitric dioxide in parts per million |

<a id="alg-sensor-oxygen"></a>

### Oxygen

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `O` | yes | number | oxygen in parts per million |

<a id="alg-sensor-particulateMatter"></a>

### Particulate Matter

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `particulateMatter` | yes | number | particulate matter levels in micrograms per cubic meter |

<a id="alg-sensor-proximity"></a>

### Proximity

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `near` | yes | boolean | indicator of a detected proximate object |
| `distance` | yes | positive number or `null` | distance to the nearest sensed object in centimeters or `null` if no object is detected |
| `max` | yes | positive number | maximum sensing range of the sensor in centimeters |

<a id="alg-sensor-soilmoisture"></a>

### Soil Moisture

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `moisture` | yes | number between 0 and 1 | relative soil moisture level |

<a id="alg-sensor-temperature"></a>

### Temperature

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `temperature` | yes | number | temperature in degrees Celsius |

<a id="alg-sensor-touch"></a>

### Touch

#### `sample` *params*:

None

#### `sample` *result*:

`Array` of `touch` objects or `undefined` if no touch is in progress.


#### `touch` object:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `x` | yes | number | X coordinate of the touch point |
| `y` | yes | number | Y coordinate of the touch point |
| `id` | yes | positive integer | indicator of which touch point this entry corresponds to |

<a id="alg-sensor-VolatileOrganicCompounds"></a>

### Volatile Organic Compounds

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `tvoc` | yes | number | total volatile organic compounds in parts per billion |

<a id="alg-display-class-pattern"></a>

## Display Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Peripheral Class Pattern `constructor`

### `adaptInvalid`(*area*)

1. **CheckInternalFields**(`this`)
1. Throw if *area* is absent
1. 	If **HasProperty**(*area*, `"x"`)
	1. Let *x* be **GetProperty**(*area*, `"x"`)
1. Else
	1. Let *x* be `0`
1. 	If **HasProperty**(*area*, `"y"`)
	1. Let *y* be **GetProperty**(*area*, `"y"`)
1. Else
	1. Let *y* be `0`
1. 	If **HasProperty**(*area*, `"width"`)
	1. Let *width* be **GetProperty**(*area*, `"width"`)
1. Else
	1. Let *width* be the width of the frame buffer in pixels
1. 	If **HasProperty**(*area*, `"height"`)
	1. Let *height* be **GetProperty**(*area*, `"height"`)
1. Else
	1. Let *height* be the height of the frame buffer in pixels
1. Adjust *x*, *y*, *width*, *height* to define a valid area to update
1. **SetProperty**(*area*, `"x"`, *x*)
1. **SetProperty**(*area*, `"y"`, *y*)
1. **SetProperty**(*area*, `"width"`, *width*)
1. **SetProperty**(*area*, `"height"`, *height*)

### `close`()

1. Execute all steps of the Peripheral Class Pattern `close` method

### `begin`(*options*)

1. **CheckInternalFields**(`this`)
1. Let *status* be **GetInternalField**(`this`, `"status"`)
1. Throw if *status* is `null`
1. Let *x* be `0`
1. Let *y* be `0`
1. Let *width* be the width of the frame buffer in pixels
1. Let *height* be the height of the frame buffer in pixels
1. Let *continue* be `false`
1. If *options* is present
	1. 	If **HasProperty**(*options*, `"x"`)
		1. Let *x* be **GetProperty**(*options*, `"x"`)
	1. 	If **HasProperty**(*options*, `"y"`)
		1. Let *y* be **GetProperty**(*options*, `"y"`)
	1. 	If **HasProperty**(*options*, `"width"`)
		1. Let *width* be **GetProperty**(*options*, `"width"`)
	1. 	If **HasProperty**(*options*, `"height"`)
		1. Let *height* be **GetProperty**(*options*, `"height"`)
	1. 	If **HasProperty**(*options*, `"continue"`)
		1. Let *continue* be **GetProperty**(*options*, `"continue"`)
1. Throw if the area defined by *x*, *y*, *width*, and *height* is invalid.
1. If *status* is `ready`
	1. **SetInternalField**(`this`, `"status"`, `"updating"`)
1. Else
	1. Throw if *continue* is false
1. Use *x*, *y*, *width*, *height* to prepare the frame buffer to receive scanlines

### `configure`(*options*)

1. Execute all steps of the Peripheral Class Pattern `configure` method

### `end`()

1. **CheckInternalFields**(`this`)
1. Let *status* be **GetInternalField**(`this`, `"status"`)
1. Throw if *status* is not `"updating"`
1. **SetInternalField**(`this`, `"status"`, `"finishing"`)
1. Make updated frame buffer visible
1. **SetInternalField**(`this`, `"status"`, `"ready"`)

### `send`(*scanlines*)

1. **CheckInternalFields**(`this`)
1. Let *status* be **GetInternalField**(`this`, `"status"`)
1. Throw if *status* is not `"updating"`
1. Throw if *scanlines* is absent
1. Let *pointer* be **GetBytePointer**(*scanlines*)
1. Let *n* be **GetProperty**(*lines*, `"byteLength"`)
1. Transfer *n* bytes from *pointer* to the frame buffer

### `get width`()

1. **CheckInternalFields**(`this`)
1. Return the width of the frame buffer in pixels

### `get height`()

1. **CheckInternalFields**(`this`)
1. Return the height of the frame buffer in pixels

### Notes
- When the frame buffer `rotation` is 90 or 270 degrees, `get width` returns the height of the frame buffer in pixels and `get height` returns the width of the frame buffer in pixels.

### constructor *options*:

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| format | no | see text | |
| rotation | no | 0, 90, 180, or 270 | |
| brightness | no | 0.0 to 1.0 | |
| flip | no | "", "h", "v", or "hv" | &nbsp; |

<a id="alg-real-time-clock-class-pattern"></a>

## Real-Time Clock Class Pattern

### `constructor`(*options*)

1. Execute step 1 of the Peripheral Class Pattern `constructor`
2. Let *interrupt* be **GetInternalField**(`this`, `"interrupt"`)
3. Let *onAlarm* be **GetInternalField**(`this`, `"onAlarm"`)
4. If *interrupt* is not `null` and *onAlarm* is not `null`
	1. Let *interruptParams* be **GetProperty**(*params*, `"interrupt"`)
	2. Let *onReadable* be a function with the following steps:
		1. Queue a task that performs
			1. **Call**(*onAlarm*, `this`)
	3. **SetProperty**(*interruptParams*, `"onReadable"`, *onReadable*)
1. Execute steps 2 to 4 of the Peripheral Class Pattern `constructor`

### `close`()

1. Execute all steps of the Peripheral Class Pattern `close` method

### `configure`(*options*)

1. Execute all steps of the Peripheral Class Pattern `configure` method

### `get time`()

1. **CheckInternalFields**(`this`)
2. Let *status* be **GetInternalField**(`this`, `"status"`)
3. Throw if *status* is `null`
4. If the peripheral is readable
	1. Let *result* be the clock time as an ECMAScript number
5. Else
	1. Let *result* be `undefined`
6. Return *result*

### `set time`(*time*)

1. **CheckInternalFields**(`this`)
2. Let *status* be **GetInternalField**(`this`, `"status"`)
3. Throw if *status* is `null`
4. If the peripheral is writable
	1. Convert *time* into an ECMAScript number
	2. Set the clock time to *time*

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `clock` | yes | `Object` | |
| `interrupt` | no | `null` or `Object` | `null` |
| `onAlarm` | no | `null` or `Function` | `null`|

### configure *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `alarm` | no | `number` | 0 |

<a id="alg-network-interface-class-pattern"></a>

## Network Interface Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Base Class Pattern `constructor`

### `close`()

1. Execute all steps of the Base Class Pattern `close` method

### `connect`(*options*)

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. Throw if *connection* is not **0**
4. **SetInternalField**(`this`, `"connection"`, 100)
5. Let *port* be **GetInternalField**(`this`, `"port"`)
6. Let *onChanged* be **GetInternalField**(`this`, `"onChanged"`)
7. Monitor the network interface specified by *port*
	1. When changed
		1. If *onChanged* is not `null`
			1. Queue a task that performs
				1. **Call**(*onChanged*, `this`)
		
### `disconnect`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is not **0**
	1. Disconnect the network interface

### `get MAC`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is more than **0**
	1. Let *result* be the MAC address of the network interface as an ECMAScript string
4. Else
	1. Let *result* be `undefined`
5. Return *result*

### `get address`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is more than or equal to **500**
	1. Let *result* be the IP address of the network interface as an ECMAScript string
4. Else
	1. Let *result* be `undefined`
5. Return *result*

### `get connection`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. Return *connection*

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `onChanged` | no | `null` or `Function` | `null` |
| `port` | no | string | |

<a id="alg-ethernet-network-interface"></a>

## Ethernet Network Interface

### `connect`(*options*)
	
1. Execute steps 1 to 6 of the Network Interface Class Pattern `connect` method
2. Start connecting the network interface specified by *port*
3. Execute step 7 of the Network Interface Class Pattern `connect` method

<a id="alg-wifi-network-interface"></a>

## Wi-Fi Network Interface

### `connect`(*options*)
	
1. Execute steps 1 to 6 of the Network Interface Class Pattern `connect` method
2. Throw if *options* is not an object
3. If **HasProperty**(*options*, `"SSID"`)
	1. Let *SSID* be **GetProperty**(*options*, `"SSID"`)
	2. Convert *SSID* into an ECMAScript string
4. Else
	1. Let *SSID* be `undefined`
5. If **HasProperty**(*options*, `"BSSID"`)
	1. Let *BSSID* be **GetProperty**(*options*, `"BSSID"`)
	2. Convert *BSSID* into an ECMAScript string
6. Else
	1. Let *BSSID* be `undefined`
7. Throw if both *SSID* and *BSSID* are `undefined`
8. If **HasProperty**(*options*, `"channel"`)
	1. Let *channel* be **GetProperty**(*options*, `"channel"`)
	2. Convert *channel* into an ECMAScript number
9. Else
	1. Let *channel* be `undefined`
10. If **HasProperty**(*options*, `"secure"`)
	1. Let *secure* be **GetProperty**(*options*, `"secure"`)
	2. Convert *secure* into an ECMAScript boolean
11. Else
	1. Let *secure* be **false**
12. If **HasProperty**(*options*, `"password"`)
	1. Let *password* be **GetProperty**(*options*, `"password"`)
	2. Convert *password* into an ECMAScript string
13. Else
	1. Let *password* be `undefined`
14. Start connecting the network interface specified by *port* to the access point specified by *SSID*, *BSSID*, *channel* and *secure* with *password*
15. Execute step 7 of the Network Interface Class Pattern `connect` method

### `scan`(*options*)

1. **CheckInternalFields**(`this`)
2. Let *scanning* be **GetInternalField**(`this`, `"scanning"`)
3. Throw if *scanning* is **true**
4. Throw if *options* is not an object
5. Let *onFound* be **GetProperty**(*options*, `"onFound"`)
6. Throw if not **IsCallable**(*onFound* )
7. If **HasProperty**(*options*, `"onComplete"`)
	1. Let *onComplete* be **GetProperty**(*options*, `"onComplete"`)
	2. Throw if not **IsCallable**(*onComplete*)
8. Else
	1. Let *onComplete* be `undefined`
9. If **HasProperty**(*options*, `"channel"`)
	1. Let *channel* be **GetProperty**(*options*, `"channel"`)
	2. Convert *channel* into an ECMAScript number
10. Else
	1. Let *channel* be `undefined`
11. If **HasProperty**(*options*, `"frequency"`)
	1. Let *frequency* be **GetProperty**(*options*, `"frequency"`)
	2. Convert *frequency* into an ECMAScript number
	2. Throw if *frequency* is neither **2.4** nor **5**
12. Else
	1. Let *frequency* be `undefined`
13. If **HasProperty**(*options*, `"secure"`)
	1. Let *secure* be **GetProperty**(*options*, `"secure"`)
	2. Convert *secure* into an ECMAScript boolean
14. Else
	1. Let *secure* be **false**
15. **SetInternalField**(`this`, `"scanning"`, **true**)
16. Start scanning for access points matching *channel*, *frequency* and *secure*
	1. When an access point is found
		1. Let *result* be an empty object
		2. Let *value* be the SSID of the access point as an ECMAScript string
		3. **SetProperty**(*result*, `"SSID"`, *value*)
		4. Let *value* be the BSSID of the access point as a MAC address ECMAScript string
		5. **SetProperty**(*result*, `"BSSID"`, *value*)
		6. Let *value* be the RSSI of the access point as an ECMAScript number
		7. **SetProperty**(*result*, `"RSSI"`, *value*)
		8. Let *value* be the channel of the access point as an ECMAScript number
		9. **SetProperty**(*result*, `"channel"`, *value*)
		10. Let *security* be the security mode of the access point as an ECMAScript string
		11. **SetProperty**(*security*, `"security"`, *value*)
		12. Queue a task that performs
			1. **Call**(*onFound*, `null`, `this`, *result*)
	1. When done
		1. **SetInternalField**(`this`, `"scanning"`, **false**)
		2. If *onComplete* is not `undefined`
			1. Queue a task that performs
				1. **Call**(*onComplete*, `this`)

### `get BSSID`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is more than or equal to **400**
	1. Let *result* be the BSSID of the access point as an ECMAScript string
4. Else
	1. Let *result* be `undefined`
5. Return *result*

### `get RSSI`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is more than or equal to **400**
	1. Let *result* be the RSSI of the access point as an ECMAScript string
4. Else
	1. Let *result* be `undefined`
5. Return *result*

### `get SSID`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is more than or equal to **400**
	1. Let *result* be the SSID of the access point as an ECMAScript string
4. Else
	1. Let *result* be `undefined`
5. Return *result*

### `get channel`()

1. **CheckInternalFields**(`this`)
2. Let *connection* be **GetInternalField**(`this`, `"connection"`)
3. If *connection* is more than or equal to **400**
	1. Let *result* be the channel of the access point as an ECMAScript number
4. Else
	1. Let *result* be `undefined`
5. Return *result*

<a id="alg-domain-name-resolver-class-pattern"></a>

## Domain Name Resolver Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Base Class Pattern `constructor`

### `close`()

1. Execute all steps of the Base Class Pattern `close` method

### `resolve`(*options*[, *callback*])

1. **CheckInternalFields**(`this`)
2. Throw if *options* is not an object
3. If **HasProperty**(*options*, `"host"`)
	1. Let *name* be **GetProperty**(*options*, `"host"`)
	2. Convert *name* to an ECMAScript string
4. Else
	1. Throw
5. Throw if *callback* is not `undefined` and not **IsCallable**(*callback*)
6. If *name* matches an IP address
	1. If *callback* is not `undefined`
		1. Queue a task that performs
			1. **Call**(*callback*, `this`, `null`, *name*, *name*)
7. Else
	1. Start the resolution with *name*
		1. When the resolution succeeded
			1. If *callback* is not `undefined`
				1. Let *address* be the resolved address as an ECMAScript string
				2. Queue a task that performs
					1. **Call**(*callback*, `this`, `null`, *name*, *address*)
		1. When the resolution failed
			1. If *callback* is not `undefined`
				1. Let *error* be an ECMAScript `Error` object describing the failure
				2. Queue a task that performs
					1. **Call**(*callback*, `this`, *error*)
			
## DNS over UDP

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `socket` | yes | `Object` | N/A |
| `servers` | yes | `Array` of strings | N/A |

### Notes

- The resolution itself	 can be implemented in ECMAScript. See the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/udp/dns/dns.js)

## DNS over HTTPS

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `http` | yes | `Object` | N/A |
| `servers` | yes | `Array` of strings | N/A |

### Notes

- The resolution itself	 can be implemented in ECMAScript.

<a id="alg-ntp-client"></a>

## NTP Client

### `constructor`(*options*)

1. Execute all steps of the Base Class Pattern `constructor`

### `close`()

1. Execute all steps of the Base Class Pattern `close` method

### `getTime`(*callback*)

1. **CheckInternalFields**(`this`)
2. Let *synchronizing* be **GetInternalField**(`this`, `"synchronizing"`)
3. Throw if *synchronizing* is **true**
4. Throw if not **IsCallable**(*callback*)
5. **SetInternalField**(`this`, `"synchronizing"`, **true**)
6. Start the synchronization
	1. When the synchronization succeeded
		1. Let *time* be the synchronized time as an ECMAScript number
		2. Queue a task that performs
			1. **Call**(*callback*, `this`, `null`, *time*)
			2. **SetInternalField**(`this`, `"synchronizing"`, **false**)
	1. When the synchronization failed
		1. Let *error* be an ECMAScript `Error` object describing the failure
		2. Queue a task that performs
			1. **Call**(*callback*, `this`, *error*)
			2. **SetInternalField**(`this`, `"synchronizing"`, **false**)
			
### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `socket` | yes | `Object` | N/A |
| `servers` | yes | `Array` of strings | N/A |

### Notes

- The synchronization itself can be implemented in ECMAScript. See the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/udp/sntp/sntp.js)

<a id="alg-tcp-client-class-pattern"></a>

## TCP Client Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Base Class Pattern `constructor`
2. Let *dnsOptions* be **GetInternalField**(`this`, `"dns"`)
3. Let *dnsConstructor* be **GetProperty**(*dnsOptions*, `"io"`)
4. Let *dnsParams* be a copy of *dnsOptions*
5. **SetProperty**(*dnsParams*, `"target"`, `this`)
6. Let *dnsResolver* be **Construct**(*dnsConstructor*, *dnsParams*)
7. **SetInternalField**(*target*, `"dnsResolver"`, *dnsResolver*)
8. Let *resolve* be **GetProperty**(*dnsResolver*, `"resolve"`)
9. Let *resolveParams* be a new object
10. **SetProperty**(*resolveParams*, `"host"`, **GetInternalField**(`this`, `"host"`))
11. Let *resolveCallback* be **GetInternalField**(`this`, `"resolveCallback"`)
12. **Call**(*resolve*, *dnsResolver*, *resolveParams*, *resolveCallback*)

### `close`()
1. Let *tcpSocket* be **GetInternalField**(`this`, `"tcpSocket"`)
2. If *tcpSocket* is not `null`
	 1. **Call**(**GetProperty**(*tcpSocket*, `"close"`), *tcpSocket*)
3. Let *dnsResolver* be **GetInternalField**(`this`, `"dnsResolver"`)
4. If *dnsResolver* is not `null`
	 1. **Call**(**GetProperty**(*dnsResolver*, `"close"`), *dnsResolver*)
5. Execute all steps of the Base Class Pattern `close` method

### `#resolveCallback`(*error*, *name*, *address*)
1. Let *target* be **GetProperty**(`this`, `"target"`)
2. **Call**(**GetProperty**(`this`, `"close"`), `this`)
3. **SetInternalField**(*target*, `"dnsResolver"`, `null`)
4. If *error* is `null`
	1. Let *tcpOptions* be **GetInternalField**(*target*, `"socket"`)
	2. Let *tcpConstructor* be **GetProperty**(*tcpOptions*, `"io"`)
	3. Let *tcpParams* be a copy of *tcpOptions*
	4. **SetProperty**(*tcpParams*, `"address"`, *address*)
	5. **SetProperty**(*tcpParams*, `"port"`, **GetInternalField**(*target*, `"port"`))
	6. **SetProperty**(*tcpParams*, `"onError"`, **GetInternalField**(`this`, `#tcpError`))
	7. **SetProperty**(*tcpParams*, `"onReadable"`, **GetInternalField**(`this`, `#tcpReadable`))
	8. **SetProperty**(*tcpParams*, `"onWritable"`, **GetInternalField**(`this`, `#tcpWritable`))
	9. **SetProperty**(*tcpParams*, `"target"`, `this`)
	10. Let *tcpSocket* be **Construct**(*tcpConstructor*, *tcpParams*)
	11. **SetInternalField**(*target*, `"tcpSocket"`, *tcpSocket*)
5. Else
	1. Let *onError* be **GetInternalField**(*target*, `"onError"`)
	2. If *onError* is not `null`
		 1. Queue a task that performs
			1. **Call**(*onError*, *target*, *error*)

### `read`(*count*)
### `write`(*data*[, *options*])
### `#tcpError`(*error*)
### `#tcpReadable`(*count*)
### `#tcpWritable`(*count*)

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

### Notes

- The `read`, `write`, `#tcpError`, `#tcpReadable`, `#tcpWritable` functions implement the network protocol, which usually requires a state machine, buffers, parsers, serializers, etc.
- Such methods can read and write from the TCP socket and can queue tasks to call the client callbacks.
- For each network protocol, the client has specific methods and callbacks, and the `write` method can have specific options.

<a id="alg-http-client"></a>

## HTTP Client

### `constructor`(*options*)
1. Execute step 1 of the TCP Client Class Pattern `constructor`
2. Let *requests* be a new `Array` object
3. **SetInternalField**(`this`, `"requests"`, *requests*)
2. Execute steps 2 to 12 of the TCP Client Class Pattern `constructor`

### `close`()
1. Let *requests* be **GetInternalField**(`this`, `"requests"`)
2. For each element *request* of *requests*
	1. Cancel *request*
3. Execute all steps TCP Client Class Pattern `close` method

### `request`(*options*)
1. Let *requests* be **GetInternalField**(`this`, `"requests"`)
2. Let *requestConstructor* be the HTTP Client Request constructor
3. Let *requestParams* be a copy of *options*
4. **SetProperty**(*requestParams*, `"target"`, `this`)
5. Let *request* be **Construct**(*requestConstructor*, *requestParams*)
6. Add *request* to *request*
7. When `this` is ready
	1. Start the *request*

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `dns` | yes | `Object` | N/A |
| `host` | yes | string | N/A |
| `socket` | yes | `Object` | N/A |
| `port` | no | number | `80` |
| `onError` | no | `null` or `Function` | `null` |

### Notes

- The HTTP Client Request constructor is available only to the HTTP Client class.
- The HTTP Client class conforms to the TCP Client Class Pattern here above except:
	- The `read` and `write` methods are provided by the HTTP Client Request instance.
	- The HTTP Client Request instance owns the network protocol specific callbacks.
- If the HTTP Client handles a single request at time, step 7 of the `request` method waits for the former request to complete.
- For details about the implementation of the HTTP Client, see the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/tcp/httpclient/httpclient.js)

<a id="alg-http-client-request"></a>

## HTTP Client Request

### constructor *options*
| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `method` | no | string | `GET` |
| `path` | no | string | `/` |
| `headers` | no | `Map` | `null` |
| `port` | no | number | `80` |
| `onHeaders` | no | `Function` | `null` |
| `onReadable` | no | `Function` | `null` |
| `onWritable` | no | `Function` | `null` |
| `onDone` | no | `Function` | `null` |

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

<a id="alg-mqtt-client"></a>

## MQTT Client

### `constructor` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `dns` | yes | `Object` | N/A |
| `host` | yes | string | N/A |
| `socket` | yes | `Object` | N/A |
| `port` | no | number | 1883 |
| `id` | no | string | |
| `user` | no | string | |
| `password` | no | string or Byte Buffer | |
| `keepAlive` | no | number | 0 |
| `clean` | no | boolean | `true` |
| `will` | no | Object* | `null` |
| `onReadable` | no | `Function` | `null` |
| `onWritable` | no | `Function` | `null` |
| `onError` | no | `Function` | `null` |
| `onControl` | no | `Function` | `null` |

* The `will` object has:
	
| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `topic` | yes | string | N/A |
| `message` | yes | string or Byte Buffer | N/A |
| `QoS` | no | 0, 1, or 2 | 0 |
| `retain` | no | boolean | false |

### `write` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `operation` | no | number | `MQTTCLient.PUBLISH` |
| `id` | no | number | |
| `topic` | yes* | string | N/A |
| `QoS` | no* | 0, 1, or 2 | 0 |
| `retain` | no* | boolean | false |
| `duplicate` | no* | boolean | false |
| `byteLength` | no* | number | `data.byteLength` |
| `items` | yes* | `Array` | N/A |

* `topic` is required when `operation` is `MQTTCLient.PUBLISH`
* `QoS`, `retain`, `duplicate`, `byteLength` are used when `operation` is `MQTTCLient.PUBLISH`
* `items` is required and used when `operation` is `MQTTCLient.SUBSCRIBE` or `MQTTCLient.UNSUBSCRIBE`.
* `items` is an array of objects that have:

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `topic` | yes | string | N/A |
| `QoS` | no* | 0, 1, or 2 | 0 |

* `QoS` is used when `operation` is `MQTTCLient.SUBSCRIBE`

### Notes

- The MQTT Client class conforms to the TCP Client Class Pattern here above.
- For details about the implementation of the MQTT Client, see the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/tcp/mqttclient/mqttclient.js)

<a id="alg-websocket-client"></a>

## WebSocket Client

### `constructor`(*options*)

1. Execute step 1 of the TCP Client Class Pattern `constructor`
2. Let *tcpSocket* be **GetInternalField**(`this`, `"attach"`)
3. If *tcpSocket* is `null`
	1. Execute steps 2 to 12 of the TCP Client Class Pattern `constructor`
4. Else
	1. **SetInternalField**(`this`, `"tcpSocket"`, *tcpSocket*)

### `constructor` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `attach` | no | instance of TCP Socket | `null` |
| `dns` | yes* | `Object` | N/A |
| `host` | yes* | string | N/A |
| `socket` | yes* | `Object` | N/A |
| `port` | no* | number | 80 |
| `protocol` | no* | string | "" |
| `headers` | no* | `Map` | `null` |
| `onReadable` | no | `Function` | `null` |
| `onWritable` | no | `Function` | `null` |
| `onError` | no | `Function` | `null` |
| `onControl` | no | `Function` | `null` |
| `onClose` | no | `Function` | `null` |
| `format` | no | `"number"` or `"buffer"` | `"buffer"` |

* If `attach` is present, `dns`, `host`, `socket`, `port`, `protocol` and `headers` are neither required nor used.

### `write` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `binary` | no | boolean | **true** |
| `more` | no | boolean | **false** |
| `opcode` | no | number | |

### Notes

- The WebSocket Client class conforms to the TCP Client Class Pattern here above.
- For details about the implementation of the WebSocket Client, see the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/tcp/websocketclient/websocketclient.js)

<a id="alg-tcp-server-class-pattern"></a>

## TCP Server Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Base Class Pattern `constructor`
2. Let *connections* be a new `Set` object
3. **SetInternalField**(`this`, `"connections"`, *connections*)
4. Let *tcpOptions* be **GetInternalField**(*target*, `"listener"`)
5. Let *tcpConstructor* be **GetProperty**(*tcpOptions*, `"io"`)
6. Let *tcpParams* be a copy of *tcpOptions*
7. **SetProperty**(*tcpParams*, `"port"`, **GetInternalField**(*target*, `"port"`))
8. **SetProperty**(*tcpParams*, `"onReadable"`, **GetInternalField**(`this`, `#tcpReadable`))
9. **SetProperty**(*tcpParams*, `"target"`, `this`)
10. Let *tcpSocket* be **Construct**(*tcpConstructor*, *tcpParams*)
11. **SetInternalField**(`this`, `"tcpSocket"`, *tcpSocket*)

### `close`()
1. Let *connections* be **GetInternalField**(`this`, `"connections"`)
2. For each element *connection* of *connections*
	1. **Call**(**GetProperty**(*connection*, `"close"`), *connection*)
3. Let *tcpSocket* be **GetInternalField**(`this`, `"tcpSocket"`)
4. If *tcpSocket* is not `null`
	1. **Call**(**GetProperty**(*tcpSocket*, `"close"`), *tcpSocket*)
5. Execute all steps of the Base Class Pattern `close` method

### `#tcpReadable`(*count*)
1. Let *target* be **GetProperty**(`this`, `"target"`)
2. Let *connections* be **GetInternalField**(*target*, `"connections"`)
3. Let *onConnect* be **GetInternalField**(*target*, `"onConnect"`)
4. Let *connectionConstructor* be a class conforming to the TCP Server Connection Class Pattern
5. While *count* > 0
	1. Let *from* be **Call**(**GetProperty**(`this`, `"read"`), `this`)
	2. Let *connection* be **Construct**(*connectionConstructor*, *target*, *from*)
	3. Add *connection* to *connections*
	4. Queue a task that performs
		1. **Call**(*onConnect*, *target*, *connection*)
	5. Let *count* be *count* - 1

### `constructor` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `listener` | yes | `Object` | N/A |
| `port` | no* | number | 80 |
| `onConnect` | yes | `Function` | N/A |

### Notes

- The connection constructor is specific to each network protocol, and available only to the implementation: a static private field of the server class, a closure of the server module, etc.

<a id="alg-tcp-server-connection-class-pattern"></a>

## TCP Server Connection Class Pattern

### `constructor`(*server*, *from*)
1. **SetInternalField**(`this`, `"server"`, *server*)
2. Let *tcpConstructor* be **GetProperty**(*from*, `"constructor"`)
3. Let *tcpParams* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
4. **SetProperty**(*tcpParams*, `"from"`, *from*)
5. **SetProperty**(*tcpParams*, `"onError"`, **GetInternalField**(`this`, `#tcpError`))
6. **SetProperty**(*tcpParams*, `"onReadable"`, **GetInternalField**(`this`, `#tcpReadable`))
7. **SetProperty**(*tcpParams*, `"onWritable"`, **GetInternalField**(`this`, `#tcpWritable`))
8. **SetProperty**(*tcpParams*, `"target"`, `this`)
9. Let *tcpSocket* be **Construct**(*tcpConstructor*, *tcpParams*)
10. **SetInternalField**(`this`, `"tcpSocket"`, *tcpSocket*)

### `close`()
1. Let *tcpSocket* be **GetInternalField**(`this`, `"tcpSocket"`)
2. If *tcpSocket* is not `null`
	1. **Call**(**GetProperty**(*tcpSocket*, `"close"`), *tcpSocket*)
3. Let *server* be **GetInternalField**(`this`, `"server"`)
4. Let *connections* be **GetInternalField**(*server*, `"connections"`)
5. Remove `this` from *connections*

### `read`(*count*)
### `write`(*data*[, *options*])
### `#tcpError`(*error*)
### `#tcpReadable`(*count*)
### `#tcpWritable`(*count*)

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

### Notes

- The `read`, `write`, `#tcpError`, `#tcpReadable`, `#tcpWritable` functions implement the network protocol, which usually requires a state machine, buffers, parsers, serializers, etc.
- Such methods can read and write from the TCP socket and can queue tasks to call the server connection callbacks.
- For each network protocol, the server connection has specific methods and callbacks, and the `write` method can have specific options.

<a id="alg-http-server"></a>

## HTTP Server

### Notes

- The HTTP Server class conforms to the TCP Server Class Pattern here above.
- The server connection constructor is the HTTP Server Connection class.
- For details about the implementation of the HTTP Server, see the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/listener/httpserver/httpserver.js)

## HTTP Server Connection

### `detach`()
1. Let *tcpSocket* be **GetInternalField**(`this`, `"tcpSocket"`)
2. **SetInternalField**(`this`, `"tcpSocket"`, `null`)
3. Let *server* be **GetInternalField**(`this`, `"server"`)
4. Let *connections* be **GetInternalField**(*server*, `"connections"`)
5. Remove `this` from *connections*
6. Return *tcpSocket*

### `accept`(*options*)
1. Throw if options is not an object
2. For each supported callback
	1. Let *name* be the name of the supported callback
	2. Let *callback* be **GetProperty**(*options*, *name*)
	3. If *callback* is not `undefined`
		1. Throw if not **IsCallable**(*callback*)
		2. **SetInternalField**(`this`, *name*, *callback*)
3. Start receiving the request
	
### `get route`()
1. Let *result* be **GetInternalField**(`this`, `"route"`)
3. Return result

### `set route`(*options*)
1. Execute steps 1 and 2 of the `accept` method
3. **SetInternalField**(`this`, `"route"`, *options*)

#### `accept` and `set route` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `onDone` | no | `Function` | `null` |
| `onError` | no | `Function` | `null` |
| `onReadable` | no | `Function` | `null` |
| `onRequest` | no | `Function` | `null` |
| `onWritable` | no | `Function` | `null` |

### `respond`(*options*)
1. Throw if options is not an object
2. Let *status* be **GetProperty**(*options*, `"status"`)
3. Convert *status* into an ECMAScript number
4. Throw if *status* is no positive integer
5. Let *headers* be **GetProperty**(*options*, `"headers"`)
6. Throw if *headers* is no `Map` instance
7. Start sending the response with *status* and *headers*

#### `respond` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `status` | yes | positive integer | N/A |
| `headers` | yes | `Map` | N/A |

### Notes

- The HTTP Server Connection class conforms to the TCP Server Connection Class Pattern here above.
- The HTTP Connection callbacks can be changed with the `route` setter, usually in the `onRequest` callback, when the HTTP method, path, and headers are available.
- For examples of routes, see the [sample code](https://github.com/Moddable-OpenSource/moddable/blob/public/examples/io/listener/httpserver/options)

<a id="alg-sensor-prov-class-pattern"></a>

## Provenance Sensor Class Pattern

### `configure`(*options*)
1. Execute all steps of the Sensor Class Pattern configure method

### `sample`([*params*])
1. Execute steps 1 to 6 of the Sensor Class Pattern `sample` method
2. If *result* is an object
	1. If an absolute clock is available
		1. Let *time* be the value of the absolute clock upon sampling
		2. **DefineProperty**(*result*, `"time"`, *time*)
	2. If a relative clock is available
		1. Let *ticks* be the value of a relative clock upon sampling
		2. **DefineProperty**(*result*, `"ticks"`, *ticks*)
	3. If faults are readable from the sensor upon sampling
		1. Read from the sensor into *faults*
		2. **DefineProperty**(*result*, `"faults"`, *faults*)
3. Execute steps 7 of the Sensor Class Pattern `sample` method

#### Notes

- The absolute clock is the most precise clock available to get an absolute time value (since the Epoch), from either the sensor, the microcontroller, or another peripheral.
- The relative clock is any clock available to get a consistent relative time value (for instance since the device started), from either the sensor, the microcontroller, or another peripheral.

#### `sample` *params*:

None

#### `sample` *result*:

In addition to the sample results defined in the [Sensor Class Pattern](#alg-sensor-class-pattern), the Provenance Sensor Class Pattern adds properties as follows:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `time` | yes, if available | positive number | number originating from an absolute clock describing the instant that the sample returned was captured |
| `ticks` | yes, if available | positive number | number originating from a non-absolute clock describing the instant that the sample returned was captured |
| `faults` | no | boolean, number, or string | object representing a record of any sensor-level faults that occurred during this sensor sample or since the previously reported sample |

### Notes
- The order, requirements, and ranges of options for **configure** extend those found in a separate table for every class conforming to the Sensor Class Pattern, and add the options `configuration` and `identification` as defined in the Sensor Provenance Class Pattern.
- Metadata (*time*, *ticks*, *faults*) reflect only the metadata associated with the first sample. In cases where multiple samples may be taken from a single device, timing and fault data may be imprecise for subsequent samples.

<a id="alg-audio-input"></a>

## Audio Input Class

### `constructor` *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `audioType` | no | `"LPCM"` | `"LPCM"` |
| `bitsPerSample` | no | `8` or `16` | (host defined) |
| `channels` | no | `1` or `2` | (host defined) |
| `sampleRate` | no | positive integer | (host defined) |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"buffer"` | `"buffer"` |

#### Notes

- The Audio Input Class conforms to the IO Class Pattern for its `constructor`, `close` and `read` methods. There is no `write` method.
- The `"resources"` internal field of an Audio Input instance represents the hardware and software necessary to capture audio samples on the device.
- The `constructor` does not start capturing audio samples. Use the `start` method.
- When audio samples are available to read, the `onReadable` callback is invoked with two arguments, *byteLength* and *sampleCount*. 

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | &nbsp; |

### `start`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. If *resources* already started
	1. Return
5. Start capturing audio with *resources*

### `stop`([*options*])
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *flush* be `false`
5. If *options* is provided
	1. 	If **HasProperty**(*options*, `"flush"`)
		1. Let *flush* be **GetProperty**(*options*, `"flush"`)
		2. Convert *flush* into an ECMAScript boolean
6. If *resources* capturing audio
	1. Stop capturing audio with *resources* 
7. If *flush*
	1. Flush unread samples in *resources* 

### `get audioType`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *audioType* be the encoding of *resources*
5. Return *audioType*

### `get bitsPerSample`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *bitsPerSample* be the number of bits per sample of *resources*
5. Return *bitsPerSample*

### `get channels`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *channels* be the number of channels of *resources*
5. Return *channels*

### `get sampleRate`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *sampleRate* be the sample rate of *resources*
5. Return *sampleRate*


<a id="alg-audio-input-async"></a>

## Audio Input Class – asynchronous

### Notes

- The asynchronous version of the Audio Input Class extends the Audio Input Class in order to conform to the asynchronous version of the IO Class Pattern.
- The `onReadable` callback is never invoked.
- The *callback* of the `read` method is invoked when audio samples have been read.


<a id="alg-audio-output"></a>

## Audio Output Class

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `audioType` | no | `"LPCM"` | `"LPCM"` |
| `bitsPerSample` | no | `8` or `16` | (host defined) |
| `channels` | no | `1` or `2` | (host defined) |
| `sampleRate` | no | positive integer | (host defined) |
| `onWritable` | no | `null` or `Function` | `null`|
| `format` | no | `"buffer"` | `"buffer"` |

#### Notes

- The Audio Output Class conforms to the IO Class Pattern for its `constructor`, `close` and `write` methods. There is no `read` method.
- The `"resources"` internal field of an Audio Output instance represents the hardware and software necessary to play audio samples on the device.
- The `constructor` does not start playing audio samples. Use the `start` method.
- When space is available to write audio samples, the `onWritable` callback is invoked with two arguments, *byteLength* and *sampleCount*. 

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | &nbsp; | byte buffer |

### `start`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. If *resources* already started
	1. Return
5. Start playing audio with *resources*

### `stop`([*options*])
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *flush* be `false`
5. If *options* is provided
	1. 	If **HasProperty**(*options*, `"flush"`)
		1. Let *flush* be **GetProperty**(*options*, `"flush"`)
		2. Convert *flush* into an ECMAScript boolean
6. If *resources* playing audio
	1. Stop playing audio with *resources* 
7. If *flush*
	1. Flush unplayed samples in *resources* 

### `get audioType`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *audioType* be the encoding of *resources*
5. Return *audioType*

### `get bitsPerSample`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *bitsPerSample* be the number of bits per sample of *resources*
5. Return *bitsPerSample*

### `get channels`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *channels* be the number of channels of *resources*
5. Return *channels*

### `get sampleRate`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *sampleRate* be the sample rate of *resources*
5. Return *sampleRate*

<a id="alg-audio-output-async"></a>

## Audio Output Class – asynchronous

### Notes

- The asynchronous version of the Audio Output Class extends the Audio Output Class in order to conform to the asynchronous version of the IO Class Pattern.
- The `onWritable` callback is never invoked.
- The *callback* of the `write` method is invoked when audio samples have been written.


<a id="alg-image-input"></a>

## Image Input Class

### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `imageType` | no | a [pixel format](#pixel-formats) or `"jpeg`" | (host defined) |
| `width` | no | positive integer | (host defined) |
| `height` | no | positive integer | (host defined) |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"buffer"` or `"buffer/disposable"` | `"buffer"` |

#### Notes

- The Image Input Class conforms to the IO Class Pattern for its `constructor` and `close` method. There is no `write` method.
- The `"resources"` internal field of an Image Input instance represents the hardware and software necessary to capture image frames on the device. Typically, an Image Input instance manages a queue of image frames.
- The `constructor` does not start capturing image frames. Use the `start` method.
- When an image frame is available to read, the `onReadable` callback is invoked.
- If the application provides a byte buffer to the `read` method, its byte length must be at least the byte length of a frame.

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | &nbsp; |
| `"buffer/disposable"` | [Image Input Buffer](#alg-image-input-buffer) | &nbsp; |

### `read`([*option*])
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *format* be **GetInternalField**(`this`, `"format"`)
5. If *format* is `"buffer/disposable"`
	1. If an image frame is available in *resources*
		1. Let *buffer* be **CreateImageInputBuffer**(*resources*)
		2. Return *buffer*
	2. Else
		1. Return `undefined`
6. Else
	1. Execute step 6 to 10 of the IO Class Pattern `read` method
	
### `start`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. If *resources* already started
	1. Return
5. Start capturing image frames with *resources*

### `stop`([*options*])
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *flush* be `false`
5. If *options* is provided
	1. 	If **HasProperty**(*options*, `"flush"`)
		1. Let *flush* be **GetProperty**(*options*, `"flush"`)
		2. Convert *flush* into an ECMAScript boolean
6. If *resources* capturing image frames
	1. Stop capturing image frames with *resources* 
7. If *flush*
	1. Flush unread image frames in *resources* 

### `get imageType`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *imageType* be the image type of *resources*
5. Return *imageType*

### `get width`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *width* be the image width of *resources*
5. Return *width*

### `get height`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null`
4. Let *height* be the image height of *resources*
5. Return *height*

<a id="alg-image-input-async"></a>

## Image Input Class – asynchronous

### Notes

- The asynchronous version of the Image Input Class extends the Image Input Class in order to conform to the asynchronous version of the IO Class Pattern.
- The `onReadable` callback is never invoked.
- The *callback* of the `read` method is invoked when a frame has been read.

### `read`(*option*[, *callback*])

1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *resources* is `null` or not readable
4. Let *format* be **GetInternalField**(`this`, `"format"`)
5. If *format* is `"buffer/disposable"`
	1. Throw if *callback* is not `undefined` and not **IsCallable**(*callback*)
	2. When an image frame is available in *resources*
		1. Queue a task that performs
			1. Let *buffer* be **CreateImageInputBuffer**(*resources*)
			2. **Call**(*callback*, `this`, `null`, *buffer*)
6. Else
	1. Execute step 4 to 8 of the IO Class Pattern – asynchronous `read` method

<a id="alg-image-input-buffer"></a>

## Image Input Buffer Prototype

### Notes

- The Image Input Buffer Prototype conforms to the [Disposable Buffer Pattern](#disposable-buffer). Its instances are byte buffers that reference image frames in the Image Input instance.
- It is the responsibility of the application to close Image Input Buffer instances as soon as possible to allow the Image Input instance to reuse the referenced image frames.

### **CreateImageInputBuffer**(*resources*)
1. Let *result* be a new byte buffer whose prototype is Image Input Buffer Prototype
2. Let *frame* be the current image frame of *resources*
3. Lock *frame* in *resources*
4. Attach *result* to *frame*
5. **SetInternalField**(`this`, `"resources"`, *resources*)
6. **SetInternalField**(`this`, `"frame"`, *frame*)

### `close`()
1. **CheckInternalFields**(`this`)
2. Let *resources* be **GetInternalField**(`this`, `"resources"`)
3. Let *frame* be **GetInternalField**(`this`, `"frame"`)
4. Detach `this` from *frame*
5. Unlock *frame* in *resources*

<a id="alg-io-provider-class-pattern"></a>

## IO Provider Class Pattern

### `constructor`(*options*)

1. Execute steps 1 to 7 of the Base Class Pattern `constructor`
2. Let *onReadable* be a function with the following steps:
	1. Let *data* be **Call**(**GetProperty**(`this`, `"read"`), `this`)
	2. Let *provider* be GetProperty(`this`, `"target"`)
	3. Dispatch *data* among IO objects of *provider*
3. Let *count* be the number of supported IO connection
4. Let *onWritable* be a function with the following steps:
	1. Let *count* be *count* - 1
	2. If *count* is 0
		1. Let *provider* be GetProperty(`this`, `"target"`)
		2. Configure *provider* with *params*
		3. Add supported IO constructors to *provider*
		4. **SetInternalField**(*provider*, `"status"`, `"ready"`)
		5. Let *callback* be **GetInternalField**(*provider*, `"onReady"`)
		6. If *callback* is not `null`
			1. **Call**(*callback*, *provider*)
5. Let *onError* be a function with the following steps:
	1. Let *provider* be GetProperty(`this`, `"target"`)
	2. Dispatch the error to open IO objects of *provider*
	3. **Call**(**GetProperty**(*provider*, `"close"`), *provider*)
	4. Let *callback* be **GetInternalField**(*provider*, `"onError"`)
	5. If *callback* is not `null`
		1. **Call**(*callback*, *provider*)
6. Try
	1. For each supported IO connection
		1. Let *name* be the name of the supported IO connection.
		2. Let *ioOptions* be **GetProperty**(*params*, *name*)
		3. Let *ioParams* be a copy of *ioOptions*
		4. Let *ioConstructor* be **GetProperty**(*ioParams*, `"io"`)
		5. **DefineProperty**(*ioParams*, `"onReadable"`, *onReadable*)
		6. **DefineProperty**(*ioParams*, `"onWritable"`, *onWritable*)
		7. **DefineProperty**(*ioParams*, `"onError"`, *onError*)
		8. **DefineProperty**(*ioParams*, `"target"`, `this`)
		9. Let *ioConnection* be **Construct**(*ioConstructor*, *ioParams*)
		10. **SetInternalField**(`this`, *name*, *ioConnection*)
7. Catch *exception*
	1. **Call**(**GetProperty**(`this`, `"close"`), `this`)
	2. Throw *exception*
8. Execute step 8 of the Base Class Pattern `constructor`

### `close`()

1. Execute all steps of the Peripheral Class Pattern `close` method

<a id="alg-flash-module-object"></a>

## Flash Module Object

### Notes

- The Flash module default export is an object with an `open` method that creates Flash Partition instances.

### `open`(*options*)
1. Let `this` be a new instance of the Flash Partition class
2. Execute all steps of the IO Class Pattern `constructor`
3. Return `this`

#### *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `name` | yes | string | N/A |
| `mode` | no | `"r"` or `"r+"` | `"r+"` |
| `format` | no | `"buffer"` | `"buffer"` |

#### Notes

- The `"resources"` internal field of a Flash Partition instance describes the access to a specific region of flash memory. The access is read-only if `mode` is `"r"`.

- For a Flash Partition instance, step 4 of the IO Class Pattern `constructor` opens the access to the flash partition specified by `name`.

### `[Symbol.iterator]`()
3. Let *constructor* be the Flash Partition Iterator Class
3. Let *iterator* be **Construct**(*constructor*)
4. Return *iterator*

<a id="alg-flash-partition-class-pattern"></a>

## Flash Partition Class Pattern

### `constructor`()
1. Throw

#### Notes

- Use the `open` method of the Flash Module Object to create Flash Partition instances.

### `close`()
1. Execute all steps of the IO Class Pattern `close` method

#### Notes

- For a Flash Partition instance, step 5 of the IO Class Pattern `close` method closes the access to the flash partition.

### `eraseBlock`(*from*[, *to*])
1. **CheckInternalFields**(`this`)
2. Let *partition* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *partition* is `null` or not writable
4. Let *blocks* be the number of blocks in *partition*
5. Convert *from* into an ECMAScript number
6. If *to* is absent
	1. Let *to* be *from* + 1
7. Else
	1. Convert *to* into an ECMAScript number
8. Throw if *from* < 0 or *from* >= *blocks*
9. Throw if *to* <= *from* or *to* > *blocks*
10. While *from* < *to*
	1. Erase block *from* in *partition*
	2. Let *from* be *from* + 1

### `read`(*count*, *offset*)
1. **CheckInternalFields**(`this`)
2. Let *partition* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *partition* is `null`
4. Convert *offset* into an ECMAScript number
5. Throw if *offset* is neither `0` nor a positive integer
6. Let *size* be number of bytes in *partition*
6. Let *available* be *size* - *offset*
5. Throw if *available* <= 0
7. If *count* is a number
	1. Throw if *count* is not a positive integer
	2. If *count* > *available*
		1. Let *count* be *available*
	3. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"ArrayBuffer"`), *count*)
	4. Let *pointer* be **GetBytePointer**(*result*)
8. Else
	1. Let *pointer* be **GetBytePointer**(*count*)
	2. Let *count* be **GetProperty**(*count*, `"byteLength"`)
	3. If *count* > *available*
		1. Let *count* be *available*
	4. Let *result* be *count*
10. Read *count* bytes into *pointer* from *partition* at *offset*
11. Return *result*

### `status`()
1. **CheckInternalFields**(`this`)
2. Let *partition* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *partition* is `null`
4. Let *size* be number of bytes in *partition*
5. Let *blocks* be number of blocks in *partition*
6. Let *blockLength* be number of bytes by block
7. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
8. **SetProperty**(*result*, `"size"`, *size*)
9. **SetProperty**(*result*, `"blocks"`, *blocks*)
10. **SetProperty**(*result*, `"blockLength"`, *blockLength*)
10. Return *result*

### `write`(*data*, *offset*)
1. **CheckInternalFields**(`this`)
2. Let *partition* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *partition* is `null` or not writable
4. Convert *offset* into an ECMAScript number
5. Throw if *offset* is neither `0` nor a positive integer
6. Let *pointer* be **GetBytePointer**(*data*)
7. Let *count* be **GetProperty**(*data*, `"byteLength"`)
8. Let *size* be number of bytes in *partition*
9. Let *available* be *size* - *offset*
10. Throw if *available* < count
11. Write *count* bytes from *pointer* into *partition* at *offset* 

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

<a id="alg-flash-partition-iterator-class"></a>

## Flash Partition Iterator Class

### `constructor`()
2. Let *list* be the result of opening the list of available partitions
1. **SetInternalField**(`this`, `"list"`, *list*)

### `next`()
1. Let *list* be **GetInternalField**(`this`, `"list"`)
2. If *list* is `null`
	1. Let *partition* be `null`
3. Else
	1. Let *partition* be the next partition in *list*
	2. If *partition* is `null`
		1. Close *list*
		2. **SetInternalField**(`this`, `"list"`, `null`)
	3. Else
		1. Let *name* be the name of *partition*
4. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
5. If *partition* is `null`
	1. **SetProperty**(*result*, `"done"`, `true`)
	2. **SetProperty**(*result*, `"value"`, `undefined`)
6. Else
	1. **SetProperty**(*result*, `"done"`, `false`)
	2. **SetProperty**(*result*, `"value"`, *name*)
7. Return *result*

### `return`()
1. Let *list* be **GetInternalField**(`this`, `"list"`)
2. If *list* is not `null`
	1. Close *list*
	2. **SetInternalField**(`this`, `"list"`, `null`)
3. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
4. **SetProperty**(*result*, `"done"`, `true`)
5. **SetProperty**(*result*, `"value"`, `undefined`)
6. Return *result*

### Notes

- The list order is system dependent.

<a id="alg-update-module-object"></a>

## Update Module Object

### Notes

- The Update module default export is an object with an `open` method that creates Update instances.

### `open`(*options*)
1. Let `this` be a new instance of the Update Class 
2. Execute steps 1 to 3 of the IO Class Pattern `constructor`
3. Try
	1. Let *partition* be **GetInternalField**(**GetProperty**(*params*, `"partition"`), `"resources"`)
	2. Throw if *partition* is `null` or not writable
	3. Let *mode* be **GetProperty**(*params*, `"mode'`)
	4. Let *size* be the size of *partition*
	5. Let *byteLength* be **GetProperty**(*params*, `"byteLength"`)
	6. If *byteLength* is not `undefined`
		1. Throw if *byteLength* > *size*
		2. Let *size* be *byteLength*
	7. Let *update* be a new over the air update process for *partition*
	8. Set the mode of *update* to *mode*
	9. Set the offset of *update* to `0`
	10. Set the size of *update* to *size*
	11. Begin *update* 
	12. **SetInternalField**(this, `"resources"`, *update*)
4. Execute steps 5 to 6 of the IO Class Pattern `constructor`
5. Return `this`

#### *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `partition` | yes | Flash Partition instance | N/A |
| `mode` | no | `"a"` or `"w"` | `"a"` |
| `byteLength` | no | positive integer or `undefined` | `undefined` |

#### Notes

- The `"resources"` internal field of an Update instance describes the over the air update process for a specific `partition`.

<a id="alg-update-class-pattern"></a>

## Update Class Pattern

### `constructor`()
1. Throw

#### Notes

- Use the `open` method of the Update Module Object to create Update instances.

### `close`()
1. Execute all steps of the IO Class Pattern `close` method

#### Notes

- For an Update instance, step 5 of the IO Class Pattern `close` method aborts the over the air update process if the `complete` method has not been called.

### `complete`()
1. **CheckInternalFields**(`this`)
2. Let *update* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *update* is `null`
4. End and activate *update*
5. Throw if former step failed

#### Notes

- Step 4 can fail if written data are invalid.

### `write`(*data*[, *offset*])
1. **CheckInternalFields**(`this`)
2. Let *update* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *update* is `null`
4. Let *pointer* be **GetBytePointer**(*data*)
5. Let *count* be **GetProperty**(*data*, `"byteLength"`)
6. Let *mode* be the mode of the *update*
7. If *mode* is `"a"`
	1. Throw if *offset* is present
	6. Let *offset* be the offset of the *update*
8. Else
	1. Throw if *offset* is absent
	2. Convert *offset* into an ECMAScript number
	3. Throw if *offset* is neither `0` nor a positive integer
9. Let *size* be the size of the *update*
10. Let *available* be *size* - *offset*
11. Throw if *available* < count
12. Write *count* bytes from *pointer* into *update* at *offset* 
13. Throw if former step failed
14. If *mode* is `"a"`
	1. Let the offset of the *update* be *offset* + *count*
	
#### Notes

- Step 12 can fail if written data are invalid.

### `read` / `write` *data*
		
| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | &nbsp; | byte buffer |

<a id="alg-key-value-object"></a>

## Key-Value Module Object

### Notes

- The Key-Value module default export is an object with an `open` method that creates Key-Value Domain instances.

### `open`(*options*)
1. Let `this` be a new instance of the Key-Value Domain class 
2. Execute all steps of the IO Class Pattern `constructor`
3. Return `this`

#### *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `path` | yes | string | N/A |
| `mode` | no | `"r"` or `"r+"` | `"r+"` |
| `format` | no | string | `"buffer"` |

#### Notes

- The `"resources"` internal field of a Key-Value Domain instance describes a specific part of the non-volatile storage used by the system to store key-value pairs.
- For a Key-Value Domain instance, step 4 of the IO Class Pattern `constructor` opens the storage.

<a id="alg-key-value-domain-class-pattern"></a>

## Key-Value Domain Class Pattern

### `constructor`()
1. Throw

#### Notes

- Use the `open` method of the Key-Value Module Object to create Key-Value instances.

### `close`()
1. Execute all steps of the IO Class Pattern `close` method

#### Notes

- For a Key-Value Domain instance, step 5 of the IO Class Pattern `close` method closes the storage.

### `delete`(*key*)
1. **CheckInternalFields**(`this`)
2. Let *storage* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *storage* is `null` or not writable
4. Convert *key* into an ECMAScript string
5. Let *pair* be the pair matching *key* in *storage*
6. If *pair* is `undefined`
	1. Return `false`
7. Remove *pair* from *storage*
8. Return `true`

### `read`(*key*[, *buffer*])
1. **CheckInternalFields**(`this`)
2. Let *storage* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *storage* is `null`
4. Convert *key* into an ECMAScript string
5. Let *pair* be the pair matching *key* in *storage*
6. If *pair* is `undefined`
	1. Return 
7. Let *value* be the value of *pair*
8. Let *format* be **GetInternalField**(`this`, `"format"`)
9. Throw if *value* format does not conform to *format*
10. If *format* is `"buffer"` and *buffer* is present
	1. Let *available* be the byte length of *value*
	2. Let *pointer* be **GetBytePointer**(*buffer*)
	3. Let *n* be **GetProperty**(*buffer*, `"byteLength"`)
	4. Throw if *available* > *n*
	5. Read *available* bytes from *value* into *pointer*
	6. Return *available*
11. Return *value*

### `write`(*key*, *value*)
1. **CheckInternalFields**(`this`)
2. Let *storage* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *storage* is `null` or not writable
4. Convert *key* into an ECMAScript string
5. Let *format* be **GetInternalField**(`this`, `"format"`)
6. Convert *value* into the ECMAScript value corresponding to *format*
7. Let *pair* be the pair matching *key* in *storage*
8. If *pair* is `undefined`
	1. Let *pair* be a new pair with *key* and *value*
	2. Insert *pair* into *storage*
9. Else
	1. Replace the value of *pair* with *value*
	
### `[Symbol.iterator]`()
1. Let *constructor* be the Key-Value Domain Iterator Class
2. Let *iterator* be **Construct**(*constructor*, `this`)
3. Return *iterator*
	
### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |
| `"string"` | string | string |
| `"uint8"` | number | number |
| `"int8"` | number | number |
| `"uint16"` | number | number |
| `"int16"` | number | number |
| `"uint32"` | number | number |
| `"int32"` | number | number |
| `"uint64"` | bigint | bigint |
| `"int64"` | bigint | bigint |

<a id="alg-key-value-domain-iterator-class"></a>

## Key-Value Domain Iterator Class

### `constructor`(*domain*)
1. Throw if *domain* is not a Key-Value Domain instance 
2. Let *storage* be **GetInternalField**(*domain*, `"resources"`)
3. Let *list* be the result of opening the list of pairs in *storage*
4. **SetInternalField**(`this`, `"list"`, *list*)

### `next`()
1. Let *list* be **GetInternalField**(`this`, `"list"`)
2. If *list* is `null`
	1. Let *pair* be `null`
3. Else
	1. Let *pair* be the next pair in *list*
	2. If *pair* is `null`
		1. Close *list*
		2. **SetInternalField**(`this`, `"list"`, `null`)
	3. Else
		1. Let *key* be the key of *pair*
4. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
5. If *pair* is `null`
	1. **SetProperty**(*result*, `"done"`, `true`)
	2. **SetProperty**(*result*, `"value"`, `undefined`)
6. Else
	1. **SetProperty**(*result*, `"done"`, `false`)
	2. **SetProperty**(*result*, `"value"`, *key*)
7. Return *result*

### `return`()
1. Let *list* be **GetInternalField**(`this`, `"list"`)
2. If *list* is not `null`
	1. Close *list*
	2. **SetInternalField**(`this`, `"list"`, `null`)
3. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
4. **SetProperty**(*result*, `"done"`, `true`)
5. **SetProperty**(*result*, `"value"`, `undefined`)
6. Return *result*

### Notes

- The list order is system dependent.

<a id="alg-file-class-pattern"></a>

## File Class Pattern

### Notes

- The `"resources"` internal field of a File instance describes a specific file in the file system. On POSIX, the internal field is a file descriptor.

### `constructor`()
1. Throw

#### Notes

- Use the `openFile` method of a Directory instance to create File instances.

### `close`()
1. Execute all steps of the IO Class Pattern `close` method

#### Notes

- On POSIX, step 5 of the IO Class Pattern `close` method closes the file descriptor.
- See [man close](https://linux.die.net/man/2/close)

### `flush`()
1. **CheckInternalFields**(`this`)
2. Let *fd* be **GetInternalField**(`this`, `"resources"`)
3. Flush file *fd*

#### Notes

- See [man fsync](https://linux.die.net/man/2/fsync)

### `read`(*count*, *offset*)
1. **CheckInternalFields**(`this`)
2. Let *fd* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *fd* is `null`
4. Convert *offset* into an ECMAScript number
5. Throw if *offset* is neither `0` nor a positive integer
6. If *count* is a number
	1. Throw if *count* is not a positive integer
	2. Let *option* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
	3. **SetProperty**(*option*, `"maxByteLength"`, *count*)
	4. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"ArrayBuffer"`), *count*, *option*)
	5. Let *pointer* be **GetBytePointer**(*result*)
	6. Read *count* bytes into *pointer* from *fd* at *offset*
	7. Let *count* be the number of bytes read by the former step
	8. **Call**(**GetProperty**(*result*, `"resize"`), *result*, *count*)
7. Else
	1. Let *pointer* be **GetBytePointer**(*count*)
	2. Let *count* be **GetProperty**(*count*, `"byteLength"`)
	3. Read *count* bytes into *pointer* from *fd* at *offset*
	4. Let *result* be the number of bytes read by the former step
8. Return *result*

#### Notes

- See [man pread](https://linux.die.net/man/2/pread)

### `setSize`(size)
1. **CheckInternalFields**(`this`)
4. Let *fd* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *fd* is `null` or not writable
4. Convert *size* into an ECMAScript number
5. Throw if *size* is not a positive integer
6. Set the size of *fd* to *size*

#### Notes

- See [man ftruncate](https://linux.die.net/man/2/ftruncate)

### `status`()
1. **CheckInternalFields**(`this`)
2. Let *fd* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *fd* is `null`
4. Let *status* be the status of *fd*
5. Let *size* be *status* size
6. Let *mode* be *status* mode
7. Let *isFile* be a function that returns true
8. Let *isDirectory* be a function that returns false
9. Let *isSymbolicLink* be a function that returns false link
10. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
11. **SetProperty**(*result*, `"size"`, *size*)
12. **SetProperty**(*result*, `"mode"`, *mode*)
13. **SetProperty**(*result*, `"isFile"`, *isFile*)
14. **SetProperty**(*result*, `"isDirectory"`, *isDirectory*)
15. **SetProperty**(*result*, `"isSymbolicLink"`, *isSymbolicLink*)
16. Return *result*

#### Notes

- See [man fstat](https://linux.die.net/man/2/fstat)

### `write`(*buffer*, *offset*)
1. **CheckInternalFields**(`this`)
2. Let *fd* be **GetInternalField**(`this`, `"resources"`)
3. Throw if *fd* is `null` or not writable
4. Convert *offset* into an ECMAScript number
5. Throw if *offset* is neither `0` nor a positive integer
6. Let *pointer* be **GetBytePointer**(*buffer*)
7. Let *count* be **GetProperty**(*buffer*, `"byteLength"`)
8. Write *count* bytes from *pointer* into *fd* at *offset* 

#### Notes

- See [man pwrite](https://linux.die.net/man/2/pwrite)

### `read` / `write` *data*

| Format | Read | Write |
| :--- | :--- | :--- |
| `"buffer"` | ArrayBuffer | byte buffer |

<a id="alg-directory-class-pattern"></a>

## Directory Class Pattern

### Notes

- The `"resources"` internal field of a Directory instance describes a specific directory in the file system. On POSIX, the internal field is a file descriptor.

- All directory and file entries are specified by a path relative to the specific directory described by the Directory instance resources.

- Paths are strings. The path separator is `"/"`. **CheckPath** enforces paths to be beneath the specific directory described by the Directory instance resources.

### **CheckPath**(*path*)
1. Convert *path* into an ECMAScript string
2. Throw if *path* is `"."` or `".."`
3. Throw if *path* starts with `"/"`, `"./"`, or `"../"`
4. Throw if *path* contains `"//"`, `"/./"`, or `"/../"`
5. Return *path*

### `constructor`()
1. Throw

#### Notes

- Use the `openDirectory` method of a Directory instance to create Directory instances.

### `close`()
1. Execute all steps of the IO Class Pattern `close` method

#### Notes

- On POSIX, step 5 of the IO Class Pattern `close` method closes the file descriptor.
- See [man close](https://linux.die.net/man/2/close)

### `createDirectory`(*path*)
1. **CheckInternalFields**(`this`)
2. Let *path* be **CheckPath**(*path*)
3. Let *fd* be **GetInternalField**(`this`, `"resources"`)
4. If the entry specified by *path* relative to *fd* exists
	1. Return `false`
5. Create a directory specified by *path* relative to *fd* 
6. Return `true`

#### Notes

- See [man mkdirat](https://linux.die.net/man/2/mkdirat)

### `createLink`(*path*, *target*)
1. **CheckInternalFields**(`this`)
2. Let *path* be **CheckPath**(*path*)
3. Let *target* be **CheckPath**(*target*)
4. Let *fd* be **GetInternalField**(`this`, `"resources"`)
5. Create a symbolic link specified by *path* to the entry specified by *target* relative to *fd* 

#### Notes

- See [man symlinkat](https://linux.die.net/man/2/symlinkat)

### `delete`(*path*)
1. **CheckInternalFields**(`this`)
2. Let *path* be **CheckPath**(*path*)
3. Let *fd* be **GetInternalField**(`this`, `"resources"`)
4. If the entry specified by *path* relative to *fd* does not exist
	1. Return `false`
5. Remove the entry specified by *path* relative to *fd*
6. Return `true`

#### Notes

- See [man unlinkat](https://linux.die.net/man/2/unlinkat)

### `move`(*fromPath*, *toPath*[, *directory*])
1. **CheckInternalFields**(`this`)
2. Let *fromPath* be **CheckPath**(*fromPath*)
3. Let *toPath* be **CheckPath**(*toPath*)
4. Let *fd* be **GetInternalField**(`this`, `"resources"`)
5. If *directory* is absent
	1. Let *fd2* be *fd*
6. Else
	1. Throw if *directory* is not a Directory instance
	2. Let *fd2* be **GetInternalField**(*directory*, `"resources"`)
7. Rename the entry specified by *fromPath* relative to *fd* into the entry specified by *toPath* relative to *fd2* 

#### Notes

- See [man renameat](https://linux.die.net/man/2/renameat)

### `openDirectory`(*options*)
1. **CheckInternalFields**(`this`)
2. Throw if *options* is not an object
3. Let *path* be **GetProperty**(*options*, `"path"`)
4. Let *path* be **CheckPath**(*path*)
5. Let *fd* be **GetInternalField**(`this`, `"resources"`)
6. Let *fd2* be the result of opening the directory specified by *path* relative to *fd*
7. Let *result* be a new Directory instance 
8. **SetInternalField**(`this`, `"resources"`, *fd2*)
9. Return *result*

#### Notes

- Step 6 must throw if the entry does not exist, or if the entry exists but is not a directory.
- See [man openat2](https://man7.org/linux/man-pages/man2/openat2.2.html)

### `openFile`(*options*)
1. **CheckInternalFields**(`this`)
2. Throw if *options* is not an object
3. Let *path* be **GetProperty**(*options*, `"path"`)
4. Let *path* be **CheckPath**(*path*)
5. Let *mode* be **GetProperty**(*options*, `"mode"`)
6. Convert *mode* into an ECMAScript string
7. Throw if *mode* is neither `"r"`, nor `"r+"`, nor `"w"`, nor `"w+"`
8. Let *fd* be **GetInternalField**(`this`, `"resources"`)
9. Let *fd2* be the result of opening the file specified by *path* relative to *fd* with *mode*
10. Let *result* be a new File instance 
11. **SetInternalField**(`this`, `"resources"`, *fd2*)
12. Return *result*

#### Notes

- Step 9 must throw if the entry does not exist and *mode* is neither `"w"` nor `"w+"`, or if the entry exists but is not a file.
- See [man openat](https://linux.die.net/man/2/openat)

### `readLink`(*path*)
1. **CheckInternalFields**(`this`)
2. Let *path* be **CheckPath**(*path*)
3. Let *fd* be **GetInternalField**(`this`, `"resources"`)
4. Let *result* be the target of the symbolic link specified by *path* relative to *fd* 
5. Return *result*

#### Notes

- See [man readlinkat](https://linux.die.net/man/2/readlinkat)

### `scan`([*path*])
1. **CheckInternalFields**(`this`)
2. Let *constructor* be the Directory Iterator Class
3. If *path* is present
	1. Let *iterator* be **Construct**(*constructor*, `this`, path)
4. Else
	1. Let *iterator* be **Construct**(*constructor*, `this`)
5. Return *iterator*

### `status`(*path*)
1. **CheckInternalFields**(`this`)
2. Let *path* be **CheckPath**(*path*)
3. Let *fd* be **GetInternalField**(`this`, `"resources"`)
4. Let *status* be the status of the entry specified by *path* relative to *fd*
5. Let *size* be *status* size
6. Let *mode* be *status* mode
7. Let *isFile* be a function that returns true if *mode* is a file 
8. Let *isDirectory* be a function that returns true if *mode* is a directory
9. Let *isSymbolicLink* be a function that returns true if *mode* is a symbolic link
10. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
11. **SetProperty**(*result*, `"size"`, *size*)
12. **SetProperty**(*result*, `"mode"`, *mode*)
13. **SetProperty**(*result*, `"isFile"`, *isFile*)
14. **SetProperty**(*result*, `"isDirectory"`, *isDirectory*)
15. **SetProperty**(*result*, `"isSymbolicLink"`, *isSymbolicLink*)
16. Return *result*

#### Notes

- See [man fstatat](https://linux.die.net/man/2/fstatat)

### `[Symbol.iterator]`()
1. Return **Call**(**GetProperty**(`this`, `"scan"`), `this`)

<a id="alg-directory-iterator-class"></a>

## Directory Iterator Class

### `constructor`(*directory*[, *path*])
1. Throw if *directory* is not a Directory instance
2. Let *fd* be **GetInternalField**(`directory`, `"resources"`)
3. If *path* is present
	1. Let *path* be **CheckPath**(*path*)
	2. Let *fd2* be the result of opening the directory specified by *path* relative to *fd*
4. Else
	1. Let *fd2* be the result of duplicating *fd*
5. Let *stream* be the result of opening a directory stream corresponding to *fd2*
6. **SetInternalField**(`this`, `"stream"`, *stream*)

#### Notes

- See [man dup](https://linux.die.net/man/2/dup2) and [man fdopendir](https://linux.die.net/man/3/fdopendir)

### `next`()
1. Let *stream* be **GetInternalField**(`this`, `"stream"`)
2. If *stream* is `null`
	1. Let *entry* be `null`
3. Else
	1. Let *entry* be the next directory entry in *stream*
	2. If *entry* is `null`
		1. Close *stream*
		2. **SetInternalField**(`this`, `"stream"`, `null`)
	3. Else
		1. Let *name* be the name of *entry*
		2. If *name* is `"."` or `".."` go to step 3.1
4. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
5. If *entry* is `null`
	1. **SetProperty**(*result*, `"done"`, `true`)
	2. **SetProperty**(*result*, `"value"`, `undefined`)
6. Else
	1. **SetProperty**(*result*, `"done"`, `false`)
	2. **SetProperty**(*result*, `"value"`, *name*)
7. Return *result*

#### Notes

- See [man readdir](https://linux.die.net/man/3/readdir)

### `return`()
1. Let *stream* be **GetInternalField**(`this`, `"stream"`)
2. If *stream* is not `null`
	1. Close *stream*
	2. **SetInternalField**(`this`, `"stream"`, `null`)
3. Let *result* be **Construct**(**GetProperty**(`globalThis`, `"Object"`))
4. **SetProperty**(*result*, `"done"`, `true`)
5. **SetProperty**(*result*, `"value"`, `undefined`)
6. Return *result*

#### Notes

- Closing the iterator stream must also close the resources used to open the iterator stream. 
- See [man closedir](https://linux.die.net/man/3/closedir)

<a id="alg-home-directory-object"></a>

## Home Directory Object

### Notes

- The File module default export is a Directory instance, which is used to access file and directory entries in the file system. 

- On POSIX, it is typically the `$HOME` directory. 

