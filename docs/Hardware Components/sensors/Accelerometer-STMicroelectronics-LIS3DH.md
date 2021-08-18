# Sensor Class for STMicroelectronics LIS3DH Accelerometer Sensor

## 1 Scope

This document defines the ECMAScript class supporting the LIS3DH Accelerometer sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Sensor Class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

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
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the LIS3DH. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x18`.
| `alert` | A `Digital` class constructor options object with the configuration of the LIS3DH alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `rate` | `7` | A number specifying the Output Data Rate. `0` for Power-down mode, `1` for 1 Hz, `2` for 10 Hz, `3` for 25 Hz, `4` for 50 Hz, `5` for 100 Hz, `6` for 200 Hz, `7` for 400 Hz, `8` for 1.6 kHz Low-power mode, `9` for 1.344 kHz normal / 5.376 kHz Low-power mode.
| `range` | `0` | A number specifying the full-scale range. `0` for 2 g, `1` for 4 g, `2` for 8 g, `3` for 16 g
| `enable` | `0b111` | A bitfield specifying which axis to enable. `0b001` to enable X axis, `0b010` to enable Y axis, `0b100` to enable Z axis.
| `lowPower` | `0` | A boolean specifying whether to use low-power mode.


### Properties of Sample Object
`LIS3DH` implements an `Accelerometer` sample object to include the following properties.

| Property | Description |
| :---: | :--- |
| `x` | A number representing the acceleration along the X-axis in m/s²
| `y` | A number representing the acceleration along the Y-axis in m/s²
| `z` | A number representing the acceleration along the Z-axis in m/s²


### Copyright notice

© 2021 Moddable Tech, Inc.

