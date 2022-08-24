
# Sensor Class for Aosong AM2320 Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the AM2320 humidity and temperature sensor from Aosong.

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Aosong AM2320 data sheet](http://www.datasheet-pdf.com/PDF/AM2320-Datasheet-Aosong-952504)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `AM2320` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/AM2320`

The `AM2320` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the AM2320. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x5C`.


#### Properties of `configure` Options Object

There are no configurable properties of the AM2320.

### Properties of Sample Object

`AM2320` implements the sample object properties `hygrometer` and `thermometer` as specified in, respectively, the `Humidity` and `Temperature` Sensor Classes.

#### Inherited Properties from `Humidity` and `Temperature`

| Property | Description |
| :---: | :--- |
| `hygrometer.humidity` | A number that represents the sampled relative humidity as a percentage.
| `thermometer.temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

