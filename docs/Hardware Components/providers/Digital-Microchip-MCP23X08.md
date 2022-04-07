
# IO Provider Class for Microchip MCP23X08 8-Bit I/O Expander with Serial Interface

## 1 Scope

This document defines the ECMAScript class supporting the MCP23008 and MCP24S08 8-bit digital I/O expanders from Microchip Technology, Inc.

## 2 Conformance

This class specification conforms to the IO Provider Class Pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [MCP23X08 data sheet](http://ww1.microchip.com/downloads/en/DeviceDoc/MCP23008-MCP23S08-Data-Sheet-20001919F.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 MCP23X08 IO Provider

The MCP23X08 uses the following mappings from the GPIO pins in the data sheet to pin specifiers and pin bit masks.

| Pin | Pin Specifier | Bit Mask |
| :---: | :--- | :--- |
| `GP0` | 0 | 0x01
| `GP1` | 1 | 0x02
| `GP2` | 2 | 0x04
| `GP3` | 3 | 0x08
| `GP4` | 4 | 0x10
| `GP5` | 5 | 0x20
| `GP6` | 6 | 0x40
| `GP7` | 7 | 0x80

### `MCP23X08` IO Provider Class

**Module Specifier**: `embedded:io/provider/MCP23X08`

The `MCP23X08` IO Provider Class implements the IO Provider Class Pattern. This section describes the properties of the `constructor` options object.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `i2c` | An `I2C` class constructor options object for the MCP23008. Its `hz` property defaults to 400,000 Hz and its `address` property to 0x20.
| `spi` | A `SPI` class constructor options object for the MCP23S08. Its `hz` property defaults to 10,000,000 Hz.
| `interrupt` | A `Digital` class constructor options object with the configuration of the MCP23X08 interrupt pin. This property is required for instances that use the `onReadable` callback of the provided `Digital` or `DigitalBank` IO classes.
| `inputPolarity` | A bit mask indicating the pins of the MCP23X08 to configure with inverted input polarity. The property is optional and defaults to `0b00000000`.

### `Digital` Class

An instance of the `MCP23X08` IO Provider class contains a `Digital` IO class of ECMA-419, ECMAScript® Embedded Systems API Specification.

The `Digital.OutputOpenDrain` option is not available for the `mode` property in the options object passed to the provided Digital `constructor`. If `Digital.OutputOpenDrain` is specified to the `Digital` constructor, an `Error` exception is thrown. 

### `DigitalBank`  Class

An instance of the `MCP23X08` IO Provider class contains a `DigitalBank` IO class of ECMA-419, ECMAScript® Embedded Systems API Specification.

The `Digital.OutputOpenDrain` value is not supported for the `mode` property in the options object passed to the provided DigitalBank `constructor`. If `Digital.OutputOpenDrain` is specified to the `DigitalBank` constructor, an `Error` exception is thrown.
