/* ============================================================
   Jewish Venice — data
   Coordinates are approximate pin locations for map display.
   Google Maps links use place-name queries so they resolve to
   the real place card rather than a bare coordinate.
   ============================================================ */

const IMG = {
  ghetto:      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ghetto_%28Venice%29_Panorama.jpg/960px-Ghetto_%28Venice%29_Panorama.jpg',
  ghettoBridge:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Ponte_de_Gheto_Novo_%28Venice%29.jpg/960px-Ponte_de_Gheto_Novo_%28Venice%29.jpg',
  tedesca:     'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Exterior_of_the_Great_German_Syangogue%2C_Venice.jpg/960px-Exterior_of_the_Great_German_Syangogue%2C_Venice.jpg',
  canton:      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Scola_Canton_%28Venice%29.jpg/960px-Scola_Canton_%28Venice%29.jpg',
  italiana:    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Schola_Italiana_-_Ghetto_Nuovo_-_Facciata.jpg/960px-Schola_Italiana_-_Ghetto_Nuovo_-_Facciata.jpg',
  levantina:   'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Schola_levantina_Facciata.jpg/960px-Schola_levantina_Facciata.jpg',
  spagnola:    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Scola_spagnola_%28Venice%29.jpg/960px-Scola_spagnola_%28Venice%29.jpg',
  spagnolaIn:  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Spanish_Synagogue%2C_view_toward_the_ark.jpg/960px-Spanish_Synagogue%2C_view_toward_the_ark.jpg',
  museo:       'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Museoebraicove.baldari.museo_entrata_.jpg/500px-Museoebraicove.baldari.museo_entrata_.jpg',
  memorial:    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Holocaust_Memorial_Plaque%2C_Venice.jpg/960px-Holocaust_Memorial_Plaque%2C_Venice.jpg',
  sara:        'https://upload.wikimedia.org/wikipedia/commons/2/27/Sara_Copia_Sulam.jpg',
  rialto:      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Rialto_2025_4.jpg/960px-Rialto_2025_4.jpg',
  bovolo:      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Scala_Contarini_del_Bovolo_%28Venice%29.jpg/500px-Scala_Contarini_del_Bovolo_%28Venice%29.jpg',
  sanmarco:    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Venezia_%2829068150156%29.jpg/960px-Venezia_%2829068150156%29.jpg',
  basilica:    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Venezia_Basilica_di_San_Marco_Fassade_2.jpg/960px-Venezia_Basilica_di_San_Marco_Fassade_2.jpg',
  sighs:       'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Bridge_of_Sighs_sea_facade_night_2.jpg/960px-Bridge_of_Sighs_sea_facade_night_2.jpg',
  riva:        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Venice_%2830344368%29.jpg/960px-Venice_%2830344368%29.jpg',
  trovaso:     'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Rio_de_San_Trovaso_e_campo.jpg/960px-Rio_de_San_Trovaso_e_campo.jpg',
  pugni:       'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ponte_dei_pugni_%28Venice%29.jpg/960px-Ponte_dei_pugni_%28Venice%29.jpg',
  accademia:   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/LoveLockAccademia.jpg/960px-LoveLockAccademia.jpg',
  marcuola:    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Chiesa_San_Marcuola.jpg/960px-Chiesa_San_Marcuola.jpg',
  canal:       'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Canal_Grande_Panorama2.jpg/960px-Canal_Grande_Panorama2.jpg',
  vaporetto:   'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Vaporetti_Venice_Lagoon.jpg/960px-Vaporetti_Venice_Lagoon.jpg',
  gondola:     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Gondola_Ride.jpg/960px-Gondola_Ride.jpg'
};

/* helper for figure markup */
function fig(src, cap){
  return `<figure><img loading="lazy" src="${src}" alt="" onerror="this.closest('figure').style.display='none'">
          <figcaption>${cap}</figcaption></figure>`;
}
function jew(html){ return `<div class="jewbox"><span class="lbl">Jewish connection</span>${html}</div>`; }
function src(list){ return `<div class="srcline">Sources: ${list}</div>`; }

/* ============================================================
   1. ITINERARY STOPS
   ============================================================ */
