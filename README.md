# Personal portfolio page

This is a single-page, 'Portfolio Site' consisting of 6 sections:
- Home
- About
- Skills
- Tech Stack
- Projects
- Contact

The design is a 'Mobile First' responsive design that also support Tablet's and Desktop's. Breakpoints have been set at 650px for Tablet's & Small Desktop's, and 1024px for Medium & Large Desktop's.  
  
An additional content driven breakpoint has been set at 830px:  
- The 830px breakpoint achieves a smooth transition from the 'mobile full screen project card' as the card turns directly into two cards when passing the breakpoint. 
  
The site uses HTML5, CSS & JavaScript and the following Java Script 'user interaction' have been added:
1. Progress bar when user loads the page.
2. Hamburger menu.
3. A ResizeObserver has been added to the Header that updates the `scroll-padding-top` attribute when the header is resized, to achieve flawless scroll offset for the internal menu links.
4. Active menu indication
5. 'Expand/Collapse All' button to expand/collapse all 'Description' & 'Skills' details.
  
The site supports ‘dark theme’ (configured through operating system settings).  
  
Effort has been made to make the page print properly, by removing header & footer and inserting/assuring suitable page breaks.  
  
Both the cv.json and the GitHub API data is cached in Local Storage to improve performance and avoid hitting GitHub's API rate limit. The data in Local Storage is timestamped and 'invalidated' after 24h, to reflect the latest server content if the GitHub data is updated on the server.
  
All icons are 'svg formatted' to scale seamlessly with different screen resolutions. The profile picture and the 'artistic images' are webP formatted to achieve the best possible compression while preserving the details of the image, and the images are also available in png format as fallback in case webP is not supported by the browser. Fonts are hosted locally (as .woff2 files), desktop, tablet & mobile version of the profile picture is available, the landing-page fonts are preloaded and all images except landing page images are lazy loaded for improved performance.  
    
