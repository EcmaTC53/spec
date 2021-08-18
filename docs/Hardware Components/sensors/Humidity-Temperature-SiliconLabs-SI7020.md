
# Sensor Class for Silicon Labs Si7020 Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the Si7020 humidity and temperature sensor from Silicon Labs.

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Silicon Labs Si7020 data sheet](https://www.silabs.com/documents/public/data-sheets/Si7020-A20.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `SI7020` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/SI7020`

The `SI7020` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the Si7020. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x40`.


#### Properties of `configure` Options Object

There are no configurable properties of the SI7020.


### Properties of Sample Object
`SI7020` implements the `Humidity` and `Temperature` sample objects to include the following properties.

| Property | Description |
| :---: | :--- |
| `humidity` | A number representing relative humidity as a percentage.
| `temperature` | A number representing temperature in degrees Celsius.

### Copyright notice

© 2021 Moddable Tech, Inc.

