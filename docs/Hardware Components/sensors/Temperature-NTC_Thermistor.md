# Sensor Class for NTC Thermistor Temperature Sensor

## 1 Scope

This document defines the ECMAScript class supporting generic NTC Thermistor temperature sensors.

## 2 Conformance

This class specification conforms to the Temperature Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `NTC_THERMISTOR` Sensor Class

**Module Specifier**: `embedded:sensor/Temperature/NTC_Thermistor`

The `NTC_THERMISTOR` Sensor Class extends the `Temperature` Sensor Class with additional properties on the option objects passed to the `constructor` and `configure` method and returned by the `sample` method. 

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `sensor` | An `Analog` class constructor options object with the Analog configuration to use for communication with the NTC_THERMISTOR. This property is required.

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Default Value | Description |
| :---: | :---: | :--- |
| `series_resistance` | `10_000` | A number specifying the resistance in Ohms of the series resistor.
| `thermistor_resistance` | `10_000` | A number specifying the resistance of the Thermistor.
| `beta` | `3435` | A number specifying the `beta` value of the Thermistor.
| `averaging` | `1` | A number of readings to average per sample.
| `pullup` | `false` | If true, series resistor is connected to Vcc, otherwise series resistor is connected to GND.

### Properties of Sample Object
`NTC_THERMISTOR` implements the sample object defined by the  `Temperature` Sensor Class.

#### Inherited Property from `Temperaturer`

| Property | Description |
| :---: | :--- |
| `temperature` | A number that represents the sampled temperature in degrees Celsius.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.