The site has been published on Netlify:  
Current Deploy Status:  
[![Netlify Status](https://api.netlify.com/api/v1/badges/7d25fc1a-246d-4031-a991-cba8f62c01c9/deploy-status)](https://app.netlify.com/sites/chas-henrik-u02-egen-portfoliosida/deploys)  
Link to site:  
[https://chas-henrik-u02-egen-portfoliosida.netlify.app/](https://chas-henrik-u02-egen-portfoliosida.netlify.app/)
  
A `_headers` file has also been added to the project to configure custom HTTP headers for the Netlify site. This is to eliminate console warnings for MS Edge, by setting the proper `Content-Type` & configuring cache for browsers and shared caches (e.g., Proxies, CDNs).

***
*Known problems:*
1. `break-inside: avoid-page` doesn't work properly on flex-boxes when printed from Safari. A workaround has been applied to alleviate the problem.
2. Lazy loaded images don’t show up in 'Print Preview' in Safari until they have been browsed on the page.
3. MS Edge issues a warning "A 'cache-control' header contains directives which are not recommended: 'must-revalidate'". This is coming from Netlify's default configuration, and seems to 'slip though' despite efforts to override it.
4. MS Edge issues a warning "Resources should use cache bursting but URL does not match configured patterns". The project currently do not use Cache Bursting since a build tool like Webpack, Gulp, or Grunt is needed to implement this (with a reasonable effort) for Netlify.
5. MS Edge issues an error "Response should include 'x-content-type-options' header for the https://esm.sh/octokit files". Since those files are hosted on an external site (without support for custom HTTP headers), the problem must be fixed there.  

*Notes:*
1. The Description & Skills details 'drop-down effect' is not supported on Firefox & Safari, since `interpolate-size: allow-keywords` is not supported by Firefox & Safari.
2. The Site has been performance optimized to achieve as good Lighthouse performance as possible, but there is still potential for further improvements. The cv.json and all GitHub API data could be downloaded in parallel to reduce the 'total load time' substantially when a brand new user enters the site. But if doing so, it is no longer possible to estimate the 'time to completion' in the Progress Bar, and for most cases the Progress Bar would not even be needed.  
3. Four fonts are preloaded to improve performance, and this might produce some warnings in the Firefox console.
4. MS Edge issues a warning that fetchpriority is not supported by Firefox, but fetchpriority has been supported by Firefox since Oct 29, 2024 (Ver. 132) (see [https://caniuse.com/?search=fetchpriority](https://caniuse.com/?search=fetchpriority)), so this warning is outdated and should be removed in MS Edge.

***

## Frågor:

### Vad kan man utveckla m.h.a av Javascript inom frontend?
Man kan utveckla interaktion & funktionalitet m.h.a JavaScript.  

Exempel på interaktion (med användaren):
1. Reagera på olika events (t.ex. click, mouseover, scroll, drag, drop)
2. Ändra, lägga till och ta bort HTML element
3. Visa & ta bort pop-ups

Exempel på funktionalitet:
1. Spara data i Local Storage
2. Spara data i backend databas
3. Kommunicera med backend m.h.a Rest API
4. Kommunicera med externa tjänster m.h.a API (väderdata, recept, AI)
5. Beräkningar i frontend (t.ex. bildbehandling)
  
  
### Vad är JSON och hur används det inom frontend?

JSON står för “JavaScript Object Notation” och är ett text format för att lagra och transportera data. JSON är särskilt utformat för att vara enkelt att läsa och skriva för både människor och maskiner. JSON består av nyckel-värde-par och använder en syntax som liknar JavaScript-objekt, vilket gör det väldigt lätt att arbeta med i webbutveckling, särskilt på frontend-sidan.  
  
I frontend används JSON för att utbyta data mellan webbläsaren och servern, hantera dynamisk data från API:er samt lagra konfigurationer.

JSON används bland annat för:
1. API-kommunikation : För att skicka och ta emot data från API:er. 
2. Data-navigering och rendering : Då JSON-data kan hämtas från en server och omvandlas direkt till ett JavaScript-objekt, så blir det enkelt att navigera och bearbeta data för att rendera dynamiskt innehåll i en webbsida. Notera att JSON-data kan innehålla länkar (URL:er) till annan JSON-data och detta används för data-navigering.
3. Lokalt lagrad data : JSON används för att cacha 'extern data' i webbläsarens “Local Storage” (m.h.a. `str = JSON.stringify(jsObj)`) för att snabbt kunna hämta cachat data från den lokala maskinen (m.h.a. `jsObj = JSON.parse(str)`).
4. Konfiguration och inställningar : Vissa frontendverktyg och bibliotek använder JSON data för sina konfigurationer och inställningar. 
5. Serialisering och deserialisering av data : JSON gör det möjligt att serialisera JavaScript-objekt till en textsträng, och detta behövs för att kunna skicka objekt i HTTP-anrop.
  
### Vad är HTTP och varför bör man som frontendutvecklare ha kunskap om det och dess protokoll?

Hypertext Transfer Protocol (HTTP) är det kommunikationsprotokoll som används för att överföra webbsidor, bilder, video och andra resurser från en webbsida till en webbläsare. HTTP är ett tillståndslöst protokoll där varje begäran och svar är oberoende av varandra och det finns olika versioner av protokollet, där de två vanligaste är HTTP/1.1 och HTTP/2.  
HTTP bygger på ett förfrågan/svar-förfarande mellan klient och server och kan t.ex. se ut så här: `GET /index.html HTTP/1.1`  
  
HTTP definierar nio kommandon som en klient kan skicka till en HTTP-server:
- **CONNECT** : Används för att sätta upp en tvåvägs kommunikation (tunnel) med servern. Används med proxy-servrar som kan fungera som SSL-tunnlar.
- **OPTIONS** : Returnerar en lista över de HTTP-kommandon som servern stöder.
- **HEAD** : Ber servern skicka information om den utpekade resursen utan att skicka själva innehållet i filen.
- **POST** : Används för att skapa en ny 'kollektion av resurser' på servern. Notera att om man skickar multipla POST kommandon, så kommer flera instanser av samma resurs att skapas.
- **GET** : Ber servern skicka den utpekade resursen (t.ex. fil eller resultatet av en programkörning, databasförfrågan eller motsvarande) till klienten.
- **PUT** : Används för att uppdatera en existerande resurs på servern.
- **PATCH** : Används för att patcha en resurs, dvs uppdatera en del av en resurs. Följande 'patch operationer' stöds: `test, remove, add, replace, move & copy`.
- **DELETE** : Raderar den utpekade resursen.
- **TRACE** : Ber servern att skicka tillbaka klientförfrågan precis i det skick som den anlände till servern.

Som frontendutvecklare behöver man kunskap om HTTP och dess protokoll för att förstå hur man hämtar data på ett effektivt sätt, och hur data skickas och skyddas i en webbapplikation, då detta förbättrar både användarupplevelsen och säkerheten.  
Och som frontendutvecklare bör man åtminstone känna till följande om HTTP och dess protokoll:
1. Klient-server kommunikation: Man behöver förstå hur förfrågningar och svar hanteras mellan klient och server.
2. HTTP metoder (GET, POST, PUT, PATCH, DELETE): Det är viktigt att förstå skillnaderna mellan HTTP's metoder när man arbetar med API-anrop i frontendkoden, så att man förstår vilken metod man bör använda i vilket sammanhang. Dessa metoder relaterar även till CRUD Operations (Create, Read, Update & Delete) som beskriver de fyra grundläggande operationerna i en databas.
3. HTTP-statuskoder: Statuskoder som 200 (OK), 404 (Not Found) och 500 (Server Error) ger information om resultatet av en förfrågan. Dessa är viktiga att känna till för att kunna hantera fel i frontendkoden och ge användaren rätt information om vad som sker.
4. Säkerhet (HTTPS): HTTPS är en säker version av HTTP som använder SSL/TLS-kryptering för att skydda datan som skickas mellan klient och server. Att förstå hur HTTPS fungerar är viktigt för att kunna göra säkra applikationer och se till att användardata skyddas.
5. Caching och prestanda: HTTP har inbyggda funktioner för caching som gör det möjligt att förbättra sidladdningstider och prestanda och som frontendutvecklare är det bra att förstå hur dessa fungerar, och hur man kan utnyttja dessa för att optimera webbplatsen.
