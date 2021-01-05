## Algorithms for TC53
Updated November 20, 2020

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


## Base Class Pattern

### `constructor`(*options*)

1. **ClearInternalFields**(`this`)
2. Throw if *options* is `undefined` or `null`
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

#### constructor *options*:

| Property | Required | Range | Default |
| :--- | :---: | :--- | :--- |
| `pin` | yes | Host dependent pin specifier |
| `mode` | yes| `Digital.Input`, `Digital.InputPullUp`, `Digital.InputPullDown`, `Digital.InputPullUpDown`, `Digital.Output`, or `Digital.OutputOpenDrain`.  |
| `edge` | no* | `Digital.Rising`, `Digital.Falling`, and `Digital.Rising | Digital.Falling` | ??? |
| `onReadable` | no | `null` or `Function` | `null`|
| `format` | no | `"number"` | `"number"` |

* If the `onReadable` option is not `null`, `edge` is required to have a non-zero value.

#### *data*

| Format | Read | Write | 
| :--- | :--- | :--- | 
| `"number"` | `0` or `1` | `0` or `1` |
#### `read` *params*

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |

#### `write` *params*:

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |

### Digital bank

<!-- to do -->

### Analog input

<!-- to do -->

### Pulse-width modulation

<!-- to do -->

### I²C

<!-- to do -->

### System management bus (SMBus)

<!-- to do -->

### Serial

<!-- to do -->

### Serial Peripheral Interface (SPI)

<!-- to do -->

### Pulse count

<!-- to do -->

### TCP socket

<!-- to do -->

### TCP listener socket

<!-- to do -->

### UDP socket

<!-- to do -->

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

| Param | Required | Range | Default |
| :--- | :---: | :--- | :--- |x

#### `sample` *result*:

| Property | Required | Range | Description
| :---: | :---: | :--- | :--- |
| x | Yes | Number | acceleration along the x axis in meters per second squared |
| y | Yes | Number | acceleration along the y axis in meters per second squared |
| z | Yes | Number | acceleration along the z axis in meters per second squared |

### Ambient light

<!-- to do -->

### Atmospheric pressure

<!-- to do -->

### Humidity

<!-- to do -->

### Proximity

<!-- to do -->

### Temperature

<!-- to do -->

### Touch

<!-- to do -->

## Display Class Pattern

<!-- to do -->

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


## Host provider instance

<!-- to do  -->

Because this is only data structures, not logic, it may not require formal algorithms. 
