
<!-- Don't edit this file directly, use stackedit.io and publish it with the configuration in docs/template.handlebars -->
# Lolcat-as-a-Service (LaaS)  
An API to lolcat (and figlet, cowsay etc. coming soon!) your text.  
  
| [Source code](https://github.com/lxhom/lolcat-as-a-service) | [Hoster](https://deta.sh) | [Example request][example] |
| --- | --- | --- |

Backstory: A friend and I were talking about how a lot of older stuff is re-sold as an [EaaS](https://simple.wikipedia.org/wiki/Everything_as_a_service) and how ridiculous it is that M$ says that [Windows 365 (basically a Windows PC in M$'s cloud) "enables a variety of new scenarios for the new world of work"](https://www.microsoft.com/en-us/windows-365), even though VM's in the Cloud for personal usage have been around for a while. I jokingly said that we need Lolcat-as-a-service, and then I said, "screw it, I'm making this a thing". And here we are.
  
> Note for **cURL users**: Use **https://laas.cf instead of https://LaaS.cf** when using cURL because [**Deta**, the provider that hosts this service for free](https://deta.sh) **doesn't recognize uppercase URL's** and cURL sends the domain in uppercase if you type it in uppercase, unlike browsers like Chrome.
  
## Lolcat API
### Query parameters:  ([?][qp])
Parameter | Required | Type | Effect | Default  
-|-|-|-|-
spread | No | float | Inclination of the rainbow stripes (character widths per line height. High values (>1000) give almost horizontal stripes, low values (0.1) almost vertical ones) | 8.0  
freq | No | float | Frequency of the rainbow (low values around  0.0001 give almost monochrome screens) | 0.3  
html | No | boolean | Use HTML tags instead of ANSI escape codes | false  
text | <kbd>GET</kbd> only | string | Text to lolcat | <kbd>POST</kbd> body

### Special query param syntax  
  
You can request <kbd>GET</kbd> `/lolcat?[text]` with ***no other query params*** to emulate a <kbd>POST</kbd> request with the body set to `[text]`.
  
### Endpoint: <kbd>POST</kbd> `/`  
  
Alias for `/lolcat`. Use this endpoint with a text post body to lolcat the text. Example:  
  
```shell
curl -d "$(fortune)" https://laas.cf  
```  
  
### Endpoint: <kbd>POST/GET</kbd> `/lolcat`  
  
Use this endpoint with a text post body or the `text` parameter to lolcat the text. Example:  
  
```shell
curl -d "$(fortune)" https://laas.cf/lolcat # or  
curl "https://laas.cf/lolcat/\?text=$(fortune | urlencode)"  
```

## FIGlet
### Query parameters: ([?][qp])
Parameter | Required | Type | Effect | Default  
-|-|-|-|-
font | No | string | The FIGlet font to use (see [Fonts](#fonts)) | Standard
horizontalLayout, verticalLayout | No | string | The horizontal / vertical layout to use. Possible values: <ul><li>`default`: Does the kerning the way the font designer intended</li><li>`full`: Uses full letter spacing</li><li>`fitted`: Moves the letters together until they almost touch</li><li>`controlled smushing` & `universal smushing`: Common FIGlet kerning setups</li></ul> | default
width | No | number | Limit the width of the output. For example, if you want your output to be a max of 80 characters wide, you would set this option to 80. | -
whitespaceBreak | No | boolean | Works in conjunction with `width`, will attempt to break text up on whitespace when limiting the width. | false

### Special query param syntax  /!\ NOT YET IMPLEMENTED
  
You can request <kbd>GET</kbd> `/figlet?[text]` with ***no other query params*** to emulate a <kbd>POST</kbd> request with the body set to `[text]`.

### Fonts
 
 You can use every font from FIGlet.org. You can go to the [Font examples](http://www.figlet.org/examples.html) or to the [Font database](http://www.figlet.org/fontdb.cgi).
  
### Endpoint: <kbd>POST/GET</kbd> `/figlet`  /!\ NOT YET IMPLEMENTED
  
Use this endpoint with a text post body or the `text` parameter to lolcat the text. Example:  
  
```shell
curl -d "$(fortune)" https://laas.cf/figlet # or  
curl "https://laas.cf/figlet/\?text=$(fortune | urlencode)"  
```
## FAQ
### What are Query parameters?
- Query parameters are how you send key-value pairs in a URL. They are structured like this:
`?key=value` or `?key=value&second_key=second_value`. 
- You just append them after the path like this: `https://laas.cf/lolcat/?text=Hello`. 
- You might have to escape `?` and `&` when using your command-line like this: `?key=value&second_key=second_value`.
- You need to encode special characters that aren't `@`, `*`, `_`, `+`, `-`, `.` or `/`. Most browsers do that automatically, but you need a tool to encode it in the command like [`urlencode`](https://linux.die.net/man/1/urlencode), but you can use a <kbd>POST</kbd> with cURL if you don't want to encode stuff.

[qp]: #what-are-query-parameters
[example]: https://laas.cf/lolcat?html=true&freq=0.1&text=%20____________________________________________%20%0A/%20%20_%20%20%20%20%20%20%20%20%20%20_%20%20%20%20%20%20%20%20%20%20%20_%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%5C%0A%7C%20%7C%20%7C%20%20%20%20___%20%7C%20%7C%20___%20__%20_%7C%20%7C_%20%20%20%20__%20_%20___%20%20%20%20%7C%0A%7C%20%7C%20%7C%20%20%20/%20_%20%5C%7C%20%7C/%20__/%20_%60%20%7C%20__%7C%20%20/%20_%60%20/%20__%7C%20%20%20%7C%0A%7C%20%7C%20%7C__%7C%20%28_%29%20%7C%20%7C%20%28_%7C%20%28_%7C%20%7C%20%7C_%20%20%7C%20%28_%7C%20%5C__%20%5C%20%20%20%7C%0A%7C%20%7C_____%5C___/%7C_%7C%5C___%5C__%2C_%7C%5C__%7C%20%20%5C__%2C_%7C___/%20%20%20%7C%0A%7C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%20%20%20%20%20%20%20%20%20____%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20_%20%20%20%20%20%20%20%20%20%20%20%7C%0A%7C%20%20%20__%20_%20%20/%20___%7C%20%20___%20_%20____%20%20%20_%28_%29%20___%20___%20%20%7C%0A%7C%20%20/%20_%60%20%7C%20%5C___%20%5C%20/%20_%20%5C%20%27__%5C%20%5C%20/%20/%20%7C/%20__/%20_%20%5C%20%7C%0A%7C%20%7C%20%28_%7C%20%7C%20%20___%29%20%7C%20%20__/%20%7C%20%20%20%5C%20V%20/%7C%20%7C%20%28_%7C%20%20__/%20%7C%0A%7C%20%20%5C__%2C_%7C%20%7C____/%20%5C___%7C_%7C%20%20%20%20%5C_/%20%7C_%7C%5C___%5C___%7C%20%7C%0A%5C%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/%0A%20--------------------------------------------%20%0A%20%20%20%20%20%20%20%20%5C%20%20%20%5E__%5E%0A%20%20%20%20%20%20%20%20%20%5C%20%20%28oo%29%5C_______%0A%20%20%20%20%20%20%20%20%20%20%20%20%28__%29%5C%20%20%20%20%20%20%20%29%5C/%5C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%7C----w%20%7C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7C%7C%20%20%20%20%20%7C%7C%0A
