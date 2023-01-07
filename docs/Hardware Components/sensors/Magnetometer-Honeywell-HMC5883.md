# Sensor Class for Honeywell HMC5883 Magnetometer Sensor

## 1 Scope

This document defines the ECMAScript class supporting the HMC5883 Magnetic sensor from Honeywell.

## 2 Conformance

This class specification conforms to the Magnetometer Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [HMC5883 data sheet](https://cdn-shop.adafruit.com/datasheets/HMC5883L_3-Axis_Digital_Compass_IC.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `HMC5883` Sensor Class

**Module Specifier**: `embedded:sensor/Magnetometer/HMC5883`

The `HMC5883` Sensor Class implements a `Magnetometer` Sensor Class with properties returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the HMC5883. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x1E`.
| `alert` | A `Digital` class constructor options object with the configuration of the HMC5883 alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `1` | Number specifying the Operating mode. `0` for Continuous-Measurement mode, `1` for Single-Measurement mode, `2` or `3` for Idle mode.
| `rate` | `4` | Number specifying the Output Data Rate. `0` for 0.75 Hz, `1` for 1.5 Hz, `2` for 3 Hz, `3` for 7.5 Hz, `4` for 15 Hz, `5` for 30 Hz, `6` for 75 Hz.
| `gain` | `1` | Gain setting. Select a gain to match the field range: `0` for 0.88 Gauss, `1` for 1.3 Ga, `2` for 1.9 Ga, `3` for 2.5 Ga, `4` for 4 Ga, `4` for 4.7 Ga, `6` for 5.6 Ga, `7` for 8.1 Ga.
| `averaging` | `0` | A number of readings to average per sample. `0` for one, `1` for two, `2` for four, `3` for eight.


### Properties of Sample Object
`HMC5883` implements the sample object defined by the `Magnetometer` Sensor Class.

| Property | Description |
| :---: | :--- |
| `x` | A number that represents the sampled magnetic field around the x axis in microtesla.
| `y` | A number that represents the sampled magnetic field around the y axis in microtesla.
| `z` | A number that represents the sampled magnetic field around the z axis in microtesla.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

