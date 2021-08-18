# Sensor Class for Smart Prototyping Zio Qwiic Soil Moisture Sensor

## 1 Scope

This document defines the ECMAScript class supporting Smart Prototyping's Zio Qwiic Soil Moisture sensor.

## 2 Conformance

This class specification conforms to the Sensor Class Pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `ZIOQWIICMOISTURE` Sensor Class

**Module Specifier**: `embedded:sensor/Moisture/ZIOQWIICMOISTURE`

The `ZIOQWIICMOISTURE` Sensor Class implmenets a `Moisture` Sensor Class.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the ZIO QWIIC Moisture sensor. This property is required. Its `hz` property defaults to `100_000` and its `address` property to `0x28`.


#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default | Description |
| :---: | :---: | :--- |
| `led` | `0` | A value of `1` turns on the LED. `0` turns off the LED.
| `averaging` | `1` | Number of readings to average per sample.

### Properties of Sample Object
`ZIOQWIICMOISTURE` returns a sample object with the following property.

| Property | Description |
| :---: | :--- |
| `value` | A number representing relative moisture level from 1023 (dry) to 0 (wet).

### Copyright notice

© 2021 Moddable Tech, Inc.

