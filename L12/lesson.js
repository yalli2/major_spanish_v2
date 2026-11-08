/* Lección 12 · De joven trabajaba en una compañía multinacional — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 163~176쪽 : Diálogo → Vocabulario·Contesta → Lectura(La tesis de Nancy) → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~3) → Actividades 1~4 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .duo{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;background:#fff;border:1px solid #e3e3e3;border-radius:14px;padding:12px;margin:10px 0}
    .duo .fr{background:linear-gradient(135deg,#eaf6ff,#fff8e6);border-radius:12px;text-align:center;padding:10px 6px}
    .duo .fr span{font-size:44px;display:block;line-height:1.2}.duo .fr b{font-size:14px;color:#5b2a1c}.duo .fr small{display:block;color:#888;font-size:12px}
    .duo .ar{font-size:22px;color:#e8590c;font-weight:900}
    .tl12{position:relative;margin:12px 0 6px;padding:26px 8px 8px;background:#fff;border:1px solid #e3e3e3;border-radius:12px}
    .tl12 .ln{position:absolute;left:16px;right:16px;top:52px;height:4px;background:#ddd;border-radius:2px}
    .tl12 .row{display:flex;justify-content:space-around;position:relative}
    .tl12 .ev{text-align:center;font-size:13px;max-width:46%}.tl12 .ev i{display:block;font-style:normal;font-size:12px;margin-bottom:4px}
    .tl12 .wave{height:14px;margin:6px 0;border-radius:7px;background:repeating-linear-gradient(90deg,#2a8bd0 0 18px,#7cc0ee 18px 36px)}
    .tl12 .pt{display:inline-block;width:22px;height:22px;border-radius:50%;background:#d6202f;border:3px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.3)}
    .resto{font-size:58px;text-align:center;background:linear-gradient(180deg,#3b3a3f,#6b5a4a);border-radius:14px;padding:18px;letter-spacing:.12em;margin:8px 0}
    .resto small{display:block;font-size:13px;color:#f3e7d3;letter-spacing:0;margin-top:6px}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      imp: 'Imperfecto 불완료과거 형태',
      uso: 'Uso del imperfecto 용법',
      asp: 'Indefinido vs Imperfecto 구분',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '공원 벤치의 두 노인', group: 'Diálogo y Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo y Lectura' },
      { id: 'lec', label: 'Lectura', kr: 'La tesis de Nancy', group: 'Diálogo y Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo y Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo y Lectura' },
      { id: 'gram', label: 'Gramática', kr: '불완료과거 · 단순과거와 구분', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '불완료과거로 활용', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '알맞은 동사 형태 고르기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '문맥에 맞는 과거형', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'ac1', label: 'Actividades 1', kr: '단순과거 / 불완료과거 분류표', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '어린 시절 질문에 답하기', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '두 그림 연결 — mientras', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'ac4', label: 'Actividades 4', kr: 'Juan의 레스토랑 V / F', group: 'Actividades', kind: 'ac', n: 4 },
      { id: 'cultura', label: 'Cultura', kr: '태양은 어떻게 하늘로 올라갔을까?', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Juan', es: '¿Qué [hacías] de joven?' },
      { who: 'José', es: '[Trabajaba] en una compañía [multinacional] en la capital. [Pasaba] 10 horas en la oficina frente al ordenador y entre papeles [amontonados]. A veces me [quedaba] trabajando hasta muy tarde. Esas tardes no [tenía] tiempo ni para cenar y a menudo me [conformaba] con un bocadillo. Claro, tomaba mucho café.' },
      { who: 'Juan', es: '[Era] muy duro, ¿verdad?' },
      { who: 'José', es: 'Sí, pero me [gustaba] mi trabajo. Luego pensé que no estaba suficiente tiempo con mi mujer y mis hijos. Y, [físicamente], me sentía muy cansado porque no [hacía] ningún ejercicio tampoco.' },
      { who: 'Juan', es: 'Entonces, ¿qué [hiciste]?' },
      { who: 'José', es: '[Dejé] el trabajo. Nos [mudamos] a este pueblo. Al principio, mis hijos se [quejaban], pero después se [adaptaron] pronto a la nueva vida. Hemos podido pasar más tiempo juntos. Por supuesto, perdí otras muchas cosas, pero no me [arrepiento] de esa [decisión].' }
    ],
    lectura: [
      'Pasamos por Rota, una ciudad histórica y famosa por su vino tinto. Esto me recuerda a Mistress Dawson. Ella siempre confunde los géneros de las palabras, y no la culpo, porque a veces me pasa a mí. Ella quería comprar tinta y fue a una tienda y pidió una botella de tinto. El comerciante le dijo que lo vendían en la tienda de al lado. Ella pasó allí y pidió su botella de tinto. Se la dieron, y Mrs. Dawson, en su casa, llenó el tintero y trató inútilmente de escribir. Estaba escandalizada por la mala calidad de la tinta española.',
      'Vimos en Rota otro castillo. Cuando íbamos a entrar por la puerta principal, nos hicimos a un lado para dejar paso no a un hidalgo ni a una infanta o cardenal, sino a un borrico con adornos y, además, con un sombrero de paja contra el sol.',
      'Entramos. Había un muro ancho de piedra con un perro dormitando al pie y dos lagartos sobre las piedras tomando el sol.',
      'En el castillo no vimos nada notable más que el borrico. Pero cuando salíamos, encontramos en un patio quince o veinte chicos entre ocho y diez años. Era el patio de la escuela.'
    ],

    voc1: [
      { es: 'hacer ejercicio', kr: '운동하다', e: '🏋️' }, { es: 'banco', kr: '벤치', e: '🪑' }, { es: 'multinacional', kr: '다국적의', e: '🌐' },
      { es: 'mudarse', kr: '이사하다', e: '🚚' }, { es: 'amontonado', kr: '수북이 쌓인', e: '📚' }, { es: 'conformarse con', kr: '~으로 만족하다', e: '🥪' },
      { es: 'adaptarse', kr: '적응하다', e: '🦎' }, { es: 'arrepentirse de', kr: '~을 후회하다', e: '😔' }, { es: 'físicamente', kr: '육체적으로', e: '💪' },
      { es: 'decisión', kr: '결정', e: '⚖️' }, { es: 'sentirse + 형용사', kr: '(기분·감정을) ~하게 느끼다', e: '😌' }
    ],
    voc2: [
      { es: 'hacerse a un lado', kr: '한 곁으로 비키다', e: '↔️' }, { es: 'recordar A a B', kr: 'A에게 B를 상기시키다', e: '💭' }, { es: 'confundir', kr: '혼동하다', e: '😵‍💫' },
      { es: 'género', kr: '(단어의) 성', e: '⚥' }, { es: 'culpar', kr: '비난하다', e: '👉' }, { es: 'tinta', kr: '잉크', e: '🖋️' },
      { es: 'comerciante', kr: '상인', e: '🧑‍💼' }, { es: 'tintero', kr: '잉크병', e: '🫙' }, { es: 'tratar de + 동사원형', kr: '~하려고 노력하다', e: '💪' },
      { es: 'escandalizado', kr: '호들갑 떠는', e: '😱' }, { es: '(vino) tinto', kr: '붉은 포도주', e: '🍷' }, { es: 'dejar paso', kr: '길을 양보하다', e: '🚶' },
      { es: 'hidalgo', kr: '시골 귀족', e: '🎩' }, { es: 'infanta', kr: '공주', e: '👸' }, { es: 'cardenal', kr: '추기경', e: '⛪' },
      { es: 'borrico', kr: '당나귀', e: '🫏' }, { es: 'dormitar', kr: '꾸벅꾸벅 졸다', e: '😴' }, { es: 'al pie', kr: '가까이에', e: '🦶' },
      { es: 'tomar el sol', kr: '햇볕을 쬐다', e: '🌞' }
    ],
    amplia: [
      { es: 'mercado', kr: '시장', e: '🏪' }, { es: 'travieso', kr: '장난이 심한', e: '😜' }, { es: 'oler', kr: '냄새가 나다', e: '👃' },
      { es: 'collar', kr: '목걸이', e: '📿' }, { es: 'cliente', kr: '의뢰인, 고객', e: '🤝' }, { es: 'documento', kr: '서류, 문서', e: '📄' },
      { es: 'cultivar', kr: '재배하다, 경작하다', e: '🌱' }, { es: 'patata', kr: '감자', e: '🥔' }, { es: 'dar abrazos', kr: '포옹하다', e: '🤗' },
      { es: 'empujar', kr: '밀다, 떠밀다', e: '🫸' }, { es: 'mascota', kr: '애완동물', e: '🐶' }, { es: 'poner la mesa', kr: '상 차리다', e: '🍽️' }
    ],

    /* 쓰기 모의시험 Parte A 문제은행 */
    examBank: [
      { p: 'De niño, yo ____ al pueblo cada verano. <i>(ir)</i>', a: ['iba'], s: 'imp' },
      { p: 'Nosotros ____ en el parque todos los días. <i>(jugar)</i>', a: ['jugábamos'], s: 'imp' },
      { p: 'Mis abuelos ____ en el campo. <i>(vivir)</i>', a: ['vivían'], s: 'imp' },
      { p: 'De pequeña, mi hermana ____ muy traviesa. <i>(ser)</i>', a: ['era'], s: 'imp' },
      { p: '¿Qué ____ tú de joven? <i>(hacer)</i>', a: ['hacías'], s: 'imp' },
      { p: 'Antes nosotros ____ muchas películas. <i>(ver)</i>', a: ['veíamos'], s: 'imp' },
      { p: 'Vosotros siempre ____ a las ocho. <i>(cenar)</i>', a: ['cenabais'], s: 'imp' },
      { p: 'Ellos siempre ____ temprano. <i>(salir)</i>', a: ['salían'], s: 'imp' },
      { p: '____ las 5 de la tarde. <i>(ser · 과거 시각)</i>', a: ['eran'], s: 'uso' },
      { p: 'Yo ____ 15 años entonces. <i>(tener · 과거 나이)</i>', a: ['tenía'], s: 'uso' },
      { p: '____ mucho calor en la playa. <i>(hacer · 과거 묘사)</i>', a: ['hacía'], s: 'uso' },
      { p: 'La habitación ____ llena de rosas. <i>(estar · 묘사)</i>', a: ['estaba'], s: 'uso' },
      { p: 'Cuando los policías ____ a casa, la puerta estaba abierta. <i>(llegar)</i>', a: ['llegaron'], s: 'asp' },
      { p: 'Mientras ____ al supermercado, Juan se encontró con un amigo. <i>(ir)</i>', a: ['iba'], s: 'asp' },
      { p: 'Sonó el móvil, mientras ____ la siesta. <i>(dormir, yo)</i>', a: ['dormía'], s: 'asp' },
      { p: 'El lunes pasado ____ una reunión importante. <i>(tener, nosotros)</i>', a: ['tuvimos'], s: 'asp' },
      { p: 'Ayer volví pronto a casa porque ____ enfermo. <i>(estar, yo)</i>', a: ['estaba'], s: 'asp' },
      { p: 'Normalmente tomaba café, pero aquella mañana ____ té. <i>(tomar, ella)</i>', a: ['tomó'], s: 'asp' },
      { p: 'Mientras jugaba al baloncesto, ____ un brazo. <i>(romperse, él)</i>', a: ['se rompió'], s: 'asp' },
      { p: 'José ____ en una compañía multinacional. <i>(trabajar)</i>', a: ['trabajaba'], s: 'imp' },
      { p: 'Antes ____ más que ahora. <i>(llover)</i>', a: ['llovía'], s: 'imp' }
    ]
  };

  const B = {};
  const IMP = '[a-záéíóúñ]+(aba|abas|ábamos|abais|aban|ía|ías|íamos|íais|ían)|era|eras|éramos|erais|eran|iba|ibas|íbamos|ibais|iban';

  /* ---------- Diálogo ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'Dos ancianos hablan sentados en un banco de un parque.')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 동사·핵심 어휘를 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🕰️ 호세의 인생 타임라인 — 이야기 순서대로 누르세요</h3><div class="item sortq"><div class="sort-line"></div><div class="sort-bank"></div><div class="item-row"><button class="btn ghost rst">다시</button><button class="btn chk">확인</button><span class="mkbox"></span></div></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'imp', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    const ORD = ['Trabajaba en la capital.', 'Se sentía muy cansado.', 'Dejó el trabajo.', 'Se mudaron al pueblo.', 'Sus hijos se adaptaron.'];
    reg('d1-sort', 'd1', 'com');
    const sq = $('.sortq', s); let ord = [];
    const draw = () => {
      ord = []; $('.sort-line', sq).innerHTML = '';
      $('.sort-bank', sq).innerHTML = shuffle(ORD).map(f => `<button class="tok">${f}</button>`).join('');
      $$('.sort-bank .tok', sq).forEach(b => b.onclick = () => { if (b.disabled) return; b.disabled = true; ord.push(b.textContent); $('.sort-line', sq).insertAdjacentHTML('beforeend', `<span class="tok in">${ord.length}. ${b.textContent}</span>`); });
    };
    draw();
    $('.rst', sq).onclick = draw;
    $('.chk', sq).onclick = () => { if (ord.length < ORD.length) return; const ok = ord.join() === ORD.join(); record('d1-sort', ok ? 1 : 0, ok ? [] : ['otro'], {}); $('.mkbox', sq).innerHTML = MARK(ok ? 1 : 0) + (ok ? '' : ` <span class="ans">${ORD.join(' › ')}</span>`); };
    ['¿Qué hacías de joven?', 'Era muy duro, ¿verdad?', 'No me arrepiento de esa decisión.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'imp', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.slice(0, 10).forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿En qué trabajaba José cuando era joven?', kw: [['trabajaba', 'Trabajaba … (불완료과거)'], ['compa[nñ][ií]a multinacional', 'una compañía multinacional']], model: 'Trabajaba en una compañía multinacional en la capital.' },
      { q: '¿Podía José regresar temprano a casa todos los días?', kw: [['^\\s*no' + W1, 'No, …'], ['quedaba|tarde', 'se quedaba trabajando hasta tarde']], model: 'No, a veces se quedaba trabajando hasta muy tarde.' },
      { q: '¿Por qué decidió José dejar su trabajo y mudarse al pueblo con su familia?', kw: [['porque', 'Porque …'], ['tiempo|familia|mujer|hijos|cansado', '가족과의 시간 / 피곤함']], model: 'Porque no estaba suficiente tiempo con su mujer y sus hijos, y se sentía muy cansado.' },
      { q: '¿Al principio estaban contentos sus hijos con la nueva vida?', kw: [['^\\s*no' + W1, 'No, …'], ['quejaban', 'se quejaban']], model: 'No, al principio se quejaban.' },
      { q: '¿Está arrepentido José de su decisión de dejar el trabajo?', kw: [['^\\s*no' + W1, 'No, …'], ['arrepient|arrepentido', 'no se arrepiente / no está arrepentido']], model: 'No, no se arrepiente de esa decisión.' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lec = () => {
    const s = sec('lec', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <div class="lslot"></div>
      <p class="small">[Texto adaptado de <i>La tesis de Nancy</i> (1962) de Ramón J. Sender]</p>
      ${tip('<b>tinta</b>(잉크, 여성) ↔ <b>tinto</b>(붉은 포도주, 남성) — 성(género)을 혼동해서 생긴 웃긴 이야기예요!')}
      <h3 class="h3">① 이야기 속 동사 분류 — 단순과거(사건) vs 불완료과거(묘사·배경)</h3><div class="sb"></div>
      <h3 class="h3">② ¿Verdadero o falso?</h3><div class="items vf"></div>`);
    put(s, '.lslot', readBlock(D.lectura, { img: '🏰🫏', g: 'm' }));
    put(s, '.sb', sortBoard({ id: 'lecsb', sec: 'lec', skill: 'asp', cols: [{ k: 'P', label: '단순과거 ⚡ (사건)' }, { k: 'I', label: '불완료과거 〰️ (묘사·배경)' }],
      chips: [['pasamos', 'P'], ['quería', 'I'], ['fue', 'P'], ['pidió', 'P'], ['vendían', 'I'], ['dieron', 'P'], ['llenó', 'P'], ['estaba', 'I'], ['íbamos', 'I'], ['había', 'I'], ['salíamos', 'I'], ['encontramos', 'P'], ['era', 'I']] }));
    [['Rota es famosa por su vino tinto.', 'Verdadero'], ['Mrs. Dawson compró una botella de tinta.', 'Falso'], ['Se hicieron a un lado para dejar paso a una infanta.', 'Falso'],
      ['Había un perro dormitando al pie del muro.', 'Verdadero'], ['En el patio de la escuela había chicos entre ocho y diez años.', 'Verdadero']]
      .forEach(([p, a], i) => put(s, '.vf', choiceItem({ id: 'lecvf' + i, sec: 'lec', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: [D.voc2[2], D.voc2[4], D.voc2[5], D.voc2[6], D.voc2[13], D.voc2[15], D.voc2[16], D.voc2[18]].map(v => [v.es, v.kr]) }));
    [D.voc2[0], D.voc2[1], D.voc2[3], D.voc2[7], D.voc2[10], D.voc2[11], D.voc2[12], D.voc2[14]].forEach((v, i) =>
      put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: v.es === '(vino) tinto' ? ['vino tinto', 'tinto'] : [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Qué quería comprar Ms. Dawson y qué compró al final?', kw: [['quer[ií]a comprar tinta|quer[ií]a tinta', 'Quería comprar tinta'], ['tinto', '(vino) tinto']], model: 'Quería comprar tinta y compró una botella de vino tinto.' },
      { q: '¿Qué pensó Ms. Dawson sobre la tinta española?', kw: [['mala calidad', 'mala calidad']], model: 'Pensó que la tinta española era de mala calidad.' },
      { q: '¿Por qué se hicieron al lado cuando intentaba entrar en el castillo?', kw: [['dejar paso|pasar', 'para dejar paso'], ['borrico|burro', 'a un borrico']], model: 'Para dejar paso a un borrico con adornos.' },
      { q: '¿Qué había dentro del castillo?', kw: [['hab[ií]a', 'Había …'], ['muro|perro|lagartos|borrico', '(muro, perro, lagartos)']], model: 'Había un muro ancho de piedra con un perro dormitando y dos lagartos tomando el sol.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 어렸을 때는 …했다 — 불완료과거로 쓰기</h3>${modelo('De pequeño, <b>era</b> muy travieso. <b>Empujaba</b> a mis amigos.<br>Mi abuela <b>cultivaba</b> patatas y yo la <b>ayudaba</b>.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'imp', rows: 3, prompt: '위 단어 2개 이상을 넣어 어린 시절을 2문장으로 쓰세요.', ph: 'De pequeño/a, …',
      must: [{ re: W0 + '(' + IMP + ')' + W1, label: '불완료과거 동사 2번 이상', min: 2 }, { re: D.amplia.map(a => SC.rx(a.es)).join('|') + '|empujaba|cultivaba|ol[ií]a|traviesa|mascotas|patatas', label: 'Amplía 단어 2개 이상', min: 2 }],
      model: 'De pequeña, era muy traviesa y tenía una mascota. Todos los domingos mi abuela cultivaba patatas y yo ponía la mesa.' }));
  };

  /* ---------- Gramática ---------- */
  const conjTab = (verbs, rows, hiFn) => `<table class="gtab"><tr><th></th>${verbs.map(v => `<th>${v}</th>`).join('')}</tr>${rows.map(([p, ...f]) => `<tr><td>${p}</td>${f.map(x => `<td>${hiFn ? hiFn(x) : x}</td>`).join('')}</tr>`).join('')}</table>`;
  const endHi = x => x.replace(/(ábamos|abais|abas|aban|aba|íamos|íais|ías|ían|ía)$/, '<span class="hi">$1</span>');
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 불완료과거 (Pretérito imperfecto) — (1) 규칙동사</h3>
        ${conjTab(['cenar', 'comer', 'salir'], [['1인칭 단수', 'cenaba', 'comía', 'salía'], ['2인칭 단수', 'cenabas', 'comías', 'salías'], ['3인칭 단수', 'cenaba', 'comía', 'salía'], ['1인칭 복수', 'cenábamos', 'comíamos', 'salíamos'], ['2인칭 복수', 'cenabais', 'comíais', 'salíais'], ['3인칭 복수', 'cenaban', 'comían', 'salían']], endHi)}
        ${tip('-ar → <b>-aba</b> (nosotros만 <b>-ábamos</b>) / -er · -ir → 모두 <b>-ía</b> (í 에 악센트!). 1인칭 단수와 3인칭 단수의 형태가 같아요.')}
        <div class="g1"></div></div>
      <div class="gcard"><h3>(2) 불규칙동사 — ser · ir · ver 단 3개!</h3>
        ${conjTab(['ser', 'ir', 'ver'], [['1인칭 단수', 'era', 'iba', 'veía'], ['2인칭 단수', 'eras', 'ibas', 'veías'], ['3인칭 단수', 'era', 'iba', 'veía'], ['1인칭 복수', 'éramos', 'íbamos', 'veíamos'], ['2인칭 복수', 'erais', 'ibais', 'veíais'], ['3인칭 복수', 'eran', 'iban', 'veían']], x => `<span class="hi">${x}</span>`)}
        ${tip('<b>참고</b> 불완료과거시제의 불규칙 형태는 위의 세 가지 동사에서만 나타난다.')}
        <div class="g2"></div></div>
      <div class="gcard"><h3>(3) 용법</h3>
        <p><b>① 과거에 자주 반복되던 행위</b> — "~하곤 했다". 함께 쓰는 표현:</p>
        <div class="chips">${['siempre', 'todos los días', 'a menudo', 'de vez en cuando', 'nunca', 'de pequeño', 'de niño', 'de joven', 'en aquella época', 'antes'].map((c, i) => `<span class="hlc c${i % 3}">${c}</span>`).join('')}</div>
        <table class="gtab">${[['Los Pérez siempre pasaban los veranos en el extranjero.', '페레스 씨 부부는 늘 여름을 외국에서 보내곤 했다.'], ['La señora iba al mercado todos los días.', '그 부인은 매일 시장에 가곤 했다.'], ['María me invitaba a menudo a su casa.', '마리아는 종종 나를 집으로 초대하곤 했다.'], ['El niño nunca quería ir al baño solo por la noche.', '그 아이는 결코 밤에 혼자서 화장실에 가려고 하지 않았다.'], ['De pequeña, era muy traviesa.', '어렸을 때 그녀는 매우 장난이 심했다.']].map(([e, k]) => `<tr><td class="l">${e} ${say(e)}</td><td class="l">${k}</td></tr>`).join('')}</table>
        <p><b>② 과거의 나이와 시간 표현은 반드시 불완료과거를 사용한다.</b></p>
        <table class="gtab">${[['Eran las 5 de la tarde.', '오후 5시였다.'], ['Yo tenía 15 años entonces.', '나는 그때 15살이었다.']].map(([e, k]) => `<tr><td class="l">${e} ${say(e)}</td><td class="l">${k}</td></tr>`).join('')}</table>
        <p><b>③ 과거의 사실이나 상황을 묘사하는 데에 사용한다.</b></p>
        <table class="gtab">${[['El oso era enorme; tenía los ojos oscuros y olía mal.', '곰은 거대했다. 어두운 색깔의 눈을 지니고 있었고 나쁜 냄새가 났다.'], ['La habitación estaba llena de rosas y había una carta entre las flores.', '방은 장미꽃으로 가득 차 있었고 꽃 사이로 편지가 하나 있었다.'], ['Hacía mucho calor en la playa.', '해변은 무척이나 더웠다.']].map(([e, k]) => `<tr><td class="l">${e} ${say(e)}</td><td class="l">${k}</td></tr>`).join('')}</table>
        <div class="items g3"></div></div>
      <div class="gcard"><h3>(4) 단순과거와 불완료과거 구분</h3>
        <p>단순과거는 과거에 이미 <b>완료 혹은 종결된</b> 행위나 사건을 표현한다. 불완료과거는 과거에 <b>반복되거나 지속되었던</b> 행위나 사건을 표현한다.</p>
        <div class="tl12"><div class="row"><div class="ev"><i>불완료과거 〰️ 배경·진행</i><div class="wave"></div>Mientras <b>iba</b> al supermercado,</div><div class="ev"><i>단순과거 ⚡ 사건</i><span class="pt"></span><br>Juan se <b>encontró</b> con un amigo.</div></div></div>
        <table class="gtab">${[['Cuando los policías llegaron a casa, estaba abierta la puerta.', '경찰들이 집에 도착했을 때 문이 열려 있었다.'], ['Mientras iba al supermercado, Juan se encontró con un amigo.', '슈퍼마켓에 가던 중 후안은 친구와 마주쳤다.'], ['Cuando estuvimos en Barcelona, fuimos una vez al Museo de Arte Contemporáneo.', '바르셀로나에 갔을 때 우리는 한 차례 현대 미술 박물관에 갔다.'], ['Cuando vivíamos en Barcelona, solíamos ir al Museo de Arte Contemporáneo.', '바르셀로나에 살 때에 우리는 종종 현대 미술 박물관에 가곤 했다.'], ['Siempre que iba al pueblo, mis tíos me llevaban al río.', '시골에 갈 때면 늘 삼촌들이 나를 강으로 데려가곤 했다.']].map(([e, k]) => `<tr><td class="l">${e} ${say(e)}</td><td class="l">${k}</td></tr>`).join('')}</table>
        ${tip('신호어 — 단순과거: <b>ayer, el lunes pasado, aquel día, una vez, de repente</b> / 불완료과거: <b>siempre, todos los años, normalmente, antes, mientras</b>')}
        <div class="items g4"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'imp', title: '불완료과거 규칙 변화표를 완성하세요.', cls: 'caltab', text:
      `<table class="gtab"><tr><th></th><th>hablar</th><th>beber</th><th>vivir</th></tr>${[['yo', 'hablaba', 'bebía', 'vivía'], ['tú', 'hablabas', 'bebías', 'vivías'], ['él / ella / usted', 'hablaba', 'bebía', 'vivía'], ['nosotros/as', 'hablábamos', 'bebíamos', 'vivíamos'], ['vosotros/as', 'hablabais', 'bebíais', 'vivíais'], ['ellos / ellas / ustedes', 'hablaban', 'bebían', 'vivían']].map(([p, a, b, c], i) => `<tr><td>${p}</td><td>${i % 2 ? `[${a}]` : a}</td><td>${i % 2 ? b : `[${b}]`}</td><td>[${c}]</td></tr>`).join('')}</table>` }));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'imp', title: 'ser · ir · ver 의 불완료과거를 쓰세요.', cls: 'lines', text:
      ['De niño, yo [era] muy tímido. <i>(ser)</i>', 'Nosotros [íbamos] a la playa todos los veranos. <i>(ir)</i>', 'Mis padres [veían] la tele por la noche. <i>(ver)</i>', '¿Tú [ibas] al colegio en autobús? <i>(ir)</i>', 'Vosotros [erais] muy buenos amigos. <i>(ser)</i>', 'Ana [veía] a su abuela los domingos. <i>(ver)</i>'].map(x => `<p>${x}</p>`).join('') }));
    [['🕔 오후 5시였다.', ['Eran las 5 de la tarde.', 'Eran las cinco de la tarde.']], ['🎂 나는 그때 15살이었다.', ['Yo tenía 15 años entonces.', 'Tenía 15 años entonces.', 'Yo tenía quince años entonces.', 'Tenía quince años entonces.']], ['🏖️ 해변은 무척 더웠다.', ['Hacía mucho calor en la playa.']], ['🛒 그 부인은 매일 시장에 가곤 했다.', ['La señora iba al mercado todos los días.']]]
      .forEach(([p, a], i) => put(s, '.g3', writeItem({ id: 'g3-' + i, sec: 'gram', skill: 'uso', prompt: p, answers: a })));
    [['Cuando llegamos a casa, ____ cerrada la puerta. (estar)', 'estaba', ['estaba', 'estuvo']], ['Mientras ____ al trabajo, se encontró con un amigo. (ir)', 'iba', ['iba', 'fue']], ['Cuando estuvimos en Barcelona, ____ una vez al museo. (ir)', 'fuimos', ['fuimos', 'íbamos']], ['Siempre que iba al pueblo, mis tíos me ____ al río. (llevar)', 'llevaban', ['llevaron', 'llevaban']]]
      .forEach(([p, a, o], i) => put(s, '.g4', choiceItem({ id: 'g4-' + i, sec: 'gram', skill: 'asp', prompt: p, options: o, answer: a })));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '괄호 안의 동사를 불완료과거로 활용하세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1', sec: 'e1', skill: 'imp', cls: 'lines', text: [
      '1. De niños, [iba] <i>(ir, yo)</i> al pueblo de mis abuelos cada verano.',
      '2. [Leía|leía] <i>(yo, leer)</i> novelas de aventuras a menudo.',
      '3. Antes la gente [iba] <i>(ir)</i> al teatro con más frecuencia.',
      '4. Hemingway [venía] <i>(venir)</i> por la tarde, [se sentaba] <i>(sentarse)</i> en esa mesa y [escribía] <i>(escribir)</i> sus obras.',
      '5. Mi hermana [se acostaba] <i>(acostarse)</i> siempre antes de las 11 de la noche.',
      '6. Muchas veces nos [decía] <i>(él, decir)</i> que se acercaba el invierno.',
      '7. Antes [llovía] <i>(llover)</i> más que ahora.',
      '8. Cristina [llevaba] <i>(llevar)</i> un vestido azul y un collar precioso en la fiesta.',
      '9. Los romanos [cultivaban] <i>(cultivar)</i> uvas para hacer vino.',
      '10. Unas veces [jugábamos] <i>(nosotros, jugar)</i> al ajedrez y otras a las cartas.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '문장에 맞는 동사형태를 고르세요.', { kr: '괄호 안 두 형태 중 알맞은 것을 빈칸에 직접 써요. (쓰기시험 연습)' })}
      ${tip('완료된 한 번의 사건 → 단순과거 / 나이·시간·상태·반복·배경 → 불완료과거')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e2', sec: 'e2', skill: 'asp', cls: 'lines', text: [
      '1. Cuando [eran] <i>(fueron / eran)</i> jóvenes, [iban] <i>(fueron / iban)</i> mucho a los conciertos.',
      '2. El lunes pasado [tuvimos] <i>(tuvimos / teníamos)</i> una reunión importante con los clientes.',
      '3. Ayer [volví] <i>(volví / volvía)</i> pronto a casa porque [estaba] <i>(estuve / estaba)</i> enfermo.',
      '4. ¿A qué hora [saliste] <i>(saliste / salías)</i> ayer por la mañana?',
      '5. ¿Qué [compraron] <i>(compraron / compraban)</i> ustedes el sábado pasado?',
      '6. Julio y Pedro [entregaron] <i>(entregaron / entregaban)</i> el documento la semana pasada.',
      '7. La chica se [torció] <i>(torció / torcía)</i> el tobillo al bajar las escaleras.',
      '8. ¿[Visteis|Veíais] <i>(Visteis / Veíais)</i> a muchos actores cuando [vivíais] <i>(vivisteis / vivíais)</i> en Los Ángeles?',
      '9. ¿Cuántos años [tenías] <i>(tuviste / tenías)</i> cuando [conociste] <i>(conociste / conocías)</i> a tu mujer?',
      '10. ¿Qué le [dijo] <i>(dijo / decía)</i> usted cuando se [encontró] <i>(encontró / encontraba)</i> con Luis?'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '괄호 안 동사를 문맥에 적합한 과거형으로 변형하세요.', { kr: '"siempre · normalmente · todos los años"(반복) ↔ "aquel día · aquella mañana · el año pasado"(한 번)' })}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e3', sec: 'e3', skill: 'asp', cls: 'lines', text: [
      '1. El hombre [pasaba] <i>(pasar)</i> siempre por esta calle sobre las 8 de la mañana, pero aquel día [apareció] <i>(aparecer)</i> casi a las 9.',
      '2. Normalmente la actriz [tomaba] <i>(tomar)</i> café por la mañana, pero [tomó] <i>(tomar)</i> té aquella mañana.',
      '3. Todos los años mis amigos me [invitaban] <i>(invitar)</i> a varias fiestas, pero el año pasado no me [dijo] <i>(decir)</i> nada nadie.',
      '4. Siempre nos [mandaban] <i>(ellos, mandar)</i> patatas de primera categoría, pero el año pasado [dejaron] <i>(ellos, dejar)</i> de cultivar patatas.',
      '5. Normalmente me [daba] <i>(él, dar)</i> abrazos cuando me [veía] <i>(él, ver)</i>. Pero aquella tarde no [quiso] <i>(él, querer)</i> ni mirarme.'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const V = [['bebía', 'I'], ['subieron', 'P'], ['regábamos', 'I'], ['cacé', 'P'], ['escribíamos', 'I'], ['abrió', 'P'], ['saqué', 'P'], ['borraban', 'I'], ['cerrasteis', 'P'],
      ['compramos', 'P'], ['encendíais', 'I'], ['volviste', 'P'], ['fue', 'P'], ['llamaban', 'I'], ['pudiste', 'P'], ['eras', 'I'], ['mostramos', 'P'], ['vendió', 'P'], ['elegía', 'I'],
      ['hablábamos', 'I'], ['dijiste', 'P'], ['nevaba', 'I'], ['había', 'I'], ['cruzábamos', 'I'], ['empujasteis', 'P']];
    const s = sec('ac1', `${acHead(1, '다음 동사를 단순과거와 불완료과거로 구분하세요.', { kr: '동사 칩을 누르고 알맞은 칸을 누르세요. 칸 안의 칩을 다시 누르면 빠져요.' })}
      <div class="sb"></div>
      ${tip('불완료과거 어미: <b>-aba-</b>, <b>-ía-</b>, era·iba 계열 / 단순과거 어미: -é, -aste, -ó, -amos, -asteis, -aron, -í, -iste, -ió, -imos, -isteis, -ieron')}
      <h3 class="h3">✍️ 동사원형을 쓰세요</h3><div class="items two w"></div>`);
    put(s, '.sb', sortBoard({ id: 'ac1sb', sec: 'ac1', skill: 'asp', cols: [{ k: 'P', label: '단순과거' }, { k: 'I', label: '불완료과거' }], chips: V }));
    [['cacé', 'cazar'], ['saqué', 'sacar'], ['fue', 'ir|ser'], ['pudiste', 'poder'], ['encendíais', 'encender'], ['elegía', 'elegir']]
      .forEach(([f, a], i) => put(s, '.w', writeItem({ id: 'ac1w' + i, sec: 'ac1', skill: 'imp', prompt: `<span class="chip">${f}</span> → 동사원형`, answers: a.split('|') })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '어린시절을 떠올리며 질문에 답해보세요.')}
      ${modelo('De pequeña <b>era</b> muy alegre y un poco traviesa.<br>No, no <b>vivía</b> con mis abuelos, pero los <b>visitaba</b> cada verano.')}
      <div class="items"></div>`);
    [['¿Cómo eras de pequeño/a?', [{ re: W0 + 'era' + W1, label: 'Era … (ser)' }], 'De pequeño era muy travieso y alegre.'],
      ['¿Vivías con tus abuelos?', [{ re: W0 + 'viv[ií]a' + W1, label: 'vivía (vivir)' }], 'No, no vivía con mis abuelos, pero los visitaba a menudo.'],
      ['¿Tenías alguna mascota?', [{ re: W0 + 'ten[ií]a' + W1, label: 'tenía (tener)' }], 'Sí, tenía un perro que se llamaba Toto.'],
      ['¿Cómo ibas a la escuela?', [{ re: W0 + 'iba' + W1, label: 'iba (ir)' }, { re: 'a pie|andando|caminando|en (autob[uú]s|coche|bicicleta|metro|tren)', label: '교통수단 (a pie, en autobús …)' }], 'Iba a la escuela a pie con mi hermano.'],
      ['¿Qué hacías cuando nevaba?', [{ re: W0 + '(' + IMP + ')' + W1, label: '불완료과거 동사' }, { re: 'cuando nevaba|nieve', label: 'cuando nevaba / nieve' }], 'Cuando nevaba, hacía muñecos de nieve con mis amigos.']]
      .forEach(([q, m, md], i) => put(s, '.items', freeItem({ id: 'ac2-' + i, sec: 'ac2', skill: 'uso', line: true, prompt: `(${i + 1}) ${q} ${say(q.replace('/a', ''))}`, ph: '→', must: m, model: md })));
  };
  B.ac3 = () => {
    const S3 = [
      ['🗣️🧍🧍', 'A. hablar', '🚇', 'B. llegar el metro', ['Llegó el metro, mientras hablaban.', 'Llegó el metro mientras hablaban.', 'Mientras hablaban, llegó el metro.', 'Llegó el metro, mientras hablábamos.', 'Mientras hablábamos, llegó el metro.']],
      ['🚶🌳', 'A. dar un paseo', '🐕', 'B. acercarse un perro', ['Se acercó un perro, mientras daba un paseo.', 'Se acercó un perro mientras daba un paseo.', 'Mientras daba un paseo, se acercó un perro.']],
      ['🏀', 'A. jugar al baloncesto', '🦴🏥', 'B. romperse un brazo', ['Se rompió un brazo, mientras jugaba al baloncesto.', 'Se rompió un brazo mientras jugaba al baloncesto.', 'Mientras jugaba al baloncesto, se rompió un brazo.', 'Me rompí un brazo, mientras jugaba al baloncesto.', 'Mientras jugaba al baloncesto, me rompí un brazo.']]];
    const duo = (a, ak, b, bk) => `<div class="duo"><div class="fr"><span>${a}</span><b>${ak}</b><small>〰️ 배경 (불완료과거)</small></div><div class="ar">＋</div><div class="fr"><span>${b}</span><b>${bk}</b><small>⚡ 사건 (단순과거)</small></div></div>`;
    const s = sec('ac3', `${acHead(3, '두 그림을 연관지어, 보기의 문장처럼 만들어 보시오.')}
      ${duo('😴🛋️', 'A. dormir la siesta', '📱🔔', 'B. sonar el móvil')}
      ${modelo('<b>Sonó</b> el móvil, mientras <b>dormía</b> la siesta.', '보기')}
      <div class="items"></div>`);
    S3.forEach(([a, ak, b, bk, ans], i) => {
      const box = el(`<div>${duo(a, ak, b, bk)}</div>`);
      box.appendChild(writeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'asp', prompt: `${i + 1}) B(단순과거), mientras A(불완료과거)`, ph: '…, mientras …', answers: ans }));
      put(s, '.items', box);
    });
  };
  B.ac4 = () => {
    const s = sec('ac4', `${acHead(4, '다음 사진은 Juan이 예전에 일했던 레스토랑입니다. Juan의 회상을 읽고 옳으면 V에, 옳지 않으면 F에 표시하세요.')}
      <div class="resto">🧱🪔🪔🪔💡<br>🍽️🌸🪑🪵🍷🌸🍽️<small>어두운 회색 돌벽 · 천장의 등은 모두 켜져 있음 · 흰 식탁보와 나무 의자 · 오른쪽 나무 테이블 · 식탁마다 분홍 꽃 · 접시와 잔이 차려져 있음 · 왼쪽 벽의 커다란 나무 조각 장식</small></div>
      <div class="items vf-tab"></div>
      <h3 class="h3">✍️ 틀린 문장을 바르게 고쳐 쓰세요</h3><div class="items fx"></div>`);
    [['El restaurante tenía paredes de colores oscuros.', 'V', '돌벽이 어두운 회색이에요.'], ['Había flores en cada mesa.', 'V', '식탁마다 분홍 꽃이 꽂혀 있어요.'],
      ['Las sillas eran de metal.', 'F', '의자는 나무(de madera)예요.'], ['Las mesas de la derecha eran de madera.', 'V', '오른쪽 테이블은 나무 테이블이에요.'],
      ['Las mesas no estaban puestas todavía.', 'F', '접시·잔이 이미 차려져 있었어요(estaban puestas).'], ['Todas las lámparas estaban apagadas.', 'F', '등은 모두 켜져 있었어요(encendidas).'],
      ['Había un cuadro enorme en la pared.', 'V', '왼쪽 벽에 커다란 장식 그림(나무 조각)이 걸려 있어요.']]
      .forEach(([p, a, ex], i) => put(s, '.vf-tab', choiceItem({ id: 'ac4-' + i, sec: 'ac4', skill: 'com', prompt: `(${i + 1}) ${p} ${say(p)}`, options: ['V', 'F'], answer: a, explain: ex })));
    [['(3) Las sillas eran de metal.', 'Las sillas …', [{ re: 'sillas eran de madera', label: 'Las sillas eran de madera' }], 'Las sillas eran de madera.'],
      ['(6) Todas las lámparas estaban apagadas.', 'Todas las lámparas …', [{ re: 'l[aá]mparas estaban encendidas', label: 'estaban encendidas' }], 'Todas las lámparas estaban encendidas.']]
      .forEach(([p, ph, m, md], i) => put(s, '.fx', freeItem({ id: 'ac4f' + i, sec: 'ac4', skill: 'uso', line: true, prompt: p + ' → 바르게', ph, must: m, model: md })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('라틴아메리카 설화: 태양은 어떻게 하늘로 올라갔을까?', [
      { e: '☀️🪢', h: '하늘과 땅을 잇는 동아줄', t: '태초에는 태양, 달, 동물 모두 사람이었고 하늘과 땅은 굵은 동아줄로 연결되어 있었다. 하늘에 혼자 오른 태양은 경치가 마음에 들어 그곳에 살기로 했지만 곧 지루해져 친구들을 부르기 시작했다.' },
      { e: '🐭🌽', h: '온키로 (Onkiro) → 쥐', t: '입 안에 곡식을 가득 물고 이가 아프다며 거짓말을 했다. 곡식을 땅에 뱉어 작물을 기르다 들켜 화난 태양이 쥐로 만들었다. 그래서 쥐는 지금도 밤마다 밭에서 옥수수·감자·호박을 가져간다 — 처음 심은 사람이 자기 자신이니까!' },
      { e: '🦔🏹', h: '톤토리 (Tontori) → 고슴도치', t: '화살을 잔뜩 짊어지고 오르다 화살과 동아줄이 뒤엉켜 여러 번 떨어졌고, 그때마다 화살이 몸속으로 파고들었다. 태양은 땅에 있으라고 했고 톤토리는 고슴도치가 되었다.' },
      { e: '🦥', h: '오 (Ho) → 나무늘보', t: '너무 느려서 동아줄을 오르지 못했다. 화가 난 태양은 느린 사람을 기다릴 수 없다며 그를 나무늘보로 만들어 버렸다.' }
    ], '라틴아메리카 원주민 설화는 동물의 생김새와 습성의 기원을 재미있게 설명해요.') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>
      <h3 class="h3">✍️ 불완료과거로 이야기 다시 쓰기</h3><div class="c"></div>`);
    [['온키로(Onkiro)는 무엇으로 변했나요?', ['쥐', '고슴도치', '나무늘보', '콘도르'], '쥐', '거짓말을 해서 쥐가 되었어요.'],
      ['톤토리(Tontori)가 고슴도치가 된 이유는?', ['화살이 몸에 박혀서', '너무 느려서', '거짓말을 해서', '곡식을 훔쳐서'], '화살이 몸에 박혀서', '화살과 동아줄이 엉켜 떨어질 때마다 화살이 박혔어요.'],
      ['나무늘보가 된 친구는?', ['오 (Ho)', '온키로', '톤토리', '태양'], '오 (Ho)', '너무 느려서 동아줄을 오르지 못했어요.']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'com', prompt: p, options: o, answer: a, explain: ex })));
    put(s, '.c', cloze({ id: 'culc', sec: 'cultura', skill: 'uso', cls: 'lines', text: [
      'Al principio, el sol, la luna y los animales [eran] personas. <i>(ser)</i>', 'El cielo y la tierra [estaban] unidos por una cuerda. <i>(estar)</i>',
      'Onkiro [tenía] la boca llena de granos. <i>(tener)</i>', 'Ho [era] muy lento y no [podía] subir. <i>(ser, poder)</i>'].map(x => `<p>${x}</p>`).join('') }));
  };

  SC.lesson({
    num: '12',
    title: 'De joven trabajaba en una compañía multinacional',
    ttsTest: '¿Qué hacías de joven?',
    cover: {
      emoji: '👴🏻🏢<small>🪑🌳 🏡</small>',
      bg: 'linear-gradient(135deg,#f6b24d,#f28a21 55%,#b45309)',
      tema: ['Recuerdos de la infancia y la juventud', 'Cambios de vida', 'Descripciones en el pasado'],
      com: ['불완료과거: Siempre pasaban por la plaza con su perro. · Tenía 15 años en aquel entonces.', '단순과거와 불완료과거 구분: Cuando llegamos a casa, estaba cerrada la puerta. · Mientras iba al trabajo, se encontró con un amigo.'],
      gram: ['Pretérito imperfecto (-aba / -ía)', '불규칙: <i>ser, ir, ver</i>', '용법: 반복 · 나이와 시각 · 묘사', 'Indefinido vs Imperfecto, <i>mientras</i>']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Juan: { g: 'm', av: '👴🏻', side: 'l' }, 'José': { g: 'm', av: '👴🏽', side: 'r' }
    },
    errLabels: { conjugacion: '불완료과거 형태', aspecto: '단순과거 ↔ 불완료과거 혼동' },
    errTips: {
      acento: 'comía, vivía, tenía, había, hablábamos, éramos, íbamos … 불완료과거 악센트도 철자예요.',
      conjugacion: '-ar: -aba, -abas, -aba, -ábamos, -abais, -aban / -er·-ir: -ía, -ías, -ía, -íamos, -íais, -ían / ser: era · ir: iba · ver: veía',
      aspecto: '한 번 일어나고 끝난 사건 → 단순과거 / 반복 · 배경 · 나이 · 시각 · 묘사 → 불완료과거'
    },
    classify(ti, ta) {
      const isImp = w => /(aba|abas|ábamos|abais|aban|ía|ías|íamos|íais|ían)$/.test(w) || ['era', 'eras', 'éramos', 'erais', 'eran', 'iba', 'ibas', 'íbamos', 'ibais', 'iban'].includes(w);
      const diff = ta.filter(w => !ti.includes(w));
      if (!diff.length) return null;
      const tiExtra = ti.filter(w => !ta.includes(w));
      if (diff.some(isImp) && tiExtra.length && !tiExtra.some(isImp)) return 'aspecto';
      if (tiExtra.some(isImp) && !diff.some(isImp)) return 'aspecto';
      if (diff.some(isImp)) return 'conjugacion';
      return null;
    },
    errRules: [
      { re: W0 + '(com|beb|viv|sal|ten|hac|escrib|le|ten|pod|quer|sab|dec)(aba|abas|abamos|ábamos|abais|aban)' + W1, t: 'conjugacion', msg: '-er · -ir 동사는 -ía (comía, vivía …)' },
      { re: W0 + '(habl|cen|trabaj|jug|estudi|tom|pas|llam|cant|bail|viaj|compr|lleg)(ía|ia|ías|ias|íamos|iamos|ían|ian)' + W1, t: 'conjugacion', msg: '-ar 동사는 -aba (hablaba, jugaba …)' },
      { re: W0 + '(seía|seia|iía|ibía|veaba)' + W1, t: 'conjugacion', msg: 'ser → era · ir → iba · ver → veía' },
      { re: W0 + '(comia|vivia|tenia|habia|salia|decia|leia|veia|podia|queria|llovia|comian|vivian|tenian|salian|hacian|veian|comiamos|viviamos|teniamos|ibamos|eramos|hablabamos|jugabamos|cenabamos|estabamos)' + W1, t: 'acento', msg: '불완료과거 악센트 (í / á / é)' }
    ],
    accWords: ['había', 'tenía', 'vivía', 'comía', 'salía', 'veía', 'íbamos', 'éramos', 'jugábamos', 'hablábamos', 'también', 'decisión', 'físicamente', 'compañía', 'después', 'José', 'árbol', 'tímido'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Cuando era pequeño/a … → 글로 쓰기',
        icons: ['🧒', '🏡', '📸'],
        questions: ['¿Cómo eras de pequeño/a? ¿Dónde vivías y con quién?', '¿Qué hacías normalmente? (en la escuela, los fines de semana, en verano …)', '¿Pasó algo especial un día? Cuéntalo. (Un día … / Mientras …, …)'],
        minWords: 60,
        hint: '불완료과거(반복·묘사·나이)와 단순과거(한 번의 사건), mientras 를 모두 쓰면 높은 점수!',
        ph: 'Cuando era pequeño/a, vivía en …',
        connectors: ['y', 'pero', 'porque', 'cuando', 'mientras', 'entonces', 'además', 'un día', 'siempre que'],
        rubric: [
          { k: 'des', label: '나의 어린 시절 묘사 (era / tenía / vivía)', max: 8, re: '(era|ten[ií]a|viv[ií]a)', ax: 'Contenido' },
          { k: 'rut', label: '반복 습관 표현 (siempre, a menudo, todos los …)', max: 8, re: 'siempre|a menudo|todos los|todas las|de vez en cuando|normalmente|cada (d[ií]a|verano|semana|a[nñ]o)|nunca', ax: 'Contenido' },
          { k: 'imp', label: '불완료과거 동사 4번 이상', max: 14, re: IMP, min: 4, ax: 'Gramática' },
          { k: 'ind', label: '단순과거 사건 (un día … / fue, pasó …)', max: 8, re: 'un d[ií]a|una vez|aquel d[ií]a|de repente|(fui|fue|pas[oó]|tuve|tuvo|vi|vio|conoc[ií]|[a-záéíóúñ]+(é|ó|aron|ieron))', ax: 'Gramática' },
          { k: 'mie', label: 'mientras / cuando + 불완료과거', max: 6, re: '(mientras|cuando) [a-záéíóúñ ]*(' + IMP + ')', ax: 'Gramática' },
          { k: 'edad', label: '과거 나이 · 시각 (tenía … años / eran las …)', max: 4, re: 'ten[ií]a \\S+ a[nñ]os|eran las|era la una', ax: 'Gramática' }
        ],
        model: 'Cuando era pequeña, vivía en un pueblo cerca del mar con mis padres y mi abuela. Era muy traviesa y tenía un perro que se llamaba Toto. Todos los días iba a la escuela a pie y por la tarde jugaba con mis amigos en la playa. Los veranos siempre comíamos sandía en el patio. Un día, mientras paseaba con Toto, encontré una tortuga enorme. Tenía ocho años y fue un día muy especial.'
      }
    },
    build: B
  });
})();
