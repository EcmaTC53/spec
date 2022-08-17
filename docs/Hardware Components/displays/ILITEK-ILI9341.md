
# Display Class for ILITEK ILI9341 TFT LCD Driver

## 1 Scope

This document defines the ECMAScript class supporting the ILI9341 single-chip SOC driver for TFT LCDs from ILI Technology Corp.

## 2 Conformance

This class specification conforms to the Display Class Pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [ILI9341 data sheet](https://www.crystalfontz.com/controllers/Ilitek/ILI9341/142/)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `ILI9341` Display Class

**Module Specifier**: `embedded:display/LCD/ILI9341`

The `ILI9341` Display Class implements the Display Class Pattern. It extends the pattern with additional properties on the option objects passed to the `constructor` and `configure` method.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `spi` | A `SPI` class constructor options object with the configuration of the SPI controller connected to the ILI9341. This property is required.
| `dc` | A `Digital` class constructor options object with the configuration of the ILI9341 "data or command" pin. This property is required. 
| `reset` | A `Digital` class constructor options object with the configuration of the ILI9341 reset pin. This property is optional. If present, a hardware reset is performed when the class is instantiated.

#### Properties of `configure` Options Object

The following properties are optional. 

Where possible, property names reflect the configuration commands described in section 8.2 of the data sheet.

The `brightness` property of the Display Class Pattern is not implemented by this display.

| Property | Description |
| :---: | :--- |
| `format` | As per Display Class Pattern. Only option `8` (16-bit RGB 5:6:5 big-endian) is supported.
| `rotation` | As per Display Class Pattern. Initial value is `0`.
| `sleep` | Boolean specifying if the LCD module is in minimum power consumption mode (`true`) or not (`false`). Initial value is `false`.
| `invert` | Boolean specifying if the display colors are inverted. Initial value is `false`.
| `display` | Boolean specifying if the display renders a blank image (`false`) or the contents of the frame memory (`true`). Initial value is `true`.
| `idle` | Boolean specifying if the ILI9341 idle mode is enabled (`true`) or disabled (`false`). Initial value is `false`.
| `adaptiveBrightness` | String specifying the Content Adaptive Brightness Control mode. Options are `"off"`, `"ui"`, `"still"`, and `"moving"`. Initial value is `"off"`.
| `adaptiveBrightnessMinimum` | Number specifying the minimum brightness level to be used by the Content Adaptive Brightness Control mode. Range is `0x00` to `0xFF`. Initial value is `0x00`.

#### `adaptInvalid` Implementation Note

The `ILI9341` Display Class implements the `adaptInvalid` method as specified by the Display Class Pattern. It applies these rules to adapt the provided rectangle:

* `rectangle.x` starts on an even-numbered pixel
* `rectangle.width` is a multiple of 2