const STOPS = [
  {
    n:'A', home:true, name:'Airbnb — Calle de la Pagia 1637', time:'9:30',
    lat:45.44520, lng:12.32460,
    q:'Calle de la Pagia, 1637, Cannaregio, 30121 Venezia VE, Italy',
    note:'Leave the apartment and walk toward the Grand Canal. <em>(Pin approximate — the link searches the street address, so it resolves to your door.)</em>',
    dur:''
  },
  {
    n:1, name:'San Marcuola / Casinò vaporetto stop', time:'9:30–9:40',
    lat:45.44225, lng:12.32765, q:'San Marcuola Casinò vaporetto stop, Venezia',
    note:'The closest Line 1 pier to the Ghetto — and to you.', dur:'',
    history:{
      title:'San Marcuola — the church with no saint, and the door to the Ghetto',
      img:[IMG.marcuola,'The unfinished brick façade of San Marcuola on the Grand Canal. <em>Didier Descouens, CC BY-SA 3.0, via Wikimedia Commons</em>'],
      body:`
<p><b>There is no Saint Marcuola.</b> The church is dedicated to <b>Hermagoras and Fortunatus</b>, protomartyrs of Aquileia — Hermagoras traditionally the first bishop of Aquileia and a disciple of St Mark, which matters enormously in a city that stole St Mark's body and built an empire on the association. "Marcuola" is simply what centuries of Venetian mouths did to <em>Ermagora e Fortunato</em>: the initial vowel drops, the stressed syllable softens, the <em>r</em> migrates, and two saints fuse into one invented singular — <em>Ermagora → Rmacora → Marcora → Marcuola</em>. Venice does this constantly (San Zanipolo for Santi Giovanni e Paolo, San Stae for Sant'Eustachio, San Trovaso for Santi Gervasio e Protasio). San Marcuola is the most extreme case, because the result no longer resembles either original name.</p>
<h5>The façade that never happened</h5>
<p>The building you see is 18th-century. <b>Antonio Gaspari</b> designed a reorientation so the front would address the Grand Canal; <b>Giorgio Massari</b> took over and completed the interior between <b>1728 and 1736</b>. In 1727 the Council of Ten authorised a public lottery to pay for it. It was not enough. Massari intended a stone front modelled on his own church of La Pietà; above the plinth, nothing was ever applied.</p>
<p><b>What faces the Grand Canal is raw brick — and this is the detail to look for from the boat.</b> You can still see the projecting ledges and putlog holes cut to receive marble cladding that never came, now permanently occupied by pigeons. It is the plainest thing on the canal, sitting just upstream of Ca' Vendramin Calergi (today the Casinò, where Wagner died in 1883). Unfinished façades are a Venetian genre — San Lorenzo, Sansovino's Misericordia — but rarely on the Grand Canal itself, where San Marcuola stands essentially alone.</p>
<h5>Inside, if you can get in</h5>
<p>A square nave under a barrel vault, eight Baroque altars set in pairs at the corners, and on the left wall of the apse <b>Tintoretto's <em>Last Supper</em> of 1547</b> — his first treatment of a subject he would return to at least nine times over forty-seven years. What makes it interesting is how <em>conventional</em> it is: the table runs parallel to the picture plane, Leonardo-fashion, frontal and orderly. Set that beside the 1592–94 <em>Last Supper</em> in San Giorgio Maggiore, where the table slashes diagonally into depth with servants and a cat in the foreground, and you have the whole arc of Tintoretto's career in one comparison. <em>(The commonly repeated "Titian at San Marcuola" story appears to be a straightforward conflation with this Tintoretto.)</em> The composer Johann Adolph Hasse and his wife, the mezzo-soprano Faustina Bordoni, are buried here. The church keeps very short hours and is frequently shut regardless — assume you will see it from the water.</p>
${jew(`<p><b>This is the Grand Canal's door to the Ghetto — a practical connection, not a historical one, and it is worth being honest about the difference.</b></p>
<p>From the pontoon you walk into Campo San Marcuola, west along Rio Terà San Leonardo — itself a filled-in canal — to the Ponte delle Guglie, right down the Fondamenta di Cannaregio, then duck into the low <em>sotoportego</em> on Calle di Ghetto Vecchio. That opens into the Ghetto Vecchio, and over one more bridge into the Campo del Ghetto Nuovo. <b>Roughly 500 metres, six to eight minutes — genuinely the shortest walk to the Ghetto from any Grand Canal landing.</b></p>
<p>Did the parish itself have a Jewish history? Essentially no — and the reason is interesting. The 1516 decree specified the Ghetto Nuovo "at San Hieronimo," the parish of San Girolamo, not San Marcuola: the Ghetto sat at the north-western edge of the parish system, deliberately peripheral. And the Jews displaced into it in 1516 had not been living in Cannaregio at all — the refugees who came in after Agnadello in 1509 had settled across the water in San Cassiano, Sant'Agostin and San Polo. <b>The Ghetto site was chosen precisely because it was an enclosed island away from where Jews had actually been living, and away from the Grand Canal spine.</b> San Marcuola's Jewish connection is that it is the door you step out of. Anyone claiming a deeper link is inflating it.</p>`)}
${src(`<a href="https://en.wikipedia.org/wiki/San_Marcuola" target="_blank" rel="noopener">Wikipedia</a> · <a href="http://churchesofvenice.com/cannaregio.htm" target="_blank" rel="noopener">Churches of Venice</a> · <a href="https://jvenice.org/en/jews-venice-the-origins/" target="_blank" rel="noopener">jvenice.org</a>`)}`
    }
  },
  {
    n:2, name:'Rialto Bridge', time:'9:55–10:30',
    lat:45.43797, lng:12.33593, q:'Ponte di Rialto, Venezia',
    note:'Classic views from both sides of the Grand Canal.', dur:'~30–35 min',
    history:{
      title:'The Rialto — a bank, a bridge, and the one place Jews were allowed to trade',
      img:[IMG.rialto,'The Rialto Bridge. <em>kallerna, CC BY-SA 4.0, via Wikimedia Commons</em>'],
      body:`
<p>The name is from <em>Rivoaltus</em>, "high bank" — the cluster of islets that stayed driest. The market moved there in 1097 and the crossing followed the money.</p>
<p>The first dry crossing was a <b>pontoon bridge of boats built in 1181</b> by the Lombard engineer Nicolò Barattieri, called the Ponte della Moneta. A wooden bridge replaced it in 1255, with a removable central section for masted ships. It then failed repeatedly: partly burned in <b>1310</b> when Bajamonte Tiepolo's conspirators fled across it after their coup collapsed; <b>collapsed in 1444</b> under the crowd packed on to watch a wedding procession; collapsed again in <b>1524</b>.</p>
<h5>The famous competition — most of the story is wrong</h5>
<p>Documented proposals came from <b>Palladio</b> (a five-arched scheme rejected for blocking navigation), Fra Giocondo, and <b>Vincenzo Scamozzi</b>, who submitted a three-arch design, later claimed authorship of the executed bridge, <em>and</em> publicly predicted a single span would fall down. <b>Michelangelo is legend</b> — he died in 1564, decades before the 1587–88 decision, and no drawing, contract or payment connects him to it.</p>
<p>The commission went to <b>Antonio da Ponte</b>, then about 78, chosen largely on his repairs to the Doge's Palace after the 1577 fire. He insisted on a single span. Built <b>1588–1591</b>, with the superstructure executed by his nephew <b>Antonio Contin</b> — who would go on to build the Bridge of Sighs.</p>
<h5>The engineering</h5>
<p>A single stone arch of about <b>28.8 m span rising only 6.4 m</b>, deliberately slender at the crown and weighted over the abutments to reduce horizontal thrust — because that thrust had to be absorbed by mud. Stones were cut so their bed joints sit perpendicular to the line of arch thrust; the patrician overseer Marc'Antonio Barbaro attacked this and wanted horizontal courses. Cost over <b>250,000 ducats</b>, on <b>6,000 piles per abutment</b>. Two ramps carry two rows of shops whose rents were meant to fund maintenance. It was the <b>only fixed crossing of the Grand Canal until 1854</b>.</p>
<h5>Europe's exchange</h5>
<p>The <em>banchi</em> — literally benches — on Campo San Giacomo were owned by the city and rented to bankers. Private houses dwindled to one, Pisani-Tiepolo, which failed in a run in 1584; the Senate advertised for bidders, got no takers, and created the <b>Banco della Piazza di Rialto on 11 April 1587</b>, one of Europe's earliest public banks. The proclamation column carried the <b>Gobbo di Rialto</b> (1541) — convicted cheats ran a gauntlet the length of the Mercerie and kissed the hunchback at the end.</p>
${jew(`<p><b>This is the one stop on the day with a deep, documented and central Jewish history.</b></p>
<p>Before 1516 Jews had no right of residence in Venice proper. From <b>1394</b> they could stay only <b>fifteen days at a time</b>, were barred from guilds and from owning property, and had to wear <em>"unum O zallum"</em> — a yellow O on the outer garment. Their permitted commercial foothold in the city was essentially <b>the Rialto</b>.</p>
<p>Crucially, <b>the Ghetto was a night prison, not a day prison</b>. The gates opened at dawn with the <em>marangona</em> bell and Jews went out into the city to work, wearing the mandated hat. So yes — Jews traded here, daily, for nearly three centuries.</p>
<p><em>Which</em> trade was legislated by "nation." <b>Tedeschi and Italiani</b> got pawnbroking at state-fixed rates, <em>strazzaria</em> (second-hand goods and rags) and medicine — nothing else. <b>Levantines</b>, Ottoman subjects in the Ghetto Vecchio from 1541, were explicitly <em>forbidden</em> pawnbroking and confined to long-distance trade. <b>Ponentines</b> — Iberian Sephardim — won the <b>1589 charter</b> after years of lobbying by the merchant Daniel Rodriga, guaranteeing they would "not be harassed because of their religion by any magistrates."</p>
<p><b>On Shylock.</b> "What news on the Rialto?" is Solanio's line in <em>The Merchant of Venice</em> 3.1; Shylock earlier says "in the Rialto you have rated me about my moneys and my usances." Shakespeare never went to Venice. Brian Pullan found a real 1567 Venetian suit involving a Jewish creditor and a 3,000-ducat loan, so the sum is not fantasy — <b>but the play's economics are inverted.</b> Venice's Jewish banks were low-interest, state-rate consumer pawnshops serving the poor, operated as a <em>condition of residence</em>, not merchant-finance houses. Francesca Trivellato notes the play also omits the one instrument that actually governed Rialto shipping risk — marine insurance — which would have made Shylock's bond pointless.</p>
<p>One more thing happened here. The <b>Talmud burnings of October 1553</b>, ordered by the bull of Julius III, are placed by sources at the Rialto and in Piazza San Marco.</p>`)}
${src(`<a href="https://en.wikipedia.org/wiki/Rialto_Bridge" target="_blank" rel="noopener">Wikipedia</a> · <a href="https://www.britannica.com/topic/Rialto-Bridge" target="_blank" rel="noopener">Britannica</a> · <a href="https://shc.stanford.edu/sites/default/files/2024-09/rofl-v07-2024-Trivellato.pdf" target="_blank" rel="noopener">Trivellato, "Which is the Merchant Here?"</a> · <a href="https://www.ghettovenezia.com/en/the-history/" target="_blank" rel="noopener">Ghetto Venezia</a>`)}`
    }
  },
  {
    n:3, name:'Scala Contarini del Bovolo', time:'10:50–11:25',
    lat:45.43457, lng:12.33477, q:'Scala Contarini del Bovolo, Venezia',
    note:'Spiral staircase and rooftop viewpoint. Timed entry — check ahead.', dur:'~30–35 min',
    history:{
      title:'The snail-shell staircase — an act of pure prestige',
      img:[IMG.bovolo,'Scala Contarini del Bovolo. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
      body:`
<p>The palazzo core is late Gothic, generally 14th century. Around <b>1499</b> Pietro Contarini commissioned the external spiral staircase that eventually gave the building — and his branch of the family — its name. <em>Bovolo</em> is Venetian for snail shell.</p>
<p><b>The attribution is genuinely unsettled.</b> The traditional name is Giovanni Candi, a Venetian master builder who died in 1506; an alternative is Giorgio Spavento, <em>proto</em> of San Marco. Italian civic and museum sources state outright that the paternity of the work is unknown.</p>
<h5>What you are looking at</h5>
<p>Roughly <b>26 metres</b> tall, <b>80 monolithic Istrian stone steps</b> climbing counterclockwise inside a cylindrical tower of alternating stone and exposed brick, pierced by five superimposed tiers of open arcades and capped by a belvedere cupola. The style is a deliberate hybrid — Renaissance capitals, Gothic construction technique, an essentially Veneto-Byzantine form.</p>
<p>Italian sources are blunt that it was <b>"an act of prestige"</b> with no functional necessity. And here is the single best thing to know while standing in the courtyard: <b>the site is landlocked.</b> Tucked away off Campo Manin, it has no Grand Canal façade to advertise from. Every other great family in Venice displayed its wealth horizontally, along the water. The Contarini had no water. <b>So they built vertically instead.</b></p>
<p>The family produced <b>eight doges</b> — more than any other house — and were among the <em>case vecchie</em>, the twelve "apostolic" founding families.</p>
<h5>The decline is the good part</h5>
<p>In the 19th century the palace was run as a lodging house, the "Maltese." From 1849 it passed through charitable hands, ending with the IRE, the Venetian public welfare body, which used it as administrative headquarters. By <b>1966</b> the World Monuments Fund had flagged the staircase — its central core was near collapse. A second campaign closed the monument in August 2015; it <b>reopened on 30 January 2016</b>. Orson Welles used the palazzo in his <em>Othello</em> as the exterior of Brabantio's house — Desdemona's family home.</p>
${jew(`<p><b>There is none, and it is worth saying so plainly.</b> No documented Jewish ownership, tenancy, financing or event attaches to this palace or staircase.</p>
<p>One correction is worth making instead of a connection worth manufacturing. <b>The stock line that Venetian patricians borrowed from Jewish bankers is largely wrong for Venice.</b> The Ghetto <em>banchi</em> were not merchant banks — they were pawnshops the community was <em>compelled</em> to operate, at capped interest and often at a loss, as an explicit condition of the <em>condotta</em>. They served the Venetian poor, not the nobility; patrician and state credit ran through Christian and public channels.</p>
<p>The only honest connection is chronological, and it is a chilling one. <b>In 1516 — seventeen years after this staircase went up — the Senate that men of this class dominated confined the city's Jews to the Ghetto Nuovo.</b></p>`)}
${src(`<a href="https://en.wikipedia.org/wiki/Palazzo_Contarini_del_Bovolo" target="_blank" rel="noopener">Wikipedia</a> · <a href="https://www.gioiellinascostidivenezia.it/en/scala-contarini-del-bovolo/" target="_blank" rel="noopener">Gioielli Nascosti di Venezia</a> · <a href="https://www.museivenezia.it/scala-contarini-del-bovolo/" target="_blank" rel="noopener">Musei Venezia</a>`)}`
    }
  },
  {
    n:4, name:'Piazza San Marco — exterior loop', time:'11:40–12:20',
    lat:45.43405, lng:12.33862, q:'Piazza San Marco, Venezia',
    note:'Basilica façade, Campanile, Clock Tower and Doge’s Palace from outside.', dur:'~35–40 min',
    history:{
      title:'The square that was an orchard, the saint who came in a barrel of pork',
      img:[IMG.basilica,'The façade of St Mark’s Basilica. <em>Zairon, CC BY-SA 4.0, via Wikimedia Commons</em>'],
      body:`
<p><b>It was an orchard with a canal running through it.</b> Part of the site belonged to the convent of San Zaccaria; the Rio Batario ran across it, and the church of San Geminiano stood on the far bank. Doge <b>Sebastiano Ziani</b> (r. 1172–78) filled in the rio, bought the orchard, demolished San Geminiano and rebuilt it far to the west — roughly doubling the square and leaving the cleared ground to the state. The present geometric pavement is <b>Andrea Tirali's, 1723</b>. <em>("The drawing room of Europe" is almost certainly not Napoleon's line; the earliest traced appearance is an 1844 French guidebook.)</em></p>
<h5>The theft of St Mark, 828</h5>
<p>Two Venetian merchants, Buono da Malamocco and Rustico da Torcello, removed the evangelist's body from Alexandria, packing the relics in a basket <b>under layers of pork</b> so that Muslim customs officers would recoil from inspecting it. The arrival of relics around 828–29 is secure; the pork detail comes from the <em>Translatio sancti Marci</em>, a frankly apologetic text written to justify a theft — a good story from a hagiographic source, not independently corroborated. The <em>"Pax tibi Marce, evangelista meus"</em> legend, an angel promising Mark rest in the lagoon, first appears in 13th-century sources: theology reverse-engineered to make the theft look like destiny. It is the text on the lion's open book.</p>
<h5>The horses</h5>
<p>At least <b>96.67% copper</b> — technically impure copper rather than bronze, which forced casting at 1200–1300°C but made mercury gilding possible. Dating is genuinely disputed between 2nd–3rd century Roman and Classical Greek. Their short backs and long legs show they were built to be seen from below. Looted in <b>1204</b> in the sack of Constantinople under Doge Enrico Dandolo; <b>the collars were added to hide where the heads had been severed for shipping</b>. Napoleon took them in 1797; they came back in 1815. Everything on the loggia today is a replica.</p>
<h5>The Campanile falls, 14 July 1902</h5>
<p>Cracks appeared on 12 July. The tell-tales monitoring them were found broken on the morning of the 14th. <b>The square was cleared at 09:30. Stones began falling at 09:47. At 09:53 the tower went down</b> — almost vertically, which is why the basilica was untouched, though the Loggetta was flattened. The only recorded fatality was the custodian's cat. The council voted <em>that same evening</em> to rebuild <em>"dov'era e com'era"</em> — where it was, as it was. It reopened on <b>25 April 1912</b>, St Mark's Day. Of five bells cast in 1820, only the <b>Marangona</b> survived — and that bell matters to this itinerary more than you'd think.</p>
${jew(`<p><b>First, an honest answer to the question everyone asks.</b> On whether Jews were barred from the Piazza: no source documents a standing prohibition, and it would be wrong to invent one. The well-attested constraints were the curfew, the hat, exclusion from guilds and property ownership, restriction of trades, and — before 1516 — the fifteen-day visit limit.</p>
<p>The Ghetto was locked at night, not by day. <b>The gates opened at dawn at the ringing of the <em>marangona</em> — the great Campanile bell that survived the 1902 collapse and still hangs above this square.</b> In between, Jews moved through the city on business.</p>
<p><b>The head covering, with dates:</b> a yellow O on the outer garment from <b>1394</b>; a <b>yellow hat from 1496</b> — because a badge could be hidden and a hat could not; a <b>red hat from around 1500</b> in Venetian territories, though Encyclopaedia Judaica says the reason and exact date are undocumented. Levantine Jews kept yellow. Physicians were exempted with a black hat. The red <em>berretta</em> outlived its legal force, surviving as customary dress for rabbis and elderly men.</p>
<p><b>The real Jewish connection to this square is institutional, and it is significant.</b> The Republic's business with Jewish merchants was transacted in the Doge's Palace, on this Piazza — in the Collegio and the Senate. The Sephardi merchant <b>Daniel Rodriga</b> spent years petitioning those chambers, producing the <b>1589 charter</b> admitting Levantine and Ponentine merchants on renewable safe-conducts, <b>with no inquiry into their religious past</b> and explicit protection from magistrates on religious grounds. <b>Venice's tolerance was calculated, and it was calculated here.</b></p>
<p>And here too, in October 1553, the Talmud was burned.</p>`)}
${src(`<a href="https://en.wikipedia.org/wiki/Piazza_San_Marco" target="_blank" rel="noopener">Wikipedia</a> · <a href="https://en.wikipedia.org/wiki/Horses_of_Saint_Mark" target="_blank" rel="noopener">Horses of Saint Mark</a> · <a href="https://link.springer.com/article/10.1007/BF01695218" target="_blank" rel="noopener">Ravid, "From Yellow to Red"</a> · <a href="https://jvenice.org/en/jews-venice-the-origins/" target="_blank" rel="noopener">jvenice.org</a>`)}`
    }
  },
  {
    n:5, name:'Bridge of Sighs + Riva degli Schiavoni', time:'12:35–12:55',
    lat:45.43405, lng:12.34096, q:'Ponte dei Sospiri, Venezia',
    note:'Ponte della Paglia is the viewpoint; then the waterfront promenade.', dur:'~20 min',
    history:{
      title:'The bridge nobody sighed on, and the quay named for free Dalmatians',
      img:[IMG.sighs,'The Bridge of Sighs. <em>kallerna, CC BY-SA 4.0, via Wikimedia Commons</em>'],
      body:`
<p>An enclosed Istrian stone footbridge over the Rio di Palazzo, built in the early 1600s under Doge Marino Grimani, whose coat of arms is carved on the central band. The architect was <b>Antonio Contin</b>, nephew of the man who built the Rialto a decade earlier.</p>
<p>Inside it is <b>not one passage but two narrow parallel corridors divided by a thick wall</b>, so that groups moving in opposite directions never met. The famous windows are <b>pierced stone grilles, not glass</b> — designed to be unclimbable, not scenic.</p>
<h5>Byron, and why the romantic story fails</h5>
<p><em>Childe Harold's Pilgrimage</em> (1818) opens: <em>"I stood in Venice, on the Bridge of Sighs; / A palace and a prison on each hand."</em> Two corrections. First, Byron probably <b>popularised rather than coined</b> the name — <em>Ponte dei Sospiri</em> is attested in Italian sources before he was born. Second, and more importantly: <b>the image of condemned men taking a last look at Venice is chronologically wrong.</b> By 1600 this bridge fed the New Prisons, housing mostly minor offenders. The great state prisoners were held inside the palace, in the <em>Pozzi</em> and the <em>Piombi</em> — they never used this bridge. And Venice's public executions took place between the two columns of the Piazzetta, in full view. <b>The bridge was secure prisoner-transfer infrastructure, built precisely to keep prisoners out of public sight.</b></p>
<p>A detail worth telling: da Ponte's project for the New Prisons was accepted, but the Council of Ten seriously considered a rival scheme by <b>Zaccaria Briani — a prisoner then serving twenty-two years for homicide.</b> The final building borrowed from both, and Briani got three years off his sentence, on condition he remain available for consultation.</p>
<p><b>Casanova did not cross this bridge.</b> Arrested 26 July 1755 and sentenced to five years without trial and without being told why, he escaped the Piombi on the night of 31 October 1756 by boring through the ceiling and prising apart the lead roof plates. He went up and out through the roof. The bridge is not part of his story. <em>(The kissing legend is modern — its earliest documented statement is the 1979 film</em> A Little Romance<em>.)</em></p>
<h5>Riva degli Schiavoni</h5>
<p><em>Schiavoni</em> meant <b>Dalmatians</b> — Dalmatia was <em>Schiavonia</em> under the Republic — and it was Dalmatian merchants and sailors, subjects of the <em>Stato da Mar</em>, who moored here. <b>On the slavery question, which visitors always ask:</b> the etymology is real — medieval Latin <em>sclavus</em>, "Slav," became the word for "slave" — and Venice did run a substantial slave trade. But that trade moved captives from Black Sea ports to Egypt. <b>There is no evidence this quay was a slave market.</b> The Schiavoni it is named for were free Dalmatian subjects, reckoned among the best sailors in the Venetian fleet.</p>
<p>The best anecdote on the whole waterfront concerns the Danieli site. <b>In 1172 Doge Vitale Michiel II was stabbed here.</b> As punishment the assassin's house was razed and a decree forbade any stone building on the spot <b>in perpetuity</b> — only single-storey wooden structures. <b>That prohibition was honoured until 1948.</b></p>
${jew(`<p><b>There is no Jewish building or documented event on the Riva itself</b> — and that absence is informative. Jews were confined to Cannaregio from 1516 and locked in at night; a quay a mile away in Castello was not their ground.</p>
<p>But there is a genuine maritime link. On <b>2 June 1541</b> the Republic granted the Ghetto Vecchio to the <b>Levantine</b> Jews — Ottoman subjects — <b>precisely because they were valuable in seaborne trade with the Levant</b>, and they arrived in Venice by ship into the Bacino di San Marco that this quay fronts. In 1579 the Ponentine merchant <b>Daniel Rodriga</b> petitioned the Senate to admit fifty families of Jewish merchants; the charter came in 1589. Rodriga also promoted the <b>Split free-port scheme</b>, which redirected Balkan overland trade through Dalmatia to Venice — <b>a Jewish merchant's plan reshaping the very Dalmatian traffic that gave this quay its name.</b></p>
<p>A hundred metres away, in the Doge's Palace, sat the <b>Venetian Inquisition</b> — and it was a peculiar body. Created on 22 April 1547, it seated three clerics alongside <b>three lay Venetian magistrates</b>, and without the lay deputies' participation proceedings were invalid. The Republic built a veto over the Inquisition into the Inquisition. Jurisdiction ran only over baptised Christians, so its Jewish-adjacent business was Iberian New Christians accused of Judaizing — about 5% of cases. Eighteen executions among roughly 1,560 documented 16th-century trials, carried out <b>secretly, by drowning in the lagoon</b>, because the Republic did not want autos-da-fé damaging its reputation for tolerance.</p>
<p><b>On the Second World War: nothing connects the Riva or the Hotel Danieli to the deportations.</b> The roundup of 5 December 1943 was citywide; detainees were held at Santa Maria Maggiore prison, on the Giudecca, and at the Collegio Marco Foscarini. Do not let anyone tell you otherwise.</p>`)}
${src(`<a href="https://en.wikipedia.org/wiki/Bridge_of_Sighs" target="_blank" rel="noopener">Wikipedia</a> · <a href="https://bestveniceguides.it/en/2023/05/30/the-prisons-of-the-doges-palace-in-venice-how-and-who-designed-them-and-who-escaped/" target="_blank" rel="noopener">Best Venice Guides</a> · <a href="https://en.wikipedia.org/wiki/Venetian_Holy_Inquisition" target="_blank" rel="noopener">Venetian Holy Inquisition</a> · <a href="https://jvenice.org/en/racial-laws-and-shoah/" target="_blank" rel="noopener">jvenice.org — Racial Laws and Shoah</a>`)}`
    }
  },
  {
    n:6, name:'Libreria Acqua Alta', time:'13:15–13:50',
    lat:45.43617, lng:12.34220, q:'Libreria Acqua Alta, Calle Longa Santa Maria Formosa, Venezia',
    note:'The bookshop with a gondola full of books. Crowded — go early in the slot.', dur:'~25–35 min',
    history:{
      title:'Books in a gondola — and the city that printed the Talmud',
      body:`
<p>Calle Longa Santa Maria Formosa 5176/b, Castello. Founded in <b>2002</b> by <b>Luigi Frizzo</b>, a native of Trissino in the province of Vicenza. <em>(Several press accounts say 2004; the shop's own site and Wikipedia say 2002. The claim that Frizzo was a gondolier appears in many articles and is not supported by any source I could find.)</em></p>
<p>The concept is a practical response to a physical problem, not a decorating scheme: <b>books stored above floor level</b> in a full-size gondola, in bathtubs, canoes, small boats and plastic bins, so that when the tide comes through the shop the stock floats or stays dry. Roughly <b>400,000 volumes</b>. There is a resident cat, Cocolina, plus a colony that moved in of its own accord. A back door opens directly onto the <em>rio</em>, with a deadpan <b>"emergency exit" sign pointing at the water</b>. In the courtyard, the staircase built from water-ruined encyclopedias is Frizzo's own improvisation: <em>"The staircase was created to store encyclopedias… I would never have imagined that what I considered a simple practical solution would have had so much success."</em></p>
<h5>12 November 2019</h5>
<p>The tide peaked at <b>187 cm</b> at Punta della Salute — the second-highest since systematic records began in 1923, behind the 194 cm of November 1966. What made that week exceptional was not one peak but <b>three tides above 140 cm within days</b>. Staff described the damage as "thousands of books" lost. Diana Zanda said at the time: <em>"It's been a drama here, as everywhere else in the city"</em> — and credited the rescue to students, <em>"from every school and every university faculty."</em></p>
<p>The shop is open and still registered to Frizzo. Staff report 2,000–5,000 visitors on busy days, now limit how long people can pose on the book staircase, and require groups of ten or more to call ahead.</p>
${jew(`<p><b>This is a bookshop founded in the 2000s and it has no Jewish history whatsoever.</b> But you are standing in a bookshop in Venice, so the adjacent story is irresistible — and it belongs to the city, five centuries earlier.</p>
<p><b>Venice was the world capital of Hebrew printing.</b> <b>Daniel Bomberg</b>, a Christian from Antwerp, ran a press here from <b>1515 to 1548</b>, receiving an exclusive Talmud privilege from the Senate in 1518; when renewal was refused in 1525 he bought it back for 500 ducats. His press produced the <b>first complete printed Babylonian Talmud, 1519/20–1523</b>, in twelve volumes.</p>
<p><b>And his foliation and page layout — text in the centre, Rashi on the inner margin, Tosafot on the outer — is still the standard in every conventional edition printed since.</b> Every daf yomi shiur in the world today opens a page laid out in Venice by a Christian from Antwerp. It is the most durable single artefact the Venetian Jewish world produced.</p>
<p>He worked with Jewish and convert collaborators including Felice da Prato and <b>Cornelio Adelkind</b> (born Israel ben Baruch). The patrician Marco Antonio Giustiniani ran a rival Hebrew press from 1545 and poached Bomberg's staff; the commercial feud helped provoke the denunciation to Rome. <b>Julius III's bull of August 1553</b> ordered the seizure of the Talmud, and <b>the burning in Venice took place in October 1553</b>, at the Rialto and in Piazza San Marco. Hebrew printing in Venice was banned for about a decade and never fully recovered — yet even so, roughly <b>a third of all Hebrew books printed in Europe before 1650 were made in Venice</b> (1,284 of 3,986).</p>
<p><b>One correction worth making:</b> sites saying the Ghetto "hosted" these presses are misleading. Jews were barred from owning printing houses in Venice, so Hebrew books were produced in <b>Christian-owned shops in the city's printing district</b>, with Jewish editors, correctors and typesetters working there under permit.</p>`)}
${src(`<a href="https://www.libreriacqualta.it/en/the-bookstore/" target="_blank" rel="noopener">Libreria Acqua Alta</a> · <a href="https://www.nationalgeographic.com/travel/article/libreria-acqua-alta-venice-italy" target="_blank" rel="noopener">National Geographic</a> · <a href="https://en.wikipedia.org/wiki/Daniel_Bomberg" target="_blank" rel="noopener">Daniel Bomberg</a> · <a href="https://primolevicenter.org/printed-matter/bound-in-venice-the-first-talmud/" target="_blank" rel="noopener">Primo Levi Center — Bound in Venice</a>`)}`
    }
  },
  {
    n:7, name:'San Zaccaria vaporetto stop', time:'13:50–14:10',
    lat:45.43349, lng:12.34196, q:'San Zaccaria vaporetto stop, Venezia',
    note:'Back to the waterfront to catch the boat west.', dur:''
  },
  {
    n:8, name:'Zattere vaporetto stop', time:'14:35',
    lat:45.43005, lng:12.32690, q:'Zattere vaporetto stop, Venezia',
    note:'Arrive on the Giudecca Canal side of Dorsoduro.', dur:''
  },
  {
    n:9, name:'Squero di San Trovaso', time:'14:40–14:55',
    lat:45.43072, lng:12.32617, q:'Squero di San Trovaso, Venezia',
    note:'Historic gondola boatyard, viewed from across the canal. Best angle: Fondamenta Nani.', dur:'~10–15 min',
    history:{
      title:'A piece of the Alps that floated downriver',
      img:[IMG.trovaso,'Rio and campo di San Trovaso. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
      body:`
<p>A <em>squero</em> has operated on this spot <b>since the 17th century</b>. The yard is today owned by the Comune di Venezia and is one of only about <b>six functioning squeri left in the city</b> — fewer than five of which still build gondolas as their primary work. San Trovaso turns out <b>roughly one new gondola a year</b>; a team of five works about forty-five days on the hull, using a permanent wooden form called the <em>cantiér</em>, with timber seasoned at least a year.</p>
<h5>Why it looks like a chalet</h5>
<p>This is the best architectural fact on the site and it is well supported. Venice's shipbuilding timber came down the Piave from <b>Cadore</b>, in the Dolomites — <b>and the woodworkers came down with it</b>. They built in the idiom they knew: timber-framed, balconied, overhanging eaves, producing structures that are among the very few substantially wooden buildings in a city of brick and Istrian stone. <b>Stand on the Fondamenta Nani and you are looking at a piece of the Alps that floated downriver.</b></p>
<h5>The asymmetry</h5>
<p>The gondola is not symmetrical. <b>The port side is roughly 24–25 cm longer</b> than the starboard, and the hull is banked, so that a single oarsman rowing on the right in <em>voga alla veneta</em> drives the boat <b>straight instead of in a circle</b>. About 11 m long, 350–400 kg for the bare hull, <b>280 hand-cut pieces</b> in <b>eight woods</b> — oak, elm, larch, fir, cherry, walnut, lime and mahogany.</p>
<p><b>The <em>ferro</em>, and a myth.</b> Six forward prongs, one backward, a curved crest. The popular reading — six sestieri, Giudecca, the Doge's <em>corno</em> — is traditional and almost certainly retrospective: historic photographs and paintings show ferri with four and five teeth, and Venetian craft accounts derive the teeth from the heads of the nails fastening a plain protective plate to the prow. Its real, uncontested function is <b>ballast</b>, counterweighting the gondolier at the stern.</p>
<p><b>Black.</b> On 8 October 1562 the Senate legislated against competitive display in gondola decoration and required them painted black. There were perhaps 10,000 gondolas then. Today there are <b>433 licensed gondolier positions</b> — a genuine <em>numero chiuso</em> — raised to 440 in March 2025, the first increase in a long time.</p>
${jew(`<p><b>There is no specific Jewish connection to this squero.</b> Saying otherwise would be invention.</p>
<p>The accurate context: Venetian craft production was organised through the <em>arti</em> — <b>closed Christian guilds with confraternal religious obligations</b>, patron saints, altars and funeral rites, from which Jews were structurally excluded. Jewish economic life was governed instead by the <em>condotte</em>, which confined permitted activity to a narrow list: pawn-lending, <em>strazzaria</em>, medicine, Hebrew printing, and — for Levantine and later Ponentine merchants — long-distance trade. Boatbuilding sat squarely outside that list.</p>
<p><b>The one real point of contact runs the other way, and it is worth telling.</b> The decree of 29 March 1516 required the Ghetto's water frontages to be walled and its outward-facing quays bricked over, and mandated round-the-clock guarding — <b>including boats patrolling the surrounding canals at night, paid for by the Jewish community itself.</b> So Jews financed the boats that policed them. That is the honest connection between Jewish Venice and the city's small craft: not building them, but being watched from them.</p>`)}
${src(`<a href="https://it.wikipedia.org/wiki/Squero_veneziano" target="_blank" rel="noopener">Squero veneziano</a> · <a href="https://www.britannica.com/technology/gondola-boat" target="_blank" rel="noopener">Britannica</a> · <a href="https://veneziaautentica.com/venice-gondola/" target="_blank" rel="noopener">Venezia Autentica</a>`)}`
    }
  },
  {
    n:10, name:'Ponte dei Pugni / Campo San Barnaba', time:'15:10–15:25',
    lat:45.43277, lng:12.32603, q:'Ponte dei Pugni, Venezia',
    note:'Look for the four white marble footprints set into the crown.', dur:'~10–15 min',
    history:{
      title:'The war of the fists',
      img:[IMG.pugni,'Ponte dei Pugni, with the marble footprints on the crown. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
      body:`
<p>Venice's plebeian population was split for centuries between the <b>Nicolotti</b> and the <b>Castellani</b>, wearing black and red. The popular account — Nicolotti from the far west, Castellani from Castello and the Arsenale — is broadly right but too tidy. Robert C. Davis, whose <em>The War of the Fists</em> is the standard scholarly treatment, shows <b>faction identity followed occupation and parish</b>: the Nicolotti core was deep-sea fishermen and casual labourers, the Castellani core Arsenal shipwrights and caulkers.</p>
<h5>How the fighting worked</h5>
<p>Combat ran in a season, roughly September to Christmas, and had formal structure. The <b><em>mostra</em></b> was the opening sequence of single duels — usually three rounds, though a proud fighter might demand five, seven or ten — <b>fought one-handed with the left forearm shielding the face, and won by drawing blood: "busting the moustache."</b> Then came the <b><em>frotta</em></b>, the general melee, which could run twenty minutes to three hours as control of the bridge changed hands. Its signature was the <em>groppo</em>, a scrum of hundreds shoving in a compressed mass until it gave way and collapsed into the canal. Behind this sat real organisation: <em>capi</em> leading neighbourhood squads of about fifty, and <em>padrini</em> acting as match-makers and generals. <b>The fighting surface here was about 17 by 50 feet.</b></p>
<p>Venetian bridges of the period had <b>no parapets</b> — which is exactly why they served: the object was to put your opponents in the water and hold the deck. <b>The four white marble footprints</b> set into the crown mark the champions' starting positions and are still there.</p>
<h5>The end</h5>
<p>The state's position was two-faced. The Council of Ten prohibited the fights as early as 1505 and in 1644 enacted maximum penalties of five years chained in the galleys. <b>And yet the battles grew larger through the 17th century, and the government itself staged them to entertain visiting ambassadors and princes.</b></p>
<p>It ended on <b>29 September 1705</b>. The last great <em>battagliola</em> degenerated when spectators began hurling roof tiles down onto the combatants and the fighters drew knives. <b>In the chaos nobody noticed the nearby church of San Girolamo catching fire; it burned down.</b> That was the end. The energy was redirected into the <em>regate</em> and the <em>forze d'Ercole</em>, the acrobatic human pyramids built on boats — safer, and conveniently still spectacular for foreigners.</p>
<h5>Two film notes, both true</h5>
<p><em>Indiana Jones and the Last Crusade</em> used the façade of San Barnaba as the library where Indy finds Sir Richard's tomb. And in David Lean's <em>Summertime</em> (1955), <b>Katharine Hepburn</b> steps backwards while photographing and falls into this canal. <b>Hepburn insisted on doing it herself.</b> Lean had the water dosed with disinfectant — enough to make it foam — and Hepburn was coated in Vaseline for the repeated takes. Her eyes began itching that evening and <b>she developed a chronic conjunctivitis that stayed with her for the rest of her life.</b></p>
${jew(`<p><b>There is no Jewish connection to the guerre dei pugni</b>, and there is a hard structural reason. The Nicolotti and Castellani were parish-based, confraternally Christian, occupational factions. Jews were confined to the Ghetto from 1516 and <b>locked in at nightfall</b> — and the fights ran into the evening. They could not have taken part even had they been welcome.</p>
<p><b>On the <em>barnabotti</em> and Jewish credit</b> — the impoverished patricians of this parish, housed at state expense, barred from trade, retaining their hereditary seats in the Great Council and notoriously purchasable — the theory that they borrowed from Ghetto bankers <b>has no evidence behind it and a structural reason to doubt it.</b> The Ghetto <em>banchi</em> were obliged pawnshops lending small sums to the Venetian poor at state-capped rates. That is consumer pawn-lending against pledged goods, not a source of aristocratic credit. Patrician borrowing ran through Christian institutions, family networks and the state itself.</p>`)}
${src(`<a href="https://en.wikipedia.org/wiki/Ponte_dei_Pugni" target="_blank" rel="noopener">Wikipedia</a> · <a href="https://publicdomainreview.org/collection/venice-bridge-fights/" target="_blank" rel="noopener">Public Domain Review</a> · <a href="https://en.wikipedia.org/wiki/Summertime_(1955_film)" target="_blank" rel="noopener">Summertime (1955)</a>`)}`
    }
  },
  {
    n:11, name:'Accademia Bridge', time:'15:40–16:10',
    lat:45.43159, lng:12.32873, q:"Ponte dell'Accademia, Venezia",
    note:'One of the best Grand Canal views in the city.', dur:'~25–30 min',
    history:{
      title:'As temporary as the Accademia bridge',
      img:[IMG.accademia,'The Accademia Bridge. <em>Etan J. Tal, CC BY-SA 3.0, via Wikimedia Commons</em>'],
      body:`
<p>This was the <b>second</b> bridge over the Grand Canal, not the third — for roughly three centuries the Rialto was the only crossing. Under Austrian rule the English engineer <b>Alfred Neville</b>, who ran an iron foundry in Venice, built the Accademia crossing, <b>opened 20 November 1854</b>.</p>
<p>Neville's single iron span of about 50 m was disliked from the start. Aesthetically it read as industrial and un-Venetian. Practically the objection was decisive: at roughly 4 m of clearance <b>it was too low for the vaporetti</b>, and by the 1930s it was corroding.</p>
<h5>The most permanent temporary structure in Europe</h5>
<p>A national competition for a stone replacement was won by Duilio Torres with the engineer Ottorino Bisazza. But rather than leave the crossing gone, the authorities asked <b>Eugenio Miozzi</b> for a stopgap in wood. <b>He delivered it in 37 days</b> — 10 December 1932 to 15 January 1933 — and it opened on 15 February 1933, then the largest wooden arch bridge in Europe. Then the war came, the Torres–Bisazza scheme was never executed, and the temporary bridge simply stayed.</p>
<p><b>Venetians coined a phrase for it: <em>provvisorio come il ponte dell'Accademia</em></b> — "as temporary as the Accademia bridge," for anything that becomes permanent through inertia.</p>
<p>It has been rebuilt around Miozzi's silhouette rather than preserved: steel reinforcement in 1948; between 1984 and 1986 a <b>structural steel core with the wood reduced to cladding</b>, because maintaining a genuinely wooden bridge in salt air had become prohibitive; a further restoration reinaugurated in 2018. So: <b>an 1854 idea, a 1933 profile, a 1986 skeleton, a 2018 skin. No permanent bridge has ever been built.</b></p>
<h5>Veronese and the Inquisition — the best story in the Gallerie</h5>
<p>In 1571 fire destroyed Titian's <em>Last Supper</em> at Santi Giovanni e Paolo. Veronese produced a replacement of 555 × 1,309 cm, crowded with incident. Months later he was summoned before the Venetian Holy Office and pressed on why a <em>Last Supper</em> contained <b>"buffoons, drunken Germans, dwarfs and other such scurrilities."</b> His defence was an artist's: the canvas was enormous, he had space to fill, and the offending figures stood far enough from Christ to leave the sacred subject untouched. The tribunal was unpersuaded and ordered him to correct the painting within three months at his own expense.</p>
<p><b>He changed not a brushstroke. He changed the title</b> — reframing the scene as the feast in the house of <b>Levi</b>, the tax collector, a meal where Scripture itself specifies that "publicans and sinners" were present. Germans, dwarfs and drunkards were now doctrinally in order. <b>The Holy Office accepted it and closed the case.</b></p>
${jew(`<p>The Veronese story is about the <b>Venetian Holy Office</b>, and the way it worked matters for Jewish history. Created by a compromise of 22 April 1547, it seated six: three clerics and <b>three lay Venetian magistrates, the <em>savi all'eresia</em></b> — senators, often former Council of Ten members or ambassadors to Rome. <b>Without at least one <em>savio</em> present, proceedings were invalid.</b> The Republic had built a veto over the Inquisition into the Inquisition.</p>
<p>The consequences for Jews were concrete. Roughly <b>5% of Venetian Inquisition cases touched Jews at all</b>, and jurisdiction ran in principle over baptised Christians only. Its Jewish-adjacent targets were therefore conversos and Portuguese New Christians accused of Judaizing — keeping dietary laws, refusing work on the Sabbath, failing to show reverence to images. <b>Professing Jews of the Ghetto were largely shielded, because the Republic wanted their capital and their Levantine trade networks.</b></p>
<p>The clearest evidence is the Senate's <b>1589 safe-conduct to the Ponentini</b>, permitting them to settle and trade <b>with no investigation into their religious past</b> — a deliberate statutory amnesty for exactly the population the Inquisition would otherwise have prosecuted. <b>That is commerce overriding orthodoxy — the same instinct that let Veronese off with a retitling.</b></p>
<p><b>On the Gallerie themselves, one honest note:</b> the collection was assembled largely from art seized from churches, monasteries and confraternities suppressed under Napoleonic and Austrian rule. But no Jewish institution was despoiled to stock it, and the Gallerie hold no significant Judaica. Venice's Jewish material culture is at the Museo Ebraico in Cannaregio, not here.</p>`)}
${src(`<a href="https://it.wikipedia.org/wiki/Ponte_dell%27Accademia" target="_blank" rel="noopener">Ponte dell'Accademia</a> · <a href="https://en.wikipedia.org/wiki/The_Feast_in_the_House_of_Levi" target="_blank" rel="noopener">Feast in the House of Levi</a> · <a href="https://www.gallerieaccademia.it/en/history-collection" target="_blank" rel="noopener">Gallerie dell'Accademia</a>`)}`
    }
  },
  {
    n:12, name:'San Marcuola / Casinò vaporetto stop', time:'16:45',
    lat:45.44225, lng:12.32765, q:'San Marcuola Casinò vaporetto stop, Venezia',
    note:'Or get off at Riva de Biasio / Ferrovia depending on the boat.', dur:''
  },
  {
    n:'A', home:true, name:'Back at the Airbnb', time:'17:00',
    lat:45.44520, lng:12.32460, q:'Calle de la Pagia, 1637, Cannaregio, 30121 Venezia VE, Italy',
    note:'Feet up.', dur:''
  }
];

/* rows: interleaved stops and legs */
const ROWS = [
  {type:'stop', s:0},
  {type:'leg', mode:'walk', time:'9:30–9:40', label:'Walk to San Marcuola / Casinò vaporetto stop', dist:'~500–700 m', dur:'~7–10 min', from:0, to:1},
  {type:'stop', s:1, hideTime:true},
  {type:'leg', mode:'boat', time:'9:40–9:55', label:'Vaporetto Line 1: San Marcuola → Rialto', dist:'—', dur:'~10–15 min', from:1, to:2, extra:'Scenic Grand Canal start — better than walking to Rialto.'},
  {type:'stop', s:2},
  {type:'leg', mode:'walk', time:'10:30–10:50', label:'Walk to Scala Contarini del Bovolo', dist:'~800 m', dur:'~15–20 min', from:2, to:3, extra:'Narrow lanes — allow time for navigation.'},
  {type:'stop', s:3},
  {type:'leg', mode:'walk', time:'11:25–11:40', label:'Walk to Piazza San Marco', dist:'~550–700 m', dur:'~10–15 min', from:3, to:4, extra:'Expect crowds as you approach the square.'},
  {type:'stop', s:4},
  {type:'leg', mode:'walk', time:'12:20–12:35', label:'Walk to Bridge of Sighs viewpoint + Riva degli Schiavoni', dist:'~300–500 m', dur:'~10–15 min', from:4, to:5, extra:'Around the Doge’s Palace side.'},
  {type:'stop', s:5},
  {type:'leg', mode:'walk', time:'12:55–13:15', label:'Walk to Libreria Acqua Alta', dist:'~650–800 m', dur:'~12–20 min', from:5, to:6, extra:'Through the Castello lanes.'},
  {type:'stop', s:6},
  {type:'leg', mode:'walk', time:'13:50–14:10', label:'Walk to San Zaccaria vaporetto stop', dist:'~700–900 m', dur:'~12–20 min', from:6, to:7},
  {type:'stop', s:7, hideTime:true},
  {type:'leg', mode:'boat', time:'14:10–14:35', label:'Vaporetto: San Zaccaria → Zattere', dist:'—', dur:'~10–20 min + wait', from:7, to:8, extra:'Use whichever ACTV line is running that day.'},
  {type:'stop', s:8, hideTime:true},
  {type:'leg', mode:'walk', time:'14:35–14:40', label:'Walk from Zattere pier to Squero di San Trovaso', dist:'~100–300 m', dur:'~3–6 min', from:8, to:9},
  {type:'stop', s:9},
  {type:'leg', mode:'walk', time:'14:55–15:10', label:'Walk to Ponte dei Pugni / Campo San Barnaba', dist:'~600–800 m', dur:'~10–15 min', from:9, to:10},
  {type:'stop', s:10},
  {type:'leg', mode:'walk', time:'15:25–15:40', label:'Walk to Accademia Bridge', dist:'~600–800 m', dur:'~10–15 min', from:10, to:11, extra:'Easy Dorsoduro walk.'},
  {type:'stop', s:11},
  {type:'leg', mode:'boat', time:'16:10–16:45', label:'Vaporetto Line 1: Accademia → San Marcuola / Ferrovia', dist:'—', dur:'~25–35 min', from:11, to:12, extra:'Scenic late-afternoon Grand Canal ride back toward Cannaregio.'},
  {type:'stop', s:12, hideTime:true},
  {type:'leg', mode:'walk', time:'16:45–17:00', label:'Walk back to the Airbnb', dist:'~500–900 m', dur:'~8–15 min', from:12, to:13},
  {type:'stop', s:13}
];

/* boat legs traced roughly along the Grand Canal / Bacino */
const BOAT_PATHS = [
  {label:'Vaporetto Line 1 · San Marcuola → Rialto', pts:[[45.44225,12.32765],[45.44180,12.32900],[45.44120,12.33050],[45.44040,12.33180],[45.43940,12.33300],[45.43860,12.33450],[45.43797,12.33593]]},
  {label:'Vaporetto · San Zaccaria → Zattere', pts:[[45.43349,12.34196],[45.43150,12.34000],[45.42950,12.33700],[45.42880,12.33300],[45.42920,12.33000],[45.42970,12.32800],[45.43005,12.32690]]},
  {label:'Vaporetto Line 1 · Accademia → San Marcuola', pts:[[45.43159,12.32873],[45.43180,12.32900],[45.43270,12.32970],[45.43360,12.33000],[45.43410,12.33120],[45.43400,12.33270],[45.43480,12.33400],[45.43580,12.33480],[45.43680,12.33530],[45.43797,12.33593],[45.43900,12.33360],[45.44000,12.33200],[45.44100,12.33070],[45.44180,12.32900],[45.44225,12.32765]]}
];

/* ============================================================
   2. KOSHER + JEWISH SERVICES
   ============================================================ */
const FOOD = [
  {
    id:'gamgam', name:'Gam Gam', kind:'Kosher restaurant', status:'open',
    tags:[['meat','Meat'],['ok','Chabad hashgacha']],
    lat:45.44435, lng:12.32645, q:'Gam Gam Kosher Restaurant, Cannaregio 1122, Venezia',
    blurb:'The best-known kosher table in Venice, opened in 1996 and run by Chabad. Canal-front at the Ghetto entrance by the Ponte delle Guglie. Consistently strong 2026 reviews — haraimi fish, latkes, gefilte fish, shawarma.',
    rows:[
      ['Address','Cannaregio 1122, Ghetto Vecchio, 30121 Venezia', 'y'],
      ['Phone','<a href="tel:+393662504505">+39 366 250 4505</a>', 'y'],
      ['Website','<a href="http://gamgamkosher.com" target="_blank" rel="noopener">gamgamkosher.com</a>', 'y'],
      ['Instagram','<a href="https://www.instagram.com/gamgamkosher_venice/" target="_blank" rel="noopener">@gamgamkosher_venice</a>', 'y'],
      ['Supervision','Chabad of Venice / Lubavitch. Reported Mehadrin, Pat Yisrael.', 'p'],
      ['Hours','Sun–Thu 12:00–22:00 · Fri 12:00 until two hours before Shabbat · Sat (winter only) from one hour after Shabbat until 23:00', 'p'],
      ['Shabbat','Closed Friday night through Saturday. Pre-paid Shabbat meal packages via Chabad; also a Shabbat takeaway menu with delivery across Venice.', 'y'],
      ['Price','Roughly €30–58 per person including drinks and dessert', 'y']
    ],
    caveat:'Hours differ between the restaurant’s own site, TripAdvisor and kosher directories, and the Saturday opening is explicitly seasonal. The own-site version is above. <b>Call before you rely on it.</b>'
  },
  {
    id:'goodies', name:'Gam Gam Goodies', kind:'Dairy café & bakery', status:'open',
    tags:[['dairy','Dairy'],['ok','Chalav Yisrael']],
    lat:45.44465, lng:12.32620, q:'Gam Gam Goodies, Calle del Ghetto Vecchio, Venezia',
    blurb:'Chabad’s dairy café — coffee, pastries, pizza, breakfast, sandwiches, falafel, gelato and wine, with pareve bread available. With Ghimel Garden closed, this is the only supervised dairy option in the city.',
    rows:[
      ['Address','Sources conflict: <b>Cannaregio 1243</b> or <b>Calle del Ghetto Vecchio 1154/1228</b>. Possibly two adjacent units.', 'n'],
      ['Phone','+39 041 894 3193', 'n'],
      ['Supervision','Lubavitch hashgacha, Rabbi G. M. Garelik. Pat Yisrael, Chalav Yisrael, Bishul Yisrael, shomer Shabbat.', 'y'],
      ['Hours','Sun–Thu 07:00–20:00 · Fri 07:00 until one hour before Shabbat · Motzaei Shabbat one hour after Shabbat — <b>July and August only</b>', 'p'],
      ['Note','This is the most specific and best-documented supervision statement of any establishment in Venice.', 'y']
    ],
    caveat:'The address and phone genuinely conflict between sources and I could not resolve them. <b>Do not rely on the phone number without testing it.</b>'
  },
  {
    id:'baghetto', name:"Ba'Ghetto Venezia", kind:'Kosher restaurant', status:'open',
    tags:[['meat','Meat'],['ok','Venice Rabbinate · Glatt']],
    lat:45.44530, lng:12.32660, q:"Ba'Ghetto Venezia, Campo del Ghetto Nuovo, Venezia",
    blurb:'Roman-Jewish cooking on the Campo del Ghetto Nuovo — carciofi alla giudia, baccalà, polpette. This is the restaurant the Jewish Community of Venice itself lists and certifies, as distinct from the Chabad-supervised Gam Gam.',
    rows:[
      ['Address','Cannaregio 2873/c, Campo del Ghetto Nuovo, 30121 Venezia', 'y'],
      ['Phone','<a href="tel:+390419345962">+39 041 934 5962</a>', 'y'],
      ['Email','<a href="mailto:bavenezia@baghetto.com">bavenezia@baghetto.com</a>', 'y'],
      ['Website','<a href="https://www.baghetto.com/en/restaurants/ba-ghetto-venezia/" target="_blank" rel="noopener">baghetto.com</a>', 'y'],
      ['Menu','<a href="https://www.baghetto.com/wp-content/uploads/2023/07/Menu_Ba-Ghetto_Venezia.pdf" target="_blank" rel="noopener">Main menu (PDF)</a> · <a href="https://www.baghetto.com/wp-content/uploads/2023/07/Menu-Shabbat-Ba-Ghetto-Venezia.pdf" target="_blank" rel="noopener">Shabbat menu (PDF)</a>', 'y'],
      ['Book','<a href="https://baghettovenezia.superbexperience.com/" target="_blank" rel="noopener">baghettovenezia.superbexperience.com</a>', 'y'],
      ['Supervision','Comunità Ebraica di Venezia — listed by the community as <b>Bassarì, Glatt Kosher</b>. Meat: no dairy, shellfish or invertebrates.', 'y'],
      ['Hours','Sun–Thu 12:00–15:00 and 18:00–23:00 · Fri 12:00–15:00 · Sat reopens after Shabbat, time varies by season', 'p'],
      ['Shabbat','All Ba’Ghetto restaurants keep Shabbat strictly. Friday dinner after Arvit, Shabbat lunch from 12:00. <b>Advance booking required.</b>', 'y'],
      ['Price','Starters €7.50–18 · pasta €16–22 · mains €22–34 <span class="chip neutral">2023 menu — may be stale</span>', 'p']
    ],
    caveat:'A February 2026 reviewer was <b>turned away during Sukkot with no advance notice on the booking system.</b> Phone directly before any yom tov. Reviewers also flag high drink prices (€10 spritz).'
  },
  {
    id:'volpe', name:'Panificio Volpe Giovanni', kind:'Kosher bakery & mini-grocery', status:'open',
    tags:[['pareve','Effectively pareve'],['ok','Community-listed']],
    lat:45.44485, lng:12.32610, q:'Panificio Volpe Giovanni, Calle del Ghetto Vecchio, Venezia',
    blurb:'The historic Ghetto bakery — family-run, budget, and the place to buy challah and food for Shabbat. All products are made without milk or butter. It also functions as a small kosher grocery.',
    rows:[
      ['Address','Calle del Ghetto Vecchio, Cannaregio 1143, 30121 Venezia', 'y'],
      ['Phone','<a href="tel:+39041715178">+39 041 715178</a> <span class="chip ok">two independent sources</span>', 'y'],
      ['Email','<a href="mailto:panificiovolpe@libero.it">panificiovolpe@libero.it</a>', 'p'],
      ['Facebook','<a href="https://www.facebook.com/PanificioVolpeGiovanni/" target="_blank" rel="noopener">PanificioVolpeGiovanni</a>', 'y'],
      ['Supervision','Listed on the Jewish Community of Venice’s own kosher-services page. <b>No explicitly named certifying rabbi found.</b>', 'p'],
      ['Stocks','Challah, <em>impade</em>, <em>orecchiette di Aman</em>, <em>bisse</em>, <em>azime dolci</em>, zuccherini — plus Halav Yisrael items, Israeli and French salami, pareve cookies and pat Yisrael.', 'y'],
      ['Hours','Reported Mon–Wed 07:00–19:00, Thu 07:00–12:30, Sun closed', 'n']
    ],
    caveat:'Two aggregators list Saturday opening hours. <b>A kosher bakery in the Ghetto is not open on Shabbat</b> — treat those as data errors. The Thursday half-day and Sunday closure appear on one source only.'
  },
  {
    id:'rimon', name:'Rimon Place', kind:'Kosher guesthouse', status:'open',
    tags:[['plum','Lodging'],['ok','Kosher l’Mehadrin']],
    lat:45.44535, lng:12.32650, q:'Rimon Place, Cannaregio 2874, Venezia',
    blurb:'The only kosher accommodation in Venice, formerly Kosher House Giardino dei Melograni / Pardes Rimonim. On the Campo del Ghetto Nuovo, a few minutes from the synagogues and every kosher option in the city.',
    rows:[
      ['Address','Cannaregio 2874, 30121 Venezia VE', 'y'],
      ['Phone','<a href="tel:+390418226131">+39 041 822 6131</a> · <a href="tel:+393884698228">+39 388 469 8228</a>', 'y'],
      ['Email','<a href="mailto:info@rimonplace.com">info@rimonplace.com</a>', 'y'],
      ['Website','<a href="https://www.rimonplace.com" target="_blank" rel="noopener">rimonplace.com</a>', 'y'],
      ['Certification','<b>Kosher l’Mehadrin</b>, per the Jewish Community of Venice', 'y'],
      ['Reported features','Kosher breakfast (Chalav Yisrael), mikveh on site, mechanical key, Shabbat lift, samovar', 'n']
    ],
    caveat:'The reported on-site mikveh <b>conflicts with the community’s notice that mikveh services are suspended.</b> These may be different facilities, or the claim may be stale. Confirm directly. Rimon Place’s own site makes no mention of a restaurant.'
  },
  {
    id:'ghimel', name:'Ghimel Garden', kind:'Formerly the Ghetto’s dairy restaurant', status:'closed',
    tags:[['stop','Permanently closed']],
    lat:null, lng:null,
    blurb:'<b>Permanently closed.</b> It was Venice’s only supervised dairy and fish restaurant, approved by the Chief Rabbi of Venice, known for sarde in saor, pizza and pita. Its former address, Cannaregio 2873/c, is now occupied by Ba’Ghetto — which is a <b>meat</b> kitchen.',
    rows:[
      ['Why this matters','Anyone working from a guidebook, or from kosher directories that have not been updated, will arrive expecting dairy and find meat.', 'y'],
      ['Still listed as open by','easykoshertravel.com, as of a March 2026 update', 'y']
    ]
  },
  {
    id:'koshergarden', name:'"Kosher Garden Bar"', kind:'Stale duplicate listing', status:'closed',
    tags:[['warn','Not a real separate venue']],
    lat:null, lng:null,
    blurb:'Still ranks on TripAdvisor’s kosher-Venice list, but it carries <b>Ba’Ghetto’s exact phone number and email</b>, and has no reviews since July 2018. It appears to be a legacy listing for the old Giardino dei Melograni garden bar, now absorbed into Ba’Ghetto. Do not treat it as a distinct option.',
    rows:[]
  }
];

const SERVICES = [
  {
    id:'community', name:'Comunità Ebraica di Venezia', kind:'The Jewish Community office',
    tags:[['plum','Start here']],
    lat:45.44490, lng:12.32640, q:'Comunità Ebraica di Venezia, Cannaregio 1189, Venezia',
    blurb:'The community office is the gatekeeper for synagogue access, the mikveh and anything official. About 450 members, serving Venice, Treviso and Belluno. Chief Rabbi Alberto Sermoneta; President Dario Calimani.',
    rows:[
      ['Address','Sestiere Cannaregio 1189, 30121 Venezia', 'y'],
      ['Phone','<a href="tel:+39041715012">+39 041 715012</a>', 'y'],
      ['Email','<a href="mailto:segreteria@jvenice.org">segreteria@jvenice.org</a>', 'y'],
      ['Security / access','<a href="mailto:security@jvenice.org">security@jvenice.org</a> · WhatsApp <a href="https://wa.me/393286457585" target="_blank" rel="noopener">+39 328 645 7585</a>', 'y'],
      ['Office hours','Mon–Thu 09:00–11:00 and 14:00–16:00 · <b>Friday 09:00–11:00 only</b>', 'y'],
      ['Website','<a href="https://jvenice.org/en/" target="_blank" rel="noopener">jvenice.org</a>', 'y']
    ],
    caveat:'Note the Friday morning-only window. If you need anything sorted for Shabbat, <b>Friday afternoon is too late.</b>'
  },
  {
    id:'chabad', name:'Chabad of Venice', kind:'Chabad House',
    tags:[['warn','Contact details unconfirmed']],
    lat:45.44435, lng:12.32645, q:'Chabad of Venice, Cannaregio, Venezia',
    blurb:'Rabbi Ramy Banin and Mrs Shachar Banin, with Rabbi Amichay Rieber also listed. Chabad runs Gam Gam, Gam Gam Goodies, Shabbat and Yom Tov services, pre-paid Shabbat meals and visitor services.',
    rows:[
      ['Website','<a href="https://www.jewishvenice.org/" target="_blank" rel="noopener">jewishvenice.org</a> — book Shabbat meals here', 'y'],
      ['Address','<b>Three conflicting addresses across directories:</b> Ghetto Vecchio 1122 (which is Gam Gam), Cannaregio 2915, and Campo di Ghetto Nuovo 2884. Unresolved.', 'n'],
      ['Phone','<b>Deliberately not published here.</b> The only number found sits in one undated directory and could not be corroborated.', 'n'],
      ['Best route','<b>Phone Gam Gam on <a href="tel:+393662504505">+39 366 250 4505</a></b> — in practice this is the standard way people reach Chabad of Venice.', 'y'],
      ['Social','Facebook <em>JewishVeniceIT</em> · Instagram <em>jewishvenice</em>', 'y']
    ],
    caveat:'jewishvenice.org is JavaScript-gated and could not be read programmatically, so <b>Shabbat meal prices, booking deadlines and cancellation terms are unverified.</b> Open it in a browser or phone Gam Gam.'
  },
  {
    id:'museo', name:'Museo Ebraico di Venezia', kind:'Jewish Museum & synagogue tours',
    tags:[['warn','Mid-restoration']],
    lat:45.44545, lng:12.32675, q:'Museo Ebraico di Venezia, Campo del Ghetto Nuovo, Venezia',
    blurb:'Founded in 1953, originally two rooms in the Scola Grande Tedesca building. <b>The museum is completing a major restoration and the permanent display is not open.</b> It operates from a temporary location, and guided tours give access to the synagogues — which is the real reason to book.',
    rows:[
      ['Address','Cannaregio 2902/b, Campo di Ghetto Nuovo', 'y'],
      ['Phone','<a href="tel:+39041715359">+39 041 715359</a>', 'y'],
      ['Tour bookings','<a href="mailto:ghettovenezia@operalaboratori.com">ghettovenezia@operalaboratori.com</a>', 'y'],
      ['Tickets','<a href="https://www.ghettovenezia.com/en/opening-hours/" target="_blank" rel="noopener">ghettovenezia.com</a> — the live operator. <b>Use this, not museoebraico.it.</b>', 'y'],
      ['Hours','Sun–Thu 10:00–18:00 (last entry 17:15) · Fri 09:00–17:00 (last entry 16:15) · <b>Closed Saturdays and all Jewish holidays</b>', 'p'],
      ['Admission','€12 full · €10 reduced · €7 Venetian residents · free under 6, disabled visitors, ICOM · +€2 advance booking', 'y'],
      ['Guided tour','€15 full · €13 reduced · €10 residents. English hourly from 10:00 (last 17:00); Italian hourly from 10:30 (last 16:30). Friday: English 09:00–16:00.', 'y'],
      ['Private tours','Daily except Saturday, in Italian, English, French, German, <b>Hebrew</b> and Spanish. Group and school bookings compulsory.', 'y'],
      ['Luggage','Not permitted inside.', 'y']
    ],
    caveat:'The museum’s own site (museoebraico.it) publishes <b>different hours</b> from the ticketing operator, and the two disagree on which synagogues the tour covers. Trust ghettovenezia.com and phone ahead. <b>No reopening date should be quoted — the museum does not give one.</b> Photography policy inside the scole is not published; assume restricted and ask at the desk.'
  }
];

/* ============================================================
   3. GHETTO & JEWISH-VENICE SITES (walking tour)
   ============================================================ */
const JEWISH_SITES = [
  {
    n:1, name:'Campo di Ghetto Nuovo', lat:45.44530, lng:12.32660,
    q:'Campo di Ghetto Nuovo, Venezia',
    img:[IMG.ghetto,'Campo di Ghetto Nuovo. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The heart of it. An enclosed island reached by two bridges, with the tallest domestic buildings in Venice around a bare campo, three synagogues hidden on their upper floors, and the wall carrying the Holocaust memorial.',
    body:`<p>Stand in the middle and <b>count the window rows.</b> Forbidden to expand outward, the community built upward: six, seven, eight storeys, and in 18th-century land registers <b>nine</b>, with ceilings squeezed absurdly low. Italian sources call the heights unique in Venice. The pressure of a whole population confined to one island is legible in the elevation.</p>
    <p>The <b>two bridges</b> were the only ways in, and their gates were locked in the evening and opened at dawn. All quays and canal-facing doors and windows were bricked up. <b>Guards were salaried by the Jews themselves</b>, and boats patrolled the surrounding canals at night — also at the community's expense. Rent was fixed <b>one third above market rate, in perpetuity.</b></p>
    <p>Around the ground floors of three different sides of this campo stood the <b>banchi rosso, verde and nero</b>, named for the colour of their receipts. A small <b>Banco Rosso</b> space is shown today, though only an inscription on the door lintel survives of the original. <em>(The Italian phrase</em> andare in rosso<em>, to go into the red, has nothing to do with it — the community itself debunks this.)</em></p>`
  },
  {
    n:2, name:'The Holocaust Memorial', lat:45.44545, lng:12.32635,
    q:'Holocaust Memorial Campo di Ghetto Nuovo, Venezia',
    img:[IMG.memorial,'Memorial in the Campo di Ghetto Nuovo. <em>Designwallah, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'Two memorials on the campo wall, not one — and they are usually merged. Plus twenty-one stumbling stones for the residents of the Jewish old people’s home.',
    body:`<p>The Lithuanian-born artist <b>Arbit Blatas</b> installed <b>seven bronze bas-reliefs, "The Monument of the Holocaust," on 25 April 1980</b> — Italy's Liberation Day. Blatas's own mother had been murdered at Stutthof. A <b>separate later bronze, "The Last Train," was dedicated on 19 September 1993</b> by President Scalfaro for the fiftieth anniversary, in an installation designed by the architect Franca Semi. <b>They are two works. Do not merge them.</b></p>
    <p>The Racial Laws came in September 1938. The pathologist <b>Giuseppe Jona</b>, President of the Jewish Community, was ordered by the German authorities to hand over the list of Venice's Jews. <b>He destroyed the community's records, made his will on 14 September 1943, and killed himself.</b></p>
    <p>The roundup of <b>5 December 1943</b> took 163 people — 114 women and 49 men, per the Questore's own report. On <b>17 August 1944 the SS raided the Casa di Riposo Israelitica, the Jewish old people's home on this campo, and took all 21 residents.</b> Twenty-one <em>pietre d'inciampo</em> — stumbling stones — mark them here today. They went via Fossoli, Bolzano and the Risiera di San Sabba, mostly to Auschwitz-Birkenau.</p>
    <p>The Jewish Community of Venice and Encyclopaedia Judaica independently give <b>246 Venetian Jews deported</b> between 1943 and 1944. <b>About eight came back.</b> Among the murdered was Chief Rabbi Adolfo Ottolenghi.</p>`
  },
  {
    n:3, name:'Scola Grande Tedesca (1528)', lat:45.44540, lng:12.32668,
    q:'Scola Grande Tedesca, Campo di Ghetto Nuovo, Venezia',
    img:[IMG.tedesca,'Exterior of the Scola Grande Tedesca. <em>Markhole, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The oldest of the five, built by the Ashkenazi community — the German-rite Jews who were the Ghetto’s original population. The Museo Ebraico began in two rooms of this building in 1953.',
    body:`<p>All five scole were <b>clandestine by design</b> — prayer halls tucked on upper floors behind ordinary façades, invisible from the campo. This is the founding one, the synagogue of the Ashkenazim who were confined here in 1516, and it sits above what became the museum.</p>
    <p><em>A word on the guidebook lore:</em> you will be told that five windows on a Ghetto façade identify a synagogue. Sources contradict each other on the window counts of the actual buildings — the Italiana is given both five and four, the Canton has eleven. <b>Treat it as a nice story, not a rule.</b></p>`
  },
  {
    n:4, name:'Scola Canton (1531–32)', lat:45.44546, lng:12.32655,
    q:'Scola Canton, Campo di Ghetto Nuovo, Venezia',
    img:[IMG.canton,'Scola Canton. <em>Daniel Ventura, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The second Ashkenazi synagogue, with a name nobody can settle.',
    body:`<p>Four theories compete for the name. The generally accepted one derives it from <em>canton del medras</em> — "corner of the study-house." A credible alternative is that it was funded by the <b>Canton family</b>. It is small, richly decorated, and famous for a series of painted panels depicting biblical scenes — unusual in a synagogue, and worth looking for on the tour.</p>`
  },
  {
    n:5, name:'Scola Italiana (1575)', lat:45.44536, lng:12.32648,
    q:'Scola Italiana, Campo di Ghetto Nuovo, Venezia',
    img:[IMG.italiana,'Façade of the Scola Italiana. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The smallest and plainest of the five — built by Italian-rite Jews, who were the poorest of the Ghetto’s "nations."',
    body:`<p>Its austerity is not an aesthetic choice. The Italian-rite community had neither the Levantine merchants' trade wealth nor the Ponentines' capital. <b>The relative grandeur of the five scole is a direct map of the relative wealth of the five Jewish "nations" of Venice</b> — and the two richest built theirs around the corner, in the Ghetto Vecchio.</p>`
  },
  {
    n:6, name:'Scola Levantina (1541)', lat:45.44475, lng:12.32610,
    q:'Scola Levantina, Campiello delle Scole, Venezia',
    img:[IMG.levantina,'Façade of the Scola Levantina. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The winter synagogue. Built by the Levantine Jews — Ottoman subjects admitted for their value in eastern Mediterranean trade — and rebuilt in the 1680s.',
    body:`<p>This and the Spagnola opposite are <b>the two synagogues still in liturgical use</b>, and they alternate by season. <b>The Levantina is the winter shul</b> — beautiful, and entirely practical, since its smaller hall could be heated.</p>
    <p>Its magnificent carved wooden bimah is traditionally attributed to <b>Baldassare Longhena or his circle</b>. Note the hedge: the Longhena attribution for both this and the Spagnola is <b>traditional rather than documented</b>, and specialists say "or his circle" for a reason.</p>`
  },
  {
    n:7, name:'Scola Spagnola (mid-1500s)', lat:45.44465, lng:12.32595,
    q:'Scola Spagnola, Campiello delle Scole, Venezia',
    img:[IMG.spagnolaIn,'The Spanish Synagogue, view toward the ark. <em>Markhole, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The largest and grandest of the five, built by the Ponentine (Iberian Sephardi) community, remodelled around 1635. The summer synagogue — and the one in use right now.',
    body:`<p>Services for Shabbat and festivals take place <b>here in the summer</b>, and in the Levantina in winter. The changeover dates are not published; ask the office.</p>
    <p>In October 1628 this hall hosted a Simchat Torah concert by a Jewish music academy that <b>needed police crowd control</b> because so many Christian Venetians came. The academy was called <em>the Hindered</em> — named, with some irony, for the reason it should not have existed.</p>
    <p><em>Note on dating:</em> founding is given variously as 1541 and 1580, and the remodelling is usually put around 1635. Wikipedia's claim that Longhena designed it in 1580 is impossible — he was born around 1596.</p>`
  },
  {
    n:8, name:'Ghetto Vecchio & the sotoportego', lat:45.44480, lng:12.32625,
    q:'Calle del Ghetto Vecchio, Venezia',
    img:[IMG.ghettoBridge,'Ponte de Gheto Novo. <em>Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons</em>'],
    blurb:'The 1541 extension, opened for Levantine merchants — and the low covered passage from the Fondamenta di Cannaregio that is still the way in.',
    body:`<p><b>The names run backwards, and it is worth pointing out on site.</b> The <b>Ghetto Nuovo</b> (1516) is the older Jewish settlement; the <b>Ghetto Vecchio</b> (1541) came later; the <b>Ghetto Novissimo</b> (1633) was two small <em>calli</em> of about twenty dwellings for wealthy Ponentine merchants, with no synagogue of its own. The names describe the age of the <b>foundries</b>, not of the Jews.</p>
    <p>The bakery and Gam Gam are both on this stretch. So is the 1704 stone — see the history tab.</p>`
  },
  {
    n:9, name:'Antico Cimitero Ebraico, Lido', lat:45.4258, lng:12.3856,
    q:'Antico Cimitero Ebraico Lido, Venezia',
    blurb:'The ancient Jewish cemetery at San Nicolò on the Lido, in use since 1386 — a hundred and thirty years before the Ghetto existed. Visitable by guided tour arranged through the community.',
    body:`<p>The community was burying its dead here <b>a hundred and thirty years before it was confined to the Ghetto.</b> The cemetery is walled, wooded, and full of tilted stones with Hebrew and Italian inscriptions; a newer cemetery adjoining it dates from 1774.</p>
    <p>Access is by <b>special guided tour arranged separately through the Jewish Community</b> — it is not a walk-in site, and it is across water, so it cannot be combined with a Shabbat itinerary. Email the community office to ask about current tour dates. <em>(One correction: Daniel Bomberg, the Christian printer of the Talmud, is sometimes said to be buried here. He is not — no burial place is recorded for him.)</em></p>`
  }
];

/* ============================================================
   4. TIMELINE
   ============================================================ */
const TIMELINE = [
  {yr:'1386', t:'The community is granted a burial ground at San Nicolò on the Lido — the ancient Jewish cemetery, still there.'},
  {yr:'1394', t:'Jews may stay in Venice only fifteen days at a time, are barred from guilds and property, and must wear a yellow O on the outer garment.', c:'dark'},
  {yr:'1423', t:'Jews are prohibited from owning real property. What they can hold is <em>jus gazaga</em> — a heritable perpetual leasehold, security of tenure without title.', c:'dark'},
  {yr:'1496–c.1500', t:'The yellow badge is replaced by a yellow hat — a badge could be hidden, a hat could not — and then, in Venetian territories, a red one. Levantine Jews keep yellow.', c:'dark'},
  {yr:'1509', t:'Defeat at Agnadello drives mainland Jews into the city. A 1513 charter allows residence against 6,500 ducats a year.'},
  {yr:'29 March 1516', t:'<b>The Senate votes 130 to 44</b> to confine all Jews to the houses "within the Geto at San Hieronimo." Neither expulsion nor tolerance but enclosure: keep the money and the medicine, control the bodies.', c:'dark'},
  {yr:'1516–1633', t:'Ghetto Nuovo (1516), then Ghetto Vecchio for Levantine merchants (1541), then Ghetto Novissimo for wealthy Ponentines (1633).'},
  {yr:'1519/20–1523', t:'<b>Daniel Bomberg prints the first complete Babylonian Talmud in Venice.</b> His foliation and page layout are still the standard in every conventional edition printed since.', c:'good'},
  {yr:'1528–c.1580', t:'The five scole are built, hidden on upper floors: Tedesca (1528), Canton (1531–32), Levantina (1541), Italiana (1575), Spagnola (mid-century, remodelled c. 1635).'},
  {yr:'1548', t:'A charter becomes the model for the next 175 years — and permits synagogues.'},
  {yr:'October 1553', t:'Following the bull of Julius III, <b>the Talmud is burned</b> at the Rialto and in Piazza San Marco. Hebrew printing in Venice is banned for about a decade.', c:'dark'},
  {yr:'1589', t:'After years of lobbying by the merchant <b>Daniel Rodriga</b>, the Senate admits Levantine and Ponentine merchants on renewable safe-conducts — <b>with no inquiry into their religious past</b> and explicit protection from magistrates on religious grounds.', c:'good'},
  {yr:'1618–1621', t:'<b>Sara Copia Sullam</b> runs a literary salon in the Ghetto and corresponds for four years with the Genoese poet Ansaldo Cebà, whom she never meets and who spends the whole correspondence trying to convert her. Accused in 1621 of denying the immortality of the soul, she answers with her <em>Manifesto</em> the same year.'},
  {yr:'1638', t:'<b>Simone Luzzatto</b> publishes his <em>Discorso</em>, arguing the Jews’ economic usefulness to Venice — a text that would echo through the later European emancipation debate.'},
  {yr:'1648', t:'Death of <b>Leon Modena</b> — rabbi, preacher and cantor in the Ghetto for over forty years, author of the extraordinarily candid autobiography <em>Ḥayyei Yehudah</em>, of <em>Ari Nohem</em> arguing the Zohar was a modern forgery, and, by his own account, a compulsive gambler who as a boy of thirteen had written a dialogue against gambling.'},
  {yr:'20 Sept 1704', t:'A stone is carved forbidding converts from returning to the Ghetto — under penalty of the rope, the galleys and the pillory, enforced by an anonymous denunciation box with a hundred-ducat bounty paid out of the accused’s own property. <b>The stone itself is the sentence ordering that it be carved.</b>', c:'dark'},
  {yr:'11 July 1797', t:'Weeks after the Republic voted itself out of existence, <b>the Ghetto gates are torn down and burned in the Campo del Ghetto Nuovo.</b> Encyclopaedia Judaica describes them as "spontaneously torn down" — a civic act by Venetians and Jews together, not a French military operation. The area is renamed Contrada dell’Unione.', c:'good'},
  {yr:'1866', t:'Full emancipation with the annexation of Venice to Italy. The 1869 census counts 2,415 Jews.', c:'good'},
  {yr:'1910', t:'<b>Luigi Luzzatti</b>, a Venetian who began by organising a mutual aid society for gondoliers and sat in parliament for fifty years, becomes <b>Italy’s first Jewish Prime Minister.</b>', c:'good'},
  {yr:'Sept 1938', t:'The Racial Laws.', c:'dark'},
  {yr:'17 Sept 1943', t:'<b>Giuseppe Jona</b>, President of the Jewish Community, is ordered to hand over the list of Venice’s Jews. He destroys the community’s records and takes his own life.', c:'dark'},
  {yr:'5 Dec 1943', t:'The citywide roundup: 163 people arrested — 114 women and 49 men.', c:'dark'},
  {yr:'17 Aug 1944', t:'The SS raid the <b>Casa di Riposo Israelitica</b>, the Jewish old people’s home on the Campo del Ghetto Nuovo, and take all 21 residents. Twenty-one stumbling stones mark them there today.', c:'dark'},
  {yr:'1943–44', t:'<b>246 Venetian Jews deported. About eight returned.</b> Among the murdered was Chief Rabbi Adolfo Ottolenghi.', c:'dark'},
  {yr:'1953', t:'The Museo Ebraico is founded, in two rooms of the Scola Grande Tedesca building.', c:'good'},
  {yr:'25 April 1980', t:'Arbit Blatas installs seven bronze bas-reliefs on the campo wall — <b>on Italy’s Liberation Day.</b> "The Last Train" follows on 19 September 1993.'},
  {yr:'July 2016', t:'For the five hundredth anniversary, <em>The Merchant of Venice</em> is performed <b>in the Campo del Ghetto Nuovo for the first time</b> — five actors of different ages, genders and backgrounds sharing the role of Shylock. Days later, in a mock appellate trial, <b>US Supreme Court Justice Ruth Bader Ginsburg annulled Shylock’s forced conversion and ordered his property restored.</b>', c:'good'},
  {yr:'April 2026', t:'The Venice eruv agreement is <b>renewed and expanded</b> by Mayor Luigi Brugnaro and Chief Rabbi Alberto Sermoneta, newly including Sant’Elena.', c:'good'},
  {yr:'Today', t:'About <b>450 members</b> in the community. Very few Jews actually live in the Ghetto — commonly given as around thirty. <b>The rest live elsewhere in the city and in Mestre, priced out of the island they were once forbidden to leave.</b>'}
];
