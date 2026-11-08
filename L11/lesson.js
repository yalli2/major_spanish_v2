/* Lección 11 · Me lo pasé bien en la cena de Nochebuena — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 149~162쪽 : Diálogo → Vocabulario·Contesta → Lectura → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~4) → Actividades 1~5 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .tl11{display:flex;flex-wrap:wrap;gap:0;margin:12px 0;border-left:4px solid #a32638;padding-left:12px}
    .tl11 div{flex:1 1 100%;display:flex;gap:12px;align-items:baseline;padding:4px 0}.tl11 b{min-width:58px;color:#a32638;font-size:17px}
    .cmp{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:10px 0}.cmp div{background:#fff;border:1px solid #e3e3e3;border-radius:12px;padding:10px;text-align:center}
    .cmp div span{font-size:30px;display:block}.cmp div b{color:#7b3a26}
    @media(max-width:640px){.cmp{grid-template-columns:1fr}}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      reg: 'Indefinido regular 단순과거 규칙',
      ort: 'Cambios ortográficos 철자 변화',
      irr: 'Indefinido irregular 불규칙',
      cmp: 'Comparación 비교',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '크리스마스가 지나고 — 마누엘과 누리아', group: 'Diálogo · Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'lec', label: 'Lectura', kr: '스페인의 카를로스 1세', group: 'Diálogo · Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo · Lectura' },
      { id: 'gram', label: 'Gramática', kr: '단순과거 · 비교구문', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '단순과거 규칙동사', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '철자가 변하는 동사', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '불규칙동사', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'e4', label: '연습문제 4', kr: '비교구문', group: 'Gramática y ejercicios', kind: 'ej', n: 4 },
      { id: 'ac1', label: 'Actividades 1', kr: '현재완료 → 단순과거', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '역사적 사건 연표', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '그날 무엇을 했니?', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'ac4', label: 'Actividades 4', kr: 'normalmente …, pero ayer …', group: 'Actividades', kind: 'ac', n: 4 },
      { id: 'ac5', label: 'Actividades 5', kr: '세르반테스의 생애', group: 'Actividades', kind: 'ac', n: 5 },
      { id: 'cultura', label: 'Cultura', kr: '1492년의 의미', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Manuel', es: '¡Hola, Nuria! ¿Qué tal la Navidad?' },
      { who: 'Nuria', es: '¡Hola, Manuel! Como siempre. [Vinieron] mis tíos y mis primos a la cena de [Nochebuena] y se [quedaron] en casa toda la noche. Una prima [dio] a luz a su hijo hace poco y yo me [quedé] al lado del bebé mirándolo todo el tiempo. Además, mi hermano José [invitó] a un amigo coreano de su clase.' },
      { who: 'Manuel', es: 'Entonces, ¿[fue] su primera fiesta de Nochebuena?' },
      { who: 'Nuria', es: 'Pues, no. Dice que en Corea [celebran] la Navidad también.' },
      { who: 'Manuel', es: '¿Ah, sí?' },
      { who: 'Nuria', es: 'Sí. Creo que se lo [pasó] muy bien con nosotros. Le [contamos] un poco de todo sobre la Navidad en España. [Comimos] y [bebimos] hasta muy tarde. Mi padre [cocinó] cordero [asado].' }
    ],
    lectura: [
      'Carlos I de España nació como primogénito de Felipe I de Habsburgo y Juana I de Castilla. Fue rey de España desde 1516 hasta 1556 y al mismo tiempo emperador del Sacro Imperio Romano Germánico con el nombre de Carlos V de 1520 a 1558. Por vía paterna heredó los territorios austriacos y el derecho al trono imperial, y por vía materna heredó Castilla, Aragón, Navarra, Nápoles, Sicilia y el Nuevo Mundo.',
      'En su reinado, el poder político y militar de España estuvo en su auge. Carlos V no dejó de emprender campañas militares y las tropas españolas lucharon por todo el continente europeo y el mar Mediterráneo contra Francia, algunos países europeos protestantes, el Imperio otomano, etc.',
      'En la época de Felipe II, hijo y sucesor de Carlos V, la coalición de España y otros países católicos derrotó a la armada del Imperio otomano cerca de la ciudad griega de Lepanto en 1571 y frenó la expansión otomana hacia Europa occidental. Fue un acontecimiento muy importante en el desarrollo de la historia universal.'
    ],

    voc1: [
      { es: 'encontrarse con', kr: '~와 우연히 마주치다', e: '🤝' }, { es: 'celebrar', kr: '축하하다, 기리다', e: '🎉' }, { es: 'navidad', kr: '성탄절', e: '🎄' },
      { es: 'nochebuena', kr: '성탄절 전야', e: '🌟' }, { es: 'asado', kr: '구운', e: '🍖' }, { es: 'cocinar', kr: '요리하다', e: '👨‍🍳' }
    ],
    voc2: [
      { es: 'campaña militar', kr: '군사작전', e: '⚔️' }, { es: 'emperador', kr: '황제', e: '👑' }, { es: 'Sacro Imperio Romano Germánico', kr: '신성로마제국', e: '🦅' },
      { es: 'continente', kr: '대륙', e: '🌍' }, { es: 'protestante', kr: '개신교의', e: '✝️' }, { es: 'sucesor', kr: '후계자', e: '🤴' },
      { es: 'desarrollo', kr: '발전, 발달', e: '📈' }, { es: 'coalición', kr: '동맹', e: '🤝' }, { es: 'trono', kr: '왕좌, 왕위', e: '🪑' },
      { es: 'derrotar', kr: '무찌르다', e: '🏆' }, { es: 'armada', kr: '함대', e: '⛵' }, { es: 'auge', kr: '정점', e: '⛰️' },
      { es: 'primogénito', kr: '장남', e: '👶' }, { es: 'tropa', kr: '군대', e: '🪖' }, { es: 'paterno', kr: '부계의', e: '👨' },
      { es: 'materno', kr: '모계의', e: '👩' }, { es: 'heredar', kr: '상속하다', e: '📜' }, { es: 'territorio', kr: '영토', e: '🗺️' },
      { es: 'Imperio otomano', kr: '오스만 제국', e: '🌙' }, { es: 'imperial', kr: '제국의', e: '🏛️' }, { es: 'expansión', kr: '팽창(주의)', e: '↔️' },
      { es: 'dejar de + 동사원형', kr: '~하는 것을 그만두다', e: '✋' }, { es: 'emprender', kr: '착수하다', e: '🚀' }
    ],
    amplia: [
      { es: 'regar', kr: '물 주다', e: '🪴' }, { es: 'construir', kr: '건축하다, 건설하다', e: '🏗️' }, { es: 'arrancar', kr: '시동 걸다', e: '🔑' },
      { es: 'actriz', kr: '여배우', e: '💃' }, { es: 'estatua', kr: '동상', e: '🗽' }, { es: 'ladrar', kr: '짖다', e: '🐕' },
      { es: 'ciruela', kr: '자두', e: '🍑' }, { es: 'reparar', kr: '수리하다', e: '🔧' }, { es: 'gemelo', kr: '쌍둥이', e: '👶👶' },
      { es: 'exportar', kr: '수출하다', e: '🚢' }, { es: 'tubería', kr: '배관', e: '🚰' }, { es: 'auricular', kr: '이어폰', e: '🎧' }
    ],

    examBank: [
      { p: 'Ayer yo ____ en ese restaurante. <i>(cenar)</i>', a: ['cené'], s: 'reg' },
      { p: '¿____ tú con el jefe? <i>(hablar)</i>', a: ['hablaste'], s: 'reg' },
      { p: 'Begoña ____ una postal. <i>(recibir)</i>', a: ['recibió'], s: 'reg' },
      { p: 'Nosotros ____ y bebimos hasta muy tarde. <i>(comer)</i>', a: ['comimos'], s: 'reg' },
      { p: 'Los actores ____ muy tarde de la ceremonia. <i>(salir)</i>', a: ['salieron'], s: 'reg' },
      { p: '¿____ vosotros las plantas? <i>(regar)</i>', a: ['regasteis'], s: 'reg' },
      { p: 'Yo ____ la estatua de Don Quijote. <i>(tocar)</i>', a: ['toqué'], s: 'ort' },
      { p: 'Ayer yo ____ tarde a clase. <i>(llegar)</i>', a: ['llegué'], s: 'ort' },
      { p: 'Yo ____ a tocar el piano a los seis años. <i>(empezar)</i>', a: ['empecé'], s: 'ort' },
      { p: '¿Qué novela ____ ustedes la semana pasada? <i>(leer)</i>', a: ['leyeron'], s: 'ort' },
      { p: 'Los mayas ____ la Pirámide del Sol. <i>(construir)</i>', a: ['construyeron'], s: 'ort' },
      { p: 'Carlos I ____ rey de España desde 1516. <i>(ser)</i>', a: ['fue'], s: 'irr' },
      { p: '____ mis tíos a la cena de Nochebuena. <i>(venir)</i>', a: ['vinieron'], s: 'irr' },
      { p: 'No ____ ellos arrancar el coche. <i>(poder)</i>', a: ['pudieron'], s: 'irr' },
      { p: 'El domingo ellos ____ la compra. <i>(hacer)</i>', a: ['hicieron'], s: 'irr' },
      { p: 'Nosotras ____ en la reunión del lunes. <i>(estar)</i>', a: ['estuvimos'], s: 'irr' },
      { p: 'Cervantes ____ en 1616. <i>(morir)</i>', a: ['murió'], s: 'irr' },
      { p: '¿Qué te ____ tu madre? <i>(decir, 3인칭 단수)</i>', a: ['dijo'], s: 'irr' },
      { p: 'El tren es ____ rápido que el autobús.', a: ['más'], s: 'cmp' },
      { p: 'Ella es ____ atractiva como su hermana.', a: ['tan'], s: 'cmp' },
      { p: 'No tengo ____ canas como tú.', a: ['tantas'], s: 'cmp' },
      { p: 'No corro tanto ____ ellos.', a: ['como'], s: 'cmp' },
      { p: 'Trabajo más ____ tú.', a: ['que'], s: 'cmp' }
    ]
  };

  const B = {};
  /* 단순과거 형태 (대략) */
  const IND = '[a-záéíóúñ]+(é|aste|ó|amos|asteis|aron|í|iste|ió|imos|isteis|ieron|yó|yeron)|fui|fuiste|fue|fuimos|fueron|tuve|tuvo|tuvimos|tuvieron|hice|hizo|hicimos|hicieron|estuve|estuvo|estuvimos|estuvieron|vine|vino|vinimos|vinieron|vi|vio|vimos|vieron|dije|dijo|dijeron|pude|pudo|pudimos|quise|quiso|di|dio|dimos|dieron';

  /* ---------- Diálogo ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'Después de la Navidad')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 단순과거 동사를 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'irr', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    ['¿Qué tal la Navidad?', 'Mi padre cocinó cordero asado.', 'Comimos y bebimos hasta muy tarde.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'reg', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Quiénes fueron a la fiesta de Nochebuena de Nuria?', kw: [['t[ií]os', 'sus tíos'], ['primos', 'sus primos']], model: 'Fueron sus tíos y sus primos (y un amigo coreano de José).' },
      { q: '¿Con quién estuvo Nuria toda la noche?', kw: [['beb[eé]', 'con el bebé']], model: 'Estuvo con el bebé de su prima.' },
      { q: '¿Dónde conoció José al estudiante coreano?', kw: [['clase', 'en su clase']], model: 'Lo conoció en su clase.' },
      { q: '¿Qué cocinó el padre de Nuria?', kw: [['cordero', 'cordero'], ['asado', 'asado']], model: 'Cocinó cordero asado.' },
      { q: '¿Se marcharon pronto los tíos de Nuria?', kw: [['no', 'No, …'], ['quedaron|toda la noche', 'se quedaron toda la noche']], model: 'No, se quedaron en casa toda la noche.' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lec = () => {
    const s = sec('lec', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <p class="scene">Carlos I de España (Carlos V) 👑</p>
      <div class="rb"></div>
      <h3 class="h3">📜 연표 — 연도에 맞는 사건을 선으로 연결하세요</h3>
      <div class="tl11">${[['1516', 'Carlos I, rey de España'], ['1520', 'emperador (Carlos V)'], ['1556', 'fin de su reinado en España'], ['1571', 'batalla de Lepanto']].map(([y, t]) => `<div><b>${y}</b><span>${t}</span></div>`).join('')}</div>
      <div class="pm"></div>
      <h3 class="h3">🌳 무엇을 누구에게서 상속했나요? — 표에 분류하세요</h3><div class="sb"></div>
      <h3 class="h3">✍️ 본문 속 단순과거를 찾아 쓰세요</h3><div class="c"></div>`);
    put(s, '.rb', readBlock(D.lectura, { img: '👑', g: 'm' }));
    put(s, '.pm', pairMatch({ id: 'lecpm', sec: 'lec', skill: 'com', pairs: [['1516', 'Carlos I es rey de España.'], ['1520', 'Es emperador del Sacro Imperio.'], ['1558', 'Termina su tiempo como emperador.'], ['1571', 'Batalla de Lepanto (Felipe II).']] }));
    put(s, '.sb', sortBoard({ id: 'lecsb', sec: 'lec', skill: 'com', cols: [{ k: 'P', label: '👨 por vía paterna (Felipe I)' }, { k: 'M', label: '👩 por vía materna (Juana I)' }],
      chips: [['los territorios austriacos', 'P'], ['el derecho al trono imperial', 'P'], ['Castilla', 'M'], ['Aragón', 'M'], ['Navarra', 'M'], ['Nápoles', 'M'], ['Sicilia', 'M'], ['el Nuevo Mundo', 'M']] }));
    put(s, '.c', cloze({ id: 'lecc', sec: 'lec', skill: 'irr', cls: 'lines', text: [
      'Carlos I de España [nació] como primogénito de Felipe I de Habsburgo. <i>(nacer)</i>', '[Fue] rey de España desde 1516 hasta 1556. <i>(ser)</i>',
      'Por vía paterna [heredó] los territorios austriacos. <i>(heredar)</i>', 'El poder de España [estuvo] en su auge. <i>(estar)</i>',
      'Las tropas españolas [lucharon] por todo el continente. <i>(luchar)</i>', 'La coalición [derrotó] a la armada del Imperio otomano. <i>(derrotar)</i>'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: [1, 3, 5, 7, 8, 11, 12, 17].map(k => [D.voc2[k].es, D.voc2[k].kr]) }));
    [0, 6, 9, 10, 13, 14, 15, 16].forEach((k, i) => { const v = D.voc2[k]; put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })); });
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Qué territorios heredó Carlos V de su madre?', kw: [['castilla', 'Castilla'], ['arag[oó]n', 'Aragón'], ['nuevo mundo', 'el Nuevo Mundo']], model: 'Heredó Castilla, Aragón, Navarra, Nápoles, Sicilia y el Nuevo Mundo.' },
      { q: '¿En qué año ocurrió la batalla de Lepanto?', kw: [['1571', '1571']], model: 'Ocurrió en 1571.' },
      { q: '¿Luchó España sola contra el Imperio otomano en la batalla de Lepanto?', kw: [['no', 'No, …'], ['coalici[oó]n|otros pa[ií]ses|cat[oó]licos', 'con otros países católicos']], model: 'No, luchó en una coalición con otros países católicos.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 어제 무슨 일이 있었나요? — 단순과거로 쓰기</h3>${modelo('Ayer <b>regué</b> las plantas y mi padre <b>reparó</b> la tubería.<br>Anoche el perro <b>ladró</b> mucho.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'reg', rows: 3, prompt: '위 단어 2개 이상을 넣어 어제(ayer) 있었던 일을 2문장으로 쓰세요.', ph: 'Ayer …',
      must: [{ re: 'ayer|anoche|pasad[oa]', label: '과거 시간 표현 (ayer, anoche …)' }, { re: 'regu[eé]|reg[oó]|constru|arranc|actriz|estatua|ladr|ciruela|repar|gemel|export|tuber[ií]a|auricular', label: 'Amplía 단어 2개 이상', min: 2 }],
      model: 'Ayer regué las plantas del jardín. Por la tarde mi padre reparó la tubería del baño.' }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 단순과거 (Pretérito indefinido)</h3>
        <h4>(1) 규칙동사</h4>
        <table class="gtab"><tr><th></th><th>cenar</th><th>comer</th><th>salir</th></tr>
          ${[['1인칭 단수', 'cené', 'comí', 'salí'], ['2인칭 단수', 'cenaste', 'comiste', 'saliste'], ['3인칭 단수', 'cenó', 'comió', 'salió'], ['1인칭 복수', 'cenamos', 'comimos', 'salimos'], ['2인칭 복수', 'cenasteis', 'comisteis', 'salisteis'], ['3인칭 복수', 'cenaron', 'comieron', 'salieron']]
            .map(([p, a, b, c]) => `<tr><td>${p}</td><td class="hi">${a}</td><td class="hi">${b}</td><td class="hi">${c}</td></tr>`).join('')}</table>
        ${tip('-ar 와 -er/-ir 두 가지 어미만 외우면 돼요. 1·3인칭 단수의 <b>악센트(é, ó / í, ió)</b>를 꼭 쓰세요: hablo(현재) ↔ habló(과거)')}
        <div class="g1"></div>
        <h4>(2) 용법 — 과거에 종결된 행위나 사건</h4>
        <div class="chips">${['ayer', 'anoche', 'la semana pasada', 'el mes pasado', 'el año pasado', 'hace cinco años'].map((x, i) => `<span class="hlc c${i % 3}">${x}</span>`).join('')}</div>
        <ul class="ul">${['Cené ayer en ese restaurante.', '¿Cuándo empezaste a tocar el piano?', 'Nevó mucho el año pasado.', 'Juan conoció a su mujer en una tienda de helados hace siete años.', 'Aquella noche los actores salieron muy tarde de la ceremonia.'].map(x => `<li>${say(x)} ${x}</li>`).join('')}</ul>
        ${tip('현재완료(hoy, este año …: 지금과 연결된 시간) ↔ 단순과거(ayer, el año pasado …: 끝난 시간)')}
        <div class="sb1"></div>
        <h4>(3) 철자가 변하는 동사들</h4>
        <table class="gtab"><tr><th colspan="2">① -car · -gar · -zar → 1인칭 단수에서 철자 변화 (발음 유지)</th></tr>
          ${[['buscar', 'busqué, buscaste, buscó, buscamos, buscasteis, buscaron'], ['tocar', 'toqué, tocaste, tocó, tocamos, tocasteis, tocaron'], ['llegar', 'llegué, llegaste, llegó, llegamos, llegasteis, llegaron'], ['pagar', 'pagué, pagaste, pagó, pagamos, pagasteis, pagaron'], ['cazar', 'cacé, cazaste, cazó, cazamos, cazasteis, cazaron'], ['empezar', 'empecé, empezaste, empezó, empezamos, empezasteis, empezaron']]
            .map(([v, f]) => `<tr><td>${v}</td><td class="l">${f.replace(/^(\S+),/, '<b class="hi">$1</b>,')}</td></tr>`).join('')}
          <tr><th colspan="2">② 어간이 모음으로 끝나는 동사 → 3인칭 단 · 복수에서 i → y</th></tr>
          ${[['caer', 'caí, caíste, <b class="hi">cayó</b>, caímos, caísteis, <b class="hi">cayeron</b>'], ['creer', 'creí, creíste, <b class="hi">creyó</b>, creímos, creísteis, <b class="hi">creyeron</b>'], ['leer', 'leí, leíste, <b class="hi">leyó</b>, leímos, leísteis, <b class="hi">leyeron</b>'], ['oír', 'oí, oíste, <b class="hi">oyó</b>, oímos, oísteis, <b class="hi">oyeron</b>'], ['construir', 'construí, construiste, <b class="hi">construyó</b>, construimos, construisteis, <b class="hi">construyeron</b>']]
            .map(([v, f]) => `<tr><td>${v}</td><td class="l">${f}</td></tr>`).join('')}</table>
        <div class="g3"></div>
        <h4>(4) 불규칙동사</h4>
        <table class="gtab">${[['ser / ir', 'fui, fuiste, fue, fuimos, fuisteis, fueron'], ['estar', 'estuve, estuviste, estuvo, estuvimos, estuvisteis, estuvieron'], ['decir', 'dije, dijiste, dijo, dijimos, dijisteis, dijeron'], ['hacer', 'hice, hiciste, hizo, hicimos, hicisteis, hicieron'], ['tener', 'tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron'], ['poder', 'pude, pudiste, pudo, pudimos, pudisteis, pudieron'], ['querer', 'quise, quisiste, quiso, quisimos, quisisteis, quisieron'], ['venir', 'vine, viniste, vino, vinimos, vinisteis, vinieron'], ['ver', 'vi, viste, vio, vimos, visteis, vieron'], ['dormir', 'dormí, dormiste, durmió, dormimos, dormisteis, durmieron'], ['morir', 'morí, moriste, murió, morimos, moristeis, murieron']]
          .map(([v, f]) => `<tr><td><b>${v}</b></td><td class="l">${f}</td></tr>`).join('')}</table>
        ${tip('불규칙 단순과거(estuve, hice, tuve, pude, vine …)에는 <b>악센트가 없어요</b>. hizo 는 z!')}
        <div class="g4"></div></div>
      <div class="gcard"><h3>2. 비교구문 (Comparaciones)</h3>
        <h4>(1) 우등 / 열등 비교</h4>
        <table class="gtab"><tr><th>명사 · 형용사 · 부사</th><td class="l"><b>más / menos</b> … <b>que</b></td></tr><tr><th>동사</th><td class="l">동사 + <b>más / menos que</b></td></tr></table>
        <ul class="ul">${['Juan tiene más bolis que lápices.', 'María es menos simpática que Yolanda.', 'Trabajo más que tú.', 'Este perro ladra menos que otros.'].map(x => `<li>${say(x)} ${x}</li>`).join('')}</ul>
        <h4>(2) 동등 비교</h4>
        <div class="cmp"><div><span>📦</span>명사<br><b>tanto/a/os/as … como</b></div><div><span>✨</span>형용사 · 부사<br><b>tan … como</b></div><div><span>🏃</span>동사<br><b>tanto como</b></div></div>
        <ul class="ul">${['No tengo tantas canas como tú.', 'Ella es tan atractiva como su hermana.', 'No corro tanto como ellos.'].map(x => `<li>${say(x)} ${x}</li>`).join('')}</ul>
        ${tip('tanto 는 뒤의 명사에 성 · 수 일치: tant<b>as</b> canas, tant<b>os</b> amigos. 동등 비교는 que 가 아니라 <b>como</b>!')}
        <div class="g5"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'reg', title: '단순과거형을 쓰세요.', cls: 'table2', text:
      [['yo · hablar', 'hablé'], ['tú · comer', 'comiste'], ['él · vivir', 'vivió'], ['nosotros · cenar', 'cenamos'], ['vosotros · beber', 'bebisteis'], ['ellos · salir', 'salieron']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    put(s, '.sb1', sortBoard({ id: 'g2sb', sec: 'gram', skill: 'reg', title: '시간 표현을 알맞은 시제 칸에 넣으세요.', cols: [{ k: 'P', label: '현재완료 he cenado' }, { k: 'I', label: '단순과거 cené' }],
      chips: [['hoy', 'P'], ['esta mañana', 'P'], ['este año', 'P'], ['últimamente', 'P'], ['ayer', 'I'], ['la semana pasada', 'I'], ['el año pasado', 'I'], ['hace cinco años', 'I']] }));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'ort', title: '철자 변화에 주의해서 쓰세요.', cls: 'table2', text:
      [['yo · buscar', 'busqué'], ['yo · llegar', 'llegué'], ['yo · empezar', 'empecé'], ['él · leer', 'leyó'], ['ellos · oír', 'oyeron'], ['ella · caer', 'cayó']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    put(s, '.g4', cloze({ id: 'g4', sec: 'gram', skill: 'irr', title: '불규칙 단순과거를 쓰세요.', cls: 'table2', text:
      [['yo · ir', 'fui'], ['tú · estar', 'estuviste'], ['él · hacer', 'hizo'], ['nosotros · tener', 'tuvimos'], ['ellos · venir', 'vinieron'], ['yo · decir', 'dije'], ['ella · dormir', 'durmió'], ['ellos · morir', 'murieron']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    [['🐢 la tortuga < 🐇 el conejo (rápido)', ['La tortuga es menos rápida que el conejo.', 'El conejo es más rápido que la tortuga.']],
      ['👩 Ana = 👧 su hermana (alta)', ['Ana es tan alta como su hermana.']],
      ['📚 yo 10 libros = tú 10 libros', ['Tengo tantos libros como tú.', 'Yo tengo tantos libros como tú.']]]
      .forEach(([p, a], i) => put(s, '.g5', writeItem({ id: 'g5-' + i, sec: 'gram', skill: 'cmp', prompt: p, answers: a })));
  };

  /* ---------- 연습문제 ---------- */
  const ej = (id, n, title, skill, lines, kr) => () => {
    const s = sec(id, `${ejHead(n, title, kr ? { kr } : {})}<div class="c"></div>`);
    put(s, '.c', cloze({ id, sec: id, skill, cls: 'lines', text: lines.map(x => `<p>${x}</p>`).join('') }));
  };
  B.e1 = ej('e1', 1, '괄호 안의 동사를 활용하여 단순과거형 문장을 만드세요.', 'reg', [
    '1. ¿[Hablaste] con el jefe? <i>(hablar, tú)</i>', '2. Ayer [nos acostamos] a las once y media. <i>(acostarse, nosotros)</i>',
    '3. Begoña [recibió] una postal. <i>(recibir)</i>', '4. Los niños no [volvieron] a tiempo. <i>(volver)</i>', '5. ¿[Regasteis] las plantas? <i>(regar, vosotros)</i>']);
  B.e2 = ej('e2', 2, '괄호 안의 동사를 활용하여 단순과거형 문장을 만드세요.', 'ort', [
    '1. [Toqué] la estatua de Don Quijote en la Plaza de España. <i>(tocar, yo)</i>', '2. ¿[Jugaste] al baloncesto con tus amigos? <i>(jugar, tú)</i>',
    '3. ¿Qué novela [leyeron] la semana pasada? <i>(leer, ustedes)</i>', '4. ¿[Oyó] algo? <i>(oír, usted)</i>', '5. Los mayas [construyeron] la Pirámide del Sol. <i>(construir)</i>'], 'toqué(c→qu) · jugué(g→gu) · leyó/leyeron(i→y)');
  B.e3 = ej('e3', 3, '괄호 안의 동사를 활용하여 단순과거형 문장을 만드세요.', 'irr', [
    '1. [Estuvimos] en la reunión del lunes pasado. <i>(estar, nosotras)</i>', '2. No [pudieron] arrancar el coche. <i>(poder, ellos)</i>',
    '3. Muchos soldados [murieron] en la Segunda Guerra Mundial. <i>(morir)</i>', '4. El domingo [hicieron] la compra para toda la semana. <i>(hacer, ellos)</i>',
    '5. [Tuvieron] que abandonar el lugar inmediatamente. <i>(tener, ellos)</i>']);
  B.e4 = () => {
    const s = sec('e4', `${ejHead(4, '괄호 안에 알맞은 단어를 넣어 문장을 완성하세요.', { kr: 'que 앞에는 más / menos, como 앞에는 tan / tanto' })}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e4', sec: 'e4', skill: 'cmp', cls: 'lines', text: [
      '1. 🚆 El tren es [más|menos] rápido que el autobús.', '2. 👬 Manuel tiene [más|menos] amigos que Julio.', '3. 🤝 Ustedes son [tan] responsables como nosotros.',
      '4. 🥵 Este año hace [más|menos] calor que el año pasado.', '5. 🍑 Los melocotones son [más|menos] grandes que las ciruelas.'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '보기와 같이 주어진 현재완료형 문장을 단순과거형 문장으로 바꾸어 보세요.')}
      ${modelo('Has tomado demasiado café hoy por la mañana.<br>→ <b>Tomaste</b> demasiado café <b>ayer</b> por la mañana.', '보기')}<div class="items"></div>`);
    [['(1) Este año hemos tenido gemelos.', ['El año pasado tuvimos gemelos.', 'Tuvimos gemelos el año pasado.']],
      ['(2) Hoy por la tarde han venido a reparar la tubería.', ['Ayer por la tarde vinieron a reparar la tubería.']],
      ['(3) Esta semana ha llovido bastante.', ['La semana pasada llovió bastante.']],
      ['(4) Habéis exportado mucho este mes.', ['Exportasteis mucho el mes pasado.', 'El mes pasado exportasteis mucho.']],
      ['(5) En este curso hemos aprendido a tocar la guitarra.', ['En el curso pasado aprendimos a tocar la guitarra.']],
      ['(6) Hoy hemos tenido pocos clientes en el restaurante.', ['Ayer tuvimos pocos clientes en el restaurante.']]]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'ac1-' + i, sec: 'ac1', skill: i === 2 || i === 3 || i === 4 ? 'reg' : 'irr', prompt: `${p} ${say(p.slice(4))}`, ph: '→ 시간 표현도 과거로!', answers: a })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '다음에 제시된 역사적 사건을 보기와 같이 문장 형태로 완성하세요.')}
      ${modelo('descubrimiento de América / en 1492 (descubrir)<br>→ <b>Descubrieron</b> América en 1492.', '보기')}
      <div class="tl11">${[['1492', '⛵ descubrimiento de América'], ['1492', '📘 primera gramática del español'], ['1616', '🖋️ muerte de Cervantes'], ['1813', '🎼 nacimiento de Wagner'], ['1997', '🏛️ Museo Guggenheim Bilbao'], ['1999', '🇲🇴 devolución de Macao'], ['2014', '👑 coronación de Felipe VI']].map(([y, t]) => `<div><b>${y}</b><span>${t}</span></div>`).join('')}</div>
      <div class="items"></div>`);
    [['(1) nacimiento de Wagner / en 1813 (nacer)', ['Wagner nació en 1813.', 'Nació Wagner en 1813.']],
      ['(2) muerte de Cervantes / en 1616 (morir)', ['Cervantes murió en 1616.', 'Murió Cervantes en 1616.']],
      ['(3) publicación de la primera gramática del español / en 1492 (publicar)', ['Publicaron la primera gramática del español en 1492.']],
      ['(4) inauguración del Museo Guggenheim Bilbao / en 1997 (inaugurar)', ['Inauguraron el Museo Guggenheim Bilbao en 1997.']],
      ['(5) coronación de Felipe VI de España / en 2014 (coronar)', ['Coronaron a Felipe VI de España en 2014.']],
      ['(6) devolución de Macao / en 1999 (devolver)', ['Devolvieron Macao en 1999.']]]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'ac2-' + i, sec: 'ac2', skill: i < 2 ? 'irr' : 'reg', prompt: p, answers: a })));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '보기와 같이 언급된 날에 여러분이 한 일을 말해 보세요.')}
      ${modelo('A: ¿Qué hiciste en Navidad?<br>B: Tuvimos una cena con la familia de mis tíos.', '보기')}<div class="items"></div>`);
    [['🌟', 'en Nochebuena', 'En Nochebuena cené con mi familia en casa.'], ['🎆', 'en Nochevieja', 'En Nochevieja comí doce uvas con mis amigos.'],
      ['👑', 'el día de los Reyes Magos', 'El día de los Reyes Magos recibí muchos regalos.'], ['💝', 'el día de San Valentín', 'El día de San Valentín le di chocolate a mi novio.'],
      ['🎂', 'el día de tu cumpleaños', 'El día de mi cumpleaños fui al cine con mi hermano.'], ['🏫', 'el primer día del curso', 'El primer día del curso conocí a mis compañeros nuevos.']]
      .forEach(([e, d, md], i) => put(s, '.items', freeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'lib', line: true, prompt: `<span class="emo-sm">${e}</span> ¿Qué hiciste ${d}? ${say('¿Qué hiciste ' + d + '?')}`,
        must: [{ re: W0 + '(' + IND + ')' + W1, label: '단순과거 동사' }], minWords: 5, model: md })));
  };
  B.ac4 = () => {
    const s = sec('ac4', `${acHead(4, '보기와 같이 문장을 완성하세요.')}
      ${modelo('Pablo normalmente cena en casa con su familia,<br>pero ayer <b>cenó</b> en un restaurante con sus compañeros de trabajo.', '보기')}
      ${tip('normalmente(평소) → 현재형 / ayer · el domingo pasado(그날) → 단순과거')}<div class="items"></div>`);
    [['(1) Mi padre normalmente llega a casa a las ocho, pero ayer …', 'lleg[oó]', 'llegó', 'Mi padre normalmente llega a casa a las ocho, pero ayer llegó a las once.'],
      ['(2) Normalmente me ducho por la mañana, pero ayer …', 'me duch[eé]', 'me duché', 'Normalmente me ducho por la mañana, pero ayer me duché por la noche.'],
      ['(3) Esa pareja normalmente va al cine los domingos, pero el domingo pasado …', 'fue|fueron', 'fue / fueron', 'Esa pareja normalmente va al cine los domingos, pero el domingo pasado fue al teatro.'],
      ['(4) Ellos normalmente van al trabajo en metro, pero el miércoles pasado …', 'fueron', 'fueron', 'Ellos normalmente van al trabajo en metro, pero el miércoles pasado fueron en taxi.'],
      ['(5) Yo en el metro normalmente duermo, pero ayer …', W0 + '(dorm[ií]|le[ií]|escuch[eé]|estudi[eé]|habl[eé]|mir[eé]|jugu[eé]|vi|escrib[ií])' + W1, '1인칭 단순과거 (leí, escuché …)', 'Yo en el metro normalmente duermo, pero ayer leí un libro.'],
      ['(6) María normalmente escucha música con auriculares, pero ayer …', W0 + '(escuch[oó]|ley[oó]|habl[oó]|vio|durmi[oó]|estudi[oó]|jug[oó])' + W1, '3인칭 단순과거 (escuchó, leyó …)', 'María normalmente escucha música con auriculares, pero ayer escuchó la radio.']]
      .forEach(([p, re, lab, md], i) => put(s, '.items', freeItem({ id: 'ac4-' + i, sec: 'ac4', skill: i === 1 || i === 4 || i === 5 ? 'reg' : 'irr', line: true, prompt: p, ph: '… pero ayer …',
        must: [{ re: 'pero (ayer|el (domingo|mi[eé]rcoles) pasado)', label: 'pero ayer / el … pasado' }, { re: re, label: lab }], model: md })));
  };
  B.ac5 = () => {
    const s = sec('ac5', `${acHead(5, '다음은 세르반테스의 생애에 관한 설명입니다. 괄호 안의 동사를 단순과거형으로 활용하여 내용을 파악하세요.')}
      <div class="tl11">${[['1547', '🍼 Alcalá de Henares'], ['1566', '🏙️ Madrid'], ['1571', '⚔️ Lepanto'], ['1575~80', '⛓️ Argel'], ['1605', '📖 Don Quijote I'], ['1615', '📖 Don Quijote II'], ['1616', '✝️ muerte']].map(([y, t]) => `<div><b>${y}</b><span>${t}</span></div>`).join('')}</div>
      <div class="c"></div><h3 class="h3">🔎 내용 확인</h3><div class="items q"></div>`);
    put(s, '.c', cloze({ id: 'ac5', sec: 'ac5', skill: 'irr', cls: 'lines', text: `<p>Miguel de Cervantes Saavedra [fue] <i>(ser)</i> un soldado, novelista, poeta y dramaturgo español. [Nació] <i>(nacer)</i> el 29 de septiembre de 1547 en Alcalá de Henares. Cuando era pequeño, su familia [se mudó] <i>(mudarse)</i> a varias ciudades españolas como Córdoba, Sevilla, Toledo, Guadalajara y Valladolid. Cervantes [se estableció] <i>(establecerse)</i> en Madrid en 1566. [Viajó] <i>(viajar)</i> a Italia y [participó] <i>(participar)</i> en la batalla de Lepanto. Después, al volver a España, los turcos lo [capturaron] <i>(capturar)</i> y lo [llevaron] <i>(llevar)</i> a Argel. Cervantes [pasó] <i>(pasar)</i> 5 años aprisionado allí. Después de regresar a España, [escribió] <i>(escribir)</i> varias obras sin mucho éxito. Finalmente, [publicó] <i>(publicar)</i> la primera parte de <i>El ingenioso hidalgo Don Quijote de la Mancha</i> en 1605 y la segunda parte en 1615. Cervantes ocupa un importante puesto en la historia de la literatura universal junto con Dante Alighieri, William Shakespeare y Johann Wolfgang von Goethe.</p>` }));
    [['¿Dónde nació Cervantes?', ['Alcalá de Henares', 'Madrid', 'Sevilla', 'Toledo'], 'Alcalá de Henares'], ['¿Cuántos años pasó en Argel?', ['5 años', '2 años', '10 años', '1 año'], '5 años'],
      ['¿En qué año publicó la primera parte del Quijote?', ['1605', '1547', '1571', '1615'], '1605']]
      .forEach(([p, o, a], i) => put(s, '.q', choiceItem({ id: 'ac5q' + i, sec: 'ac5', skill: 'com', prompt: p + ' ' + say(p), options: o, answer: a })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('1492년의 의미', [
      { e: '⛵', h: '신대륙 발견', t: '콜럼버스가 이 해에 신대륙에 도착한다. 탐사 지원을 구하지 못해 고민하던 그는 마침내 카스티야의 <b>이사벨 여왕</b>으로부터 지원을 얻어 항해에 나섰다.' },
      { e: '🧭', h: '콜럼버스의 출생 논란', t: '이탈리아 제노바 출신이라는 설이 지배적이었으나, 스페인 카탈루냐 지방에서 세례를 받았다는 기록이 최근 발견되면서 출생에 관한 논란은 여전히 이어지고 있다.' },
      { e: '🏰', h: '국토 수복 (Reconquista)', t: '711년 침공 이래 이베리아 반도에 있던 이슬람 세력을 축출한 해. 카스티야와 아라곤의 연합 세력이 <b>그라나다</b>의 마지막 이슬람 왕국으로부터 항복을 받아냈다.' },
      { e: '📘', h: '최초의 스페인어 문법서', t: '<b>안토니오 데 네브리하</b>(Antonio de Nebrija)가 『<b>Gramática castellana</b>』를 출판했다. 철자 · 발음 · 문법을 두루 살펴 올바른 용법을 정립한 최초의 시도로 평가받는다.' }
    ], '1492년은 여러 측면에서 스페인 역사에 중요한 해예요. Actividades 2의 연표에도 두 번 나왔죠!') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['콜럼버스의 항해를 후원한 사람은?', ['이사벨 여왕', '카를로스 1세', '펠리페 2세', '알폰소 2세'], '이사벨 여왕', 'Isabel la Católica, reina de Castilla'],
      ['1492년에 함락된 마지막 이슬람 왕국은?', ['그라나다', '코르도바', '톨레도', '세비야'], '그라나다', 'Reconquista의 완성'],
      ['최초의 스페인어 문법서를 쓴 사람은?', ['안토니오 데 네브리하', '세르반테스', '콜럼버스', '카를로스 5세'], '안토니오 데 네브리하', 'Gramática castellana (1492)']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
    [['Colón ____ a América en 1492. <i>(llegar)</i>', ['llegó']], ['Nebrija ____ la Gramática castellana. <i>(publicar)</i>', ['publicó']]]
      .forEach(([p, a], i) => put(s, '.q', writeItem({ id: 'cul-w' + i, sec: 'cultura', skill: 'reg', prompt: p, ph: '동사만 쓰세요', answers: a })));
  };

  SC.lesson({
    num: '11',
    title: 'Me lo pasé bien en la cena de Nochebuena',
    ttsTest: 'Me lo pasé bien en la cena de Nochebuena.',
    cover: {
      emoji: '🎄🍗<small>👑 📜</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 50%,#a32638)',
      tema: ['La Navidad en España', 'Historia de España: Carlos I, Cervantes, 1492'],
      com: ['단순과거: Cenaron fuera de casa ayer. · Llovió mucho el año pasado.', '비교급: Juan es más fuerte que Pedro. · Ella es tan atractiva como tú.'],
      gram: ['단순과거 규칙동사 (-é, -aste, -ó / -í, -iste, -ió)', '철자 변화: busqué, llegué, empecé / leyó, oyeron', '불규칙: fui, estuve, hice, tuve, pude, vine, dije …', '비교: más/menos … que · tan … como · tanto como']
    },
    skills: D.skills,
    sections: D.sections,
    people: { Manuel: { g: 'm', av: '🧑🏻', side: 'l' }, Nuria: { g: 'f', av: '👩🏻‍🦰', side: 'r' } },
    errLabels: { conjugacion: '단순과거 변화', ortografia: '철자 변화 (qu · gu · c · y)', comparacion: '비교 (más · tan · como · que)' },
    errTips: {
      acento: '규칙 단순과거 1·3인칭 단수엔 악센트: cené, comió, salí, habló (hablo = 현재!)',
      conjugacion: '불규칙: fui, estuve, hice/hizo, tuve, pude, vine, dije, durmió, murió',
      ortografia: 'tocar→toqué, llegar→llegué, empezar→empecé, leer→leyó, oír→oyeron',
      comparacion: 'más/menos … que · tan + 형용사 + como · tanto(s) + 명사 + como'
    },
    classify(ti, ta) {
      const CMP = ['más', 'menos', 'tan', 'tanto', 'tanta', 'tantos', 'tantas', 'que', 'como'];
      if (ti.filter(w => CMP.includes(w)).join() !== ta.filter(w => CMP.includes(w)).join() && ta.some(w => CMP.includes(w))) return 'comparacion';
      const v = ta.find(w => /(qué|gué|cé|yó|yeron)$/.test(w));
      if (v && !ti.includes(v)) return 'ortografia';
      const IR = /(é|aste|ó|amos|asteis|aron|í|iste|ió|imos|isteis|ieron|e|o|imos|ieron)$/;
      const vi = ti.find(w => IR.test(w) && w.length > 2), va = ta.find(w => IR.test(w) && w.length > 2);
      if (va && vi && vi !== va && vi.slice(0, 2) === va.slice(0, 2)) return 'conjugacion';
      return null;
    },
    errRules: [
      { re: W0 + '(tocé|tocè|jugé|llegé|pagé|buscé|empezé|cazé)' + W1, t: 'ortografia', msg: 'toqué · jugué · llegué · pagué · busqué · empecé · cacé' },
      { re: W0 + '(leió|leio|oió|oio|creió|caió|construió|construio|leieron|oieron)' + W1, t: 'ortografia', msg: '모음 사이 i → y: leyó, oyó, construyó' },
      { re: W0 + '(hací|hació|tení|tenió|estí|estó|podí|vení|venió|hizó|hicé|tuvé|estuvé|pudé|viné|dijé|fuí|fué)' + W1, t: 'conjugacion', msg: '불규칙 단순과거: hice, hizo, tuve, estuve, pude, vine, dije, fui, fue (악센트 없음)' },
      { re: W0 + '(dormió|morió|dormieron|morieron)' + W1, t: 'conjugacion', msg: 'durmió · murió · durmieron · murieron' },
      { re: W0 + 'm[aá]s mejor' + W1, t: 'comparacion', msg: '"más mejor"(✕) → mejor' }
    ],
    accWords: ['comí', 'salí', 'comió', 'salió', 'recibió', 'leyó', 'oyó', 'construyó', 'murió', 'durmió', 'nació', 'tíos', 'después', 'también', 'mañana', 'tubería', 'busqué', 'toqué', 'llegué', 'empecé'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Mis vacaciones de Navidad → 글로 쓰기',
        icons: ['🎄', '🍽️', '🎁'],
        questions: ['¿Qué hiciste en Nochebuena y en Navidad? ¿Con quién estuviste?', '¿Qué comisteis? ¿Quién cocinó? ¿Qué regalos recibiste?', '¿Fue esta Navidad mejor o peor que la del año pasado? Compara (más … que / tan … como).'],
        minWords: 55,
        hint: '단순과거(규칙 · 불규칙) · 시간 표현(ayer, el año pasado) · 비교구문을 모두 쓰면 높은 점수!',
        ph: 'En Nochebuena cené con mi familia …',
        connectors: ['y', 'pero', 'porque', 'además', 'después', 'luego', 'entonces', 'por eso', 'también'],
        rubric: [
          { k: 'nav', label: '크리스마스 내용 (Nochebuena, Navidad, regalos, cena …)', max: 8, re: 'nochebuena|navidad|regalos?|cena|nochevieja|reyes|familia', min: 2, ax: 'Contenido' },
          { k: 'reg', label: '규칙 단순과거 3개 이상', max: 10, re: '[a-záéíóúñ]+(é|ó|aste|amos|aron|í|ió|iste|imos|ieron)', min: 3, ax: 'Gramática' },
          { k: 'irr', label: '불규칙 단순과거 (fui, estuve, hice, tuve, vino …)', max: 10, re: 'fui|fue|fuimos|fueron|estuve|estuvo|estuvimos|hice|hizo|hicimos|tuve|tuvo|tuvimos|vine|vino|vinieron|pude|dije|dijo|quise|vi|vio', ax: 'Gramática' },
          { k: 'tie', label: '과거 시간 표현 (ayer, el año pasado …)', max: 6, re: 'ayer|anoche|pasad[oa]|hace [a-z0-9]+ (d[ií]as|a[nñ]os|semanas)|aquella noche|el 2[45] de diciembre', ax: 'Gramática' },
          { k: 'cmp', label: '비교구문 (más/menos … que · tan … como)', max: 10, re: '(m[aá]s|menos) [^.?!]*que|tan [a-záéíóúñ]+ como|tant[oa]s? [^.?!]*como|mejor que|peor que', ax: 'Gramática' }
        ],
        model: 'En Nochebuena cené con mi familia y vinieron mis tíos y mis primos. Mi madre cocinó cordero asado y comimos hasta muy tarde. Después cantamos villancicos. El día de Navidad recibí muchos regalos y fui al cine con mi hermano. Esta Navidad fue más divertida que la del año pasado porque estuvimos todos juntos, pero no hizo tanto frío como el año pasado.'
      }
    },
    build: B
  });
})();
