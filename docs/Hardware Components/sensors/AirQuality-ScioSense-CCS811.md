
# Sensor Class for ScioSense CCS811 Indoor Air Quality sensor

## 1 Scope

This document defines the ECMAScript class supporting the CCS811 Indoor Air Quality sensor from ScioSense

## 2 Conformance

This class specification conforms to the Sensor Class Pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ScioSense CCS811 data sheet](https://www.sciosense.com/wp-content/uploads/documents/SC-001232-DS-2-CCS811B-Datasheet-Revision-2.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `CCS811` Sensor Class

**Module Specifier**: `embedded:sensor/AirQuality/CCS811`

The `CCS811` Sensor Class implements an `AirQuality` Sensor Class.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the CCS811. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x5A`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `0` | Number specifying the Drive Mode. `0` for Idle, `1` for Constant power mode - 1 sec. measurement, `2` for Pulse Heating mode - 10 sec. measurement, `3` for Low Power Pulse Heating mode - 60 sec. measurement, `4` for Constant power mode - 250 ms measurement.
| `humidity` | `50` | Optional number specifying measured humidity from additional sensor
| `temperature` | `25` | Optional number specifying measured temperature from additional sensor


### Properties of Sample Object
`CCS811` defines the sample object to include the following properties.

| Property | Description |
| :---: | :--- |
| `eCO2` | A number representing the calculated eCO₂ (ppm).
| `TVOC` | A number representing equivalent Total Volatile Organic Compound (eTVOC) (ppb).
| `current` | A number indicating the current through the sensor (0μA to 63μA).
| `rawADC` | A number indicating the voltage across the sensor (1023 = 1.65V).

### Additional properties
`CCS881` defines these additional properties:

| Method | Description |
| :---: | :--- |
| `available` | A boolean indicating whether the sensor has data ready.


### Copyright notice

© 2021 Moddable Tech, Inc.

