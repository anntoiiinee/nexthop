#!/bin/sh
# nms : serveur de supervision du lab (syslog central et outils SNMP)
set -e
apk add -q --no-cache rsyslog net-snmp-tools
mkdir -p /var/log/network
rsyslogd -f /observability/rsyslog.conf
