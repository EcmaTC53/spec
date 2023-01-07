# Sensor Class for STMicroelectronics LIS3DH Accelerometer Sensor

## 1 Scope

This document defines the ECMAScript class supporting the LIS3DH Accelerometer sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Accelerometer Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [LIS3DH data sheet](https://www.st.com/resource/en/datasheet/lis3dh.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `LIS3DH` Sensor Class

**Module Specifier**: `embedded:sensor/Accelerometer/LIS3DH`

The `LIS3DH` Sensor Class implements an `Accelerometer` Sensor Class with properties returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the LIS3DH. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x18`.
| `alert` | A `Digital` class constructor options object with the configuration of the LIS3DH alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `rate` | `7` | A number specifying the Output Data Rate. `0` for Power-down mode, `1` for 1 Hz, `2` for 10 Hz, `3` for 25 Hz, `4` for 50 Hz, `5` for 100 Hz, `6` for 200 Hz, `7` for 400 Hz, `8` for 1.6 kHz Low-power mode, `9` for 1.344 kHz normal / 5.376 kHz Low-power mode.
| `range` | `0` | A number specifying the full-scale range. `0` for 2 g, `1` for 4 g, `2` for 8 g, `3` for 16 g
| `enable` | `0b111` | A bitfield specifying which axis to enable. `0b001` to enable X axis, `0b010` to enable Y axis, `0b100` to enable Z axis.
| `lowPower` | `false` | A boolean specifying whether to use low-power mode.
| `alert.mode` | `1` | A number specifying the alert mode. `0` to turn off interrupts, `1` to enable motion detection.
| `alert.threshold` | `0` | A number representing the amount of movement which must be exceeded to fire the alert - see section 8.23 of the Data Sheet.
| `alert.duration` | `0` | A number representing the minimum duration of the interrupt event to be recognized. Duration steps and maximum values depend on the rate chosen - see section 8.24 of the Data Sheet.


### Properties of Sample Object
`LIS3DH` implements the sample object defined by the `Accelerometer` Sensor Class.

#### Inherited Properties from `Accelerometer`

| Property | Description |
| :---: | :--- |
| `x` | A number that represents the sampled acceleration along the x axis in meters per second squared.
| `y` | A number that represents the sampled acceleration along the y axis in meters per second squared.
| `z` | A number that represents the sampled acceleration along the z axis in meters per second squared.

### `status` method

The `status` method returns the value in the INT1_SRC register which indicate interrupt status. See section 8.22 of the Data Sheet.

When using an `alert`, the `status` method must be called to clear the interrupt in your `onAlert` function. Clearing the interrupt will enable new readings.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

