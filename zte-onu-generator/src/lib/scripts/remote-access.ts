import { ProvisioningParams } from "../types";

/**
 * Generates the Remote Access Only Script.
 * Enables management protocols without full service configuration.
 */
export function generateRemoteAccessScript(p: ProvisioningParams): string {
  const [frame, slot, port] = p.frameSlotPort.split("/");
  const interfaceOnu = `gpon_onu-${frame}/${slot}/${port}:${p.onuId}`;

  return `pon-onu-mng ${interfaceOnu}
security-mgmt 1 state enable mode forward protocol https
security-mgmt 2 state enable mode forward protocol telnet
security-mgmt 3 state enable mode forward protocol web
$`;
}
