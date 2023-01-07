# Sensor Class for Texas Instruments TMP117 Temperature Sensor

## 1 Scope

This document defines the ECMAScript class supporting the TMP117 temperature sensor from Texas Instruments.

## 2 Conformance

This class specification conforms to the Temperature Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Texas Instruments TMP117 data sheet](https://www.ti.com/lit/ds/symlink/tmp117.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `TMP117` Sensor Class

**Module Specifier**: `embedded:sensor/Temperature/TMP117`

The `TMP117` Sensor Class extends the `Temperature` Sensor Class with additional properties on the option objects passed to the `constructor` and `configure` method and returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the TMP117. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x48`.
| `alert` | A `Digital` class constructor options object with the configuration of the TMP117 alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.

<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `highTemperature` | `80` | A number specifying the temperature above which an alert will be asserted. Range is -55 to 125 degrees Celsius.
| `lowTemperature` | `75` | A number specifying the temperature below which an alert pin will be asserted. Range is -55 to 125 degrees Celsius.
| `polarity` | `0` | A number specifying the value to write to the alert pin when in an alert condition. Must be `0` or `1`.
| `shutdownMode` | `false` | A boolean specifying if the module should turn off between requested sample operations. Initial value is `false` - meaning continuous conversion.
| `thermostatMode` | `comparator` | A string specifying the thermostat operating mode. Must be either `"comparator"` or `"interrupt"`.
| `averaging` | `0` | Number of readings to average per sample. `0` for single sample, `8`, `32` and `64` are also valid.
| `conversionRate` | `4` | A number from 0 - 7 indicating the Conversion Cycle time during continuous conversion. See table 7-7 in the datasheet.

### Properties of Sample Object
`TMP117` implements the sample object specified in the `Temperature` Sensor Class and extends it to include the following properties.

| Property | Description |
| :---: | :--- |
| `alert` | A boolean indicating if a high temperature or low temperature alert has been asserted in the Configuration Register.

#### Inherited Property from `Temperature`

| Property | Description |
| :---: | :--- |
| `temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

