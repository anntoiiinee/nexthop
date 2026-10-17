$TTL 300
@       IN SOA  dns.corp.example.com. hostmaster.corp.example.com. (
                2026101701 ; numéro de série
                3600       ; refresh
                600        ; retry
                604800     ; expire
                300 )      ; TTL négatif
        IN NS   dns.corp.example.com.
dns     IN A    10.20.99.53
dhcp    IN A    10.20.99.10
r1      IN A    10.20.10.1
ns1     IN CNAME dns
