# This document has been merged into the main specification. It will be removed soon.

## Algorithms for TC53
Updated January 16, 2020

### Notes
- This document defines formal algorithms for the [draft](./tc53.md) of the TC53 specification
- This document describes some, but not all, of the APIs (additional APIs will be added)
- The intent is to merge these algorithms into the specification
- The style of these algorithms is inspired by ECMA-262, but does not try to follow it

### Internal Fields

Internal fields are implementation dependent and never accessible outside the implementation. For instance they can be C structure fields, JavaScript private fields, or a combination of both. 

Every object conforming to a Class Pattern is expected to have one or several internal fields. This document uses the following operators on internal fields.

#### **CheckInternalFields**(*object*)

1. For each internal field of the class being defined
	1. Let *name* be the name of the internal field
	2. Throw if *object* has no internal field named *name*

**CheckInternalFields** throws if an internal field is absent. That can be implicit when internal fields are JavaScript private fields, or can be explicit when internal fields are C structure fields. The purpose of **CheckInternalFields** is to ensure that *object* is an instance of the class being defined.

#### **ClearInternalFields**(*object*)

1. For each internal field of the class being defined
	1. Let *name* be the name of the internal field
	2. Clear the internal field named *name* of *object*

**ClearInternalFields** zeroes all internal fields. That can be storing `null` in JavaScript private fields, or can be storing NULL in C structure fields. The purpose of **ClearInternalFields** is to ensure that *object* is in a consistent state when constructed and closed.

#### **GetInternalField**(*object*, *name*)
1. Return the value stored in the internal field named *name* of *object*

**GetInternalField** is trivial for JavaScript private fields, but can involve value conversion for C structure field like converting C `NULL` into JavaScript `null`.

#### **SetInternalField**(*object*, *name*, *value*)
1. Store *value* in the internal field named *name* of *object*

**SetInternalField** is trivial for JavaScript private fields, but can involve value conversion for C structure field like converting JavaScript `null` into C `NULL`.

### Ranges

#### Booleans

For boolean ranges, the value is converted into a JavaScript boolean.

#### Numbers

For number ranges, the value is converted into a JavaScript number, then the value is checked to be in range. The special value `NaN` is never in range.

For integer ranges, the value is converted into a JavaScript number, then the value is checked to be an integer, then the value is checked to be in range.

| Range | From | To |
| :--- | ---: | ---: |
| number | `-Infinity` | `Infinity` |
| negative number | `-Infinity` | `0` |
| positive number | `0`| `Infinity` |
| integer | `Number.MIN_SAFE_INTEGER` | `Number.MAX_SAFE_INTEGER` |
| negative integer | `Number.MIN_SAFE_INTEGER` | `0` |
| positive integer | `0` | `Number.MAX_SAFE_INTEGER` |
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

#### Strings 

For string ranges like `"buffer"`,  the value is converted into a JavaScript string, then checked to be strictly equal to one of the specified values.

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

- Supported options, with their names, default values and valid ranges, are defined by a separate table for every class conforming to the Base Class Pattern.

- The *params* object is unobservable. Its purpose in the algorithm is to ensure that properties of the *options* object are only accessed once and that the *options* object can be frozen. Local variables can be used instead, for instance:

		let pin = 2;
		if (options !== undefined) {
			if ("pin" in options)) {
				pin = options.pin;
				if ((pin < 0) || (3 < pin))
					throw new RangeError(`invalid pin ${pin}`);  
			}
		}

- Most classes conforming to the Base Class Pattern are expected to support one or several callbacks. Callbacks are supported options: their default value is `null`, their valid range is `null` or a JavaScript function. Callbacks are stored in internal fields and are always called with `this` set to the constructed object.

- There is only one option that is always supported: its name is `"target"`, its default value is `undefined` and its range is any JavaScript value.

### `close`()

1. **CheckInternalFields**(`this`)
2. Mark `this` as eligible for garbage collection
3. Cancel any pending callbacks for `this`
4. **ClearInternalFields**(`this`)

## IO Class Pattern

### `constructor`(*options*)

1. Execute steps 1 to 7 of the Base Class Pattern constructor
2.	Let *value* be **GetProperty**(*params*, `"format"`)
3. **SetInternalField**(`this`, `"format"`, *value*)
4. Try
	1. Let *resources* be the hardware resources specified by *params*
	2. Throw if *resources* are unavailable
	3. Allocate and configure *resources*
	4. Throw if allocation or configuration failed
	5. **SetInternalField**(this, `"resources"`, *resources*)
