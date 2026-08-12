import json
import re

class ShowOutputParser:
    """Parses Cisco show command outputs into structured data structures."""

    @staticmethod
    def parse_show_outputs(raw_outputs):
        """Converts raw string or dict of show outputs into a unified lookup dict."""
        if isinstance(raw_outputs, str):
            try:
                return json.loads(raw_outputs)
            except Exception:
                return {"raw": raw_outputs}
        elif isinstance(raw_outputs, dict):
            return raw_outputs
        return {}

    @staticmethod
    def extract_ip_addresses(text):
        """Extracts IPv4 addresses with their context."""
        pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'
        return re.findall(pattern, text)

    @staticmethod
    def is_ip_in_subnet(ip, network_ip, netmask):
        """Checks if an IP falls within the given network and subnet mask."""
        try:
            import ipaddress
            net = ipaddress.IPv4Network(f"{network_ip}/{netmask}", strict=False)
            addr = ipaddress.IPv4Address(ip)
            return addr in net
        except Exception:
            return False
