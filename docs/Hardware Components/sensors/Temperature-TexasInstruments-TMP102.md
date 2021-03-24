
# Sensor Class for TI TMP102 Temperature Sensor

## 1 Scope

This document defines the ECMAScript class supporting the TMP102 temperature sensor from Texas Instruments.

## 2 Conformance

This class specification conforms to the Temperature Sensor Class of ECMAScript® Modules for Embedded Systems, ECMA-xxx.

## 3 Normative References

- [TI TMP102 data sheet](https://www.ti.com/lit/ds/symlink/tmp102.pdf)
- [ECMAScript® Modules for Embedded Systems](https://EcmaTC53.github.io/spec/web/spec.html)

## 4 Notational Conventions

## 5 `TMP102` Sensor Class

**Module Specifier**: `embedded:sensor/temperature/TMP102`

The `TMP102` Sensor Class extends the `Temperature` Sensor Class with additional properties on the option objects passed to the `constructor` and `configure` method and returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I2C configuration to use for communication with the TMP102. This property is required. Its `hz` property defaults to `3_400_000` and its `address` property to `0x48`.
| `alert` | A `Digital` class constructor options object with the configuration of the TMP102 alert pin. This property is required for instances that use the `onAlert` callback.
| `onAlert` | Callback that will be invoked when the alert pin is asserted. This property is required if `alert` is provided.

#### Properties of `configure` Options Object

All of the following properties are optional.

Most property names were chosen to reference the configuration options described in sections 7.5.3 and 7.5.4 of the data sheet. 

| Property | Description |
| :---: | :--- |
| `highTemperature` | Number specifying the temperature above which an alert will be asserted. Range is -40 to 125 degrees Celsius. Initial value is 80 degrees Celsius.  
| `lowTemperature` | Number specifying the temperature below which an alert pin will be asserted. Range is -40 to 125 degrees Celsius. Initial value is 75 degrees Celsius.
| `polarity` | Number specifying the value to write to the alert pin when in an alert condition. Must be `0` or `1`. Initial value is `0`.
| `shutdownMode` | Boolean specifying if the module should turn off between requested sample operations. Initial value is `false`.
| `thermostatMode` | String specifying the thermostat operating mode. Must be either `"comparator"` or `"interrupt"`. Initial value is `"comparator"`.
| `faultQueue` | Number specifying the number of consecutive readings exceeding the limits of `highTemperature` or `lowTemperature` required to trigger an alert. Must be one of `1`, `2`, `4`, or `6`. Initial value is `1`. 
| `conversionRate` | Number specifying the TMP102 conversion rate in Hz. Must be one of `0.25`, `1`, `4`, or `8`. Initial value is `4`.

### Properties of Sample Object
`TMP102` extends the `Temperature` sample object to include the following property.

| Property | Description |
| :---: | :--- |
| `alert` | Boolean indicating if a high temperature or low temperature alert has been asserted in the Configuration Register.
