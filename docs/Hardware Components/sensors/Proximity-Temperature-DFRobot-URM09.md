
# Sensor Class for DFRobot URM09 Proximity and Temperature

## 1 Scope

This document defines the ECMAScript class supporting the URM09 proximity and temperature sensor from DFRobot

## 2 Conformance

This class specification conforms to the Proximity and Temperature Sensor Classes of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [DFRobot URM09 data sheet](https://wiki.dfrobot.com/URM09_Ultrasonic_Sensor_(Gravity-I2C)_(V1.0)_SKU_SEN0304)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `URM09` Sensor Class

**Module Specifier**: `embedded:sensor/Proximity-Temperature/URM09`

The `URM09` Sensor Class implements the `Proximity` and `Temperature` Sensor Classes as a compound sensor.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the URM09. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x11`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `mode` | `0` | Number specifying the measurement mode. Options are `0` for One-shot or `1` for Continuous.
| `range` | `2` | Number specifying the range of measurement. Options are `0` for 150 cm, `1` for 300 cm, and `2` for 500 cm.

### Properties of Sample Object
`URM09` implements the sample object properties `proximity` and `thermometer` as specified in, respectively, the `Proximity` and `Temperature` Sensor Classes.

#### Inherited Properties from `Proximity` and `Temperature`

| Property | Description |
| :---: | :--- |
| `proximity.near` | A boolean that indicates if a proximate object is detected.
| `proximity.distance` | A number that represents the distance to the nearest sensed object in centimeters or `null` if no object is detected.
| `proximity.max` | A number that represents the maximum sensing range of the sensor in centimeters.
| `thermometer.temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

