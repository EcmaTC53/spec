
# Peripheral Class for NXP Semiconductors PCF8523 Real-Time Clock (RTC)

## 1 Scope

This document defines the ECMAScript class supporting the PCF8523 Real-Time Clock from NXP Semiconductors.

## 2 Conformance

This class specification conforms to the Real-Time Clock class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [NXP Semiconductors PCF8523 data sheet](https://www.nxp.com/docs/en/data-sheet/PCF8523.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `PCF8523` Real-Time Clock Class

**Module Specifier**: `embedded:peripheral/RTC/PCF8523`


#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `clock` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the PCF8523. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x68`.


#### Properties of `configure` Options Object

There are no configurable properties of the PCF8523.

### Additional Instance Properties Inherited from Real-Time Clock

#### `time` property

The current time of the RTC as a standard ECMAScript time value. Set this property to change the current time of the RTC. This value is a Number.

If the RTC is not enabled or has not been set, the returned value is undefined.


### Copyright notice

© 2021-2022 Moddable Tech, Inc.
