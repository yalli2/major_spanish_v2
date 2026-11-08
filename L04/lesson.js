/* Lección 04 · ¿Cuántos árboles hay en el jardín? — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 53~66쪽 : Diálogo 1 → Vocabulario·Contesta → Diálogo 2 → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~4) → Actividades 1~5 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .yard{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;background:linear-gradient(#cdeccd,#a6d99a);border-radius:16px;padding:14px;margin:10px 0}
    .yard div{background:rgba(255,255,255,.85);border-radius:10px;text-align:center;padding:8px 4px;font-size:13px;color:#444}
    .yard div span{display:block;font-size:30px}
    .scene{font-size:54px;letter-spacing:.06em;background:linear-gradient(135deg,#eef4ff,#fff);border:1px solid #d6e2f5;border-radius:14px;padding:12px 16px;text-align:center;margin:8px 0}
    .scene small{display:block;font-size:13px;color:#555;letter-spacing:0;margin-top:4px}
    .clockbig{font-size:13px;color:#555}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      pro: 'Pronombres 직접목적대명사',
      dec: 'Decir · Hablar',
      hay: 'Estar · Hay',
      int: 'Interrogativos 의문사(2)',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo 1', kr: '비센테의 집 앞에서', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'd2', label: 'Diálogo 2', kr: '주민 회의에 가는 길', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo' },
      { id: 'gram', label: 'Gramática', kr: '목적대명사 · decir/hablar · estar/hay · 의문사', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '직접목적대명사로 대답', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: 'decir 또는 hablar', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: 'hay ↔ estar 바꾸기', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'e4', label: '연습문제 4', kr: '의문사 넣고 대답하기', group: 'Gramática y ejercicios', kind: 'ej', n: 4 },
      { id: 'ac1', label: 'Actividades 1', kr: 'hay · estar로 사진 묘사', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '그림 보고 질문에 답하기', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '표현으로 문장 만들기', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'ac4', label: 'Actividades 4', kr: '우리 동네 묘사', group: 'Actividades', kind: 'ac', n: 4 },
      { id: 'ac5', label: 'Actividades 5', kr: '우리 학교 묘사', group: 'Actividades', kind: 'ac', n: 5 },
      { id: 'cultura', label: 'Cultura', kr: 'siesta 낮잠 문화', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo1: [
      { who: 'Vicente', es: 'Esta es mi casa. Está en la calle de Padilla, número diez.' },
      { who: 'Laura', es: '¡Es muy [grande]!' },
      { who: 'Vicente', es: 'Sí, es bastante grande, pero [antigua]. [Delante de] la casa está el [jardín].' },
      { who: 'Laura', es: '¿[Cuántos] árboles [hay] en el jardín?' },
      { who: 'Vicente', es: '[Solo] hay tres. Pero hay muchas [flores].' },
      { who: 'Laura', es: 'Y [ahí], ¿qué hay?' },
      { who: 'Vicente', es: 'Ahí hay un [garaje] y aquí una [piscina].' },
      { who: 'Laura', es: '¿Y [allí]?' },
      { who: 'Vicente', es: 'Una [caseta] del perro.' },
      { who: 'Laura', es: '¿Es alto el [alquiler]?' },
      { who: 'Vicente', es: 'No. Mil euros al [mes].' },
      { who: 'Laura', es: '¡Qué [barato]!' }
    ],
    dialogo2: [
      { who: 'Pedro', es: '¿Qué [hora] es?' },
      { who: 'Ana', es: 'Son las siete y veinte.' },
      { who: 'Pedro', es: '¿A qué hora [tiene lugar] la reunión de [vecinos]?' },
      { who: 'Ana', es: '[Dicen] que tiene lugar a las ocho. Entonces, ¿tenemos [prisa]?' },
      { who: 'Pedro', es: 'Sí, [la] tenemos.' },
      { who: 'Ana', es: '¿[Tomamos] un taxi?' },
      { who: 'Pedro', es: 'Vale, de [acuerdo]. No [tardamos] tanto en taxi.' },
      { who: 'Ana', es: '¡[Menos mal] que aquí hay muchos taxis [libres] a estas horas!' }
    ],

    voc1: [
      { es: 'grande', kr: '커다란', e: '🏰' }, { es: 'jardín', kr: '정원', e: '🌳' }, { es: 'flor', kr: '꽃', e: '🌸' },
      { es: 'allí', kr: '저기', e: '👉' }, { es: 'piscina', kr: '수영장', e: '🏊' }, { es: 'perro', kr: '개', e: '🐕' },
      { es: 'alto', kr: '높은, 키가 큰', e: '📏' }, { es: 'mes', kr: '월, 달', e: '📅' }, { es: 'garaje', kr: '차고', e: '🚗' },
      { es: 'antiguo', kr: '오래된, 낡은', e: '🏚️' }, { es: 'solo', kr: '오직, 단지', e: '☝️' }, { es: 'ahí', kr: '거기', e: '👇' },
      { es: 'aquí', kr: '여기', e: '📍' }, { es: 'caseta', kr: '작은 집', e: '🛖' }, { es: 'alquiler', kr: '임대료', e: '🧾' },
      { es: 'euro', kr: '유로(화폐 단위)', e: '💶' }, { es: 'barato', kr: '값싼, 저렴한', e: '🏷️' }
    ],
    voc2: [
      { es: 'hora', kr: '시간', e: '🕖' }, { es: 'tener lugar', kr: '열리다, 개최되다', e: '🎪' }, { es: 'acuerdo', kr: '일치, 동의', e: '🤝' },
      { es: 'tardar', kr: '(시간이) 걸리다', e: '⏳' }, { es: 'menos mal', kr: '다행이네', e: '😮‍💨' }, { es: 'libre', kr: '자유로운, 한가한, 빈', e: '🆓' },
      { es: 'tomar', kr: '(교통수단을) 잡다, 타다', e: '🚕' }, { es: 'vale', kr: '좋습니다', e: '👌' }, { es: 'vecino', kr: '이웃, 주민', e: '🏘️' },
      { es: 'tener prisa', kr: '급하다, 시간이 없다', e: '🏃' }, { es: 'decir', kr: '말하다', e: '🗣️' }
    ],
    amplia: [
      { es: 'comprar', kr: '구입하다', e: '🛍️' }, { es: 'en voz alta', kr: '큰 소리로', e: '📢' }, { es: 'enfermo', kr: '병이 난, 아픈', e: '🤒' },
      { es: 'cerrado', kr: '닫힌', e: '🚪' }, { es: 'izquierda', kr: '왼쪽', e: '⬅️' }, { es: 'mochila', kr: '배낭', e: '🎒' }
    ],

    examBank: [
      { p: '¿Compras estas flores? — Sí, ____ compro.', a: ['las'], s: 'pro' },
      { p: '¿Tienes abuelo? — No, no ____ tengo.', a: ['lo'], s: 'pro' },
      { p: '¿Ves a María? — Sí, ____ veo.', a: ['la'], s: 'pro' },
      { p: '¿Tienes los libros? — Sí, ____ tengo.', a: ['los'], s: 'pro' },
      { p: '¿Me llamas mañana? — Sí, ____ llamo.', a: ['te'], s: 'pro' },
      { p: 'Yo siempre ____ la verdad. <i>(decir)</i>', a: ['digo'], s: 'dec' },
      { p: 'Usted ____ español muy bien. <i>(hablar)</i>', a: ['habla'], s: 'dec' },
      { p: 'Mi padre ____ que tiene mucho dinero. <i>(decir)</i>', a: ['dice'], s: 'dec' },
      { p: 'Nosotros ____ que el examen es fácil. <i>(decir)</i>', a: ['decimos'], s: 'dec' },
      { p: '____ una tienda en la calle. <i>(estar / hay)</i>', a: ['hay'], s: 'hay' },
      { p: 'Tu libro ____ sobre la mesa. <i>(estar / hay)</i>', a: ['está'], s: 'hay' },
      { p: 'Las ventanas ____ cerradas. <i>(estar)</i>', a: ['están'], s: 'hay' },
      { p: 'En el jardín ____ tres árboles. <i>(estar / hay)</i>', a: ['hay'], s: 'hay' },
      { p: 'La niña ____ enferma. <i>(estar)</i>', a: ['está'], s: 'hay' },
      { p: '¿____ vienen los profesores? <i>(언제)</i>', a: ['cuándo'], s: 'int' },
      { p: '¿____ de estos libros es tuyo? <i>(어느 것)</i>', a: ['cuál'], s: 'int' },
      { p: '¿____ son ustedes? <i>(누구, 복수)</i>', a: ['quiénes'], s: 'int' },
      { p: '¿____ dinero tienes tú? <i>(얼마나)</i>', a: ['cuánto'], s: 'int' },
      { p: '¿____ árboles hay en el jardín? <i>(몇 그루)</i>', a: ['cuántos'], s: 'int' },
      { p: '¿____ son las chicas? <i>(몇 명)</i>', a: ['cuántas'], s: 'int' }
    ]
  };

  const B = {};
  const HAY = W0 + 'hay' + W1;
  const ESTAR = W0 + '(est[aá]|est[aá]n)' + W1;

  /* ---------- Diálogo 1 ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'Delante de casa de Vicente')}
      <div class="dslot"></div>
      <h3 class="h3">🏡 비센테의 집 — 무엇이 어디에 있나요?</h3>
      <div class="yard"><div><span>🏠</span>la casa<br><small>grande, pero antigua</small></div><div><span>🌳🌳🌳</span>3 árboles<br><small>en el jardín</small></div><div><span>🌸🌼🌺</span>muchas flores</div><div><span>🚗</span>un garaje<br><small>ahí</small></div>
        <div><span>🏊</span>una piscina<br><small>aquí</small></div><div><span>🛖🐕</span>caseta del perro<br><small>allí</small></div><div><span>💶</span>1.000 €<br><small>al mes</small></div><div><span>📍</span>calle de Padilla, 10</div></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo1, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'hay', cls: 'lines', text: SC.clozeFromDialog(D.dialogo1) }));
    ['¿Cuántos árboles hay en el jardín?', 'Delante de la casa está el jardín.', 'Ahí hay un garaje y aquí una piscina.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'hay', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    ['jardín', 'flor', 'piscina', 'garaje', 'antiguo', 'caseta', 'alquiler', 'barato', 'allí', 'ahí'].forEach((w, i) => {
      const v = D.voc1.find(x => x.es === w);
      put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] }));
    });
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Dónde está la casa de Vicente?', kw: [['padilla', 'en la calle de Padilla']], model: 'Está en la calle de Padilla, número diez.' },
      { q: '¿Cómo es la casa?', kw: [['grande', 'grande'], ['antigua', 'antigua']], model: 'Es bastante grande, pero antigua.' },
      { q: '¿Dónde está el jardín?', kw: [['delante de la casa', 'delante de la casa']], model: 'Está delante de la casa.' },
      { q: '¿Qué hay en el jardín?', kw: [['hay', 'Hay …'], ['[aá]rboles|flores', 'árboles / flores']], model: 'Hay tres árboles y muchas flores.' },
      { q: '¿Hay pocas flores en el jardín?', kw: [['no', 'No'], ['muchas', 'muchas flores']], model: 'No, hay muchas flores.' },
      { q: '¿Es alto el alquiler de la casa?', kw: [['no', 'No'], ['mil euros|barato', 'mil euros / barato']], model: 'No. Es barato: mil euros al mes.' }
    ] }));
  };

  /* ---------- Diálogo 2 ---------- */
  B.d2 = () => {
    const s = sec('d2', `${dlgHead(2, 'A la reunión de vecinos')}
      <div class="dslot"></div>
      <div class="scene">🕖 ➜ 🚕 ➜ 🕗🏘️<small>Son las siete y veinte → toman un taxi → la reunión de vecinos tiene lugar a las ocho</small></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기</h3><div class="c"></div>
      <h3 class="h3">🔎 "Sí, <u>la</u> tenemos." — la 는 무엇을 가리킬까요?</h3><div class="items q"></div>`);
    put(s, '.dslot', dialogBlock('d2', D.dialogo2));
    put(s, '.c', cloze({ id: 'd2c', sec: 'd2', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo2) }));
    put(s, '.q', choiceItem({ id: 'd2la', sec: 'd2', skill: 'pro', prompt: '¿Tenemos prisa? — Sí, <b>la</b> tenemos.', options: ['la prisa', 'la reunión', 'la hora', 'la casa'], answer: 'la prisa', explain: '여성 단수 명사 prisa 를 받는 직접목적대명사 la' }));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.slice(0, 8).map(v => [v.es, v.e + ' ' + v.kr]) }));
    ['hora', 'tener lugar', 'tardar', 'menos mal', 'libre', 'vecino', 'tener prisa', 'decir'].forEach((w, i) => {
      const v = D.voc2.find(x => x.es === w);
      put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] }));
    });
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Qué tiene lugar a las ocho?', kw: [['reuni[oó]n de vecinos', 'la reunión de vecinos']], model: 'La reunión de vecinos tiene lugar a las ocho.' },
      { q: '¿Tienen prisa Pedro y Ana?', kw: [['s[ií]', 'Sí'], ['prisa|la tienen', 'tienen prisa / la tienen']], model: 'Sí, tienen prisa.' },
      { q: '¿Qué toman ellos?', kw: [['taxi', 'un taxi']], model: 'Toman un taxi.' },
      { q: '¿Ellos tardan poco en taxi?', kw: [['s[ií]', 'Sí'], ['tardan', 'tardan …']], model: 'Sí, no tardan tanto en taxi.' },
      { q: '¿Por qué Ana dice que menos mal?', kw: [['porque', 'Porque …'], ['taxis libres', 'muchos taxis libres']], model: 'Porque aquí hay muchos taxis libres a estas horas.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ estar + 상태 형용사 — 주어의 성 · 수에 맞춰 쓰세요</h3><div class="c"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 3 }));
    put(s, '.c', cloze({ id: 'ampc', sec: 'amplia', skill: 'hay', cls: 'lines', text: [
      '🤒 La niña está [enferma]. <i>(enfermo)</i>', '🤒 Mis abuelos están [enfermos]. <i>(enfermo)</i>', '🚪 Las ventanas están [cerradas]. <i>(cerrado)</i>',
      '🚪 El museo está [cerrado] los lunes. <i>(cerrado)</i>', '🎒 Hay libros en mi [mochila].', '📢 El profesor lee el texto en voz [alta].'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 직접목적대명사</h3>
        <p><b>(1) 형태</b> — 직접목적어로 쓰이는 명사를 받을 때 쓰는 대명사</p>
        <table class="gtab"><tr><th colspan="2"></th><th>단수</th><th>복수</th></tr>
          <tr><td colspan="2">1인칭</td><td class="hi">me</td><td class="hi">nos</td></tr>
          <tr><td colspan="2">2인칭</td><td class="hi">te</td><td class="hi">os</td></tr>
          <tr><td rowspan="2">3인칭</td><td>남성</td><td class="hi">lo / le</td><td class="hi">los / les</td></tr>
          <tr><td>여성</td><td class="hi">la</td><td class="hi">las</td></tr></table>
        ${tip('<b>참고</b> 3인칭 남성 단·복수는 <b>사람</b>을 가리킬 때에 한해서 lo → le, los → les 로 바꿔 쓰는 것을 허용한다.')}
        <p><b>(2) 용법</b> — 가리키는 명사의 <b>성과 수</b>에 일치하고, 보통 <b>활용된 동사 앞</b>에 놓인다.</p>
        <div class="blocks"><span class="bk p">A: ¿Compras</span><span class="bk s">estas flores?</span><span class="small">이 꽃들 살 거니?</span></div>
        <div class="blocks"><span class="bk p">B: Sí,</span><span class="bk o">las</span><span class="bk v">compro.</span><span class="small">응, 살 거야. (flores = 여성 복수 → las)</span></div>
        <div class="blocks"><span class="bk p">A: ¿Tienes</span><span class="bk s">abuelo?</span><span class="bk p">B: No, no</span><span class="bk o">lo</span><span class="bk v">tengo.</span><span class="small">아니, 안 계셔.</span></div>
        <div class="g1"></div></div>
      <div class="gcard"><h3>2. Decir와 Hablar 비교</h3>
        <p>타동사 <b>decir</b>는 '~을, ~라고 말하다', 자동사 <b>hablar</b>는 단순히 말하는 행위. hablar가 타동사로 쓰이는 것은 목적어가 <b>언어명</b>일 때뿐이다.</p>
        <table class="gtab"><tr><td>1인칭 단수</td><td class="hi">digo</td><td>1인칭 복수</td><td>decimos</td></tr><tr><td>2인칭 단수</td><td class="hi">dices</td><td>2인칭 복수</td><td>decís</td></tr><tr><td>3인칭 단수</td><td class="hi">dice</td><td>3인칭 복수</td><td class="hi">dicen</td></tr></table>
        <table class="gtab">${[['Yo siempre digo la verdad.', '나는 항상 진실을 말한다.'], ['Mi padre dice que tiene mucho dinero.', '우리 아버지는 돈이 많다고 말씀하신다.'], ['Usted habla español muy bien.', '당신은 스페인어를 매우 잘 하시는군요.']].map(([a, b]) => `<tr><td class="l">${a} ${say(a)}</td><td class="l">${b}</td></tr>`).join('')}</table>
        <div class="g2"></div></div>
      <div class="gcard"><h3>3. estar와 hay</h3>
        <table class="gtab"><tr><th>estar</th><td class="l">주어의 <b>위치</b>나 <b>잠정적인 상태</b> (형용사는 주어의 성 · 수에 일치)<br>La niña está enferma. 그 여자아이는 아프다. · Las ventanas están cerradas. 창문들이 닫혀 있다.<br>Las clases están a la izquierda del pasillo. 교실들은 복도 왼쪽에 있다.</td></tr>
          <tr><th>hay</th><td class="l">haber에서 유래한 <b>무인칭동사</b> — 변화 없이 hay. 막연한 대상의 <b>존재 여부</b>. 뒤에 <b>정관사는 올 수 없고</b> 부정관사 · 무관사 명사가 온다.<br>Hay una tienda en la calle. 그 거리에는 가게 하나가 있다. · Hay libros en mi mochila. 내 배낭에는 책들이 있다.</td></tr></table>
        <div class="blocks"><span class="bk o">Hay</span><span class="bk s">un libro</span><span class="bk p">sobre la mesa.</span><span class="small">그 탁자 위에 책 한 권이 있다. (막연한 대상)</span></div>
        <div class="blocks"><span class="bk s">Tu libro</span><span class="bk v">está</span><span class="bk p">sobre la mesa.</span><span class="small">네 책이 그 탁자 위에 있다. (특정한 대상)</span></div>
        ${tip('<b>el / la / mi / tu / 이름</b> + está(n) &nbsp;|&nbsp; Hay + <b>un / una / unos / 숫자 / mucho / 무관사</b>')}
        <div class="g3"></div></div>
      <div class="gcard"><h3>4. 의문사(2)</h3>
        <table class="gtab"><tr><th>의문사</th><th>뜻 · 변화</th><th>예문</th></tr>
          <tr><td class="hi">cuándo</td><td>언제 (시간 · 때)</td><td class="l">¿Cuándo vienen los profesores? 선생님들은 언제 오시니?</td></tr>
          <tr><td class="hi">cuál / cuáles</td><td>어느 것 · 사람 (선택), 수 변화만</td><td class="l">¿Cuál de estos libros es tuyo? · ¿Cuáles son tus padres?</td></tr>
          <tr><td class="hi">quién / quiénes</td><td>누구, 수 변화만</td><td class="l">¿Quién es tu padre? · ¿Quiénes son ustedes?</td></tr>
          <tr><td class="hi">cuánto / cuánta<br>cuántos / cuántas</td><td>얼마나 많은, 성 · 수 변화</td><td class="l">¿Cuánto dinero tienes tú? · ¿Cuántas son las chicas?</td></tr></table>
        <div class="g4"></div></div>`);
    put(s, '.g1', sortBoard({ id: 'g1sb', sec: 'gram', skill: 'pro', title: '명사를 받는 대명사 칸으로 분류하세요.',
      cols: [{ k: 'lo', label: 'lo' }, { k: 'la', label: 'la' }, { k: 'los', label: 'los' }, { k: 'las', label: 'las' }],
      chips: [['el coche', 'lo'], ['el número', 'lo'], ['la gramática', 'la'], ['la casa', 'la'], ['los libros', 'los'], ['los guantes', 'los'], ['las flores', 'las'], ['las llaves', 'las']] }));
    [['¿Compras el pan? / Sí', 'Sí, lo compro.'], ['¿Tienes la mochila? / Sí', 'Sí, la tengo.'], ['¿Lees los periódicos? / No', 'No, no los leo.'], ['¿Buscas las llaves? / Sí', 'Sí, las busco.']]
      .forEach(([q, a], i) => put(s, '.g1', writeItem({ id: 'g1-' + i, sec: 'gram', skill: 'pro', prompt: q + ' ' + say(q.split(' / ')[0]), answers: [a] })));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'dec', title: 'decir 현재형을 쓰세요.', cls: 'table2', text:
      [['yo', 'digo'], ['tú', 'dices'], ['él / ella / usted', 'dice'], ['nosotros/as', 'decimos'], ['vosotros/as', 'decís'], ['ellos / ellas / ustedes', 'dicen']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'hay', title: 'hay 또는 estar(활용형)를 쓰세요.', cls: 'lines', text:
      ['[Hay] un libro sobre la mesa.', 'Tu libro [está] sobre la mesa.', '[Hay] una tienda en la calle.', 'Las clases [están] a la izquierda del pasillo.', 'Las ventanas [están] cerradas.', 'En mi mochila [hay] libros.', 'La niña [está] enferma.'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g4', cloze({ id: 'g4', sec: 'gram', skill: 'int', title: '알맞은 의문사를 쓰세요.', cls: 'lines', text:
      ['¿[Quién] es tu padre? — Es el señor alto.', '¿[Cuántas] son las chicas? — Son cinco.', '¿[Cuándo] vienen los profesores? — Mañana.', '¿[Cuáles] son tus padres? — Aquellos.', '¿[Cuánto] dinero tienes tú? — Diez euros.'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '다음 의문문들에 대해 직접목적대명사를 이용하여 대답해보자.', { kr: '교재 해답처럼 목적대명사를 동사 앞에 두어 짧게 대답해요. (os lo · nos la …)' })}
      ${modelo('¿Compras estas flores? / Sí → <b>Sí, las compro.</b>')}<div class="items"></div>`);
    [['1. Papá, ¿nos dejas hoy tu coche? / No', ['No, no os lo dejo hoy.', 'No, no os lo dejo.', 'No, no lo dejo hoy.']],
      ['2. ¿Nos vendéis vuestro coche? / No', ['No, no os lo vendemos.', 'No, no lo vendemos.']],
      ['3. ¿Nos das tu número de teléfono? / Sí', ['Sí, os lo doy.', 'Sí, lo doy.']],
      ['4. ¿Os explica el profesor la gramática? / Sí', ['Sí, nos la explica.', 'Sí, la explica.']]]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'e1-' + i, sec: 'e1', skill: 'pro', prompt: p, ph: '→', answers: a })));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '다음 빈칸에 동사 decir나 hablar 중 올바른 것을 선택해서 인칭에 맞는 활용형을 넣어보자.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e2c', sec: 'e2', skill: 'dec', cls: 'lines', text: [
      '1. 우리들은 프랑스어를 말한다. — Nosotros [hablamos] francés.', '2. 그들은 말을 많이 한다. — Ellos [hablan] mucho.', '3. 너는 그것을 말하지 않는다. — Tú no lo [dices].',
      '4. 너희들은 너희들의 친구들에 대해 좋게 말한다. — Vosotros [habláis] bien de vuestros amigos.', '5. 나는 그가 온다고 말한다. — Yo [digo] que él viene.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '주어진 문장에 hay가 있으면 estar가 들어있는 문장으로 바꾸고, estar가 있으면 hay가 들어있는 문장으로 바꾸어 보세요.', { kr: 'hay → estar 로 바꿀 때는 정관사(el, la, los, las)로!' })}<div class="items"></div>`);
    [['1. Debajo de mi casa hay un bar.', ['El bar está debajo de mi casa.']],
      ['2. El cine está a la derecha.', ['A la derecha hay un cine.', 'Hay un cine a la derecha.']],
      ['3. En la playa hay mucha gente.', ['La gente está en la playa.']],
      ['4. El parque está delante del museo.', ['Delante del museo hay un parque.', 'Hay un parque delante del museo.']],
      ['5. Dentro del cajón hay unos guantes.', ['Los guantes están dentro del cajón.']]]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'e3-' + i, sec: 'e3', skill: 'hay', prompt: `${p} ${say(p.slice(3))}`, ph: '→', answers: a })));
  };
  B.e4 = () => {
    const s = sec('e4', `${ejHead(4, '의문사를 넣어 의문문을 완성하고, 각자 자유롭게 대답해보세요.')}<div class="c"></div><h3 class="h3">B: 자유롭게 대답하기</h3><div class="items f"></div>`);
    put(s, '.c', cloze({ id: 'e4c', sec: 'e4', skill: 'int', cls: 'lines', text: [
      '1. A: ¿[Cuándo] termina la clase de español?', '2. A: ¿[Cuál] de estos relojes es de oro?', '3. A: ¿[Quién] te invita a la fiesta?', '4. A: ¿[Cuántos] días tiene una semana?'].map(x => `<p>${x}</p>`).join('') }));
    [['¿Cuándo termina la clase de español?', [{ re: 'termina', label: 'termina …' }, { re: 'a las|a la una|hoy|ma[nñ]ana|pronto|\\d', label: '시간 표현' }], 'Termina a las tres de la tarde.'],
      ['¿Cuál de estos relojes es de oro?', [{ re: 'es de oro|este|ese|aquel', label: 'este / ese / aquel … (es de oro)' }], 'Este reloj es de oro.'],
      ['¿Quién te invita a la fiesta?', [{ re: 'me invita|me invitan', label: '… me invita' }], 'Mi amiga Ana me invita a la fiesta.'],
      ['¿Cuántos días tiene una semana?', [{ re: 'siete', label: 'siete' }, { re: 'd[ií]as', label: 'días' }], 'Una semana tiene siete días.']]
      .forEach(([q, m, md], i) => put(s, '.f', freeItem({ id: 'e4f' + i, sec: 'e4', skill: 'int', line: true, prompt: `${i + 1}. B: ${q} ${say(q)}`, ph: 'B: …', must: m, model: md })));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, 'Hay 혹은 estar를 써서 사진의 장소를 묘사해보세요.')}
      ${tip('막연한 존재는 <b>Hay</b> + un/una/muchos …, 특정한 것의 위치는 <b>el/la … está(n)</b> + 위치 표현.')}
      <div class="items"></div>`);
    [['🏢💻🪑🪜💡<small>현대적인 사무실 — 계단, 컴퓨터 두 대, 책상, 의자, 둥근 조명, 소파</small>', 'Hay dos ordenadores sobre la mesa. Las escaleras están detrás de la mesa. Hay muchas lámparas redondas. Las sillas están al lado de la mesa.', 'ordenador|computador|mesa|escritorio|silla|escalera|l[aá]mpara|sof[aá]|sill[oó]n'],
      ['🏘️🌳⛱️🕰️🚶<small>오래된 거리 — 알록달록한 건물, 나무, 파라솔 테라스, 시계, 사람들</small>', 'Hay muchas personas en la calle. Hay un árbol delante de los edificios. El reloj está encima de la tienda. Hay una terraza con sombrillas.', 'calle|edificio|[aá]rbol|reloj|gente|personas|terraza|tienda|casa']]
      .forEach(([sc, md, kw], i) => put(s, '.items', freeItem({ id: 'ac1-' + i, sec: 'ac1', skill: 'hay', rows: 3, prompt: `<div class="scene">${sc}</div>`, ph: 'Hay … / El … está …',
        must: [{ re: HAY, label: 'hay' }, { re: ESTAR, label: 'está / están' }, { re: '(enfrente|delante|detr[aá]s|encima|debajo|dentro|al lado|a la izquierda|a la derecha) de|sobre', label: '위치 표현' }, { re: kw, label: '사진 속 사물 2개 이상', min: 2 }], model: md })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '그림을 보고 질문에 답해보세요.')}<div class="items"></div>`);
    [['🕗🎒🚪', '(1) ¿Cuándo llegas a la clase?', [{ re: 'llego', label: 'Llego …' }, { re: 'a las|a la una|temprano|tarde|por la ma[nñ]ana', label: '시간 표현' }], 'Llego a la clase a las ocho y media.'],
      ['🌲🌲🌲', '(2) ¿De qué color es el bosque?', [{ re: 'verde', label: 'verde' }], 'Es verde.'],
      ['👩🧥🏷️', '(3) ¿Cuánto vale esta chaqueta?', [{ re: 'vale|cuesta', label: 'Vale / Cuesta …' }, { re: 'euros?|d[oó]lares?|wones?|pesos?', label: '화폐 단위' }], 'Vale cincuenta euros.'],
      ['👩‍🍳🍳', '(4) ¿Quién te prepara el desayuno?', [{ re: 'me prepara', label: '… me prepara el desayuno' }], 'Mi madre me prepara el desayuno.']]
      .forEach(([e, q, m, md], i) => put(s, '.items', freeItem({ id: 'ac2-' + i, sec: 'ac2', skill: 'int', line: true, prompt: `<span class="photo-emo">${e}</span> ${q} ${say(q.slice(4))}`, ph: '대답을 쓰세요', must: m, model: md })));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '다음 표현들을 이용하여 말해보자.')}<div class="items"></div>`);
    [['(1) tener lugar', 'tiene lugar|tienen lugar', 'La reunión de vecinos tiene lugar a las ocho.'], ['(2) comprar', 'compr[oa]|compramos|compr[aá]is|compran|compras|comprar', 'Compro pan en la panadería.'],
      ['(3) en voz alta', 'en voz alta', 'El profesor lee el texto en voz alta.'], ['(4) menos mal', 'menos mal', '¡Menos mal que hay muchos taxis libres!']]
      .forEach(([p, re, md], i) => put(s, '.items', freeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'voc', line: true, prompt: `<b>${p}</b>`, ph: '문장을 쓰세요', must: [{ re, label: p.slice(4) }], minWords: 4, model: md })));
  };
  B.ac4 = () => {
    const W = ['parque', 'hospital', 'escuela', 'centro comercial', 'calle', 'tranquilo', 'ruidoso', 'grande', 'pequeño'];
    const s = sec('ac4', `${acHead(4, '다음에 제시된 단어들을 이용하여 친구들과 함께 각자 자기가 사는 동네를 묘사해 보자.')}
      <div class="ybox wordbank">${W.map(w => `<span>${w}</span>`).join('')}</div>
      ${modelo('Mi barrio es <b>tranquilo</b>. <b>Hay</b> un <b>parque</b> grande y una <b>escuela</b>. El <b>hospital está</b> al lado del <b>centro comercial</b>.')}<div class="f"></div>`);
    put(s, '.f', freeItem({ id: 'ac4f', sec: 'ac4', skill: 'hay', rows: 5, prompt: '우리 동네를 4문장 이상으로 묘사하세요.', ph: 'Mi barrio es …',
      must: [{ re: W.map(w => SC.rx(w)).join('|'), label: '제시 단어 4개 이상', min: 4 }, { re: HAY, label: 'hay' }, { re: ESTAR, label: 'está / están' }], minWords: 30,
      model: 'Mi barrio es pequeño pero tranquilo. Hay un parque grande y una escuela. El hospital está al lado del centro comercial. La calle principal es un poco ruidosa, pero me gusta mi barrio.' }));
  };
  B.ac5 = () => {
    const W = ['aula', 'alumno', 'profesor', 'clase', 'actividad deportiva', 'excursión', 'cancha', 'árbol', 'edificio', 'salón de actos', 'gimnasio'];
    const s = sec('ac5', `${acHead(5, '다음에 제시된 단어들을 이용하여 친구들과 함께 자신이 다니는 학교를 묘사해 보자.')}
      <div class="ybox wordbank">${W.map(w => `<span>${w}</span>`).join('')}</div>
      ${modelo('Mi escuela es grande. <b>Hay</b> tres <b>edificios</b> y un <b>gimnasio</b>. Mi <b>aula está</b> en el segundo piso. <b>¿Cuántos alumnos hay</b> en tu clase?')}<div class="f"></div>`);
    put(s, '.f', freeItem({ id: 'ac5f', sec: 'ac5', skill: 'hay', rows: 5, prompt: '우리 학교를 4문장 이상으로 묘사하세요.', ph: 'Mi escuela es …',
      must: [{ re: W.map(w => SC.rx(w)).join('|'), label: '제시 단어 4개 이상', min: 4 }, { re: HAY, label: 'hay' }, { re: ESTAR, label: 'está / están' }], minWords: 30,
      model: 'Mi escuela es grande y moderna. Hay tres edificios, un gimnasio y una cancha de fútbol. Delante del salón de actos hay muchos árboles. Mi aula está en el segundo piso. En mi clase hay veinte alumnos y el profesor es muy simpático.' }));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('siesta', [
      { e: '😴🌞', h: '낮잠 문화', t: 'siesta는 스페인, 이탈리아, 그리스 등 지중해 연안 국가와 중남미 여러 나라에서 오래전부터 이어져 온 <b>생활 습관</b>이다.' },
      { e: '🕛', h: '어원 — hora sexta', t: '라틴어 <b>\'hora sexta\'</b>(6번째 시간)에서 유래했다. 해가 뜬 뒤 6번째 시간, 즉 <b>낮 12시 무렵</b>을 뜻해 정오 무렵에 자는 낮잠을 말한다.' },
      { e: '⏰', h: '스페인의 하루', t: '점심 식사 후 짧게는 <b>20분</b>, 길게는 <b>2시간</b> 정도 낮잠을 잔다. 오후 2시 점심 → 5시까지 휴식 → 5시부터 다시 일해 <b>저녁 8시</b> 무렵 일과가 끝났다.' },
      { e: '🏙️', h: '오늘날의 siesta', t: '바쁜 대도시보다는 시골이나 지방 소도시에서 흔히 볼 수 있고, 요즘은 다른 나라의 일과 시간에 맞추려는 움직임이 활발하다.' }
    ], '스페인의 낮잠 문화로 잘 알려진 siesta — 스페인만의 독특한 하루 일과 시간을 만들어 냈어요.') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['siesta 의 어원은?', ['hora sexta', 'hora siesta', 'sexto día', 'seis horas'], 'hora sexta', '라틴어 — 6번째 시간(낮 12시 무렵)'],
      ['스페인에서 siesta 는 보통 언제 자나요?', ['점심 식사 후', '아침 식사 전', '저녁 식사 후', '자정 무렵'], '점심 식사 후', '짧게는 20분, 길게는 2시간'],
      ['전통적으로 스페인의 하루 일과가 끝나는 시각은?', ['저녁 8시 무렵', '오후 2시', '오후 5시', '밤 11시'], '저녁 8시 무렵', '오후 5시부터 다시 일해 8시 무렵 끝나요.'],
      ['오늘날 siesta 를 더 흔히 볼 수 있는 곳은?', ['시골 · 지방 소도시', '대도시 중심가', '국제공항', '대학교'], '시골 · 지방 소도시', '']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex || undefined })));
  };

  SC.lesson({
    num: '04',
    title: '¿Cuántos árboles hay en el jardín?',
    ttsTest: '¿Cuántos árboles hay en el jardín?',
    cover: {
      emoji: '🏡🌳<small>🌸 🚕</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#c2410c)',
      tema: ['La casa y el jardín', 'El barrio y la escuela', 'La hora y el transporte'],
      com: ['직접목적대명사: Lo tenemos. · Sí, la compro.', 'estar와 hay의 비교: El niño está en el patio. · Hay un niño en el patio.', '의문사(2) cuál, quién, cuándo, cuánto: ¿Cuándo vienen los profesores? · ¿Cuántas son las chicas?'],
      gram: ['직접목적대명사 me, te, lo/la, nos, os, los/las', '<i>decir</i> vs <i>hablar</i>', '<i>estar</i> vs <i>hay</i>', '의문사: cuándo, cuál, quién, cuánto']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Vicente: { g: 'm', av: '🧔🏻', side: 'l' }, Laura: { g: 'f', av: '👩🏽', side: 'r' },
      Pedro: { g: 'm', av: '🧑🏻', side: 'l' }, Ana: { g: 'f', av: '👩🏻‍🦰', side: 'r' }
    },
    errLabels: { pronombre: '목적대명사 lo · la · los · las', hayestar: 'hay / estar 구분', conjugacion: 'decir · hablar 변화', interrogativo: '의문사 선택' },
    errTips: {
      acento: 'cuándo, cuál, quién, cuántos (의문사), está, están, jardín, árbol, allí, ahí, aquí … 악센트도 철자예요.',
      pronombre: '명사의 성 · 수에 맞춰: el coche → lo, la casa → la, los libros → los, las flores → las (동사 앞!)',
      hayestar: 'Hay + un/una/숫자/무관사 (막연한 존재) · el/la/mi … + está(n) (특정한 것의 위치)',
      conjugacion: 'decir: digo, dices, dice, decimos, decís, dicen / hablar: hablo, hablas, habla …',
      interrogativo: 'cuándo 언제 · cuál 어느 것 · quién 누구 · cuánto(s)/cuánta(s) 얼마나'
    },
    classify(ti, ta) {
      const P = ['lo', 'la', 'los', 'las', 'me', 'te', 'nos', 'os', 'le', 'les'];
      const pi = ti.filter(w => P.includes(w)), pa = ta.filter(w => P.includes(w));
      if (pa.length && pi.join() !== pa.join() && (ta[0] === 'sí' || ta[0] === 'no')) return 'pronombre';
      const hi = ti.includes('hay'), ha = ta.includes('hay');
      if (hi !== ha) return 'hayestar';
      const Q = /^(cu[aá]ndo|cu[aá]les?|qui[eé]n(es)?|cu[aá]nt[oa]s?)$/;
      const qi = ti.find(w => Q.test(w)), qa = ta.find(w => Q.test(w));
      if (qa && qi && qi.normalize('NFD').replace(/[̀-ͯ]/g, '') !== qa.normalize('NFD').replace(/[̀-ͯ]/g, '')) return 'interrogativo';
      const V = /^(digo|dices|dice|decimos|dec[ií]s|dicen|hablo|hablas|habla|hablamos|habl[aá]is|hablan)$/;
      const vi = ti.find(w => V.test(w)), va = ta.find(w => V.test(w));
      if (va && vi !== va) return 'conjugacion';
      return null;
    },
    errRules: [
      { re: W0 + 'hay (el|la|los|las|mi|tu|su|mis|tus|sus)' + W1, t: 'hayestar', msg: 'hay 뒤에는 정관사 · 소유사 ✕ → "Hay un …" 또는 "El … está"' },
      { re: W0 + '(un|una|unos|unas) [a-záéíóúñ]+ est[aá]n?' + W1, t: 'hayestar', msg: '막연한 대상의 존재 → "Hay un …"' },
      { re: W0 + '(hayn|hayan est|estan hay)' + W1, t: 'hayestar', msg: 'hay 는 변하지 않아요' },
      { re: W0 + '(dico|deco|dezo|decen)' + W1, t: 'conjugacion', msg: 'decir: digo, dice, dicen' }
    ],
    accWords: ['jardín', 'árbol', 'árboles', 'allí', 'ahí', 'aquí', 'están', 'quiénes', 'cuántos', 'cuántas', 'decís', 'habláis', 'teléfono', 'gramática', 'excursión', 'cajón'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Mi casa y mi barrio → 글로 쓰기',
        icons: ['🏡', '🌳', '🏘️'],
        questions: ['¿Dónde está tu casa? ¿Cómo es? (grande, pequeña, antigua, moderna…)', '¿Qué hay en tu casa o delante de tu casa? ¿Cuántas habitaciones hay?', '¿Qué hay en tu barrio? ¿Dónde están las tiendas, el parque, la escuela?'],
        minWords: 50,
        hint: 'hay 와 estar 를 구분해서 쓰고, 의문사 질문(¿Cuántos …? ¿Cuál …?)에 모두 답하면 높은 점수!',
        ph: 'Mi casa está en la calle … Es bastante grande, pero …',
        connectors: ['y', 'pero', 'también', 'además', 'porque', 'entonces', 'solo'],
        rubric: [
          { k: 'cas', label: '집 · 동네 묘사 (형용사)', max: 8, re: 'grande|peque[nñ][oa]|antigu[oa]|modern[oa]|bonit[oa]|tranquil[oa]|ruidos[oa]|barat[oa]|c[oó]mod[oa]', min: 2, ax: 'Contenido' },
          { k: 'lug', label: '장소 · 물건 4개 이상', max: 8, re: 'jard[ií]n|[aá]rbol(es)?|flores?|piscina|garaje|habitaci[oó]n(es)?|cocina|ba[nñ]o|sal[oó]n|parque|escuela|hospital|tienda|calle|centro comercial|supermercado|cine', min: 4, ax: 'Contenido' },
          { k: 'hay', label: 'hay + un/una/숫자 (2번 이상)', max: 12, re: 'hay', min: 2, ax: 'Gramática' },
          { k: 'est', label: 'el/la … está(n) + 위치 (2번 이상)', max: 12, re: 'est[aá]n?', min: 2, ax: 'Gramática' },
          { k: 'num', label: '수량 (tres, muchos, cuántos …)', max: 6, re: 'un[oa]?|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|much[oa]s|poc[oa]s|\\d+', min: 2, ax: 'Gramática' }
        ],
        model: 'Mi casa está en la calle Mayor, número cinco. Es bastante grande, pero antigua. Hay tres habitaciones, una cocina y dos baños. Delante de la casa hay un jardín pequeño con muchas flores. En mi barrio hay un parque, un hospital y muchas tiendas. La escuela está al lado del parque. Mi barrio es tranquilo y me gusta mucho.'
      }
    },
    build: B
  });
})();
