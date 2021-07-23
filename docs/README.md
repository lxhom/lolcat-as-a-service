# Lolcat-as-a-Service  
An API to lolcat (and soon figlet, cowsay etc.) your text.  
  
> Note: Use https://laas.cf instead of https://LaaS.cf when using cURL.  
  
## Lolcat  
  
### Query parameters:  
Parameter | Required | Type | Effect | Default  
-|-|-|-|-
spread | No | float | Inclination of the rainbow stripes (character widths per line height. High values (>1000) give almost horizontal stripes, low values (0.1) almost vertical ones) | 8.0  
freq | No | float | Frequency of the rainbow (low values around  0.0001 give almost monochrome screens) | 0.3  
html | No | boolean | Use HTML tags instead of ANSI escape codes | false  
text | <kbd>GET</kbd> only | string | Text to lolcat | <kbd>POST</kbd> body  
  
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
