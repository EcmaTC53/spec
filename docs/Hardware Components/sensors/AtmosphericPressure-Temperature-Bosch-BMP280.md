
# Sensor Class for Bosch BMP280 Atmospheric Pressure and Temperature sensor

## 1 Scope

This document defines the ECMAScript class supporting the BMP280 atmospheric pressure and temperature sensor from Bosch.

## 2 Conformance

This class specification conforms to the Barometer and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Bosch BMP280 data sheet](https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bmp280-ds001.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `BMP280` Sensor Class

**Module Specifier**: `embedded:sensor/Barometer-Temperature/BMP280`

The `BMP280` Sensor Class implements the `Barometer` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the BMP280. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x76`.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `0` | Number specifying mode. `0` for sleep, `1` for forced read, `3` for normal.
| `temperatureSampling` | `0` | Number specifying amount of temperature oversampling. `0` for none, `1` for x1, `2` for x2, `3` for x4, `4` for x8 and `5` for x16.
| `pressureSampling` | `0` | Number specifying amount of pressure oversampling.  `0` for none, `1` for x1, `2` for x2, `3` for x4, `4` for x8 and `5` for x16.
| `filter` | `0` | Number specifying filter to remove short-term fluctuations in pressure.  `0` for off, `1` for x2, `2` for x4, `3` for x8 and `4` for x16.
| `standbyDuration` | `0` | Number specifying time between measurements in normal (continuous) sampling mode. `0` for 0.5 ms, `1` for 62.5 ms, `2` for 125 ms, `3` for 250 ms, `4` for 500 ms, `5` for 1000 ms, `6` for 2000 ms, `7` for 4000 ms.


### Properties of Sample Object
`BMP280` implements the sample object properties `barometer` and `thermometer` as specified in, respectively, the `Barometer` and `Temperature` Sensor Classes.

#### Inherited Properties from `Barometer` and `Temperature`

| Property | Description |
| :---: | :--- |
| `barometer.pressure` | A number that represents the sampled barometric pressure in Pascal.
| `thermometer.temperature` | A number representing temperature in degrees Celsius.


### Copyright notice

© 2021-2022 Moddable Tech, Inc.

