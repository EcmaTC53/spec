
# Sensor Class for Bosch BMP180 Atmospheric Pressure and Temperature sensor

## 1 Scope

This document defines the ECMAScript class supporting the BMP180 atmospheric pressure and temperature sensor from Bosch

## 2 Conformance

This class specification conforms to the Barometer and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Bosch BMP180 data sheet](https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `BMP180` Sensor Class

**Module Specifier**: `embedded:sensor/Barometer-Temperature/BMP180`

The `BMP180` Sensor Class implements the `Barometer` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the BMP180. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x77`.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `0` | Number specifying mode. `0` for Ultra-low power, `1` for Standard, `2` for High resolution, `3` for Ultra-high resolution.


### Properties of Sample Object
`BMP180` implements the sample object properties `barometer` and `thermometer` as specified in, respectively, the `Barometer` and `Temperature` Sensor Classes.

#### Inherited Properties from `Barometer` and `Temperature`

| Property | Description |
| :---: | :--- |
| `barometer.pressure` | A number that represents the sampled barometric pressure in Pascal.
| `thermometer.temperature` | A number representing temperature in degrees Celsius.


### Copyright notice

© 2021-2022 Moddable Tech, Inc.

