
# Sensor Class for Sensirion SHT3x Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the SHT3x humidity and temperature sensor from Sensirion.

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Sensirion SHT3x data sheet](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/0_Datasheets/Humidity/Sensirion_Humidity_Sensors_SHT3x_Datasheet_digital.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `SHT3x` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/SHT3x`

The `SHT3x` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the SHT3x. This property is required. Its `hz` property defaults to `1_000_000` and its `address` property to `0x44`.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

There are no configurable properties of the SHT3x.

### Properties of Sample Object
`SHT3x` implements the sample object properties `hygrometer` and `thermometer` as specified in, respectively, the `Humidity` and `Temperature` Sensor Classes.

#### Inherited Properties from `Humidity` and `Temperature`

| Property | Description |
| :---: | :--- |
| `hygrometer.humidity` | A number that represents the sampled relative humidity as a percentage.
| `thermometer.temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

