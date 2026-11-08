/* Lección 10 · Hemos hecho el camino a Santiago de Compostela — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 135~148쪽 : Diálogo → Vocabulario·Contesta → Lectura → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~3) → Actividades 1~6 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .lect.postal{background:repeating-linear-gradient(#fff,#fff 33px,#e8eef6 34px);border-left-color:#c2410c;font-family:'Gaegu','Noto Sans KR',cursive;font-size:19px}
    .ce-box{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:10px 0}.ce-box div{background:#fffbe6;border:1px solid #f1e3a6;border-radius:12px;padding:10px 14px}
    .ce-box b{display:block;text-align:center;background:#fbe7a1;border-radius:8px;margin-bottom:6px;color:#5b2a1c}.ce-box p{margin:3px 0}
    .pp-chip{display:inline-block;background:#fff;border:1px solid #e3e3e3;border-radius:999px;padding:2px 10px;margin:2px}
  </style>`);

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      par: 'Participio 과거분사',
      per: 'Pretérito perfecto 현재완료',
      exp: 'Experiencia ya · nunca 경험 표현',
      pro: 'Pronombres 대명사 위치',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '대학 카페에서 — 후안과 파블로', group: 'Diálogo · Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'lec', label: 'Lectura', kr: '폰페라다에서 온 엽서', group: 'Diálogo · Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo · Lectura' },
      { id: 'gram', label: 'Gramática', kr: '과거분사 · 현재완료 · 대명사 위치', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '현재완료 문장 만들기', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: 'ya · todavía · alguna vez · nunca', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '재귀동사 현재완료', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'ac1', label: 'Actividades 1', kr: '과거분사 ↔ 동사원형 연결', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '사진 속 상황 묘사', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '원인과 결과 연결', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'ac4', label: 'Actividades 4', kr: '사진 보고 표현 연결', group: 'Actividades', kind: 'ac', n: 4 },
      { id: 'ac5', label: 'Actividades 5', kr: '¿Has … alguna vez?', group: 'Actividades', kind: 'ac', n: 5 },
      { id: 'ac6', label: 'Actividades 6', kr: '¿Por qué …? Es que …', group: 'Actividades', kind: 'ac', n: 6 },
      { id: 'cultura', label: 'Cultura', kr: '산티아고 데 콤포스텔라', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Juan', es: 'Oye, Pablo, ¿qué [has hecho] este verano?' },
      { who: 'Pablo', es: 'Pues [he hecho] el camino a Santiago de Compostela.' },
      { who: 'Juan', es: '¿En serio? ¿Lo has hecho tú solo?' },
      { who: 'Pablo', es: '[Por supuesto] que no. [He ido] con mi primo. ¿Y tú qué has hecho en las vacaciones? ¿[Al final] has ido de [campamento]?' },
      { who: 'Juan', es: '¡[Qué va]! [He estado] trabajando todo el verano en mi [pueblo].' },
      { who: 'Pablo', es: '¿Y eso?' },
      { who: 'Juan', es: 'Como sabes, mis padres tienen un bar. Pero la camarera está de [baja] por maternidad hace dos meses. Por eso [he tenido] que ayudarlos.' },
      { who: 'Pablo', es: '¿Qué tal [ha sido] la [experiencia]?' },
      { who: 'Juan', es: '[He conocido] a mucha gente. Ha sido un verano muy [ocupado] con mucho trabajo, pero también muy [entretenido].' }
    ],
    lectura: [
      '¡Hola, Begoña!',
      '¡Sorpresa! Te mando esta postal desde Ponferrada. ¿Sabes qué? Estoy haciendo el camino con mi primo Nacho y su novia Pili. Como mis hermanos no han querido venirse conmigo, he hablado con Nacho y al final se ha apuntado Pili también. Son encantadores. Nos lo estamos pasando muy bien. Hemos llegado a Ponferrada hace nada. Ahora te estoy escribiendo en la cafetería cerca del albergue juvenil. Hemos empezado el camino en Burgos. Ha hecho muy buen tiempo estos días y hemos caminado mucho pasando por varias ciudades y pueblos pequeños con pocos habitantes. Como hace un calor sofocante de día, salimos a andar muy temprano por la mañana y descansamos cuando el sol pega fuerte por la tarde. Me duelen un poco los pies. Además, al bajar las colinas esta mañana, me he torcido el tobillo, pero creo que estoy bien.',
      'En el camino hemos conocido a mucha gente de diversas nacionalidades cada día, gente joven, gente mayor, viajeros profesionales, estudiantes en vacaciones como nosotros, etc. Muchos de los extranjeros hablan español. Comunicamos en español e inglés con ellos. Cuando no valen los dos idiomas, ya sabes, usamos gestos. Parece que nosotros los entendemos y ellos a nosotros. Te voy a contar más cosas en Madrid.',
      'Besos, Pablo'
    ],

    voc1: [
      { es: 'a principios de', kr: '~초에', e: '📅' }, { es: 'darse de baja', kr: '휴직하다', e: '🏠' }, { es: 'baja maternal', kr: '육아휴직', e: '🤱' },
      { es: 'encontrar', kr: '찾아내다', e: '🔍' }, { es: 'nadie', kr: '아무도', e: '🚫' }, { es: 'sustituir', kr: '대체하다', e: '🔄' },
      { es: '¡Qué va!', kr: '결코 그렇지 않다', e: '🙅' }, { es: 'pueblo', kr: '시골 (마을)', e: '🏘️' }, { es: 'ocupado', kr: '바쁜, 분주한', e: '🏃' },
      { es: 'entretenido', kr: '즐거운', e: '😄' }, { es: 'universidad', kr: '대학교', e: '🎓' }, { es: 'camino', kr: '길', e: '🛤️' },
      { es: 'peregrinación', kr: '순례', e: '🐚' }, { es: 'primo', kr: '사촌', e: '👦' }, { es: 'novia', kr: '여자 친구, 애인', e: '👩' },
      { es: 'campamento', kr: '캠핑', e: '⛺' }, { es: 'experiencia', kr: '경험', e: '🌟' }, { es: 'turista', kr: '관광객', e: '📸' },
      { es: 'dar a luz', kr: '출산하다', e: '👶' }, { es: 'al final', kr: '결국, 마침내', e: '🏁' }
    ],
    voc2: [
      { es: 'sorpresa', kr: '놀람', e: '🎁' }, { es: 'mandar', kr: '보내다', e: '📮' }, { es: 'postal', kr: '우편엽서', e: '💌' },
      { es: 'colina', kr: '언덕', e: '⛰️' }, { es: 'apuntarse', kr: '참가하다, 합류하다', e: '✋' }, { es: 'encantador', kr: '매력적인, 사람 좋은', e: '😊' },
      { es: 'pasárselo bien', kr: '즐겁게 보내다', e: '🥳' }, { es: 'albergue juvenil', kr: '유스호스텔', e: '🏨' }, { es: 'pasar por', kr: '~을 통과하다', e: '🚶' },
      { es: 'valer', kr: '가치가 있다, 통하다', e: '💎' }, { es: 'habitante', kr: '거주자, 주민', e: '🧑‍🌾' }, { es: 'sofocante', kr: '숨이 막히는', e: '🥵' },
      { es: 'de día', kr: '낮에', e: '🌞' }, { es: 'pegar', kr: '(태양이) 내리쬐다', e: '☀️' }, { es: 'venirse con', kr: '~와 함께 가다', e: '👫' },
      { es: 'torcerse el tobillo', kr: '발목을 접질리다', e: '🦶' }, { es: 'diverso', kr: '다양한', e: '🌈' }, { es: 'nacionalidad', kr: '국적', e: '🌍' },
      { es: 'viajero', kr: '여행객', e: '🧳' }, { es: 'profesional', kr: '전문적인', e: '💼' }, { es: 'comunicar', kr: '의사소통하다', e: '💬' },
      { es: 'vario', kr: '다양한', e: '🔢' }, { es: 'parece que…', kr: '…인 것 같다', e: '🤔' }, { es: 'gesto', kr: '몸짓, 제스처', e: '👋' }
    ],
    amplia: [
      { es: 'ajedrez', kr: '체스', e: '♟️' }, { es: 'carne de vacuno', kr: '소고기', e: '🥩' }, { es: 'jamón', kr: '하몬(스페인식 생 햄)', e: '🍖' },
      { es: 'coger un catarro', kr: '감기 걸리다', e: '🤧' }, { es: 'enterarse de', kr: '~을 알다, 알아차리다', e: '💡' }, { es: 'cordero', kr: '양', e: '🐑' },
      { es: 'olvidarse', kr: '깜빡 잊고 두고 나오다', e: '🔑' }, { es: 'bolso', kr: '핸드백', e: '👜' }, { es: 'gasolina', kr: '(가솔린) 휘발유', e: '⛽' },
      { es: 'maletín', kr: '서류 가방', e: '💼' }, { es: 'fiebre', kr: '열', e: '🤒' }, { es: 'discutir', kr: '말다툼하다', e: '😤' }
    ],

    examBank: [
      { p: 'Yo ____ comido carne de vacuno. <i>(haber)</i>', a: ['he'], s: 'per' },
      { p: '¿Tú ____ probado el jamón ibérico? <i>(haber)</i>', a: ['has'], s: 'per' },
      { p: 'Nosotros ____ visto el último episodio. <i>(haber)</i>', a: ['hemos'], s: 'per' },
      { p: '¿Vosotros ____ acabado ya el curso? <i>(haber)</i>', a: ['habéis'], s: 'per' },
      { p: 'Los niños ____ vuelto a casa muy tarde. <i>(haber)</i>', a: ['han'], s: 'per' },
      { p: 'Papá ha ____ su maletín sobre el sofá. <i>(poner)</i>', a: ['puesto'], s: 'par' },
      { p: '¿Qué ha ____ el jefe esta mañana? <i>(decir)</i>', a: ['dicho'], s: 'par' },
      { p: 'Pablo ha ____ el camino a Santiago. <i>(hacer)</i>', a: ['hecho'], s: 'par' },
      { p: 'Te he ____ una postal. <i>(escribir)</i>', a: ['escrito'], s: 'par' },
      { p: '¿Quién ha ____ la ventana? <i>(abrir)</i>', a: ['abierto'], s: 'par' },
      { p: 'No hemos ____ nunca un cordero. <i>(ver)</i>', a: ['visto'], s: 'par' },
      { p: 'Mis padres han ____ de Madrid. <i>(volver)</i>', a: ['vuelto'], s: 'par' },
      { p: 'El director ha ____. <i>(morir)</i>', a: ['muerto'], s: 'par' },
      { p: '¿Has hecho ____ la cena? <i>(이미)</i>', a: ['ya'], s: 'exp' },
      { p: 'No, no la he hecho ____. <i>(아직)</i>', a: ['todavía'], s: 'exp' },
      { p: '¿Has estado ____ vez en Taipéi? <i>(언젠가, 한 번이라도)</i>', a: ['alguna'], s: 'exp' },
      { p: 'No he estado ____ en Francia. <i>(한 번도)</i>', a: ['nunca'], s: 'exp' },
      { p: '¿Has recibido los libros? — No, todavía no ____ he recibido.', a: ['los'], s: 'pro' },
      { p: '¿Habéis leído la novela? — Sí, ____ hemos leído esta mañana.', a: ['la'], s: 'pro' },
      { p: 'Paco, ¿te has lavado las manos? — Sí, me ____ he lavado.', a: ['las'], s: 'pro' },
      { p: '¿A qué hora ____ has despertado hoy? <i>(tú, despertarse)</i>', a: ['te'], s: 'pro' }
    ]
  };

  const B = {};
  const HABER = '(he|has|ha|hemos|hab[eé]is|han)';
  const PP = HABER + ' [a-záéíóúñ]+(ado|ido|ído|cho|to|sto|uesto|ierto|uelto|uerto|rito)';

  /* ---------- Diálogo ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'En la cafetería de la universidad')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 현재완료와 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'per', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    ['¿Qué has hecho este verano?', 'He ido con mi primo.', 'He conocido a mucha gente.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'per', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    [6, 7, 8, 9, 11, 13, 14, 15, 16, 19].forEach((k, i) => { const v = D.voc1[k]; put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })); });
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Qué ha hecho Pablo en las vacaciones de verano?', kw: [['ha hecho', 'ha hecho (현재완료)'], ['camino', 'el camino a Santiago']], model: 'Ha hecho el camino a Santiago de Compostela.' },
      { q: '¿Qué ciudad ha sido el destino del viaje de Pablo?', kw: [['santiago de compostela', 'Santiago de Compostela']], model: 'Ha sido Santiago de Compostela.' },
      { q: '¿Con quién ha ido Pablo a Santiago de Compostela?', kw: [['primo', 'con su primo']], model: 'Ha ido con su primo.' },
      { q: '¿Qué ha hecho Juan en el pueblo?', kw: [['trabaja|trabajado', 'trabajar'], [HABER, '현재완료 (ha …)']], model: 'Ha estado trabajando todo el verano en el bar de sus padres.' },
      { q: '¿Por qué ha tenido que trabajar Juan en el bar?', kw: [['porque', 'Porque …'], ['camarera', 'la camarera'], ['baja|maternidad', 'está de baja (por maternidad)']], model: 'Porque la camarera está de baja por maternidad.' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lec = () => {
    const s = sec('lec', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <p class="scene">Pablo le escribe una postal a Begoña desde Ponferrada. 📮🐚</p>
      <div class="rb"></div>
      <h3 class="h3">🗺️ 파블로의 순례길 — 순서대로 배열하세요</h3><div class="items ord"></div>
      <h3 class="h3">① ¿Verdadero o falso?</h3><div class="items vf"></div>
      <h3 class="h3">② 엽서 속 현재완료를 찾아 쓰세요</h3><div class="c"></div>`);
    put(s, '.rb', readBlock(D.lectura, { cls: 'postal', img: '🏞️', g: 'm' }));
    put(s, '.ord', scramble({ id: 'lec-ord', sec: 'lec', skill: 'com', prompt: '출발지 → 현재 위치 → 목적지 → 돌아가서 만날 곳', tokens: ['Burgos', 'Ponferrada', 'Santiago de Compostela', 'Madrid'], joiner: ' → ' }));
    [['Pablo hace el camino con sus hermanos.', 'Falso'], ['Han empezado el camino en Burgos.', 'Verdadero'], ['Caminan por la tarde porque hace fresco.', 'Falso'],
      ['Pablo se ha torcido el tobillo al bajar las colinas.', 'Verdadero'], ['Muchos extranjeros hablan español.', 'Verdadero']]
      .forEach(([p, a], i) => put(s, '.vf', choiceItem({ id: 'lec-vf' + i, sec: 'lec', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a })));
    put(s, '.c', cloze({ id: 'lecc', sec: 'lec', skill: 'per', cls: 'lines', text: [
      'Como mis hermanos no [han querido] venirse conmigo, [he hablado] con Nacho.', 'Al final se [ha apuntado] Pili también.',
      '[Hemos llegado] a Ponferrada hace nada.', '[Hemos empezado] el camino en Burgos.', '[Ha hecho] muy buen tiempo estos días.',
      'Al bajar las colinas esta mañana, me [he torcido] el tobillo.', 'En el camino [hemos conocido] a mucha gente.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: [0, 2, 3, 7, 11, 15, 18, 23].map(k => [D.voc2[k].es, D.voc2[k].kr]) }));
    [1, 4, 6, 8, 10, 12, 17, 20].forEach((k, i) => { const v = D.voc2[k]; put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })); });
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿En qué idioma se comunican Pablo y sus compañeros con los extranjeros?', kw: [['espa[nñ]ol', 'español'], ['ingl[eé]s', 'inglés']], model: 'Se comunican en español e inglés (y con gestos).' },
      { q: '¿Cuándo han caminado? ¿Por la mañana o por la noche?', kw: [['por la ma[nñ]ana', 'por la mañana']], model: 'Han caminado muy temprano por la mañana.' },
      { q: '¿Por qué se ha torcido Pablo el tobillo?', kw: [['bajar|bajando|ha bajado', 'bajar'], ['colinas?', 'las colinas']], model: 'Se ha torcido el tobillo al bajar las colinas.' },
      { q: '¿Dónde va a ver Pablo a Begoña después de las vacaciones?', kw: [['madrid', 'en Madrid']], model: 'Va a verla en Madrid.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 오늘 무슨 일이 있었나요? — 현재완료로 쓰기</h3>${modelo('Esta mañana <b>he cogido un catarro</b> y tengo fiebre.<br>Mi hermana <b>se ha olvidado</b> el bolso en el autobús.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'per', rows: 3, prompt: '위 단어 2개 이상을 넣어 오늘(hoy / esta mañana) 있었던 일을 2문장으로 쓰세요.', ph: 'Hoy he …',
      must: [{ re: PP, label: '현재완료 (haber + 과거분사) 2번 이상', min: 2 }, { re: 'ajedrez|vacuno|jam[oó]n|catarro|enter|cordero|olvid|bolso|gasolina|malet[ií]n|fiebre|discut', label: 'Amplía 단어 2개 이상', min: 2 }],
      model: 'Esta mañana he jugado al ajedrez con mi abuelo. Por la tarde he discutido con mi hermano porque se ha olvidado mi bolso en el metro.' }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 과거분사 (Participio pasado)</h3>
        <table class="gtab"><tr><th colspan="3">(1) 규칙 변화형</th></tr>
          <tr><td>-ar 동사</td><td class="hi">-ado</td><td class="l">cantar → cant<b>ado</b> ${say('cantado')}</td></tr>
          <tr><td>-er 동사</td><td class="hi" rowspan="2">-ido</td><td class="l">beber → beb<b>ido</b> ${say('bebido')}</td></tr>
          <tr><td>-ir 동사</td><td class="l">partir → part<b>ido</b> ${say('partido')}</td></tr></table>
        <table class="gtab"><tr><th colspan="4">(2) 불규칙 변화형</th></tr>
          <tr><td>abrir</td><td class="hi">abierto</td><td>decir</td><td class="hi">dicho</td></tr>
          <tr><td>escribir</td><td class="hi">escrito</td><td>hacer</td><td class="hi">hecho</td></tr>
          <tr><td>morir</td><td class="hi">muerto</td><td>poner</td><td class="hi">puesto</td></tr>
          <tr><td>ver</td><td class="hi">visto</td><td>volver</td><td class="hi">vuelto</td></tr></table>
        ${tip('어간이 모음으로 끝나는 -er/-ir 동사는 악센트: leer → le<b>í</b>do, oír → o<b>í</b>do, creer → cre<b>í</b>do')}
        <div class="g1"></div></div>
      <div class="gcard"><h3>2. 현재완료 (Pretérito perfecto)</h3>
        <div class="blocks"><span class="bk p">he / has / ha …</span><span class="bk v">과거분사</span><span class="small">haber 현재형 + 과거분사 (과거분사는 변하지 않음!)</span></div>
        <table class="gtab"><tr><th></th><th>haber</th><th>과거분사</th></tr>
          ${[['1인칭 단수', 'he', 'tomado zumo de naranja. 오렌지 주스를 마셨다.'], ['2인칭 단수', 'has', ''], ['3인칭 단수', 'ha', 'discutido con el chico. 그 소년과 다퉜다.'], ['1인칭 복수', 'hemos', ''], ['2인칭 복수', 'habéis', 'dado un paseo por el barrio. 동네 산책을 했다.'], ['3인칭 복수', 'han', '']]
            .map(([p, h, x]) => `<tr><td>${p}</td><td class="hi">${h}</td><td class="l">${x}</td></tr>`).join('')}</table>
        <h4>(2) 용법 ① — 최근에 발생해 현재까지 영향을 미치는 일</h4>
        <ul class="ul">${['Hemos comido carne de vacuno.', 'Los niños han vuelto a casa muy tarde.', 'Juan ha sido amable con todo el mundo.', 'No me habéis contado la verdad.'].map(x => `<li>${say(x)} ${x}</li>`).join('')}</ul>
        <div class="chips">${['hoy', 'esta mañana', 'esta tarde', 'esta noche', 'esta semana', 'este mes', 'este año', 'este verano', 'este invierno', 'últimamente', 'recientemente', 'hace nada', 'hace poco', 'hace un rato', 'hace un momento', 'hace 10 minutos'].map((x, i) => `<span class="hlc c${i % 3}">${x}</span>`).join('')}</div>
        <ul class="ul">${['Hoy hemos visto a María en la plaza.', '¿Has ido al médico esta mañana?', 'Ha llovido mucho últimamente.', 'Te han llamado hace nada.', 'El niño ha roto el vaso hace un rato.', 'He estado con Ana hace un momento.'].map(x => `<li>${say(x)} ${x}</li>`).join('')}</ul>
        <h4>용법 ② — 경험</h4>
        <div class="chips">${['una vez', 'alguna vez', 'varias veces', 'nunca', 'ya', 'todavía'].map((x, i) => `<span class="hlc c${i % 3}">${x}</span>`).join('')}</div>
        <ul class="ul">${['He estado dos veces en Alemania.', '¿Has estado alguna vez en Taipéi?', 'No hemos visto nunca un cordero.', '¿Habéis acabado ya el curso?', 'Todavía no han leído el periódico.', 'Ya la he llamado varias veces.'].map(x => `<li>${say(x)} ${x}</li>`).join('')}</ul>
        <div class="g2"></div><div class="items g2b"></div></div>
      <div class="gcard"><h3>3. 현재완료형에서 목적대명사의 위치</h3>
        ${tip('목적대명사 · 재귀대명사는 <b>haber 동사 앞</b>에! haber와 과거분사 사이에는 아무것도 들어갈 수 없어요.')}
        <div class="blocks"><span class="bk o">No</span><span class="bk p">los</span><span class="bk v">he recibido</span><span class="small">(He los recibido ✕)</span></div>
        <ul class="ul">${['A: ¿Has recibido los libros? — B: No. Todavía no los he recibido.', 'A: ¿Cuándo habéis leído la novela? — B: La hemos leído esta mañana.', 'A: Paco, ¿te has lavado las manos? — B: Sí, me las he lavado hace poco.'].map(x => `<li>${say(x.replace(/[AB]: /g, '').replace(' — ', ' '))} ${x}</li>`).join('')}</ul>
        <div class="items g3"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'par', title: '과거분사를 쓰세요.', cls: 'table2', text:
      [['hablar', 'hablado'], ['comer', 'comido'], ['vivir', 'vivido'], ['dormir', 'dormido'], ['abrir', 'abierto'], ['decir', 'dicho'], ['escribir', 'escrito'], ['hacer', 'hecho'], ['morir', 'muerto'], ['poner', 'puesto'], ['ver', 'visto'], ['volver', 'vuelto']].map(([a, b]) => `<p><span>${a}</span> → [${b}]</p>`).join('') }));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'per', title: 'haber 동사의 현재형을 쓰세요.', cls: 'table2', text:
      [['yo', 'he', 'cantado'], ['tú', 'has', 'comido'], ['él / ella / usted', 'ha', 'vivido'], ['nosotros/as', 'hemos', 'hecho'], ['vosotros/as', 'habéis', 'visto'], ['ellos / ellas / ustedes', 'han', 'dicho']].map(([a, b, c]) => `<p><span>${a}</span> → [${b}] ${c}</p>`).join('') }));
    [['🍊 yo · tomar zumo de naranja · esta mañana', ['Esta mañana he tomado zumo de naranja.', 'He tomado zumo de naranja esta mañana.', 'Yo he tomado zumo de naranja esta mañana.']],
      ['🚶 nosotros · dar un paseo por el barrio · hoy', ['Hoy hemos dado un paseo por el barrio.', 'Hemos dado un paseo por el barrio hoy.', 'Nosotros hemos dado un paseo por el barrio hoy.']],
      ['🇩🇪 yo · estar dos veces en Alemania', ['He estado dos veces en Alemania.', 'Yo he estado dos veces en Alemania.']]]
      .forEach(([p, a], i) => put(s, '.g2b', writeItem({ id: 'g2b-' + i, sec: 'gram', skill: 'per', prompt: p, answers: a })));
    [['¿Has recibido los libros? (No, todavía no …)', ['No, todavía no los he recibido.', 'No. Todavía no los he recibido.']],
      ['¿Habéis leído la novela? (Sí, … esta mañana)', ['Sí, la hemos leído esta mañana.']],
      ['¿Has visto a María? (Sí, … hace un momento)', ['Sí, la he visto hace un momento.']]]
      .forEach(([p, a], i) => put(s, '.g3', writeItem({ id: 'g3-' + i, sec: 'gram', skill: 'pro', prompt: p, ph: '대명사를 haber 앞에!', answers: a })));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '동사로 현재완료 문장을 만드세요.', { kr: '빈칸에 haber + 과거분사를 쓰세요.' })}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1', sec: 'e1', skill: 'per', cls: 'lines', text: [
      '1. Papá [ha puesto] su maletín sobre el sofá. <i>(poner)</i>', '2. Este invierno [ha nevado] muy poco. <i>(nevar)</i>',
      '3. ¿[Has probado] alguna vez el jamón ibérico? <i>(probar, tú)</i>', '4. Este invierno [hemos estado] en Australia. <i>(nosotros, estar)</i>',
      '5. Hoy [han dormido] doce horas. <i>(ellos, dormir)</i>', '6. [He aprendido] a tocar el piano hace poco. <i>(yo, aprender)</i>',
      '7. España [ha ganado] la Copa de Europa. <i>(ganar)</i>', '8. ¿Qué [ha dicho] el jefe esta mañana? <i>(decir)</i>',
      '9. Últimamente [ha subido] mucho la gasolina. <i>(subir)</i>', '10. El director [ha muerto]. <i>(morir)</i>'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '적절한 표현을 사용하여 문장을 완성해 보세요.')}
      <div class="ybox wordbank">보기: <span>una vez</span><span>alguna vez</span><span>varias veces</span><span>nunca</span><span>ya</span><span>todavía</span></div><div class="c"></div>
      ${tip('ya 이미 ↔ todavía (no) 아직 · alguna vez (의문문) 한 번이라도 · nunca 한 번도 ~ 않다 · varias veces 여러 번')}`);
    put(s, '.c', cloze({ id: 'e2', sec: 'e2', skill: 'exp', cls: 'lines', text: [
      '1. A: ¿Has hecho [ya] la cena?', '&nbsp;&nbsp;&nbsp;B: No, no la he hecho [todavía].',
      '2. A: ¿Han viajado ustedes [alguna vez|varias veces] en avión?', '&nbsp;&nbsp;&nbsp;B: Sí, [varias veces|alguna vez|una vez]. Viajamos mucho por el negocio.',
      '3. A: ¿Habéis estado [alguna vez|varias veces] en América?', '&nbsp;&nbsp;&nbsp;B: Sí, [varias veces|alguna vez|una vez], conocemos muchos países americanos.',
      '4. A: ¿Has visto [alguna vez|varias veces] películas españolas?', '&nbsp;&nbsp;&nbsp;B: No, [nunca]. A mí no me interesan mucho las películas.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '괄호 안의 동사를 사용하여 현재완료 문장을 만드세요.', { kr: '재귀대명사(me · te · se …)는 haber 앞에 써요.' })}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e3', sec: 'e3', skill: 'pro', cls: 'lines', text: [
      '1. ¿A qué hora [te has despertado] hoy? <i>(tú, despertarse)</i>', '2. No [me he duchado] esta mañana. <i>(yo, ducharse)</i>',
      '3. El jefe [se ha marchado] ya hace una hora. <i>(marcharse)</i>', '4. Muchos clientes [se han quejado] del servicio. <i>(quejarse)</i>'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '다음 과거분사를 동사원형과 연결하세요.')}<div class="pm"></div>
      <h3 class="h3">⭐ 더 해 보기 — 과거분사를 쓰세요</h3><div class="items two w"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac1pm', sec: 'ac1', skill: 'par', pairs: [['escribir', 'escrito'], ['decir', 'dicho'], ['conocer', 'conocido'], ['comprar', 'comprado'], ['recibir', 'recibido'], ['viajar', 'viajado'], ['ir', 'ido'], ['abrir', 'abierto']] }));
    [['morir', 'muerto'], ['ver', 'visto'], ['hacer', 'hecho'], ['poner', 'puesto'], ['volver', 'vuelto'], ['leer', 'leído']]
      .forEach(([a, b], i) => put(s, '.w', writeItem({ id: 'ac1w' + i, sec: 'ac1', skill: 'par', prompt: `<span class="chip">${a}</span> →`, answers: [b] })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '주어진 동사를 선택하여 사진 속 상황을 묘사하세요.')}
      <div class="ybox wordbank">보기: <span>despertarse</span><span>tomar</span><span>hacer</span><span>bañarse</span><span>enviar</span><span>acostarse</span></div>
      ${modelo('(1) ⏰😴 <u>Se ha despertado</u> a las seis.')}<div class="items two"></div>`);
    [['🛁', '(2) ____.', ['Se ha bañado.']], ['☕👩‍🤝‍👩', '(3) ____ café con una amiga.', ['Ha tomado café con una amiga.']],
      ['📮✉️', '(4) ____ una carta.', ['Ha enviado una carta.']], ['🛒🍎', '(5) ____ la compra.', ['Ha hecho la compra.']], ['🛏️🌙', '(6) ____ a las doce.', ['Se ha acostado a las doce.']]]
      .forEach(([e, p, a], i) => put(s, '.items', writeItem({ id: 'ac2-' + i, sec: 'ac2', skill: 'per', prompt: `<span class="photo-emo">${e}</span> ${p}`, ph: '문장 전체를 쓰세요', answers: a })));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '인과 관계를 연결하여 문장을 완성하세요.')}
      <div class="ce-box"><div><b>consecuencias</b>${['María tiene fiebre', 'No puedo abrir la puerta', 'Han llegado tarde', 'Pedro está cansado', 'No debemos conducir'].map(x => `<p>• ${x}</p>`).join('')}</div>
        <div><b>causas</b>${['coger un catarro', 'haber mucho tráfico', 'nevar mucho', 'olvidar la llave', 'tener que caminar mucho'].map(x => `<p>• ${x}</p>`).join('')}</div></div>
      <div class="pm"></div>${modelo('(1) María tiene fiebre <b>porque ha cogido</b> un catarro.')}<div class="items"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac3pm', sec: 'ac3', skill: 'com', pairs: [['María tiene fiebre', 'coger un catarro'], ['No puedo abrir la puerta', 'olvidar la llave'], ['Han llegado tarde', 'haber mucho tráfico'], ['Pedro está cansado', 'tener que caminar mucho'], ['No debemos conducir', 'nevar mucho']] }));
    [['(2) No puedo abrir la puerta …', ['No puedo abrir la puerta porque he olvidado la llave.', 'No puedo abrir la puerta porque se me ha olvidado la llave.']],
      ['(3) Han llegado tarde …', ['Han llegado tarde porque ha habido mucho tráfico.']],
      ['(4) Pedro está cansado …', ['Pedro está cansado porque ha tenido que caminar mucho.']],
      ['(5) No debemos conducir …', ['No debemos conducir porque ha nevado mucho.']]]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'per', prompt: p, ph: '… porque ha …', answers: a })));
  };
  B.ac4 = () => {
    const s = sec('ac4', `${acHead(4, '사진을 보고 두 개의 표현을 연결하세요.', { kr: '스페인 여행에서 한 일 — ⛪ 사그라다 파밀리아 · 🤳 새 친구들 · 🖊️ ¿Hablas español? · 🥘 파에야' })}
      <div class="pm"></div>${modelo('(1) Ha hecho un curso intensivo de español.')}<div class="items"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac4pm', sec: 'ac4', skill: 'voc', pairs: [['hacer', 'curso intensivo de español'], ['visitar', 'Barcelona'], ['probar', 'paella'], ['conocer', 'a nuevos amigos']] }));
    [['⛪', '(2) Barcelona', ['Ha visitado Barcelona.']], ['🥘', '(3) paella', ['Ha probado la paella.', 'Ha probado paella.']], ['🤳', '(4) amigos', ['Ha conocido a nuevos amigos.']]]
      .forEach(([e, p, a], i) => put(s, '.items', writeItem({ id: 'ac4-' + i, sec: 'ac4', skill: 'per', prompt: `<span class="photo-emo">${e}</span> ${p}`, ph: 'Ha …', answers: a })));
  };
  B.ac5 = () => {
    const s = sec('ac5', `${acHead(5, '보기와 같이 주어진 질문에 답하세요.')}
      ${modelo('A: ¿Has estado alguna vez en Francia?<br>B: Sí, he estado una vez en París. / No, no he estado nunca en Francia.', '보기')}<div class="items"></div>`);
    const YN = { re: '(s[ií],? (yo )?' + HABER + ')|(no,? (yo )?no ' + HABER + ')|(nunca ' + HABER + ')', label: 'Sí, he … / No, no he …' };
    [['¿Has estado en algún otro país asiático?', 'estado', 'Sí, he estado dos veces en Japón.'], ['¿Has probado el jamón ibérico?', 'probado', 'No, no lo he probado nunca.'],
      ['¿Has visto alguna vez Eurovisión?', 'visto', 'Sí, la he visto una vez.'], ['¿Has discutido con un amigo recientemente?', 'discutido', 'No, no he discutido con nadie recientemente.'],
      ['¿Has descargado alguna canción últimamente?', 'descargado', 'Sí, he descargado varias canciones esta semana.']]
      .forEach(([q, pp, md], i) => put(s, '.items', freeItem({ id: 'ac5-' + i, sec: 'ac5', skill: 'exp', line: true, prompt: `(${i + 1}) ${q} ${say(q)}`,
        must: [YN, { re: pp, label: pp }], model: md })));
  };
  B.ac6 = () => {
    const s = sec('ac6', `${acHead(6, '주어진 표현을 활용하여 보기와 같이 묻고 답하세요.')}
      ${modelo('A: ¿Por qué no has cogido mi llamada?<br>B: Lo siento, es que he estado con una amiga.', '보기')}<div class="items"></div>`);
    [['¿Por qué has llegado tarde a clase esta mañana?', 'Lo siento, es que he perdido el autobús.'], ['¿Por qué no has invitado a Cristina a tu fiesta de cumpleaños?', 'Es que he discutido con ella.'],
      ['¿Por qué has tomado tanto café?', 'Es que he dormido muy poco.'], ['¿Por qué has tirado todos los papeles sucios?', 'Es que he limpiado mi habitación.'],
      ['¿Por qué no has devuelto los libros?', 'Lo siento, es que me he olvidado.']]
      .forEach(([q, md], i) => put(s, '.items', freeItem({ id: 'ac6-' + i, sec: 'ac6', skill: 'per', line: true, prompt: `A: ${q} ${say(q)}`, ph: 'B: Lo siento, es que …',
        must: [{ re: 'es que', label: 'es que …' }, { re: PP + '|' + HABER + ' (olvidado|perdido)', label: '현재완료로 이유 말하기' }], model: md })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('Santiago de Compostela', [
      { e: '⛪', h: '성 야곱의 유해', t: '예수의 12사도 중 한 사람인 성 야곱(<b>Santiago el Mayor</b>)이 순교한 뒤 제자들이 유해를 이베리아 반도로 옮겼다고 전해진다. 813년경 산 위의 불빛을 따라가 발견된 무덤을 국왕 알폰소 2세가 성 야곱의 것으로 여겼다.' },
      { e: '✨', h: '이름의 어원', t: '갈리시아의 주도로, 도시 중심에 150년에 걸쳐 쌓아 올린 대성당이 있다. 이름은 \'별이 빛나는 들판\'이라는 라틴어 <b>campus stellae</b>(campo de las estrellas)에서 왔다고도 한다.' },
      { e: '🐚', h: '순례자의 상징', t: '15세기 이래 유럽에서 가장 대표적인 순례지. 순례자들은 성 야곱을 상징하는 <b>가리비 조개</b> 모형을 몸에 지닌다.' },
      { e: '🥾', h: '순례길 (el Camino)', t: '여러 경로 중 프랑스 국경에서 출발해 스페인 북부의 도시와 시골 마을을 지나는 길이 대표적이다. 종교적 이유 외에도 삶의 의미를 찾는 많은 사람들이 매년 이 길을 걷는다.' }
    ], '파블로가 걸은 길 Burgos → Ponferrada → Santiago 도 이 순례길의 일부예요.') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['순례자들이 지니는 성 야곱의 상징은?', ['가리비 조개', '십자가 열쇠', '올리브 가지', '양초'], '가리비 조개', 'la concha (de vieira)'],
      ['campus stellae 의 뜻은?', ['별이 빛나는 들판', '성인의 무덤', '순례자의 길', '큰 성당'], '별이 빛나는 들판', 'campo de las estrellas'],
      ['Santiago de Compostela 는 어느 지방의 주도인가?', ['갈리시아', '카탈루냐', '안달루시아', '카스티야'], '갈리시아', 'Galicia — 스페인 북서부']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
    put(s, '.q', freeItem({ id: 'cul-f', sec: 'cultura', skill: 'per', rows: 3, prompt: '✍️ 순례길을 걸었다고 상상하고 엽서 첫 문장 2개를 현재완료로 쓰세요.', ph: '¡Hola! Hemos llegado a …',
      must: [{ re: PP, label: '현재완료 2번 이상', min: 2 }], model: '¡Hola, mamá! Hemos llegado a Santiago de Compostela esta mañana. Hemos caminado mucho y he conocido a muchos peregrinos.' }));
  };

  SC.lesson({
    num: '10',
    title: 'Hemos hecho el camino a Santiago de Compostela',
    ttsTest: 'Hemos hecho el camino a Santiago de Compostela.',
    cover: {
      emoji: '🥾🐚<small>⛪ 📮</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#7c3aed)',
      tema: ['Viajes y experiencias', 'El Camino de Santiago', 'Una postal'],
      com: ['과거분사: cantar (cantado), comer (comido), dormir (dormido)', 'decir (dicho), escribir (escrito), hacer (hecho), poner (puesto), abrir (abierto)', '현재완료형: Hemos visto el último episodio de la serie. · ¿Has probado el jamón ibérico?'],
      gram: ['과거분사 (규칙 · 불규칙)', '현재완료: haber + 과거분사', '경험 표현: ya · todavía · alguna vez · nunca', '대명사 위치: No los he recibido.']
    },
    skills: D.skills,
    sections: D.sections,
    people: { Juan: { g: 'm', av: '🧑🏻', side: 'l' }, Pablo: { g: 'm', av: '🧑🏽‍🦱', side: 'r' } },
    errLabels: { conjugacion: 'haber 변화 (he · has · ha …)', participio: '과거분사 형태', pronombre: '대명사 위치 (haber 앞)' },
    errTips: {
      acento: 'habéis, leído, oído, últimamente, todavía, jamón … 악센트도 철자예요.',
      conjugacion: 'haber: he, has, ha, hemos, habéis, han',
      participio: '불규칙: abierto, dicho, escrito, hecho, muerto, puesto, visto, vuelto',
      pronombre: '대명사는 haber 앞: No los he recibido. / Me he duchado.'
    },
    classify(ti, ta) {
      const H = ['he', 'has', 'ha', 'hemos', 'habéis', 'habeis', 'han'];
      const hi = ti.find(w => H.includes(w)), ha = ta.find(w => H.includes(w));
      if (ha && hi !== ha) return 'conjugacion';
      const P = ['me', 'te', 'se', 'nos', 'os', 'lo', 'la', 'los', 'las', 'le', 'les'];
      if (ti.filter(w => P.includes(w)).join() !== ta.filter(w => P.includes(w)).join()) return 'pronombre';
      const pi = ti.find(w => /(ado|ido|cho|to)$/.test(w)), pa = ta.find(w => /(ado|ido|cho|to)$/.test(w));
      if (pa && pi && pi !== pa) return 'participio';
      return null;
    },
    errRules: [
      { re: W0 + '(hacido|escribido|abrido|ponido|volvido|morido|vido|rompido)' + W1, t: 'participio', msg: '불규칙 과거분사: hecho · escrito · abierto · puesto · vuelto · muerto · visto · roto' },
      { re: W0 + 'habemos' + W1, t: 'conjugacion', msg: 'nosotros → hemos' },
      { re: W0 + HABER + ' (lo|la|los|las|me|te|se|nos|os|le|les) [a-záéíóú]+(ado|ido)' + W1, t: 'pronombre', msg: '대명사는 haber 앞: lo he visto' },
      { re: W0 + 'habeis' + W1, t: 'acento', msg: '"habéis"' },
      { re: W0 + '(leido|oido|creido|traido)' + W1, t: 'acento', msg: 'leído · oído · creído · traído' }
    ],
    accWords: ['habéis', 'todavía', 'últimamente', 'jamón', 'ibérico', 'maletín', 'sofá', 'compañeros', 'nacionalidad', 'leído', 'oído', 'mañana', 'también'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Una postal de mis vacaciones → 글로 쓰기',
        icons: ['📮', '🧳', '🌟'],
        questions: ['¿Dónde has estado este verano / estas vacaciones? ¿Con quién has ido?', '¿Qué has hecho allí? ¿Qué has visto, probado o conocido?', '¿Has estado alguna vez en España? ¿Has hecho ya el Camino de Santiago? ¿Qué no has hecho todavía?'],
        minWords: 55,
        hint: '현재완료 · 불규칙 과거분사(hecho, visto, dicho…) · 경험 표현(alguna vez, nunca, ya, todavía)을 모두 쓰면 높은 점수!',
        ph: '¡Hola, Begoña! Este verano he ido a …',
        connectors: ['y', 'pero', 'porque', 'como', 'además', 'por eso', 'también', 'al final', 'cuando'],
        rubric: [
          { k: 'lug', label: '장소 · 함께 간 사람', max: 6, re: 'en [A-ZÁÉÍÓÚa-záéíóú]+|con (mi|mis|un|una)', ax: 'Contenido' },
          { k: 'act', label: '한 일 (visto, probado, conocido …)', max: 8, re: '(visto|probado|conocido|visitado|comido|hecho|caminado|viajado)', min: 2, ax: 'Contenido' },
          { k: 'per', label: '현재완료 (haber + 과거분사) 4번 이상', max: 14, re: PP, min: 4, ax: 'Gramática' },
          { k: 'irr', label: '불규칙 과거분사 (hecho, visto, dicho, escrito, puesto, vuelto, abierto)', max: 8, re: '(hecho|visto|dicho|escrito|puesto|vuelto|abierto|muerto)', ax: 'Gramática' },
          { k: 'exp', label: '경험 표현 (ya, todavía, alguna vez, nunca, varias veces)', max: 8, re: 'ya|todav[ií]a|alguna vez|nunca|varias veces|una vez', ax: 'Gramática' },
          { k: 'tim', label: '현재완료 시간 표현 (este verano, hoy, hace poco …)', max: 6, re: 'este (verano|a[nñ]o|mes|invierno)|esta (semana|ma[nñ]ana|tarde)|hoy|hace (nada|poco|un rato)|[uú]ltimamente|recientemente', ax: 'Gramática' }
        ],
        model: '¡Hola, Begoña! Este verano he ido a España con mi primo. Hemos visitado Madrid y Barcelona y hemos probado la paella y el jamón ibérico. He conocido a mucha gente de diversas nacionalidades. Además, hemos hecho una parte del Camino de Santiago, pero no hemos llegado todavía a Santiago. ¿Has estado alguna vez en España? Yo nunca he visto una ciudad tan bonita. Besos.'
      }
    },
    build: B
  });
})();
