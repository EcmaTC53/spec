
# Sensor Class for Aosong AHT10 Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the AHT10 humidity and temperature sensor from Aosong.

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Aosong AHT10 data sheet](https://server4.eca.ir/eshop/AHT10/Aosong_AHT10_en_draft_0c.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `AHT10` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/AHT10`

The `AHT10` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the AHT10. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x38`.


#### Properties of `configure` Options Object

There are no configurable properties of the AHT10.


### Properties of Sample Object
`AHT10` implements the sample object properties `hygrometer` and `thermometer` as specified in, respectively, the `Humidity` and `Temperature` Sensor Classes.

#### Inherited Properties from `Humidity` and `Temperature`

| Property | Description |
| :---: | :--- |
| `hygrometer.humidity` | A number that represents the sampled relative humidity as a percentage.
| `thermometer.temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

