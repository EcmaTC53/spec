
# Sensor Class for Sensirion SHTC3 Humidity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the SHTC3 humidity and temperature sensor from Sensirion.

## 2 Conformance

This class specification conforms to the Humidity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Sensirion SHTC3 data sheet](https://www.sensirion.com/fileadmin/user_upload/customers/sensirion/Dokumente/2_Humidity_Sensors/Datasheets/Sensirion_Humidity_Sensors_SHTC3_Datasheet.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `SHTC3` Sensor Class

**Module Specifier**: `embedded:sensor/Humidity-Temperature/SHTC3`

The `SHTC3` Sensor Class implements the `Humidity` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `I2C` class constructor options object with the I²C configuration to use for communication with the SHTC3. This property is required. Its `hz` property defaults to `1_000_000` and its `address` property to `0x70`.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `lowPower` | `0` | Boolean specifying whether to use low-power option.
| `autoSleep` | `1` | Boolean specifying whether to sleep between readings.

### Properties of Sample Object
`SHTC3` implements the sample object properties `hygrometer` and `thermometer` as specified in, respectively, the `Humidity` and `Temperature` Sensor Classes.

#### Inherited Properties from `Humidity` and `Temperature`

| Property | Description |
| :---: | :--- |
| `hygrometer.humidity` | A number that represents the sampled relative humidity as a percentage.
| `thermometer.temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

