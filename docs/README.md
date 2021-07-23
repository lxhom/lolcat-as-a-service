# Lolcat-as-a-Service (LaaS)
An API to lolcat (and figlet, cowsay etc. coming soon!) your text.

<p align="center">[Source code](https://github.com/lxhom/lolcat-as-a-service) | [Hoster](https://deta.sh) | [Example request][example]</p>


> Note for cURL users: Use https://laas.cf instead of https://LaaS.cf when using cURL because [Deta, the provider that hosts this service for free (check them out, they're really cool and dont even require a credit card, and its completely free)](https://deta.sh) doesn't recognize uppercase URL's and cURL sends the domain in uppercase if you type it in uppercase, unlike browsers like Chrome

## Lolcat

### Query parameters:
Parameter | Type | Effect | Default
---|---|---|---
spread | float | Inclination of the rainbow stripes (character widths per line height. High values
(>1000) give almost horizontal stripes, low values (0.1) almost vertical ones) | 8.0
freq | float | Frequency of the rainbow (low values around  0.0001 give almost monochrome screens) | 0.3
html | boolean | Use HTML tags instead of ANSI escape codes | false
text | string | Text to lolcat (<kbd>GET</kbd> only) | {<kbd>POST</kbd> BODY}

### Special query param syntax

You can request <kbd>GET</kbd> `/[endpoint]?[text]` with ***no other query param's*** to emulate a <kbd>POST</kbd> request with the body set to `[text]`.

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

[example]: https://laas.cf/lolcat?html=true&freq=0.1&text=%20____________________________________________%20%0A/%20%20_%20%20%20%20%20%20%20%20%20%20_%20%20%20%20%20%20%20%20%20%20%20_%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%0A%7C%20%7C%20%7C%20%20%20%20___%20%7C%20%7C%20___%20__%20_%7C%20%7C_%20%20%20%20__%20_%20___%20%20%20%20%7C%0A%7C%20%7C%20%7C%20%20%20/%20_%20%5C%7C%20%7C/%20__/%20_%60%20%7C%20__%7C%20%20/%20_%60%20/%20__%7C%20%20%20%7C%0A%7C%20%7C%20%7C__%7C%20%28_%29%20%7C%20%7C%20%28_%7C%20%28_%7C%20%7C%20%7C_%20%20%7C%20%28_%7C%20%5C__%20%5C%20%20%20%7C%0A%7C%20%7C_____%5C___/%7C_%7C%5C___%5C__%2C_%7C%5C__%7C%20%20%5C__%2C_%7C___/%20%20%20%7C%0A%7C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%20%20%20%20%20%20%20%20%20____%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20_%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%20%20__%20_%20%20/%20___%7C%20%20___%20_%20____%20%20%20_%28_%29%20___%20___%20%20%7C%0A%7C%20%20/%20_%60%20%7C%20%5C___%20%5C%20/%20_%20%5C%20%27__%5C%20%5C%20/%20/%20%7C/%20__/%20_%20%5C%20%7C%0A%7C%20%7C%20%28_%7C%20%7C%20%20___%29%20%7C%20%20__/%20%7C%20%20%20%5C%20V%20/%7C%20%7C%20%28_%7C%20%20__/%20%7C%0A%7C%20%20%5C__%2C_%7C%20%7C____/%20%5C___%7C_%7C%20%20%20%20%5C_/%20%7C_%7C%5C___%5C___%7C%20%7C%0A%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/%0A%20--------------------------------------------%20%0A%20%20%20%20%20%20%20%20%5C%20%20%20%5E__%5E%0A%20%20%20%20%20%20%20%20%20%5C%20%20%28oo%29%5C_______%0A%20%20%20%20%20%20%20%20%20%20%20%20%28__%29%5C%20%20%20%20%20%20%20%29%5C/%5C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%7C----w%20%7C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%7C%20%20%20%20%20%7C%7C%0A