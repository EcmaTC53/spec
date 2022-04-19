
# Peripheral Class for Microchip MCP7940 Real-Time Clock (RTC)

## 1 Scope

This document defines the ECMAScript class supporting the MCP7940 Real-Time Clock from Microchip

## 2 Conformance

This class specification conforms to the Real-Time Clock class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [Microchip MCP7940 data sheet](https://ww1.microchip.com/downloads/en/DeviceDoc/MCP7940M-Low-Cost%20I2C-RTCC-with-SRAM-20002292C.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `MCP7940` Real-Time Clock Class

**Module Specifier**: `embedded:peripheral/RTC/MCP7940`


#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `clock` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the MCP7940. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x6F`.


#### Properties of `configure` Options Object

There are no configurable properties of the MCP7940.


### Additional Instance Properties Inherited from Real-Time Clock

#### `time` property

The current time of the RTC as a standard ECMAScript time value. Set this property to change the current time of the RTC. This value is a Number.

If the RTC is not enabled or has not been set, the returned value is undefined.


### Copyright notice

© 2021-2022 Moddable Tech, Inc.
