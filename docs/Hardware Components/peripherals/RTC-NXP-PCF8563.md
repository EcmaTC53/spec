
# Peripheral Class for NXP Semiconductors PCF8563 Real-Time Clock (RTC)

## 1 Scope

This document defines the ECMAScript class supporting the PCF8563 Real-Time Clock from NXP Semiconductors.

## 2 Conformance

This class specification conforms to the Real-Time Clock class pattern of ECMA-419, ECMAScript® Embedded Systems API Specification.

## 3 Normative References

- [NXP Semiconductors PCF8563 data sheet](https://www.nxp.com/docs/en/data-sheet/PCF8563.pdf)
- [ECMA-419, ECMAScript® Embedded Systems API Specification](https://419.ecma-international.org)

## 4 Notational Conventions

## 5 `PCF8563` Real-Time Clock Class

**Module Specifier**: `embedded:peripheral/RTC/PCF8563`


#### Properties of `constructor` Options Object

| Property | Description |
| :---: | :--- |
| `rtc` | A `SMBus` class constructor options object with the SMBus configuration to use for communication with the PCF8563. This property is required. Its `hz` property defaults to `400_000` and its `address` property to `0x51`.
| `interrupt` | A `Digital` class constructor options object with the configuration of the PCF8563 alarm pin. This property is required for instances that use the `onAlarm` callback.
| `onAlarm` | Callback that will be invoked when the alarm pin is asserted. This property is required if `interrupt` is provided.


#### Properties of `configure` Options Object

The PCF8563 can be configured to trigger an alarm at a future time. The `onAlarm` method will be called when the alarm is triggered. An exception will be thrown if the alarm time exceeds the capability of the device.

| Property | Description |
| :---: | :--- |
| `alarm` | The time in milliseconds to set the RTC's alarm. This value is a Number. 


### Additional Instance Properties Inherited from Real-Time Clock

#### `time` property

The current time of the RTC as a standard ECMAScript time value. Set this property to change the current time of the RTC. This value is a Number.

If the RTC is not enabled or has not been set, the returned value is undefined.

#### `configuration` property

The `configuration` property returns an object containing the current configuration of the RTC, including the `alarm` property.

### Copyright notice

© 2021-2022 Moddable Tech, Inc.
