/* Lección 02 · María es de España — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 25~38쪽 : Diálogo → Vocabulario·Contesta → Lectura → Vocabulario·Contesta → Amplía tu vocabulario
   → Gramática y ejercicios(연습문제 1~4) → Actividades 1~3 → Cultura → ¡Compruébalo! → Resultados */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, dialogBlock, readBlock, ejHead, acHead, dlgHead, ribbon, modelo, tip, vocTable, contesta, culturaHTML,
    W0, W1, MARK } = SC;

  const D = {
    skills: {
      voc: 'Vocabulario 어휘',
      com: 'Comprensión 내용 이해',
      adj: 'Adjetivos 형용사 일치',
      dem: 'Demostrativos 지시사',
      pos: 'Posesivos 소유사',
      ser: 'Ser · Estar',
      nac: 'Nacionalidad · Números 국적 · 숫자',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 핵심 학습 목표', group: '' },
      { id: 'd1', label: 'Diálogo', kr: '동네 카페에서', group: 'Diálogo · Lectura', kind: 'dialogo' },
      { id: 'c1', label: 'Vocabulario 1', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'lect', label: 'Lectura', kr: '리마의 다비드', group: 'Diálogo · Lectura', kind: 'lectura' },
      { id: 'c2', label: 'Vocabulario 2', kr: '어휘 · 질문에 답하기', group: 'Diálogo · Lectura' },
      { id: 'amplia', label: 'Amplía tu vocabulario', kr: '어휘 넓히기', group: 'Diálogo · Lectura' },
      { id: 'gram', label: 'Gramática', kr: '형용사 · 지시사 · 소유사 · ser/estar', group: 'Gramática y ejercicios' },
      { id: 'e1', label: '연습문제 1', kr: '형용사의 올바른 형태', group: 'Gramática y ejercicios', kind: 'ej', n: 1 },
      { id: 'e2', label: '연습문제 2', kr: '지시사 넣기', group: 'Gramática y ejercicios', kind: 'ej', n: 2 },
      { id: 'e3', label: '연습문제 3', kr: '소유사 넣기', group: 'Gramática y ejercicios', kind: 'ej', n: 3 },
      { id: 'e4', label: '연습문제 4', kr: 'ser와 estar', group: 'Gramática y ejercicios', kind: 'ej', n: 4 },
      { id: 'ac1', label: 'Actividades 1', kr: '국적 형용사 표', group: 'Actividades', kind: 'ac', n: 1 },
      { id: 'ac2', label: 'Actividades 2', kr: '숫자 0~19', group: 'Actividades', kind: 'ac', n: 2 },
      { id: 'ac3', label: 'Actividades 3', kr: '사진 속 인물 되어 대답하기', group: 'Actividades', kind: 'ac', n: 3 },
      { id: 'cultura', label: 'Cultura', kr: '중남미 국가의 행복 지수', group: 'Repaso' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],

    dialogo: [
      { who: 'Juan', es: 'Hola, ¿cómo estás?' },
      { who: 'Miguel', es: '[Genial], gracias, ¿y tú?' },
      { who: 'Juan', es: 'Muy bien. Miguel, te [presento] a un amigo mío. Este es Fernando. Fernando y yo somos [compañeros] de trabajo.' },
      { who: 'Miguel', es: '¡Hola, Fernando! Encantado. Yo soy Miguel. ¿De dónde eres?' },
      { who: 'Fernando', es: 'Mucho gusto. Soy [mexicano]. Soy de Guadalajara. Y tú, ¿de dónde eres?' },
      { who: 'Miguel', es: 'Yo soy [colombiano]. ¿Eres [ingeniero] como Juan?' },
      { who: 'Fernando', es: 'Sí, soy ingeniero también. Tú, ¿qué [haces]?' },
      { who: 'Miguel', es: 'Sí, soy [violinista]. [Toco] el violín en la [orquesta] municipal.' }
    ],
    lectura: ['Hola, mi nombre es David. Soy de Lima, la capital de Perú. Tengo diecinueve años. Soy soltero y vivo con mi familia.',
      'En mi familia somos cinco: mi padre, mi madre, dos hermanas y yo.',
      'Hablo y escribo en inglés, francés y español. Hago ejercicio. Por eso, voy al gimnasio tres veces a la semana. Además, practico fútbol.',
      'Trabajo en un supermercado en el centro de la ciudad como cajero y voy al cine o a una discoteca con mis amigos los fines de semana.'],

    voc1: [
      { es: 'cafetería', kr: '카페테리아', e: '☕' }, { es: 'barrio', kr: '동네', e: '🏘️' }, { es: 'genial', kr: '멋진, 훌륭한', e: '🤩' },
      { es: 'te', kr: '너에게', e: '👉' }, { es: 'presentar', kr: '소개하다', e: '🤝' }, { es: 'compañero', kr: '동료', e: '👥' },
      { es: 'trabajo', kr: '일, 직장', e: '💼' }, { es: 'ingeniero', kr: '엔지니어', e: '👷' }, { es: 'como', kr: '~처럼', e: '🟰' },
      { es: 'hacer', kr: '하다', e: '🛠️' }, { es: 'violinista', kr: '바이올리니스트', e: '🧑‍🎤' }, { es: 'tocar', kr: '연주하다', e: '🎶' },
      { es: 'violín', kr: '바이올린', e: '🎻' }, { es: 'orquesta', kr: '오케스트라', e: '🎼' }, { es: 'municipal', kr: '시의, 시립의', e: '🏛️' }
    ],
    voc2: [
      { es: 'nombre', kr: '이름', e: '📛' }, { es: 'capital', kr: '수도', e: '🏙️' }, { es: 'semana', kr: '일주일', e: '📅' },
      { es: 'soltero', kr: '미혼의', e: '🙋‍♂️' }, { es: 'familia', kr: '가족', e: '👨‍👩‍👧‍👧' }, { es: 'hermana', kr: '여자형제', e: '👭' },
      { es: 'supermercado', kr: '슈퍼마켓', e: '🛒' }, { es: 'discoteca', kr: '디스코텍', e: '🪩' }, { es: 'hacer ejercicio', kr: '운동하다', e: '🏋️' },
      { es: 'gimnasio', kr: '체육관', e: '🏟️' }, { es: 'además', kr: '게다가', e: '➕' }, { es: 'practicar', kr: '연습하다, 행하다', e: '🔁' },
      { es: 'fútbol', kr: '축구', e: '⚽' }, { es: 'centro', kr: '중심지, 시내', e: '📍' }, { es: 'cajero', kr: '현금 출납 담당자', e: '🧾' },
      { es: 'inglés', kr: '영어, 영국 남자', e: '🇬🇧' }, { es: 'francés', kr: '프랑스어, 프랑스 남자', e: '🇫🇷' }, { es: 'cine', kr: '영화관', e: '🎬' }
    ],
    amplia: [
      { es: 'listo', kr: '똑똑한, 약은', e: '🦊' }, { es: 'moreno', kr: '(살결이) 까무잡잡한', e: '🧑🏽' }, { es: 'enorme', kr: '거대한', e: '🪨' },
      { es: 'molesto', kr: '언짢은', e: '😒' }, { es: 'garaje', kr: '차고', e: '🚗' }, { es: 'enano', kr: '난쟁이', e: '🧌' },
      { es: 'huevo', kr: '달걀', e: '🥚' }, { es: 'dedo', kr: '손가락', e: '☝️' }, { es: 'año', kr: '해, 년', e: '🗓️' },
      { es: 'grado', kr: '(온도) 도', e: '🌡️' }, { es: 'cantante', kr: '가수', e: '🎤' }, { es: 'jugador', kr: '선수', e: '⚽' }
    ],

    examBank: [
      { p: 'Yo ____ estudiante. <i>(ser)</i>', a: ['soy'], s: 'ser' },
      { p: 'Ellos ____ holandeses. <i>(ser)</i>', a: ['son'], s: 'ser' },
      { p: 'Mis amigos y yo ____ cansados. <i>(estar)</i>', a: ['estamos'], s: 'ser' },
      { p: 'El alcalde ____ en su despacho. <i>(estar)</i>', a: ['está'], s: 'ser' },
      { p: '¿Tú ____ nervioso hoy? <i>(estar)</i>', a: ['estás'], s: 'ser' },
      { p: 'Vosotros ____ de Colombia. <i>(ser)</i>', a: ['sois'], s: 'ser' },
      { p: 'Las casas ____ (bonito)', a: ['bonitas'], s: 'adj' },
      { p: 'un examen fácil → unos exámenes ____', a: ['fáciles'], s: 'adj' },
      { p: 'una chica ____ <i>(encantador)</i>', a: ['encantadora'], s: 'adj' },
      { p: 'un ____ niño <i>(bueno)</i>', a: ['buen'], s: 'adj' },
      { p: 'una ____ reina <i>(grande)</i>', a: ['gran'], s: 'adj' },
      { p: '____ libro es muy interesante. <i>(이)</i>', a: ['este'], s: 'dem' },
      { p: '____ mesas <i>(그)</i>', a: ['esas'], s: 'dem' },
      { p: '____ años <i>(저)</i>', a: ['aquellos'], s: 'dem' },
      { p: '¿Qué es ____? <i>(이것 — 중성)</i>', a: ['esto'], s: 'dem' },
      { p: '____ casa es muy bonita. <i>(우리들의)</i>', a: ['nuestra'], s: 'pos' },
      { p: 'Elena tiene muchos amigos. ____ amigos son amables.', a: ['sus'], s: 'pos' },
      { p: 'Te presento a un amigo ____. <i>(나의, 후치형)</i>', a: ['mío'], s: 'pos' },
      { p: 'Pierre es de Francia. Es ____.', a: ['francés'], s: 'nac' },
      { p: 'Yuki es de Japón. Es ____. <i>(여)</i>', a: ['japonesa'], s: 'nac' },
      { p: 'Mike es de Estados Unidos. Es ____.', a: ['estadounidense'], s: 'nac' },
      { p: '16 → ____', a: ['dieciséis'], s: 'nac' },
      { p: 'Tengo ____ años. <i>(19)</i>', a: ['diecinueve'], s: 'nac' }
    ]
  };

  const NAC = [['Alemania 독일', 'alemán', 'alemana'], ['Argentina 아르헨티나', 'argentino', 'argentina'], ['Bélgica 벨기에', 'belga', 'belga'], ['Brasil 브라질', 'brasileño', 'brasileña'],
    ['Canadá 캐나다', 'canadiense', 'canadiense'], ['Chile 칠레', 'chileno', 'chilena'], ['Corea 한국', 'coreano', 'coreana'], ['Dinamarca 덴마크', 'danés', 'danesa'],
    ['España 스페인', 'español', 'española'], ['Estados Unidos 미국', 'estadounidense', 'estadounidense'], ['Francia 프랑스', 'francés', 'francesa'], ['Grecia 그리스', 'griego', 'griega'],
    ['Holanda 네덜란드', 'holandés', 'holandesa'], ['Inglaterra 영국', 'inglés', 'inglesa'], ['Italia 이탈리아', 'italiano', 'italiana'], ['Japón 일본', 'japonés', 'japonesa'],
    ['México 멕시코', 'mexicano', 'mexicana'], ['Noruega 노르웨이', 'noruego', 'noruega'], ['Perú 페루', 'peruano', 'peruana'], ['Rusia 러시아', 'ruso', 'rusa'],
    ['Suecia 스웨덴', 'sueco', 'sueca'], ['Suiza 스위스', 'suizo', 'suiza']];
  const NUM = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const B = {};

  /* ---------- Diálogo ---------- */
  B.d1 = () => {
    const s = sec('d1', `${dlgHead(1, 'En una cafetería del barrio')}
      <div class="dslot"></div>
      <h3 class="h3">✍️ 빈칸 받아쓰기 — 본문을 가리고 핵심 표현을 쓰세요</h3><div class="c"></div>
      <h3 class="h3">🪪 인물 카드 완성 — 대화를 보고 표를 채우세요</h3><div class="t"></div>
      <h3 class="h3">🧩 단어를 순서대로 배열하세요</h3><div class="items scr"></div>`);
    put(s, '.dslot', dialogBlock('d1', D.dialogo, { cls: 'comic' }));
    put(s, '.c', cloze({ id: 'd1c', sec: 'd1', skill: 'voc', cls: 'lines', text: SC.clozeFromDialog(D.dialogo) }));
    put(s, '.t', cloze({ id: 'd1t', sec: 'd1', skill: 'nac', cls: 'caltab', text: `<table class="gtab"><tr><th></th><th>국적 (nacionalidad)</th><th>직업 (profesión)</th></tr>
      <tr><td>🧑🏻 Juan</td><td>—</td><td>[ingeniero]</td></tr><tr><td>👨🏽 Fernando</td><td>[mexicano]</td><td>[ingeniero]</td></tr><tr><td>🧑🏼‍🦱 Miguel</td><td>[colombiano]</td><td>[violinista]</td></tr></table>` }));
    ['Te presento a un amigo mío.', 'Fernando y yo somos compañeros de trabajo.', 'Toco el violín en la orquesta municipal.']
      .forEach((t, i) => put(s, '.scr', scramble({ id: 'd1s' + i, sec: 'd1', skill: 'pos', target: t })));
  };
  B.c1 = () => {
    const s = sec('c1', `${ribbon('Vocabulario')}${vocTable(D.voc1)}
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.fg', flipGrid(D.voc1));
    D.voc1.filter(v => v.es !== 'te' && v.es !== 'como').forEach((v, i) => put(s, '.w', writeItem({ id: 'v1-' + i, sec: 'c1', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c1q', sec: 'c1', items: [
      { q: '¿De dónde es Fernando?', kw: [['guadalajara|m[eé]xico|mexicano', 'Guadalajara / mexicano']], model: 'Es de Guadalajara. Es mexicano.' },
      { q: '¿Es Fernando violinista?', kw: [[W0 + 'no' + W1, 'No'], ['ingeniero', 'es ingeniero']], model: 'No, es ingeniero.' },
      { q: '¿Qué hace Miguel en la orquesta municipal?', kw: [['toca', 'toca'], ['viol[ií]n', 'el violín']], model: 'Toca el violín.' },
      { q: '¿De dónde es Miguel?', kw: [['colombia|colombiano', 'Colombia / colombiano']], model: 'Es colombiano. Es de Colombia.' },
      { q: '¿Es Juan de Colombia?', kw: [[W0 + 'no' + W1, 'No'], ['miguel', '콜롬비아 사람은 Miguel']], model: 'No, Miguel es de Colombia. Juan es ingeniero.' }
    ] }));
  };

  /* ---------- Lectura ---------- */
  B.lect = () => {
    const s = sec('lect', `<div class="ribbon-head"><span class="ribbon blue">Lectura</span><span class="act-bar"></span></div>
      <div class="rb"></div>
      <h3 class="h3">🪪 다비드의 프로필 카드 완성</h3><div class="t"></div>
      <h3 class="h3">✍️ 3인칭으로 바꿔 쓰기 — David …</h3><div class="items w3"></div>`);
    put(s, '.rb', readBlock(D.lectura, { img: '🧑🏽🇵🇪', g: 'm' }));
    put(s, '.t', cloze({ id: 'lt', sec: 'lect', skill: 'com', cls: 'caltab', text: `<table class="gtab">
      <tr><th>Nombre</th><td>[David]</td><th>Ciudad</th><td>[Lima]</td></tr>
      <tr><th>Edad</th><td>[diecinueve|19] años</td><th>Estado civil</th><td>[soltero]</td></tr>
      <tr><th>Familia</th><td>[cinco|5] personas</td><th>Idiomas</th><td>inglés, [francés] y español</td></tr>
      <tr><th>Trabajo</th><td>[cajero]</td><th>Deporte</th><td>[fútbol]</td></tr></table>` }));
    [['Soy de Lima.', 'Es de Lima.'], ['Vivo con mi familia.', 'Vive con su familia.'], ['Voy al gimnasio tres veces a la semana.', 'Va al gimnasio tres veces a la semana.'], ['Practico fútbol.', 'Practica fútbol.']]
      .forEach(([p, a], i) => put(s, '.w3', writeItem({ id: 'l3-' + i, sec: 'lect', skill: 'pos', prompt: `${p} → David …`, answers: [a, 'David ' + a.charAt(0).toLowerCase() + a.slice(1)] })));
  };
  B.c2 = () => {
    const s = sec('c2', `${ribbon('Vocabulario')}${vocTable(D.voc2)}
      <h3 class="h3">① 짝 맞추기 — 스페인어와 뜻을 선으로 연결하세요</h3><div class="pm"></div>
      <h3 class="h3">② 뜻을 보고 스페인어로 쓰세요</h3><div class="items two w"></div>
      <div class="ribbon-head"><span class="ribbon violet">Contesta a las siguientes preguntas</span><span class="act-bar"></span></div><div class="q"></div>`);
    put(s, '.pm', pairMatch({ id: 'v2pm', sec: 'c2', skill: 'voc', pairs: D.voc2.slice(0, 9).map(v => [v.es, v.kr]) }));
    D.voc2.slice(9).forEach((v, i) => put(s, '.w', writeItem({ id: 'v2-' + i, sec: 'c2', skill: 'voc', prompt: `<span class="emo-sm">${v.e}</span> ${v.kr.split(',')[0]}`, answers: [v.es] })));
    put(s, '.q', contesta({ id: 'c2q', sec: 'c2', items: [
      { q: '¿Cuál es la capital de Perú?', kw: [['lima', 'Lima']], model: 'Es Lima.' },
      { q: '¿Cuántos son la familia de David?', kw: [['cinco|5', 'cinco']], model: 'Son cinco: su padre, su madre, dos hermanas y él.' },
      { q: '¿Cuántos idiomas habla David?', kw: [['tres|3', 'tres']], model: 'Habla tres idiomas: inglés, francés y español.' },
      { q: '¿En qué trabaja David?', kw: [['supermercado|cajero', 'supermercado / cajero']], model: 'Trabaja en un supermercado como cajero.' },
      { q: '¿Qué hace David los fines de semana?', kw: [['cine|discoteca', 'cine / discoteca']], model: 'Va al cine o a una discoteca con sus amigos.' }
    ] }));
  };
  B.amplia = () => {
    const s = sec('amplia', `<div class="ribbon-head"><span class="ribbon blue">Amplía tu vocabulario</span><span class="act-bar"></span></div>
      <h3 class="h3">① 카드를 눌러 뜻을 확인하세요</h3><div class="fg"></div>
      <h3 class="h3">② 그림에 알맞은 단어를 붙이세요</h3><div class="mp"></div>
      <h3 class="h3">③ 형용사를 여성형으로 — una chica …</h3><div class="items two w"></div>`);
    put(s, '.fg', flipGrid(D.amplia));
    put(s, '.mp', matchPics({ id: 'amp', sec: 'amplia', skill: 'voc', items: D.amplia.map(a => ({ e: a.e, es: a.es })), cols: 4 }));
    [['listo', 'lista'], ['moreno', 'morena'], ['enorme', 'enorme'], ['molesto', 'molesta']]
      .forEach(([a, f], i) => put(s, '.w', writeItem({ id: 'ampw' + i, sec: 'amplia', skill: 'adj', prompt: `un chico ${a} → una chica ____`, answers: [f, 'una chica ' + f] })));
  };

  /* ---------- Gramática ---------- */
  B.gram = () => {
    const s = sec('gram', `<div class="ribbon-head"><span class="ribbon red">Gramática y ejercicios</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 형용사</h3>
        <p><b>(1)</b> 형용사는 수식하는 명사의 <b>성과 수에 일치</b>하며 일반적으로 명사의 <b>뒤</b>에 위치한다.</p>
        <table class="gtab"><tr><th></th><th>단수</th><th>복수</th></tr>
          <tr><td rowspan="3">남성</td><td>el niño cariños<b class="hi">o</b> 사랑스러운 아이</td><td>los niños cariños<b class="hi">os</b></td></tr>
          <tr><td>un perro blanc<b class="hi">o</b> 흰 개</td><td>unos perros blanc<b class="hi">os</b></td></tr>
          <tr><td>un examen fácil 쉬운 시험</td><td>unos exámenes fácil<b class="hi">es</b></td></tr>
          <tr><td rowspan="3">여성</td><td>la casa bonit<b class="hi">a</b> 예쁜 집</td><td>las casas bonit<b class="hi">as</b></td></tr>
          <tr><td>una gata negr<b class="hi">a</b> 검은 고양이</td><td>unas gatas negr<b class="hi">as</b></td></tr>
          <tr><td>una alumna inteligente 똑똑한 학생</td><td>unas alumnas inteligente<b class="hi">s</b></td></tr></table>
        ${tip('그 외의 모음이나 자음으로 끝나는 경우 남성형과 여성형이 동일하나, 접미사 <b>-or</b>로 끝나는 경우 여성형은 <b>-ora</b>: un chico encantador → una chica encantador<b>a</b> / unos chicos encantadores → unas chicas encantador<b>as</b>')}
        <p><b>(2)</b> 일부 형용사는 명사 앞에 놓일 때와 뒤에 놓일 때 그 의미가 달라진다.</p>
        <table class="gtab"><tr><th>명사 앞</th><th>명사 뒤</th></tr><tr><td>un viejo amigo 오래된 친구</td><td>un amigo viejo 늙은 친구</td></tr>
          <tr><td>una nueva casa 새로 이사한 집, 구한 집</td><td>una casa nueva 새로 지은 집</td></tr><tr><td>una pobre mujer 불쌍한 여인</td><td>una mujer pobre 가난한 여인</td></tr></table>
        <p><b>(3)</b> 형용사 bueno/a, malo/a는 <b>남성 단수형 앞</b>에서 어미 모음이 탈락한다.</p>
        <table class="gtab"><tr><th>bueno 좋은</th><th>malo 나쁜</th></tr><tr><td>un <b class="hi">buen</b> niño</td><td>un <b class="hi">mal</b> hombre</td></tr><tr><td>unos buenos niños</td><td>unos malos hombres</td></tr>
          <tr><td>una buena niña</td><td>una mala mujer</td></tr><tr><td>unas buenas niñas</td><td>unas malas mujeres</td></tr></table>
        ${tip('grande가 <b>단수 명사 앞</b>에 놓일 때 -de는 탈락한다: un <b>gran</b> rey 위대한 왕 · una <b>gran</b> reina 위대한 여왕')}
        <div class="g1"></div></div>
      <div class="gcard"><h3>2. 지시사</h3>
        <p>지시사는 명사 앞에서는 지시형용사로, 단독 사용 시에는 지시대명사로 사용한다.</p>
        <table class="gtab"><tr><th></th><th>남성 단수</th><th>남성 복수</th><th>여성 단수</th><th>여성 복수</th></tr>
          <tr><td>이/이것/이사람</td><td>este</td><td>estos</td><td>esta</td><td>estas</td></tr>
          <tr><td>그/그것/그사람</td><td>ese</td><td>esos</td><td>esa</td><td>esas</td></tr>
          <tr><td>저/저것/저사람</td><td>aquel</td><td>aquellos</td><td>aquella</td><td>aquellas</td></tr></table>
        <div class="dist"><span>🙋 <b>este</b><small>말하는 사람 가까이</small></span><span>👉 <b>ese</b><small>듣는 사람 가까이</small></span><span>🏔️ <b>aquel</b><small>둘 다에게서 멀리</small></span></div>
        <p>Este libro es muy interesante. ${say('Este libro es muy interesante.')} 이 책은 매우 재미있다.<br>Ese profesor vive lejos de la ciudad. 그 교수는 도시에서 멀리 산다.<br>Aquel estudia español. 저 사람은 스페인어를 공부한다.</p>
        ${tip('추상적이거나 명칭을 모르는 대상을 가리킬 때에는 중성형 <b>esto, eso, aquello</b>가 사용된다. ¿Qué es esto? 이것은 무엇입니까? — No es eso. 그게 아니야.')}
        <div class="g2"></div></div>
      <div class="gcard"><h3>3. 소유사</h3>
        <p>전치형은 명사 앞에서 수식하고, 후치형은 명사 뒤에서 수식한다. 후치형을 사용할 경우, 명사 앞에 관사 등을 넣을 수 있다.</p>
        <table class="gtab"><tr><th></th><th>전치형 단수</th><th>전치형 복수</th><th>후치형 단수</th><th>후치형 복수</th></tr>
          ${[['1인칭 단수', 'mi', 'mis', 'mío / mía', 'míos / mías'], ['2인칭 단수', 'tu', 'tus', 'tuyo / tuya', 'tuyos / tuyas'], ['1인칭 복수', 'nuestro / nuestra', 'nuestros / nuestras', 'nuestro / nuestra', 'nuestros / nuestras'],
            ['2인칭 복수', 'vuestro / vuestra', 'vuestros / vuestras', 'vuestro / vuestra', 'vuestros / vuestras'], ['3인칭 단복수', 'su', 'sus', 'suyo / suya', 'suyos / suyas']]
            .map(r => `<tr>${r.map((c, i) => `<td${i ? '' : ' class="l"'}>${c}</td>`).join('')}</tr>`).join('')}</table>
        ${tip('su(s), suyo(s)는 소유자가 아니라 <b>소유물</b>과 그 수를 일치시킨다. 예를 들어 sus libros는 \'그의/그녀의/당신의/그들의/그녀들의/당신들의 책들\'을 모두 의미할 수 있다.<br>Mi nombre es Carlos. · Nuestra casa es muy bonita. · Ellos tienen una hija. Su hija es alta. · Elena tiene muchos amigos. Sus amigos son amables.')}
        <div class="g3"></div></div>
      <div class="gcard"><h3>4. ser 동사와 estar 동사</h3>
        <p><b>(1) 직설법 현재시제 동사활용</b></p>
        <table class="gtab"><tr><th rowspan="2"></th><th colspan="2">ser</th><th colspan="2">estar</th></tr><tr><th>단수</th><th>복수</th><th>단수</th><th>복수</th></tr>
          <tr><td>1인칭</td><td>soy</td><td>somos</td><td>estoy</td><td>estamos</td></tr><tr><td>2인칭</td><td>eres</td><td>sois</td><td>estás</td><td>estáis</td></tr><tr><td>3인칭</td><td>es</td><td>son</td><td>está</td><td>están</td></tr></table>
        <p><b>(2) 용법</b> — <b>ser</b> 동사는 주어의 <b>본질적인 속성</b>을 나타내고, <b>estar</b> 동사는 주어의 <b>일시적인 상태나 위치</b>를 나타낸다.</p>
        <div class="se2"><div><h4>ser 💎</h4><p>Mi hermana es abogada. 내 누이는 변호사이다.<br>Ellos son holandeses. 그들은 네덜란드 사람들이다.<br>La nieta de María es muy bonita. 마리아의 손녀는 매우 예쁘다.</p></div>
          <div><h4>estar 🌦️📍</h4><p>Están nerviosos. 그들은 초조해하고 있다.<br>Los pacientes están muy contentos. 환자들은 매우 만족해한다.<br>Mis amigos y yo estamos cansados. 내 친구들과 나는 피곤하다.<br>El alcalde está en su despacho. 시장은 집무실에 있다.</p></div></div>
        <div class="g4a"></div><div class="g4b"></div></div>`);
    put(s, '.g1', cloze({ id: 'g1', sec: 'gram', skill: 'adj', title: '괄호 안 형용사를 명사에 일치시키세요.', cls: 'lines', text:
      ['las casas [bonitas] <i>(bonito)</i>', 'unos perros [blancos] <i>(blanco)</i>', 'unas alumnas [inteligentes] <i>(inteligente)</i>', 'unos exámenes [fáciles] <i>(fácil)</i>', 'una chica [encantadora] <i>(encantador)</i>', 'un [buen] niño <i>(bueno)</i>', 'un [mal] hombre <i>(malo)</i>', 'una [gran] reina <i>(grande)</i>'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g2', sortBoard({ id: 'g2sb', sec: 'gram', skill: 'dem', title: '지시사를 거리별로 분류하세요.', cols: [{ k: 'e', label: '🙋 이 (este)' }, { k: 's', label: '👉 그 (ese)' }, { k: 'a', label: '🏔️ 저 (aquel)' }],
      chips: [['este', 'e'], ['estas', 'e'], ['estos', 'e'], ['esa', 's'], ['esos', 's'], ['eso', 's'], ['aquel', 'a'], ['aquellas', 'a'], ['aquello', 'a']] }));
    put(s, '.g3', cloze({ id: 'g3', sec: 'gram', skill: 'pos', title: '알맞은 소유사를 쓰세요 (소유물에 일치!).', cls: 'lines', text:
      ['[Mi] nombre es Carlos. <i>(나의)</i>', '[Nuestra] casa es muy bonita. <i>(우리들의)</i>', 'Ellos tienen una hija. [Su] hija es alta. <i>(그들의)</i>', 'Elena tiene muchos amigos. [Sus] amigos son amables. <i>(그녀의)</i>', '¿Dónde están [tus] libros? <i>(너의)</i>', 'Es un amigo [mío]. <i>(나의, 후치형)</i>'].map(x => `<p>${x}</p>`).join('') }));
    put(s, '.g4a', cloze({ id: 'g4a', sec: 'gram', skill: 'ser', title: '표를 완성하세요.', cls: 'caltab', text: `<table class="gtab"><tr><th></th><th>ser</th><th>estar</th></tr>${[['yo', 'soy', 'estoy'], ['tú', 'eres', 'estás'], ['él / ella / usted', 'es', 'está'], ['nosotros/as', 'somos', 'estamos'], ['vosotros/as', 'sois', 'estáis'], ['ellos / ellas / ustedes', 'son', 'están']].map(([p, a, b]) => `<tr><td>${p}</td><td>[${a}]</td><td>[${b}]</td></tr>`).join('')}</table>` }));
    put(s, '.g4b', sortBoard({ id: 'g4sb', sec: 'gram', skill: 'ser', title: 'ser일까 estar일까? 표현을 분류하세요.', cols: [{ k: 's', label: '💎 ser (본질 · 직업 · 국적)' }, { k: 'e', label: '🌦️📍 estar (상태 · 위치)' }],
      chips: [['… abogada', 's'], ['… holandeses', 's'], ['… de México', 's'], ['… ingeniero', 's'], ['… nerviosos', 'e'], ['… cansados', 'e'], ['… en su despacho', 'e'], ['… en clase', 'e']] }));
  };

  /* ---------- 연습문제 ---------- */
  B.e1 = () => {
    const s = sec('e1', `${ejHead(1, '괄호 안 형용사의 올바른 형태를 쓰세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e1c', sec: 'e1', skill: 'adj', cls: 'lines', text:
      ['1. Juan es un alumno [listo] <i>(listo)</i>.', '2. Guillermo I es un [gran] <i>(grande)</i> rey de Prusia.', '3. María es una chica [morena] <i>(moreno)</i>.', '4. Pilar siempre habla en voz [alta] <i>(alto)</i>.', '5. Cristina lleva unas cajas [enormes] <i>(enorme)</i>.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e2 = () => {
    const s = sec('e2', `${ejHead(2, '빈칸에 알맞은 지시사를 넣으세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e2c', sec: 'e2', skill: 'dem', cls: 'lines', text:
      [['estas', '이', 'amigas'], ['ese', '그', 'examen'], ['estas', '이', 'ciudades'], ['aquellos', '저', 'años'], ['esas', '그', 'mesas']].map(([a, k, n], i) => `<p>${i + 1}. [${a}] <i>(${k})</i> ${n}</p>`).join('') }));
  };
  B.e3 = () => {
    const s = sec('e3', `${ejHead(3, '빈 칸에 알맞은 소유사를 넣으세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e3c', sec: 'e3', skill: 'pos', cls: 'lines', text:
      ['1. [Nuestra] <i>(우리들의)</i> hija estudia matemáticas.', '2. Ese novio [suyo] <i>(그녀의)</i> es antipático.', '3. [Vuestro] <i>(너희들의)</i> perro corre detrás del ratón.', '4. Venden unos libros [suyos] <i>(그의)</i>.', '5. [Sus] <i>(그들의)</i> padres viven en Seúl.'].map(x => `<p>${x}</p>`).join('') }));
  };
  B.e4 = () => {
    const s = sec('e4', `${ejHead(4, 'ser 동사와 estar 동사 중 알맞은 동사를 선택하여 주어에 맞게 활용하세요.')}<div class="c"></div>`);
    put(s, '.c', cloze({ id: 'e4c', sec: 'e4', skill: 'ser', cls: 'lines', text:
      ['1. Las chicas [están] molestas.', '2. Mis amigos y yo [estamos] en clase.', '3. Araceli [es] de Argentina y [es] profesora de español.', '4. Las casas [son] de María.', '5. López vive en Madrid, pero ahora [está] en Seúl.'].map(x => `<p>${x}</p>`).join('') }));
  };

  /* ---------- Actividades ---------- */
  B.ac1 = () => {
    const s = sec('ac1', `${acHead(1, '국적과 관련된 형용사를 익히고 친구와 대화해보세요.', { kr: '표의 빈칸을 채우세요 — 남성형 ↔ 여성형' })}
      <div class="t"></div>
      ${modelo('A: ¡Hola! Soy Felipe. Soy de México. ¿De dónde eres tú?<br>B: Soy mexicano también. Me llamo Julio. Encantado.', '보기')}
      ${tip('-o → -a (chileno → chilena) / 자음 → +a, 악센트 탈락 (alemán → alemana, francés → francesa) / -e, -a 는 남녀 동일 (canadiense, belga)')}
      <h3 class="h3">✍️ 문장 완성</h3><div class="items two w"></div>
      <h3 class="h3">💬 보기처럼 대화 쓰기</h3><div class="f"></div>`);
    put(s, '.t', cloze({ id: 'ac1t', sec: 'ac1', skill: 'nac', cls: 'caltab', text: `<table class="gtab"><tr><th>국명</th><th>남성 단수형</th><th>여성 단수형</th></tr>${NAC.map(([p, m, f], i) =>
      `<tr><td class="l">${p}</td><td>${i % 2 ? m : `[${m}]`}</td><td>${i % 2 ? `[${f}]` : f}</td></tr>`).join('')}</table>` }));
    [['Hans es de Alemania. Es ____.', 'alemán'], ['Pedro es de Brasil. Es ____.', 'brasileño'], ['Minho es de Corea. Es ____.', 'coreano'], ['Sohi es de Corea. Es ____.', 'coreana'],
      ['Yuki es de Japón. Es ____.', 'japonesa'], ['Natasha es de Rusia. Es ____.', 'rusa'], ['Ellas son de Inglaterra. Son ____.', 'inglesas'], ['Ellos son de Perú. Son ____.', 'peruanos']]
      .forEach(([p, a], i) => put(s, '.w', writeItem({ id: 'ac1w' + i, sec: 'ac1', skill: 'nac', prompt: p, answers: [a] })));
    put(s, '.f', freeItem({ id: 'ac1f', sec: 'ac1', skill: 'nac', rows: 3, prompt: '두 사람(A·B)의 국적이 다르게 대화를 쓰세요.', ph: 'A: ¡Hola! Soy … Soy de … ¿De dónde eres tú?\nB: …',
      must: [{ re: '¿\\s*de d[oó]nde eres', label: '¿De dónde eres?' }, { re: W0 + 'soy de' + W1, label: 'Soy de + 나라' }, { re: W0 + 'soy (' + NAC.flatMap(n => [n[1], n[2]]).map(SC.rx).join('|') + ')' + W1, label: 'Soy + 국적 형용사' }, { re: 'me llamo', label: 'Me llamo …' }],
      model: 'A: ¡Hola! Soy Hana. Soy de Corea. ¿De dónde eres tú? B: Soy francés. Me llamo Pierre. Encantado.' }));
  };
  B.ac2 = () => {
    const s = sec('ac2', `${acHead(2, '빈칸에 알맞은 숫자를 넣어 말해 보세요.')}
      <div class="nums">${NUM.map((n, i) => `<span><b>${i}</b>${n} ${say(n)}</span>`).join('')}</div>
      ${tip('16~19는 한 단어: dieci<b>séis</b>(악센트!), diecisiete, dieciocho, diecinueve')}
      <h3 class="h3">🖼️ 그림을 보고 숫자를 쓰세요</h3><div class="items two p"></div>
      <h3 class="h3">🎧 듣고 숫자 쓰기 — 🔊를 누르고 들리는 숫자를 스페인어로 쓰세요</h3><div class="items two l"></div>`);
    [['🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚', 'huevos', 10], ['🧌🧌🧌🧌🧌🧌🧌', 'enanos', 7], ['🚌🚌', 'autobuses', 2], ['🌡️ <small>18 ℃</small>', 'grados', 18], ['🎂 <small>16</small>', 'años', 16], ['🖐️', 'dedos', 5]]
      .forEach(([e, n, k], i) => put(s, '.p', writeItem({ id: 'ac2p' + i, sec: 'ac2', skill: 'nac', prompt: `<span class="photo-emo">${e}</span> ______ ${n}`, answers: [`${NUM[k]} ${n}`, NUM[k]] })));
    [13, 3, 19, 11, 15, 12].forEach((k, i) => put(s, '.l', writeItem({ id: 'ac2l' + i, sec: 'ac2', skill: 'nac', prompt: `${i + 1}) ${say(NUM[k])}`, ph: '들은 숫자', answers: [NUM[k]] })));
  };
  B.ac3 = () => {
    const P = [
      { e: '👑🇪🇸✉️', n: 'el rey de España (우표 속 인물)', re: [['felipe|rey', '이름 / 왕'], ['espa[nñ]ol|espa[nñ]a', '국적: español'], ['madrid', '사는 곳: Madrid']], model: 'B: Me llamo Felipe. B: Soy español, soy de España. B: Soy el rey de España. B: Vivo en Madrid.' },
      { e: '⚽🇵🇹', n: '포르투갈 출신 축구 선수', re: [['portugu[eé]s|portugal', '국적: portugués'], ['futbolista|jugador', '직업: jugador de fútbol']], model: 'B: Me llamo Cristiano. B: Soy portugués. B: Soy jugador de fútbol. B: Vivo en Madrid.' },
      { e: '🎸🎤🇺🇸', n: '미국 출신 가수', re: [['estadounidense|estados unidos', '국적: estadounidense'], ['cantante', '직업: cantante']], model: 'B: Me llamo Taylor. B: Soy estadounidense. B: Soy cantante. B: Vivo en Nueva York.' }];
    const s = sec('ac3', `${acHead(3, '친구들과 짝을 지어 대화를 하되, 한 사람은 사진 속의 인물이 되어 대답해 보시오.')}
      ${modelo('A: ¿Cómo te llamas?<br>B: ________.<br>A: ¿De dónde eres?<br>B: ________.<br>A: ¿Qué haces?<br>B: ________.<br>A: ¿Dónde vives?<br>B: ________.')}
      <div class="items f"></div>`);
    P.forEach((p, i) => put(s, '.f', freeItem({ id: 'ac3-' + i, sec: 'ac3', skill: 'lib', rows: 4, prompt: `<span class="photo-emo">${p.e}</span> <b>${p.n}</b>이(가) 되어 네 질문에 답하세요.`, ph: 'Me llamo …\nSoy …\nSoy …\nVivo en …',
      must: [{ re: 'me llamo', label: 'Me llamo …' }, { re: W0 + 'soy' + W1, label: 'Soy …', min: 2 }, ...p.re.map(([re, label]) => ({ re, label })), { re: 'vivo en', label: 'Vivo en …' }], model: p.model })));
  };

  /* ---------- Cultura ---------- */
  B.cultura = () => {
    const T = [['Paraguay', 89], ['Colombia', 84], ['Ecuador', 84], ['Guatemala', 84], ['Honduras', 82], ['Panamá', 82], ['Venezuela', 82], ['Costa Rica', 81], ['El Salvador', 81], ['Nicaragua', 81]];
    const s = sec('cultura', culturaHTML('중남미 국가의 행복 지수', [
      { e: '🧪😊', h: '행복 공식', t: '2002년 영국의 심리학자 로스웰(Rothwell)과 인생 상담사 코언(Cohen)은 \'행복은 인생관 · 적응력, 건강 · 돈 · 인간관계, 자존심, 유머 등에 의해 결정된다\'고 주장했다.' },
      { e: '📉💰', h: 'GDP의 한계', t: 'GDP는 경제 활동의 양만 계산해 환경 악화나 삶의 질을 반영하지 못한다는 비판을 받아 왔다.' },
      { e: '📊🌎', h: '새로운 지표', t: '삶의 만족도, 미래에 대한 기대, 실업률, 희망, 사랑 등 행복과 삶의 질을 포괄적으로 고려한 지표로 순위를 산출했다.' }
    ]) + `<div class="hap"><h4>Los 10 países más felices del mundo</h4>${T.map(([p, c], i) => `<div class="hr"><b>${i + 1}</b><span>${p}</span><i style="width:${(c - 70) * 4.5}%"></i><em>${c}</em></div>`).join('')}<small>Fuente: "Ranking Mundial de Felicidad 2015", Gallup</small></div>
      <h3 class="h3">🔎 표를 보고 답하세요</h3><div class="items q"></div>`);
    [['1위 나라는?', ['Paraguay', 'Colombia', 'Panamá', 'Ecuador'], 'Paraguay', '89점'],
      ['상위 10개국의 공통점은?', ['모두 중남미 국가', '모두 유럽 국가', '모두 섬나라', '모두 GDP 1위권'], '모두 중남미 국가', '행복은 GDP만으로 결정되지 않아요'],
      ['Costa Rica 의 점수는?', ['81', '82', '84', '89'], '81', '8위']]
      .forEach(([p, o, a, ex], i) => put(s, '.q', choiceItem({ id: 'cul-' + i, sec: 'cultura', skill: 'com', prompt: p, options: o, answer: a, explain: ex })));
    put(s, '.q', writeItem({ id: 'cul-w', sec: 'cultura', skill: 'nac', prompt: '콜롬비아 사람(남)은 스페인어로? <i>Colombia → …</i>', answers: ['colombiano'] }));
  };

  document.head.insertAdjacentHTML('beforeend', `<style>
    .dist{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}.dist span{background:#fff;border:1px solid #e3e3e3;border-radius:12px;text-align:center;padding:8px;font-size:26px}.dist b{display:block;font-size:17px}.dist small{display:block;font-size:12px;color:#777}
    .se2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0}.se2>div{background:#fff;border:1px solid #e3e3e3;border-radius:12px;padding:10px 14px}.se2 h4{margin:0 0 6px;color:#a32638}.se2 p{margin:0;line-height:1.8;font-size:14.5px}
    .nums{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:10px 0}.nums span{background:#fff;border:1px solid #e3e3e3;border-radius:10px;padding:6px 10px;display:flex;align-items:center;gap:8px}.nums b{color:#f26a21;width:22px}
    .hap{background:linear-gradient(135deg,#f6a04d,#f26a21);border-radius:14px;padding:14px 18px;color:#fff;margin:14px 0}.hap h4{margin:0 0 8px;font-size:20px}.hr{display:grid;grid-template-columns:28px 120px 1fr 40px;align-items:center;gap:8px;margin:4px 0}.hr i{display:block;height:12px;background:#fff7;border-radius:6px}.hr em{font-style:normal;font-weight:700}.hap small{opacity:.9}
    @media(max-width:640px){.nums{grid-template-columns:repeat(2,1fr)}.se2{grid-template-columns:1fr}}
  </style>`);

  SC.lesson({
    num: '02',
    title: 'María es de España',
    ttsTest: 'María es de España.',
    cover: {
      emoji: '🇪🇸☕<small>🎻 👷</small>',
      bg: 'linear-gradient(135deg,#f6a04d,#f26a21 55%,#c2410c)',
      tema: ['Nacionalidades y profesiones', 'La familia y la vida diaria', 'Los números 0–19'],
      com: ['형용사 · 소유사 · 지시사: Tu hermano es alto. · Ese libro es interesante.', 'ser와 estar: Juan es estudiante. · Pilar está molesta.'],
      gram: ['형용사의 성 · 수 일치, buen · mal · gran', '지시사 este · ese · aquel', '소유사 전치형 · 후치형', 'ser / estar 현재형과 용법']
    },
    skills: D.skills,
    sections: D.sections,
    people: {
      Juan: { g: 'm', av: '🧑🏻', side: 'l' }, Miguel: { g: 'm', av: '🧑🏼‍🦱', side: 'r' }, Fernando: { g: 'm', av: '👨🏽', side: 'l' }
    },
    errLabels: { concordancia: '형용사 · 소유사 성·수 일치', serestar: 'ser / estar 선택', conjugacion: 'ser · estar 활용' },
    errTips: {
      acento: 'está, estás, están, francés, alemán, japonés, inglés, dieciséis, mío … 악센트도 철자예요.',
      concordancia: '형용사 · 지시사 · 소유사는 명사(소유물)의 성 · 수에 맞춰요: las casas bonitas, nuestra casa, sus amigos',
      serestar: 'ser = 본질 · 직업 · 국적 · 출신 / estar = 일시적 상태 · 위치',
      conjugacion: 'ser: soy, eres, es, somos, sois, son / estar: estoy, estás, está, estamos, estáis, están'
    },
    classify(ti, ta) {
      const SER = ['soy', 'eres', 'es', 'somos', 'sois', 'son'], EST = ['estoy', 'estás', 'estas', 'está', 'esta', 'estamos', 'estáis', 'estais', 'están', 'estan'];
      const si = ti.some(w => SER.includes(w)), ei = ti.some(w => EST.includes(w)), sa = ta.some(w => SER.includes(w)), ea = ta.some(w => EST.includes(w));
      if ((si && ea && !sa) || (ei && sa && !ea)) return 'serestar';
      if (sa && ti.find(w => SER.includes(w)) !== ta.find(w => SER.includes(w))) return 'conjugacion';
      for (const w of ta) { if (!ti.includes(w) && ti.some(x => x.length > 2 && x.slice(0, -1) === w.slice(0, -1) || x + 's' === w || w + 's' === x)) return 'concordancia'; }
      return null;
    },
    errRules: [
      { re: W0 + '(soy|eres|es|somos|sois|son) (cansad[oa]s?|nervios[oa]s?|molest[oa]s?|content[oa]s?)' + W1, t: 'serestar', msg: '일시적 상태 → estar' },
      { re: W0 + '(soy|eres|es|somos|son) en (clase|casa|madrid|se[uú]l|su despacho)' + W1, t: 'serestar', msg: '위치 → estar' },
      { re: W0 + '(estoy|est[aá]s|est[aá]|estamos|est[aá]n) (estudiante|ingenier[oa]|profesor[a]?|abogad[oa]|mexican[oa]|corean[oa]|espa[nñ]ol[a]?)' + W1, t: 'serestar', msg: '직업 · 국적 → ser' },
      { re: W0 + 'bueno (ni[nñ]o|hombre|amigo|d[ií]a|chico)' + W1, t: 'concordancia', msg: '남성 단수 명사 앞 → buen' },
      { re: W0 + 'malo (ni[nñ]o|hombre|amigo|d[ií]a|chico)' + W1, t: 'concordancia', msg: '남성 단수 명사 앞 → mal' },
      { re: W0 + 'grande (rey|reina|ciudad|amigo|hombre|mujer)' + W1, t: 'concordancia', msg: '단수 명사 앞 → gran' },
      { re: W0 + 'su (amigos|libros|padres|hermanos|hermanas|casas)' + W1, t: 'concordancia', msg: '복수 소유물 → sus' },
      { re: W0 + 'mi (amigos|libros|padres|hermanos|hermanas|casas)' + W1, t: 'concordancia', msg: '복수 소유물 → mis' }
    ],
    accWords: ['están', 'estáis', 'francés', 'alemán', 'japonés', 'inglés', 'holandés', 'danés', 'dieciséis', 'fútbol', 'violín', 'cafetería', 'además', 'perú', 'japón', 'méxico', 'canadá', 'bélgica', 'exámenes', 'fácil', 'fáciles', 'mío', 'también'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Te presento a … → 친구 · 가족 소개 글쓰기',
        icons: ['👨‍👩‍👧', '🌍', '💼'],
        questions: ['¿Cómo se llama tu amigo/a o un miembro de tu familia? ¿De dónde es? ¿Cuántos años tiene?', '¿Cómo es? (alto, moreno, inteligente, simpático …) ¿Qué hace? (estudiante, ingeniero …)', '¿Cómo está hoy? ¿Dónde está ahora?'],
        minWords: 45,
        hint: 'ser(본질 · 국적 · 직업) / estar(상태 · 위치) 구분, 형용사 성·수 일치, 소유사(mi, su, nuestro …)를 쓰면 높은 점수!',
        ph: 'Te presento a mi hermana. Se llama …',
        connectors: ['y', 'pero', 'también', 'además', 'por eso', 'ahora', 'muy'],
        rubric: [
          { k: 'nac', label: '출신 · 국적 (es de … / coreana …)', max: 6, re: 'es de|son de|(' + NAC.flatMap(n => [n[1], n[2]]).map(SC.rx).join('|') + ')', ax: 'Contenido' },
          { k: 'prof', label: '직업 · 하는 일', max: 6, re: 'estudiante|ingenier[oa]|profesor[a]?|m[eé]dic[oa]|abogad[oa]|cantante|cajer[oa]|trabaja|estudia', ax: 'Contenido' },
          { k: 'ser', label: 'ser (soy, es, son …)', max: 8, re: '(soy|eres|es|somos|sois|son)', min: 2, ax: 'Gramática' },
          { k: 'est', label: 'estar (estoy, está …) 상태 · 위치', max: 10, re: '(estoy|est[aá]s|est[aá]|estamos|est[aá]is|est[aá]n) (en|muy|cansad|content|nervios|molest|enferm|bien|mal|feliz|triste|aqu[ií])', ax: 'Gramática' },
          { k: 'pos', label: '소유사 (mi, tu, su, nuestro …)', max: 8, re: '(mi|mis|tu|tus|su|sus|nuestr[oa]s?|vuestr[oa]s?)', min: 2, ax: 'Gramática' },
          { k: 'adj', label: '형용사 2개 이상', max: 8, re: 'alt[oa]s?|baj[oa]s?|moren[oa]s?|rubi[oa]s?|inteligentes?|simp[aá]tic[oa]s?|amables?|bonit[oa]s?|list[oa]s?|guap[oa]s?|cari[nñ]os[oa]s?|buen[oa]?s?|gran(de)?s?', min: 2, ax: 'Gramática' }
        ],
        model: 'Te presento a mi hermana. Se llama Sora. Es coreana y tiene dieciséis años. Es estudiante. Es alta, morena y muy inteligente. Sus amigos son muy simpáticos. Hoy está un poco cansada porque tiene muchos exámenes. Ahora está en casa con nuestra madre.'
      }
    },
    build: B
  });
})();
