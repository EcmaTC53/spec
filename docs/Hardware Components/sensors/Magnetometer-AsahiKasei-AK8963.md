# Sensor Class for AsahiKasei AK8963 Magnetometer Sensor

## 1 Scope

This document defines the ECMAScript class supporting the AK8963 Magnetic sensor from AsahiKasei.

## 2 Conformance

This class specification conforms to the Sensor Class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [AK8963 data sheet](https://datasheetspdf.com/pdf-file/849782/AsahiKaseiMicrosystems/AK8963/1)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `AK8963` Sensor Class

**Module Specifier**: `embedded:sensor/Magnetometer/AK8963`

The `AK8963` Sensor Class implements a `Magnetometer` Sensor Class with properties returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the AK8963. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x0C`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `0` | Number specifying the Operating mode (Datasheet 6.4). `0` for Power-down mode, `1` for Single measurement mode, `2` for Continuous measurement at 8 Hz, `3` for Continuous measurement at 100 Hz
| `range` | `0` | Number specifying the Measurement dynamic range. `0` for 14-bit, `1` for 16-bit


### Properties of Sample Object
`AK8963` implements a `Magnetometer` sample object to include the following properties.

| Property | Description |
| :---: | :--- |
| `x` | A number representing the magnetic field of the X-axis in Tesla.
| `y` | A number representing the magnetic field of the Y-axis in Tesla.
| `z` | A number representing the magnetic field of the Z-axis in Tesla.

### Copyright notice

© 2021 Moddable Tech, Inc.

