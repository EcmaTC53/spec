<p></p>
<p id="subtitle">Class Specifications for Embedded Hardware Components / February 16, 2021</p>
<p id="title">ECMAScript® Modules for Embedded Systems</p>

<img src="../../web/assets/ecma-logo.svg">

## Table of contents

1. [Introduction](#introduction)
2. [Scope](#scope)
3. [References](#references)
4. [Abbreviations](#abbreviations)
5. [Status](#status)
6. [Contributions](#contributions)
7. [Relation to ECMA TC53, ECMAScript® Modules for Embedded Systems](#relation-to-tc53)

<a id="introduction"></a>
## Introduction

Class Specifications for Embedded Hardware Components is a project of Ecma International's Technical Committee 53 with the goal of collecting and disseminating ECMAScript class definitions for specific hardware components and host providers. The repository consists of individual class definition documents developed by committee members, hardware component manufacturers, and the community. These class definitions describe how the Class Patterns and Host Provider specified in ECMA TC53, ECMAScript® Modules for Embedded Systems are applied to specific hardware components and specific embedded hosts. The repository is publicly available at [https://github.com/EcmaTC53/spec/tree/master/docs/](https://github.com/EcmaTC53/spec/tree/master/docs/). 
<!-- TODO: reorganize spec repo to put all hardware component class definitions in one folder. -->

<a id="scope"></a>
## Scope

This Ecma Technical Report describes a repository of embedded hardware component class definitions developed by TC53 members and other contributors to document ECMAScript modules for specific hardware components. It is assumed that the reader is familiar with ECMA TC53, ECMAScript® Modules for Embedded Systems.

<a id="references"></a>
## References

The following documents, in whole or in part, are normatively referenced in this document and are indispensable for its application. For dated references, only the edition cited applies. For undated references, the latest edition of the referenced document (including any amendments) applies. 

ECMA TC53, ECMAScript® Modules for Embedded Systems

<a id="abbreviations"></a>
## Abbreviations
TC53        Ecma International Technical Committee 53

<a id="status"></a>
## Status

Development of the Class Specifications for Embedded Hardware Components repository is an on-going and open-ended process. Each class definition describes the ECMAScript module for a specific hardware component or embedded host. Because countless such hardware components and hosts exist and new hardware components and hosts are continuously being developed, there will never be a full and complete set of class definitions in the repository. 

As of February 2021, the repository consists of example class definitions created by members of TC53. As additional definitions are contributed by TC53 members, hardware component manufacturers, and the community, the repository will be continuously updated at [https://github.com/EcmaTC53/spec/tree/master/docs/](https://github.com/EcmaTC53/spec/tree/master/docs/), which references the git `master` branch of the repository.

<a id="contributions"></a>
## Contributions

The Class Specifications for Embedded Hardware Components repository is initially composed of contributions from TC53 members. It is anticipated that additional contributions will come primarily from hardware component manufacturers and members of the community.

<!-- The test262 TR contains the following text. It makes sense for TC53 to also have a guide for contributing and a CLA, I think?

A guide for contributions can be found at https://github.com/tc39/test262#contributing-to-test262 which
requests community users to sign the CLA and documents test authoring guidelines -->

<a id="relation-to-tc53"></a>
## Relation to ECMA TC53, ECMAScript® Modules for Embedded Systems

ECMA TC53, ECMAScript® Modules for Embedded Systems provides normative definitions of Class Patterns and the Host Provider. For example, the Sensor Class Pattern defines the requirements and guidelines for ECMAScript Modules that provide access to sensor hardware. The Class Specifications for Embedded Hardware Components repository is a non-normative collection of documentation for specific instances of those class patterns—i.e., ECMAScript modules for specific hardware components and embedded hosts.

The Class Patterns in ECMA TC53, ECMAScript® Modules for Embedded Systems specify the baseline API for hardware components that fill common roles in an embedded system: sensor, display, IO provider, etc. The implementation of a class for a specific hardware component adapts the API to the unique capabilities of the component. This is done in ways permitted by the class pattern. The Class Specifications for Embedded Hardware Components describe the ways in which a specific hardware component has adapted a given class pattern.

These are some ways that the class patterns may be adapted to provide access to the diverse capabilities of individual hardware components:

- Adding methods
- Removing methods unsupported by the hardware
- Adding properties to options objects
- Adding values for existing properties

In addition, the specification gives the host responsibility for some choices. The documents for hosts in Class Specifications for Embedded Hardware Components describe those choices. They include:

- Modules that are available
- Values of pin specifiers
- Values of port specifiers

## Copyright & software license

Ecma International<br/>
Rue du Rhone 114<br/>
CH-1204 Geneva<br/>
Tel: +41 22 849 6000<br/>
Fax: +41 22 849 6001<br/>
Web: [https://ecma-international.org/](https://ecma-international.org/)

### Copyright notice

© 2021 Ecma International

This document may be copied, published and distributed to others, and certain derivative works of it may be prepared, copied, published, and distributed, in whole or in part, provided that the above copyright notice and this Copyright License and Disclaimer are included on all such copies and derivative works. The only derivative works that are permissible under this Copyright License and Disclaimer are: 

1.  works which incorporate all or portion of this document for the purpose of providing commentary or explanation (such as an annotated version of the document),
2. works which incorporate all or portion of this document for the purpose of incorporating features that provide accessibility,
3. translations of this document into languages other than English and into different formats and
4. works by making use of this specification in standard conformant products by implementing (e.g. by copy and paste wholly or partly) the functionality therein.

However, the content of this document itself may not be modified in any way, including by removing the copyright notice or references to Ecma International, except as required to translate it into languages other than English or into a different format.

The official version of an Ecma International document is the English language version on the Ecma International website. In the event of discrepancies between a translated version and the official version, the official version shall govern.

The limited permissions granted above are perpetual and will not be revoked by Ecma International or its successors or assigns.

This document and the information contained herein is provided on an "AS IS" basis and ECMA INTERNATIONAL DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTY THAT THE USE OF THE INFORMATION HEREIN WILL NOT INFRINGE ANY OWNERSHIP RIGHTS OR ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE."
