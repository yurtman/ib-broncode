<template>
  <n-space vertical>
    <p>Huishoudens hebben recht op toeslagen en kortingen.
    Deze kortingen zijn afhankelijk van het inkomen en de samenstelling van het huidhouden.
    Aan de linkerkant van het scherm kan deze samenstelling worden ingevuld.
    Daarmee worden grafieken gemaakt die tonen wat dit betekent voor toeslagen en kortingen bij verschillende inkomens.
    De volgende grafieke zijn beschikbaar onder de titels hierboven:
    <dl>
      <dt>Beschikbaar Inkomen</dt>
      <dd>Dit geeft de verdeling van toeslagen en kortingen weer per arbeidsinkomen (salaris).
      </dd>
      <dt>Marginale Druk</dt>
      <dd>Dit geeft weer hoeveel procent van de salarisverhoging <q>verdwijnt</q> door belasting, verlies van kortingen en toeslagen.
      De grafiek geeft weer waar de marginale druk door wordt veroorzaakt.
      Zonder kortingen en toeslagen is de marginale druk gelijk aan het inkomensbelasting tarrief.
      De marginale druk is relevant voor de keuze voor het aantal uren of dagen per week dat gewerkt wordt.
      Als de marginale druk hoog is, dan zal minder werken bij een salarisverhoging niet direct tot veel minder inkomen zorgen.
      </dd>
    </dl>
    </p>
    <n-collapse>
      <n-collapse-item title="Verantwoording" name="disclaimer">
        <p>
          De berekeningen zijn met zorg samengesteld, maar het is mogelijk dat er nog fouten in zitten.
          In de berekeningen hier wordt uitgegaan dat de personen in 1 huishouden in hetzelfde huis wonen.
          Daardoor zijn niet alle mogelijke variaties meengenomen die invloed hebben op toeslagen.
          Zo hebben onder andere aow leeftijd, eigen vermogen, leeftijds wisseling binnen jaar, wonen in buitenland invloed op de toeslagen.
        </p>
        <p>Voor opmerkingen/aanvullingen/verbeteringen kunt u terecht op <a href="https://github.com/hilbrand/ib-broncode" target="_blank">https://github.com/hilbrand/ib-broncode</a>.
        </p>
      </n-collapse-item>
    </n-collapse>
  </n-space>
</template>
