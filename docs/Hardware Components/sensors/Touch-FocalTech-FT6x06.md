
# Sensor Class for FT6x06 Capacitive Touch Panel Controller

## 1 Scope

This document defines the ECMAScript class supporting the FT6x06 capacitive touch panel controller from FocalTech.

## 2 Conformance

This class specification conforms to the Touch Sensor Class of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [FocalTech FT6x06 data sheet](https://cdn-shop.adafruit.com/datasheets/FT6x06+Datasheet_V0.1_Preliminary_20120723.pdf)
- [FocalTech FT6x06 application note and register map](https://cdn-shop.adafruit.com/datasheets/FT6x06_AN_public_ver0.1.3.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `FT6x06` Sensor Class

**Module Specifier**: `embedded:sensor/touch/FT6x06`

The `FT6X06` Sensor Class extends the `Touch` Sensor Class with additional properties on the options objects passed to the `configure` method and returned by the `sample` method.

#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `i2c` | An `I2C` class constructor options object with the configuration of the I2C controller connected to the FT6x06. This property is required.
| `interrupt` | A `Digital` class constructor options object with the configuration of the FT6x06 interrupt pin. This property is required for instances that use the `onSample` callback.
| `reset` | A `Digital` class constructor options object with the configuration of the FT6x06 reset pin. This property is optional. If present, a hardware reset is performed when the class is instantiated.
| `onSample` | Callback to invoke when touch points are available from the `sample` method. This property is required if `interrupt` is provided.

#### Properties of `configure` Options Object

All of the following properties are optional.

| Property | Description |
| :---: | :--- |
| `length` | Number specifying the number of touch points to track with the controller. Range is `1` to `2`. Initial value is `2`.
| `threshold` | Number specifying the threshold for touch detection. Range is `0` to `255`. Initial value is `128`. 
| `flip` | A String indicating whether the sampled touch points should be flipped horizontally or vertically. Allowed values are `"none"`, `"h"`, `"v"`, and `"hv"`. Initial value is `"none"`.
| `active` | Boolean specifying if the FT6x06 will remain in Active Mode when there is no touching. Initial value is `false`.
| `timeout` | Number specifying the number of milliseconds the device should stay in Active Mode when there is no touching. Range is `0` to `255`. Initial value is `10`.
| `weight` | Boolean specifying if touch point weights will be included in samples. Initial value is `false`.
| `area` | Boolean specifying if touch point areas will be included in samples. Initial value is `false`.

### Properties of Sample Object
The `length` property of sample object has a range of `1` to `2`.

`FT6X06` implements the sample array specified in the `Touch` Sensor Class and extends the `touch` object described in the `Touch` Sensor Class to include the following properties. 

| Property | Description |
| :---: | :--- |
| `weight` | Number indicating the weight of the touch. Range is `0` to `255`.
| `area` | Number indicating the area of the touch. Range is `0` to `15`.

These properties are included in the `touch` object only if `weight` and `area`, respectively, have been configured to `true` via the `configure` method. 

##### Inherited Properties of `touch` Object from `Touch` Sensor Class

| Property | Description |
| :---: | :--- |
| `x` | Number indicating the X coordinate of the touch point
| `y` | Number indicating the Y coordinate of the touch point
| `id` | Number indicating which touch point this entry corresponds to
