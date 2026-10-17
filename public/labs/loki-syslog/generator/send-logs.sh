#!/bin/sh
# Simule trois switches Arista qui envoient leurs journaux en syslog (RFC 3164) vers Alloy.
# Format d'un message : <priorité>date hôte processus: texte
#   priorité = facility × 8 + sévérité (facility local4 = 20 : 20 × 8 + 5 = 165 pour une notice)
send() { echo "<$1>$(date '+%b %e %H:%M:%S') $2 $3: $4" | nc -u -w1 alloy 1514; }

sleep 10
while true; do
  send 165 leaf1  Ebra "%LINEPROTO-5-UPDOWN: Line protocol on Interface Ethernet1 (spine1), changed state to down"
  send 165 spine1 Ebra "%LINEPROTO-5-UPDOWN: Line protocol on Interface Ethernet1 (leaf1), changed state to down"
  send 164 spine1 Bgp  "%BGP-4-ADJCHANGE: peer 10.0.1.1 (VRF default AS 65101) old state Established event Stop new state Idle"
  sleep 5
  send 165 leaf1  Ebra "%LINEPROTO-5-UPDOWN: Line protocol on Interface Ethernet1 (spine1), changed state to up"
  send 165 spine1 Ebra "%LINEPROTO-5-UPDOWN: Line protocol on Interface Ethernet1 (leaf1), changed state to up"
  send 165 spine1 Bgp  "%BGP-5-ADJCHANGE: peer 10.0.1.1 (VRF default AS 65101) old state OpenConfirm event Established new state Established"
  send 166 leaf2  Aaa  "%AAA-6-EXEC_LOGIN: User svc-netops logged in from 172.20.30.1 via ssh"
  send 163 leaf2  Fru  "%TRANSCEIVER-3-RX_POWER_LOW: Ethernet1 receive power -14.2 dBm below threshold -12.0 dBm"
  sleep 20
done
