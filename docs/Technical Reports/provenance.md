<p></p>
<p id="subtitle">Recommendations and Best Practices for Scripts on Connected Sensing Devices / January 5, 2021 (Updated March 15, 2021)</p>
<p id="title">ECMAScript® Modules for Embedded Systems</p>

<img src="../../web/assets/ecma-logo.svg">

## Table of contents

1. [Introduction](#introduction)
2. [Scope](#scope)
3. [Terms and Definitions](#termsanddefs)
4. [Best Practices for Scripts on Connected Sensing Devices](#bpscsd)
5. [Best Practices for Propagating Static Device Metadata](#bppsdm)
6. [Best Practices for Propagating Dynamic Device State Metadata](#bpddsm)
7. [Best Practices for Propagating Sensor Samples](#bppss)

## Introduction<a name="introduction"></a>

This document, related to the TC53 Provenance Sensor Class Pattern Specification, describes a set of best practices for scripts running on connected sensing devices that propagate sensor readings beyond the connected sensing device and to some remote endpoint, such as a server, cloud application, or another (non-embedded) computing system (these best practices are not applicable to sensing devices with sensors that act exclusively locally on the sensed data). 
<!--best practices for using the PSCP to support running scripts on connected sensing devices, for propagating static and dynamic device and state metadata, and for accurately propagating sensor samples.-->

## Scope<a name="scope"></a>

This document is non-normative and intended to provide TC53 practitioners with guidance related to designing and implementing connected systems capable of capturing and transmitting useful and integrous data. 

## Terms and Definitions<a name="termsanddefs"></a>
For the purposes of this Technical Report, refer to the definitions listed in [1]. 

## Best Practices for Scripts on Connected Sensing Devices<a name="bpscsd"></a>

To ensure the integrity and usefulness of reported sensing data, a connected sensing device **must** reflect provenance as accurately as possible when reporting to a remote endpoint. The following best practices should be incorporated into script design to ensure that sensor configuration, connected sensing device identification, and data processing techniques are properly propagated to endpoints. 

A connected sensing device **must** have a queryable instance identifier. The instance identifier must be meaningful upon receipt at a connected endpoint; this identifier may be globally-unique. 

## Best Practices for Propagating Static Device Metadata<a name="bppsdm"></a>

These static properties of the connected sensing device must be derivable by the endpoint from the connected sensing device identifier or queryable directly from the connected sensing device: 
 - The `identification` of all connected peripheral sensors.
 - The physical variant of the connected sensing device, if relevant.
 - The device's clock accuracy and precision, if known.
 - Geospatial data associated with the location of the connected sensing device, if static and known.

## Best Practices for Propagating Dynamic Device State Metadata<a name="bpddsm"></a>

These dynamic properties of the connected sensing device must queryable directly from the connected sensing device, if known and applicable: 
 - The active `configuration` of peripheral sensors reported as an identifier unique to the connected sensing device, developer, platform, or globally. The information encoded should by itself or in conjunction with connected sensing device identification information enable an endpoint to determine the hardware, software, and  sampling configuration used to capture each sample or sample sequence, if non-default configuration parameters are used. Information may be encoded in the configuration identifier, transmitted for resolution at a remote endpoint, or combine approaches. 
 - Peripheral sensors' data encoding and/or parsing approach, if applicable.

## Best Practices for Propagating Sensor Samples<a name="bppss"></a>

An implementation must make every effort to associate a sample with the most-precise available time or tick before propagating it to an endpoint. The most-precise available `time` or `tick` is defined as being derived from the lowest-level clock associated with the start of a sampling event. The `time` associated with the sample capture is the most precise, followed by the `time` associated with the request for capture, followed by the `time` associated with the transmission of that sample. `time` must be represented as a time value as defined in ECMA-262 Section 20.4.1.1, “Time Values and Time Range.” Should `time` not be available at a particular level of precision, `ticks` may instead be reported. In this case, the lowest-level `time` should also be reported, if available. 

If a connected sensing device generates a synthetic measurement, that measurement must be noted as such and may optionally include details about the operations conducted on the raw data. 

If data stemming from a connected sensing device transits through intermediate data handlers, then that chain of stewardship may be queryable. 

If a connected sensing device makes efforts to ensure trust and integrity of its derivative provenance data, then associated meta-provenance data related to trust and integrity in the provenance chain may be queryable. 




# References
For  dated  references,  only  the  edition  cited  applies.  For  undated  references,  the  latest  edition  of  the  referenced document (including any amendments) applies. 

[1] ECMA-4xx, ECMAScript® Embedded Systems API Specification, 1st Edition (June 2021)

<a id="copyright"></a>
## Copyright

"COPYRIGHT NOTICE

© 2021 Ecma International

This document may be copied, published and distributed to others, and certain derivative works of it may be prepared, copied, published, and distributed, in whole or in part, provided that the above copyright notice and this Copyright License and Disclaimer are included on all such copies and derivative works. The only derivative works that are permissible under this Copyright License and Disclaimer are: 

(i)	works which incorporate all or portion of this document for the purpose of providing commentary or explanation (such as an annotated version of the document),

(ii)	works which incorporate all or portion of this document for the purpose of incorporating features that provide accessibility,

(iii)	translations of this document into languages other than English and into different formats and

(iv)	works by making use of this specification in standard conformant products by implementing (e.g. by copy and paste wholly or partly) the functionality therein.

However, the content of this document itself may not be modified in any way, including by removing the copyright notice or references to Ecma International, except as required to translate it into languages other than English or into a different format.

The official version of an Ecma International document is the English language version on the Ecma International website. In the event of discrepancies between a translated version and the official version, the official version shall govern.

The limited permissions granted above are perpetual and will not be revoked by Ecma International or its successors or assigns.

This document and the information contained herein is provided on an "AS IS" basis and ECMA INTERNATIONAL DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTY THAT THE USE OF THE INFORMATION HEREIN WILL NOT INFRINGE ANY OWNERSHIP RIGHTS OR ANY IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE."
