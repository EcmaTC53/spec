# Sensor Class for STMicroelectronics LSM303DLHC Accelerometer and Magnetometer Sensor

## 1 Scope

This document defines the ECMAScript class supporting the LSM303DLHC Accelerometer and Magnetometer sensor from STMicroelectronics.

## 2 Conformance

This class specification conforms to the Sensor Class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [LSM303DLHC data sheet](https://www.st.com/resource/en/datasheet/lsm303dlhc.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 Sensor Classes for `LSM303DLHC`

**Module Specifiers**: `embedded:sensor/Accelerometer/LIS3DH`, `embedded:sensor/Magnetometer/HMC5883`

The `LSM303DLHC` is a hardware module that combines the functionality of the `LIS3DH` accelerometer and the `HMC5883` magnetometer.

To use the `LM303DLHC`, instantiate the `LIS3DH` Sensor class for accelerometer functionality and `HMC5883` Sensor class for magnetometer functionality with the following difference:

The `HMC5883` is at default I²C address of `0x1E`. The `LIS3DH` is at I²C address `0x19`, which is not the default. Therefore, it is necessary to include the `address` property in the options object argument of the constructor of the `LIS3DH`.

```
let accelerometer = new LIS3DH({
	address: 0x19,
	...
});
```


### Copyright notice

© 2021 Moddable Tech, Inc.

