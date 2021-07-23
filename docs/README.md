# Lolcat-as-a-Service
An API to lolcat (or figlet, cowsay etc.) your text.

> Note: Use https://laas.cf instead of https://LaaS.cf when using cURL.

## Lolcat

### Query parameters:
Parameter | Type | Effect | Default
-|-|-|-
spread | float | Inclination of the rainbow stripes (character widths per line height. High values
(>1000) give almost horizontal stripes, low values (0.1) almost vertical ones) | 8.0
freq | float | Frequency of the rainbow (low values around  0.0001 give almost monochrome screens) | 0.3
html | boolean | Use HTML tags instead of ANSI escape codes | false
text | string | Text to lolcat (<kbd>GET</kbd> only) | {<kbd>POST</kbd> BODY}

### <kbd>POST</kbd> `/`

Alias for `/lolcat`. Use this endpoint with a text post body to lolcat the text. Example:

```shell  
curl -d "$(fortune)" https://laas.cf
```

### <kbd>POST/GET</kbd> `/lolcat`

Use this endpoint with a text post body or the `text` parameter to lolcat the text. Example:

```shell  
curl -d "$(fortune)" https://laas.cf/lolcat # or
curl "https://laas.cf/lolcat?text=$(fortune | urlencode)"
```
