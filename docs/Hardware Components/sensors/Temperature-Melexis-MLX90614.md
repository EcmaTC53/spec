# Sensor Class for Melexis MLX90614 Temperature Sensor

## 1 Scope

This document defines the ECMAScript class supporting the MLX90614 temperature sensor from NXP Semiconductors.

## 2 Conformance

This class specification conforms to the Temperature Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Melexis MLX90614 data sheet](https://www.melexis.com/en/documents/documentation/datasheets/datasheet-mlx90614)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `MLX90614` Sensor Class

**Module Specifier**: `embedded:sensor/Temperature/MLX90614`

The `MLX90614` Sensor Class extends the `Temperature` Sensor Class with additional properties returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the MLX90614. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x5A`.

#### Properties of `configure` Options Object

There are no configurable properties of the MLX90614.


### Properties of Sample Object
`MLX90614` extends the `Temperature` sample object to include the following properties.

| Property | Description |
| :---: | :--- |
| `temperature` | A number representing temperature in degrees Celsius.
| `ambientTemperature` | A number representing ambient temperature in degrees Celsius.

### Copyright notice

© 2021 Moddable Tech, Inc.

