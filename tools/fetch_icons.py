import urllib.request
import re
import json
import os

icons = {
    "nmap": "https://unpkg.com/simple-icons@latest/icons/nmap.svg",
    "metasploit": "https://unpkg.com/simple-icons@latest/icons/metasploit.svg",
    "burpsuite": "https://unpkg.com/simple-icons@latest/icons/burpsuite.svg",
    "splunk": "https://unpkg.com/simple-icons@latest/icons/splunk.svg",
    "git": "https://unpkg.com/simple-icons@latest/icons/git.svg",
    "github": "https://unpkg.com/simple-icons@latest/icons/github.svg",
    "c": "https://unpkg.com/simple-icons@latest/icons/c.svg",
    "cplusplus": "https://unpkg.com/simple-icons@latest/icons/cplusplus.svg",
    "tenable": "https://unpkg.com/simple-icons@latest/icons/tenable.svg"
}

results = {}

for name, url in icons.items():
    try:
        print(f"Fetching {name}...")
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            svg_content = response.read().decode('utf-8')
            match = re.search(r'd="([^"]+)"', svg_content)
            if match:
                results[name] = match.group(1)
            else:
                results[name] = "Path not found"
    except Exception as e:
        results[name] = f"Error: {str(e)}"

print("\n--- RESULTS ---")
print(json.dumps(results, indent=2))

script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, "icons_paths.json")
with open(output_path, "w") as f:
    json.dump(results, f, indent=2)
print(f"\nSaved to {output_path}")
