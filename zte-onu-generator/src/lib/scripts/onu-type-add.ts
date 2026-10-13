import { ProvisioningParams } from "../types";

/**
 * Generates the ONU Type Add Script.
 * Used to register a new ONU type on the OLT if it does not already exist.
 */
export function generateOnuTypeAddScript(p: ProvisioningParams): string {
  return `onu-type ZXHN-${p.onuType}
  max-tcont 8
  max-gemport 32
  max-switch-port 4
  max-iphost 2
  max-veip 1
$
onu-type ZXHN-${p.onuType}
  tcont 1 name HSI type 4 max-bandwidth 1024000
  gemport 1 name HSI tcont 1
$`;
}
