/* Lección 09 · Por fin, mañana es el día — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 121~134쪽 : Diálogo 1·2 → Vocabulario·Contesta → Amplía tu vocabulario → Gramática y ejercicios(연습문제 1~4)
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
      fut: 'Futuro ir a + inf. 미래',
      tie: 'Tiempo 날씨',
      fec: 'Fechas 날짜·요일·월',
      irr: 'Irregulares 불규칙동사',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo 1', kr: '엄마와 아들 카를로스', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'd2', label: 'Diálogo 2', kr: '교실에서 — 수학여행', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo' },
      { id: 'gram', label: 'Gramática', kr: '미래 · 날씨 · 날짜 · 불규칙동사', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: 'ir a + 동사원형', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '날씨 질문에 답하기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '요일 · 월 · 계절 표', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'e4', label: '연습문제 4', kr: '불규칙동사 현재형', group: 'Gramática y ejercicios', kind: 'ej', n: 4 },
      { id: 'ac1', label: 'Actividades 1', kr: '사진과 tener 표현 연결', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '한국의 날씨 V / F', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '사진 속 날씨 묘사', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'cultura', label: 'Cultura', kr: '스페인어에서 온 영어 표현', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo1: [
      { who: 'Mamá', es: 'Hijo, ¿qué vas a hacer hoy?' },
      { who: 'Carlos', es: 'Pues [voy a jugar] un partido de fútbol con mis amigos.' },
      { who: 'Mamá', es: 'Pero [está lloviendo].' },
      { who: 'Carlos', es: 'Sí, pero [según] el pronóstico del tiempo, por la tarde va a [dejar de] llover y va a [hacer mucho calor].' },
      { who: 'Mamá', es: '¿Y qué hacen tus amigos en casa cuando [llueve]?' },
      { who: 'Carlos', es: 'Muchas cosas, mami. Algunos estudian, otros leen y otros juegan con el computador.' },
      { who: 'Mamá', es: 'Bueno, pues [como] está lloviendo y todavía es temprano, ¿qué tal si tú y yo vamos a [hacer la compra]?' },
      { who: 'Carlos', es: 'Buena idea, mami. ¡Vamos! Te acompaño.' },
      { who: 'Mamá', es: 'Voy a hacer la [lista] de la compra.' },
      { who: 'Carlos', es: 'Yo necesito unas [botellas] de agua porque cuando juego al fútbol y hace calor, me da sed.' }
    ],
    dialogo2: [
      { who: 'Profesor', es: '[Por fin], mañana es el día: el del [viaje de estudios] a Taiwán.' },
      { who: 'Alumnos', es: 'Sí. Bla, bla, bla.' },
      { who: 'Manuel', es: 'Según las [noticias], mañana va a hacer muy [buen tiempo] allá.' },
      { who: 'Lucía', es: '¿De veras? Aquí va a haber muchas [nubes].' },
      { who: 'Otros alumnos', es: 'El viaje va a ser muy interesante.' },
      { who: 'Profesor', es: 'Sí, sí. [Estoy de acuerdo]. Pero necesito su [ayuda]. Primero, mañana todos los alumnos tienen que estar [a eso de] las ocho de la mañana en el Aeropuerto Internacional de Incheon.' },
      { who: 'Todos los alumnos', es: '[Por supuesto]. Podemos hacerlo [sin problema].' },
      { who: 'Profesor', es: 'Segundo, deben tener su [pasaporte] en su mano. No lo olviden. Es muy importante. Sin su pasaporte, no pueden viajar a ningún país.' },
      { who: 'Todos los alumnos', es: 'Entendido. Mañana a las ocho de la mañana con el pasaporte en la mano.' },
      { who: 'Lucía', es: 'Voy a acostarme temprano. Estoy muy [emocionada].' }
    ],

    voc1: [
      { es: 'campo de fútbol', kr: '축구장', e: '🏟️' }, { es: 'llover', kr: '비 오다', e: '🌧️' }, { es: 'a partir de', kr: '~부터', e: '➡️' },
      { es: 'no importa', kr: '나는 상관없다', e: '🤷' }, { es: 'ir a la compra', kr: '장 보러 가다', e: '🛒' }, { es: 'cambiarse de ropa', kr: '옷을 갈아입다', e: '👕' },
      { es: 'botella', kr: '병', e: '🍾' }, { es: 'entonces', kr: '그렇다면, 그때', e: '👉' }, { es: 'dejar de', kr: '~을 멈추다', e: '✋' },
      { es: 'como', kr: '~때문에', e: '💡' }, { es: 'además', kr: '게다가', e: '➕' }, { es: 'antes de', kr: '~ 전에', e: '⏮️' },
      { es: 'lista', kr: '리스트', e: '📝' }, { es: 'agua', kr: '물', e: '💧' }
    ],
    voc2: [
      { es: 'por fin', kr: '마침내', e: '🎉' }, { es: 'según', kr: '~에 의하면', e: '📰' }, { es: 'allá', kr: '저곳', e: '👉' },
      { es: 'estar de acuerdo', kr: '동의하다', e: '🤝' }, { es: 'segundo', kr: '두 번째', e: '2️⃣' }, { es: 'por supuesto', kr: '물론', e: '👌' },
      { es: 'emocionado', kr: '감격한, 들뜬', e: '🤩' }, { es: 'viaje de estudios', kr: '수학여행', e: '🧳' }, { es: 'noticia', kr: '뉴스', e: '📺' },
      { es: 'nube', kr: '구름', e: '☁️' }, { es: 'ayuda', kr: '도움', e: '🆘' }, { es: 'a eso de', kr: '대략 (~시쯤)', e: '🕗' },
      { es: 'sin problema', kr: '문제없이', e: '✅' }, { es: 'Aeropuerto Internacional de Incheon', kr: '인천국제공항', e: '✈️' }
    ],
    amplia: [
      { es: 'billete de ida y vuelta', kr: '왕복표', e: '🎫' }, { es: 'mapa', kr: '지도', e: '🗺️' }, { es: 'avión', kr: '비행기', e: '✈️' },
      { es: 'bolsa plástica', kr: '비닐봉지', e: '🛍️' }, { es: 'obra de teatro', kr: '연극', e: '🎭' }, { es: 'campo', kr: '시골', e: '🌾' },
      { es: 'playa', kr: '해변', e: '🏖️' }, { es: 'bosque', kr: '숲, 산림', e: '🌲' }, { es: 'pasear', kr: '산책하다', e: '🚶' }
    ],

    /* 쓰기 모의시험 Parte A 문제은행 */
    examBank: [
      { p: 'Mañana yo ____ a ir a la playa. <i>(ir)</i>', a: ['voy'], s: 'fut' },
      { p: '¿Qué ____ a hacer tú esta noche? <i>(ir)</i>', a: ['vas'], s: 'fut' },
      { p: 'Nosotros ____ a descansar el lunes. <i>(ir)</i>', a: ['vamos'], s: 'fut' },
      { p: 'Mis alumnos van ____ jugar al baloncesto.', a: ['a'], s: 'fut' },
      { p: 'Vosotros ____ a llegar a tiempo. <i>(ir)</i>', a: ['vais'], s: 'fut' },
      { p: 'Hoy ____ buen tiempo. <i>(날씨가 좋다)</i>', a: ['hace'], s: 'tie' },
      { p: 'En invierno ____ mucho en el centro. <i>(nevar)</i>', a: ['nieva'], s: 'tie' },
      { p: 'Está ____. <i>(지금 비가 오고 있다)</i>', a: ['lloviendo'], s: 'tie' },
      { p: '____ nubes en el cielo. <i>(구름이 있다)</i>', a: ['hay'], s: 'tie' },
      { p: 'Tengo ____. <i>(나는 춥다)</i>', a: ['frío'], s: 'tie' },
      { p: 'Estamos a tres bajo ____. <i>(영하 3도)</i>', a: ['cero'], s: 'tie' },
      { p: '¿Qué ____ es hoy? — Es 15 de agosto.', a: ['fecha'], s: 'fec' },
      { p: '¿Qué ____ es hoy? — Hoy es viernes.', a: ['día'], s: 'fec' },
      { p: 'El día después del martes es el ____.', a: ['miércoles'], s: 'fec' },
      { p: 'El primer mes del año es ____.', a: ['enero'], s: 'fec' },
      { p: 'Después del verano viene el ____.', a: ['otoño'], s: 'fec' },
      { p: 'Yo te ____ bien. <i>(oír)</i>', a: ['oigo'], s: 'irr' },
      { p: 'Yo ____ el libro a clase. <i>(traer)</i>', a: ['traigo'], s: 'irr' },
      { p: 'Nosotros ____ mucho frío. <i>(tener)</i>', a: ['tenemos'], s: 'irr' },
      { p: '¿Qué ____ tú en clase? <i>(hacer)</i>', a: ['haces'], s: 'irr' },
      { p: 'Esta fábrica ____ coches. <i>(producir)</i>', a: ['produce'], s: 'irr' }
    ]
  };

  const B = {};
  const FUT = W0 + '(voy|vas|va|vamos|vais|van) a [a-záéíóúñ]+(r|rse|rme|rte|rnos)' + W1;
  const TIEMPO = '(hace|hac[ií]a|va a hacer)\\s+(buen|mal|bueno|malo|sol|calor|fr[ií]o|viento|fresco|mucho|muy)|llueve|nieva|est[aá] (lloviendo|nevando|nublado)|hay (sol|nubes|luna|viento|niebla|tormenta)|grados';

  /* ---------- Diálogo 1 ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'Una mamá habla con su hijo.')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo1, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'tie', cls: 'lines', text: SC.clozeFromDialog(D.dialogo1) }));
    ['Hijo, ¿qué vas a hacer hoy?', 'Por la tarde va a hacer mucho calor.', 'Voy a hacer la lista de la compra.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'fut', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.slice(0, 10).forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Qué tiempo hace cuando hablan madre e hijo?', kw: [['llueve|lloviendo', 'llueve / está lloviendo']], model: 'Está lloviendo.' },
      { q: '¿Qué tiempo va a hacer por la tarde?', kw: [['va a (dejar de llover|hacer)', 'va a + 동사원형'], ['calor', 'calor']], model: 'Por la tarde va a dejar de llover y va a hacer mucho calor.' },
      { q: '¿Qué van a hacer Carlos y su madre?', kw: [['(van a|vamos a) (hacer|ir a) la compra', 'van a hacer la compra']], model: 'Van a hacer la compra.' },
      { q: '¿Qué desea comprar Carlos?', kw: [['botellas? de agua', 'botellas de agua']], model: 'Desea comprar unas botellas de agua.' },
      { q: '¿Por qué quiere ir a la compra la madre?', kw: [['porque', 'Porque …'], ['lloviendo|llueve|temprano', '비 / 이른 시간']], model: 'Porque está lloviendo y todavía es temprano.' }
    ] }));
  };

  /* ---------- Diálogo 2 ---------- */
  B.d2 = () => {
    const s = sec('d2', `${dlgHead(2, 'En la clase')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기</h3><div class="c"></div>
      <h3 class="h3">📋 선생님의 준비물 체크리스트 — ¿Verdadero o falso?</h3><div class="items vf"></div>`);
    put(s, '.dslot', dialogBlock('d2', D.dialogo2));
    put(s, '.c', cloze({ id: 'd2c', sec: 'd2', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo2) }));
    [['El viaje de estudios es a Taiwán.', 'Verdadero'], ['En Taiwán va a hacer mal tiempo.', 'Falso'], ['Los alumnos tienen que estar en el aeropuerto a eso de las ocho.', 'Verdadero'],
      ['Sin pasaporte pueden viajar sin problema.', 'Falso'], ['Lucía va a acostarse tarde.', 'Falso']]
      .forEach(([p, a], i) => put(s, '.vf', choiceItem({ id: 'd2vf' + i, sec: 'd2', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.slice(0, 8).map(v => [v.es, v.kr]) }));
    D.voc2.slice(6, 14).forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Adónde van los alumnos?', kw: [['taiw[aá]n', 'Taiwán']], model: 'Van a Taiwán de viaje de estudios.' },
      { q: '¿Qué tiempo hace en el lugar que van a visitar los alumnos?', kw: [['buen tiempo', 'buen tiempo']], model: 'Va a hacer muy buen tiempo.' },
      { q: '¿Dónde deben estar los alumnos a eso de las ocho de la mañana?', kw: [['aeropuerto', 'en el Aeropuerto (Internacional de Incheon)']], model: 'Deben estar en el Aeropuerto Internacional de Incheon.' },
      { q: '¿Qué tienen que tener los alumnos en su mano?', kw: [['pasaporte', 'su pasaporte']], model: 'Tienen que tener su pasaporte en la mano.' },
      { q: '¿Cómo está Lucía?', kw: [['emocionada', 'emocionada']], model: 'Está muy emocionada.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ ir a + 동사원형으로 계획 말하기</h3>${modelo('Este fin de semana <b>voy a</b> pasear por el bosque.<br>Mañana <b>vamos a</b> ver una obra de teatro.')}<div class="items f"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 3 }));
    put(s, '.f', freeItem({ id: 'amp-f', sec: 'amplia', skill: 'fut', rows: 3, prompt: '위 단어 2개 이상을 넣어 이번 주말 계획을 2문장으로 쓰세요.', ph: 'Este fin de semana voy a …',
      must: [{ re: FUT, label: 'ir a + 동사원형 2번 이상', min: 2 }, { re: D.amplia.map(a => SC.rx(a.es)).join('|'), label: 'Amplía 단어 2개 이상', min: 2 }],
      model: 'Este fin de semana voy a pasear por el bosque con mi perro. El domingo voy a ver una obra de teatro con mis padres.' }));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 미래 표현 — 예측 가능한 미래, 계획 · 의도</h3>
        <div class="blocks"><span class="bk p">voy / vas / va …</span><span class="bk o">a</span><span class="bk v">동사원형</span><span class="bk s">시간부사구</span><span class="small">~할 예정이다</span></div>
        <table class="gtab"><tr><th></th><th>ir</th><th></th><th>동사원형</th><th>시간부사구</th></tr>
          <tr><td>1인칭 단수</td><td class="hi">voy</td><td rowspan="6">a</td><td rowspan="6">ir a la playa<br>tomar un café<br>hacer los deberes<br>descansar<br>tocar la guitarra<br>nadar</td><td rowspan="6">luego / esta tarde<br>esta noche<br>el próximo día / el lunes<br>la próxima semana<br>el año que viene<br>la semana que viene</td></tr>
          <tr><td>2인칭 단수</td><td class="hi">vas</td></tr><tr><td>3인칭 단수</td><td class="hi">va</td></tr><tr><td>1인칭 복수</td><td class="hi">vamos</td></tr><tr><td>2인칭 복수</td><td class="hi">vais</td></tr><tr><td>3인칭 복수</td><td class="hi">van</td></tr></table>
        ${tip('<b>a</b>를 빠뜨리지 마세요: Voy <b>a</b> ir a la playa. (Voy ir ✕)')}
        <div class="g1"></div><div class="items g1b"></div></div>
      <div class="gcard"><h3>2. 날씨 표현</h3>
        <table class="gtab">
          <tr><th>날씨 묻기</th><td class="l" colspan="2">¿Qué tiempo hace hoy? ${say('¿Qué tiempo hace hoy?')} 오늘 날씨가 어때요?<br>¿Cómo está el tiempo? ${say('¿Cómo está el tiempo?')}</td></tr>
          <tr><th rowspan="4">날씨 표현</th><td><b>Hace</b></td><td class="l">buen tiempo / bueno 날씨가 좋다 · mal tiempo / malo 날씨가 나쁘다<br>sol · calor · frío · viento · fresco 해가 난다 · 덥다 · 춥다 · 바람이 분다 · 선선하다</td></tr>
          <tr><td><b>Llueve / Nieva</b></td><td class="l">비가 온다 / 눈이 온다 · Está lloviendo / Está nevando (지금)</td></tr>
          <tr><td><b>Hay</b></td><td class="l">sol · nubes · luna · viento 햇볕이 든다 · 구름이 있다 · 달이 떠 있다 · 바람이 있다</td></tr>
          <tr><td><b>Está</b></td><td class="l">nublado 날씨가 흐리다</td></tr>
          <tr><th>날씨에 대한 감각</th><td><b>Tener</b></td><td class="l">calor / frío — Tengo calor. 나는 덥다. Tengo frío. 나는 춥다.</td></tr>
          <tr><th>기온 묻기</th><td colspan="2" class="l">¿A cuántos grados estamos? · ¿A qué temperatura estamos? · ¿Qué temperatura hace mañana?<br>Estamos a tres bajo cero (−3 ℃). · Hace 35 grados / Estamos a 35 grados (35 ℃).</td></tr></table>
        <div class="wx">${[['☀️', 'Hace sol'], ['🥵', 'Hace calor'], ['🥶', 'Hace frío'], ['💨', 'Hace viento'], ['🍃', 'Hace fresco'], ['🌧️', 'Llueve'], ['❄️', 'Nieva'], ['☁️', 'Está nublado']].map(([e, t]) => `<div class="wxc"><span>${e}</span><b>${t}</b>${say(t)}</div>`).join('')}</div>
        ${tip('<b>Hace</b> + 명사(sol, calor, frío…) / <b>Hay</b> + 명사(nubes, niebla…) / <b>Está</b> + 형용사·현재분사(nublado, lloviendo). 동사 llover · nevar 는 그대로 3인칭 단수: llueve, nieva.')}
        <div class="g2"></div></div>
      <div class="gcard"><h3>3. 날짜와 요일 표현</h3>
        <table class="gtab"><tr><th>날짜 묻기</th><td class="l">¿Qué fecha es hoy? · ¿Cuál es la fecha de hoy? → <b>Es 15 de agosto.</b><br>¿A cuántos estamos hoy? → <b>Estamos a 11 de julio.</b></td></tr>
          <tr><th>요일 묻기</th><td class="l">¿Qué día es hoy? → <b>Hoy es viernes.</b><br>¿A qué estamos hoy? → <b>Hoy estamos a viernes.</b></td></tr></table>
        <div class="cal">${['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map((d, i) => `<span class="${i > 4 ? 'we' : ''}">${'월화수목금토일'[i]}<b>${d}</b></span>`).join('')}</div>
        <div class="seasons">${[['🌸', 'la primavera', '봄', 'marzo · abril · mayo'], ['☀️', 'el verano', '여름', 'junio · julio · agosto'], ['🍂', 'el otoño', '가을', 'septiembre · octubre · noviembre'], ['⛄', 'el invierno', '겨울', 'diciembre · enero · febrero']].map(([e, s1, k, m]) => `<div class="ssn"><span>${e}</span><b>${s1}</b><small>${k} · ${m}</small></div>`).join('')}</div>
        ${tip('요일 · 월 이름은 <b>소문자</b>로 써요. "~요일에"는 정관사: <b>el lunes</b>(이번 월요일), <b>los lunes</b>(매주 월요일).')}
        <div class="g3"></div></div>
      <div class="gcard"><h3>4. 그 밖의 불규칙동사 — 1인칭 단수가 특이해요</h3>
        <table class="gtab"><tr><th></th><th>producir 생산하다</th><th>traer 가져오다</th><th>oír 듣다</th></tr>
          ${[['1인칭 단수', 'produzco', 'traigo', 'oigo'], ['2인칭 단수', 'produces', 'traes', 'oyes'], ['3인칭 단수', 'produce', 'trae', 'oye'], ['1인칭 복수', 'producimos', 'traemos', 'oímos'], ['2인칭 복수', 'producís', 'traéis', 'oís'], ['3인칭 복수', 'producen', 'traen', 'oyen']]
            .map(([p, a, b, c], i) => `<tr><td>${p}</td><td class="${i ? '' : 'hi'}">${a}</td><td class="${i ? '' : 'hi'}">${b}</td><td class="${i === 0 || i === 1 || i === 2 || i === 5 ? 'hi' : ''}">${c}</td></tr>`).join('')}</table>
        ${tip('같은 유형: conducir → conduzco, traducir → traduzco / caer → caigo / hacer → hago, tener → tengo')}
        <div class="g4"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'fut', title: 'ir 동사의 현재형을 쓰세요.', cls: 'table2', text:
      [['yo', 'voy'], ['tú', 'vas'], ['él / ella / usted', 'va'], ['nosotros/as', 'vamos'], ['vosotros/as', 'vais'], ['ellos / ellas / ustedes', 'van']].map(([a, b]) => `<p><span>${a}</span> → [${b}] a nadar</p>`).join('') }));
    [['🏖️ yo · ir a la playa · esta tarde', 'Voy a ir a la playa esta tarde.'], ['☕ nosotros · tomar un café · luego', 'Vamos a tomar un café luego.'], ['🎸 Ana · tocar la guitarra · esta noche', 'Ana va a tocar la guitarra esta noche.']]
      .forEach(([p, a], i) => put(s, '.g1b', writeItem({ id: 'g1b-' + i, sec: 'gram', skill: 'fut', prompt: p, answers: [a, a.replace(/^(Voy|Vamos) /, m => (m === 'Voy ' ? 'Yo voy ' : 'Nosotros vamos '))] })));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'tie', title: 'hace / hay / está / llueve / tengo 중 알맞은 말을 쓰세요.', cls: 'lines', text:
      ['☀️ Hoy [hace] mucho sol.', '☁️ [Hay] muchas nubes. / [Está] nublado.', '🌧️ ¡Mira! [Está] lloviendo.', '🥶 [Tengo] frío. ¿Cierras la ventana?', '❄️ En invierno [nieva] mucho en Gangwon-do. <i>(nevar)</i>', '🌡️ ¿A qué temperatura [estamos]? — Estamos a 25 grados.'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'fec', title: '날짜 · 요일 대화를 완성하세요.', cls: 'lines', text:
      ['A: ¿Qué [fecha] es hoy? — B: Es 15 [de] agosto.', 'A: ¿A [cuántos] estamos hoy? — B: Estamos a 11 de julio.', 'A: ¿Qué [día] es hoy? — B: Hoy [es] viernes.'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g4', cloze({ id: 'g4', sec: 'gram', skill: 'irr', title: '1인칭 단수(yo)로 쓰세요.', cls: 'table2', text:
      [['producir', 'produzco'], ['traer', 'traigo'], ['oír', 'oigo'], ['conducir', 'conduzco'], ['caer', 'caigo'], ['hacer', 'hago']].map(([a, b]) => `<p><span>${a}</span> → yo [${b}]</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '다음 질문에 답하시오.', { kr: '주어 / 동사구를 보고 ir a + 동사원형 문장을 쓰세요.' })}<div class="items"></div>`);
    [['La obra de teatro / empezar pronto', 'La obra de teatro va a empezar pronto.'], ['Nosotros / llegar a tiempo al aeropuerto', 'Nosotros vamos a llegar a tiempo al aeropuerto.', 'Vamos a llegar a tiempo al aeropuerto.'],
      ['Julia / estudiar mucho', 'Julia va a estudiar mucho.'], ['Mis alumnos / jugar al baloncesto', 'Mis alumnos van a jugar al baloncesto.'],
      ['Mamá / hacer la cama en vez de mí', 'Mamá va a hacer la cama en vez de mí.'], ['Tú / comprar unos dulces', 'Tú vas a comprar unos dulces.', 'Vas a comprar unos dulces.']]
      .forEach(([p, ...a], i) => put(s, '.items', writeItem({ id: 'e1-' + i, sec: 'e1', skill: 'fut', prompt: `${i + 1}. ${p}`, ph: '→', answers: a })));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '다음 질문에 답하세요.', { kr: '나의 도시 · 나라의 날씨로 자유롭게 답해요. 날씨 표현이 들어가면 ○' })}<div class="items"></div>`);
    [['¿Llueve mucho en tu ciudad?', [{ re: 'llueve', label: 'llueve (llover)' }], 'No llueve mucho en invierno pero llueve bastante en verano.'],
      ['¿Cuál es la temperatura media de tu país?', [{ re: '(\\d+|[a-záéíóú]+) grados', label: '… grados' }], 'Es de 15 grados (15 °C).'],
      ['¿A qué temperatura estamos?', [{ re: 'estamos a', label: 'Estamos a …' }, { re: 'grados', label: 'grados' }], 'Estamos a 25 grados (25 °C).'],
      ['¿No nieva en tu ciudad?', [{ re: 'nieva', label: 'nieva (nevar)' }], 'Nieva mucho en invierno.'],
      ['¿Hace mucho calor en verano y hace mucho frío en invierno?', [{ re: 'hace (mucho )?calor', label: 'hace calor' }, { re: 'hace (mucho )?fr[ií]o', label: 'hace frío' }], 'Sí, hace mucho calor en verano y hace mucho frío en invierno.']]
      .forEach(([q, m, md], i) => put(s, '.items', freeItem({ id: 'e2-' + i, sec: 'e2', skill: 'tie', line: true, prompt: `${i + 1}. ${q} ${say(q)}`, ph: '→', must: m, model: md })));
  };
  B.e3 = () => {
    const DAYS = [['월', 'lunes'], ['화', 'martes', 1], ['수', 'miércoles'], ['목', 'jueves', 1], ['금', 'viernes'], ['토', 'sábado', 1], ['일', 'domingo']];
    const MON = [['1월', 'enero'], ['2월', 'febrero', 1], ['3월', 'marzo'], ['4월', 'abril', 1], ['5월', 'mayo'], ['6월', 'junio', 1], ['7월', 'julio', 1], ['8월', 'agosto'], ['9월', 'septiembre', 1], ['10월', 'octubre'], ['11월', 'noviembre', 1], ['12월', 'diciembre']];
    const cell = ([k, es, given]) => given ? `<td><small>${k}</small><b>${es}</b></td>` : `<td><small>${k}</small>[${es}]</td>`;
    const s = sec('e3', `${ejHead(3, '빈칸에 들어갈 말을 쓰세요.', { kr: '교재 표처럼 비어 있는 칸만 스페인어로 채워요 (소문자!).' })}
      <h3 class="h3">1. 요일을 알맞게 쓰시오.</h3><div class="t1"></div>
      <h3 class="h3">2. 월을 알맞게 쓰시오.</h3><div class="t2"></div>
      <h3 class="h3">3. 계절을 쓰시오.</h3><div class="t3"></div>
      <h3 class="h3">⭐ 달력 퀴즈</h3><div class="items q"></div>`);
    put(s, '.t1', cloze({ id: 'e3a', sec: 'e3', skill: 'fec', cls: 'caltab', text: `<table class="gtab"><tr>${DAYS.map(cell).join('')}</tr></table>` }));
    put(s, '.t2', cloze({ id: 'e3b', sec: 'e3', skill: 'fec', cls: 'caltab', text: `<table class="gtab"><tr>${MON.slice(0, 6).map(cell).join('')}</tr><tr>${MON.slice(6).map(cell).join('')}</tr></table>` }));
    put(s, '.t3', cloze({ id: 'e3c', sec: 'e3', skill: 'fec', cls: 'caltab', text: '<table class="gtab"><tr><td>🌸 봄: la [primavera]</td><td>☀️ 여름: <b>el verano</b></td><td>🍂 가을: el [otoño]</td><td>⛄ 겨울: <b>el invierno</b></td></tr></table>' }));
    [['¿Qué día es después del jueves?', ['viernes', 'el viernes', 'Es viernes.']], ['¿En qué mes es Navidad?', ['diciembre', 'en diciembre']],
      ['¿Qué estación es en julio en Corea?', ['el verano', 'verano', 'es verano']], ['¿Qué día es hoy? (오늘은 토요일)', ['Hoy es sábado.']]]
      .forEach(([q, a], i) => put(s, '.q', writeItem({ id: 'e3q' + i, sec: 'e3', skill: 'fec', prompt: `${q} ${say(q.replace(/\(.*\)/, ''))}`, answers: a })));
  };
  B.e4 = () => {
    const s = sec('e4', `${ejHead(4, '다음 괄호 안의 동사원형을 인칭에 알맞게 현재시제로 활용하여 쓰세요.')}<div class="items"></div>`);
    [['Yo te (oír) bien.', 'Yo te oigo bien.'], ['¿(conducir) tu padre bien?', '¿Conduce tu padre bien?'], ['Nosotros (tener) mucho frío.', 'Nosotros tenemos mucho frío.'],
      ['¿Qué (hacer) tú en clase?', '¿Qué haces tú en clase?'], ['¿Me (caer) bien este sombrero?', '¿Me cae bien este sombrero?']]
      .forEach(([p, a], i) => put(s, '.items', writeItem({ id: 'e4-' + i, sec: 'e4', skill: 'irr', prompt: `${i + 1}. ${p}`, ph: '→ 문장 전체를 쓰세요', answers: [a] })));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '사진과 어울리는 표현을 찾아 연결하세요.')}<div class="pm"></div>
      <h3 class="h3">✍️ 나는 언제? — Cuando …, tengo …</h3><div class="items f"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac1pm', sec: 'ac1', skill: 'tie', pairs: [
      ['🍽️😩 <small>포크를 들고 기다리는 소녀</small>', 'tener hambre'], ['🕗🏃‍♂️ <small>시계를 보며 뛰는 남자</small>', 'tener prisa'], ['🧣🥶 <small>손을 호호 부는 소녀</small>', 'tener frío'],
      ['🌡️☀️ <small>40도 온도계와 태양</small>', 'tener calor'], ['🥱 <small>하품하는 여자</small>', 'tener sueño']] }));
    [['🥵', 'calor', 'Cuando hace sol en verano, tengo calor.'], ['🥶', 'frío', 'Cuando nieva, tengo frío.'], ['🥱', 'sueño', 'Cuando estudio por la noche, tengo sueño.']]
      .forEach(([e, k, md], i) => put(s, '.f', freeItem({ id: 'ac1f' + i, sec: 'ac1', skill: 'tie', line: true, prompt: `<span class="emo-sm">${e}</span> ¿Cuándo tienes ${k}?`, ph: `Cuando …, tengo ${k}.`,
        must: [{ re: 'cuando', label: 'Cuando …' }, { re: 'tengo ' + k.replace('í', '[ií]'), label: `tengo ${k}` }], model: md })));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '다음은 한국의 날씨를 설명한 것이다. 맞으면 V, 틀리면 F에 표시하세요.')}<div class="items vf-tab"></div>
      <h3 class="h3">✍️ 틀린 문장을 바르게 고쳐 쓰세요</h3><div class="items fx"></div>`);
    [['En general, hay una época de lluvia en verano.', 'V'], ['En invierno nieva mucho en el centro.', 'F'], ['En verano hace mucho calor.', 'V'],
      ['En primavera llueve tanto como en verano.', 'F'], ['En otoño caen las hojas de los árboles.', 'V']]
      .forEach(([p, a], i) => put(s, '.vf-tab', choiceItem({ id: 'ac2-' + i, sec: 'ac2', skill: 'com', prompt: `(${i + 1}) ${p} ${say(p)}`, options: ['V', 'F'], answer: a,
        explain: ['장마(la época de lluvia)는 여름이에요.', '눈은 주로 산간 지역(강원도)에 많이 와요.', '여름은 아주 덥고 습해요.', '봄비는 여름 장마만큼 많지 않아요.', '가을에는 나뭇잎이 떨어져요.'][i] })));
    put(s, '.fx', freeItem({ id: 'ac2f', sec: 'ac2', skill: 'tie', line: true, prompt: '(4) En primavera llueve tanto como en verano. → 바르게', ph: 'En primavera …',
      must: [{ re: 'primavera', label: 'primavera' }, { re: 'no llueve tanto|llueve (menos|poco)', label: 'no llueve tanto / llueve menos' }], model: 'En primavera no llueve tanto como en verano.' }));
  };
  B.ac3 = () => {
    const P = [['⛈️🌃', 'Hay tormenta. / Hay relámpagos.', 'tormenta|rel[aá]mpago|truen'], ['🌫️🏙️', 'Hay niebla. / Está nublado.', 'niebla|nublado|nubes'], ['🌧️☂️', 'Llueve. / Está lloviendo.', 'llueve|lloviendo|lluvia'],
      ['🏝️☀️', 'Hace sol y hace calor.', 'sol|calor|buen tiempo'], ['🌥️🌆', 'Está nublado. / Hay muchas nubes.', 'nublado|nubes|mal tiempo'], ['🌴💨', 'Hace mucho viento.', 'viento']];
    const s = sec('ac3', `${acHead(3, '사진 속의 날씨를 묘사해보세요.')}
      ${tip('hace · hay · está · llueve · nieva 를 골고루 써 보세요. 새 단어: <b>la tormenta</b> 폭풍우, <b>el relámpago</b> 번개, <b>la niebla</b> 안개')}
      <div class="items two"></div>`);
    P.forEach(([e, md, kw], i) => put(s, '.items', freeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'tie', line: true, prompt: `<span class="photo-emo">${e}</span>`, ph: '¿Qué tiempo hace?',
      must: [{ re: TIEMPO + '|tormenta|niebla|rel[aá]mpago', label: '날씨 표현 (hace / hay / está / llueve…)' }, { re: kw, label: '사진에 맞는 날씨' }], model: md })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('스페인어에서 온 영어 표현들', [
      { e: '🤠🐎', h: 'Rodeo', t: '길들이지 않은 말이나 소를 탄 채 떨어지지 않고 오래 버티거나 길들이는 경기. 스페인어 동사 <b>rodear</b>(에워싸다, 둘러싸다)에서 왔다.' },
      { e: '🍫', h: 'Chocolate', t: '초콜릿은 멕시코 <b>나우아틀어</b>에 어원이 있는데 \'쓴 물\'이라는 뜻이다.' },
      { e: '🦅', h: 'Cóndor', t: '콘도르는 잉카인들의 언어인 <b>케추아어</b>에서 왔으며 \'가장 큰 새\'라는 뜻이다.' },
      { e: '🌪️', h: 'Tornado', t: '토네이도는 스페인어 동사 <b>tronar</b>(천둥이 치다)의 과거분사 형태인 <b>tronado</b>에서 왔다.' }
    ], '영어 속에는 스페인어나 스페인어를 거쳐 들어온 중남미 원주민 언어 단어가 많아요.') + `<h3 class="h3">🔎 확인 퀴즈</h3><div class="items q"></div>`);
    [['tornado 의 어원 동사는?', ['tronar', 'rodear', 'tomar', 'traer'], 'tronar', '천둥이 치다 → tronado'],
      ['chocolate 의 어원 언어는?', ['나우아틀어', '케추아어', '라틴어', '아랍어'], '나우아틀어', '멕시코 아스테카인의 언어'],
      ['cóndor 의 뜻은?', ['가장 큰 새', '쓴 물', '둘러싸다', '천둥'], '가장 큰 새', '케추아어']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
  };

  SC.lesson({
    num: '09',
    title: 'Por fin, mañana es el día',
    ttsTest: 'Por fin, mañana es el día.',
    cover: {
      emoji: '✈️🌦️<small>📅 🧳</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#c2410c)',
      tema: ['El tiempo y las estaciones', 'Los días de la semana y los meses', 'Planes para el futuro'],
      com: ['미래 표현: Vamos a descansar el lunes. · Voy a ir a la playa esta tarde.', '날씨 표현: Hace bueno / malo / calor / frío / viento / sol · Nieva mucho.', '날짜 · 요일 표현: ¿Qué día es hoy? · ¿Qué fecha es hoy?'],
      gram: ['<i>ir a</i> + 동사원형', '날씨: hace · hay · está · llover · nevar · tener calor/frío', '불규칙동사: producir, traer, oír']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      'Mamá': { g: 'f', av: '👩🏻', side: 'r' }, Carlos: { g: 'm', av: '👦🏻', side: 'l' },
      Profesor: { g: 'm', av: '👨🏻‍🏫', side: 'l' }, Alumnos: { g: 'f', av: '🧑‍🤝‍🧑', side: 'r' }, Manuel: { g: 'm', av: '🧑🏻', side: 'r' }, 'Lucía': { g: 'f', av: '👧🏻', side: 'r' },
      'Otros alumnos': { g: 'f', av: '👫', side: 'r' }, 'Todos los alumnos': { g: 'f', av: '👨‍👩‍👧‍👦', side: 'r' }
    },
    errLabels: { conjugacion: 'ir 동사 · 불규칙 변화', estructura: 'ir a + 동사원형 구조', tiempo: '날씨 동사 (hace / hay / está)' },
    errTips: {
      acento: 'está, frío, miércoles, sábado, otoño, también … 악센트도 철자예요.',
      conjugacion: 'ir: voy, vas, va, vamos, vais, van / oír→oigo, traer→traigo, producir→produzco',
      estructura: 'ir + a + 동사원형 — "Voy ir"(✕) → "Voy a ir"(○)',
      tiempo: 'Hace calor/frío/sol · Hay nubes · Está nublado/lloviendo · Llueve · Nieva · Tengo frío(내가 추움)'
    },
    classify(ti, ta) {
      const IR = ['voy', 'vas', 'va', 'vamos', 'vais', 'van'];
      const vi = ti.find(w => IR.includes(w)), va = ta.find(w => IR.includes(w));
      if (va && vi && vi !== va) return 'conjugacion';
      if (va && ta.includes('a') && !ti.includes('a')) return 'estructura';
      const T = ['hace', 'hay', 'está', 'esta', 'tengo'];
      if (ti.filter(w => T.includes(w)).join() !== ta.filter(w => T.includes(w)).join()) return 'tiempo';
      return null;
    },
    errRules: [
      { re: W0 + '(voy|vas|va|vamos|vais|van) (ir|hacer|jugar|estudiar|comer|descansar|nadar|tomar|ver|viajar|llegar|comprar|leer|salir|pasear)' + W1, t: 'estructura', msg: 'ir 다음에 a: "voy a …"' },
      { re: W0 + 'yo (va|vas|vamos)' + W1, t: 'conjugacion', msg: 'yo → voy' },
      { re: W0 + '(estoy|est[aá]|es) (calor|fr[ií]o|sol|viento)' + W1, t: 'tiempo', msg: '날씨는 hace: "Hace calor"' },
      { re: W0 + 'hace (nubes|nublado|lloviendo)' + W1, t: 'tiempo', msg: 'Hay nubes / Está nublado / Está lloviendo' },
      { re: W0 + '(soy|estoy) (calor|fr[ií]o)' + W1, t: 'tiempo', msg: '몸의 감각은 tener: "Tengo frío"' },
      { re: W0 + '(oyo|traio|trao|produco|conduco|cayo)' + W1, t: 'conjugacion', msg: 'oigo · traigo · produzco · conduzco · caigo' },
      { re: W0 + 'esta (lloviendo|nevando|nublado)' + W1, t: 'acento', msg: '"está" 악센트' },
      { re: W0 + 'frio' + W1, t: 'acento', msg: '"frío"' }
    ],
    accWords: ['frío', 'miércoles', 'sábado', 'otoño', 'según', 'avión', 'lucía', 'taiwán', 'allá', 'también', 'mamá', 'fútbol', 'oímos', 'traéis', 'producís'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Mis planes para el fin de semana → 글로 쓰기',
        icons: ['📅', '🌦️', '🧳'],
        questions: ['¿Qué fecha es hoy? ¿Qué día es hoy?', '¿Qué tiempo va a hacer este fin de semana? ¿Hace frío o calor?', '¿Qué vas a hacer el sábado y el domingo? ¿Con quién? (ir a + 동사원형)'],
        minWords: 50,
        hint: 'ir a + 동사원형 · 날씨 표현(hace/hay/está/llueve) · 날짜·요일 을 모두 쓰면 높은 점수!',
        ph: 'Hoy es viernes, 15 de agosto. Este fin de semana va a …',
        connectors: ['y', 'pero', 'porque', 'como', 'cuando', 'además', 'entonces', 'primero', 'luego'],
        rubric: [
          { k: 'fec', label: '날짜 · 요일 (lunes … / de + 월)', max: 8, re: '(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bados?|domingos?)|\\d+ de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)', ax: 'Contenido' },
          { k: 'tie', label: '날씨 표현 2개 이상', max: 10, re: TIEMPO, min: 2, ax: 'Contenido' },
          { k: 'pla', label: '계획 · 활동 내용', max: 6, re: 'playa|cine|f[uú]tbol|compra|teatro|parque|bosque|pasear|amigos|familia|estudiar|descansar', ax: 'Contenido' },
          { k: 'fut', label: 'ir a + 동사원형 (3번 이상)', max: 14, re: '(voy|vas|va|vamos|vais|van) a [a-záéíóúñ]+(r|rse|rme)', min: 3, ax: 'Gramática' },
          { k: 'ten', label: 'tener calor / frío / sueño …', max: 6, re: '(tengo|tienes|tiene|tenemos|ten[eé]is|tienen) (calor|fr[ií]o|sue[nñ]o|hambre|prisa|sed)', ax: 'Gramática' },
          { k: 'tim', label: '시간부사구 (esta tarde, el sábado …)', max: 6, re: 'esta (tarde|noche|ma[nñ]ana)|el (pr[oó]ximo|s[aá]bado|domingo)|la pr[oó]xima|que viene|luego|por la (ma[nñ]ana|tarde|noche)', ax: 'Gramática' }
        ],
        model: 'Hoy es viernes, 15 de agosto. Según el pronóstico del tiempo, este fin de semana va a hacer mucho calor y no va a llover. El sábado por la mañana voy a ir a la playa con mis amigos porque cuando hace calor, me encanta nadar. Por la tarde vamos a tomar un café. El domingo va a haber nubes, entonces voy a descansar en casa y voy a hacer los deberes.'
      }
    },
    build: B
  });
})();
