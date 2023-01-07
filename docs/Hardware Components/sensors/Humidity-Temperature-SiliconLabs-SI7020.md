
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

The `SI7020` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the Si7020. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x40`.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

There are no configurable properties of the SI7020.


### Properties of Sample Object
`SI7020` implements the sample object properties `hygrometer` and `thermometer` as specified in, respectively, the `Humidity` and `Temperature` Sensor Classes.

#### Inherited Properties from `Humidity` and `Temperature`

| Property | Description |
| :---: | :--- |
| `hygrometer.humidity` | A number that represents the sampled relative humidity as a percentage.
| `thermometer.temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

