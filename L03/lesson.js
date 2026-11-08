/* Lección 03 · La tienda está al lado del ayuntamiento — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 39~52쪽 : Diálogo → Vocabulario·Contesta → Lectura → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~3) → Actividades 1~3 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .room{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;background:#f1f8e6;border:3px solid #9ccf6a;border-radius:16px;padding:14px;margin:10px 0}
    .room div{background:#fff;border-radius:10px;text-align:center;padding:8px 4px;font-size:13px;color:#555;box-shadow:0 1px 3px rgba(0,0,0,.08)}
    .room div span{display:block;font-size:30px}
    .pos-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:10px 0}
    .pos-c{background:#fff;border:1px solid #e3e3e3;border-radius:12px;text-align:center;padding:8px 4px}
    .pos-c .sc{font-size:34px;line-height:1.2;display:block;min-height:46px}.pos-c b{display:block;font-size:14px;color:#7b3a26}.pos-c small{color:#777;font-size:12px}
    .opt-tab td,.opt-tab th{font-size:15px}
    @media(max-width:640px){.pos-grid,.room{grid-template-columns:repeat(3,1fr)}}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      int: 'Interrogativos 의문사',
      pos: 'Posición 위치 표현',
      irr: 'Irregulares 불규칙동사',
      num: 'Números 20~100',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '테레사가 지효에게 집 보여주기', group: 'Diálogo · Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'lec', label: 'Lectura', kr: 'Mi habitación 나의 방', group: 'Diálogo · Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '욕실 · 생활 어휘', group: 'Diálogo · Lectura' },
      { id: 'gram', label: 'Gramática', kr: '의문문 · 위치 표현 · 불규칙동사', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '의문사 넣기', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '위치 표현 넣기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '알맞은 동사 골라 활용', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'ac1', label: 'Actividades 1', kr: '숫자 20~100 · 수식 말하기', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '의문사로 질문 만들기', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '사진과 다른 설명 고치기', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'cultura', label: 'Cultura', kr: '『Platero y yo』', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Teresa', es: 'Como ves, el piso no es grande, pero es muy [cómodo]. Aquí está el baño, justo [enfrente de] la puerta. El salón está [a la derecha del] baño. Es muy [acogedor]. Tenemos el router aquí [sobre] la estantería para el internet.' },
      { who: 'Jihyo', es: '¿Qué es eso [al fondo del] pasillo?' },
      { who: 'Teresa', es: 'Es la [cocina]. Tiene una puerta pequeña [hacia] el patio. Tenemos tres [habitaciones]. Esta es de Momo, otra compañera de piso. Es japonesa y no está en casa ahora. Esta es mía. Pequeña pero bonita. [Mira], esta habitación es la tuya.' },
      { who: 'Jihyo', es: 'Es muy [amplia] y elegante.' }
    ],
    lectura: ['Mi habitación es grande. Las paredes son verdes. La cama está al lado de la ventana. Tengo muchos cojines sobre la cama. También tengo unas cajas grandes al pie de la cama. Guardo muchas cosas en las cajas. Tengo una estantería a la derecha de la cama y una maceta sobre la estantería. El escritorio está a la derecha de la estantería. Es de madera. Además, tengo un reloj grande en la pared de enfrente. La lámpara es redonda y de color azul. El suelo está cubierto de alfombra.'],

    voc1: [
      { es: 'piso', kr: '(아파트 형태의) 집', e: '🏢' }, { es: 'enseñar', kr: '보여주다, 가르치다', e: '👉' }, { es: 'como', kr: '~처럼', e: '🟰' },
      { es: 'cómodo', kr: '안락한', e: '🛋️' }, { es: 'justo', kr: '바로', e: '🎯' }, { es: 'salón', kr: '거실', e: '🛋️' },
      { es: 'baño', kr: '화장실, 욕실', e: '🚽' }, { es: 'acogedor', kr: '환대하는, 느낌이 좋은', e: '🤗' }, { es: 'Mira', kr: '(tú에 대해서) 여기 봐, 이것 좀 봐', e: '👀' },
      { es: 'router', kr: '인터넷 공유기', e: '📶' }, { es: 'estantería', kr: '책장, 선반', e: '📚' }, { es: 'pasillo', kr: '복도', e: '🚪' },
      { es: 'cocina', kr: '부엌', e: '🍳' }, { es: 'hacia', kr: '~로 향하여', e: '➡️' }, { es: 'patio', kr: '안뜰', e: '🌿' },
      { es: 'habitación', kr: '방', e: '🛏️' }, { es: 'amplio', kr: '넓은', e: '↔️' }, { es: 'elegante', kr: '우아한', e: '✨' },
      { es: 'al fondo de', kr: '~끝에', e: '🔚' }
    ],
    voc2: [
      { es: 'pared', kr: '벽', e: '🧱' }, { es: 'verde', kr: '녹색의', e: '🟩' }, { es: 'cama', kr: '침대', e: '🛏️' },
      { es: 'ventana', kr: '창문', e: '🪟' }, { es: 'cojín', kr: '쿠션', e: '🟦' }, { es: 'caja', kr: '상자', e: '📦' },
      { es: 'al pie de', kr: '~발치에, 하단부에', e: '⬇️' }, { es: 'guardar', kr: '보관하다', e: '🗄️' }, { es: 'cosa', kr: '것, 물건, 일', e: '🧸' },
      { es: 'maceta', kr: '화분', e: '🪴' }, { es: 'escritorio', kr: '책상', e: '🖥️' }, { es: 'madera', kr: '목재', e: '🪵' },
      { es: 'alfombra', kr: '카펫', e: '🟫' }, { es: 'lámpara', kr: '전등', e: '💡' }, { es: 'redondo', kr: '둥근', e: '⚪' },
      { es: 'color', kr: '색깔', e: '🎨' }, { es: 'azul', kr: '파란', e: '🟦' }, { es: 'suelo', kr: '바닥', e: '⬛' },
      { es: 'cubierto de', kr: '~으로 덮인', e: '🧺' }
    ],
    amplia: [
      { es: 'nevera', kr: '냉장고', e: '🧊' }, { es: 'queso', kr: '치즈', e: '🧀' }, { es: 'sillón', kr: '안락의자', e: '🪑' },
      { es: 'deprisa', kr: '서둘러, 급하게', e: '🏃' }, { es: 'rubio', kr: '금발의', e: '👱‍♀️' }, { es: 'toalla', kr: '수건', e: '🧻' },
      { es: 'lavabo', kr: '세면대', e: '🚰' }, { es: 'papel higiénico', kr: '휴지', e: '🧻' }, { es: 'jabón', kr: '비누', e: '🧼' },
      { es: 'bañera', kr: '욕조', e: '🛁' }, { es: 'retrete', kr: '좌변기', e: '🚽' }, { es: 'secador', kr: '헤어드라이어', e: '💨' }
    ],

    examBank: [
      { p: '¿____ idiomas hablas? <i>(무슨)</i>', a: ['qué'], s: 'int' },
      { p: '¿____ viven ellos? <i>(어디)</i>', a: ['dónde'], s: 'int' },
      { p: '¿____ vas? — Voy a la escuela. <i>(어디로)</i>', a: ['adónde'], s: 'int' },
      { p: '¿____ es Ana? — Es alta y simpática. <i>(어떻게)</i>', a: ['cómo'], s: 'int' },
      { p: '¿____ no comes más? — Estoy muy llena. <i>(왜)</i>', a: ['por qué'], s: 'int' },
      { p: '¿De ____ sois? — Somos de Corea. <i>(어디)</i>', a: ['dónde'], s: 'int' },
      { p: 'La ventana está ____ de la puerta. <i>(맞은편에)</i>', a: ['enfrente'], s: 'pos' },
      { p: 'La tienda está ____ del ayuntamiento. <i>(뒤에)</i>', a: ['detrás'], s: 'pos' },
      { p: 'El peine está ____ de la cama. <i>(밑에)</i>', a: ['debajo'], s: 'pos' },
      { p: 'El gato está ____ de la caja. <i>(안에)</i>', a: ['dentro'], s: 'pos' },
      { p: 'La mesa está al lado ____ la ventana.', a: ['de'], s: 'pos' },
      { p: 'Los libros están a la izquierda ____ escritorio. <i>(de + el)</i>', a: ['del'], s: 'pos' },
      { p: 'Yo ____ los deberes después de cenar. <i>(hacer)</i>', a: ['hago'], s: 'irr' },
      { p: 'Yo ____ de casa a las siete. <i>(salir)</i>', a: ['salgo'], s: 'irr' },
      { p: '¿Dónde ____ yo el armario? <i>(poner)</i>', a: ['pongo'], s: 'irr' },
      { p: '¿De dónde ____ vosotros? <i>(venir)</i>', a: ['venís'], s: 'irr' },
      { p: 'Nosotros ____ que terminar esto. <i>(tener)</i>', a: ['tenemos'], s: 'irr' },
      { p: '¿____ vosotros a Europa este verano? <i>(ir)</i>', a: ['vais'], s: 'irr' },
      { p: '20 + 15 = treinta y ____', a: ['cinco'], s: 'num' },
      { p: '17 × 4 = ____ y ocho', a: ['sesenta'], s: 'num' },
      { p: '26 = ____ <i>(숫자를 글자로)</i>', a: ['veintiséis'], s: 'num' }
    ]
  };

  const B = {};
  const POS = '(enfrente|delante|detr[aá]s|encima|debajo|dentro|al lado|a la izquierda|a la derecha|al fondo|al pie) (de|del)|sobre';

  /* ---------- Diálogo ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead('', 'Jihyo llega a Salamanca, España, para estudiar español. Teresa, su compañera de piso, le enseña la casa.')}
      <div class="dslot"></div>
      <h3 class="h3">🏠 테레사의 집 구조 — 대화를 듣고 확인해요</h3>
      <div class="room"><div><span>🚪</span>puerta</div><div><span>🚽</span>baño<br><small>enfrente de la puerta</small></div><div><span>🛋️</span>salón<br><small>a la derecha del baño</small></div><div><span>🍳</span>cocina<br><small>al fondo del pasillo</small></div><div><span>🌿</span>patio<br><small>hacia el patio</small></div></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'pos', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    ['¿Qué es eso al fondo del pasillo?', 'El salón está a la derecha del baño.', 'Es muy amplia y elegante.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'pos', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    ['salón', 'baño', 'estantería', 'pasillo', 'cocina', 'patio', 'habitación', 'amplio', 'al fondo de', 'cómodo'].forEach((w, i) => {
      const v = D.voc1.find(x => x.es === w);
      put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] }));
    });
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Por qué va Jihyo a España?', kw: [['estudiar espa[nñ]ol', 'para estudiar español']], model: 'Va a España para estudiar español.' },
      { q: '¿En qué ciudad tiene lugar esta conversación?', kw: [['salamanca', 'Salamanca']], model: 'Tiene lugar en Salamanca.' },
      { q: '¿Cómo es la habitación de Teresa?', kw: [['peque[nñ]a', 'pequeña'], ['bonita', 'bonita']], model: 'Es pequeña pero bonita.' },
      { q: '¿Cómo se llama la otra compañera de Jihyo?', kw: [['momo', 'Momo']], model: 'Se llama Momo.' },
      { q: '¿Qué tienen sobre la estantería?', kw: [['router', 'el router']], model: 'Tienen el router (para el internet).' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lec = () => {
    const s = sec('lec', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <div class="rb"></div>
      <h3 class="h3">🗺️ 방 배치도 — 글을 읽고 알맞은 위치를 쓰세요</h3>
      ${tip('글 속 위치 표현: <b>al lado de</b> · <b>sobre</b> · <b>al pie de</b> · <b>a la derecha de</b> · <b>en la pared de enfrente</b>')}
      <div class="c"></div>
      <h3 class="h3">✅ ¿Verdadero o falso?</h3><div class="items vf"></div>`);
    put(s, '.rb', readBlock(D.lectura, { img: '🛏️🪴', title: '<span class="hp">📖</span> Mi habitación — 문장을 누르면 들을 수 있어요.' }));
    put(s, '.c', cloze({ id: 'lecc', sec: 'lec', skill: 'pos', cls: 'lines', text: [
      '🛏️ La cama está [al lado de] la ventana.', '🟦 Tengo muchos cojines [sobre] la cama.', '📦 Tengo unas cajas grandes [al pie de] la cama.',
      '📚 Tengo una estantería [a la derecha de] la cama.', '🖥️ El escritorio está [a la derecha de] la estantería.', '🕰️ Tengo un reloj grande en la pared de [enfrente].'].map(x => `<p>${x}</p>`).join('') }));
    [['Las paredes de la habitación son azules.', 'Falso', '벽은 녹색(verdes)이에요.'], ['La maceta está sobre la estantería.', 'Verdadero', ''], ['El escritorio es de metal.', 'Falso', '책상은 나무(de madera)예요.'],
      ['La lámpara es redonda.', 'Verdadero', ''], ['El suelo está cubierto de alfombra.', 'Verdadero', '']]
      .forEach(([p, a, ex], i) => put(s, '.vf', choiceItem({ id: 'lecvf' + i, sec: 'lec', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a, explain: ex || undefined })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: ['pared', 'cama', 'ventana', 'caja', 'maceta', 'escritorio', 'lámpara', 'suelo'].map(w => { const v = D.voc2.find(x => x.es === w); return [v.es, v.e + ' ' + v.kr]; }) }));
    ['verde', 'cojín', 'al pie de', 'guardar', 'madera', 'alfombra', 'redondo', 'azul', 'cubierto de', 'cosa'].forEach((w, i) => {
      const v = D.voc2.find(x => x.es === w);
      put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] }));
    });
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿De qué color son las paredes?', kw: [['verdes?', 'verdes']], model: 'Son verdes.' },
      { q: '¿Dónde están las cajas grandes?', kw: [['al pie de la cama', 'al pie de la cama']], model: 'Están al pie de la cama.' },
      { q: '¿Está la maceta en la estantería?', kw: [['s[ií]', 'Sí'], ['estanter[ií]a', 'sobre la estantería']], model: 'Sí, está sobre la estantería.' },
      { q: '¿De qué es el escritorio?', kw: [['madera', 'de madera']], model: 'Es de madera.' },
      { q: '¿Cómo es la lámpara?', kw: [['redonda', 'redonda'], ['azul', 'de color azul']], model: 'Es redonda y de color azul.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 우리 집 욕실 · 부엌 묘사하기</h3>${modelo('En mi baño, el jabón está <b>al lado del</b> lavabo. La toalla está <b>encima de</b> la bañera.<br>En la cocina, el queso está <b>dentro de</b> la nevera.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es, cap: a.kr })), cols: 4 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'pos', rows: 3, prompt: '위 단어 3개 이상과 위치 표현을 넣어 우리 집 욕실이나 부엌을 2~3문장으로 쓰세요.', ph: 'En mi baño, el jabón está …',
      must: [{ re: POS, label: '위치 표현 2번 이상', min: 2 }, { re: D.amplia.map(a => SC.rx(a.es)).join('|'), label: 'Amplía 단어 3개 이상', min: 3 }],
      model: 'En mi baño, el jabón está al lado del lavabo y la toalla está encima de la bañera. El papel higiénico está a la derecha del retrete. En la cocina, el queso está dentro de la nevera.' }));
  };

  /* ---------- Gramática ---------- */
  const POSL = [
    ['enfrente de', '맞은편에', '🚪↔️🪟', 'La ventana está enfrente de la puerta.', '창문은 문 맞은편에 있다.'],
    ['delante de', '앞에', '🧑‍🏫👨‍🎓👩‍🎓', 'Él habla delante de los estudiantes.', '그는 학생들 앞에서 이야기한다.'],
    ['detrás de', '뒤에', '🏛️🏪', 'La tienda está detrás del ayuntamiento.', '가게는 시청 뒤에 있다.'],
    ['sobre', '위에', '🔑<br>🟫', 'Las llaves están sobre la mesa.', '열쇠는 탁자 위에 있다.'],
    ['encima de', '위에', '🐶<br>🏠', 'Snoopy está encima de su caseta.', '스누피는 그의 집 위에 있다.'],
    ['debajo de', '밑에', '🛏️<br>🪮', 'El peine está debajo de la cama.', '빗이 침대 밑에 있다.'],
    ['al lado de', '옆에', '🪟🪑', 'La mesa está al lado de la ventana.', '탁자는 창문 옆에 있다.'],
    ['dentro de', '안에', '📦🐱', 'El gato está dentro de la caja.', '고양이는 상자 안에 있다.'],
    ['a la izquierda de', '왼쪽에', '📚⬅️🖥️', 'Los libros están a la izquierda del escritorio.', '책들은 책상 왼쪽에 있다.'],
    ['a la derecha de', '오른쪽에', '🟫➡️✏️', 'Dejo los lápices a la derecha de la mesa.', '연필들을 탁자 오른쪽에 놓아둔다.']
  ];
  const IRR = [['hacer', '하다', 'hago, haces, hace, hacemos, hacéis, hacen'], ['tener', '가지다', 'tengo, tienes, tiene, tenemos, tenéis, tienen'], ['ir', '가다', 'voy, vas, va, vamos, vais, van'],
    ['venir', '오다', 'vengo, vienes, viene, venimos, venís, vienen'], ['salir', '나가다', 'salgo, sales, sale, salimos, salís, salen'], ['poner', '놓다', 'pongo, pones, pone, ponemos, ponéis, ponen']];
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 의문문</h3>
        <p><b>(1) 의문사가 없는 의문문</b> — 주어와 동사의 어순이 바뀐다.</p>
        <div class="blocks"><span class="bk v">¿Están</span><span class="bk p">ustedes</span><span class="bk s">enfadados con nosotros?</span><span class="small">당신들은 우리에게 화가 나셨나요?</span></div>
        <div class="blocks"><span class="bk v">¿Coméis</span><span class="bk p">vosotras</span><span class="bk s">mariscos?</span><span class="small">너희들 해산물 먹니?</span></div>
        ${tip('<b>주의</b> 어순을 바꾸지 않고 끝 억양만 올려도 의문문이 되지만(¿Ustedes están enfadados con nosotros?) 어감 차이가 있어요. 지금 단계에서는 <b>주어와 동사의 순서가 도치된다</b>는 것을 기억하세요.')}
        <p><b>(2) 의문사를 사용하는 의문문 (1)</b></p>
        <table class="gtab"><tr><th>의문사</th><th>뜻</th><th>예문</th></tr>
          <tr><td class="hi">qué</td><td>무엇, 무슨, 어떤</td><td class="l">¿Qué es esto? 이것은 무엇입니까? · ¿Qué idiomas hablas? 너는 어떤 언어를 구사하니? · ¿En qué aula están Julia y Pedro?</td></tr>
          <tr><td class="hi">dónde</td><td>어디</td><td class="l">¿Dónde viven ellos? 그들은 어디에 살지? · ¿De dónde sois? 너희들은 어디 출신이니? · ¿Adónde vas? 너는 어디로 가니?</td></tr>
          <tr><td class="hi">cómo</td><td>어떻게</td><td class="l">¿Cómo estás? 어떻게 지내? · ¿Cómo es Ana? 아나는 어떤 사람이지? · ¿Cómo vas a casa? 집에 어떻게 가니?</td></tr>
          <tr><td class="hi">por qué</td><td>왜</td><td class="l">¿Por qué hablas siempre en voz tan baja? · A: ¿Por qué no comes más? B: Estoy muy llena.</td></tr></table>
        ${tip('<b>a + dónde → adónde</b> ("어디로"). 의문사에는 항상 <b>악센트</b>! 대답의 <b>porque</b>(왜냐하면)는 붙여 쓰고 악센트가 없어요.')}
        <div class="items g1"></div></div>
      <div class="gcard"><h3>2. 위치 표현</h3>
        <div class="pos-grid">${POSL.map(([es, kr, e]) => `<div class="pos-c"><span class="sc">${e}</span><b>${es}</b><small>${kr}</small></div>`).join('')}</div>
        <table class="gtab">${POSL.map(([es, kr, e, ex, exk], i) => `<tr><td>(${i + 1})</td><td class="hi">${es}</td><td>${kr}</td><td class="l">${ex} ${say(ex)}<br><small>${exk}</small></td></tr>`).join('')}</table>
        ${tip('<b>de + el = del</b>: detrás <b>del</b> ayuntamiento, a la derecha <b>del</b> baño. (de + la 는 그대로)')}
        <div class="g2"></div></div>
      <div class="gcard"><h3>3. 불규칙 동사</h3>
        <table class="gtab">${IRR.map(([v, k, f]) => `<tr><td><b>${v}</b> ${k}</td><td class="l">${f.split(', ').map((x, i) => i === 0 ? `<span class="hi">${x}</span>` : x).join(', ')}</td></tr>`).join('')}</table>
        <table class="gtab opt-tab">${[['No hago nada los fines de semana.', '나는 주말에 아무것도 하지 않는다.'], ['¿Tienes dinero para comprar un móvil nuevo?', '너는 새 휴대전화를 살 돈이 있니?'], ['Vamos al cine esta tarde.', '오늘 오후 우리는 영화관에 간다.'],
          ['¿De dónde viene ese crucero?', '저 유람선은 어디서 오는 것이지?'], ['Salgo ahora mismo.', '지금 당장 나갈게.'], ['¿Pongo el armario en esta habitación?', '장롱을 이 방에 놓을까?'], ['Tenemos que terminar esto para mañana.', '우리는 이것을 내일까지 마쳐야 한다.'], ['¿Vais a Europa este verano?', '너희는 이번 여름에 유럽에 가니?']]
          .map(([a, b]) => `<tr><td class="l">${a} ${say(a)}</td><td class="l">${b}</td></tr>`).join('')}</table>
        ${tip('<b>참고</b> \'tener que + 동사원형\'은 의무(~해야 한다), \'ir a + 동사원형\'은 미래의 행위(~할 것이다)를 표현한다.')}
        <div class="g3"></div></div>`);
    [['이것은 무엇입니까?', '¿Qué es esto?'], ['너희들은 어디 출신이니?', '¿De dónde sois?'], ['아나는 어떤 사람이지?', '¿Cómo es Ana?'], ['너는 어디로 가니?', '¿Adónde vas?']]
      .forEach(([k, a], i) => put(s, '.g1', writeItem({ id: 'g1-' + i, sec: 'gram', skill: 'int', prompt: k, ph: '¿ … ?', answers: [a] })));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'pos', title: '그림을 보고 위치 표현을 쓰세요.', cls: 'lines', text:
      ['📦🐱 El gato está [dentro] de la caja.', '🛏️/🪮 El peine está [debajo] de la cama.', '🏛️🏪 La tienda está [detrás] del ayuntamiento.', '🔑/🟫 Las llaves están [sobre|encima de] la mesa.', '🪟🪑 La mesa está al [lado] de la ventana.', '📚⬅️🖥️ Los libros están a la izquierda [del] escritorio.'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'irr', title: '1인칭 단수(yo)와 1인칭 복수(nosotros)를 쓰세요.', cls: 'table2', text:
      [['hacer', 'hago', 'hacemos'], ['tener', 'tengo', 'tenemos'], ['ir', 'voy', 'vamos'], ['venir', 'vengo', 'venimos'], ['salir', 'salgo', 'salimos'], ['poner', 'pongo', 'ponemos']].map(([a, b, c]) => `<p><span>${a}</span> → yo [${b}] · nosotros [${c}]</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '빈칸에 의문사를 넣어 문장을 완성하시오.', { kr: '의문사 악센트까지 정확하게! (qué · dónde · cómo · por qué)' })}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1c', sec: 'e1', skill: 'int', cls: 'lines', text: [
      '1. ¿De [qué] ciudad de Estados Unidos eres?', '2. ¿[Por qué] están cansados?', '3. ¿[Qué] buscas aquí?', '4. ¿[Qué] comes estos días?',
      '5. ¿[Dónde] aparcamos el coche? ¿Aquí o en esa calle?', '6. ¿De [dónde] sale este tren?', '7. ¿[Por qué] no tomas un poco de zumo de naranja?'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '빈칸에 알맞은 위치표현을 넣으시오.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e2c', sec: 'e2', skill: 'pos', cls: 'lines', text: [
      '1. El libro está [sobre] (위에) el escritorio.', '2. Él va [delante] (앞에) de ellos en el camino.', '3. [Debajo] (밑에) de los árboles está Ana con su novio.',
      '4. [A la izquierda] (왼쪽에) de los huevos está el queso.', '5. Él vive [detrás] (뒤에) del hotel.', '6. [Enfrente] (맞은 편에) de mi casa está el autobús.',
      '7. Los chicos estudian [al lado] (옆에) de sus padres.', '8. Pongo este reloj [a la derecha] (오른쪽에) del sofá.', '9. El globo está [encima] (위에) de la cabeza.',
      '10. La botella está [dentro] (안에) de la nevera.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '의미상 적절한 동사를 골라 문장을 완성하세요.')}
      <div class="ybox wordbank">보기: <span>ser</span><span>tener</span><span>hacer</span><span>ir</span><span>salir</span><span>venir</span><span>poner</span></div>
      <div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e3c', sec: 'e3', skill: 'irr', cls: 'lines', text: [
      '1. El concierto [es] en el Estadio Olímpico.', '2. Yo [hago] los deberes después de cenar.', '3. ¿Dónde [pongo] yo estos sillones?',
      '4. Nosotros [salimos] de casa muy temprano por la mañana.', '5. ¿De dónde [venís] vosotros tan deprisa?', '6. Tu hermana y tú [tenéis] que volver pronto a casa.',
      '7. Mis primos [van] a hacer un curso de español en Toledo.'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  const NUMS = [[20, 'veinte'], [21, 'veintiuno'], [22, 'veintidós'], [23, 'veintitrés'], [24, 'veinticuatro'], [25, 'veinticinco'], [26, 'veintiséis'], [27, 'veintisiete'], [28, 'veintiocho'], [29, 'veintinueve'],
    [30, 'treinta'], [31, 'treinta y uno'], [35, 'treinta y cinco'], [40, 'cuarenta'], [50, 'cincuenta'], [60, 'sesenta'], [70, 'setenta'], [80, 'ochenta'], [90, 'noventa'], [100, 'cien']];
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '20부터 100까지의 숫자를 익히고 아래 수식을 말해보세요.')}
      <table class="gtab">${NUMS.slice(0, 10).map((x, i) => { const y = NUMS[i + 10]; return `<tr><td>${x[0]}</td><td class="l">${x[1]} ${say(x[1])}</td><td>${y[0]}</td><td class="l">${y[1]} ${say(y[1])}</td></tr>`; }).join('')}</table>
      ${tip('21~29는 한 단어: veinti + 숫자 (veintidós, veintitrés, veintiséis 악센트!). 31부터는 <b>treinta y uno</b>처럼 y로 연결해요.')}
      <table class="gtab"><tr><th>더하기</th><td>veinte</td><td class="hi">más</td><td>doce</td><td class="hi">son</td><td>treinta y dos</td></tr>
        <tr><th>빼기</th><td>treinta</td><td class="hi">menos</td><td>veintinueve</td><td class="hi">es</td><td>uno</td></tr>
        <tr><th>곱하기</th><td>siete</td><td class="hi">por</td><td>nueve</td><td class="hi">son</td><td>sesenta y tres</td></tr>
        <tr><th>나누기</th><td>cincuenta y cinco</td><td class="hi">entre / dividido por</td><td>cinco</td><td class="hi">son</td><td>once</td></tr></table>
      ${tip('결과가 1이면 <b>es</b> uno, 그 밖에는 <b>son</b>.')}
      <h3 class="h3">① 숫자와 글자 짝 맞추기</h3><div class="pm"></div>
      <h3 class="h3">② 수식을 스페인어로 쓰세요 — 예) 2 + 8 = Dos más ocho son diez.</h3><div class="items two w"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac1pm', sec: 'ac1', skill: 'num', pairs: [['22', 'veintidós'], ['26', 'veintiséis'], ['35', 'treinta y cinco'], ['47', 'cuarenta y siete'], ['58', 'cincuenta y ocho'], ['63', 'sesenta y tres'], ['79', 'setenta y nueve'], ['100', 'cien']] }));
    [['(1) 2 + 8 =', 'Dos más ocho son diez.', 'diez'], ['(2) 15 + 23 =', 'Quince más veintitrés son treinta y ocho.', 'treinta y ocho'], ['(3) 17 × 4 =', 'Diecisiete por cuatro son sesenta y ocho.', 'sesenta y ocho'],
      ['(4) 48 ÷ 48 =', 'Cuarenta y ocho entre cuarenta y ocho es uno.', 'uno', 'Cuarenta y ocho dividido por cuarenta y ocho es uno.'], ['(5) 99 − 82 =', 'Noventa y nueve menos ochenta y dos son diecisiete.', 'diecisiete'],
      ['(6) 55 + 45 =', 'Cincuenta y cinco más cuarenta y cinco son cien.', 'cien'], ['(7) 49 ÷ 7 =', 'Cuarenta y nueve entre siete son siete.', 'siete', 'Cuarenta y nueve dividido por siete son siete.'],
      ['(8) 100 − 26 =', 'Cien menos veintiséis son setenta y cuatro.', 'setenta y cuatro'], ['(9) 2 × 37 =', 'Dos por treinta y siete son setenta y cuatro.', 'setenta y cuatro'], ['(10) 0 + 0 =', 'Cero más cero es cero.', 'cero', 'Cero más cero son cero.']]
      .forEach(([p, ...a], i) => put(s, '.w', writeItem({ id: 'ac1-' + i, sec: 'ac1', skill: 'num', prompt: `<b>${p}</b>`, ph: '수식 전체 또는 결과', answers: a })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '의문사를 넣어 질문을 만들고, 서로 대화해 보세요.', { kr: '그림 속 대답을 보고 알맞은 질문을 쓰세요 (¿ ? 부호까지!).' })}<div class="items"></div>`);
    [['🗼', 'José: ¿ … ?', 'Jean: Vivo en París.', ['¿Dónde vives?', '¿Dónde vives tú?', '¿Dónde vives, Jean?']],
      ['🧍‍♂️', 'María: ¿ … ?', 'Nerea: Mi hermano es rubio y alto.', ['¿Cómo es tu hermano?']],
      ['🏃‍♂️🏃‍♂️', 'Carlos: ¿ … ?', 'Mario y Pablo: Corremos porque llegamos tarde a clase.', ['¿Por qué corréis?', '¿Por qué corréis vosotros?', '¿Por qué corren?']],
      ['📦', 'Carlos: ¿ … ?', 'Ana: El paquete está en tu habitación.', ['¿Dónde está el paquete?']],
      ['🧃', 'Nuria: ¿ … ?', 'Jorge: Tomamos zumo de naranja por la mañana.', ['¿Qué tomáis por la mañana?', '¿Qué tomáis?', '¿Qué tomáis vosotros por la mañana?', '¿Qué toman por la mañana?']]]
      .forEach(([e, q, ans, a], i) => put(s, '.items', writeItem({ id: 'ac2-' + i, sec: 'ac2', skill: 'int', prompt: `<span class="photo-emo">${e}</span> ${q}<br><b>${ans}</b> ${say(ans)}`, ph: '¿ … ?', answers: a })));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '사진과 설명이 다른 곳을 고쳐 보세요.', { kr: '호텔 욕실 사진: 왼쪽에 세면대(수건은 세면대 오른쪽 선반 위), 세면대 위 거울과 그 옆 조명, 오른쪽 안쪽에 욕조와 샤워기, 앞쪽에 좌변기, 오른쪽 벽에 휴지와 헤어드라이어.' })}
      <div class="room" style="grid-template-columns:repeat(4,1fr)"><div><span>🪞💡</span>espejo · luz</div><div><span>🚰🧼</span>lavabo · jabón</div><div><span>🧺</span>toallas</div><div><span>🛁🚿</span>bañera · ducha</div>
        <div><span>🧻</span>papel higiénico</div><div><span>💨</span>secador</div><div><span>🚽</span>retrete</div><div><span>🔲</span>suelo</div></div>
      ${tip('틀린 부분의 <b>위치 표현</b>을 바꿔 문장 전체를 다시 쓰세요. 예) Las toallas están <s>a la izquierda</s> → <b>a la derecha</b> del lavabo.')}
      <div class="items"></div>`);
    [['1. Las toallas están a la izquierda del lavabo.', 'toallas', 'a la derecha del lavabo|sobre|encima', 'Las toallas están a la derecha del lavabo.'],
      ['2. La luz está debajo del espejo.', 'luz', 'al lado del espejo|a la (derecha|izquierda) del espejo|encima del espejo', 'La luz está al lado del espejo.'],
      ['3. El papel higiénico está detrás del lavabo.', 'papel higi[eé]nico', 'al lado del retrete|a la derecha del retrete|cerca del retrete|encima del retrete', 'El papel higiénico está al lado del retrete.'],
      ['4. El jabón está sobre las toallas.', 'jab[oó]n', 'al lado del (lavabo|grifo)|sobre el lavabo|a la izquierda de las toallas|encima del lavabo', 'El jabón está a la izquierda de las toallas, al lado del grifo.'],
      ['5. El retrete está detrás del lavabo.', 'retrete', 'a la derecha del lavabo|delante de la ba[nñ]era|al lado del lavabo|al lado de la ba[nñ]era', 'El retrete está a la derecha del lavabo, delante de la bañera.'],
      ['6. La bañera está delante del retrete.', 'ba[nñ]era', 'detr[aá]s del retrete|al fondo', 'La bañera está detrás del retrete.'],
      ['7. La ducha está al lado de la luz.', 'ducha', 'dentro de la ba[nñ]era|encima de la ba[nñ]era|sobre la ba[nñ]era', 'La ducha está encima de la bañera.'],
      ['8. El secador está debajo del papel higiénico.', 'secador', 'encima del papel higi[eé]nico|sobre el papel higi[eé]nico', 'El secador está encima del papel higiénico.']]
      .forEach(([p, subj, pos, md], i) => put(s, '.items', freeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'pos', line: true, prompt: `${p} ${say(p.slice(3))}`, ph: '바르게 고쳐 쓰세요',
        must: [{ re: subj, label: '주어 그대로' }, { re: 'est[aá]n?', label: 'está / están' }, { re: pos, label: '사진에 맞는 위치' }], model: md })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('『Platero y yo』 — Juan Ramón Jiménez', [
      { e: '📖🫏', h: '어떤 작품?', t: '『플라테로와 나』는 후안 라몬 히메네스의 대표적인 <b>시집(산문시)</b>으로 노벨문학상 수상작이다. 평이한 문체와 내용으로 자연 속 소박한 삶의 의미를 일깨운다.' },
      { e: '🌿', h: '자연과 소통', t: '히메네스는 도시의 퇴폐적인 삶 대신 해가 뜨고, 비가 오고, 눈이 오는 <b>자연의 변화</b>를 느끼며 자연과 하나 되는 삶의 의미를 되찾아 준다.' },
      { e: '🏡', h: '모게르 마을', t: '시냇물이 흐르고 새가 노래하는 시골 마을 <b>모게르(Moguer)</b>에서 시인은 당나귀 플라테로와 친구가 되어 대화를 나눈다.' },
      { e: '🦋', h: '위로와 치유', t: '시인은 당나귀 플라테로를 품에 안고 뒹굴며 자신을 치유한다. 약삭빠르고 탐욕스러운 삶을 반박하고, 하찮고 단순한 것들을 예찬한다.' }
    ], '은빛 당나귀 플라테로와 시인의 대화를 통해 자연과 소박한 삶의 가치를 노래한 작품이에요. (1956년 노벨문학상)') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['『Platero y yo』의 작가는?', ['Juan Ramón Jiménez', 'Miguel de Cervantes', 'Federico García Lorca', 'Pablo Neruda'], 'Juan Ramón Jiménez', '1956년 노벨문학상 수상'],
      ['플라테로(Platero)는 어떤 동물인가?', ['당나귀', '말', '개', '고양이'], '당나귀', '은빛 털의 작은 당나귀'],
      ['작품의 배경이 되는 시인의 고향 마을은?', ['모게르', '살라망카', '톨레도', '세비야'], '모게르', 'Moguer — 안달루시아의 작은 마을'],
      ['이 작품이 예찬하는 것은?', ['자연과 소박한 삶', '대도시의 화려함', '전쟁의 영웅', '부와 권력'], '자연과 소박한 삶', '']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex || undefined })));
  };

  SC.lesson({
    num: '03',
    title: 'La tienda está al lado del ayuntamiento',
    ttsTest: 'La tienda está al lado del ayuntamiento.',
    cover: {
      emoji: '🏠🛋️<small>📍 ❓</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#c2410c)',
      tema: ['La casa y la habitación', 'Los muebles y el baño', 'Los números del 20 al 100'],
      com: ['의문사(1): Qué, Dónde, Cómo — ¿Qué idiomas hablas? · ¿Cómo limpiamos el coche?', '위치 표현: El gato está a la derecha del perro. · Ponemos los libros sobre la mesa.'],
      gram: ['의문문: 주어-동사 도치, qué · dónde · cómo · por qué', '위치 표현: enfrente de, delante de, detrás de, sobre, encima de, debajo de, al lado de, dentro de, a la izquierda/derecha de', '불규칙동사: hacer, tener, ir, venir, salir, poner']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Teresa: { g: 'f', av: '👩🏼', side: 'l' }, Jihyo: { g: 'f', av: '👩🏻', side: 'r' }
    },
    errLabels: { conjugacion: '불규칙동사 변화', estructura: 'de + el = del / a + el = al', interrogativo: '의문사 선택' },
    errTips: {
      acento: 'qué, dónde, cómo, por qué (의문사), detrás, cómodo, salón, habitación, lámpara … 악센트도 철자예요.',
      conjugacion: 'hago · tengo · voy · vengo · salgo · pongo (1인칭 단수가 특이해요)',
      estructura: 'de + el → del (detrás del ayuntamiento), a + el → al',
      interrogativo: 'qué 무엇 · dónde 어디 · cómo 어떻게 · por qué 왜 · adónde 어디로'
    },
    classify(ti, ta) {
      const Q = ['qué', 'que', 'dónde', 'donde', 'cómo', 'como', 'por', 'adónde', 'adonde'];
      const qi = ti.filter(w => Q.includes(w)).join(), qa = ta.filter(w => Q.includes(w)).join();
      if (qa && qi && qi.normalize('NFD').replace(/[̀-ͯ]/g, '') !== qa.normalize('NFD').replace(/[̀-ͯ]/g, '')) return 'interrogativo';
      const V = /^(hago|haces|hace|hacemos|hac[eé]is|hacen|tengo|tienes|tiene|tenemos|ten[eé]is|tienen|voy|vas|va|vamos|vais|van|vengo|vienes|viene|venimos|ven[ií]s|vienen|salgo|sales|sale|salimos|sal[ií]s|salen|pongo|pones|pone|ponemos|pon[eé]is|ponen)$/;
      const vi = ti.find(w => V.test(w)), va = ta.find(w => V.test(w));
      if (va && vi !== va) return 'conjugacion';
      if (ta.includes('del') && !ti.includes('del')) return 'estructura';
      return null;
    },
    errRules: [
      { re: W0 + 'de el' + W1, t: 'estructura', msg: 'de + el → del' },
      { re: W0 + 'a el' + W1, t: 'estructura', msg: 'a + el → al' },
      { re: W0 + '(haco|teno|tieno|veno|vieno|salo|poneo|pono|hacio)' + W1, t: 'conjugacion', msg: 'hago · tengo · vengo · salgo · pongo' },
      { re: W0 + 'yo (hace|tiene|viene|sale|pone|va)' + W1, t: 'conjugacion', msg: 'yo → hago / tengo / vengo / salgo / pongo / voy' },
      { re: W0 + '(encima|debajo|dentro|delante|detr[aá]s|enfrente) (la|el|los|las)' + W1, t: 'estructura', msg: '위치 부사 + de: encima de la …' }
    ],
    accWords: ['cómodo', 'salón', 'habitación', 'cojín', 'lámpara', 'detrás', 'jabón', 'sillón', 'adónde', 'veintidós', 'veintitrés', 'veintiséis', 'están', 'baño', 'bañera'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Mi habitación → 글로 쓰기',
        icons: ['🛏️', '🪟', '📚'],
        questions: ['¿Cómo es tu habitación? ¿Es grande o pequeña? ¿De qué color son las paredes?', '¿Qué cosas tienes en tu habitación? (cama, escritorio, estantería, lámpara, alfombra…)', '¿Dónde están las cosas? (위치 표현을 4개 이상 쓰세요)'],
        minWords: 50,
        hint: '위치 표현 · tener · ser/estar · 색깔 형용사를 모두 쓰면 높은 점수!',
        ph: 'Mi habitación es pequeña pero muy cómoda. Las paredes son …',
        connectors: ['y', 'pero', 'también', 'además', 'porque', 'como'],
        rubric: [
          { k: 'mue', label: '방의 물건 4개 이상', max: 10, re: 'cama|escritorio|estanter[ií]a|l[aá]mpara|alfombra|ventana|silla|sill[oó]n|armario|maceta|caja|coj[ií]n|reloj|mesa|pared|puerta', min: 4, ax: 'Contenido' },
          { k: 'col', label: '색깔 · 모양 묘사', max: 8, re: 'verdes?|azul(es)?|blancos?|blancas?|rojos?|rojas?|amarill[oa]s?|negr[oa]s?|grises?|marr[oó]n|rosas?|redond[oa]s?|grandes?|peque[nñ]os?|peque[nñ]as?', min: 2, ax: 'Contenido' },
          { k: 'pos', label: '위치 표현 4개 이상', max: 16, re: POS, min: 4, ax: 'Gramática' },
          { k: 'est', label: 'estar 로 위치 말하기', max: 8, re: 'est[aá]n?', min: 2, ax: 'Gramática' },
          { k: 'ten', label: 'tener · ser', max: 6, re: 'tengo|tiene|es|son', ax: 'Gramática' }
        ],
        model: 'Mi habitación es pequeña pero muy cómoda. Las paredes son blancas. La cama está al lado de la ventana y tengo muchos cojines sobre la cama. El escritorio está a la derecha de la cama. Es de madera. Tengo una lámpara redonda encima del escritorio. Además, hay una alfombra azul debajo de la cama y mis libros están dentro de la estantería.'
      }
    },
    build: B
  });
})();
