/* Lección 06 · Me levanto a las seis de la mañana — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 81~94쪽 : Diálogo → Vocabulario·Contesta → Lectura → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~3) → Actividades 1~3 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK, dclock } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .vtab .vt{position:static;inset:auto;display:flex;grid-template-columns:none;text-align:left;padding:4px 0}.vtab .vt b{display:inline;margin:0;font-size:15px}.vtab .vt span{display:block;font-family:inherit;font-size:14px;margin:0}
    .tline{position:relative;margin:14px 0 14px 18px;border-left:4px solid #f6a04d;padding-left:18px}
    .tline .ts{position:relative;margin:0 0 10px;background:#fff;border:1px solid #eee;border-radius:10px;padding:8px 12px;font-size:15px}
    .tline .ts:before{content:'';position:absolute;left:-29px;top:12px;width:14px;height:14px;border-radius:50%;background:#f26a21;border:3px solid #fff;box-shadow:0 0 0 2px #f26a21}
    .tline .ts b{color:#c2410c;margin-right:8px;font-variant-numeric:tabular-nums}
    .ordq .ord-line{min-height:46px;display:flex;flex-direction:column;gap:6px;margin:8px 0;padding:8px;border:2px dashed #e6d58e;border-radius:12px;background:#fffbe6}
    .ordq .ord-bank{display:flex;flex-wrap:wrap;gap:6px}
    .uyuni{font-size:15px;line-height:1.85;background:linear-gradient(180deg,#e9f6fd,#fff);border:1px solid #cfe7f5;border-radius:14px;padding:14px 18px}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      ref: 'Reflexivos 재귀동사',
      obl: 'Obligación 의무 표현',
      irr: 'e → ie 불규칙동사',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '라파엘과 테레사', group: 'Diálogo · Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'lec', label: 'Lectura', kr: '스페인 사람들의 첫 질문', group: 'Diálogo · Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo · Lectura' },
      { id: 'gram', label: 'Gramática', kr: '재귀동사 · 의무 표현 · e→ie', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '재귀동사 주어 바꾸기', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: 'tener que · deber', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: 'e → ie 동사 활용', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'ac1', label: 'Actividades 1', kr: '문장과 그림 연결', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '하루 일과 시간 순서', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '나와 내 가족 소개', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'cultura', label: 'Cultura', kr: '우유니 소금 사막', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Rafael', es: '¿Quieres venir al cine [conmigo] este sábado?' },
      { who: 'Teresa', es: '[Lo siento]. Es que no tengo tiempo. Ese día [tengo que] preparar un examen.' },
      { who: 'Rafael', es: 'Entonces, ¿qué haces [normalmente] los fines de semana?' },
      { who: 'Teresa', es: '[Descanso] sin hacer nada porque de lunes a viernes siempre estoy [cansada].' },
      { who: 'Rafael', es: '¿Por qué?' },
      { who: 'Teresa', es: 'Todos los días [me levanto] a las seis de la mañana. [Me lavo] la cara, luego desayuno con mucha prisa. Salgo de mi casa a las siete. Llego a la escuela a las siete y media. Las clases [empiezan] a las ocho y terminan a las tres de la tarde. [Regreso] a casa a las tres y media. [Me ducho], y hago los deberes hasta las seis. [Ceno] con mi familia y después estudio. Después de [limpiarme] los dientes [me acuesto] a las once de la noche.' },
      { who: 'Rafael', es: '¡Qué [barbaridad]!' }
    ],
    lectura: [
      'Dos españoles empiezan a conocerse en una fiesta, o en un tren, o en la playa, o en un bar... «¿De dónde es usted?» o «¿De dónde eres?» son, casi siempre, las primeras preguntas. Luego, lo explican con muchos detalles. Por ejemplo: «Yo soy aragonés, pero vivo en Cataluña desde el 99... Mis padres son de Teruel, tengo treinta años y bla, bla, bla».',
      'Y es que cada región española es muy diferente: la historia, las tradiciones, la lengua, la economía, el paisaje, las maneras de vivir, incluso el aspecto físico de las personas.'
    ],
    voc1: [
      { es: 'cansado', kr: '피곤한', e: '😩' }, { es: 'empezar', kr: '시작하다', e: '▶️' }, { es: 'regresar', kr: '~로 돌아가다', e: '🔙' },
      { es: 'preparar', kr: '준비하다', e: '📝' }, { es: 'deberes', kr: '과제, 숙제 (항상 복수)', e: '📚' }, { es: 'normalmente', kr: '일반적으로, 보통', e: '🔁' },
      { es: 'semana', kr: '주', e: '📅' }, { es: 'fin de semana', kr: '주말', e: '🛋️' }, { es: 'limpiarse', kr: '깨끗이 하다, 닦다', e: '🪥' },
      { es: 'acostarse', kr: '눕다, 잠자리에 들다', e: '🛌' }, { es: 'barbaridad', kr: '과도, 지나침', e: '😱' }, { es: 'sábado', kr: '토요일', e: '6️⃣' },
      { es: 'lo siento', kr: '미안해', e: '🙏' }, { es: 'examen', kr: '시험', e: '💯' }, { es: 'cenar', kr: '저녁 식사하다', e: '🍽️' },
      { es: 'ducharse', kr: '샤워하다', e: '🚿' }, { es: 'lavarse', kr: '(물로) 씻다', e: '🧼' }, { es: 'descansar', kr: '쉬다', e: '😌' },
      { es: 'lunes', kr: '월요일', e: '1️⃣' }, { es: 'viernes', kr: '금요일', e: '5️⃣' }, { es: 'diente', kr: '치아', e: '🦷' }
    ],
    voc2: [
      { es: 'empezar a + inf.', kr: '~하기 시작하다', e: '🏁' }, { es: 'tren', kr: '기차', e: '🚆' }, { es: 'casi', kr: '거의', e: '≈' },
      { es: 'luego', kr: '곧, 이윽고, 이어서', e: '⏭️' }, { es: 'detalle', kr: '세부적인 것, 세목', e: '🔍' }, { es: 'por ejemplo', kr: '예를 들어', e: '💬' },
      { es: 'región', kr: '지역, 지방', e: '🗺️' }, { es: 'diferente', kr: '다른', e: '🔀' }, { es: 'historia', kr: '역사', e: '🏛️' },
      { es: 'tradición', kr: '전통', e: '🎎' }, { es: 'lengua', kr: '언어, 혀', e: '👅' }, { es: 'economía', kr: '경제', e: '💶' },
      { es: 'paisaje', kr: '풍경', e: '🏞️' }, { es: 'manera', kr: '방식, 방법', e: '🛠️' }, { es: 'incluso', kr: '심지어, 포함하여', e: '➕' },
      { es: 'aspecto', kr: '형태, 모양', e: '👤' }, { es: 'físico', kr: '육체적인, 신체의', e: '💪' }
    ],
    amplia: [
      { es: 'salud', kr: '건강', e: '❤️‍🩹' }, { es: 'frío', kr: '차가운', e: '🧊' }, { es: 'paciencia', kr: '인내심', e: '⏳' },
      { es: 'temprano', kr: '일찍', e: '🌅' }, { es: 'ver', kr: '보다', e: '👀' }, { es: 'autobús', kr: '버스', e: '🚌' },
      { es: 'vender', kr: '팔다', e: '🏷️' }, { es: 'apartamento', kr: '(작은) 아파트', e: '🏢' }, { es: 'periódico', kr: '신문', e: '📰' }
    ],

    examBank: [
      { p: 'Todos los días yo ____ levanto a las seis.', a: ['me'], s: 'ref' },
      { p: 'Mi padre ____ afeita cada mañana.', a: ['se'], s: 'ref' },
      { p: 'Nosotros ____ lavamos las manos.', a: ['nos'], s: 'ref' },
      { p: 'Vosotros ____ acostáis muy tarde.', a: ['os'], s: 'ref' },
      { p: '¿A qué hora ____ levantas tú?', a: ['te'], s: 'ref' },
      { p: 'Ellos se ____ deprisa. <i>(vestirse)</i>', a: ['visten'], s: 'ref' },
      { p: 'Yo me ____ a las once. <i>(acostarse)</i>', a: ['acuesto'], s: 'ref' },
      { p: 'Después de ____ los dientes, me acuesto. <i>(limpiarse, 나)</i>', a: ['limpiarme'], s: 'ref' },
      { p: 'Tengo ____ preparar un examen.', a: ['que'], s: 'obl' },
      { p: '____ que comer frutas y verduras. <i>(일반적 의무)</i>', a: ['hay'], s: 'obl' },
      { p: 'Tú ____ estudiar mucho. <i>(deber)</i>', a: ['debes'], s: 'obl' },
      { p: 'Nosotros ____ que regresar temprano. <i>(tener)</i>', a: ['tenemos'], s: 'obl' },
      { p: 'No ____ que fumar aquí. <i>(여기서 담배 피우면 안 된다)</i>', a: ['hay'], s: 'obl' },
      { p: 'Las clases ____ a las ocho. <i>(empezar)</i>', a: ['empiezan'], s: 'irr' },
      { p: 'Yo ____ estudiar español con Isabel. <i>(pensar)</i>', a: ['pienso'], s: 'irr' },
      { p: 'Ella ____ siempre el autobús. <i>(perder)</i>', a: ['pierde'], s: 'irr' },
      { p: 'Nosotros ____ el té al café. <i>(preferir)</i>', a: ['preferimos'], s: 'irr' },
      { p: 'Ustedes no ____ el problema. <i>(entender)</i>', a: ['entienden'], s: 'irr' },
      { p: '¿____ la tienda a las cinco? <i>(cerrar, ellos)</i>', a: ['cierran'], s: 'irr' },
      { p: 'Raúl ____ a correr. <i>(comenzar)</i>', a: ['comienza'], s: 'irr' }
    ]
  };

  const B = {};
  const REFL = W0 + '(me|te|se|nos|os) [a-záéíóúñ]+' + W1;
  const OBL = '(tengo|tienes|tiene|tenemos|ten[eé]is|tienen) que|(debo|debes|debe|debemos|deb[eé]is|deben) [a-záéíóúñ]+r|hay que';

  /* ---------- Diálogo ---------- */
  const DAY = [['6:00', 'Me levanto.', '⏰'], ['6:10', 'Me lavo la cara.', '🧼'], ['6:20', 'Desayuno con mucha prisa.', '🥐'], ['7:00', 'Salgo de mi casa.', '🚪'], ['7:30', 'Llego a la escuela.', '🏫'],
    ['8:00', 'Las clases empiezan.', '📖'], ['15:00', 'Las clases terminan.', '🔔'], ['15:30', 'Regreso a casa y me ducho.', '🚿'], ['–18:00', 'Hago los deberes.', '📚'], ['19:00', 'Ceno con mi familia y estudio.', '🍽️'], ['23:00', 'Me limpio los dientes y me acuesto.', '🛌']];
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'Rafael y Teresa')}
      <div class="dslot"></div>
      <h3 class="h3">⏱️ 테레사의 하루 — 타임라인</h3><div class="tline">${DAY.map(([t, x, e]) => `<div class="ts"><b>${t}</b>${e} ${x} ${say(x)}</div>`).join('')}</div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🕗 몇 시에? — 시각을 스페인어로 쓰세요</h3><div class="tq"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'ref', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    put(s, '.tq', cloze({ id: 'd1t', sec: 'd1', skill: 'com', cls: 'lines', text:
      ['⏰ Teresa se levanta a las [seis] de la mañana.', '🚪 Sale de su casa a las [siete].', '🏫 Llega a la escuela a las siete y [media].', '📖 Las clases empiezan a las [ocho] y terminan a las [tres] de la tarde.', '🛌 Se acuesta a las [once] de la noche.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.filter((v, i) => i % 2 === 0).forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Qué tiene que hacer Teresa este sábado?', kw: [['tiene que', 'tiene que + 동사원형'], ['preparar un examen', 'preparar un examen']], model: 'Tiene que preparar un examen.' },
      { q: '¿Cómo está Teresa de lunes a viernes?', kw: [['cansada', 'cansada']], model: 'Siempre está cansada.' },
      { q: '¿Con quién cena Teresa?', kw: [['familia', 'con su familia']], model: 'Cena con su familia.' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lec = () => {
    const s = sec('lec', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <div class="lslot"></div>
      <h3 class="h3">🗺️ 스페인 사람의 자기소개 — 지도 카드</h3>
      <div class="cul-grid">${[['🏔️', 'Aragón', 'aragonés — 아라곤 사람'], ['🌊', 'Cataluña', '지금 사는 곳 (desde el 99)'], ['🏰', 'Teruel', '부모님의 고향 (아라곤 지방)']].map(([e, h, t]) => `<div class="cul-c"><div class="cul-e">${e}</div><h4>${h}</h4><p>${t}</p></div>`).join('')}</div>
      <h3 class="h3">✔️ 지역마다 다른 것 — 글에 나온 것을 모두 고르세요</h3><div class="sb"></div>`);
    put(s, '.lslot', readBlock(D.lectura, { img: '🇪🇸', g: 'm' }));
    put(s, '.sb', sortBoard({ id: 'lecsb', sec: 'lec', skill: 'com', cols: [{ k: 's', label: '✅ 글에 나와요' }, { k: 'n', label: '❌ 글에 없어요' }],
      chips: [['la historia', 's'], ['las tradiciones', 's'], ['la lengua', 's'], ['la economía', 's'], ['el paisaje', 's'], ['las maneras de vivir', 's'], ['el aspecto físico', 's'], ['la religión', 'n'], ['la comida', 'n'], ['el clima', 'n']] }));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.slice(1, 9).map(v => [v.es, v.kr]) }));
    D.voc2.slice(9).forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Dónde empiezan a conocerse los dos españoles?', kw: [['fiesta|tren|playa|bar', 'en una fiesta / un tren / la playa / un bar']], model: 'Empiezan a conocerse en una fiesta, en un tren, en la playa o en un bar.' },
      { q: '¿Cuáles son las primeras preguntas?', kw: [['de d[oó]nde (es usted|eres)', '¿De dónde es usted? / ¿De dónde eres?']], model: 'Las primeras preguntas son «¿De dónde es usted?» o «¿De dónde eres?».' },
      { q: '¿Las maneras de vivir son diferentes en cada región española?', kw: [['s[ií]', 'Sí'], ['diferentes', 'son diferentes']], model: 'Sí, las maneras de vivir son diferentes en cada región.' },
      { q: '¿La religión es muy diferente en cada región española?', kw: [['no', 'No (글에 나오지 않아요)']], model: 'No, el texto no habla de la religión.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 의무 표현으로 조언하기</h3>${modelo('Para tener buena <b>salud</b>, <b>hay que</b> comer frutas y verduras.<br>Tienes que tener más <b>paciencia</b>.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 3 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'obl', rows: 3, prompt: '위 단어 2개 이상을 넣어 친구에게 조언하는 문장 2개를 쓰세요.', ph: 'Para tener buena salud, hay que …',
      must: [{ re: OBL, label: 'tener que / deber / hay que' }, { re: D.amplia.map(a => SC.rx(a.es)).join('|'), label: 'Amplía 단어 2개 이상', min: 2 }],
      model: 'Para tener buena salud, hay que levantarse temprano. No debes ver mucho la televisión; tienes que leer el periódico.' }));
  };

  /* ---------- Gramática ---------- */
  const EIE = [['pensar', '생각하다'], ['mentir', '거짓말하다'], ['comenzar', '시작하다'], ['perder', '잃다'], ['sentar', '앉히다'], ['despertar', '깨우다'], ['defender', '방어하다'],
    ['querer', '좋아하다, 원하다'], ['cerrar', '닫다'], ['entender', '이해하다'], ['preferir', '선호하다'], ['sentir', '느끼다'], ['negar', '부정(否定)하다'], ['tender', '펼치다, 펴다']];
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 재귀대명사와 재귀동사</h3>
        <h4>(1) 재귀대명사 — 주어 자신에게 동작의 영향이 돌아옴 (자기 자신을 / 자기 자신에게)</h4>
        <table class="gtab"><tr><th></th><th>단수</th><th>복수</th></tr><tr><td>1인칭</td><td class="hi">me</td><td class="hi">nos</td></tr><tr><td>2인칭</td><td class="hi">te</td><td class="hi">os</td></tr><tr><td>3인칭</td><td class="hi">se</td><td class="hi">se</td></tr></table>
        <h4>(2) 재귀동사 — 타동사 + 재귀대명사 se</h4>
        <div class="blocks"><span class="bk v">levantar</span><span class="small">일으키다</span><span class="bk o">+ se</span><span class="small">→</span><span class="bk s">levantarse</span><span class="small">자기 자신을 일으키다 = 일어나다</span></div>
        <table class="gtab"><tr><th colspan="2">levantarse 일어나다</th><th colspan="2">acostarse (o→ue) 잠자리에 들다</th></tr>
          ${[['yo', 'me levanto', 'me acuesto'], ['tú', 'te levantas', 'te acuestas'], ['él / ella / usted', 'se levanta', 'se acuesta'], ['nosotros/as', 'nos levantamos', 'nos acostamos'], ['vosotros/as', 'os levantáis', 'os acostáis'], ['ellos / ellas / ustedes', 'se levantan', 'se acuestan']]
            .map(([p, a, b]) => `<tr><td>${p}</td><td class="hi">${a}</td><td>${p}</td><td class="hi">${b}</td></tr>`).join('')}</table>
        ${tip('재귀대명사는 <b>활용된 동사 앞</b>(Me peino.), <b>동사원형이면 바로 뒤에 붙여</b> 써요(Después de limpiar<b>me</b> los dientes…).')}
        <p>Me peino. ${say('Me peino.')} 나는 머리를 빗는다. · Mi padre se afeita cada mañana. ${say('Mi padre se afeita cada mañana.')} 우리 아버지는 매일 아침 면도하신다.</p>
        <div class="wx">${[['🛏️', 'levantarse', '일어나다'], ['🚿', 'ducharse', '샤워하다'], ['🧼', 'lavarse', '씻다'], ['💇', 'peinarse', '머리 빗다'], ['🪒', 'afeitarse', '면도하다'], ['👗', 'vestirse', '옷 입다'], ['💄', 'maquillarse', '화장하다'], ['🪑', 'sentarse', '앉다'], ['😴', 'acostarse', '잠자리에 들다'], ['⏰', 'despertarse', '잠이 깨다'], ['🧻', 'secarse', '말리다, 닦다'], ['🪥', 'limpiarse', '닦다']]
          .map(([e, v, k]) => `<div class="wxc"><span>${e}</span><b>${v}</b><small>${k}</small></div>`).join('')}</div>
        <div class="g1"></div></div>
      <div class="gcard"><h3>2. 의무 표현</h3>
        <table class="gtab"><tr><th>표현</th><th>긍정</th><th>부정</th></tr>
          <tr><td><b>tener que</b> + 동사원형</td><td class="l">~해야 한다<br>Tienes que hablar con tu profesor.</td><td class="l"><b>~할 필요가 없다</b><br>No tienes que hablar con tu profesor.</td></tr>
          <tr><td><b>deber</b> + 동사원형</td><td class="l">~해야 한다<br>Debemos regresar a casa temprano.</td><td class="l"><b>~하면 안 된다</b><br>No debemos regresar a casa temprano.</td></tr>
          <tr><td><b>hay que</b> + 동사원형</td><td class="l" colspan="2">주체가 정해지지 않은 <b>일반적 의무</b> — 모든 사람에게<br>Hay que comer frutas y verduras muchas veces para tener buena salud. · No hay que fumar aquí.</td></tr></table>
        ${tip('<b>hay que</b>는 항상 hay 그대로 (인칭 변화 ✕). tener는 불규칙: tengo, tienes, tiene, tenemos, tenéis, tienen')}
        <div class="items g2"></div></div>
      <div class="gcard"><h3>3. 불규칙동사 empezar (e → ie)</h3>
        <table class="gtab"><tr><th></th><th>단수</th><th>복수</th></tr><tr><td>1인칭</td><td class="hi">empiezo</td><td>empezamos</td></tr><tr><td>2인칭</td><td class="hi">empiezas</td><td>empezáis</td></tr><tr><td>3인칭</td><td class="hi">empieza</td><td class="hi">empiezan</td></tr></table>
        <p>이와 동일하게 불규칙 활용을 하는 동사:</p>${vocTable(EIE.map(([es, kr]) => ({ es, kr })))}
        <p>¿En qué piensas tú? · Pedro siempre me miente. · Los alumnos me entienden bien. · Preferimos el té al café. · Cierran la tienda a las cinco de la tarde. · ¿Nos sentamos en este banco? · Lo siento mucho.</p>
        ${tip('👢 부츠 모양: nosotros · vosotros 는 e 그대로 (empezamos, empezáis)')}
        <div class="g3"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'ref', title: '재귀대명사(me, te, se, nos, os)를 넣으세요.', cls: 'lines', text:
      ['Todos los días yo [me] levanto a las seis de la mañana.', 'Yo [me] lavo la cara.', '¿A qué hora [te] duchas tú?', 'Mi padre [se] afeita cada mañana.', 'Nosotros [nos] lavamos las manos.', 'Vosotros [os] acostáis muy tarde.', 'Los niños [se] limpian los dientes.', 'Después de limpiar[me] los dientes me acuesto. <i>(나)</i>'].map(x => `<p>${x}</p>`).join('') }));
    [['선생님과 얘기할 필요 없어. (tú)', ['tener que', 'deber', 'no tener que', 'no deber'], 'no tener que'], ['우리는 일찍 집에 돌아가면 안 된다.', ['no tener que', 'no deber', 'hay que'], 'no deber'],
      ['(모두) 과일과 야채를 먹어야 한다.', ['tener que', 'hay que', 'no deber'], 'hay que'], ['너는 선생님과 얘기해야 한다.', ['hay que', 'tener que', 'no tener que'], 'tener que']]
      .forEach(([p, o, a], i) => put(s, '.g2', choiceItem({ id: 'g2c' + i, sec: 'gram', skill: 'obl', prompt: p, options: o, answer: a })));
    [['너는 선생님과 얘기해야 한다. (tener que)', 'Tienes que hablar con tu profesor.'], ['우리는 일찍 집으로 돌아가야 한다. (deber)', 'Debemos regresar a casa temprano.'], ['여기서 담배를 피우면 안 된다. (hay que)', 'No hay que fumar aquí.']]
      .forEach(([p, a], i) => put(s, '.g2', writeItem({ id: 'g2w' + i, sec: 'gram', skill: 'obl', prompt: p, answers: [a] })));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'irr', title: '알맞게 활용하세요.', cls: 'lines', text:
      ['¿En qué [piensas] tú? <i>(pensar)</i>', 'Pedro siempre me [miente]. <i>(mentir)</i>', 'Los alumnos me [entienden] bien. <i>(entender)</i>', 'Nosotros [preferimos] el té al café. <i>(preferir)</i>', '[Cierran] la tienda a las cinco de la tarde. <i>(cerrar, ellos)</i>', '¿Nos [sentamos] en este banco? <i>(sentar)</i>', 'Lo [siento] mucho. <i>(sentir)</i>', 'Yo [empiezo] a estudiar a las siete. <i>(empezar)</i>'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '다음의 문장들에 포함된 재귀동사를 보기에서처럼 활용해 보세요.')}
      ${modelo('Yo me levanto a las siete de la mañana. / Juan<br>→ Juan <b>se levanta</b> a las siete de la mañana.', '보기')}<div class="items"></div>`);
    [['Miguel se lava con agua fría. / nosotros', 'Nosotros nos lavamos con agua fría.', 'Nos lavamos con agua fría.'], ['Antonio se despierta muy temprano. / usted', 'Usted se despierta muy temprano.'],
      ['Yo me baño los domingos. / vosotros', 'Vosotros os bañáis los domingos.', 'Os bañáis los domingos.'], ['Yo me visto deprisa. / ellos', 'Ellos se visten deprisa.'],
      ['El niño se sienta en esta silla. / yo', 'Yo me siento en esta silla.', 'Me siento en esta silla.'], ['Ellos se acuestan muy tarde. / tú', 'Tú te acuestas muy tarde.', 'Te acuestas muy tarde.']]
      .forEach(([p, ...a], i) => put(s, '.items', writeItem({ id: 'e1-' + i, sec: 'e1', skill: 'ref', prompt: `${i + 1}. ${p}`, ph: '→', answers: a })));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '다음의 문장들을 보기에서처럼 tener que 와 deber 를 활용하여 바꾸어 보세요.', { kr: 'tener que 또는 deber 중 하나로 쓰면 돼요.' })}
      ${modelo('Tú estudias poco.<br>→ <b>Tienes que</b> estudiar mucho. / <b>Debes</b> estudiar mucho.', '보기')}<div class="items"></div>`);
    const TD = (subj, tq, db, rest) => [`${subj}${tq} ${rest}`, `${subj}${db} ${rest}`, `${tq.charAt(0).toUpperCase() + tq.slice(1)} ${rest}`, `${db.charAt(0).toUpperCase() + db.slice(1)} ${rest}`].map(x => x.trim() + '.');
    [['Usted trabaja mucho.', [...TD('Usted ', 'tiene que', 'debe', 'trabajar mucho'), ...TD('Usted ', 'tiene que', 'debe', 'trabajar menos')]],
      ['Vosotros tenéis poca paciencia.', TD('Vosotros ', 'tenéis que', 'debéis', 'tener más paciencia')],
      ['Tú no te lavas los dientes todos los días.', [...TD('Tú ', 'tienes que', 'debes', 'lavarte los dientes todos los días'), 'Te tienes que lavar los dientes todos los días.', 'Te debes lavar los dientes todos los días.']],
      ['Los niños ven mucho la televisión.', ['Los niños tienen que ver menos la televisión.', 'Los niños deben ver menos la televisión.']]]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'e2-' + i, sec: 'e2', skill: 'obl', prompt: `${i + 1}. ${p} ${say(p)}`, ph: '→', answers: a.map(x => x.replace(/^(Usted|Vosotros|Tú|Los niños) (\S)/, '$1 $2')) })));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '괄호 안의 동사를 인칭에 맞게 활용하여 문장을 쓰세요.', { kr: 'e → ie 불규칙동사 — 문장 전체를 쓰세요.' })}<div class="items"></div>`);
    [['Ella (perder) siempre el autobús.', 'Ella pierde siempre el autobús.'], ['Nosotros (querer) vender nuestro apartamento.', 'Nosotros queremos vender nuestro apartamento.'],
      ['Ustedes no (entender) el problema.', 'Ustedes no entienden el problema.'], ['Raúl (comenzar) a correr.', 'Raúl comienza a correr.'],
      ['Ellos lo (negar).', 'Ellos lo niegan.'], ['Yo (pensar) estudiar español con Isabel.', 'Yo pienso estudiar español con Isabel.']]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'e3-' + i, sec: 'e3', skill: 'irr', prompt: `${i + 1}. ${p}`, ph: '→ 문장 전체를 쓰세요', answers: [a] })));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '문장과 어울리는 그림을 찾아 연결하세요.')}<div class="pm"></div>
      <h3 class="h3">✍️ 그림을 보고 문장을 쓰세요 (3인칭)</h3><div class="items two w"></div>`);
    const P = [['Cristina se levanta siempre de mal humor.', '😠🛏️⏰ <small>알람 시계 옆 이불 속에서 찡그린 여자</small>'], ['María se pinta las uñas.', '💅 <small>매니큐어를 바르는 여자</small>'],
      ['Verónica se sienta en un banco con su hijo.', '👩‍👦🪑🌳 <small>공원 벤치에 앉은 엄마와 아이</small>'], ['Inés se maquilla.', '💄🪞 <small>거울 앞에서 화장하는 여자</small>'],
      ['Carlos se seca la cara.', '🧖‍♂️ <small>수건으로 얼굴을 닦는 남자</small>'], ['Luis se afeita todos los días.', '🪒🧔 <small>면도 크림을 바르고 면도하는 남자</small>'],
      ['Los niños se limpian los dientes.', '👶🪥👶 <small>칫솔질하는 두 아기</small>'], ['Mario se lava las manos.', '🧒🚰 <small>세면대에서 손 씻는 소년</small>']];
    put(s, '.pm', pairMatch({ id: 'ac1pm', sec: 'ac1', skill: 'ref', pairs: P.map(([a, b], i) => [`(${i + 1}) ${a}`, b]) }));
    [['💄 Inés (maquillarse)', 'Inés se maquilla.'], ['🪒 Luis (afeitarse)', 'Luis se afeita.'], ['🚰 Mario (lavarse las manos)', 'Mario se lava las manos.'], ['🪥 Los niños (limpiarse los dientes)', 'Los niños se limpian los dientes.']]
      .forEach(([p, a], i) => put(s, '.w', writeItem({ id: 'ac1w' + i, sec: 'ac1', skill: 'ref', prompt: p, answers: [a] })));
  };
  B.ac2 = () => {
    const ORD = ['Me despierto y me levanto.', 'Me ducho.', 'Me visto.', 'Desayuno.', 'Voy a la escuela.', 'Regreso a casa.', 'Ceno con mi familia.', 'Me acuesto.'];
    const s = sec('ac2', `${acHead(2, '하루 일과를 시간 순서대로 말해 보세요.')}
      <div class="item ordq"><div class="item-p">① 아침부터 밤까지 순서대로 누르세요</div><div class="ord-line"></div><div class="ord-bank"></div>
        <div class="item-row"><button class="btn ghost rst">다시</button><button class="btn chk">확인</button><span class="mkbox"></span></div></div>
      <h3 class="h3">② 나의 하루 — 시각과 함께 5문장 이상 쓰세요</h3>
      ${modelo('Me levanto a las siete. Me ducho y me visto. Desayuno a las siete y media. Las clases empiezan a las ocho y media…')}<div class="f"></div>`);
    reg('ac2-ord', 'ac2', 'ref');
    const q = $('.ordq', s); let ord = [];
    const draw = () => {
      ord = []; $('.ord-line', q).innerHTML = ''; $('.mkbox', q).innerHTML = '';
      $('.ord-bank', q).innerHTML = shuffle(ORD).map(t => `<button class="tok">${t}</button>`).join('');
      $$('.ord-bank .tok', q).forEach(b => b.onclick = () => { if (b.disabled) return; b.disabled = true; ord.push(b.textContent); $('.ord-line', q).insertAdjacentHTML('beforeend', `<span class="tok in">${ord.length}. ${b.textContent}</span>`); });
    };
    draw();
    $('.rst', q).onclick = draw;
    $('.chk', q).onclick = () => {
      if (ord.length < ORD.length) return;
      const ok = ord.join('|') === ORD.join('|');
      record('ac2-ord', ok ? 1 : 0, ok ? [] : ['otro'], {});
      $('.mkbox', q).innerHTML = MARK(ok ? 1 : 0) + (ok ? '' : ` <span class="ans">${ORD.join(' › ')}</span>`);
    };
    put(s, '.f', freeItem({ id: 'ac2f', sec: 'ac2', skill: 'ref', rows: 6, ph: 'Me levanto a las … de la mañana. …',
      must: [{ re: REFL, label: '재귀동사 3개 이상 (me levanto, me ducho …)', min: 3 }, { re: 'a las? (una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|\\d+)', label: '시각 a las … 3번 이상', min: 3 },
        { re: 'luego|despu[eé]s|primero|entonces|antes de|por la (ma[nñ]ana|tarde|noche)', label: '순서 표현 (luego, después …)' }],
      minWords: 35,
      model: 'Me levanto a las siete de la mañana. Primero me ducho y me visto. Luego desayuno con mi familia. Salgo de casa a las ocho. Las clases empiezan a las ocho y media. Regreso a casa a las cuatro. Después de cenar, hago los deberes. Me acuesto a las once.' }));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '나와 내 가족을 소개해 보세요.')}
      ${tip('이름 · 출신 · 나이 · 사는 곳(Lectura의 자기소개처럼!) + 가족 한 사람씩 하루 일과(재귀동사)나 해야 하는 일(tener que)을 넣어 보세요.')}
      ${modelo('Me llamo Minji. Soy de Seúl, pero vivo en Gwangju. Tengo dieciséis años. En mi familia somos cuatro: mi padre, mi madre, mi hermano y yo. Mi padre se levanta muy temprano porque tiene que trabajar…')}
      <div class="f"></div>`);
    put(s, '.f', freeItem({ id: 'ac3f', sec: 'ac3', rows: 7, ph: 'Me llamo … Soy de … Tengo … años. En mi familia …',
      must: [{ re: 'me llamo|soy [A-ZÁÉÍÓÚa-záéíóúñ]+', label: 'Me llamo … / Soy …' }, { re: 'soy de|vivo en', label: 'Soy de … / Vivo en …' }, { re: 'tengo [a-z0-9]+ a[nñ]os', label: 'Tengo … años' },
        { re: 'mi (padre|madre|herman[oa]|abuel[oa]|familia)|mis (padres|hermanos|abuelos)', label: '가족 (mi padre, mi madre …)' }, { re: REFL, label: '재귀동사' }, { re: OBL, label: 'tener que / deber / hay que' }],
      minWords: 40,
      model: 'Me llamo Minji. Soy de Seúl, pero vivo en Gwangju desde 2020. Tengo dieciséis años. En mi familia somos cuatro: mi padre, mi madre, mi hermano y yo. Mi padre se levanta a las cinco porque tiene que trabajar en Seúl. Mi madre es profesora y se acuesta tarde. Mi hermano siempre se levanta de mal humor.' }));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('우유니 소금 사막 (El salar de Uyuni)', [
      { e: '🇧🇴📍', h: '위치', t: '볼리비아의 수도인 라파스(La Paz)로부터 남쪽으로 200km 정도 떨어져 있다.' },
      { e: '⛰️', h: '해발 3,653m', t: '고지대에 위치해 있고, 면적은 12,000km²이다. 세계 최대의 소금 사막.' },
      { e: '🪞☁️', h: '세상에서 가장 큰 거울', t: '낮에는 푸른 하늘과 구름이 사막에 투명하게 반사되고, 밤에는 하늘의 별이 호수 속에 들어 있는 듯한 장관.' },
      { e: '🌵🏝️', h: 'Isla del pescador', t: '사막의 중앙에는 선인장으로 가득 찬 \'어부의 섬\'이 있다.' },
      { e: '🧂', h: '소금 100억 톤', t: '소금의 총량은 최소 100억 톤으로 추산되며, 두께는 1m에서 최대 120m까지 다양하다.' },
      { e: '🌧️💧', h: '우기 12~3월', t: '20~30cm의 물이 고여 얕은 호수가 만들어진다.' }
    ]) + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>
      <h3 class="h3">✍️ 스페인어로 써 보세요</h3><div class="items w"></div>`);
    [['우유니 소금 사막이 있는 나라는?', ['Bolivia', 'Perú', 'Chile', 'Argentina'], 'Bolivia', '수도 La Paz 에서 남쪽으로 약 200km'],
      ['우유니 소금 사막의 해발 고도는?', ['3,653m', '1,653m', '5,653m', '653m'], '3,653m', '고지대 — 고산병에 주의!'],
      ['얕은 호수가 생겨 거울이 되는 우기는?', ['12~3월', '6~8월', '9~11월', '4~5월'], '12~3월', '물이 20~30cm 고여요'],
      ['사막 중앙의 선인장 섬 이름은?', ['Isla del pescador', 'Isla de Pascua', 'Isla Margarita', 'Isla del Sol'], 'Isla del pescador', '\'어부의 섬\'']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
    [['우유니에 가려면 인내심이 있어야 한다. (hay que)', ['Hay que tener paciencia.', 'Para ir a Uyuni hay que tener paciencia.']], ['나는 일찍 일어나서 해돋이를 본다. (levantarse)', ['Me levanto temprano y veo el amanecer.', 'Me levanto temprano para ver el amanecer.']]]
      .forEach(([p, a], i) => put(s, '.w', writeItem({ id: 'culw' + i, sec: 'cultura', skill: i ? 'ref' : 'obl', prompt: p, answers: a })));
  };

  SC.lesson({
    num: '06',
    title: 'Me levanto a las seis de la mañana',
    ttsTest: 'Me levanto a las seis de la mañana.',
    cover: {
      emoji: '⏰🚿<small>🏫 🛌</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#a16207)',
      tema: ['La rutina diaria', 'Las regiones de España', 'Obligaciones'],
      com: ['재귀대명사와 재귀동사: Me ducho. · Me acuesto a las once de la noche.', '의무 표현: Tengo que preparar un examen. · Hay que comer frutas y verduras muchas veces para tener buena salud.'],
      gram: ['재귀대명사 me · te · se · nos · os', '재귀동사 levantarse, ducharse, acostarse …', 'tener que · deber · hay que', '불규칙동사 empezar (e → ie)']
    },
    skills: D.skills,
    sections: D.sections,
    people: { Rafael: { g: 'm', av: '🧑🏻', side: 'l' }, Teresa: { g: 'f', av: '👩🏻‍🎓', side: 'r' }, _: { g: 'm', av: '📖', side: 'l' } },
    errLabels: { reflexivo: '재귀대명사 me · te · se · nos · os', obligacion: 'tener que · deber · hay que', conjugacion: 'e → ie · 동사 변화' },
    errTips: {
      acento: 'sábado, examen(✓), barbaridad(✓), región, tradición, economía, físico, autobús, periódico, levantáis … 악센트도 철자예요.',
      reflexivo: '주어와 재귀대명사를 맞춰요: yo me · tú te · él se · nosotros nos · vosotros os · ellos se. 동사원형이면 뒤에 붙여요(limpiarme).',
      obligacion: 'tener que + 동사원형 (que 빠뜨리지 않기!) · deber + 동사원형 (que ✕) · hay que (변화 ✕)',
      conjugacion: 'e → ie: empiezo, piensas, pierde, entienden — 단 nosotros · vosotros 는 그대로 (empezamos)'
    },
    classify(ti, ta) {
      const R = ['me', 'te', 'se', 'nos', 'os'];
      if (ti.filter(w => R.includes(w)).join() !== ta.filter(w => R.includes(w)).join()) return 'reflexivo';
      if ((ta.includes('que') && !ti.includes('que')) || (ti.includes('que') && !ta.includes('que'))) return 'obligacion';
      const tt = ti.find(w => /^(ten|tien|deb)/.test(w)), tA = ta.find(w => /^(ten|tien|deb)/.test(w));
      if (tA && tt !== tA) return 'obligacion';
      const diffs = ta.filter(w => !ti.includes(w));
      if (diffs.some(w => /ie/.test(w)) || ti.some(w => /^(empez|pens|perd|entend|quer|comenz|neg|cerr|sent|ment)[aeo]/.test(w) && !ta.includes(w))) return 'conjugacion';
      return null;
    },
    errRules: [
      { re: W0 + 'yo (se|te) [a-záéíóúñ]+o' + W1, t: 'reflexivo', msg: 'yo → me (me levanto)' },
      { re: W0 + 'nosotros (se|me) [a-záéíóúñ]+mos' + W1, t: 'reflexivo', msg: 'nosotros → nos' },
      { re: W0 + 'vosotros (se|te) [a-záéíóúñ]+[aeé]is' + W1, t: 'reflexivo', msg: 'vosotros → os' },
      { re: W0 + '(tengo|tienes|tiene|tenemos|ten[eé]is|tienen) (estudiar|trabajar|preparar|hablar|comer|ir|hacer|regresar|tener|ver|lavar|lavarte|lavarme|leer)' + W1, t: 'obligacion', msg: 'tener que + 동사원형 (que!)' },
      { re: W0 + '(debo|debes|debe|debemos|deb[eé]is|deben) que' + W1, t: 'obligacion', msg: 'deber + 동사원형 (que ✕)' },
      { re: W0 + 'hay que (estudio|trabajo|como|como)' + W1, t: 'obligacion', msg: 'hay que + 동사원형' },
      { re: W0 + '(empezo|empezas|empeza|empezan|penso|pensas|pensa|pensan|perdo|perde|perden|entendo|entende|entenden|queren|quero|comenzo|comenza|comenzan|cerran|cerro|nega|negan)' + W1, t: 'conjugacion', msg: 'e → ie (empiezo, piensa, pierde, entienden …)' },
      { re: W0 + '(empiezamos|piensamos|entiendemos|quieremos|piens[aá]is|empiez[aá]is)' + W1, t: 'conjugacion', msg: 'nosotros · vosotros 는 e 그대로 (empezamos)' }
    ],
    accWords: ['sábado', 'región', 'tradición', 'economía', 'físico', 'autobús', 'periódico', 'levantáis', 'acostáis', 'bañáis', 'empezáis', 'tenéis', 'debéis', 'aragonés', 'también', 'después'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Mi rutina diaria → 글로 쓰기',
        icons: ['⏰', '🏫', '🛌'],
        questions: ['¿A qué hora te levantas? ¿Qué haces por la mañana?', '¿A qué hora empiezan y terminan tus clases? ¿Qué haces después?', '¿Qué tienes que hacer este fin de semana? ¿Qué hay que hacer para tener buena salud?'],
        minWords: 50,
        hint: '재귀동사 · 시각(a las …) · tener que / deber / hay que · e→ie 동사(empezar…) 를 모두 쓰면 높은 점수!',
        ph: 'Todos los días me levanto a las …',
        connectors: ['y', 'pero', 'porque', 'luego', 'después', 'primero', 'entonces', 'antes de', 'después de'],
        rubric: [
          { k: 'hor', label: '시각 표현 (a las …) 2번 이상', max: 8, re: 'a las? (una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|\\d+)', min: 2, ax: 'Contenido' },
          { k: 'act', label: '하루 일과 활동', max: 6, re: 'desayun|ceno|ceno|almuerz|clases?|escuela|deberes|estudi|regreso|salgo|llego', ax: 'Contenido' },
          { k: 'ref', label: '재귀동사 3개 이상', max: 14, re: '(me|te|se|nos|os) (levant|duch|lav|acuest|vist|despiert|peino|afeit|sient|limpi|maquill|sec|ba[nñ])[a-záéíóúñ]*', min: 3, ax: 'Gramática' },
          { k: 'obl', label: 'tener que / deber / hay que', max: 10, re: OBL, ax: 'Gramática' },
          { k: 'eie', label: 'e → ie 동사 (empiezan, pienso, prefiero …)', max: 6, re: '(empiez|piens|pierd|entiend|quier|comienz|cierr|prefier|sient|mient)[a-z]*', ax: 'Gramática' }
        ],
        model: 'Todos los días me levanto a las seis y media. Primero me ducho y me visto. Luego desayuno con mi familia. Las clases empiezan a las ocho y terminan a las cuatro. Después regreso a casa y hago los deberes. Me acuesto a las once. Este fin de semana tengo que preparar un examen, pero también quiero descansar. Para tener buena salud, hay que dormir mucho y comer frutas.'
      }
    },
    build: B
  });
})();
