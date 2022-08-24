# Sensor Class for DFRobot Capacitive Moisture Sensor

## 1 Scope

This document defines the ECMAScript class supporting the DFRobot Capacitive Moisture sensor.

## 2 Conformance

This class specification conforms to the SoilMoistureSensor Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Information sheet](https://wiki.dfrobot.com/Capacitive_Soil_Moisture_Sensor_SKU_SEN0193)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `CapacitiveMoisture` Sensor Class

**Module Specifier**: `embedded:sensor/SoilMoistureSensor/Capacitive`

The `CapacitiveMoisture` Sensor Class implements a `SoilMoistureSensor` Sensor Class.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `Analog` class constructor options object with the Analog configuration to use for communication with the Capacitive Moisture sensor. This property is required.

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `averaging` | `1` | A number of readings to average per sample.

### Properties of Sample Object
`CapacitiveMoisture` implements the sample object defined by the `SoilMoistureSensor` Sensor Class.

#### Inherited Properties from `SoilMoistureSensor`

| Property | Description |
| :---: | :--- |
| `moisture` | A number between 0 and 1 (inclusive) that represents the sampled relative soil moisture level, with 0 being the most dry and 1 the most wet.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

