/* Lección 01 · ¡Hola! — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 11~24쪽 : Diálogo → Vocabulario·Contesta → Lectura → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~2) → Actividades 1~2 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      sal: 'Saludos 인사말',
      pre: 'Presente 현재형 규칙동사',
      pro: 'Pronombres 주격 인칭대명사',
      gen: 'Género 명사의 성',
      num: 'Número · Artículos 수 · 관사',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '친구들의 모임에서', group: 'Diálogo · Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'lect', label: 'Lectura', kr: '소희의 자기소개', group: 'Diálogo · Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo · Lectura' },
      { id: 'gram', label: 'Gramática', kr: '인칭대명사 · 현재형 · 명사의 성·수 · 관사', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '현재형 규칙동사 활용', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '명사의 복수형', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'ac1', label: 'Actividades 1', kr: '인사말로 대화하기', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '그림 보고 동사 활용', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'cultura', label: 'Cultura', kr: '도미니카 공화국과 아이티', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Carlos', es: '¡Hola! [Soy] Carlos.' },
      { who: 'María', es: '¡Hola! [Encantada]. [Me llamo] María. ¿Qué tal?' },
      { who: 'Carlos', es: 'Encantado, María. ¿De [dónde] eres?' },
      { who: 'María', es: 'Soy [española]. Soy de Salamanca. Y tú, ¿de dónde eres?' },
      { who: 'Carlos', es: 'Soy [mexicano]. ¿Eres [estudiante] o trabajas?' },
      { who: 'María', es: 'Soy estudiante. [Estudio] Física en la [universidad]. ¿Y tú?' },
      { who: 'Carlos', es: 'Yo trabajo. [Trabajo] en un [banco].' }
    ],
    lectura: ['¡Hola! Me llamo Sohi. Soy de Corea y estudio español. Vivo en Seúl. Ahora estudio mucho español en la escuela. También estudio inglés. No hablo bien español, pero hablo bien inglés. Preparo la clase de español en casa. En clase, el profesor solo habla en español. Es muy inteligente, pero es muy amable también. Deseo hablar bien en español con el profesor.'],

    voc1: [
      { es: 'reunión', kr: '모임', e: '🍽️' }, { es: 'soy', kr: '나는 …이다', e: '🙋' }, { es: 'me llamo', kr: '내 이름은 …이다', e: '📛' },
      { es: 'encantado', kr: '만나서 반가워', e: '🤝' }, { es: 'española', kr: '스페인 사람(여자)', e: '🇪🇸' }, { es: 'trabajar', kr: '일하다', e: '💼' },
      { es: 'mexicano', kr: '멕시코 사람(남)', e: '🇲🇽' }, { es: 'estudiante', kr: '학생', e: '🎒' }, { es: 'física', kr: '물리학', e: '⚛️' },
      { es: 'universidad', kr: '대학교', e: '🎓' }, { es: 'banco', kr: '은행', e: '🏦' }
    ],
    voc2: [
      { es: 'estudiar', kr: '공부하다', e: '📖' }, { es: 'ahora', kr: '지금, 현재', e: '⏰' }, { es: 'también', kr: '역시', e: '➕' },
      { es: 'preparar', kr: '준비하다', e: '📝' }, { es: 'profesor', kr: '교사, 교수', e: '👨‍🏫' }, { es: 'muy', kr: '매우', e: '💯' },
      { es: 'amable', kr: '친절한', e: '😊' }, { es: 'vivir', kr: '살다', e: '🏠' }, { es: 'escuela', kr: '학교', e: '🏫' },
      { es: 'inglés', kr: '영어', e: '🇬🇧' }, { es: 'clase', kr: '수업', e: '🧑‍🏫' }, { es: 'solo', kr: '오직, 단지', e: '☝️' },
      { es: 'inteligente', kr: '영리한, 지적인', e: '🧠' }, { es: 'desear', kr: '~하기를 희망하다 (+동사원형)', e: '🌠' }
    ],
    amplia: [
      { es: 'paquete', kr: '소포', e: '📦' }, { es: 'ascensor', kr: '엘리베이터', e: '🛗' }, { es: 'carta', kr: '편지', e: '✉️' },
      { es: 'limpiar', kr: '청소하다', e: '🧹' }, { es: 'correr', kr: '뛰다, 달리다', e: '🏃' }, { es: 'bajar', kr: '내려가다', e: '⬇️' },
      { es: 'arreglar', kr: '수리하다', e: '🔧' }, { es: 'árbol', kr: '나무', e: '🌳' }, { es: 'parque', kr: '공원', e: '🏞️' },
      { es: 'gafas', kr: '안경', e: '👓' }, { es: 'puerta', kr: '문', e: '🚪' }, { es: 'portero', kr: '경비, 수위', e: '💂' }
    ],

    examBank: [
      { p: 'Yo ____ español. <i>(hablar)</i>', a: ['hablo'], s: 'pre' },
      { p: 'Tú ____ mucho. <i>(hablar)</i>', a: ['hablas'], s: 'pre' },
      { p: 'Nosotros ____ en Seúl. <i>(vivir)</i>', a: ['vivimos'], s: 'pre' },
      { p: '¿Vosotros ____ inglés? <i>(aprender)</i>', a: ['aprendéis'], s: 'pre' },
      { p: 'Ellos ____ en un banco. <i>(trabajar)</i>', a: ['trabajan'], s: 'pre' },
      { p: 'María ____ Física en la universidad. <i>(estudiar)</i>', a: ['estudia'], s: 'pre' },
      { p: 'Usted ____ paquetes. <i>(recibir)</i>', a: ['recibe'], s: 'pre' },
      { p: 'Vosotros ____ cartas. <i>(escribir)</i>', a: ['escribís'], s: 'pre' },
      { p: 'Juan y yo ____ café. <i>(tomar)</i>', a: ['tomamos'], s: 'pre' },
      { p: '____ somos estudiantes. <i>(우리들, 남)</i>', a: ['nosotros'], s: 'pro' },
      { p: '____ eres de México. <i>(너)</i>', a: ['tú'], s: 'pro' },
      { p: '____ casa <i>(정관사)</i>', a: ['la'], s: 'num' },
      { p: '____ día <i>(정관사 — 예외 명사!)</i>', a: ['el'], s: 'gen' },
      { p: '____ mano <i>(정관사 — 예외 명사!)</i>', a: ['la'], s: 'gen' },
      { p: '____ canción <i>(정관사)</i>', a: ['la'], s: 'gen' },
      { p: 'el lápiz → los ____', a: ['lápices'], s: 'num' },
      { p: 'la ciudad → las ____', a: ['ciudades'], s: 'num' },
      { p: 'el examen → los ____', a: ['exámenes'], s: 'num' },
      { p: 'la estación → las ____', a: ['estaciones'], s: 'num' },
      { p: '____ libro <i>(부정관사, 책 한 권)</i>', a: ['un'], s: 'num' },
      { p: '____ casas <i>(부정관사, 몇 채의 집)</i>', a: ['unas'], s: 'num' },
      { p: 'A: ¡Muchas gracias! — B: ¡De ____!', a: ['nada'], s: 'sal' },
      { p: 'A: ¿Qué tal? — B: Muy ____, gracias.', a: ['bien'], s: 'sal' },
      { p: '¡Buenas ____! <i>(밤 인사)</i>', a: ['noches'], s: 'sal' }
    ]
  };

  const B = {};
  const SER = W0 + '(soy|eres|es|somos|sois|son)' + W1;
  const PRES = W0 + '(hablo|estudio|trabajo|vivo|aprendo|como|escribo|leo|preparo|deseo|tomo|bebo|comprendo|recibo|canto|compro)' + W1;

  /* ---------- Diálogo ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'En una reunión de amigos')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>
      <h3 class="h3">✍️ 나라면? — 카를로스의 질문에 나에 대해 답하세요</h3><div class="items f"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    ['¡Hola! Encantada. Me llamo María.', 'Y tú, ¿de dónde eres?', 'Estudio Física en la universidad.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'sal', target: t })));
    [['¿Cómo te llamas?', [{ re: 'me llamo|' + W0 + 'soy' + W1, label: 'Me llamo … / Soy …' }], 'Me llamo Minji.'],
      ['¿De dónde eres?', [{ re: W0 + 'soy' + W1, label: 'Soy …' }, { re: 'coreano|coreana|de [a-záéíóúñ]+', label: '국적 · 출신지' }], 'Soy coreana. Soy de Seúl.'],
      ['¿Eres estudiante o trabajas?', [{ re: 'soy estudiante|trabajo|estudio', label: 'Soy estudiante. / Trabajo …' }], 'Soy estudiante. Estudio en un colegio internacional.']]
      .forEach(([q, m, md], i) => put(s, '.f', freeItem({ id: 'd1f' + i, sec: 'd1', skill: 'lib', line: true, prompt: `${q} ${say(q)}`, must: m, model: md })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿De dónde es María?', kw: [['salamanca|espa[nñ]a|espa[nñ]ola', 'Salamanca / española']], model: 'Es de Salamanca. Es española.' },
      { q: '¿De dónde es Carlos?', kw: [['m[eé]xico|mexicano', 'México / mexicano']], model: 'Es mexicano. Es de México.' },
      { q: '¿Es estudiante María?', kw: [['s[ií]', 'Sí'], ['es estudiante', 'es estudiante']], model: 'Sí, es estudiante.' },
      { q: '¿Dónde estudia María?', kw: [['universidad', 'en la universidad']], model: 'Estudia Física en la universidad.' },
      { q: '¿Dónde trabaja Carlos?', kw: [['banco', 'en un banco']], model: 'Trabaja en un banco.' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lect = () => {
    const s = sec('lect', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <div class="rb"></div>
      <h3 class="h3">① 소희에 대해 — ¿Verdadero o falso?</h3><div class="items vf"></div>
      <h3 class="h3">② 동사 찾기 — 본문의 1인칭 동사를 동사원형과 짝지으세요</h3><div class="pm"></div>
      <h3 class="h3">③ 3인칭으로 바꿔 쓰기 — Sohi …</h3><div class="items w3"></div>`);
    put(s, '.rb', readBlock(D.lectura, { img: '👩🏻‍🎓📚', g: 'f' }));
    [['Sohi es de Corea.', 'Verdadero'], ['Sohi vive en Busan.', 'Falso'], ['Sohi habla bien español.', 'Falso'], ['El profesor solo habla en español en clase.', 'Verdadero'], ['El profesor es muy amable.', 'Verdadero']]
      .forEach(([p, a], i) => put(s, '.vf', choiceItem({ id: 'lvf' + i, sec: 'lect', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a })));
    put(s, '.pm', pairMatch({ id: 'lpm', sec: 'lect', skill: 'pre', pairs: [['me llamo', 'llamarse'], ['estudio', 'estudiar'], ['vivo', 'vivir'], ['hablo', 'hablar'], ['preparo', 'preparar'], ['deseo', 'desear']] }));
    [['Me llamo Sohi.', 'Se llama Sohi.'], ['Vivo en Seúl.', 'Vive en Seúl.'], ['Preparo la clase de español en casa.', 'Prepara la clase de español en casa.'], ['Deseo hablar bien en español.', 'Desea hablar bien en español.']]
      .forEach(([p, a], i) => put(s, '.w3', writeItem({ id: 'l3-' + i, sec: 'lect', skill: 'pre', prompt: `${p} → Sohi …`, answers: [a, 'Sohi ' + a.charAt(0).toLowerCase() + a.slice(1)] })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.slice(0, 7).map(v => [v.es, v.kr]) }));
    D.voc2.slice(7).forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Dónde estudia Sohi español?', kw: [['escuela', 'en la escuela']], model: 'Estudia español en la escuela.' },
      { q: '¿Dónde vive Sohi?', kw: [['se[uú]l', 'en Seúl']], model: 'Vive en Seúl.' },
      { q: '¿Qué estudia Sohi?', kw: [['espa[nñ]ol', 'español']], model: 'Estudia español y también inglés.' },
      { q: '¿Cómo es el profesor de español?', kw: [['inteligente|amable', 'inteligente / amable']], model: 'Es muy inteligente y muy amable.' },
      { q: '¿Qué desea Sohi?', kw: [['desea', 'desea …'], ['hablar bien', 'hablar bien en español']], model: 'Desea hablar bien en español con el profesor.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 명사 / 동사 분류하기</h3><div class="sb"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    put(s, '.sb', sortBoard({ id: 'ampsb', sec: 'amplia', skill: 'voc', cols: [{ k: 'n', label: '명사 (sustantivo)' }, { k: 'v', label: '동사 (verbo)' }],
      chips: D.amplia.map(a => [a.es, /r$/.test(a.es) ? 'v' : 'n']) }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 주격 인칭대명사</h3>
        <table class="gtab"><tr><th></th><th>단수형</th><th>복수형</th></tr>
          <tr><td>1인칭</td><td>yo 나</td><td>nosotros/as 우리들</td></tr>
          <tr><td>2인칭</td><td>tú 너</td><td>vosotros/as 너희들</td></tr>
          <tr><td>3인칭</td><td>él 그 · ella 그녀 · usted 당신</td><td>ellos 그들 · ellas 그녀들 · ustedes 당신들</td></tr></table>
        ${tip('usted과 ustedes는 의미상 2인칭 경어이지만 동사 변화형은 각각 <b>3인칭 단수 · 복수</b>를 따른다. 스페인 카나리아 군도와 중남미에서는 복수형으로 <b>ustedes</b> 한 가지만 사용한다. <b>tú</b>와 <b>él</b>에는 악센트!')}
        <div class="g1"></div></div>
      <div class="gcard"><h3>2. 직설법 현재시제 — (1) 규칙동사 활용</h3>
        <table class="gtab"><tr><th></th><th>cantar</th><th>comer</th><th>vivir</th></tr>
          ${[['1인칭 단수', 'o', 'o', 'o'], ['2인칭 단수', 'as', 'es', 'es'], ['3인칭 단수', 'a', 'e', 'e'], ['1인칭 복수', 'amos', 'emos', 'imos'], ['2인칭 복수', 'áis', 'éis', 'ís'], ['3인칭 복수', 'an', 'en', 'en']]
            .map(([p, a, b, c]) => `<tr><td>${p}</td><td>cant-<b class="hi">${a}</b></td><td>com-<b class="hi">${b}</b></td><td>viv-<b class="hi">${c}</b></td></tr>`).join('')}</table>
        ${tip('스페인어는 동사의 형태로 주어를 구분할 수 있기 때문에 문맥을 통하여 알 수 있는 경우 주어를 표기하지 않는다. (Hablo español. = Yo hablo español.)')}
        <table class="gtab"><tr><th>① -ar형 동사</th><th>② -er형 동사</th><th>③ -ir형 동사</th></tr>
          <tr><td class="l">hablar 말하다 · comprar 구입하다<br>contestar 대답하다 · preguntar 질문하다<br>tomar 잡다, 타다 · pronunciar 발음하다</td>
          <td class="l">aprender 배우다 · vender 팔다<br>comprender 이해하다 · beber 마시다<br>deber ~해야 한다</td>
          <td class="l">escribir 쓰다 · recibir 받다<br>partir 떠나다 · abrir 열다<br>subir 올라가다 · decidir 결정하다</td></tr></table>
        <div class="g2"></div><div class="items g2b"></div></div>
      <div class="gcard"><h3>3. 명사의 성</h3>
        <p><b>(1)</b> 모든 명사는 남성과 여성으로 구분되며, 일반적으로 <b>-o</b>로 끝나면 남성 명사, <b>-a</b>로 끝나면 여성 명사이다.</p>
        <table class="gtab"><tr><th>남성명사</th><th>여성명사</th></tr><tr><td>(el) libro 책</td><td>(la) casa 집</td></tr><tr><td>(el) trabajo 일</td><td>(la) piedra 돌</td></tr><tr><td>(el) helado 아이스크림</td><td>(la) tarta 케이크</td></tr></table>
        ${tip('예외: (el) día 날/일 · (el) mapa 지도 · (el) idioma 언어 / (la) mano 손 · (la) foto 사진 · (la) moto 오토바이')}
        <p><b>(2)</b> 사람이나 동물은 일반적으로 자연의 성을 따른다.</p>
        <table class="gtab"><tr><th>남성명사</th><th>여성명사</th></tr>${[['amigo 친구', 'amiga 친구'], ['niño 소년', 'niña 소녀'], ['perro 수캐', 'perra 암캐'], ['hombre 남자', 'mujer 여자'], ['padre 아버지', 'madre 어머니']].map(([a, b]) => `<tr><td>(el) ${a}</td><td>(la) ${b}</td></tr>`).join('')}</table>
        <p><b>(3)</b> <b>-ción, -sión, … -umbre</b>로 끝나는 명사는 여성이다.</p>
        <table class="gtab"><tr><td>(la) canción 노래</td><td>(la) ciudad 도시</td></tr><tr><td>(la) comprensión 이해</td><td>(la) libertad 자유</td></tr><tr><td>(la) conexión 연결</td><td>(la) costumbre 관습</td></tr></table>
        <p><b>(4)</b> 일정한 기준이 없는 명사도 있다.</p>
        <table class="gtab"><tr><th>남성명사</th><th>여성명사</th></tr>${[['coche', 'leche'], ['lápiz', 'luz'], ['sol', 'sal'], ['televisor', 'flor']].map(([a, b]) => `<tr><td>(el) ${a}</td><td>(la) ${b}</td></tr>`).join('')}</table>
        <p><b>(5)</b> 남성, 여성의 형태가 동일한 명사가 존재한다.</p>
        <table class="gtab"><tr><th>남성명사</th><th>여성명사</th></tr>${[['estudiante 학생'], ['artista 예술가'], ['cantante 가수']].map(([a]) => `<tr><td>(el) ${a}</td><td>(la) ${a}</td></tr>`).join('')}</table>
        <div class="g3"></div></div>
      <div class="gcard"><h3>4. 명사의 수</h3>
        <p><b>(1)</b> 모음으로 끝나는 명사에는 <b>-s</b>를, 자음으로 끝나는 명사에는 <b>-es</b>를 붙여 복수형을 만든다.</p>
        <table class="gtab"><tr><th>단수형</th><th>복수형</th><th>단수형</th><th>복수형</th></tr>
          <tr><td>(el) alumno 학생</td><td>(los) alumno<b class="hi">s</b></td><td>(la) ciudad 도시</td><td>(las) ciudad<b class="hi">es</b></td></tr>
          <tr><td>(la) calle 거리</td><td>(las) calle<b class="hi">s</b></td><td>(el) lápiz 연필</td><td>(los) lápi<b class="hi">ces</b></td></tr>
          <tr><td>(la) casa 집</td><td>(las) casa<b class="hi">s</b></td><td>(el) mes 달/월</td><td>(los) mes<b class="hi">es</b></td></tr></table>
        <p><b>(2)</b> 복수형이 될 때 강세표시가 나타나거나 사라지기도 한다.</p>
        <table class="gtab"><tr><th>단수형</th><th>복수형</th><th>단수형</th><th>복수형</th></tr>
          <tr><td>(el) joven 젊은이</td><td>(los) j<b class="hi">ó</b>venes</td><td>(la) estaci<b class="hi">ó</b>n 역</td><td>(las) estaciones</td></tr>
          <tr><td>(el) examen 시험</td><td>(los) ex<b class="hi">á</b>menes</td><td>(el) cami<b class="hi">ó</b>n 트럭</td><td>(los) camiones</td></tr></table>
        <p><b>(3)</b> 단수형과 복수형이 동일한 명사도 있다: (el) lunes → (los) lunes · (el) paraguas → (los) paraguas</p>
        ${tip('-z로 끝나면 z → c + es: el lápiz → los lápi<b>ces</b>, la luz → las lu<b>ces</b>')}
        <div class="g4"></div></div>
      <div class="gcard"><h3>5. 정관사와 부정관사</h3>
        <p>정관사는 정해진 대상을 표현하며 부정관사는 '하나의' 혹은 '몇몇의'를 의미한다. 관사는 명사의 앞에 위치하며 명사의 성·수와 일치한다.</p>
        <table class="gtab"><tr><th rowspan="2"></th><th colspan="2">정관사</th><th colspan="2">부정관사</th></tr><tr><th>단수</th><th>복수</th><th>단수</th><th>복수</th></tr>
          <tr><td>남성</td><td><b class="hi">el</b> libro 그 책</td><td><b class="hi">los</b> libros 그 책들</td><td><b class="hi">un</b> libro 책 한 권</td><td><b class="hi">unos</b> libros 몇 권의 책</td></tr>
          <tr><td>여성</td><td><b class="hi">la</b> casa 그 집</td><td><b class="hi">las</b> casas 그 집들</td><td><b class="hi">una</b> casa 집 한 채</td><td><b class="hi">unas</b> casas 몇 채의 집</td></tr></table>
        <div class="g5"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'pro', title: '알맞은 주격 인칭대명사를 쓰세요.', cls: 'lines', text:
      ['🙋 [Yo] soy Carlos. <i>(나)</i>', '👉 ¿[Tú] eres estudiante? <i>(너)</i>', '👨 [Él] trabaja en un banco. <i>(그)</i>', '👩 [Ella] es María. <i>(그녀)</i>', '🧑‍💼 ¿[Usted] es el profesor? <i>(당신)</i>', '👭 [Nosotras] estudiamos español. <i>(우리들, 여)</i>', '👥 [Vosotros] aprendéis inglés. <i>(너희들, 남)</i>', '🧑‍🤝‍🧑 [Ustedes] viven en Seúl. <i>(당신들)</i>'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'pre', title: '표를 완성하세요 — hablar · aprender · escribir', cls: 'caltab', text:
      `<table class="gtab"><tr><th></th><th>hablar</th><th>aprender</th><th>escribir</th></tr>${[['yo', 'hablo', 'aprendo', 'escribo'], ['tú', 'hablas', 'aprendes', 'escribes'], ['él / ella / usted', 'habla', 'aprende', 'escribe'], ['nosotros/as', 'hablamos', 'aprendemos', 'escribimos'], ['vosotros/as', 'habláis', 'aprendéis', 'escribís'], ['ellos / ellas / ustedes', 'hablan', 'aprenden', 'escriben']]
        .map(([p, a, b, c]) => `<tr><td>${p}</td><td>[${a}]</td><td>[${b}]</td><td>[${c}]</td></tr>`).join('')}</table>` }));
    [['🇪🇸 yo · hablar español', 'Hablo español.', 'Yo hablo español.'], ['🇬🇧 ¿vosotros · aprender inglés?', '¿Aprendéis inglés?', '¿Vosotros aprendéis inglés?'], ['✉️ ella · escribir una carta', 'Ella escribe una carta.', 'Escribe una carta.'], ['🍵 nosotros · beber té', 'Bebemos té.', 'Nosotros bebemos té.']]
      .forEach(([p, ...a], i) => put(s, '.g2b', writeItem({ id: 'g2b-' + i, sec: 'gram', skill: 'pre', prompt: p, answers: a })));
    put(s, '.g3', sortBoard({ id: 'g3sb', sec: 'gram', skill: 'gen', title: '명사를 남성(el) / 여성(la)으로 분류하세요. 예외 명사에 주의!',
      cols: [{ k: 'm', label: 'el (남성)' }, { k: 'f', label: 'la (여성)' }],
      chips: [['libro', 'm'], ['casa', 'f'], ['día', 'm'], ['mano', 'f'], ['mapa', 'm'], ['foto', 'f'], ['canción', 'f'], ['ciudad', 'f'], ['idioma', 'm'], ['moto', 'f'], ['coche', 'm'], ['leche', 'f'], ['lápiz', 'm'], ['flor', 'f'], ['costumbre', 'f'], ['sol', 'm']] }));
    put(s, '.g4', cloze({ id: 'g4', sec: 'gram', skill: 'num', title: '복수형을 쓰세요 (관사 포함).', cls: 'table2', text:
      [['el alumno', 'los alumnos'], ['la ciudad', 'las ciudades'], ['el lápiz', 'los lápices'], ['el mes', 'los meses'], ['el joven', 'los jóvenes'], ['la estación', 'las estaciones'], ['el lunes', 'los lunes']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    put(s, '.g5', cloze({ id: 'g5', sec: 'gram', skill: 'num', title: '알맞은 관사를 쓰세요.', cls: 'lines', text:
      ['[El] libro es interesante. <i>(정관사)</i>', 'Trabajo en [un] banco. <i>(부정관사)</i>', '[Las] casas son grandes. <i>(정관사)</i>', 'Tengo [unos] amigos en México. <i>(부정관사)</i>', 'Estudio en [la] universidad. <i>(정관사)</i>', 'Sohi escribe [una] carta. <i>(부정관사)</i>'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '괄호 안 동사를 주어에 맞게 현재형으로 활용하세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1c', sec: 'e1', skill: 'pre', cls: 'lines', text:
      [['Tú', 'hablas', 'hablar', 'mucho'], ['Tú y yo', 'tomamos', 'tomar', 'café'], ['Carlos', 'desea', 'desear', 'comprar libros'], ['María y Juan', 'estudian', 'estudiar', 'mucho'],
        ['José y yo', 'cantamos', 'cantar', 'juntos'], ['Vosotros', 'aprendéis', 'aprender', 'inglés'], ['Usted', 'recibe', 'recibir', 'paquetes'], ['Joaquín y tú', 'escribís', 'escribir', 'cartas']]
        .map(([s1, a, v, r], i) => `<p>${i + 1}. ${s1} [${a}] <i>(${v})</i> ${r}.</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '다음 명사를 복수형으로 만드세요.', { kr: '관사까지 함께 쓰세요.' })}<div class="items two"></div>`);
    [['el chico', 'los chicos'], ['la llave', 'las llaves'], ['el autobús', 'los autobuses'], ['el reloj', 'los relojes'], ['la flor', 'las flores'], ['el problema', 'los problemas']]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'e2-' + i, sec: 'e2', skill: 'num', prompt: `${i + 1}. ${p}`, answers: [a] })));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '다음 인사말을 활용하여 친구와 대화해 보세요.')}
      <h3 class="h3">(1) 인사말</h3>
      <table class="gtab"><tr><th>만날 때</th><th>헤어질 때</th></tr>
        ${[['¡Hola! 안녕.', '¡Adiós! 잘 가!'], ['¡Buenos días! (아침 인사)', '¡Hasta luego! 다음에 보자!'], ['¡Buenas tardes! (오후 인사)', '¡Hasta pronto! 곧 봐!'], ['¡Buenas noches! (밤 인사)', '¡Hasta mañana! 내일 봐!'], ['¡Buenas! 안녕.', '¡Nos vemos! 다시 보자!']]
          .map(([a, b]) => `<tr><td class="l">${a} ${say(a.split('!')[0] + '!')}</td><td class="l">${b} ${say(b.split('!')[0] + '!')}</td></tr>`).join('')}</table>
      ${tip('오후 인사(¡Buenas tardes!)는 대화 상대가 <b>점심 식사를 마친 시점</b>을 기준으로 사용한다. 스페인은 점심 식사 시간이 오후 2시에서 3시 사이에 시작되므로 정오를 넘은 시점에 무조건 오후 인사를 하는 것은 적절하지 않다.')}
      <h3 class="h3">(2) 안부 인사와 대답</h3>
      <table class="gtab"><tr><th>안부 인사</th><th>대답</th></tr>
        <tr><td class="l">¿Qué tal? 어떻게 지내?<br>¿Qué hay? 어떻게 지내?<br>¿Cómo estás (tú)? 어떻게 지내?<br>¿Cómo está (usted)? 어떻게 지내세요?</td>
        <td class="l">¡Muy bien! 매우 잘 지내.<br>¡Bien! 잘 지내.<br>Así así. 그냥 그래.<br>Mal. 안 좋아.<br>Muy mal. 매우 안 좋아.</td></tr></table>
      <h3 class="h3">(3) 감사 표현</h3>
      <table class="gtab"><tr><td class="l">¡Gracias! 감사합니다.<br>¡Muchas gracias! 매우 감사합니다.</td><td class="l">¡De nada! 천만에요.<br>¡No hay de qué! 천만에요.</td></tr></table>
      <h3 class="h3">🗂️ 인사말 분류하기</h3><div class="sb"></div>
      <h3 class="h3">💬 대화 완성 — 빈칸에 알맞은 인사말을 쓰세요</h3>
      <div class="d1"></div><div class="d2"></div><div class="d3"></div>`);
    put(s, '.sb', sortBoard({ id: 'ac1sb', sec: 'ac1', skill: 'sal', cols: [{ k: 'h', label: '👋 만날 때' }, { k: 'a', label: '🙋 안부 묻기' }, { k: 'r', label: '💬 대답' }, { k: 'b', label: '🚶 헤어질 때' }],
      chips: [['¡Buenos días!', 'h'], ['¡Buenas tardes!', 'h'], ['¡Buenas noches!', 'h'], ['¿Qué tal?', 'a'], ['¿Cómo estás?', 'a'], ['¿Qué hay?', 'a'], ['Muy bien.', 'r'], ['Así así.', 'r'], ['¡Hasta luego!', 'b'], ['¡Hasta mañana!', 'b'], ['¡Nos vemos!', 'b'], ['¡Adiós!', 'b']] }));
    put(s, '.d1', cloze({ id: 'ac1a', sec: 'ac1', skill: 'sal', cls: 'lines modelo-like', title: '① En la calle por la mañana ☀️', text: [
      'Antonio: ¡[Buenos días|Hola|Buenas], Paula!', 'Paula: ¡Hola, Antonio! ¿[Qué tal|Cómo estás|Qué hay]?', 'Antonio: Muy bien, gracias. ¿Y tú?',
      'Paula: [Muy bien|Bien], también. ¡Hasta luego!', 'Antonio: ¡[Hasta luego|Adiós|Hasta pronto|Nos vemos]!'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.d2', cloze({ id: 'ac1b', sec: 'ac1', skill: 'sal', cls: 'lines modelo-like', title: '② En el aula por la tarde 🏫', text: [
      'Iñaki: ¡Hola, profesor!', 'Profesor Gabilondo: ¡Hola! ¿[Qué tal|Cómo estás|Qué hay], Iñaki?', 'Iñaki: Bien, gracias. ¿Y [usted]?', 'Profesor Gabilondo: [Muy bien|Bien].'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.d3', cloze({ id: 'ac1c', sec: 'ac1', skill: 'sal', cls: 'lines modelo-like', title: '③ En el piso por la noche 🌙', text: [
      'Vicenta: Buenas noches, Emilio.', 'Emilio: [Buenas noches|Hola], Vicenta.', 'Vicenta: ¿[Qué tal|Cómo estás|Cómo está usted|Qué hay]?', 'Emilio: [Muy bien|Bien]. ¿Y usted?',
      'Vicenta: Muy bien. [Hasta mañana|Adiós|Hasta luego]', 'Emilio: Adiós. Hasta mañana.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '알맞은 동사를 찾아서 주어에 맞게 활용해보세요.')}
      <div class="ybox wordbank">동사 상자: <span>tomar</span><span>limpiar</span><span>correr</span><span>ser</span><span>bajar</span><span>arreglar</span></div>
      ${tip('ser 는 불규칙동사: soy, eres, es, <b>somos</b>, sois, son')}
      <div class="items two"></div>`);
    [['👦📖👧', 'Nosotros', 'estudiantes', 'somos'], ['🧑☕', 'Juan', 'café', 'toma'], ['🏃‍♂️🏃‍♀️🌳', 'Los niños', 'en el parque', 'corren'],
      ['🐈⬇️🌳', 'El gato', 'del árbol', 'baja'], ['🧑🔧🚪', 'El hombre', 'la puerta', 'arregla'], ['👩🧽👓', 'Candela', 'las gafas', 'limpia']]
      .forEach(([e, s1, r, a], i) => put(s, '.items', writeItem({ id: 'ac2-' + i, sec: 'ac2', skill: 'pre', prompt: `<span class="photo-emo">${e}</span><br>(${i + 1}) ${s1} ______ ${r}.`, ph: '문장 전체를 쓰세요', answers: [`${s1} ${a} ${r}.`] })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('하나의 섬, 두 민족, 두 역사 — 도미니카 공화국과 아이티', [
      { e: '🏝️', h: 'La isla La Española', t: '콜럼버스가 처음 도착한 <b>히스파니올라섬</b>에는 도미니카 공화국과 아이티가 국경을 맞대고 있지만 서로 너무나 대조적이다.' },
      { e: '🌳🇩🇴', h: 'República Dominicana (동쪽)', t: '국토의 <b>28%가 녹지</b>. 숲을 보호하기 위해 삼림 경비대를 두고 불법 벌목꾼을 투옥하는 등 정부와 비정부 기구들이 환경 운동에 앞장서고 있다.' },
      { e: '🏜️🇭🇹', h: 'Haití (서쪽)', t: '프랑스 식민지였으며 섬 면적의 1/3이지만 인구는 약 천만 명(섬 인구의 2/3). 사탕수수 재배를 위한 무분별한 벌목으로 <b>산림 파괴</b>가 심각하고 커피와 설탕이 주요 수출품이다.' },
      { e: '⚖️', h: '공통점과 차이', t: '종교는 가톨릭이고 아프리카계와 유럽계 주민이 섞여 산다. 가난이라는 공통 문제가 있지만 자연 보호 측면에서는 큰 대조를 보인다.' }
    ], '같은 섬을 나누어 쓰는 두 나라는 언어도 달라요: 도미니카 공화국은 <b>스페인어</b>, 아이티는 <b>프랑스어 · 아이티 크레올어</b>를 써요.') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['도미니카 공화국과 아이티가 있는 섬은?', ['히스파니올라섬', '쿠바섬', '푸에르토리코섬', '자메이카섬'], '히스파니올라섬', '콜럼버스가 처음 도착한 섬 (La Española)'],
      ['섬의 동쪽에 있는 나라는?', ['도미니카 공화국', '아이티'], '도미니카 공화국', '국토의 28%가 녹지'],
      ['아이티를 식민 지배한 나라는?', ['프랑스', '스페인', '영국', '포르투갈'], '프랑스', '그래서 프랑스어를 써요'],
      ['도미니카 공화국의 공용어는?', ['스페인어', '프랑스어', '영어'], '스페인어', '¡Hablan español!']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'com', prompt: p, options: o, answer: a, explain: ex })));
  };

  SC.lesson({
    num: '01',
    title: '¡Hola!',
    ttsTest: '¡Hola! Soy Carlos.',
    cover: {
      emoji: '👋🙋‍♀️<small>🇪🇸 🇲🇽</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#c2410c)',
      tema: ['Saludos y presentaciones', 'Nacionalidad y profesión'],
      com: ['인사말: ¿Qué tal? · ¡Hasta pronto!', '자기소개: Me llamo María. Soy de Salamanca.'],
      gram: ['주격 인칭대명사', '직설법 현재형 규칙동사: Hablo español. · ¿Aprendéis inglés?', '명사의 성 · 수, 정관사와 부정관사']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Carlos: { g: 'm', av: '🧔🏻', side: 'l' }, 'María': { g: 'f', av: '👩🏽', side: 'r' }
    },
    errLabels: { conjugacion: '동사 어미 (-o, -as, -a …)', articulo: '관사 성·수 (el / la / los / las)' },
    errTips: {
      acento: 'tú, él, también, inglés, español, aprendéis, escribís, lápices … 악센트도 철자예요.',
      conjugacion: '-ar: o, as, a, amos, áis, an / -er: o, es, e, emos, éis, en / -ir: o, es, e, imos, ís, en',
      articulo: '남성 el · los · un · unos / 여성 la · las · una · unas — 예외: el día, el mapa, la mano, la foto',
      estructura: '주어가 없어도 동사 어미로 주어를 알 수 있어요: Hablo español.'
    },
    classify(ti, ta) {
      const ART = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas'];
      if (ti.filter(w => ART.includes(w)).join() !== ta.filter(w => ART.includes(w)).join()) return 'articulo';
      for (const w of ta) { if (w.length > 3 && !ti.includes(w) && ti.some(x => x !== w && x.slice(0, 3) === w.slice(0, 3))) return 'conjugacion'; }
      return null;
    },
    errRules: [
      { re: W0 + 'yo (es|eres|habla|estudia|trabaja|vive|aprende)' + W1, t: 'conjugacion', msg: 'yo → soy / hablo / estudio / vivo …' },
      { re: W0 + 'tu (eres|hablas|estudias|vives|trabajas)' + W1, t: 'acento', msg: '주어 "tú" 악센트' },
      { re: W0 + 'el (casa|mano|foto|moto|canci[oó]n|ciudad|leche|flor)' + W1, t: 'articulo', msg: '여성 명사 → la' },
      { re: W0 + 'la (d[ií]a|mapa|idioma|libro|coche|l[aá]piz|problema)' + W1, t: 'articulo', msg: '남성 명사 → el' },
      { re: W0 + 'me llamo es' + W1, t: 'estructura', msg: '"Me llamo …" 또는 "Mi nombre es …"' }
    ],
    accWords: ['también', 'inglés', 'español', 'física', 'seúl', 'méxico', 'adiós', 'días', 'mañana', 'reunión', 'lápiz', 'lápices', 'canción', 'jóvenes', 'exámenes', 'autobús', 'árbol', 'aprendéis', 'escribís', 'habláis', 'vivís', 'coméis', 'estación', 'iñaki', 'joaquín'],
    exam: {
      bank: D.examBank,
      partB: {
        title: '¡Hola! Me presento → 자기소개 글쓰기',
        icons: ['👋', '🙋', '🏫'],
        questions: ['¿Cómo te llamas? ¿De dónde eres?', '¿Dónde vives? ¿Eres estudiante o trabajas?', '¿Qué estudias? ¿Qué idiomas hablas? ¿Cómo es tu profesor/a?'],
        minWords: 45,
        hint: 'me llamo · soy · 현재형 규칙동사(hablo, estudio, vivo, aprendo, escribo) · 관사를 정확히 쓰면 높은 점수!',
        ph: '¡Hola! Me llamo … Soy de …',
        connectors: ['y', 'pero', 'también', 'ahora', 'muy', 'en casa', 'en clase'],
        rubric: [
          { k: 'sal', label: '인사말 (¡Hola! …)', max: 4, re: 'hola|buenos d[ií]as|buenas|encantad[oa]|hasta (luego|pronto|ma[nñ]ana)|adi[oó]s', ax: 'Contenido' },
          { k: 'nom', label: '이름 (Me llamo / Soy …)', max: 6, re: 'me llamo|mi nombre es', ax: 'Contenido' },
          { k: 'ori', label: '출신 · 거주지 (Soy de … / Vivo en …)', max: 8, re: 'soy de|vivo en|soy (coreano|coreana|espa[nñ]ol|espa[nñ]ola|mexicano|mexicana)', ax: 'Contenido' },
          { k: 'ser', label: 'ser 동사 (soy, es …)', max: 8, re: '(soy|eres|es|somos|son)', min: 2, ax: 'Gramática' },
          { k: 'pre', label: '현재형 규칙동사 1인칭 3개 이상', max: 14, re: '(hablo|estudio|trabajo|vivo|aprendo|escribo|leo|preparo|deseo|tomo|bebo|como|comprendo|recibo|canto|compro)', min: 3, ax: 'Gramática' },
          { k: 'art', label: '관사 + 명사 (el / la / un / una …)', max: 6, re: '(el|la|los|las|un|una|unos|unas) [a-záéíóúñ]+', min: 2, ax: 'Gramática' }
        ],
        model: '¡Hola! Me llamo Minji. Soy coreana y vivo en Seúl con mi familia. Soy estudiante. Estudio en un colegio internacional. Ahora aprendo español y también hablo inglés. Preparo la clase de español en casa. Mi profesor es muy inteligente y muy amable. Deseo hablar bien español. ¡Hasta pronto!'
      }
    },
    build: B
  });
})();
