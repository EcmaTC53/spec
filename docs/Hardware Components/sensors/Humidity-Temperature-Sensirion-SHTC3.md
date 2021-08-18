
# Sensor Class for Sensirion SHTC3 Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the SHTC3 humidity and temperature sensor from Sensirion

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Sensirion SHTC3 data sheet](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHTC3_Datasheet.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `SHTC3` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/SHTC3`

The `SHTC3` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the SHTC3. This property is required. Its `hz` property defaults to `1_000_000` and its `address` property to `0x70`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `lowPower` | `0` | Boolean specifying whether to use low-power option.
| `autoSleep` | `1` | Boolean specifying whether to sleep between readings.

### Properties of Sample Object
`SHTC3` implements the `Humidity` and `Temperature` sample objects to include the following properties.

| Property | Description |
| :---: | :--- |
| `humidity` | A number representing relative humidity as a percentage.
| `temperature` | A number representing temperature in degrees Celsius.

### Copyright notice

© 2021 Moddable Tech, Inc.

