import { ProvisioningParams } from "../types";

/**
 * Generates the main ONU Config Script (deterministic, zero alteration).
 * Matches the exact CLI syntax used by ZTE OLTs.
 */
export function generateOnuConfigScript(p: ProvisioningParams): string {
  const [frame, slot, port] = p.frameSlotPort.split("/");
  const interfaceOlt = `gpon_olt-${frame}/${slot}/${port}`;
  const interfaceOnu = `gpon_onu-${frame}/${slot}/${port}:${p.onuId}`;
  const vport = `vport-${frame}/${slot}/${port}.${p.onuId}:1`;

  return `interface ${interfaceOlt}
onu ${p.onuId} type ZXHN-${p.onuType} sn ${p.serialNumber}
bind-onu ${p.onuId} profile line HSI-Nolimit
bind-onu ${p.onuId} profile service HSI-Nolimit
$
interface ${interfaceOnu}
name ${p.pppoeUsername}
$
interface ${vport}
service-port 1 user-vlan 1000 vlan 11 svlan ${p.svlan}
$
pon-onu-mng ${interfaceOnu}
security-mgmt 1 state enable mode forward protocol https
security-mgmt 2 state enable mode forward protocol telnet
security-mgmt 3 state enable mode forward protocol web
wan-ip ipv4 mode pppoe auth pap username ${p.pppoeUsername} password ${p.pppoePassword} vlan-profile HSI-VLAN host 1
wan 1 ethuni 1,2,3,4 ssid 1,5 service internet host 1
$`;
}
