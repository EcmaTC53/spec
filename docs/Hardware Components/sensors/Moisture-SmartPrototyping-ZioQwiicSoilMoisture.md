# Sensor Class for Smart Prototyping Zio Qwiic Soil Moisture Sensor

## 1 Scope

This document defines the ECMAScript class supporting Smart Prototyping's Zio Qwiic Soil Moisture sensor.

## 2 Conformance

This class specification conforms to the SoilMoistureSensor Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `ZIOQWIICMOISTURE` Sensor Class

**Module Specifier**: `embedded:sensor/SoilMoistureSensor/ZIOQWIICMOISTURE`

The `ZIOQWIICMOISTURE` Sensor Class implements a `SoilMoistureSensor` Sensor Class.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the ZIO QWIIC Moisture sensor. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x28`.


<a id="configuration"></a>	
#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default | Description |
| :---: | :---: | :--- |
| `led` | `0` | A value of `1` turns on the LED. `0` turns off the LED.
| `averaging` | `1` | Number of readings to average per sample.

### Properties of Sample Object
`ZIOQWIICMOISTURE` implements the sample object defined by the `SoilMoistureSensor` Sensor Class.

#### Inherited Properties from `SoilMoistureSensor`

| Property | Description |
| :---: | :--- |
| `moisture` | A number between 0 and 1 (inclusive) that represents the sampled relative soil moisture level, with 0 being the most dry and 1 the most wet.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

