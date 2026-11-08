/* Lección 07 · ¿Me sienta bien esta blusa rosa? — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 95~106쪽 : Diálogo 1·2 → Vocabulario·Contesta → Amplía tu vocabulario → Gramática y ejercicios(연습문제 1~3)
   → Actividades 1~4 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      sab: 'Saber · Conocer',
      gus: 'Quedar · Faltar · Sentar',
      ped: 'Pedir (e → i)',
      ord: 'Ordinales 서수',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo 1', kr: '친구와 쇼핑하기', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'd2', label: 'Diálogo 2', kr: '옷 가게에서', group: 'Diálogo', kind: 'dialogo' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '옷 · 쇼핑 어휘', group: 'Diálogo' },
      { id: 'gram', label: 'Gramática', kr: 'saber·conocer · gustar형 동사 · pedir', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: 'e → i 동사 활용', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '단어 배열해 문장 쓰기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: 'saber 또는 conocer', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'ac1', label: 'Actividades 1', kr: '서수 (primero …)', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '동사 활용표 완성', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '질문과 대답 연결', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'ac4', label: 'Actividades 4', kr: '상황에 맞는 옷차림', group: 'Actividades', kind: 'ac', n: 4 },
      { id: 'cultura', label: 'Cultura', kr: '라틴 아메리카의 음료', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo1: [
      { who: 'Marina', es: 'Quiero comprar una [blusa] para mi fiesta de cumpleaños. ¿Me [sienta] bien esta blusa rosa, Sofía?' },
      { who: 'Sofía', es: 'Sí, te [queda] muy bien, Marina. Realmente me gusta. ¿[Cuánto] cuesta?' },
      { who: 'Marina', es: 'Voy a preguntarle a la [dependienta]. ¡Perdón!' },
      { who: 'Dependienta', es: '¿Puedo [ayudarla], señorita?' },
      { who: 'Marina', es: 'Sí, ¿cuánto [cuesta] esta blusa?' },
      { who: 'Dependienta', es: 'Exactamente [cincuenta] euros.' },
      { who: 'Marina', es: '¿Hay alguna [falda] adecuada para la blusa?' },
      { who: 'Dependienta', es: 'Sí. ¿Qué le parece esta blanca? ¿Quiere [probársela]?' },
      { who: 'Marina', es: 'Me encanta. No es necesario probármela. Esa es mi [talla]. Me llevo la blusa y la falda.' }
    ],
    dialogo2: [
      { who: 'Roberto', es: 'Mira estos [abrigos] de cuero. ¡Qué bonitos!' },
      { who: 'Rosa', es: 'No me gustan mucho, me gustan más los abrigos [vaqueros].' },
      { who: 'Roberto', es: '¿Y estos? ¿Qué te [parece] este negro?' },
      { who: 'Rosa', es: 'No está mal, pero [prefiero] aquel verde. Me parece más [moderno]. ¿Por qué no te los pruebas?' },
      { who: 'Roberto', es: '¿Puedo [probarme] estos abrigos?' },
      { who: 'Dependiente', es: 'Claro que sí.' },
      { who: 'Roberto', es: '¿Cómo me [queda] el negro?' },
      { who: 'Rosa', es: 'Un poco [estrecho], ¿no?' },
      { who: 'Roberto', es: '¿Y este verde?' },
      { who: 'Rosa', es: 'Ese te queda muy bien y no es [caro].' },
      { who: 'Roberto', es: 'Vale. Me lo [llevo].' }
    ],

    voc1: [
      { es: 'tienda de ropa', kr: '옷 가게', e: '🏬' }, { es: 'ascensor', kr: '승강기', e: '🛗' }, { es: 'sección', kr: '매장, 부서', e: '🏷️' },
      { es: 'planta baja', kr: '일층, 아래층', e: '⬇️' }, { es: 'dependienta', kr: '여자 점원', e: '💁‍♀️' }, { es: 'alguno', kr: '어떤', e: '❓' },
      { es: 'falda', kr: '치마', e: '👗' }, { es: 'acompañar', kr: '함께 가다', e: '👭' }, { es: 'parte', kr: '부분', e: '🧩' },
      { es: 'sentar', kr: '맞다, 어울리다', e: '👌' }, { es: 'bajar', kr: '내려가다', e: '🔽' }, { es: 'avenida', kr: '큰길, 대로', e: '🛣️' },
      { es: 'blusa', kr: '블라우스', e: '👚' }, { es: 'camisa', kr: '와이셔츠', e: '👔' }, { es: 'quedar', kr: '어울리다', e: '✨' },
      { es: 'sol', kr: '솔(페루의 화폐 단위)', e: '🇵🇪' }, { es: 'adecuado', kr: '적합한', e: '✅' }, { es: 'otro', kr: '다른', e: '🔁' },
      { es: 'probarse', kr: '입어 보다', e: '🪞' }, { es: 'llevar(se)', kr: '가지고 가다', e: '🛍️' }, { es: 'buscar', kr: '찾다', e: '🔍' }
    ],
    voc2: [
      { es: 'abrigo', kr: '외투', e: '🧥' }, { es: 'vaquero', kr: '청바지의, 진의', e: '👖' }, { es: 'parecer', kr: '~처럼 보이다', e: '🤔' },
      { es: 'un poco', kr: '조금, 약간', e: '🤏' }, { es: 'estrecho', kr: '몸에 꼭 맞는', e: '🫨' }, { es: 'cuero', kr: '가죽', e: '🐄' },
      { es: 'preferir', kr: '선호하다', e: '👍' }, { es: 'negro', kr: '검은', e: '⚫' }, { es: 'moderno', kr: '현대적인', e: '🆕' }
    ],
    amplia: [
      { es: 'medias', kr: '스타킹', e: '🧦' }, { es: 'corbata', kr: '넥타이', e: '👔' }, { es: 'traje', kr: '양복', e: '🤵' },
      { es: 'vestido', kr: '드레스, 원피스', e: '👗' }, { es: 'bufanda', kr: '목도리', e: '🧣' }, { es: 'revista de moda', kr: '패션 잡지', e: '📰' },
      { es: 'cajas', kr: '계산대', e: '🧾' }, { es: 'centro comercial', kr: '쇼핑센터', e: '🏬' }, { es: 'bañador', kr: '수영복', e: '🩱' },
      { es: 'dejar propina', kr: '팁을 주다 (dejar/dar propina)', e: '💶' }, { es: 'hacer la compra', kr: '장 보다, 쇼핑하다', e: '🛒' }, { es: 'sacar dinero', kr: '출금하다', e: '🏧' }
    ],

    examBank: [
      { p: 'Yo no ____ la verdad. <i>(saber)</i>', a: ['sé'], s: 'sab' },
      { p: '¿____ (tú) a mi hermano? <i>(conocer)</i>', a: ['conoces'], s: 'sab' },
      { p: 'Yo ____ Taiwán. <i>(conocer)</i>', a: ['conozco'], s: 'sab' },
      { p: 'Mi hermana menor ____ nadar. <i>(saber)</i>', a: ['sabe'], s: 'sab' },
      { p: 'Este helado sabe ____ chocolate.', a: ['a'], s: 'sab' },
      { p: 'Conocemos ____ Julia.', a: ['a'], s: 'sab' },
      { p: 'Este abrigo ____ queda muy bien. <i>(a mí)</i>', a: ['me'], s: 'gus' },
      { p: 'A la comida ____ falta sal.', a: ['le'], s: 'gus' },
      { p: '¿Te ____ bien esta falda? <i>(sentar)</i>', a: ['sienta'], s: 'gus' },
      { p: 'Estos pantalones te ____ grandes. <i>(quedar)</i>', a: ['quedan'], s: 'gus' },
      { p: 'Yo ____ un café. <i>(pedir)</i>', a: ['pido'], s: 'ped' },
      { p: 'Tú ____ un metro setenta. <i>(medir)</i>', a: ['mides'], s: 'ped' },
      { p: 'El niño ____ la canción. <i>(repetir)</i>', a: ['repite'], s: 'ped' },
      { p: 'Yo ____ la clase de español. <i>(seguir)</i>', a: ['sigo'], s: 'ped' },
      { p: 'Nosotros ____ la comida. <i>(pedir)</i>', a: ['pedimos'], s: 'ped' },
      { p: 'Vivo en el ____ piso. <i>(1.º)</i>', a: ['primer'], s: 'ord' },
      { p: 'Va a la ____ planta. <i>(5.ª)</i>', a: ['quinta'], s: 'ord' },
      { p: 'Es la ____ vez. <i>(3.ª)</i>', a: ['tercera'], s: 'ord' },
      { p: '¿____ cuesta esta blusa? — Cincuenta euros.', a: ['cuánto'], s: 'voc' },
      { p: '¿Puedo ____ estos abrigos? <i>(입어 보다)</i>', a: ['probarme'], s: 'voc' }
    ]
  };

  const B = {};
  const ROPA = 'blusa|falda|camisa|camiseta|abrigo|traje|corbata|vestido|bufanda|medias|ba[nñ]ador|pantalones|vaqueros|zapatos|zapatillas|chaqueta|jersey|su[eé]ter|gorra|sombrero|calcetines|ch[aá]ndal|sudadera|botas|ropa';

  /* ---------- Diálogo 1 ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'De compras con mi amiga.')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">💶 가격 묻기 — 세 가지 질문</h3>
      <div class="chips"><span class="hlc c0">¿Cuánto cuesta?</span><span class="hlc c1">¿Cuánto vale?</span><span class="hlc c2">¿Cuánto es?</span></div>
      ${tip('복수 물건이면 <b>¿Cuánto cuestan / valen</b> estos zapatos?  계산할 때는 <b>¿Cuánto es (todo)?</b>')}
      <div class="items two pr"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo1, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'gus', cls: 'lines', text: SC.clozeFromDialog(D.dialogo1) }));
    [['👚 이 블라우스는 얼마예요? (costar)', ['¿Cuánto cuesta esta blusa?']], ['👖 이 바지들은 얼마예요? (valer)', ['¿Cuánto valen estos pantalones?']],
      ['🧾 (계산대에서) 전부 얼마예요?', ['¿Cuánto es todo?', '¿Cuánto es?']], ['👗 이 원피스는 얼마예요? (valer)', ['¿Cuánto vale este vestido?']]]
      .forEach(([p, a], i) => put(s, '.pr', writeItem({ id: 'd1p' + i, sec: 'd1', skill: 'voc', prompt: p, ph: '¿Cuánto …?', answers: a })));
    ['¿Me sienta bien esta blusa rosa?', 'Esa es mi talla.', 'Me llevo la blusa y la falda.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'gus', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div>
      ${tip('3번 · 5번은 본문에 직접 나오지 않아요. 백화점 상황을 상상해서 답해 보세요.')}<div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    [0, 1, 3, 4, 6, 7, 10, 12, 13, 18, 19, 20].forEach((k, i) => { const v = D.voc1[k]; put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: k === 19 ? ['llevar', 'llevarse'] : [v.es] })); });
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿Dónde están Marina y Sofía?', kw: [['tienda', 'en una tienda (de ropa)']], model: 'Están en una tienda de ropa.' },
      { q: '¿Qué le apetece comprar a Marina?', kw: [['blusa', 'una blusa']], model: 'Quiere comprar una blusa para su fiesta de cumpleaños.' },
      { q: '¿Dónde está la ropa de hombre?', kw: [['planta|piso|secci[oó]n', 'planta / piso / sección']], model: 'Está en la segunda planta.' },
      { q: '¿Cuánto vale la blusa que quiere comprar Marina?', kw: [['cincuenta|50', 'cincuenta euros'], ['euros?|€', 'euros']], model: 'Vale cincuenta euros.' },
      { q: '¿Para quién desea comprar la camisa Marina?', kw: [['para', 'Para …']], model: 'Para su padre.' }
    ] }));
  };

  /* ---------- Diálogo 2 ---------- */
  B.d2 = () => {
    const s = sec('d2', `${dlgHead(2, 'En una tienda de ropa')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기</h3><div class="c"></div>
      <h3 class="h3">🧥 어느 외투? — ¿Verdadero o falso?</h3>
      <div class="pairs" style="display:flex;gap:14px;flex-wrap:wrap;margin:8px 0">${[['🧥⚫', 'el abrigo negro', 'un poco estrecho'], ['🧥🟢', 'el abrigo verde', 'moderno · no es caro']].map(([e, a, b]) => `<div class="wxc" style="min-width:180px"><span>${e}</span><b>${a}</b><small>${b}</small></div>`).join('')}</div>
      <div class="items vf"></div>`);
    put(s, '.dslot', dialogBlock('d2', D.dialogo2));
    put(s, '.c', cloze({ id: 'd2c', sec: 'd2', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo2) }));
    [['A Rosa le gustan mucho los abrigos de cuero.', 'Falso'], ['Rosa prefiere el abrigo verde.', 'Verdadero'], ['El abrigo negro le queda un poco estrecho a Roberto.', 'Verdadero'],
      ['El abrigo verde es muy caro.', 'Falso'], ['Roberto se lleva el abrigo verde.', 'Verdadero']]
      .forEach(([p, a], i) => put(s, '.vf', choiceItem({ id: 'd2vf' + i, sec: 'd2', skill: 'com', prompt: p + ' ' + say(p), options: ['Verdadero', 'Falso'], answer: a })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.map(v => [v.es, v.kr]) }));
    D.voc2.forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Qué desea comprar Roberto?', kw: [['abrigo', 'un abrigo']], model: 'Desea comprar un abrigo.' },
      { q: '¿Dónde están Roberto y Rosa?', kw: [['tienda', 'en una tienda (de ropa)']], model: 'Están en una tienda de ropa.' },
      { q: '¿Por qué prefiere el verde Rosa?', kw: [['porque', 'Porque …'], ['moderno', 'más moderno']], model: 'Porque le parece más moderno.' },
      { q: '¿Qué decide Roberto después de probarse los abrigos?', kw: [['verde', 'el (abrigo) verde'], ['lleva|compra|llevarse|comprar', 'llevarse / comprar']], model: 'Decide llevarse el abrigo verde.' },
      { q: '¿Qué pregunta Roberto al dependiente?', kw: [['prob(arse|arme)', 'probarse'], ['abrigos', 'los abrigos']], model: 'Pregunta si puede probarse los abrigos.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 옷 · 쇼핑 표현 분류하기</h3><div class="sb"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    put(s, '.sb', sortBoard({ id: 'ampsb', sec: 'amplia', skill: 'voc', cols: [{ k: 'r', label: '👗 la ropa 옷' }, { k: 'l', label: '🏬 lugares 장소' }, { k: 'a', label: '🛒 acciones 행동' }],
      chips: [['medias', 'r'], ['corbata', 'r'], ['traje', 'r'], ['vestido', 'r'], ['bufanda', 'r'], ['bañador', 'r'], ['cajas', 'l'], ['centro comercial', 'l'], ['tienda de ropa', 'l'],
        ['dejar propina', 'a'], ['hacer la compra', 'a'], ['sacar dinero', 'a'], ['probarse', 'a']] }));
  };

  /* ---------- Gramática ---------- */
  const conjTab = (head, rows) => `<table class="gtab"><tr><th></th>${head.map(h => `<th>${h}</th>`).join('')}</tr>${['1인칭 단수', '2인칭 단수', '3인칭 단수', '1인칭 복수', '2인칭 복수', '3인칭 복수'].map((p, i) => `<tr><td>${p}</td>${rows.map(r => `<td class="${r[1] && r[1].includes(i) ? 'hi' : ''}">${r[0][i]}</td>`).join('')}</tr>`).join('')}</table>`;
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. Saber 동사와 Conocer 동사의 비교</h3>
        <h4>(1) Saber 동사의 현재 변화형</h4>
        <table class="gtab"><tr><td>1인칭 단수</td><td class="hi">sé</td><td>Nosotros/Nosotras</td><td>sabemos</td></tr><tr><td>2인칭 단수</td><td>sabes</td><td>Vosotros/Vosotras</td><td>sabéis</td></tr><tr><td>3인칭 단수</td><td>sabe</td><td>Ellos/Ellas/Uds.</td><td>saben</td></tr></table>
        <table class="gtab">
          <tr><th>(2) saber + 동사원형</th><td class="l">~할 줄 안다 — Mi hermana menor sabe nadar. ${say('Mi hermana menor sabe nadar.')} 내 여동생은 수영을 할 줄 안다.<br>Sabemos hablar inglés y español. 우리는 영어와 스페인어를 할 줄 안다.</td></tr>
          <tr><th>(3) saber + 명사 / 절</th><td class="l">~을 알다 — Él sabe que tengo razón. 그는 내가 옳다는 것을 안다.<br>Mis amigos saben la verdad. ${say('Mis amigos saben la verdad.')} 내 친구들은 사실을 안다.</td></tr>
          <tr><th>(4) saber a ~</th><td class="l">~ 맛이 나다 — Este helado sabe a chocolate. ${say('Este helado sabe a chocolate.')} 이 아이스크림은 초콜릿 맛이다.</td></tr></table>
        <h4>(5) Conocer 동사의 현재 변화형</h4>
        <table class="gtab"><tr><td>1인칭 단수</td><td class="hi">conozco</td><td>Nosotros/Nosotras</td><td>conocemos</td></tr><tr><td>2인칭 단수</td><td>conoces</td><td>Vosotros/Vosotras</td><td>conocéis</td></tr><tr><td>3인칭 단수</td><td>conoce</td><td>Ellos/Ellas/Uds.</td><td>conocen</td></tr></table>
        <table class="gtab"><tr><th>(6) conocer + (a) 사람 / 장소</th><td class="l">(경험을 통해 장소나 사람을) 알다 — Conocemos a Julia. ${say('Conocemos a Julia.')} 우리는 훌리아를 알고 있다.<br>Conozco Taiwán. ${say('Conozco Taiwán.')} 나는 대만을 안다.</td></tr></table>
        ${tip('<b>saber</b> = 정보 · 지식 · 할 줄 앎 / <b>conocer</b> = 사람 · 장소를 직접 겪어서 앎. 사람 앞에는 <b>a</b>: Conozco <b>a</b> Julia.')}
        <div class="g1a"></div><div class="items g1b"></div></div>
      <div class="gcard"><h3>2. Gustar형 동사 — quedar, faltar, sentar</h3>
        <p class="small">gustar 동사처럼 의미상의 주어는 간접목적격으로 나타나고, 문법상의 주어는 의미상의 목적어로 쓰인다.</p>
        <table class="gtab"><tr><th colspan="2">간접목적대명사</th><th>동사</th><th>주어</th></tr>
          <tr><td rowspan="2">(A mí)<br>(A ti)<br>(A él/ella/Ud.)<br>(A nosotros/nosotras)<br>(A vosotros/vosotras)<br>(A ellos/ellas/Uds.)</td><td rowspan="2" class="hi">Me<br>Te<br>Le<br>Nos<br>Os<br>Les</td><td class="hi">gusta</td><td>el chocolate.<br>jugar al fútbol.<br>escribir y leer.</td></tr>
          <tr><td class="hi">gustan</td><td>los gatos.</td></tr></table>
        <table class="gtab">
          <tr><th>① Quedar</th><td class="l">Me queda muy bien este abrigo. ${say('Me queda muy bien este abrigo.')} 이 외투 나에게 매우 잘 어울려.<br>※ Marina va a quedarse en Lima. (남다, 머물다) · Quedamos a las siete. (만나다) · ¿Dónde queda el museo? (위치하다)</td></tr>
          <tr><th>② Faltar</th><td class="l">Le falta sal a la comida. ${say('Le falta sal a la comida.')} 음식이 싱겁다.<br>Le falta tiempo para estudiar. 그는 공부할 시간이 부족하다.</td></tr>
          <tr><th>③ Sentar</th><td class="l">Me sienta bien esta falda. ${say('Me sienta bien esta falda.')} 이 치마가 내게 잘 어울린다.<br>※ El padre sienta a su hija en la silla. 아버지가 딸을 의자에 앉힌다. (앉히다)</td></tr></table>
        ${tip('주어(옷)가 복수면 동사도 복수: Te <b>quedan</b> bien los vaqueros. · sentar 는 e → ie: me <b>sienta</b> / me <b>sientan</b>')}
        <div class="g2"></div></div>
      <div class="gcard"><h3>3. 불규칙동사 pedir: 어간모음 e → i</h3>
        ${conjTab(['pedir', 'seguir', 'medir', 'repetir'], [[['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'], [0, 1, 2, 5]], [['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'], [0, 1, 2, 5]], [['mido', 'mides', 'mide', 'medimos', 'medís', 'miden'], [0, 1, 2, 5]], [['repito', 'repites', 'repite', 'repetimos', 'repetís', 'repiten'], [0, 1, 2, 5]]])}
        ${tip('nosotros · vosotros 는 e 그대로 (pedimos, pedís). seguir 의 yo 형은 <b>sigo</b> (gu → g). 같은 유형: vestir(se), servir, elegir(elijo), repetir')}
        <div class="g3"></div></div>`);
    put(s, '.g1a', cloze({ id: 'g1a', sec: 'gram', skill: 'sab', title: 'saber · conocer 변화표를 완성하세요.', cls: 'table2', text:
      [['yo', 'sé', 'conozco'], ['tú', 'sabes', 'conoces'], ['él / ella / Ud.', 'sabe', 'conoce'], ['nosotros/as', 'sabemos', 'conocemos'], ['vosotros/as', 'sabéis', 'conocéis'], ['ellos / ellas / Uds.', 'saben', 'conocen']]
        .map(([p, a, b]) => `<p><span>${p}</span> saber → [${a}] · conocer → [${b}]</p>`).join('') }));
    [['Mi hermana ____ nadar.', 'sabe'], ['¿____ (tú) a Julia?', 'Conoces'], ['Yo ____ Taiwán.', 'conozco'], ['Mis amigos ____ la verdad.', 'saben'], ['Este helado ____ a chocolate.', 'sabe']]
      .forEach(([p, a], i) => put(s, '.g1b', choiceItem({ id: 'g1b-' + i, sec: 'gram', skill: 'sab', prompt: p, options: shuffle([a, ({ sabe: 'conoce', Conoces: 'Sabes', conozco: 'sé', saben: 'conocen' })[a]]), answer: a })));
    put(s, '.g2', cloze({ id: 'g2', sec: 'gram', skill: 'gus', title: '대명사와 동사(quedar · faltar · sentar)를 알맞게 쓰세요.', cls: 'lines', text:
      ['🧥 (A mí) [Me] queda muy bien este abrigo.', '🧂 A la comida [le] falta sal.', '👗 ¿(A ti) Te [sienta] bien esta falda? <i>(sentar)</i>', '👖 (A ti) Te [quedan] grandes estos pantalones. <i>(quedar)</i>',
        '⏰ A los estudiantes [les] falta tiempo para estudiar.', '👔 (A nosotros) [Nos] quedan bien las corbatas.'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'ped', title: 'pedir 변화표를 완성하세요. (부츠 모양!)', cls: 'boot', text:
      [['yo', 'pido', 1], ['tú', 'pides', 1], ['él / ella / Ud.', 'pide', 1], ['nosotros/as', 'pedimos', 0], ['vosotros/as', 'pedís', 0], ['ellos / ellas / Uds.', 'piden', 1]]
        .map(([p, f, b]) => `<p class="${b ? 'in' : 'out'}"><span>${p}</span>[${f}]</p>`).join('') }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '괄호 안의 동사를 이용하여 문장을 완성하세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1c', sec: 'e1', skill: 'ped', cls: 'lines', text:
      ['1. [Pido] (pedir, yo) un café.', '2. Se [viste] (vestir, ella) con ropa de verano.', '3. [Mides] (medir, tú) un metro setenta (o uno setenta).', '4. El niño [repite] (repetir) la canción.', '5. ¿Qué nivel de italiano [siguen] (seguir, Uds.)?']
        .map(x => `<p>${x}</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '단어들을 바르게 배열하여 문장을 완성하세요.', { kr: '대문자 · 마침표까지 갖춰 문장 전체를 쓰세요.' })}<div class="items"></div>`);
    [['sienta / la / bien / muy / te / camiseta', 'La camiseta te sienta muy bien.', 'Te sienta muy bien la camiseta.'],
      ['profesor / da / trabajo / un / a / los estudiantes / el', 'El profesor da un trabajo a los estudiantes.'],
      ['cómo / pregunto / su / a / hijo / se llama', 'Pregunto a su hijo cómo se llama.'],
      ['te / camisa / queda / grande / esta', 'Esta camisa te queda grande.'],
      ['gusta / la / comida / os / mexicana', 'Os gusta la comida mexicana.', 'La comida mexicana os gusta.']]
      .forEach(([p, ...a], i) => put(s, '.items', writeItem({ id: 'e2-' + i, sec: 'e2', skill: i === 1 || i === 2 ? 'ped' : 'gus', prompt: `${i + 1}. ${p}`, ph: '→', answers: a })));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, 'Saber와 Conocer 동사 중 하나를 선택하여 문장을 완성하세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e3c', sec: 'e3', skill: 'sab', cls: 'lines', text:
      ['1. ¿[Sabéis] (vosotros) quién viene esta tarde?', '2. ¿[Conoces] (tú) México, D. F.?', '3. ¿[Sabe] (Ud.) hablar chino?', '4. ¿[Sabemos] (nosotros) dónde está Laura?', '5. ¿[Conoces] (tú) al marido de Concha?']
        .map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  const ORD = [['1.º', 'primero/a', '첫 번째'], ['2.º', 'segundo/a', '두 번째'], ['3.º', 'tercero/a', '세 번째'], ['4.º', 'cuarto/a', '네 번째'], ['5.º', 'quinto/a', '다섯 번째'],
    ['6.º', 'sexto/a', '여섯 번째'], ['7.º', 'séptimo/a', '일곱 번째'], ['8.º', 'octavo/a', '여덟 번째'], ['9.º', 'noveno/a', '아홉 번째'], ['10.º', 'décimo/a', '열 번째']];
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '서수 — 빈칸에 들어갈 서수를 알맞게 고쳐 쓰시오.')}
      <p class="lead">서수는 순서를 나타내는 말로, 주로 형용사로 기능하나 경우에 따라 부사로도 사용된다.</p>
      <table class="gtab"><tr>${ORD.slice(0, 5).map(o => `<td>${o[2]}<br><b>${o[1]}</b> ${say(o[1].split('/')[0])}</td>`).join('')}</tr><tr>${ORD.slice(5).map(o => `<td>${o[2]}<br><b>${o[1]}</b> ${say(o[1].split('/')[0])}</td>`).join('')}</tr></table>
      ${tip('11 이상의 서수는 기수로 대체되기도 한다 (el siglo veinte). 열한 번째 undécimo, 열두 번째 duodécimo, 열세 번째~열아홉 번째 decimotercero~decimonoveno.<br><b>primero, tercero</b> 는 남성 단수 명사 앞에서 -o 가 탈락한다: el <b>primer</b> piso, el <b>tercer</b> día.')}
      <table class="gtab"><tr><th>(1) 형용사</th><td class="l">명사의 성과 수에 일치한다 — el segundo libro = el libro segundo (두 번째 책) · la segunda hija = la hija segunda (두 번째 딸)</td></tr>
        <tr><th>(2) 부사</th><td class="l">primero(먼저, 첫째), segundo(둘째), tercero(셋째) — Primero, quiero dar las gracias a todos los invitados. 먼저 초대 손님 여러분들께 감사를 전하고 싶습니다.</td></tr></table>
      <h3 class="h3">① 숫자와 서수를 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 빈칸에 들어갈 서수를 알맞게 고쳐 쓰시오.</h3><div class="c"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac1pm', sec: 'ac1', skill: 'ord', pairs: ORD.map(o => [o[0], o[1].split('/')[0]]) }));
    put(s, '.c', cloze({ id: 'ac1c', sec: 'ac1', skill: 'ord', cls: 'lines', text:
      ['(1) Va a la [quinta] planta. (5.ª)', '(2) Este es el [sexto] libro que leo este mes. (6.º)', '(3) Juana es la [primera] en el colegio. (1.ª)', '(4) Es la [cuarta] vez que te lo dice. (4.ª)', '(5) Vive en el [primer] piso. (1.º)',
        '(6) el [segundo] libro = el libro segundo (2.º)', '(7) [Primero], quiero dar las gracias a todos los invitados. (먼저)'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.ac2 = () => {
    const V = { elegir: ['elijo', 'eliges', 'elige', 'elegimos', 'elegís', 'eligen'], seguir: ['sigo', 'sigues', 'sigue', 'seguimos', 'seguís', 'siguen'], servir: ['sirvo', 'sirves', 'sirve', 'servimos', 'servís', 'sirven'], repetir: ['repito', 'repites', 'repite', 'repetimos', 'repetís', 'repiten'] };
    const P = ['1인칭 단수', '2인칭 단수', '3인칭 단수', '1인칭 복수', '2인칭 복수', '3인칭 복수'];
    const s = sec('ac2', `${acHead(2, '동사의 활용에 따라 표를 완성하세요.', { kr: '모두 e → i 동사예요. elegir 의 yo 형은 g → j, seguir 는 gu → g 에 주의!' })}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'ac2c', sec: 'ac2', skill: 'ped', cls: 'caltab', text: `<table class="gtab"><tr><th></th>${Object.keys(V).map(k => `<th>${k}</th>`).join('')}</tr>${P.map((p, i) => `<tr><td>${p}</td>${Object.keys(V).map(k => `<td>[${V[k][i]}]</td>`).join('')}</tr>`).join('')}</table>` }));
  };
  B.ac3 = () => {
    const s = sec('ac3', `${acHead(3, '질문과 대답이 어울리도록 서로 연결하세요.')}<div class="pm"></div>
      <h3 class="h3">✍️ 나라면? — 점원의 질문에 직접 대답하세요</h3><div class="items f"></div>`);
    put(s, '.pm', pairMatch({ id: 'ac3pm', sec: 'ac3', skill: 'com', pairs: [['¿Cuánto le debo?', 'Tres euros.'], ['¿Cómo va a pagar?', 'Con tarjeta.'], ['¿Me puedo probar esta camisa?', 'Claro. Los probadores están al lado del espejo.'], ['¿Qué desea?', 'Quiero unos pantalones.'], ['¿De qué talla es?', 'Creo que es la 42.']] }));
    [['¿Qué desea?', [{ re: 'quiero|busco|necesito', label: 'Quiero / Busco …' }, { re: ROPA, label: '옷 이름' }], 'Busco una camisa blanca.'],
      ['¿Cómo va a pagar?', [{ re: 'con tarjeta|en efectivo|con dinero', label: 'con tarjeta / en efectivo' }], 'En efectivo.'],
      ['¿Qué tal le queda?', [{ re: '(me|te|le) (queda|quedan|sienta|sientan)', label: 'me queda / me sienta' }], 'Me queda un poco estrecha.']]
      .forEach(([q, m, md], i) => put(s, '.f', freeItem({ id: 'ac3f' + i, sec: 'ac3', skill: 'gus', line: true, prompt: `${q} ${say(q)}`, must: m, model: md })));
  };
  B.ac4 = () => {
    const s = sec('ac4', `${acHead(4, '주어진 상황에 적절한 문장을 쓰시오.', { kr: '어떤 옷을 입을지(llevar · ponerse), 무엇이 어울리는지 써 보세요.' })}
      ${modelo('Para ir al trabajo: <b>Llevo</b> un traje y una corbata. / <b>Me pongo</b> un traje.')}<div class="items"></div>`);
    [['💼', 'Para ir al trabajo', 'Llevo un traje y una corbata.'], ['🏫', 'Para ir al colegio', 'Me pongo el uniforme y unos zapatos negros.'], ['🎉', 'Para ir a una fiesta', 'Llevo un vestido elegante y unas medias.'],
      ['🎾', 'Para jugar al tenis', 'Me pongo una camiseta, unos pantalones cortos y unas zapatillas.'], ['🏖️', 'Para ir a la playa', 'Llevo un bañador y unas gafas de sol.']]
      .forEach(([e, p, md], i) => put(s, '.items', freeItem({ id: 'ac4-' + i, sec: 'ac4', skill: 'lib', line: true, prompt: `<span class="emo-sm">${e}</span> (${i + 1}) ${p}:`, ph: 'Llevo … / Me pongo …',
        must: [{ re: '(llevo|me pongo|necesito|llevar|ponerme|me visto)', label: 'llevo / me pongo / necesito' }, { re: ROPA + '|uniforme|gafas', label: '옷 이름' }], model: md })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const s = sec('cultura', culturaHTML('라틴 아메리카의 음료', [
      { e: '🍹🇨🇺', h: 'Mojito', t: '쿠바가 기원인 Mojito에는 럼주, 박하, 설탕 등이 들어간다. 오랫동안 배에서 생활해야 하는 선원들에게 비타민 C를 제공하는 역할을 했다.' },
      { e: '🥃🇲🇽', h: 'Tequila', t: '멕시코를 대표하는 증류주로, 주재료는 멕시코 <b>Jalisco</b>주의 Tequila 지역 일대에 서식하는 푸른 용설란이다.' },
      { e: '🍸🇵🇪🇨🇱', h: 'Pisco Sour', t: '페루와 칠레를 대표하는 음료(술)로 <b>Pisco</b>(포도 증류주)에 라임즙과 계피를 넣어 만든다.' },
      { e: '☕🏔️', h: 'Canelazo', t: '오렌지즙과 라임즙에 계피수, 설탕 등을 넣어 다양하게 만들어 먹는다. <b>안데스</b> 지역의 전형적인 음료(술)이다.' },
      { e: '🔥💧', h: 'Aguardiente', t: '사탕수수로 만든 독한 증류주이다. \'물\'을 뜻하는 아구아(<b>Agua</b>)와 \'타들어가는\'을 뜻하는 아르디엔테(<b>Ardiente</b>)의 합성어로 \'불타는 물\'이라는 의미이다.' }
    ], '라틴 아메리카에는 나라와 지역마다 특색 있는 음료가 있어요.') + `<h3 class="h3">🔎 확인 퀴즈 — 음료와 나라 · 지역 연결</h3><div class="pm"></div><div class="items q"></div>`);
    put(s, '.pm', pairMatch({ id: 'culpm', sec: 'cultura', skill: 'voc', pairs: [['Mojito', 'Cuba'], ['Tequila', 'México (Jalisco)'], ['Pisco Sour', 'Perú y Chile'], ['Canelazo', 'los Andes']] }));
    [['Aguardiente 의 뜻은?', ['불타는 물', '쓴 물', '푸른 용설란', '포도 증류주'], '불타는 물', 'agua(물) + ardiente(타들어가는)'],
      ['선원들에게 비타민 C를 제공한 음료는?', ['Mojito', 'Tequila', 'Canelazo', 'Pisco Sour'], 'Mojito', '라임과 박하가 들어가요.'],
      ['Tequila 의 주재료는?', ['푸른 용설란', '사탕수수', '포도', '오렌지'], '푸른 용설란', 'Jalisco주 Tequila 지역']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'voc', prompt: p, options: o, answer: a, explain: ex })));
  };

  SC.lesson({
    num: '07',
    title: '¿Me sienta bien esta blusa rosa?',
    ttsTest: '¿Me sienta bien esta blusa rosa?',
    cover: {
      emoji: '👚🛍️<small>💶 🪞</small>',
      bg: 'linear-gradient(135deg,#f9a8d4,#f472b6 55%,#db2777)',
      tema: ['La ropa y las compras', 'En una tienda de ropa', 'Los números ordinales'],
      com: ['가격 묻기: ¿Cuánto cuesta? · ¿Cuánto vale? · ¿Cuánto es?', 'saber와 conocer: Mis amigos saben la verdad. · ¿Conoces Taiwán?', '어울림 말하기: ¿Me sienta bien …? · Te queda muy bien.'],
      gram: ['<i>saber</i> · <i>conocer</i>', 'gustar형 동사: <i>quedar, faltar, sentar</i>', '불규칙동사 <i>pedir</i> (e → i): seguir, medir, repetir', '서수 primero … décimo']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Marina: { g: 'f', av: '👩🏼', side: 'l' }, 'Sofía': { g: 'f', av: '👩🏻‍🦰', side: 'r' }, Dependienta: { g: 'f', av: '💁🏽‍♀️', side: 'r' },
      Roberto: { g: 'm', av: '🧔🏻', side: 'l' }, Rosa: { g: 'f', av: '👩🏽', side: 'r' }, Dependiente: { g: 'm', av: '🧑🏻‍💼', side: 'r' }
    },
    errLabels: { conjugacion: '동사 변화 (saber · conocer · e→i)', pronombre: '대명사 me·te·le·nos·os·les', concordancia: 'queda / quedan 일치', ordinal: '서수 (primer · tercer)' },
    errTips: {
      acento: 'sé, sabéis, conocéis, pedís, cuánto, sección, también … 악센트도 철자예요.',
      conjugacion: 'saber: sé · conocer: conozco · pedir: pido, pides, pide, pedimos, pedís, piden',
      pronombre: 'a mí→me, a ti→te, a él/ella→le, a nosotros→nos, a vosotros→os, a ellos→les',
      concordancia: '옷이 주어! 단수 → queda / sienta, 복수 → quedan / sientan',
      ordinal: '남성 단수 명사 앞: primero → primer, tercero → tercer'
    },
    classify(ti, ta) {
      const P = ['me', 'te', 'le', 'nos', 'os', 'les'];
      if (ti.filter(w => P.includes(w)).join() !== ta.filter(w => P.includes(w)).join()) return 'pronombre';
      const sw = (x, y) => ti.includes(x) && ta.includes(y);
      if (sw('queda', 'quedan') || sw('quedan', 'queda') || sw('sienta', 'sientan') || sw('sientan', 'sienta')) return 'concordancia';
      if (sw('primero', 'primer') || sw('tercero', 'tercer')) return 'ordinal';
      const V = /^(s[eé]|sab|conoc|conozc|p[ie]d|sig|segu|m[ie]d|rep[ie]t|vist|elij|elig|eleg|sirv|serv)/;
      const vi = ti.find(w => V.test(w)), va = ta.find(w => V.test(w));
      if (va && vi && vi !== va) return 'conjugacion';
      return null;
    },
    errRules: [
      { re: W0 + 'yo sabo' + W1 + '|' + W0 + 'sabo' + W1, t: 'conjugacion', msg: 'saber 의 yo 형 → sé' },
      { re: W0 + '(conoco|conosco|conozo)' + W1, t: 'conjugacion', msg: 'conocer 의 yo 형 → conozco' },
      { re: W0 + '(pedo|pides?mos|pidimos|pid[ií]s|meda|medo|repeto|segio|siguo)' + W1, t: 'conjugacion', msg: 'e→i: pido · pedimos · pedís · mido · repito · sigo' },
      { re: W0 + '(primero|tercero) (piso|d[ií]a|libro|a[nñ]o|mes|lugar|hijo|plato)' + W1, t: 'ordinal', msg: '남성 단수 명사 앞 → primer / tercer' },
      { re: W0 + '(me|te|le|nos|os|les) (queda|sienta) (los|las|estos|estas|mis|tus)' + W1, t: 'concordancia', msg: '복수 주어 → quedan / sientan' },
      { re: W0 + 'conozco (julia|juan|mar[ií]a|pedro|laura)' + W1, t: 'estructura', msg: '사람 앞에는 a: conozco a …' },
      { re: W0 + 'cuanto (cuesta|cuestan|vale|valen|es)' + W1, t: 'acento', msg: '의문사 "cuánto"' }
    ],
    accWords: ['sabéis', 'conocéis', 'pedís', 'medís', 'repetís', 'seguís', 'servís', 'elegís', 'sección', 'también', 'probármela', 'probársela', 'séptimo', 'décimo', 'bañador', 'cumpleaños'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'De compras → 쇼핑 이야기 글로 쓰기',
        icons: ['🛍️', '👗', '💶'],
        questions: ['¿Adónde vas de compras y con quién? ¿Conoces una buena tienda de ropa? (conocer)', '¿Qué ropa quieres comprar? ¿Cuánto cuesta? ¿Cómo te queda / te sienta?', '¿Qué pides cuando vas a un café después de las compras? (pedir)'],
        minWords: 50,
        hint: 'saber · conocer · quedar / sentar · pedir · 가격 표현을 모두 쓰면 높은 점수!',
        ph: 'Este sábado voy de compras con mi amiga. Conozco una tienda …',
        connectors: ['y', 'pero', 'porque', 'también', 'además', 'primero', 'después', 'luego', 'entonces'],
        rubric: [
          { k: 'rop', label: '옷 이름 2개 이상', max: 8, re: ROPA, min: 2, ax: 'Contenido' },
          { k: 'pre', label: '가격 (cuesta / vale / euros)', max: 8, re: 'cuestan?|valen?|euros?|soles|pesos|cu[aá]nto es', ax: 'Contenido' },
          { k: 'sab', label: 'saber / conocer', max: 10, re: '(s[eé]|sabes|sabe|sabemos|sab[eé]is|saben|conozco|conoces|conoce|conocemos|conoc[eé]is|conocen)', ax: 'Gramática' },
          { k: 'que', label: 'quedar / sentar / faltar + 대명사', max: 12, re: '(me|te|le|nos|os|les) (quedan?|sientan?|faltan?)', ax: 'Gramática' },
          { k: 'ped', label: 'e → i 동사 (pido, sigo, repito …)', max: 8, re: '(pido|pides|pide|pedimos|ped[ií]s|piden|sigo|sigue|siguen|mido|mide|repito|repite|sirven?|elijo|elige)', ax: 'Gramática' },
          { k: 'ord', label: '서수 (primer, segunda …)', max: 4, re: '(primer|primero|primera|segundo|segunda|tercer|tercera|tercero|cuarto|cuarta|quinto|quinta)', ax: 'Gramática' }
        ],
        model: 'Este sábado voy de compras con mi amiga Sofía. Conozco una tienda de ropa muy buena en el centro comercial. Quiero comprar una falda y una blusa para mi fiesta de cumpleaños. La blusa rosa cuesta treinta euros y me sienta muy bien, pero la falda me queda un poco estrecha. Mi amiga sabe mucho de moda. Después vamos a un café en la primera planta y yo siempre pido un chocolate caliente.'
      }
    },
    build: B
  });
})();
