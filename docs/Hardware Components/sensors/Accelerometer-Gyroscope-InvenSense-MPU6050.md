# Sensor Class for InvenSense MPU6050 Accelerometer-Gyroscope Sensor

## 1 Scope

This document defines the ECMAScript class supporting the MPU6050 Accelerometer and Gyroscope sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Sensor Class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [MPU6050 data sheet](https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf)
- [MPU6050 register map](https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Register-Map1.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `MPU6050` Sensor Class

**Module Specifier**: `embedded:sensor/Accelerometer-Gyroscope/MPU6050`

The `MPU6050` Sensor Class implements an `Accelerometer` Sensor Class with properties returned by the `sample` method. Additional properties of a `Gyroscope` Sensor Class are also included.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the MPU6050. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x68`.
| `alert` | A `Digital` class constructor options object with the configuration of the MPU6050 alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: |  :--- |
| `range` | `0` | A number specifying the full-scale range of the Accelerometer. `0` for 2 g (default), `1` for 4 g, `2` for 8 g, `3` for 16 g
| `gyroRange` | `0` | A number specifying the full-scale range of the Gyroscope. `0` for 250 degrees per second (º/sec), `1` for 500 º/sec, `2` for 1000 º/sec, `3` for 2000 º/sec.
| `sampleRateDivider` | `0` | A number specifying the sample rate divider for the Gyroscope. [0-255] - see Register Map section 4.2 for details.
| `lowPassFilter` | `0` |A number specifying the low pass filter setting for both the Accelerometer and Gyroscope. See Register Map section 4.3 for details.


### Properties of Sample Object
`MPU6050` implements an `Accelerometer` sample object to include the following properties.

| Property | Description |
| :---: | :--- |
| `x` | A number representing the acceleration along the X-axis in m/s²
| `y` | A number representing the acceleration along the Y-axis in m/s²
| `z` | A number representing the acceleration along the Z-axis in m/s²
| `gyroX` | A number representing the rotation along the X-axis in º/s
| `gyroY` | A number representing the rotation along the Y-axis in º/s
| `gyroZ` | A number representing the rotation along the Z-axis in º/s


### Copyright notice

© 2021 Moddable Tech, Inc.
