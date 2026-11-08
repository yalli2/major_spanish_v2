/* Lección 05 · Queremos vino de la casa — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 67~80쪽 : Diálogo 1·2 → Vocabulario·Contesta → Amplía tu vocabulario → Gramática y ejercicios(연습문제 1~2)
   → Actividades 1~4 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .vtab .vt{position:static;inset:auto;display:flex;grid-template-columns:none;text-align:left;padding:4px 0}.vtab .vt b{display:inline;margin:0;font-size:15px}.vtab .vt span{display:block;font-family:inherit;font-size:14px;margin:0}
    .menu-card{background:#fdf8e8;border:2px solid #b9e0d6;border-radius:14px;padding:16px 22px;margin:12px 0;font-size:15px}
    .menu-card h4{text-align:center;font-family:var(--serif);font-size:26px;color:#0f6f66;margin:0 0 8px;letter-spacing:.06em}
    .menu-card h5{margin:10px 0 4px;color:#7b3a26;font-size:15px}
    .menu-card .mi{display:flex;gap:6px;align-items:baseline}.menu-card .mi span{flex:1;border-bottom:1px dotted #bbb;margin:0 4px}
    .menu-card .mi.blank{color:#c2410c;font-style:italic}
    .menu-card .foot2{font-size:12px;color:#7b3a26;font-weight:700;margin-top:10px;border-top:2px solid #b9e0d6;padding-top:6px}
    .numline{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.numline span{background:#fff;border:1px solid #e3e3e3;border-radius:10px;padding:6px 10px;font-size:14px}.numline b{color:#d6202f;margin-right:4px}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      pro: 'Pronombres 목적·전치격 대명사',
      gus: 'Gustar · Encantar',
      num: 'Números 숫자 101~',
      qp: 'Querer · Poder',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo 1', kr: '레스토랑에서', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'd2', label: 'Diálogo 2', kr: '세 친구의 수다', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo' },
      { id: 'gram', label: 'Gramática', kr: '대명사 · gustar · 숫자 · querer/poder', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '목적대명사 결합 (se lo…)', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: 'gustar · encantar로 답하기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'ac1', label: 'Actividades 1', kr: '스페인 음식 이름 짝짓기', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '메뉴판 완성하기', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '종업원과 손님 — 주문하기', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'ac4', label: 'Actividades 4', kr: '스페인 요리 더 알아보기', group: 'Actividades', kind: 'ac', n: 4 },
      { id: 'cultura', label: 'Cultura', kr: '라틴아메리카의 음식', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo1: [
      { who: 'Miguel', es: '¡Por favor! ¿Tiene una [mesa] libre?' },
      { who: 'Camarera', es: 'Sí, la mesa del [rincón] está libre.' },
      { who: 'Miguel', es: 'Gracias. ¿Nos [puede] traer la [carta], por favor?' },
      { who: 'Camarera', es: 'Aquí la tienen. ¿Qué [quieren] comer ustedes?' },
      { who: 'Miguel', es: 'De primero, una [ensalada] mixta. De segundo, ¿qué voy a tomar? ¿Me aconseja usted?' },
      { who: 'Camarera', es: '[Le] aconsejo una paella. Es [especialidad] de la casa.' },
      { who: 'Miguel', es: '¡Buena idea! Entonces, de segundo, una paella.' },
      { who: 'Teresa', es: 'Para [mí], de primero, una sopa de [verdura]. De segundo, una paella, también.' },
      { who: 'Camarera', es: 'Y de [postre], ¿qué quieren ustedes?' },
      { who: 'Miguel', es: 'Yogur de [fresa], por favor.' },
      { who: 'Teresa', es: 'Yo quiero fruta del [tiempo].' },
      { who: 'Camarera', es: 'Y para [beber], ¿qué desean tomar?' },
      { who: 'Teresa', es: 'Queremos [vino] de la casa.' }
    ],
    dialogo2: [
      { who: 'Ana y Verónica', es: 'Buenos días.' },
      { who: 'Luis', es: 'Buenos días. ¿Cómo se [llaman]?' },
      { who: 'Ana', es: 'Soy Ana, y esta es mi [amiga] Verónica.' },
      { who: 'Luis', es: '¿Son de España?' },
      { who: 'Ana y Verónica', es: 'No. Somos [colombianas].' },
      { who: 'Luis', es: '¿Dónde viven ustedes?' },
      { who: 'Ana y Verónica', es: 'Vivimos en Madrid.' },
      { who: 'Luis', es: 'Madrid es muy grande, ¿no?' },
      { who: 'Verónica', es: '[Claro]. Tiene unos tres [millones] de [habitantes]. [Además] hay mucho [tráfico] y la gente [conduce] muy [deprisa] en las carreteras. [Sin embargo], nos [encanta] Madrid.' }
    ],

    voc1: [
      { es: 'mesa', kr: '탁자, 식탁', e: '🪑' }, { es: 'rincón', kr: '구석, 모퉁이', e: '📐' }, { es: 'camarero', kr: '종업원, 웨이터', e: '🤵' },
      { es: 'traer', kr: '가져오다, 데려오다', e: '🫴' }, { es: 'carta', kr: '메뉴, 편지', e: '📜' }, { es: 'querer', kr: '원하다, 좋아하다', e: '💭' },
      { es: 'ensalada', kr: '샐러드', e: '🥗' }, { es: 'mixto', kr: '모둠의, 여러 요소를 섞은', e: '🥙' }, { es: 'aconsejar', kr: '추천하다, 조언하다', e: '👍' },
      { es: 'paella', kr: '파에야', e: '🥘' }, { es: 'idea', kr: '생각', e: '💡' }, { es: 'especialidad', kr: '전문 요리', e: '⭐' },
      { es: 'sopa', kr: '수프', e: '🍲' }, { es: 'verdura', kr: '야채', e: '🥦' }, { es: 'postre', kr: '후식', e: '🍮' },
      { es: 'yogur', kr: '요구르트', e: '🥛' }, { es: 'fruta', kr: '과일', e: '🍎' }, { es: 'del tiempo', kr: '제철의', e: '🗓️' },
      { es: 'beber', kr: '마시다', e: '🥤' }, { es: 'vino', kr: '포도주', e: '🍷' }, { es: 'libre', kr: '자유로운, 비어 있는', e: '🆓' },
      { es: 'fresa', kr: '딸기', e: '🍓' }
    ],
    voc2: [
      { es: 'llamar', kr: '부르다', e: '📣' }, { es: 'colombiano', kr: '콜롬비아 사람', e: '🇨🇴' }, { es: 'claro', kr: '밝은, 분명한', e: '✅' },
      { es: 'deprisa', kr: '급히, 서둘러', e: '💨' }, { es: 'sin embargo', kr: '그럼에도 불구하고', e: '↩️' }, { es: 'habitante', kr: '인구, 주민', e: '👥' },
      { es: 'además', kr: '게다가', e: '➕' }, { es: 'tráfico', kr: '교통', e: '🚦' }, { es: 'gente', kr: '사람들', e: '👨‍👩‍👧' },
      { es: 'conducir', kr: '운전하다', e: '🚗' }, { es: 'unos', kr: '(숫자 앞에서) 대략', e: '≈' }, { es: 'millón', kr: '백만', e: '💯' },
      { es: 'encantar', kr: '무척 좋아하다, 매혹시키다', e: '😍' }
    ],
    amplia: [
      { es: 'regalo', kr: '선물', e: '🎁' }, { es: 'secreto', kr: '비밀', e: '🤫' }, { es: 'caminar', kr: '길을 걷다', e: '🚶' },
      { es: 'a solas', kr: '혼자서', e: '🧍' }, { es: 'sal', kr: '소금', e: '🧂' }, { es: 'cerveza', kr: '맥주', e: '🍺' },
      { es: 'caramelo', kr: '사탕', e: '🍬' }, { es: 'mar', kr: '바다', e: '🌊' }, { es: 'película', kr: '영화', e: '🎬' },
      { es: 'tomar el sol', kr: '일광욕하다', e: '😎' }, { es: 'escalar montañas', kr: '등산하다', e: '🧗' }, { es: 'entrar', kr: '들어가다, 들어오다', e: '🚪' }
    ],

    examBank: [
      { p: '¿Le das la sal a Juan? — Sí, ____ la doy.', a: ['se'], s: 'pro' },
      { p: '¿Me compras estas flores? — Sí, ____ las compro.', a: ['te'], s: 'pro' },
      { p: 'El camarero le trae a Antonio una cerveza. → El camarero ____ trae.', a: ['se la'], s: 'pro' },
      { p: 'Les regalamos a los niños caramelos. → ____ regalamos.', a: ['se los'], s: 'pro' },
      { p: 'Este regalo es para ____. <i>(너)</i>', a: ['ti'], s: 'pro' },
      { p: 'Voy ____. <i>(너와 함께)</i>', a: ['contigo'], s: 'pro' },
      { p: '¿Vienes ____? <i>(나와 함께)</i>', a: ['conmigo'], s: 'pro' },
      { p: 'Para ____, una sopa de verdura. <i>(나)</i>', a: ['mí'], s: 'pro' },
      { p: 'Me ____ el béisbol. <i>(gustar)</i>', a: ['gusta'], s: 'gus' },
      { p: '¿Te ____ los animales? <i>(gustar)</i>', a: ['gustan'], s: 'gus' },
      { p: 'A Elena y Ana ____ gustan las flores.', a: ['les'], s: 'gus' },
      { p: '____ encanta Madrid. <i>(우리는)</i>', a: ['nos'], s: 'gus' },
      { p: '500 → ____ euros', a: ['quinientos'], s: 'num' },
      { p: '100 → ____ euros', a: ['cien'], s: 'num' },
      { p: '400명의 소녀 → ____ muchachas', a: ['cuatrocientas'], s: 'num' },
      { p: '21채의 집 → ____ casas', a: ['veintiuna'], s: 'num' },
      { p: '1.000.000 de libros → un ____ de libros', a: ['millón'], s: 'num' },
      { p: 'Madrid tiene unos tres ____ de habitantes.', a: ['millones'], s: 'num' },
      { p: 'Yo ____ estudiar español. <i>(querer)</i>', a: ['quiero'], s: 'qp' },
      { p: '¿____ entrar aquí? <i>(poder, yo)</i>', a: ['puedo'], s: 'qp' },
      { p: '¿Me ____ ayudar usted? <i>(poder)</i>', a: ['puede'], s: 'qp' },
      { p: 'Vosotros ____ vino de la casa. <i>(querer)</i>', a: ['queréis'], s: 'qp' }
    ]
  };

  const B = {};

  /* ---------- Diálogo 1 ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'En un restaurante')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🍽️ 누가 무엇을 주문했나요? — 표를 완성하세요</h3><div class="sb"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo1, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo1) }));
    put(s, '.sb', sortBoard({ id: 'd1sb', sec: 'd1', skill: 'com', cols: [{ k: 'p', label: 'De primero 🥗' }, { k: 's', label: 'De segundo 🥘' }, { k: 'o', label: 'De postre 🍮' }],
      rows: [{ k: 'M', label: 'Miguel' }, { k: 'T', label: 'Teresa' }],
      chips: [['una ensalada mixta', 'M:p'], ['una paella (M)', 'M:s'], ['yogur de fresa', 'M:o'], ['una sopa de verdura', 'T:p'], ['una paella (T)', 'T:s'], ['fruta del tiempo', 'T:o']] }));
    ['¿Tiene una mesa libre?', '¿Nos puede traer la carta, por favor?', 'Le aconsejo una paella.', 'Queremos vino de la casa.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'qp', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.filter((v, i) => i % 2 === 0).forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Qué mesa está libre?', kw: [['rinc[oó]n', 'la mesa del rincón']], model: 'La mesa del rincón está libre.' },
      { q: '¿Qué le aconseja a Miguel la camarera de segundo?', kw: [['paella', 'una paella'], ['(le )?aconseja', 'Le aconseja …']], model: 'Le aconseja una paella.' },
      { q: '¿Qué toma Teresa de primero?', kw: [['sopa de verdura', 'una sopa de verdura']], model: 'De primero toma una sopa de verdura.' }
    ] }));
  };

  /* ---------- Diálogo 2 ---------- */
  B.d2 = () => {
    const s = sec('d2', `${dlgHead(2, 'Tres chicos están charlando.')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기</h3><div class="c"></div>
      <h3 class="h3">🏙️ Madrid 카드 — ¿Verdadero o falso?</h3><div class="items vf"></div>`);
    put(s, '.dslot', dialogBlock('d2', D.dialogo2));
    put(s, '.c', cloze({ id: 'd2c', sec: 'd2', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo2) }));
    [['Ana y Verónica son de España.', 'Falso'], ['Ana y Verónica viven en Madrid.', 'Verdadero'], ['Madrid tiene unos tres millones de habitantes.', 'Verdadero'],
      ['En Madrid hay poco tráfico.', 'Falso'], ['A Ana y a Verónica les encanta Madrid.', 'Verdadero']]
      .forEach(([p, a], i) => put(s, '.vf', choiceItem({ id: 'd2vf' + i, sec: 'd2', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.slice(0, 8).map(v => [v.es, v.kr]) }));
    D.voc2.slice(7).forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Quién es Verónica?', kw: [['amiga de ana', 'la amiga de Ana']], model: 'Es la amiga de Ana.' },
      { q: '¿Dónde viven Ana y Verónica?', kw: [['madrid', 'en Madrid']], model: 'Viven en Madrid.' },
      { q: '¿Es muy grande Madrid?', kw: [['s[ií]', 'Sí'], ['grande', 'grande']], model: 'Sí, Madrid es muy grande.' },
      { q: '¿Cuántos habitantes hay en Madrid?', kw: [['tres millones', 'unos tres millones (de habitantes)']], model: 'Hay unos tres millones de habitantes.' },
      { q: '¿Hay poco tráfico en Madrid?', kw: [['no', 'No'], ['mucho tr[aá]fico', 'hay mucho tráfico']], model: 'No, hay mucho tráfico.' },
      { q: '¿Cómo conduce la gente en Madrid?', kw: [['deprisa', 'muy deprisa']], model: 'La gente conduce muy deprisa.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ gustar / encantar 로 나의 취향 쓰기</h3>${modelo('Me encanta <b>tomar el sol</b> en el <b>mar</b>, pero no me gustan los <b>caramelos</b>.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'gus', rows: 3, prompt: '위 단어 2개 이상을 넣어 좋아하는 것 / 싫어하는 것을 2문장으로 쓰세요.', ph: 'Me gusta … / Me encantan …',
      must: [{ re: W0 + '(me|nos) (gustan?|encantan?)' + W1, label: 'me gusta(n) / me encanta(n)' }, { re: D.amplia.map(a => SC.rx(a.es)).join('|'), label: 'Amplía 단어 2개 이상', min: 2 }],
      model: 'Me encanta tomar el sol en el mar. También me gusta escalar montañas, pero no me gustan los caramelos.' }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const NUMS = [['101', 'ciento uno'], ['102', 'ciento dos'], ['200', 'doscientos'], ['300', 'trescientos'], ['400', 'cuatrocientos'], ['500', 'quinientos'], ['600', 'seiscientos'], ['700', 'setecientos'], ['800', 'ochocientos'], ['900', 'novecientos'],
      ['1.000', 'mil'], ['1.001', 'mil uno'], ['2.000', 'dos mil'], ['3.000', 'tres mil'], ['10.000', 'diez mil'], ['100.000', 'cien mil'], ['1.000.000', 'un millón']];
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 간접목적대명사와 전치격 대명사</h3>
        <h4>(1) 간접목적대명사의 인칭별 활용형</h4>
        <table class="gtab"><tr><th></th><th>단수</th><th>복수</th></tr><tr><td>1인칭</td><td class="hi">me</td><td class="hi">nos</td></tr><tr><td>2인칭</td><td class="hi">te</td><td class="hi">os</td></tr><tr><td>3인칭</td><td class="hi">le / se</td><td class="hi">les / se</td></tr></table>
        <h4>(2) 간접목적대명사의 용법</h4>
        <p>일반적으로 <b>활용된 동사의 앞</b>에 놓이며, 직접목적대명사와 함께 올 경우 그 <b>앞</b>에 놓인다(간접 + 직접). 직·간접목적대명사가 모두 3인칭이면 간접목적대명사 le / les 는 <b>se</b> 가 된다.</p>
        <div class="blocks"><span class="bk p">¿Me compras estas flores?</span><span class="bk o">te</span><span class="bk v">las</span><span class="bk s">compro</span><span class="small">응, 너한테 그것을 사 줄게.</span></div>
        <div class="blocks"><span class="bk p">¿Le das la sal a Juan?</span><span class="bk o">se (← le)</span><span class="bk v">la</span><span class="bk s">doy</span><span class="small">그래, 그에게 그걸 줄게.</span></div>
        ${tip('<b>le lo / le la / les los</b> ✕ → <b>se lo / se la / se los</b> ○')}
        <h4>(3) 전치격 대명사</h4>
        <table class="gtab"><tr><th>주격</th><td>yo</td><td>tú</td><td>él · ella · usted</td><td>nosotros/as</td><td>vosotros/as</td><td>ellos · ellas · ustedes</td></tr>
          <tr><th>전치사 + </th><td class="hi">mí</td><td class="hi">ti</td><td>él · ella · usted</td><td>nosotros/as</td><td>vosotros/as</td><td>ellos · ellas · ustedes</td></tr>
          <tr><th>con + </th><td class="hi">conmigo</td><td class="hi">contigo</td><td colspan="4">con él, con nosotros …</td></tr></table>
        <p>Este regalo es para ti. ${say('Este regalo es para ti.')} · No hay secretos entre tú y yo. ${say('No hay secretos entre tú y yo.')} · Yo vengo aquí por vosotros. · Voy contigo. ${say('Voy contigo.')}</p>
        ${tip('entre(~사이에) 다음에는 주격: <b>entre tú y yo</b>. mí 에는 악센트(소유사 mi와 구별), ti 에는 악센트가 없어요.')}
        <div class="g1"></div><div class="g1b"></div></div>
      <div class="gcard"><h3>2. gustar 동사</h3>
        <p>gustar 와 encantar 는 우리말의 '~에게 마음에 들다'라는 의미. <b>좋아하는 대상이 주어</b>이고 항상 간접목적대명사와 함께 쓴다.</p>
        <div class="blocks"><span class="bk p">(A mí)</span><span class="bk o">me</span><span class="bk v">gusta</span><span class="bk s">el béisbol / nadar</span></div>
        <div class="blocks"><span class="bk p">(A ti)</span><span class="bk o">te</span><span class="bk v">gustan</span><span class="bk s">los animales</span></div>
        <p>Me gusta el béisbol. · ¿Te gustan los animales? · ¿Os gusta nadar?</p>
        ${tip('의미를 분명히 하거나 강조하려면 <b>a + 인칭대명사</b>를 겹쳐 써요: <b>Les</b> gustan las flores <b>a Elena y Ana</b>. · <b>A ti te</b> encanta caminar a solas.')}
        <div class="g2"></div></div>
      <div class="gcard"><h3>3. 숫자 101 ~ 1.000.000</h3>
        <div class="numline">${NUMS.map(([n, w]) => `<span><b>${n}</b>${w} ${say(w)}</span>`).join('')}</div>
        <table class="gtab">
          <tr><th>(1) uno</th><td class="l">21, 31… 에서 남성명사 앞 <b>-ún</b>, 여성명사 앞 <b>-una</b>: veintiún hombres · veintiuna casas · veintiún mil personas · un millón</td></tr>
          <tr><th>(2) ciento / mil</th><td class="l">앞에 un을 붙이지 않는다: <b>cien</b> euros · <b>mil</b> dólares. ciento 는 명사·mil·millón 앞에서 <b>cien</b>(cien mil personas), 더 작은 수 앞에서는 ciento(ciento doce hombres)</td></tr>
          <tr><th>(3) 200~900</th><td class="l">성·수 변화: trescient<b>os</b> libros · cuatrocient<b>as</b> muchachas</td></tr>
          <tr><th>(4) mil / millón</th><td class="l">mil 은 변화 없음, millón 은 수 변화만(millones). '수천의' → miles de libros</td></tr>
          <tr><th>(5) millón + de</th><td class="l">un millón <b>de</b> libros · cinco millones <b>de</b> soldados</td></tr>
          <tr><th>(6) 쉼표</th><td class="l">스페인어의 쉼표(,)는 우리의 소수점(.) — 6,50 € = 6.50유로 / 1.000 = 천</td></tr></table>
        <div class="items two g3"></div></div>
      <div class="gcard"><h3>4. 불규칙동사 querer 와 poder</h3>
        <table class="gtab"><tr><th></th><th>querer (e → ie)</th><th>poder (o → ue)</th></tr>
          ${[['1인칭 단수', 'quiero', 'puedo', 1], ['2인칭 단수', 'quieres', 'puedes', 1], ['3인칭 단수', 'quiere', 'puede', 1], ['1인칭 복수', 'queremos', 'podemos', 0], ['2인칭 복수', 'queréis', 'podéis', 0], ['3인칭 복수', 'quieren', 'pueden', 1]]
            .map(([p, a, b, h]) => `<tr><td>${p}</td><td class="${h ? 'hi' : ''}">${a}</td><td class="${h ? 'hi' : ''}">${b}</td></tr>`).join('')}</table>
        <p><b>querer</b>: 목적어가 사람 → 사랑하다 (Te quiero.), 사물 → 갖고 싶다 (¿Quieres esta muñeca?), 동사원형 → ~하고 싶다 (Queremos estudiar español.)<br>
          <b>poder</b> + 동사원형: ~할 수 있다 / ~해도 된다 (¿Puedo entrar aquí? · ¿Me puede ayudar usted?)</p>
        ${tip('👢 부츠 모양: nosotros · vosotros 만 어간이 그대로 (queremos, podemos)!')}
        <div class="g4"></div><div class="items g4b"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'pro', title: '알맞은 간접목적대명사를 쓰세요.', cls: 'lines', text:
      ['La camarera [le] aconseja una paella a Miguel.', '¿[Nos] puede traer la carta? <i>(우리에게)</i>', '¿[Te] compro estas flores? <i>(너에게)</i>', 'A ellos [les] doy un regalo.', '¿Le das la sal a Juan? — Sí, [se] la doy.', '¿Me compras estas flores? — Sí, [te] las compro.'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g1b', cloze({ id: 'g1b', sec: 'gram', skill: 'pro', title: '전치격 대명사를 쓰세요.', cls: 'lines', text:
      ['Este regalo es para [ti]. <i>(너)</i>', 'Para [mí], una sopa de verdura. <i>(나)</i>', 'No hay secretos entre [tú] y [yo].', '¿Quieres venir [conmigo]? <i>(나와 함께)</i>', 'Sí, voy [contigo]. <i>(너와 함께)</i>'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'gus', title: 'gusta / gustan / encanta 와 대명사를 쓰세요.', cls: 'lines', text:
      ['Me [gusta] el béisbol.', '¿Te [gustan] los animales?', '¿[Os] gusta nadar? <i>(너희들)</i>', '[Les] gustan las flores a Elena y Ana.', 'A ti te [encanta] caminar a solas. <i>(encantar)</i>', '[Nos] encanta Madrid. <i>(우리)</i>'].map(x => `<p>${x}</p>`).join('') }));
    [['101', 'ciento uno'], ['200', 'doscientos'], ['500', 'quinientos'], ['700', 'setecientos'], ['900', 'novecientos'], ['1.001', 'mil uno'], ['100.000', 'cien mil'], ['1.000.000', 'un millón'],
      ['21명의 남자 → ___ hombres', 'veintiún hombres'], ['400명의 소녀 → ___ muchachas', 'cuatrocientas muchachas'], ['100유로 → ___ euros', 'cien euros'], ['5백만 명의 군인', 'cinco millones de soldados']]
      .forEach(([n, a], i) => put(s, '.g3', writeItem({ id: 'g3-' + i, sec: 'gram', skill: 'num', prompt: `<b>${n}</b>`, answers: [a] })));
    put(s, '.g4', cloze({ id: 'g4', sec: 'gram', skill: 'qp', title: '표를 완성하세요.', cls: 'table2', text:
      [['yo', 'quiero', 'puedo'], ['tú', 'quieres', 'puedes'], ['él / ella / usted', 'quiere', 'puede'], ['nosotros/as', 'queremos', 'podemos'], ['vosotros/as', 'queréis', 'podéis'], ['ellos / ellas / ustedes', 'quieren', 'pueden']]
        .map(([p, a, b]) => `<p><span>${p}</span> → [${a}] · [${b}]</p>`).join('') }));
    [['Yo ____ (querer) estudiar español.', 'quiero'], ['¿____ (poder, yo) entrar aquí?', 'puedo'], ['¿Me ____ (poder) ayudar usted?', 'puede'],
      ['Vosotros no ____ (poder) venir hoy.', 'podéis'], ['Ellos ____ (querer) vino de la casa.', 'quieren'], ['Tú ____ (querer) una paella.', 'quieres']]
      .forEach(([p, a], i) => put(s, '.g4b', writeItem({ id: 'g4b-' + i, sec: 'gram', skill: 'qp', prompt: p, ph: '동사만 쓰세요', answers: [a] })));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '빈칸에 목적대명사를 넣으세요.', { kr: '간접목적어 + 직접목적어를 대명사로! 둘 다 3인칭이면 le/les → se' })}
      ${modelo('El camarero le trae a Antonio <u>una cerveza</u>.<br>→ El camarero <b>se la</b> trae.')}<div class="items"></div>`);
    [['El camarero le trae a Antonio una cerveza.', 'El camarero ____ trae.', 'se la'], ['Nosotros les hacemos a nuestros padres un regalo.', 'Nosotros ____ hacemos.', 'se lo'],
      ['Les regalamos a los niños caramelos.', '____ regalamos.', 'se los'], ['La profesora les explica a sus alumnos el ejercicio.', 'La profesora ____ explica.', 'se lo'],
      ['Esta tarde le traigo a usted el libro.', 'Esta tarde ____ traigo.', 'se lo']]
      .forEach(([p, q, a], i) => put(s, '.items', writeItem({ id: 'e1-' + i, sec: 'e1', skill: 'pro', prompt: `${i + 1}. ${p} ${say(p)}<br>→ ${q}`, ph: '빈칸에 들어갈 말', answers: [a] })));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '동사 gustar 와 encantar 를 이용하여 다음의 질문들에 답해 보세요.', { kr: '질문의 대명사를 바꿔 답해요: ¿te …? → me … / ¿os …? · ¿les … a ustedes? → nos …' })}<div class="items"></div>`);
    const G = (pro, x, pl) => [`${pro} ${pl ? 'gustan' : 'gusta'} ${x}.`, `${pro} ${pl ? 'encantan' : 'encanta'} ${x}.`];
    [['¿Qué te gusta? (nadar en el mar)', G('Me', 'nadar en el mar')], ['¿Qué le gusta a su niño? (el chocolate)', G('Le', 'el chocolate')],
      ['¿Qué les gusta a ustedes? (los conciertos)', G('Nos', 'los conciertos', 1)], ['¿Qué os gusta a vosotros? (el campo)', G('Nos', 'el campo')],
      ['¿Qué le gusta a usted? (tomar el sol)', G('Me', 'tomar el sol')], ['¿Qué les gusta a Juan y Pedro? (escalar las montañas)', G('Les', 'escalar las montañas')]]
      .forEach(([q, a], i) => put(s, '.items', writeItem({ id: 'e2-' + i, sec: 'e2', skill: 'gus', prompt: `${i + 1}. ${q} ${say(q.replace(/\(.*\)/, ''))}`, ph: '→', answers: a })));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '스페인 음식의 이름을 맞게 짝지어 보세요.')}<div class="pm"></div>
      <h3 class="h3">✍️ 사진을 보고 음식 이름을 쓰세요</h3><div class="items two w"></div>`);
    const F = [['jamón serrano', '🍖🔪 <small>칼로 얇게 써는 돼지 뒷다리 햄</small>', '🍖'], ['paella', '🥘🦐 <small>홍합·새우가 든 넓은 팬 쌀 요리</small>', '🥘'], ['tortilla española', '🥔🍳 <small>둥글고 두툼한 감자 오믈렛</small>', '🍳'],
      ['queso manchego', '🧀 <small>얇게 썬 노란 양젖 치즈</small>', '🧀'], ['cocido', '🍲🌭 <small>병아리콩·소시지를 넣은 스튜</small>', '🍲']];
    put(s, '.pm', pairMatch({ id: 'ac1pm', sec: 'ac1', skill: 'voc', pairs: F.map(([a, b]) => [`(${F.findIndex(x => x[0] === a) + 1}) ${a}`, b]) }));
    F.forEach(([a, b, e], i) => put(s, '.w', writeItem({ id: 'ac1w' + i, sec: 'ac1', skill: 'voc', prompt: `<span class="emo-sm">${e}</span> ${b.replace(/^[^<]*/, '')}`, answers: [a] })));
  };
  const DISH = [['Cesto de frutas', '과일 바구니', 'po'], ['Cordero asado', '양고기 구이', 'hpc'], ['Sepia a la plancha', '갑오징어 철판구이', 'em'], ['Buñuelos de San Isidro', '산 이시드로 튀김 과자', 'po'],
    ['Flan de caramelo', '캐러멜 푸딩', 'po'], ['Gambas a la plancha', '새우 철판구이', 'em'], ['Huevos con cosas', '여러 재료를 곁들인 달걀 요리', 'hpc'], ['Chipirones a la bilbaína', '빌바오식 꼴뚜기 요리', 'hpc'],
    ['Ensalada natural', '생야채 샐러드', 'em'], ['Crema de cangrejo', '게살 크림수프', 'scv'], ['Espinacas a la crema', '크림 시금치', 'scv'], ['Pincho de rape con langostinos', '아귀와 랑고스티노 새우 꼬치', 'hpc']];
  B.ac2 = () => {
    const mi = (n, p) => `<div class="mi">• ${n}<span></span>${p}</div>`;
    const s = sec('ac2', `${acHead(2, '아래에 주어진 음식들의 의미를 알아보고, 음식 이름과 그것의 가격을 메뉴판의 빈칸에 적절하게 채워 보세요.')}
      ${vocTable(DISH.map(([es, kr]) => ({ es, kr })))}
      <div class="menu-card"><h4>LA BARRACA</h4>
        <h5>1. ENTREMESES Y MARISCOS</h5>${mi('Jamón serrano', '6,00 €')}${mi('Mejillones Barraca', '5,00 €')}<div class="mi blank">• ______ ×2</div>${mi('Tosta de champiñones', '3,50 €')}<div class="mi blank">• ______</div>${mi('Ensalada Barraca', '5,00 €')}
        <h5>2. SOPAS, CREMAS Y VERDURAS</h5>${mi('Gazpacho andaluz', '3,00 €')}<div class="mi blank">• ______ ×2</div>${mi('Espárragos de Tudela', '5,50 €')}${mi('Sopa de cebolla', '3,82 €')}
        <h5>3. HUEVOS, PESCADOS Y CARNES</h5>${mi('Tortilla española', '3,80 €')}<div class="mi blank">• ______</div>${mi('Pescado del día: merluza, lubina, mero, salmón o lenguado', '12,50 €')}<div class="mi blank">• ______ ×2</div>${mi('Brocheta de solomillo con salsa de tuétano', '13,50 €')}<div class="mi blank">• ______</div>${mi('Madrileñas de ternera', '7,86 €')}
        <h5>4. POSTRES</h5>${mi('Crema catalana', '4,20 €')}<div class="mi blank">• ______</div>${mi('Tartas variadas', '4,50 €')}<div class="mi blank">• ______ ×2</div>${mi('Cuajada con miel', '2,50 €')}
        <div class="foot2">HAY HOJAS DE RECLAMACIÓN A DISPOSICIÓN DEL CLIENTE</div></div>
      <h3 class="h3">① 12가지 음식을 메뉴판의 알맞은 항목에 넣으세요 (빈칸: 1번 3개 · 2번 2개 · 3번 4개 · 4번 3개)</h3><div class="sb"></div>
      <h3 class="h3">② 가격 읽기 — 6,50 € 처럼 쉼표는 소수점!</h3><div class="items two pr"></div>`);
    put(s, '.sb', sortBoard({ id: 'ac2sb', sec: 'ac2', skill: 'voc', cols: [{ k: 'em', label: '1. Entremeses y mariscos' }, { k: 'scv', label: '2. Sopas, cremas y verduras' }, { k: 'hpc', label: '3. Huevos, pescados y carnes' }, { k: 'po', label: '4. Postres' }],
      chips: DISH.map(([es, , k]) => [es, k]) }));
    [['Jamón serrano · 6,00 €', ['seis euros']], ['Tosta de champiñones · 3,50 €', ['tres euros con cincuenta', 'tres euros cincuenta', 'tres con cincuenta']], ['Pescado del día · 12,50 €', ['doce euros con cincuenta', 'doce euros cincuenta', 'doce con cincuenta']], ['Cuajada con miel · 2,50 €', ['dos euros con cincuenta', 'dos euros cincuenta', 'dos con cincuenta']]]
      .forEach(([p, a], i) => put(s, '.pr', writeItem({ id: 'ac2p' + i, sec: 'ac2', skill: 'num', prompt: p, ph: '… euros (con) …', answers: a })));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '앞의 Actividades 2번에서 완성된 메뉴판을 가지고 각자 번갈아 가며 음식점의 종업원과 고객이 되어서 서로 음식을 주문해 보세요.')}
      ${modelo('Camarero: ¿Qué quieren comer ustedes?<br>Cliente: De primero, gambas a la plancha. De segundo, cordero asado.<br>Camarero: ¿Y de postre?<br>Cliente: Flan de caramelo, por favor.<br>Camarero: ¿Y para beber?<br>Cliente: Agua, por favor. ¿Cuánto es? — Son veinticinco euros.')}
      <h3 class="h3">✍️ 주문 대화 쓰기 (6~10줄)</h3><div class="f"></div>
      <h3 class="h3">✍️ 종업원의 질문에 손님으로 답하기</h3><div class="items q"></div>`);
    put(s, '.f', freeItem({ id: 'ac3f', sec: 'ac3', rows: 8, prompt: 'Camarero / Cliente 대화를 쓰세요.', ph: 'Camarero: ¡Buenas noches! ¿Tienen mesa?\nCliente: …',
      must: [{ re: 'de primero', label: 'de primero' }, { re: 'de segundo', label: 'de segundo' }, { re: 'de postre', label: 'de postre' }, { re: 'para beber|beber', label: 'para beber' },
        { re: W0 + '(quiero|queremos|quieren|quiere|puede|puedo)' + W1, label: 'querer / poder' }, { re: DISH.map(d => SC.rx(d[0].toLowerCase())).join('|'), label: '메뉴판 음식 이름' }],
      model: 'Camarero: ¡Hola! ¿Qué quieren comer? Cliente: De primero, quiero una crema de cangrejo. De segundo, chipirones a la bilbaína. Camarero: ¿Y de postre? Cliente: Un flan de caramelo. Camarero: ¿Y para beber? Cliente: Agua, por favor. ¿Me puede traer la cuenta?' }));
    [['¿Qué quiere usted de primero?', [['de primero|quiero|para m[ií]', 'De primero, (quiero) …']], 'De primero, quiero una ensalada natural.'],
      ['¿Qué le aconsejo de segundo? — ¿Qué quiere tomar?', [['de segundo|quiero|tomo', 'De segundo, …']], 'De segundo, quiero el cordero asado.'],
      ['Y de postre, ¿qué quiere?', [['flan|cesto|bu[nñ]uelos|crema catalana|tarta|cuajada|fruta|yogur', '디저트 이름']], 'De postre, un flan de caramelo, por favor.'],
      ['Y para beber, ¿qué desea tomar?', [['agua|vino|cerveza|zumo|refresco|caf[eé]|t[eé]', '음료 이름']], 'Para beber, agua, por favor.']]
      .forEach(([q, kw, md], i) => put(s, '.q', contesta({ id: 'ac3q' + i, sec: 'ac3', skill: 'qp', items: [{ q, kw, model: md }] })));
  };
  B.ac4 = () => {
    const s = sec('ac4', `${acHead(4, '스페인에는 앞에 소개되지 않은 유명한 요리들이 더 많이 있습니다. 항목별로 어떤 음식들이 있는지 조사해 보세요.')}
      ${tip('예) Entremeses: pan con tomate, croquetas · Sopas: gazpacho, salmorejo, fabada · Carnes y pescados: cochinillo asado, pulpo a la gallega · Postres: churros con chocolate, turrón, natillas')}
      <div class="items"></div>`);
    [['🥖', 'Entremeses y mariscos', 'pan con tomate, croquetas, calamares'], ['🍲', 'Sopas, cremas y verduras', 'salmorejo, fabada asturiana'], ['🐟', 'Huevos, pescados y carnes', 'cochinillo asado, pulpo a la gallega'], ['🍩', 'Postres', 'churros con chocolate, turrón']]
      .forEach(([e, c, md], i) => put(s, '.items', freeItem({ id: 'ac4-' + i, sec: 'ac4', skill: 'voc', line: true, prompt: `<span class="emo-sm">${e}</span> <b>${c}</b> — 요리 이름 2개 이상 (쉼표로 구분)`, ph: '…, …',
        must: [{ re: '[a-záéíóúñ]{3,}[^,]*,\\s*[a-záéíóúñ]{3,}', label: '요리 2개 이상' }], model: md })));
    put(s, '.items', freeItem({ id: 'ac4-f', sec: 'ac4', skill: 'gus', rows: 3, prompt: '조사한 요리 중 먹어 보고 싶은 것을 querer / gustar 로 2문장 쓰세요.', ph: 'Quiero probar … porque …',
      must: [{ re: W0 + '(quiero|me gustar[ií]a|me (gusta|encanta)n?)' + W1, label: 'quiero / me gusta …' }, { re: W0 + 'porque' + W1, label: 'porque + 이유' }],
      model: 'Quiero probar los churros con chocolate porque me encanta el chocolate. También me gusta el pulpo a la gallega.' }));
  };

  /* ---------- Cultura ---------- */
  const LATAM = [['Argentina', 'la carne asada', '🥩'], ['Bolivia', 'el picante de pollo', '🍗'], ['Chile', 'la empanada', '🥟'], ['Colombia', 'el ajiaco', '🍲'], ['Cuba', 'el puerco asado', '🐖'],
    ['Costa Rica', 'el gallopinto', '🍚'], ['Ecuador', 'la fritada', '🍖'], ['El Salvador', 'las pupusas (tortitas de maíz y queso)', '🫓'], ['Guatemala', 'los tamales', '🌽'], ['Honduras', 'las tortitas de yuca', '🥞'],
    ['México', 'el guacamole', '🥑'], ['Nicaragua', 'la carne en bajo', '🥘'], ['Panamá', 'el arroz con pollo', '🍛'], ['Paraguay', 'la sopa paraguaya', '🍞'], ['Perú', 'el ceviche', '🐟'],
    ['Puerto Rico', 'los tostones (plátanos fritos)', '🍌'], ['República Dominicana', 'el sancocho', '🍲'], ['Uruguay', 'el asado criollo', '🔥'], ['Venezuela', 'las arepas', '🫓']];
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('라틴아메리카의 음식', LATAM.map(([c, d, e]) => ({ e, h: c, t: d })),
      '스페인어권에 해당하는 중남미 여러 국가에는 그 수만큼이나 다채롭고 풍부한 요리가 존재한다. 그중 가장 대표적인 요리들을 나라별로 살펴보면 다음과 같다. (사진: 아르헨티나의 asado)') +
      `<h3 class="h3">🔗 나라와 대표 음식을 연결하세요</h3><div class="pm"></div><h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    put(s, '.pm', pairMatch({ id: 'culpm', sec: 'cultura', skill: 'voc', pairs: [['México', 'el guacamole'], ['Perú', 'el ceviche'], ['Venezuela', 'las arepas'], ['Chile', 'la empanada'], ['Argentina', 'la carne asada'], ['Colombia', 'el ajiaco'], ['El Salvador', 'las pupusas']] }));
    [['República Dominicana 의 대표 음식은?', ['el sancocho', 'el gallopinto', 'los tamales', 'la fritada'], 'el sancocho', '고기와 채소를 푹 끓인 스튜'],
      ['los tostones 는 무엇으로 만들까요?', ['plátanos fritos', 'maíz y queso', 'yuca', 'pollo'], 'plátanos fritos', 'Puerto Rico — 튀긴 바나나(플랜틴)'],
      ['las pupusas 는 어느 나라 음식?', ['El Salvador', 'Cuba', 'Uruguay', 'Bolivia'], 'El Salvador', 'tortitas de maíz y queso']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
  };

  SC.lesson({
    num: '05',
    title: 'Queremos vino de la casa',
    ttsTest: 'Queremos vino de la casa.',
    cover: {
      emoji: '🍷🥘<small>🍽️ 🇪🇸</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#1c6fb3)',
      tema: ['En el restaurante', 'Las comidas y bebidas', 'Ciudades y habitantes'],
      com: ['간접목적대명사와 전치격 인칭대명사: Le aconsejo una paella. · Para mí, una sopa de verdura.', 'gustar 와 encantar: Me gusta el café. · Nos encanta Madrid.'],
      gram: ['간접목적대명사 · 직접+간접 결합(se lo)', '전치격 대명사 mí, ti, conmigo, contigo', 'gustar · encantar', '숫자 101 ~ 1.000.000', '불규칙동사 querer · poder']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Miguel: { g: 'm', av: '🧔🏻', side: 'l' }, Camarera: { g: 'f', av: '👩🏻‍🍳', side: 'r' }, Teresa: { g: 'f', av: '👩🏼', side: 'l' },
      Luis: { g: 'm', av: '🧑🏻', side: 'l' }, Ana: { g: 'f', av: '👩🏽', side: 'r' }, 'Verónica': { g: 'f', av: '👩🏽‍🦱', side: 'r' }, 'Ana y Verónica': { g: 'f', av: '👭', side: 'r' }
    },
    errLabels: { pronombre: '대명사 me·te·le·se·nos·os·les', concordancia: 'gusta / gustan 일치', conjugacion: 'querer · poder 변화', numero: '숫자 (cien · -ientos/-ientas · millón de)' },
    errTips: {
      acento: 'rincón, también, tráfico, millón, mí(전치격), queréis, podéis … 악센트도 철자예요.',
      pronombre: '간접 + 직접 순서, 둘 다 3인칭이면 le/les → se (se lo, se la). 전치사 뒤 mí · ti, con → conmigo · contigo',
      concordancia: '좋아하는 대상이 주어! 단수·동사원형 → gusta, 복수 → gustan',
      conjugacion: 'querer: quiero, quieres, quiere, queremos, queréis, quieren / poder: puedo, puedes, puede, podemos, podéis, pueden',
      numero: '100 = cien (ciento uno~), 500 = quinientos, 200~900 여성형 -ientas, un millón de + 명사'
    },
    classify(ti, ta) {
      const P = ['me', 'te', 'le', 'les', 'se', 'nos', 'os', 'lo', 'la', 'los', 'las', 'mí', 'mi', 'ti', 'conmigo', 'contigo'];
      if (ti.filter(w => P.includes(w)).join() !== ta.filter(w => P.includes(w)).join()) return 'pronombre';
      const sw = (x, y) => (ti.includes(x) && ta.includes(y));
      if (sw('gusta', 'gustan') || sw('gustan', 'gusta') || sw('encanta', 'encantan') || sw('encantan', 'encanta')) return 'concordancia';
      const vi = ti.find(w => /^(qu|pu|pod)/.test(w)), va = ta.find(w => /^(quier|quer|pued|pod)/.test(w));
      if (va && vi !== va) return 'conjugacion';
      const N = /(cien|mil|mill|ientos|ientas|veinti)/;
      if (ta.some(w => N.test(w)) && ti.join() !== ta.join()) return 'numero';
      return null;
    },
    errRules: [
      { re: W0 + '(le|les) (lo|la|los|las)' + W1, t: 'pronombre', msg: 'le/les + lo/la → se lo / se la' },
      { re: W0 + 'con (m[ií]|ti|yo|t[uú])(?=\\s*([.,;!?]|$))', t: 'pronombre', msg: 'conmigo / contigo' },
      { re: W0 + 'para (yo|t[uú])' + W1, t: 'pronombre', msg: '전치사 뒤: para mí / para ti' },
      { re: W0 + 'yo gusto' + W1, t: 'concordancia', msg: '"Yo gusto"(✕) → "Me gusta"' },
      { re: W0 + '(me|te|le|nos|os|les) gusta (las|los|mis|tus)' + W1, t: 'concordancia', msg: '복수 명사 앞 → gustan' },
      { re: W0 + '(me|te|le|nos|os|les) encanta (las|los|mis|tus)' + W1, t: 'concordancia', msg: '복수 명사 앞 → encantan' },
      { re: W0 + '(quero|queren|queres|quere|podo|poden|podes|puedemos|quieremos|quier[eé]is|pued[eé]is)' + W1, t: 'conjugacion', msg: 'quiero · queremos / puedo · podemos (부츠 모양)' },
      { re: W0 + '(cincocientos|cincocientas|sietecientos|nuevecientos|un mil|ciento euros|ciento mil)' + W1, t: 'numero', msg: 'quinientos · setecientos · novecientos · mil · cien' },
      { re: W0 + 'millones (soldados|personas|libros|habitantes|euros)' + W1, t: 'numero', msg: 'millones de + 명사' }
    ],
    accWords: ['rincón', 'tráfico', 'millón', 'queréis', 'podéis', 'veintiún', 'película', 'béisbol', 'jamón', 'champiñones', 'espárragos', 'buñuelos', 'verónica', 'española', 'además', 'también', 'música'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'En el restaurante → 나의 음식 이야기 쓰기',
        icons: ['🍽️', '🍷', '😋'],
        questions: ['¿Qué comida te gusta mucho? ¿Y qué comida no te gusta?', 'En un restaurante español, ¿qué quieres comer de primero, de segundo y de postre?', '¿Qué plato le aconsejas a tu amigo? ¿Por qué? ¿Cuánto cuesta?'],
        minWords: 50,
        hint: 'gustar · encantar · querer · poder · le aconsejo · 숫자/가격 을 활용하면 높은 점수!',
        ph: 'Me encanta la paella, pero no me gustan …',
        connectors: ['y', 'pero', 'porque', 'además', 'sin embargo', 'entonces', 'también'],
        rubric: [
          { k: 'com', label: '음식 이름 · 메뉴', max: 6, re: 'paella|sopa|ensalada|tortilla|jam[oó]n|queso|cocido|flan|fruta|yogur|gambas|cordero|chocolate|pizza|carne|pescado|kimchi|bibimbap|vino|agua', ax: 'Contenido' },
          { k: 'ord', label: 'de primero / de segundo / de postre', max: 8, re: 'de (primero|segundo|postre)', min: 2, ax: 'Contenido' },
          { k: 'gus', label: 'gustar / encantar', max: 10, re: '(me|te|le|nos|os|les) (gustan?|encantan?)', ax: 'Gramática' },
          { k: 'qp', label: 'querer / poder', max: 8, re: '(quiero|quieres|quiere|queremos|quer[eé]is|quieren|puedo|puedes|puede|podemos|pod[eé]is|pueden)', ax: 'Gramática' },
          { k: 'pro', label: '간접목적대명사 · 전치격 (le aconsejo, para mí …)', max: 6, re: '(le|les|te|os) (aconsejo|recomiendo|doy|traigo|compro)|para (m[ií]|ti)|conmigo|contigo|se (lo|la|los|las)', ax: 'Gramática' },
          { k: 'num', label: '숫자 · 가격 (euros, wones …)', max: 6, re: '(euros?|wones?|d[oó]lares?|cien|mil|\\d+)', ax: 'Gramática' }
        ],
        model: 'Me encanta la comida española, sobre todo la paella. Sin embargo, no me gustan las gambas. En un restaurante español, de primero quiero una sopa de verdura y de segundo, una tortilla española. De postre, un flan de caramelo. A mi amigo le aconsejo el jamón serrano porque es muy rico. Cuesta seis euros. ¿Puedes venir conmigo?'
      }
    },
    build: B
  });
})();
