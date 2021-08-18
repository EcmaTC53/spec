
# Sensor Class for Aosong AHT10 Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the AHT10 humidity and temperature sensor from Aosong

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Aosong AHT10 data sheet](https://server4.eca.ir/eshop/AHT10/Aosong_AHT10_en_draft_0c.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `AHT10` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/AHT10`

The `AHT10` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the AHT10. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x38`.


#### Properties of `configure` Options Object

There are no configurable properties of the AHT10.


### Properties of Sample Object
`AHT10` implements the `Humidity` and `Temperature` sample objects to include the following properties.

| Property | Description |
| :---: | :--- |
| `humidity` | A number representing relative humidity as a percentage.
| `temperature` | A number representing temperature in degrees Celsius.

### Copyright notice

© 2021 Moddable Tech, Inc.

