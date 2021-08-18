
# Sensor Class for Bosch BMP180 Atmospheric Pressure and Temperature sensor

## 1 Scope

This document defines the ECMAScript class supporting the BMP180 atmospheric pressure and temperature sensor from Bosch

## 2 Conformance

This class specification conforms to the Atmospheric Pressure and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Bosch BMP180 data sheet](https://cdn-shop.adafruit.com/datasheets/BST-BMP180-DS000-09.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `BMP180` Sensor Class

**Module Specifier**: `embedded:sensor/AtmosphericPressure-Temperature/BMP180`

The `BMP180` Sensor Class implements the `Atmospheric Pressure` and `Temperature` Sensor Classes.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the BMP180. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x77`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `0` | Number specifying mode. `0` for Ultra-low power, `1` for Standard, `2` for High resolution, `3` for Ultra-high resolution.


### Properties of Sample Object
`BMP180` implements the `Atmospheric pressure` and `Temperature` sample objects to include the following properties.

| Property | Description |
| :---: | :--- |
| `pressure` | A number representing atmospheric pressure in Pascal.
| `temperature` | A number representing temperature in degrees Celsius.


### Copyright notice

© 2021 Moddable Tech, Inc.

