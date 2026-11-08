/* Lección 08 · Estoy yendo al banco — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 107~120쪽 : Diálogo 1·2 → Vocabulario·Contesta → Amplía tu vocabulario → Gramática y ejercicios(연습문제 1~4)
   → Actividades 1~3 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      ger: 'Gerundio 현재분사·진행형',
      pro: 'Pronombres 대명사 위치',
      oue: 'Irregulares o→ue 불규칙',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo 1', kr: '해변에서 — 세르히오와 에바', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'd2', label: 'Diálogo 2', kr: '거리에서 — 알베르토와 엠마', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '여행 · 약속 어휘', group: 'Diálogo' },
      { id: 'gram', label: 'Gramática', kr: '현재분사 · 대명사 위치 · o→ue', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '현재분사형 쓰기', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '현재진행형으로 바꾸기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '간접목적대명사로 바꾸기', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'e4', label: '연습문제 4', kr: '어간모음 변화 분류', group: 'Gramática y ejercicios', kind: 'ej', n: 4 },
      { id: 'ac1', label: 'Actividades 1', kr: '사진 보고 진행형 문장', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '사진과 문장 연결', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '초대장 쓰기', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'cultura', label: 'Cultura', kr: 'El Carnaval del Toro', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo1: [
      { who: 'Sergio', es: '¡Qué buen [tiempo]!' },
      { who: 'Eva', es: 'Sí, muy buen tiempo. Con este tiempo quiero [bañarme] un poco en el mar.' },
      { who: 'Sergio', es: 'Después de bañarte, ¿qué te [apetece] hacer? ¿Qué tal si vamos a tomar algo en un bar [cercano]?' },
      { who: 'Eva', es: 'Yo tengo [ganas] de tomar una cerveza bien fría.' },
      { who: 'Sergio', es: '¿De verdad? He oído que normalmente no la tomas.' },
      { who: 'Eva', es: 'No, pero esta [vez] quiero.' },
      { who: 'Sergio', es: 'Está bien. Como estoy [tomando] el sol y vas a bañarte, salimos de aquí dentro de media hora.' },
      { who: 'Eva', es: 'De acuerdo. Por [cierto], ¿qué te parece si invito a una amiga mía para tomar algo todos juntos?' },
      { who: 'Sergio', es: 'No hay problema. ¡Cuanto más, [mejor]!' },
      { who: 'Eva', es: 'Gracias.' }
    ],
    dialogo2: [
      { who: 'Alberto', es: '¡Disculpa! ¿Eres Emma?' },
      { who: 'Emma', es: 'Sí, soy Emma.' },
      { who: 'Alberto', es: 'Desde luego. ¿No te [acuerdas] de mí? Soy Alberto.' },
      { who: 'Emma', es: '¡Ah! Alberto, ¡cuánto tiempo sin vernos!' },
      { who: 'Alberto', es: '¿Qué haces aquí? Trabajo en una [empresa] internacional y estoy [yendo] al banco.' },
      { who: 'Emma', es: 'También trabajo en una empresa y voy al banco. ¡Qué [casualidad]!' },
      { who: 'Alberto', es: 'Es cierto. Tenemos que vernos para saber más de nosotros. ¿Salimos este [fin de semana]?' },
      { who: 'Emma', es: 'Lo siento, no [puedo]. Es que tengo una [cita] con el doctor.' },
      { who: 'Alberto', es: 'Entonces, ¿el próximo fin de semana?' },
      { who: 'Emma', es: 'Está bien. ¿A qué hora y dónde [quedamos]?' },
      { who: 'Alberto', es: 'El próximo sábado a las ocho en la [entrada] de la estación de Atocha.' },
      { who: 'Emma', es: 'Vale, gracias.' }
    ],

    voc1: [
      { es: 'tiempo', kr: '날씨', e: '🌤️' }, { es: 'apetecer', kr: '좋아하다, 하고 싶다', e: '😋' }, { es: 'cercano', kr: '가까운', e: '📍' },
      { es: 'cerveza', kr: '맥주', e: '🍺' }, { es: 'escuchar', kr: '듣다', e: '🎧' }, { es: 'vez', kr: '번, 회', e: '1️⃣' },
      { es: 'salir', kr: '나가다', e: '🚪' }, { es: 'todo', kr: '모든', e: '💯' }, { es: 'problema', kr: '문제', e: '⚠️' },
      { es: 'bañarse en el mar', kr: '해수욕하다', e: '🏊' }, { es: 'hacer', kr: '하다', e: '🛠️' }, { es: 'tener ganas de', kr: '하고 싶다', e: '🙋' },
      { es: 'de verdad', kr: '정말로', e: '❗' }, { es: 'en general', kr: '일반적으로', e: '📊' }, { es: 'tomar el sol', kr: '일광욕을 하다', e: '😎' },
      { es: 'por cierto', kr: '그건 그렇고', e: '💬' }, { es: '¡Cuanto más, mejor!', kr: '다다익선', e: '➕' }
    ],
    voc2: [
      { es: 'desde luego', kr: '물론이지', e: '👌' }, { es: 'empresa', kr: '회사', e: '🏢' }, { es: 'cierto', kr: '확실한', e: '✔️' },
      { es: 'cita', kr: '약속', e: '📅' }, { es: 'entrada', kr: '입구', e: '🚪' }, { es: 'acordarse de', kr: '기억하다', e: '🧠' },
      { es: 'casualidad', kr: '우연', e: '🎲' }, { es: 'fin de semana', kr: '주말', e: '🗓️' }, { es: 'quedar con', kr: '만나다', e: '🤝' },
      { es: 'estación', kr: '역', e: '🚉' }
    ],
    amplia: [
      { es: 'exposición', kr: '전시회', e: '🖼️' }, { es: 'plaza', kr: '광장', e: '⛲' }, { es: 'monumento', kr: '기념비', e: '🗿' },
      { es: 'aeropuerto', kr: '공항', e: '🛫' }, { es: 'citar', kr: '약속하다', e: '🤙' }, { es: 'ir de vacaciones', kr: '휴가 가다', e: '🧳' },
      { es: 'salida', kr: '출구', e: '🚏' }, { es: 'reserva', kr: '예약', e: '📲' }, { es: 'pasaporte', kr: '여권', e: '🛂' }
    ],

    examBank: [
      { p: '¿Qué estás ____? <i>(leer)</i>', a: ['leyendo'], s: 'ger' },
      { p: 'Alberto está ____ al banco. <i>(ir)</i>', a: ['yendo'], s: 'ger' },
      { p: 'El bebé está ____. <i>(dormir)</i>', a: ['durmiendo'], s: 'ger' },
      { p: 'Ella está ____ un café. <i>(pedir)</i>', a: ['pidiendo'], s: 'ger' },
      { p: '¿Me estás ____ la verdad? <i>(decir)</i>', a: ['diciendo'], s: 'ger' },
      { p: 'No te estoy ____ bien. <i>(oír)</i>', a: ['oyendo'], s: 'ger' },
      { p: 'Nosotros ____ estudiando en la clase. <i>(estar)</i>', a: ['estamos'], s: 'ger' },
      { p: 'Vosotros ____ jugando en la piscina. <i>(estar)</i>', a: ['estáis'], s: 'ger' },
      { p: 'En el norte del país sigue ____. <i>(llover)</i>', a: ['lloviendo'], s: 'ger' },
      { p: 'Quiero estudiar la historia. → Quiero ____.', a: ['estudiarla'], s: 'pro' },
      { p: 'Me estoy lavando la cara. = Estoy ____ la cara.', a: ['lavándome'], s: 'pro' },
      { p: 'Quiero vender la casa a mi novio. → Quiero ____ la casa.', a: ['venderle'], s: 'pro' },
      { p: 'Está ofreciendo una cena a mis padres. → ____ está ofreciendo una cena.', a: ['les'], s: 'pro' },
      { p: 'Yo ____ ocho horas. <i>(dormir)</i>', a: ['duermo'], s: 'oue' },
      { p: 'Lo siento, no ____. <i>(poder, yo)</i>', a: ['puedo'], s: 'oue' },
      { p: '¿Dónde ____ (tú) las llaves? <i>(encontrar)</i>', a: ['encuentras'], s: 'oue' },
      { p: 'Nosotros ____ ir mañana. <i>(poder)</i>', a: ['podemos'], s: 'oue' },
      { p: '¿Cuánto ____ este libro? <i>(costar)</i>', a: ['cuesta'], s: 'oue' },
      { p: 'Mis padres ____ a casa a las siete. <i>(volver)</i>', a: ['vuelven'], s: 'oue' },
      { p: '¿No te ____ de mí? <i>(acordarse)</i>', a: ['acuerdas'], s: 'oue' }
    ]
  };

  const B = {};
  const GER = W0 + '(estoy|est[aá]s|est[aá]|estamos|est[aá]is|est[aá]n) ([a-záéíóúñ]+ )?[a-záéíóúñ]+(ando|iendo|yendo)(me|te|se|le|lo|la|nos|os|les|los|las)?' + W1;

  /* ---------- Diálogo 1 ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'En una playa')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🏖️ 지금 무엇을 하고 있나요? — estar + 현재분사</h3><div class="items two w"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo1, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo1) }));
    [['😎 Sergio · tomar el sol', 'Sergio está tomando el sol.'], ['🏊 Eva · bañarse en el mar', 'Eva está bañándose en el mar.', 'Eva se está bañando en el mar.'],
      ['🍺 Ellos · tomar algo en un bar', 'Ellos están tomando algo en un bar.', 'Están tomando algo en un bar.']]
      .forEach(([p, ...a], i) => put(s, '.w', writeItem({ id: 'd1w' + i, sec: 'd1', skill: 'ger', prompt: p, answers: a })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    [1, 2, 3, 5, 6, 9, 11, 12, 13, 14, 15, 16].forEach((k, i) => { const v = D.voc1[k]; put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: k === 16 ? ['¡Cuanto más, mejor!', 'Cuanto más, mejor'] : [v.es] })); });
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Qué quiere tomar Eva?', kw: [['cerveza', 'una cerveza (bien fría)']], model: 'Quiere tomar una cerveza bien fría.' },
      { q: '¿Qué está haciendo Sergio?', kw: [['est[aá] tomando', 'está tomando (진행형)'], ['sol', 'el sol']], model: 'Está tomando el sol.' },
      { q: '¿Cuántas personas van a reunirse?', kw: [['tres|3', 'tres']], model: 'Van a reunirse tres personas: Eva, Sergio y una amiga de Eva.' },
      { q: '¿Dónde están Eva y Sergio?', kw: [['playa', 'en una playa']], model: 'Están en una playa.' },
      { q: '¿Qué tiempo hace?', kw: [['hace', 'Hace …'], ['buen tiempo', 'buen tiempo']], model: 'Hace muy buen tiempo.' }
    ] }));
  };

  /* ---------- Diálogo 2 ---------- */
  B.d2 = () => {
    const s = sec('d2', `${dlgHead(2, 'En la calle de la Española')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기</h3><div class="c"></div>
      <h3 class="h3">📅 약속 정리 — 알베르토와 엠마의 약속 카드를 완성하세요</h3>
      <div class="citabox"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d2', D.dialogo2));
    put(s, '.c', cloze({ id: 'd2c', sec: 'd2', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo2) }));
    put(s, '.citabox', cloze({ id: 'd2cita', sec: 'd2', skill: 'com', cls: 'caltab', text:
      '<table class="gtab"><tr><th>🗓️ ¿Cuándo?</th><td>el próximo [sábado]</td></tr><tr><th>⏰ ¿A qué hora?</th><td>a las [ocho|8]</td></tr><tr><th>📍 ¿Dónde?</th><td>en la [entrada] de la estación de [Atocha]</td></tr><tr><th>🚫 ¿Por qué no este fin de semana?</th><td>Emma tiene una [cita] con el doctor.</td></tr></table>' }));
    ['Estoy yendo al banco.', '¿No te acuerdas de mí?', '¿A qué hora y dónde quedamos?']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd2s' + i, sec: 'd2', skill: 'ger', target: t })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.map(v => [v.es, v.kr]) }));
    D.voc2.forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿A qué se dedica Alberto?', kw: [['trabaja', 'trabaja'], ['empresa', 'en una empresa (internacional)']], model: 'Trabaja en una empresa internacional.' },
      { q: '¿Adónde van Alberto y Emma?', kw: [['banco', 'al banco']], model: 'Van al banco.' },
      { q: '¿Por qué no quedan este fin de semana?', kw: [['porque', 'Porque …'], ['cita', 'una cita con el doctor']], model: 'Porque Emma tiene una cita con el doctor.' },
      { q: '¿Dónde van a quedar ellos?', kw: [['entrada|estaci[oó]n|atocha', 'en la entrada de la estación de Atocha']], model: 'Van a quedar en la entrada de la estación de Atocha.' },
      { q: '¿Con quién tiene la cita Emma?', kw: [['doctor|m[eé]dico', 'con el doctor']], model: 'Tiene la cita con el doctor.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 약속 잡기 — 어디에서 만날까?</h3>${modelo('¿Dónde quedamos? — Quedamos en la <b>salida</b> del <b>aeropuerto</b> a las tres.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 3 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'lib', rows: 3, prompt: '친구와 약속을 정하는 문장을 2문장 쓰세요. (장소 단어 1개 이상)', ph: 'Quedamos en …',
      must: [{ re: 'quedamos|quedar|nos vemos|cita', label: 'quedamos / nos vemos' }, { re: D.amplia.map(a => SC.rx(a.es)).join('|') + '|estaci[oó]n|entrada', label: '장소 단어' }, { re: 'a las? (\\d+|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)', label: '시각 (a las …)' }],
      model: 'Este sábado vamos a ver una exposición. Quedamos en la plaza, delante del monumento, a las cinco.' }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 현재분사 (Gerundio)</h3>
        <h4>(1) 규칙 변화형</h4>
        <table class="gtab"><tr><th>구분</th><th>어미</th><th colspan="3">예</th></tr>
          <tr><td>-ar형 동사</td><td class="hi">-ando</td><td>cantar</td><td>→</td><td>cant<b class="hi">ando</b></td></tr>
          <tr><td>-er형 동사</td><td class="hi" rowspan="2">-iendo</td><td>beber</td><td>→</td><td>beb<b class="hi">iendo</b></td></tr>
          <tr><td>-ir형 동사</td><td>partir</td><td>→</td><td>part<b class="hi">iendo</b></td></tr></table>
        <h4>(2) 불규칙 변화형</h4>
        <table class="gtab"><tr><th>e → i</th><th>o → u</th><th>-y-</th></tr>
          <tr><td>pedir → p<b class="hi">i</b>diendo</td><td>dormir → d<b class="hi">u</b>rmiendo</td><td>leer → le<b class="hi">y</b>endo</td></tr>
          <tr><td>decir → d<b class="hi">i</b>ciendo</td><td>morir → m<b class="hi">u</b>riendo</td><td>oír → o<b class="hi">y</b>endo</td></tr>
          <tr><td>servir → s<b class="hi">i</b>rviendo</td><td>poder → p<b class="hi">u</b>diendo</td><td>ir → <b class="hi">y</b>endo</td></tr></table>
        <table class="gtab">
          <tr><th>(3) 현재진행형<br>estar + 현재분사</th><td class="l">A: ¿Qué estás leyendo? ${say('¿Qué estás leyendo?')} 너는 뭘 읽고 있는 중이니?<br>B: Estoy leyendo el libro de Mario Vargas Llosa. ${say('Estoy leyendo el libro de Mario Vargas Llosa.')}</td></tr>
          <tr><th>(4) 동시동작</th><td class="l">Los jóvenes siempre caminan escuchando música. ${say('Los jóvenes siempre caminan escuchando música.')} 젊은이들은 언제나 음악을 들으며 걸어간다.</td></tr>
          <tr><th>(5) 계속<br>seguir / continuar + 현재분사</th><td class="l">En el norte del país sigue lloviendo. ${say('En el norte del país sigue lloviendo.')} 이 나라의 북쪽에는 비가 계속 내리고 있어요.</td></tr></table>
        <div class="blocks"><span class="bk p">estoy / estás / está …</span><span class="bk v">-ando / -iendo</span><span class="small">~하고 있는 중이다</span></div>
        <div class="g1a"></div><div class="g1b"></div></div>
      <div class="gcard"><h3>2. 목적대명사와 재귀대명사의 위치</h3>
        <table class="gtab"><tr><th>간접목적대명사(~에게)</th><th>직접목적대명사(~을, 를)</th><th>재귀대명사</th></tr>
          ${[['me', 'me', 'me'], ['te', 'te', 'te'], ['le/se', 'lo/la', 'se'], ['nos', 'nos', 'nos'], ['os', 'os', 'os'], ['les/se', 'los/las', 'se']].map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>
        <p class="small">목적대명사와 재귀대명사는 동사원형, 현재분사와 쓰일 경우 앞 뒤에 위치할 수 있다. 그러나 긍정명령형과 쓰일 때는 그 뒤에만 붙여 쓸 수 있다. 이때 강세의 위치가 변할 경우 동사의 원래 위치에 강세 부호를 찍어 준다.</p>
        <table class="gtab">
          <tr><th>긍정명령</th><td class="l">¿Dígame? ${say('¿Dígame?')} 여보세요.</td></tr>
          <tr><th>동사원형</th><td class="l">Quiero estudiar la historia española. ⇒ <b>Quiero estudiarla.</b> ⇒ <b>La quiero estudiar.</b></td></tr>
          <tr><th>현재분사</th><td class="l"><b>Estoy lavándome la cara.</b> (= Me estoy lavando la cara.) ${say('Estoy lavándome la cara.')} 나는 세수를 하고 있다.</td></tr></table>
        <div class="blocks"><span class="bk o">La</span><span class="bk v">quiero estudiar</span><span class="small">=</span><span class="bk v">Quiero estudiar</span><span class="bk o">la</span></div>
        ${tip('현재분사 뒤에 대명사를 붙이면 강세 부호! lav<b>a</b>ndo + me → lav<b>á</b>ndome · ofreci<b>e</b>ndo + les → ofreci<b>é</b>ndoles. 동사원형은 붙여도 부호 없음: estudiarla.')}
        <div class="items g2"></div></div>
      <div class="gcard"><h3>3. 불규칙동사: 어간모음 o → ue</h3>
        <table class="gtab"><tr><th></th><th>encontrar</th><th>poder</th><th>dormir</th></tr>
          ${[['1인칭 단수', 'encuentro', 'puedo', 'duermo', 1], ['2인칭 단수', 'encuentras', 'puedes', 'duermes', 1], ['3인칭 단수', 'encuentra', 'puede', 'duerme', 1], ['1인칭 복수', 'encontramos', 'podemos', 'dormimos', 0], ['2인칭 복수', 'encontráis', 'podéis', 'dormís', 0], ['3인칭 복수', 'encuentran', 'pueden', 'duermen', 1]]
            .map(([p, a, b, c, h]) => `<tr><td>${p}</td><td class="${h ? 'hi' : ''}">${a}</td><td class="${h ? 'hi' : ''}">${b}</td><td class="${h ? 'hi' : ''}">${c}</td></tr>`).join('')}
          <tr><th>같은 형태로 변화하는 동사</th><td>almorzar, costar, acordar, contar</td><td>llover, mover, poder, volver</td><td>morir</td></tr></table>
        ${tip('부츠 모양 👢: nosotros · vosotros 만 o 그대로 (podemos, dormís). llover 는 3인칭 단수만: <b>llueve</b>.')}
        <div class="g3"></div></div>`);
    put(s, '.g1a', cloze({ id: 'g1a', sec: 'gram', skill: 'ger', title: '현재분사를 쓰세요.', cls: 'table2', text:
      [['cantar', 'cantando'], ['beber', 'bebiendo'], ['partir', 'partiendo'], ['pedir', 'pidiendo'], ['dormir', 'durmiendo'], ['leer', 'leyendo'], ['oír', 'oyendo'], ['ir', 'yendo']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    put(s, '.g1b', cloze({ id: 'g1b', sec: 'gram', skill: 'ger', title: 'estar + 현재분사로 완성하세요.', cls: 'lines', text:
      ['📖 A: ¿Qué [estás] leyendo? — B: [Estoy] leyendo un libro.', '🎧 Los jóvenes caminan [escuchando] música. <i>(escuchar)</i>', '🌧️ En el norte sigue [lloviendo]. <i>(llover)</i>', '😴 Mi hermano está [durmiendo]. <i>(dormir)</i>'].map(x => `<p>${x}</p>`).join('') }));
    [['Quiero estudiar <u>la historia española</u>. → 대명사를 뒤에 붙여서', ['Quiero estudiarla.']], ['Quiero estudiar <u>la historia española</u>. → 대명사를 앞에', ['La quiero estudiar.']],
      ['Me estoy lavando la cara. → 대명사를 뒤에 붙여서', ['Estoy lavándome la cara.']], ['Estoy leyendo <u>el periódico</u>. → lo 를 붙여서', ['Estoy leyéndolo.', 'Lo estoy leyendo.']]]
      .forEach(([p, a], i) => put(s, '.g2', writeItem({ id: 'g2-' + i, sec: 'gram', skill: 'pro', prompt: p, answers: a })));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'oue', title: 'poder 변화표를 완성하세요. (부츠 모양!)', cls: 'boot', text:
      [['yo', 'puedo', 1], ['tú', 'puedes', 1], ['él / ella / Ud.', 'puede', 1], ['nosotros/as', 'podemos', 0], ['vosotros/as', 'podéis', 0], ['ellos / ellas / Uds.', 'pueden', 1]]
        .map(([p, f, b]) => `<p class="${b ? 'in' : 'out'}"><span>${p}</span>[${f}]</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '주어진 동사의 현재분사형을 써보세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1c', sec: 'e1', skill: 'ger', cls: 'table2', text:
      [['1. Hablar', 'hablando'], ['2. Estudiar', 'estudiando'], ['3. Jugar', 'jugando'], ['4. Comenzar', 'comenzando'], ['5. Sentir', 'sintiendo'], ['6. Sentar', 'sentando'], ['7. Creer', 'creyendo'], ['8. Huir', 'huyendo'], ['9. Escribir', 'escribiendo'], ['10. Vender', 'vendiendo']]
        .map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '주어진 동사를 현재진행형으로 바꾸세요.')}<div class="items"></div>`);
    [['Me caso con ella.', 'Estoy casándome con ella.', 'Me estoy casando con ella.'], ['Lee el periódico.', 'Está leyendo el periódico.'],
      ['Hablamos por teléfono de la tarea.', 'Estamos hablando por teléfono de la tarea.'], ['Escriben un libro.', 'Están escribiendo un libro.'],
      ['Los alumnos juegan al fútbol.', 'Los alumnos están jugando al fútbol.']]
      .forEach(([p, ...a], i) => put(s, '.items', writeItem({ id: 'e2-' + i, sec: 'e2', skill: 'ger', prompt: `${i + 1}. ${p} ${say(p)}`, ph: '→', answers: a })));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '밑줄 친 간접목적어를 간접목적대명사의 형태로 바꾸시오.')}
      ${modelo('Quiero dar una carta <u>a mi novia</u>.<br>→ Quiero <b>darle</b> una carta.', '보기')}<div class="items"></div>`);
    [['Quiero vender la casa <u>a mi novio</u>.', 'Quiero venderle la casa.', 'Le quiero vender la casa.'], ['No quiere regalar nada <u>a Susana</u>.', 'No quiere regalarle nada.', 'No le quiere regalar nada.'],
      ['Está ofreciendo una cena <u>a mis padres</u>.', 'Está ofreciéndoles una cena.', 'Les está ofreciendo una cena.'], ['Necesito devolver el dinero <u>a mi amigo</u>.', 'Necesito devolverle el dinero.', 'Le necesito devolver el dinero.'],
      ['Estoy mandando un libro <u>a la profesora</u>.', 'Estoy mandándole un libro.', 'Le estoy mandando un libro.']]
      .forEach(([p, ...a], i) => put(s, '.items', writeItem({ id: 'e3-' + i, sec: 'e3', skill: 'pro', prompt: `${i + 1}. ${p}`, ph: '→', answers: a })));
  };
  B.e4 = () => {
    const s = sec('e4', `${ejHead(4, '동사의 불규칙 변화 형태가 같은 것끼리 분류하시오.', { kr: '동사를 누른 뒤 알맞은 칸을 누르세요.' })}<div class="sb"></div>
      <h3 class="h3">✍️ yo 형으로 써 보세요</h3><div class="c"></div>`);
    put(s, '.sb', sortBoard({ id: 'e4sb', sec: 'e4', skill: 'oue', cols: [{ k: 'ie', label: '어간모음 e ⇒ ie' }, { k: 'ue', label: '어간모음 o ⇒ ue' }, { k: 'i', label: '어간모음 e ⇒ i' }],
      chips: [['morir', 'ue'], ['entender', 'ie'], ['querer', 'ie'], ['encender', 'ie'], ['seguir', 'i'], ['servir', 'i'], ['contar', 'ue'], ['llover', 'ue'], ['mover', 'ue'], ['poder', 'ue']] }));
    put(s, '.c', cloze({ id: 'e4c', sec: 'e4', skill: 'oue', cls: 'table2', text:
      [['entender', 'entiendo'], ['querer', 'quiero'], ['contar', 'cuento'], ['mover', 'muevo'], ['seguir', 'sigo'], ['servir', 'sirvo']].map(([a, b]) => `<p><span>${a}</span> → yo [${b}]</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const P = [['🚌🧒', '버스에 타는 아이들', 'Los niños están subiendo al autobús.', 'autob[uú]s|bus', '(subiendo|esperando|tomando|cogiendo)'],
      ['👶💤', '자고 있는 아기', 'El bebé está durmiendo.', 'beb[eé]|ni[nñ][oa]', 'durmiendo'],
      ['👧📖', '책 읽는 소녀', 'La niña está leyendo un libro.', 'libro|leyendo', 'leyendo'],
      ['⚽🏃', '축구하는 아이들', 'Los chicos están jugando al fútbol.', 'f[uú]tbol', 'jugando'],
      ['🛋️📺', '소파에서 TV를 보는 커플', 'Están viendo la televisión en el sofá.', 'tele|televisi[oó]n|pel[ií]cula', 'viendo|mirando'],
      ['👩🧃', '주스를 마시는 여자', 'Ella está bebiendo zumo de naranja.', 'zumo|jugo|naranja', 'bebiendo|tomando']];
    const s = sec('ac1', `${acHead(1, '사진을 보고 현재진행형 문장을 만들어 보세요.')}
      ${tip('estar + 현재분사. 주어에 맞게 estar 를 바꾸세요: el bebé <b>está</b> … / los niños <b>están</b> …')}<div class="items two"></div>`);
    P.forEach(([e, k, md, obj, g], i) => put(s, '.items', freeItem({ id: 'ac1-' + i, sec: 'ac1', skill: 'ger', line: true, prompt: `<span class="photo-emo">${e}</span> <span class="small">${k}</span>`, ph: '… está / están …ando',
      must: [{ re: GER, label: 'estar + 현재분사' }, { re: g, label: '알맞은 동작 (' + g.split('|')[0] + ' …)' }], model: md })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '사진과 관련된 문장을 연결하고 스페인어로 말하세요.')}<div class="pm"></div>
      <h3 class="h3">🗣️ 말하기 → 쓰기: 주어를 바꿔 다시 쓰세요</h3><div class="items w"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac2pm', sec: 'ac2', skill: 'ger', pairs: [
      ['⛪👴👶 <small>교황이 아이에게 입 맞추는 사진</small>', 'El papa Francisco está besando a un niño.'], ['🏊‍♂️💦 <small>수영장에서 뛰어드는 아이들</small>', 'Estáis jugando en la piscina.'],
      ['💃🕺 <small>탱고를 추는 커플</small>', 'Estoy bailando tango con mi novia.'], ['🎧🎻 <small>헤드폰을 낀 여자</small>', 'Está escuchando música clásica.'], ['🏫✏️ <small>교실의 학생들</small>', 'Estamos estudiando en la clase.']] }));
    [['Estáis jugando en la piscina. → nosotros', 'Estamos jugando en la piscina.'], ['Estoy bailando tango con mi novia. → él', 'Está bailando tango con su novia.', 'Él está bailando tango con su novia.'],
      ['Está escuchando música clásica. → yo', 'Estoy escuchando música clásica.'], ['Estamos estudiando en la clase. → ellos', 'Están estudiando en la clase.', 'Ellos están estudiando en la clase.']]
      .forEach(([p, ...a], i) => put(s, '.w', writeItem({ id: 'ac2w' + i, sec: 'ac2', skill: 'ger', prompt: p, answers: a })));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '주어진 표현들을 이용하여 초대장을 써보세요.')}
      <div class="ybox wordbank">표현 상자: <span>¿Quiere venir a casa a cenar?</span><span>Gracias por su invitación.</span><span>Vale.</span><span>De acuerdo.</span><span>Me gustaría ir pero…</span><span>Lo siento, no puedo porque…</span></div>
      ${modelo('Querida Ana: El sábado es mi cumpleaños. ¿Quieres venir a casa a cenar? Vamos a cenar a las ocho. …<br>— Gracias por tu invitación. Me gustaría ir, pero …', '보기')}
      <h3 class="h3">① 초대장 쓰기 ✉️</h3><div class="f1"></div>
      <h3 class="h3">② 답장 쓰기 — 수락 또는 거절</h3><div class="f2"></div>`);
    put(s, '.f1', freeItem({ id: 'ac3-1', sec: 'ac3', skill: 'lib', rows: 5, prompt: '친구를 저녁 식사에 초대하는 초대장을 쓰세요. (날짜 · 시각 · 장소 포함)', ph: 'Querido/a …: ¿Quieres venir a casa a cenar?',
      must: [{ re: '¿?\\s*quier(e|es|en) venir', label: '¿Quiere(s) venir …?' }, { re: 'cenar|cena|fiesta|comer', label: '무엇을 하는지 (cenar …)' }, { re: 'a las? (\\d+|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)', label: '시각 (a las …)' }, { re: 'lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo|fin de semana|ma[nñ]ana', label: '요일 · 날짜' }],
      minWords: 25, model: 'Querida Emma: El próximo sábado es mi cumpleaños. ¿Quieres venir a casa a cenar? Vamos a cenar a las ocho de la tarde. Mi casa está cerca de la estación de Atocha. ¡Cuanto más, mejor! Puedes venir con tu hermana. Un abrazo, Alberto.' }));
    put(s, '.f2', freeItem({ id: 'ac3-2', sec: 'ac3', skill: 'lib', rows: 4, prompt: '초대장에 답장하세요. 감사 인사 + 수락(Vale / De acuerdo) 또는 거절(Lo siento, no puedo porque …)', ph: 'Gracias por tu invitación. …',
      must: [{ re: 'gracias por (su|tu) invitaci[oó]n', label: 'Gracias por su/tu invitación' }, { re: 'vale|de acuerdo|me gustar[ií]a|lo siento|no puedo', label: '수락 / 거절 표현' }],
      model: 'Gracias por tu invitación. Me gustaría ir, pero lo siento, no puedo porque tengo una cita con el doctor. ¿Quedamos el domingo?' }));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('El Carnaval del Toro', [
      { e: '🐂🎭', h: '스페인의 축제와 투우', t: '스페인에서는 일년 내내 축제가 열린다고 할 정도로 많은 축제가 열리고 있다. 투우 역시 스페인 전역에서 다양한 형태로 열리는데, <b>Salamanca</b>주의 <b>Ciudad Rodrigo</b>시에서 열리는 투우는 스페인에서 가장 오래된 축제 중 하나이다.' },
      { e: '🥩🚫', h: 'Carnaval의 어원', t: 'Carnaval의 어원은 고대 이탈리아어 <b>carnelevare</b>로 거슬러 올라가는데 Carne는 \'고기\'를, levare는 \'제거하다\'를 뜻한다.' },
      { e: '✝️📆', h: '사순절과 Carnaval', t: '사순절은 재의 수요일에 시작해 부활절 전까지 6주간 계속되며 일요일을 제외한 40일을 금식 기간으로 정하고 있다. 이 금식 기간이 시작되기 전에 즐기는 축제를 Carnaval이라고 부른다. Ciudad Rodrigo의 Carnaval이 그 의미 그대로 금식 기간에 실시되는 투우이다.' },
      { e: '🐎🐃', h: '축제의 백미', t: '가면과 여러 가지 복장으로 변장한 사람들이 말을 타고 도시 외곽에서 소를 몰고 시내로 들어오는 소몰이 행사와, 몰고 온 소들로 <b>Plaza Mayor</b>에서 하는 투우이다.' }
    ], '살라망카의 Ciudad Rodrigo 에서 열리는 「소의 카니발」') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['El Carnaval del Toro 가 열리는 도시는?', ['Ciudad Rodrigo', 'Pamplona', 'Sevilla', 'Valencia'], 'Ciudad Rodrigo', 'Salamanca 주에 있어요.'],
      ['carne levare 의 뜻은?', ['고기를 제거하다', '소를 몰다', '불타는 물', '가면을 쓰다'], '고기를 제거하다', 'carne = 고기, levare = 제거하다'],
      ['사순절 금식 기간은 며칠?', ['40일', '7일', '30일', '100일'], '40일', '일요일을 제외한 40일'],
      ['투우가 열리는 장소는?', ['Plaza Mayor', 'Puerta del Sol', 'la estación de Atocha', 'el aeropuerto'], 'Plaza Mayor', '도시의 중앙 광장']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
  };

  SC.lesson({
    num: '08',
    title: 'Estoy yendo al banco',
    ttsTest: 'Estoy yendo al banco.',
    cover: {
      emoji: '🏦🚶<small>📖 🏖️</small>',
      bg: 'linear-gradient(135deg,#7dd3fc,#38bdf8 55%,#0369a1)',
      tema: ['Actividades en curso', 'Quedar con amigos', 'Invitaciones'],
      com: ['현재분사와 현재진행형: ¿Qué estás leyendo? · Estoy leyendo un libro de Mario Vargas Llosa.', '간접 · 직접목적대명사의 위치: Quiero estudiarla. · Estoy lavándome la cara.', '약속 정하기: ¿A qué hora y dónde quedamos?'],
      gram: ['현재분사 (-ando / -iendo / -yendo)', 'estar · seguir + 현재분사', '목적대명사 · 재귀대명사의 위치', '불규칙동사 o → ue: encontrar, poder, dormir']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Sergio: { g: 'm', av: '👴🏻', side: 'l' }, Eva: { g: 'f', av: '👵🏻', side: 'r' },
      Alberto: { g: 'm', av: '🧔🏽', side: 'l' }, Emma: { g: 'f', av: '👱🏼‍♀️', side: 'r' }
    },
    errLabels: { gerundio: '현재분사 형태', conjugacion: '동사 변화 (estar · o→ue)', pronombre: '대명사 위치 · 형태' },
    errTips: {
      acento: '대명사를 붙인 현재분사에는 강세 부호: lavándome, ofreciéndoles, mandándole. estás, está, estáis, podéis …',
      gerundio: '-ar → -ando, -er/-ir → -iendo · 모음 뒤 -yendo (leyendo, oyendo, yendo) · e→i (pidiendo, diciendo) · o→u (durmiendo, muriendo)',
      conjugacion: 'estar: estoy, estás, está, estamos, estáis, están / poder: puedo, puedes, puede, podemos, podéis, pueden',
      pronombre: '대명사는 활용된 동사 앞 또는 동사원형 · 현재분사 뒤에 붙여요: Le quiero vender = Quiero venderle'
    },
    classify(ti, ta) {
      const gi = ti.find(w => /(ando|iendo|yendo)/.test(w)), ga = ta.find(w => /(ando|iendo|yendo)/.test(w));
      if (ga && gi !== ga && gi && gi.replace(/(me|te|se|le|lo|la|les|los|las|nos|os)$/, '') !== ga.replace(/(me|te|se|le|lo|la|les|los|las|nos|os)$/, '')) return 'gerundio';
      const P = ['me', 'te', 'le', 'les', 'lo', 'la', 'los', 'las', 'nos', 'os', 'se'];
      if (ti.filter(w => P.includes(w)).join() !== ta.filter(w => P.includes(w)).join() && !(gi && ga)) return 'pronombre';
      const E = /^(estoy|est[aá]s|est[aá]|estamos|est[aá]is|est[aá]n|puedo|puedes|puede|podemos|pod[eé]is|pueden|duerm|dorm|encuentr|encontr)$/;
      const vi = ti.find(w => E.test(w)), va = ta.find(w => E.test(w));
      if (va && vi && vi !== va) return 'conjugacion';
      return null;
    },
    errRules: [
      { re: W0 + '(leiendo|leendo|oiendo|oendo|iendo|creiendo|huiendo|traiendo|caiendo)' + W1, t: 'gerundio', msg: '모음 뒤 -yendo: leyendo · oyendo · yendo · creyendo' },
      { re: W0 + '(dormiendo|moriendo|pediendo|deciendo|sentiendo|repetiendo|vestiendo)' + W1, t: 'gerundio', msg: '불규칙: durmiendo · muriendo · pidiendo · diciendo · sintiendo' },
      { re: W0 + '(hablendo|estudiendo|jugendo|cantiendo|bebando|escribando|viviando)' + W1, t: 'gerundio', msg: '-ar → -ando, -er/-ir → -iendo' },
      { re: W0 + '[a-zñ]+ando(me|te|se|le|lo|la|nos|os|les|los|las)' + W1, t: 'acento', msg: '대명사를 붙이면 -ándo- (lavándome)' },
      { re: W0 + '[a-zñ]+(iendo|yendo)(me|te|se|le|lo|la|nos|os|les|los|las)' + W1, t: 'acento', msg: '대명사를 붙이면 -iéndo- / -yéndo-' },
      { re: W0 + '(podo|poedo|podes|pode|poden|dormo|dormes|dorme|dormen|encontro|encontras|encontra|encontran|volvo)' + W1, t: 'conjugacion', msg: 'o→ue: puedo · duermo · encuentro · cuesta · vuelvo' },
      { re: W0 + '(yo|t[uú]) (est[aá]|estamos|est[aá]n) [a-z]+(ando|iendo)' + W1, t: 'conjugacion', msg: 'yo → estoy, tú → estás' }
    ],
    accWords: ['estáis', 'están', 'podéis', 'encontráis', 'dormís', 'periódico', 'teléfono', 'fútbol', 'estación', 'exposición', 'también', 'música', 'clásica', 'después', 'mía', 'fría', 'jóvenes', 'país', 'casándome', 'lavándome', 'ofreciéndoles', 'mandándole', 'invitación', 'sábado'],
    exam: {
      bank: D.examBank,
      partB: {
        title: '¿Qué está pasando ahora? → 글로 쓰기',
        icons: ['📱', '👨‍👩‍👧', '📅'],
        questions: ['Ahora mismo, ¿qué estás haciendo tú? ¿Y tu familia o tus amigos? (estar + 현재분사)', '¿Qué haces normalmente los fines de semana? ¿Puedes dormir mucho? (o → ue 동사)', 'Invita a un amigo a hacer algo: ¿dónde y a qué hora quedáis? (대명사: invitarlo, verte …)'],
        minWords: 50,
        hint: '현재진행형 3번 이상 · o→ue 동사 · 대명사를 동사 뒤에 붙인 형태를 쓰면 높은 점수!',
        ph: 'Ahora mismo estoy escribiendo en clase. Mi madre está …',
        connectors: ['y', 'pero', 'porque', 'como', 'también', 'además', 'entonces', 'mientras', 'cuando'],
        rubric: [
          { k: 'act', label: '지금 하는 일 · 사람들', max: 6, re: 'ahora|ahora mismo|en este momento|mi (madre|padre|hermano|hermana|amigo|amiga)|mis (padres|amigos)', ax: 'Contenido' },
          { k: 'cit', label: '약속 (quedar · a las … · en …)', max: 8, re: 'quedamos|qued[aá]is|quedar|cita|a las? (\\d+|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)', ax: 'Contenido' },
          { k: 'ger', label: 'estar + 현재분사 (3번 이상)', max: 16, re: '(estoy|est[aá]s|est[aá]|estamos|est[aá]is|est[aá]n) [a-záéíóúñ]+(ando|iendo|yendo)', min: 3, ax: 'Gramática' },
          { k: 'oue', label: 'o → ue 동사 (puedo, duermo …)', max: 8, re: '(puedo|puedes|puede|pueden|duermo|duermes|duerme|duermen|encuentro|encuentra|vuelvo|vuelve|cuesta|almuerzo|llueve|me acuerdo|recuerdo)', ax: 'Gramática' },
          { k: 'pro', label: '동사 뒤에 붙인 대명사 (verte, invitarlo …)', max: 8, re: '[a-záéíóúñ]+(ar|er|ir|ando|ándo|iendo|iéndo)(me|te|se|le|lo|la|nos|os|les|los|las)', ax: 'Gramática' }
        ],
        model: 'Ahora mismo estoy escribiendo en clase y mis compañeros están estudiando. Mi madre está trabajando en la oficina y mi hermano pequeño está durmiendo en casa. Los fines de semana normalmente duermo mucho y luego juego al fútbol. Este sábado quiero invitarte al cine. ¿Puedes venir? Quedamos a las cinco en la entrada de la estación. ¡Tengo muchas ganas de verte!'
      }
    },
    build: B
  });
})();
