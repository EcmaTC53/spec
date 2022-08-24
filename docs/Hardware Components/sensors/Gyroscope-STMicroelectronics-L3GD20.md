# Sensor Class for ST Microelectronics L3GD20H Gyroscope Sensor

## 1 Scope

This document defines the ECMAScript class supporting the L3GD20H Accelerometer and Gyroscope sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Gyroscope Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [L3GD20H data sheet](https://www.st.com/resource/en/datasheet/l3gd20h.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `L3GD20H` Sensor Class

**Module Specifier**: `embedded:sensor/Gyroscope/L3GD20H`

The `L3GD20H` Sensor Class implements a `Gyroscope` Sensor Class with properties returned by the `sample` method.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the L3GD20H. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x6B`.
| `alert` | A `Digital` class constructor options object with the configuration of the L3GD20H INT1 pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: |  :--- |
| `range` | `0` | A number specifying the full-scale range of the Gyroscope. `0` for 245 degrees per second (º/sec), `1` for 500 º/sec, `2` for 2000 º/sec.
| `rate` | `0` | A number specifying the data rate (DR) for the Gyroscope. [0-3] - see Table 21 of the Data Sheet.
| `lowODR` | `false` | A boolean used to enable Low Output Data Rate. - see Table 21 of the Data Sheet.
| `bandwidth` | `0` | A number specifying the bandwidth of the Gyroscope. [0-3] - see Table 21 of the Data Sheet.
| `enable` | `0b111` | A bitfield specifying which axes are enabled. `0b100` for Z axis, `0b010` for the X axis, and `0b001` for the Y axis.
| `sleep` | `false` | A boolean used to put the device in low power sleep mode. 
| `alert.threshold` | A number representing the amount of rotation (in º/s) which must be exceeded to fire the alert.
| `alert.duration` | A number representing the minimum duration of the interrupt event to be recognized. Duration steps and maximum values depend on the rate chosen - see section 7.23 of the Data Sheet.


### Properties of Sample Object
`L3GD20H` implements the sample object defined by the `Gyroscope` Sensor Class.

#### Inherited Properties from `Gyroscope`

| Property | Description |
| :---: | :--- |
| `x` | A number representing the rotation along the X-axis in º/s
| `y` | A number representing the rotation along the Y-axis in º/s
| `z` | A number representing the rotation along the Z-axis in º/s


### `status` method

The `status` method returns the value in the IG_SRC register. See section 7.16 in of the Data Sheet.

### Copyright notice

© 2021 Moddable Tech, Inc.