5. Catch *exception*
	1. **Call**(`this`, **GetProperty**(`this`, "close"`));
	2. Throw *exception*
6. Execute step 8 of the Base Class Pattern constructor

### `close`()

1. Execute step 1 of the Base Class Pattern `close` method
2. Let *resources* be **GetInternalField**(`this`, `"resources"`);
3. Return if *resources* is null
4. Execute steps 2 and 3 of the Base Class Pattern `close` method
5. Free *resources*
6. Execute step 4 of the Base Class Pattern `close` method

### `read`([*params*])

1. **CheckInternalFields**(`this`);
2. Let *resources* be **GetInternalField**(`this`, `"resources"`);
3. Throw if *resources* is null
4. Throw if *params* are absent but required, or present but not in the valid range  
5. Let *data* be undefined
6. If *resources* are readable
	1. Read from *resources* into *data*
	2. Format *data* according to **GetInternalField**(`this`, `”format”`)
7. Return *data*.

### `write`(*data*[,*params*])

1. **CheckInternalFields**(`this`);
2. Let *resources* be **GetInternalField**(`this`, `"resources"`);
3. Throw if *resources* is null
4. Throw if *data* are absent or not formatted according to **GetInternalField**(`this`, `”format”`)
5. Throw if *params* are absent but required, or present but not in the valid range  
6. Throw if *resources* are not writable
7. Write from *data* into *resources*

### `set format`(*value*)

1. **CheckInternalFields**(`this`);
2. Throw if *value* is not in the valid range of `"format"`
3. **SetInternalField**(`this`, `"format"`, *value*)

### `get format`()

1. **CheckInternalFields**(`this`);
2. Return **GetInternalField**(`this`, `"format"`)

#### Notes

- Hardware resources can require one or several internal fields which should be all cleared and checked. The `"resources"`  internal field is only a convention in this document.
- For every available `format`, the ranges of `read` and `write` *data* are defined  by a separate table for every class conforming to the IO Class Pattern.
- The order, requirements and ranges of `read` and `write` *params* are defined by a separate table for every class conforming to the IO Class Pattern.

## IO Classes

### Digital

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | pin specifier |
| `mode` | yes | `Digital.Input`, `Digital.InputPullUp`, `Digital.InputPullDown`, `Digital.InputPullUpDown`, `Digital.Output`, or `Digital.OutputOpenDrain`.  |
| `edge` | no* | `Digital.Rising`, `Digital.Falling`, and `Digital.Rising | Digital.Falling`  |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

* If the `onReadable` option is not `null`, `edge` is required to have a non-zero value.

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | `0` or `1` | `0` or `1` |

#### `read` *params*

None

#### `write` *params*

None

### Digital bank

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pins` | yes | 32-bit unsigned integer |
| `mode` | yes | `Digital.Input`, `Digital.InputPullUp`, `Digital.InputPullDown`, `Digital.InputPullUpDown`, `Digital.Output`, or `Digital.OutputOpenDrain`. |
| `rises` | no* | 32-bit unsigned integer | 0
| `falls` | no* | 32-bit unsigned integer | 0
| `bank` | no | number or string |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

* Both `rises` and `falls` cannot be `0`; at least one pin must be selected.

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | 32-bit unsigned integer | 32-bit unsigned integer |

#### `read` *params*

None

#### `write` *params*

None

### Analog input

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | pin specifier |
| `resolution` | no | positive number | host dependent
| `format` | no | `"number"` | `"number"` |

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | all | none |

#### `read` *params*

None

#### `write` *params*

None

### Pulse-width modulation

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | pin specifier |
| `hz` | no | positive number | host dependent
| `format` | no | `"number"` | `"number"` |

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | positive integers | none |

#### `read` *params*

None

#### `write` *params*

None

### I²C

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `data` | yes | pin specifier |
| `clock` | yes | pin specifier |
| `hz` | yes | positive integer |
| `address` | yes | 8-bit unsigned integer from 0 to 127 |
| `port` | no | port specifier | host dependent
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"buffer"` | `"buffer"` |

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"buffer"` | any | any |

#### `read` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `count` | yes | positive integer |
| `stop` | no | `true` or `false` | `true`
| `buffer` | no | `ArrayBuffer` with a `byteLength` of at least `count` | N/A

The `read` method supports the following alternate parameter list:

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `count` | yes | positive integer |
| `buffer` | no | `ArrayBuffer` with a `byteLength` of at least `count` | N/A

#### `write` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `buffer` | yes | `ArrayBuffer` |
| `stop` | no | `true` or `false` | `true`

### System management bus (SMBus)

#### constructor *options*

All properties from I²C plus the following:

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `stop` | no | `true` or `false` | `false`

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"buffer"` | any | any |

#### `read` *params*

Same as I²C.

#### `write` *params*

Same as I²C.

#### `readUint8` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer |

####  `writeUint8` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer |
| `value` | yes | 8-bit unsigned integer |

#### `readUint16` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer |
| `bigEndian` | no | `true` or `false` | `false`

#### `writeUint16` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer |
| `value` | yes | 16-bit unsigned integer |

#### `readBuffer` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer |
| `buffer` | yes | `ArrayBuffer` |

#### `writeBuffer` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `register` | yes | integer |
| `buffer` | yes | `ArrayBuffer` |

### Serial

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `receive` | no* | pin specifier |
| `transmit` | no* | pin specifier |
| `baud` | yes | positive integer |
| `flowControl` | no | `"hardware"` and `"none"` | `"none"`
| `dataTerminalReady` | no | pin specifier |
| `requestToSend` | no | pin specifier |
| `clearToSend` | no | pin specifier |
| `dataSetReady` | no | pin specifier |
| `port` | no | port specifier |
| `onReadable` | no | `null` or `Function` | `null`|
| `onWritable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

* A host may require the `receive` and/or `transmit` properties.

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | 8-bit unsigned integer | 8-bit unsigned integer |
| `"buffer"` | ArrayBuffer | ArrayBuffer, TypedArray |

#### `read` *params*

If format is "buffer":

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `count` | no | positive integer | number of bytes available to read

If format is "number":

> None

#### `write` *params*

If format is "buffer":

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `data` | yes | ArrayBuffer, TypedArray |

If format is "number":

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `data` | yes | 8-bit unsigned integer |

<!-- to do flush, set, get -->

### Serial Peripheral Interface (SPI)

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `out` | no* | pin specifier |
| `in` | no* | pin specifier |
| `clock` | yes | pin specifier |
| `select` | no* | pin specifier |
| `active` | no | 0 or 1 | 0
| `hz` | yes | positive integer |
| `mode` | no | 0, 1, 2, or 3 | 0
| `port` | no | port specifier |
| `format` | no | `"ArrayBuffer"` | `"ArrayBuffer"` |

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"buffer"` | ArrayBuffer | ArrayBuffer |

#### `read` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `buffer` | yes | ArrayBuffer |

#### `write` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `buffer` | yes | ArrayBuffer |

<!-- to do transfer, flush -->

### Pulse count

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `signal` | yes | pin specifier |
| `control` | yes | pin specifier |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | none | integer |

#### `read` *params*

None

#### `write` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `count` | yes | integer |

### TCP socket

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `address` | yes* | string |
| `host` | yes* | string |
| `port` | yes | 16-bit unsigned integer |
| `noDelay` | no | `true` or `false` | `false`
| `keepAlive` | no | positive integer | N/A
| `from` | no | instance of TCP Socket | N/A
| `onError` | no | `null` or `Function` | `null`
| `onWritable` | no | `null` or `Function` | `null`
| `onReadable` | no | `null` or `Function` | `null`
| `format` | no | `"number"` or `"buffer"` | `"buffer"`

* Either the `address` or `host` must be present, but not both.

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"buffer"` | ArrayBuffer | ArrayBuffer, TypedArray |
| `"number"` | 8-bit unsigned integer | 8-bit unsigned integer |

#### `read` *params*

If format is `"buffer"`:

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `count` | no | positive integer | number of bytes available to read

If format is `"number"`:

> None

#### `write` *params*

When format is `"buffer"`:

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `buffer` | yes | ArrayBuffer, TypeArray |

When format is `"number"`:

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `byte` | yes |  8-bit unsigned integer |

### TCP listener socket

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `port` | yes | 16-bit unsigned integer |
| `address` | no | string | N/A
| `onError` | no | `null` or `Function` | `null`
| `onReadable` | no | `null` or `Function` | `null`
| `format` | no | `"socket/tcp"` | `"socket/tcp"`

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"socket/tcp"` | instance of TCP Socket |  |

#### `read` *params*

None

#### `write` *params*

None

### UDP socket

#### constructor *options*

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `address` | no | string | N/A
| `port` | no | 16-bit signed integer | N/A
| `multicast` | no | string | N/A
| `timeToLive` | yes, if multicast used | integer from 1 to  255 | N/A
| `onError` | no | `null` or `Function` | `null`
| `onWritable` | no | `null` or `Function` | `null`
| `format` | no | `"buffer"` | `"buffer"`

* Either the `address` or `host` must be present, but not both.

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"buffer"` | ArrayBuffer | ArrayBuffer, TypedArray |

#### `read` *params*

None

#### `write` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `address` | yes | string |
| `port` | yes | 16-bit unsigned integer |
| `buffer` | yes | ArrayBuffer, TypeArray |

## Peripheral Class Pattern

### `constructor`(*options*)

1. Execute steps 1 to 7 of the Base Class Pattern constructor
2. Try
	1. For each supported IO connection
		1. Let *name* be the name of the supported IO connection.
		2. Let *ioOptions* be **GetProperty**(*params*, *name*)
		3. Let *ioConstructor* be **GetProperty**(*ioOptions*, `"io"`)
		4. Let *ioConnection* be **Construct**(*ioConstructor*, *ioOptions*)
		5. **SetInternalField**(`this`, *name*, *ioConnection*);
	2. Configure the peripheral with *params*
	3. Throw if the communication with the peripheral is not operational
	4. Activate the peripheral
	5. **SetInternalField**(`this`, `"status"`, `"ready"`);
3. Catch *exception*
	1. **Call**(`this`, **GetProperty**(`this`, "close"`));
	2. Throw *exception*
4. Execute step 8 of the Base Class Pattern constructor

### `close`()

1. Execute step 1 of the Base Class Pattern `close` method
2. Let *status* be **GetInternalField**(`this`, `"status"`);
3. Return if *status* is null
4. Execute steps 2 and 3 of the Base Class Pattern `close` method
5. Deactivate the peripheral
6. For each supported IO connection
	1. Let *name* be the name of the supported IO connection.
	2. Let *ioConnection* be **GetInternalField**(`this`, *name*);
	3. If *ioConnection* is not `null`
		1. **Call**(*ioConnection*, `"close"`);
7. Execute step 4 of the Base Class Pattern `close` method

### `configure`(*options*)

1. **CheckInternalFields**(`this`);
2. Let *status* be **GetInternalField**(`this`, `"status"`);
3. Throw if *status* is null
4. Throw if *options* is undefined or null
5. For each supported option
	1. Let *name* be the name of the supported option
	2. If **HasProperty**(*options*, *name*)
		1. Let *value* be **GetProperty**(*options*, *name*)
		2. Throw if *value* is not in the valid range of the supported option
6. Configure the peripheral with *options*

#### Notes

- Supported IO connections are supported options. Their value must be an object with an `io` property, which is the class of the IO connection. 

## Sensor Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Peripheral Class Pattern constructor

### `close`()

1. Execute all steps of the Peripheral Class Pattern `close` method

### `configure`(*options*)

1. Execute all steps of the Peripheral Class Pattern `configure` method

### `sample`([*params*])

1. **CheckInternalFields**(`this`);
2. Let *status* be **GetInternalField**(`this`, `"status"`);
3. Throw if *status* is null
4. Throw if *params* are absent but required, or present but not in the valid range  
5. If the peripheral is readable
	1. Let *result* be an empty object
	2. For each sample property
		1. Let *name* be the name of the sample property
		2. Let *value* be undefined
		3. Read from the peripheral into *value*
		4. **DefineProperty**(*result*, *name*, *value*);
6. Else
	1. Let *result* be undefined
7. Return *result*.

#### Notes

- The order, requirements and ranges of `sample` *params* are defined by a separate table for every class conforming to the Sensor Class Pattern.
- The requirements and ranges of properties in `sample` *result* are defined by a separate table for every class conforming to the Sensor Class Pattern. 

## Sensor Classes

### Accelerometer

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `x` | yes | number | acceleration along the x axis in meters per second squared |
| `y` | yes | number | acceleration along the y axis in meters per second squared |
| `z` | yes | number | acceleration along the z axis in meters per second squared |

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `illuminance` | yes | positive number | ambient light level in lux |

### Atmospheric pressure

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `pressure` | yes | number | atmospheric pressure in Pascal |

### Humidity

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `humidity` | yes | positive number from 0 to 1 | relative humidity as a percentage |

### Proximity

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `near` | yes | boolean | indicator of a detected proximate object |
| `distance` | yes | positive number or `null` | distance to the nearest sensed object in centimeters or `null` if no object is detected |
| `max` | yes | positive number | maximum sensing range of the sensor in centimeters |

### Temperature

#### `sample` *params*:

None

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| `temperature` | yes | number | temperature in degrees Celsius |

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

## Display Class Pattern

### `constructor`(*options*)

1. Execute all steps of the Peripheral Class Pattern constructor

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
1. Throw if *status* is null
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
1. Throw if the area defined by *x*, *y*, *width* and *height* is invalid.
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

#### Notes
- **GetBytePointer**(*buffer*) is a host specific operator that returns a pointer to the data contained in an `ArrayBuffer`, `SharedArrayBuffer` or `TypedArray` instance. The operator throws if *buffer* is no instance of `ArrayBuffer`, `SharedArrayBuffer` or `TypedArray`, or if *buffer* is detached. For a `TypedArray` instance, the pointer takes the view byte offset into account.  
- When the frame buffer is rotated 90 or 270 degrees, `get width` returns the height of the frame buffer in pixels and `get height` returns the width of the frame buffer in pixels.

#### constructor *options*:

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| format | no | see text | |
| rotation | no | 0, 90, 180, or 270 | |
| brightness | no | 0.0 to 1.0 | |
| flip | no | "", "h", "v", or "hv" | |

## Provenance Sensor Class Pattern

<!-- to do -->

## IO Provider Class Pattern

### `constructor`(*options*)

1. Execute steps 1 to 7 of the Base Class Pattern constructor
2. Let *onReadable* be a function with the following steps:
	1. Let *data* be **Call**(`this`, **GetProperty**(`this`, "read"`));
	2. Let *provider* be GetProperty(`this`, `"target"`);
	3.  Dispatch *data* among IO objects of *provider* 
3. Let *count* be the number of supported IO connection
4. Let *onWritable* be a function with the following steps:
	1. Let *count* be *count* - 1
	2. If *count* is 0
		1. Let *provider* be GetProperty(`this`, `"target"`);
		2. Configure *provider* with *params*
		3. Add supported IO constructors to *provider*
		4. **SetInternalField**(*provider*, `"status"`, `"ready"`);
		5. Let *callback* be **GetInternalField**(*provider*, `"onReady"`);
		6. If *callback* is not null
			1. **Call**(*provider*, *callback*);
5. Let *onError* be a function with the following steps:
	1. Let *provider* be GetProperty(`this`, `"target"`);
	2. Dispatch the error to open IO objects of *provider* 
	3. **Call**(*provider* , **GetProperty**(*provider*, "close"`));
	4. Let *callback* be **GetInternalField**(*provider* , `"onError"`);
	5. If *callback* is not null
		1. **Call**(*provider*, *callback*);
6. Try
	1. For each supported IO connection
		1. Let *name* be the name of the supported IO connection.
		2. Let *ioOptions* be **GetProperty**(*params*, *name*)
		3. Let *ioParams* be a copy of *ioOptions*
		4. Let *ioConstructor* be **GetProperty**(*ioParams*, `"io"`)
		5. **DefineProperty**(*ioParams*, `"onReadable"`, *onReadable*);
		6. **DefineProperty**(*ioParams*, `"onWritable"`, *onWritable*);
		7. **DefineProperty**(*ioParams*, `"onError"`, *onError*);
		8. **DefineProperty**(*ioParams*, `"target"`, `this`);
		9. Let *ioConnection* be **Construct**(*ioConstructor*, *ioParams*)
		10. **SetInternalField**(`this`, *name*, *ioConnection*);
7. Catch *exception*
	1. **Call**(`this`, **GetProperty**(`this`, "close"`));
	2. Throw *exception*
8. Execute step 8 of the Base Class Pattern constructor

### `close`()

1. Execute all steps of the Peripheral Class Pattern `close` method

