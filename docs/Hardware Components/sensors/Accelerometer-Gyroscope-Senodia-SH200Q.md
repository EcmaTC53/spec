# Sensor Class for Senodia SH200Q Accelerometer-Gyroscope Sensor

## 1 Scope

This document defines the ECMAScript class supporting the SH200Q Accelerometer and Gyroscope sensor from Senodia.

## 2 Conformance

This class specification conforms to the Accelerometer and Gyroscope Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [SH200Q data sheet](https://m5stack.oss-cn-shenzhen.aliyuncs.com/resource/docs/datasheet/core/SH200Q_en.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `SH200Q` Sensor Class

**Module Specifier**: `embedded:sensor/Accelerometer-Gyroscope/SH200Q`

The `SH200Q` Sensor Class implements the `Accelerometer` and `Gyroscope` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the SH200Q. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x68`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: |  :--- |
| `range` | `1` | A number specifying the full-scale range of the Accelerometer. `0` for 4 g (default), `1` for 8 g, `2` for 16 g
| `gyroRange` | `0` | A number specifying the full-scale range of the Gyroscope. `0` for 2000 degrees per second (º/sec), `1` for 1000 º/sec, `2` for 250 º/sec, `3` for 250 º/sec, `4` for 125 º/sec.
| `lowPassFilter` | `0` | A number specifying the low pass filter setting for the Gyroscope.
| `dataRate` | 0 |  A number specifying the output data rate for the Accelerometer. `0` for 1024 Hz, `1` for 512 Hz, `2` for 256 Hz, `3` for 128 Hz
| `gyroDataRate` | 0 |  A number specifying the output data rate for the Accelerometer. `0` for 1000 Hz, `1` for 500 Hz, `2` for 250 Hz, `3` for 31.25 Hz, `4` for 8 KHz, `5` for 16 KHz, `6` for 32 KHz


### Properties of Sample Object
Samples returned from `SH200Q` instances include the the `accelerometer` and `gyroscope` objects defined, respectively, in the `Accelerometer` and `Gyroscope` Sensor Classes.

#### Inherited Properties from `Accelerometer` and `Gyroscope`

| Property | Description |
| :---: | :--- |
| `accelerometer.x` | A number that represents the sampled acceleration along the x axis in meters per second squared.
| `accelerometer.y` | A number that represents the sampled acceleration along the y axis in meters per second squared.
| `accelerometer.z` | A number that represents the sampled acceleration along the z axis in meters per second squared.
| `gyroscope.x` | A number that represents the sampled angular velocity around the x axis in radian per second.
| `gyroscope.y` | A number that represents the sampled angular velocity around the y axis in radian per second.
| `gyroscope.z` | A number that represents the sampled angular velocity around the z axis in radian per second.


### Copyright notice

© 2021-2022 Moddable Tech, Inc.
