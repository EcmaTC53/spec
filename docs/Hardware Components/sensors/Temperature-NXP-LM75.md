# Sensor Class for NXP Semiconductors LM75B Temperature Sensor

## 1 Scope

This document defines the ECMAScript class supporting the LM75B temperature sensor from NXP Semiconductors.

## 2 Conformance

This class specification conforms to the Temperature Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [NXP 75B data sheet](https://www.nxp.com/docs/en/data-sheet/LM75B.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `LM75` Sensor Class

**Module Specifier**: `embedded:sensor/Temperature/LM75`

The `LM75` Sensor Class extends the `Temperature` Sensor Class with additional properties on the option objects passed to the `constructor` and `configure` method and returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the LM75. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x48`.
| `alert` | A `Digital` class constructor options object with the configuration of the LM75 alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `highTemperature` | `80` |  A number specifying the temperature above which an alert will be asserted. Range is -55 to 125 degrees Celsius.
| `lowTemperature` | `75` | A number specifying the temperature below which an alert pin will be asserted. Range is -55 to 125 degrees Celsius.
| `polarity` | `0` | A number specifying the value to write to the alert pin when in an alert condition. Must be `0` or `1`.
| `shutdownMode` | `false` | A boolean specifying if the module should turn off between requested sample operations.
| `thermostatMode` | `comparator` | A string specifying the thermostat operating mode. Must be either `"comparator"` or `"interrupt"`.
| `faultQueue` | `1` | A number specifying the number of consecutive readings exceeding the limits of `highTemperature` or `lowTemperature` required to trigger an alert. Must be one of `1`, `2`, `4`, or `6`.

### Properties of Sample Object
`LM75` implements the sample object specified in the `Temperature` Sensor Class and extends it to include the following properties.

| Property | Description |
| :---: | :--- |
| `alert` | A boolean indicating if a high temperature or low temperature alert has been asserted in the Configuration Register.

#### Inherited Property from `Temperature`

| Property | Description |
| :---: | :--- |
| `temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

