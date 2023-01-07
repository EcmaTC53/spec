# Sensor Class for InvenSense MPU9250 Accelerometer-Gyroscope Sensor

## 1 Scope

This document defines the ECMAScript class supporting the MPU9250 Accelerometer and Gyroscope sensor from InvenSense. The MPU9250 also includes a AK8963 Magnetometer which is documented separately.

## 2 Conformance

This class specification conforms to the Accelerometer and Gyroscope Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [MPU9250 data sheet](https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-9250-Datasheet.pdf)
- [MPU9250 register map](https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-9250-Register-Map.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `MPU9250` Sensor Class

**Module Specifier**: `embedded:sensor/Accelerometer-Gyroscope/MPU9250`

The `MPU9250` Sensor Class implements an `Accelerometer` and `Gyroscope` Sensor Classes as a compound sensor.

The `MPU9250` device also hosts an `AK8963` sensor. To access the `AK8963`, the MPU9250 must be instantiated first to allow passthrough access to the sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the MPU9250. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x68`.
| `alert` | A `Digital` class constructor options object with the configuration of the MPU9250 alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `range` | 0 | A number specifying the full-scale range of the Accelerometer. `0` for 2 g (default), `1` for 4 g, `2` for 8 g, `3` for 16 g
| `gyroRange` | 0 | A number specifying the full-scale range of the Gyroscope. `0` for 250 degrees per second (º/sec), `1` for 500 º/sec, `2` for 1000 º/sec, `3` for 2000 º/sec.
| `sampleRateDivider` | 0 | A number specifying the sample rate divider for the Gyroscope. [0-255] - see Register Map section 4.2 for details.
| `lowPassFilter` | 0 | A number specifying the low pass filter setting for both the Accelerometer and Gyroscope. See Register Map section 4.3 for details.


### Properties of Sample Object
Samples returned from `MPU9250` instances include the the `accelerometer` and `gyroscope` objects defined, respectively, in the `Accelerometer` and `Gyroscope` Sensor Classes.

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

