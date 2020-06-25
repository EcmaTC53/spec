
# Sensor Class for TI TMP102 Temperature Sensor

## 1 Scope

This document defines the ECMAScript class supporting the TMP102 temperature sensor from Texas Instruments.

## 2 Conformance

This class specification conforms to the Temperature Sensor Class of ECMAScript® Modules for Embedded Systems, ECMA-xxx.

## 3 Normative References

- [TI TMP102 data sheet](https://www.ti.com/lit/ds/symlink/tmp102.pdf)
- [ECMAScript® Modules for Embedded Systems](https://phoddie.github.io/tc53temp)

## 4 Notational Conventions

## 5 `TMP102` Sensor Class

The `TMP102` Sensor Class extends the `Temperature` Sensor Class with additional properties on the option objects passed to the `constructor` and `configure` method and returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An options object as specified in the following subsection. This property is required.
| `alert` | An options object as specified in the subsequent subsection. This property is optional and may be omitted if the TMP102 alert pin will not be used.

##### Properties of `sensor` Options Object

All of the following properties are required. 

| Property | Description |
| :---: | :--- |
| `data` | Number specifying the I²C data pin. 
| `clock` | Number specifying the I²C clock pin.
| `address` | Number specifying the I²C address. Must be in the range `0x48` to `0x4B`.

##### Properties of `alert` Options Object

| Property | Description |
| :---: | :--- |
| `pin` | Number specifying the digital pin for alerts. This property is required.

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Description |
| :---: | :--- |
| `highTemperature` | Number specifying the temperature above which an alert will be asserted. Range is -40 to 125 degrees Celsius. Default is 80 degrees Celsius.  
| `lowTemperature` | Number specifying the temperature below which an alert pin will be asserted. Range is -40 to 125 degrees Celsius. Default is 75 degrees Celsius.
| `polarity` | Number specifying the value to write to the alert pin when in an alert condition. Must be `0` or `1`. Default is `0`.
| `shutdownMode` | Boolean specifying if the module should turn off between requested sample operations. Default is `false`.
| `thermostatMode` | String specifying the thermostat operating mode. Must be either `"comparator"` or `"interrupt"`. Default is `"comparator"`.
| `faultQueue` | Number specifying the number of consecutive readings exceeding the limits of `highTemperature` or `lowTemperature` required to trigger an alert. Must be one of `1`, `2`, `4`, or `6`. Default is `1`. 
| `conversionRate` | Number specifying the TMP102 conversion rate in Hz. Must be one of `0.25`, `1`, `4`, or `8`. Default is `4`.

### Properties of Sample Object
`TMP102` extends the `Temperature` sample object to include the following properties.

| Property | Description |
| :---: | :--- |
| `alert` | Boolean indicating if a high temperature or low temperature alert has been asserted in the Configuration Register.
