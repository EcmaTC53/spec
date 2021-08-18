
# Sensor Class for Measurement Specialties HTU21D Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the HTU21D humidity and temperature sensor from Measurement Specialties

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Measurement Specialties HTU21D data sheet](https://www.cdiweb.com/datasheets/te/htu21d.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `HTU21D` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/HTU21D`

The `HTU21D` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the HTU21D. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x40`.


#### Properties of `configure` Options Object

There are no configurable properties of the HTU21D.


### Properties of Sample Object
`HTU21D` implements the `Humidity` and `Temperature` sample objects to include the following properties.

| Property | Description |
| :---: | :--- |
| `humidity` | Relative humidity as a percentage
| `temperature` | Temperature in degrees Celsius

### Copyright notice

© 2021 Moddable Tech, Inc.

