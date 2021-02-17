
# IO Provider Class for Microchip MCP23X17 16-Bit I/O Expander with Serial Interface

## 1 Scope

This document defines the ECMAScript class supporting the MCP23017 and MCP24S17 16-bit digital I/O expanders from Microchip Technology, Inc.

## 2 Conformance

This class specification conforms to the IO Provider Class Pattern of ECMAScript® Modules for Embedded Systems, ECMA-xxx.

## 3 Normative References

- [MCP23X17 data sheet](https://ww1.microchip.com/downloads/en/DeviceDoc/20001952C.pdf)
- [ECMAScript® Modules for Embedded Systems](https://EcmaTC53.github.io/spec/web/spec.html)

## 4 Notational Conventions

## 5 MCP23X17 IO Provider

The MCP23X17 uses the following mappings from the GPIO pins in the data sheet to pin specifiers and pin bit masks.

| Pin | Pin Specifier | Bit Mask |
| :---: | :--- | :--- |
| `GPA0` | 0 | 0x0001
| `GPA1` | 1 | 0x0002
| `GPA2` | 2 | 0x0004
| `GPA3` | 3 | 0x0008
| `GPA4` | 4 | 0x0010
| `GPA5` | 5 | 0x0020
| `GPA6` | 6 | 0x0040
| `GPA7` | 7 | 0x0080
| `GPB0` | 8 | 0x0100
| `GPB1` | 9 | 0x0200
| `GPB2` | 10 | 0x0400
| `GPB3` | 11 | 0x0800
| `GPB4` | 12 | 0x1000
| `GPB5` | 13 | 0x2000
| `GPB6` | 14 | 0x4000
| `GPB7` | 15 | 0x8000

### `MCP23X17` IO Provider Class

**Module Specifier**: `embedded:io/provider/MCP23X17`

The `MCP23X17` IO Provider Class implements the IO Provider Class Pattern. This section describes the properties of the `constructor` options object.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `i2c` | An `I2C` class constructor options object for the MCP23008. Its `hz` property defaults to 400,000 Hz and its `address` property to 0x20.
| `spi` | A `SPI` class constructor options object for the MCP23S08. Its `hz` property defaults to 10,000,000 Hz.
| `interrupt` | A `Digital` class constructor options object with the configuration of the MCP23X17 interrupt pin. This property is required for instances that use the `onReadable` callback of the provided `Digital` or `DigitalBank` IO classes.
| `inputPolarity` | A bit mask indicating the pins of the MCP23X17 to configure with inverted input polarity. The property is optional and defaults to `0b0000000000000000`.

### `Digital` Class

An instance of the `MCP23X17` IO Provider class contains a `Digital` IO class of ECMAScript® Modules for Embedded Systems, ECMA-xxx.

The `Digital.OutputOpenDrain` option is not available for the `mode` property in the options object passed to the provided Digital `constructor`. If `Digital.OutputOpenDrain` is specified to the `Digital` constructor, an `Error` exception is thrown. 

### `DigitalBank`  Class

An instance of the `MCP23X17` IO Provider class contains a `DigitalBank` IO class of ECMAScript® Modules for Embedded Systems, ECMA-xxx.

The `Digital.OutputOpenDrain` value is not supported for the `mode` property in the options object passed to the provided DigitalBank `constructor`. If `Digital.OutputOpenDrain` is specified to the `DigitalBank` constructor, an `Error` exception is thrown.
