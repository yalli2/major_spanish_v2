/* Lección 00 · Alfabeto y pronunciación — 전공 기초 스페인어 (공통 엔진 SC 사용)
   교재 6~10쪽 : 1. 스페인어 알파벳 → 2. 발음 (1)자음 (2)모음 (3)주의 사항 (4)이중모음·삼중모음 → 3. 음절분해 → 4. 단어의 강세 */
(function () {
  'use strict';
  const { $, $$, el, esc, shuffle, say, reg, record, save, sel, sec, put, writeItem, freeItem, cloze, choiceItem, scramble,
    matchPics, pairMatch, sortBoard, flipGrid, ejHead, acHead, ribbon, modelo, tip, W0, W1, MARK } = SC;

  document.head.insertAdjacentHTML('beforeend', `<style>
    .abc{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px;margin:12px 0}
    .abc .lt{background:#fffbe6;border:1px solid #f1e3a6;border-radius:12px;text-align:center;padding:8px 4px;cursor:pointer;transition:transform .15s}
    .abc .lt:hover{transform:translateY(-2px);box-shadow:0 3px 8px rgba(0,0,0,.08)}
    .abc .lt b{display:block;font-size:30px;font-family:var(--serif,serif);color:#5b2a1c}.abc .lt span{font-size:15px;color:#a32638;font-weight:700}
    .abc .lt.sp{background:#fff0e6;border-color:#f6c9a8}
    .ptab td b.k{color:#d6202f}.ptab td.ex{text-align:left}.ptab td.ex span{display:inline-block;margin:2px 10px 2px 0;cursor:pointer;border-bottom:1px dashed #ccc}
    .ptab td.ex span:hover{background:#e7f3fd}.ptab .ipa{font-family:'Times New Roman',serif;font-size:16px;white-space:nowrap}
    .ybox2{background:#fbf3c4;border:1px solid #eadb9c;border-radius:10px;padding:12px 16px;margin:8px 0;display:flex;flex-wrap:wrap;gap:8px 26px;font-size:17px}
    .ybox2 span{cursor:pointer}.ybox2 b{color:#d6202f}
    .vow{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin:10px 0}.vow div{background:#fff;border:1px solid #e3e3e3;border-radius:12px;text-align:center;padding:10px}
    .vow div b{display:block;font-size:34px;color:#2a8bd0}.vow div small{display:block;color:#777}
    .vow .strong b{color:#d6202f}
    .syl{display:inline-flex;gap:4px;margin:4px 10px 4px 0}.syl i{font-style:normal;background:#fff;border:1px solid #d6e7f5;border-radius:6px;padding:2px 8px}.syl i.st{background:#ffe14d;border-color:#e6c200;font-weight:900}
    @media(max-width:640px){.vow{grid-template-columns:repeat(3,1fr)}}
  </style>`);

  const ABC = [['A a', 'a'], ['B b', 'be'], ['C c', 'ce'], ['D d', 'de'], ['E e', 'e'], ['F f', 'efe'], ['G g', 'ge'], ['H h', 'hache'], ['I i', 'i'], ['J j', 'jota'], ['K k', 'ka'], ['L l', 'ele'], ['M m', 'eme'], ['N n', 'ene'],
    ['Ñ ñ', 'eñe'], ['O o', 'o'], ['P p', 'pe'], ['Q q', 'cu'], ['R r', 'erre'], ['S s', 'ese'], ['T t', 'te'], ['U u', 'u'], ['V v', 'uve'], ['W w', 'uve doble'], ['X x', 'equis'], ['Y y', 'ye'], ['Z z', 'zeta']];
  /* 교재 7쪽 자음 표: [철자, 발음, 예] — 굵은 글자는 해당 철자 */
  const CONS = [
    ['b', '[b]', ['bambú', 'bebida', 'boca']], ['c', '[k]', ['casa', 'banco', 'curso']], ['', '[θ] 혹은 [s]', ['cena', 'piscina', 'lección']],
    ['ch', '[ĉ]', ['muchacho', 'chica', 'churro']], ['d', '[d]', ['dedo', 'ducha', 'ciudad']], ['f', '[f]', ['familia', 'café', 'fútbol']],
    ['g', '[g]', ['gato', 'agosto', 'gusto', 'guerra', 'guía', 'bilingüe', 'lingüística']], ['', '[x]', ['gente', 'página']],
    ['h', '묵음', ['hambre', 'ahora', 'huevo']], ['j', '[x]', ['jamón', 'ojo', 'jugo']], ['k', '[k]', ['kilómetro', 'kebab']],
    ['l', '[l]', ['lado', 'colegio', 'libro']], ['ll', '[ʎ]', ['llave', 'calle', 'pollo']], ['m', '[m]', ['madre', 'merienda', 'amor']],
    ['n', '[n]', ['naranja', 'noche', 'lunes']], ['ñ', '[ɲ]', ['niña', 'año', 'compañía']], ['p', '[p]', ['papel', 'pollo', 'puerta']],
    ['q', '[k]', ['queso', 'quince']], ['r', '[r]', ['cara', 'sur', 'pared']], ['', '[r̄]', ['rosa', 'reina', 'alrededor']],
    ['rr', '[r̄]', ['carro', 'arriba', 'guitarra']], ['s', '[s]', ['sal', 'clase', 'tos']], ['t', '[t]', ['tarde', 'techo', 'cultura']],
    ['v', '[b]', ['vaso', 'verdad', 'móvil']], ['w', '[u]', ['whisky', 'sándwich']], ['x', '[ks]', ['examen', 'taxi', 'texto']], ['', '[x]', ['México', 'Texas']], ['', '[s]', ['xilófono']],
    ['y', '[i] 혹은 [y]', ['yo', 'vaya', 'hoy']], ['z', '[θ] 혹은 [s]', ['zapato', 'lápiz', 'zumo']]];

  const D = {
    skills: {
      alf: 'Alfabeto 알파벳',
      con: 'Consonantes 자음',
      voc: 'Vocales 모음·이중모음',
      sil: 'Sílabas 음절분해',
      ace: 'Acento 강세',
      lib: 'Escritura libre 자유작문'
    },
    sections: [
      { id: 'inicio', label: 'Portada', kr: '표지 · 학습 목표', group: '' },
      { id: 'alfabeto', label: 'Alfabeto', kr: '1. 스페인어 알파벳', group: 'Alfabeto' },
      { id: 'deletrear', label: 'Deletrear', kr: '철자 읽기 · 받아쓰기', group: 'Alfabeto' },
      { id: 'consonantes', label: 'Consonantes', kr: '2-(1) 자음', group: 'Pronunciación' },
      { id: 'vocales', label: 'Vocales', kr: '2-(2) 모음', group: 'Pronunciación' },
      { id: 'notas', label: 'Atención', kr: '2-(3) 주의 사항 c · g · q', group: 'Pronunciación' },
      { id: 'diptongos', label: 'Diptongos', kr: '2-(4) 이중모음 · 삼중모음', group: 'Pronunciación' },
      { id: 'silabeo', label: 'Silabeo', kr: '3. 음절분해', group: 'Sílabas y acento' },
      { id: 'acento', label: 'Acento', kr: '4. 단어의 강세', group: 'Sílabas y acento' },
      { id: 'examen', label: '¡Compruébalo!', kr: '쓰기 모의시험', group: 'Repaso' },
      { id: 'resultados', label: 'Resultados', kr: '나의 성적표', group: 'Repaso' }
    ],
    examBank: [
      { p: 'B b 의 이름은? ____', a: ['be'], s: 'alf' },
      { p: 'H h 의 이름은? ____', a: ['hache'], s: 'alf' },
      { p: 'J j 의 이름은? ____', a: ['jota'], s: 'alf' },
      { p: 'Ñ ñ 의 이름은? ____', a: ['eñe'], s: 'alf' },
      { p: 'Q q 의 이름은? ____', a: ['cu'], s: 'alf' },
      { p: 'V v 의 이름은? ____', a: ['uve'], s: 'alf' },
      { p: 'W w 의 이름은? ____', a: ['uve doble'], s: 'alf' },
      { p: 'X x 의 이름은? ____', a: ['equis'], s: 'alf' },
      { p: 'Z z 의 이름은? ____', a: ['zeta'], s: 'alf' },
      { p: '발음 [x] 로 소리 나는 j 단어: ____ón (햄)', a: ['jamón'], s: 'con' },
      { p: '"기타" — gui____a (rr)', a: ['guitarra'], s: 'con' },
      { p: '"부끄러움" — ver____enza (gü)', a: ['vergüenza'], s: 'con' },
      { p: '"치즈" — ____eso (q)', a: ['queso'], s: 'con' },
      { p: '스페인어에서 묵음인 자음은? ____', a: ['h', 'hache'], s: 'con' },
      { p: '강모음 3개: a, e, ____', a: ['o'], s: 'voc' },
      { p: 'ciudad 의 약모음+약모음 이중모음: ____', a: ['iu'], s: 'voc' },
      { p: 'casa 를 음절로 나누면: ____', a: ['ca-sa'], s: 'sil' },
      { p: 'paseo 를 음절로 나누면: ____', a: ['pa-se-o'], s: 'sil' },
      { p: 'lengua 를 음절로 나누면: ____', a: ['len-gua'], s: 'sil' },
      { p: '강세 표시를 붙여 쓰세요: arbol → ____', a: ['árbol'], s: 'ace' },
      { p: '강세 표시를 붙여 쓰세요: corazon → ____', a: ['corazón'], s: 'ace' },
      { p: '강세 표시를 붙여 쓰세요: lampara → ____', a: ['lámpara'], s: 'ace' }
    ]
  };

  const B = {};

  /* ---------- 1. 알파벳 ---------- */
  B.alfabeto = () => {
    const s = sec('alfabeto', `<div class="ribbon-head"><span class="ribbon orange">Alfabeto y pronunciación</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>1. 스페인어 알파벳 — 27글자 (카드를 누르면 이름을 들려줘요)</h3>
        <div class="abc">${ABC.map(([l, n]) => `<div class="lt ${l[0] === 'Ñ' ? 'sp' : ''}" data-say="${n}"><b>${l}</b><span>${n}</span></div>`).join('')}</div>
        <table class="gtab"><tr><th>알파벳</th><th>명칭</th><th>알파벳</th><th>명칭</th></tr>
          ${ABC.slice(0, 14).map((x, i) => { const y = ABC[i + 14]; return `<tr><td><b>${x[0]}</b></td><td>${x[1]} ${say(x[1])}</td><td>${y ? `<b>${y[0]}</b>` : ''}</td><td>${y ? y[1] + ' ' + say(y[1]) : ''}</td></tr>`; }).join('')}</table>
        ${tip('1994년 개정된 스페인 왕립학술원(Real Academia Española)의 규정에 의하면 <b>ch, ll, rr</b>는 독립된 문자로 인정되지 않지만 독자적인 소리를 지닌다. 2009년 개정 이전에 y의 명칭은 <b>i griega</b>(이 그리에가)이다.')}
      </div>
      <h3 class="h3">① 글자 카드 — 앞면 글자, 뒷면 이름</h3><div class="fg"></div>
      <h3 class="h3">② 글자를 보고 이름을 스페인어로 쓰세요</h3><div class="items two w"></div>`);
    put(s, '.fg', flipGrid(ABC.filter((_, i) => i % 2 === 1 || ['Ñ ñ', 'H h', 'J j'].includes(ABC[i][0])).map(([l, n]) => ({ e: l, es: n, kr: `${l[0]} 의 이름` }))));
    $$('.flip .ff span:last-child', s).forEach(x => { x.style.display = 'none'; });
    [['B b', 'be'], ['C c', 'ce'], ['G g', 'ge'], ['H h', 'hache'], ['J j', 'jota'], ['L l', 'ele'], ['Ñ ñ', 'eñe'], ['Q q', 'cu'], ['R r', 'erre'], ['V v', 'uve'], ['W w', 'uve doble'], ['X x', 'equis'], ['Y y', 'ye'], ['Z z', 'zeta']]
      .forEach(([l, n], i) => put(s, '.w', writeItem({ id: 'al-' + i, sec: 'alfabeto', skill: 'alf', prompt: `<span class="emo-sm"><b>${l}</b></span>`, ph: '이름', answers: n === 'ye' ? ['ye', 'i griega'] : [n] })));
  };
  B.deletrear = () => {
    const WORDS = [['hola', 'hache - o - ele - a'], ['jamón', 'jota - a - eme - o - ene'], ['año', 'a - eñe - o'], ['queso', 'cu - u - e - ese - o'], ['zapato', 'zeta - a - pe - a - te - o'], ['guitarra', 'ge - u - i - te - a - erre - erre - a']];
    const s = sec('deletrear', `<div class="ribbon-head"><span class="ribbon blue">Deletrear · ¿Cómo se escribe?</span><span class="act-bar"></span></div>
      ${modelo('A: ¿Cómo te llamas?<br>B: Me llamo Sohi.<br>A: ¿Cómo se escribe?<br>B: <b>ese - o - hache - i</b>.')}
      <h3 class="h3">① 철자 이름을 듣고(읽고) 단어를 쓰세요 🔊</h3><div class="items two d1"></div>
      <h3 class="h3">② 단어의 철자를 글자 이름으로 쓰세요 (예: ese - o - hache - i)</h3><div class="items d2"></div>
      <h3 class="h3">③ 내 이름 철자 말하기</h3><div class="items d3"></div>`);
    WORDS.forEach(([w, sp], i) => put(s, '.d1', writeItem({ id: 'dl1-' + i, sec: 'deletrear', skill: 'alf', prompt: `${say(sp.replace(/ - /g, ', '))} <span class="small">${sp}</span>`, ph: '단어', answers: [w] })));
    [['casa', 'ce - a - ese - a'], ['llave', 'ele - ele - a - uve - e'], ['niña', 'ene - i - eñe - a'], ['examen', 'e - equis - a - eme - e - ene']]
      .forEach(([w, sp], i) => put(s, '.d2', writeItem({ id: 'dl2-' + i, sec: 'deletrear', skill: 'alf', prompt: `${i + 1}) <b>${w}</b> ${say(w)}`, ph: '… - … - …', answers: [sp, sp.replace(/ - /g, ' '), sp.replace(/ - /g, ', ')] })));
    put(s, '.d3', freeItem({ id: 'dl3', sec: 'deletrear', skill: 'alf', line: true, prompt: '¿Cómo te llamas? ¿Cómo se escribe? — 이름과 철자를 쓰세요.', ph: 'Me llamo … Se escribe …',
      must: [{ re: 'me llamo', label: 'Me llamo …' }, { re: W0 + '(be|ce|de|efe|ge|hache|jota|ka|ele|eme|ene|eñe|pe|cu|erre|ese|te|uve|equis|ye|zeta)' + W1, label: '글자 이름 3개 이상', min: 3 }],
      model: 'Me llamo Minsu. Se escribe eme - i - ene - ese - u.' }));
  };

  /* ---------- 2. 발음 ---------- */
  B.consonantes = () => {
    const keyOf = { b: 'b', c: 'c', ch: 'ch', d: 'd', f: 'f', g: 'g', h: 'h', j: 'j', k: 'k', l: 'l', ll: 'll', m: 'm', n: 'n', ñ: 'ñ', p: 'p', q: 'q', r: 'r', rr: 'rr', s: 's', t: 't', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z' };
    let cur = '';
    const rows = CONS.map(([l, ipa, ex]) => { if (l) cur = l; const k = keyOf[cur]; return `<tr><td>${l ? `<b>${l}</b>` : ''}</td><td class="ipa">${ipa}</td><td class="ex">${ex.map(w => `<span data-say="${w}">${w.replace(new RegExp(k.length > 1 || k === 'ñ' ? k : (k === 'r' && cur === 'r' ? 'r' : k), 'i'), m => `<b class="k">${m}</b>`)}</span>`).join('')}</td></tr>`; }).join('');
    const s = sec('consonantes', `<div class="ribbon-head"><span class="ribbon red">2. 스페인어 발음</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>(1) 자음 — 단어를 누르면 발음을 들을 수 있어요 🔊</h3>
        <table class="gtab ptab"><tr><th>철자</th><th>발음</th><th>예</th></tr>${rows}</table>
        ${tip('<b>b = v</b> 모두 [b] · <b>h</b> 는 소리 나지 않음 · <b>j</b> 와 <b>ge, gi</b> 는 목 깊은 곳에서 [x] · <b>ll</b> · <b>y</b> 는 지역에 따라 [ʎ] / [y] · 단어 첫머리의 <b>r</b> 과 <b>rr</b> 은 혀를 굴리는 [r̄]')}
      </div>
      <h3 class="h3">① 발음 분류표 — 칩을 누르고 알맞은 발음 칸을 누르세요</h3><div class="sb1"></div>
      <h3 class="h3">② r 은 [r] 일까 [r̄] 일까?</h3><div class="sb2"></div>
      <h3 class="h3">③ 발음과 철자 짝 맞추기</h3><div class="pm"></div>`);
    put(s, '.sb1', sortBoard({ id: 'consb', sec: 'consonantes', skill: 'con', cols: [{ k: 'k', label: '[k]' }, { k: 'th', label: '[θ] / [s]' }, { k: 'g', label: '[g]' }, { k: 'x', label: '[x]' }],
      chips: [['casa', 'k'], ['curso', 'k'], ['queso', 'k'], ['kilómetro', 'k'], ['cena', 'th'], ['piscina', 'th'], ['zapato', 'th'], ['lápiz', 'th'], ['gato', 'g'], ['guerra', 'g'], ['guía', 'g'], ['gente', 'x'], ['página', 'x'], ['jamón', 'x'], ['México', 'x']] }));
    put(s, '.sb2', sortBoard({ id: 'consr', sec: 'consonantes', skill: 'con', cols: [{ k: 'r', label: '[r] 한 번 튕김' }, { k: 'rr', label: '[r̄] 굴리는 소리' }],
      chips: [['cara', 'r'], ['sur', 'r'], ['pared', 'r'], ['pero', 'r'], ['rosa', 'rr'], ['reina', 'rr'], ['alrededor', 'rr'], ['carro', 'rr'], ['arriba', 'rr'], ['perro', 'rr']] }));
    put(s, '.pm', pairMatch({ id: 'conpm', sec: 'consonantes', skill: 'con', pairs: [['h', '묵음 (소리 없음)'], ['ch', '[ĉ] 츠/ㅊ'], ['ñ', '[ɲ] 냐·녜·니·뇨·뉴'], ['v', '[b]'], ['w', '[u]'], ['ll', '[ʎ]']] }));
  };
  B.vocales = () => {
    const s = sec('vocales', `<div class="ribbon-head"><span class="ribbon red">2. 스페인어 발음</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>(2) 모음 — 다섯 개, 항상 같은 소리!</h3>
        <table class="gtab"><tr>${['a [a]', 'e [e]', 'i [i]', 'o [o]', 'u [u]'].map(x => `<th>${x}</th>`).join('')}</tr><tr>${['arte', 'español', 'ingreso', 'oreja', 'uno'].map(w => `<td><b class="k" style="color:#d6202f">${w[0]}</b>${w.slice(1)} ${say(w)}</td>`).join('')}</tr></table>
        <div class="vow">${[['a', '강모음', 1], ['e', '강모음', 1], ['i', '약모음', 0], ['o', '강모음', 1], ['u', '약모음', 0]].map(([v, k, st]) => `<div class="${st ? 'strong' : ''}"><b>${v}</b><small>${k}</small>${say(v)}</div>`).join('')}</div>
        ${tip('스페인어 모음은 영어처럼 소리가 변하지 않아요. 강모음(<b style="color:#d6202f">a, e, o</b>)과 약모음(<b style="color:#2a8bd0">i, u</b>)의 구분은 이중모음 · 음절분해에서 중요해요.')}
      </div>
      <h3 class="h3">① 강모음 / 약모음 분류</h3><div class="sb"></div>
      <h3 class="h3">② 빈칸에 알맞은 모음을 쓰세요 🔊</h3><div class="c"></div>`);
    put(s, '.sb', sortBoard({ id: 'vosb', sec: 'vocales', skill: 'voc', cols: [{ k: 'F', label: '강모음 (vocal fuerte)' }, { k: 'D', label: '약모음 (vocal débil)' }], chips: [['a', 'F'], ['e', 'F'], ['o', 'F'], ['i', 'D'], ['u', 'D']] }));
    put(s, '.c', cloze({ id: 'voc', sec: 'vocales', skill: 'voc', cls: 'lines', text: [['[a]rte', 'arte'], ['[e]spañol', 'español'], ['[i]ngreso', 'ingreso'], ['[o]reja', 'oreja'], ['[u]no', 'uno']].map(([t, w]) => `<p>${t} ${say(w)}</p>`).join('') }));
  };
  B.notas = () => {
    const box = arr => `<div class="ybox2">${arr.map(w => `<span data-say="${w}">${w}</span>`).join('')}</div>`;
    const s = sec('notas', `<div class="ribbon-head"><span class="ribbon red">2. 스페인어 발음</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>(3) 주의 사항</h3>
        <p>① <b>c</b>는 모음 a, o, u 앞에서 [k]로 발음하고 모음 e, i 앞에서 [θ]나 [s]로 발음한다. 지역적 차이로 인하여 스페인 남부 일부 지역과 중남미의 대부분 지역에서 [θ]를 [s]로 발음한다.</p>
        ${box(['café', 'cosa', 'cuatro', 'centro', 'ciudad'])}
        <table class="gtab"><tr><th></th><th>a</th><th>o</th><th>u</th><th>e</th><th>i</th></tr><tr><td><b>c</b></td><td>ca [ka]</td><td>co [ko]</td><td>cu [ku]</td><td class="hi">ce [θe/se]</td><td class="hi">ci [θi/si]</td></tr>
          <tr><td><b>g</b></td><td>ga [ga]</td><td>go [go]</td><td>gu [gu]</td><td class="hi">ge [xe]</td><td class="hi">gi [xi]</td></tr>
          <tr><td><b>gu</b></td><td></td><td></td><td></td><td>gue [ge]</td><td>gui [gi]</td></tr><tr><td><b>gü</b></td><td></td><td></td><td></td><td>güe [gwe]</td><td>güi [gwi]</td></tr>
          <tr><td><b>qu</b></td><td></td><td></td><td></td><td>que [ke]</td><td>qui [ki]</td></tr></table>
        <p>② <b>g</b>는 모음 a, o, u 앞에서 [g]로 발음하고 모음 e, i 앞에서 [x]로 발음한다. gue와 gui의 경우 각각 [ge]와 [gi], güe와 güi의 경우 각각 [gwe]와 [gwi]로 발음한다.</p>
        ${box(['gato', 'gordo', 'guapo', 'gente', 'gigante', 'guerra', 'guitarra', 'vergüenza', 'lingüística'])}
        <p>③ <b>q</b>는 항상 que[ke] 혹은 qui[ki]의 형태로 나타난다.</p>
        ${box(['querer', 'queja', 'quince', 'quemar'])}
      </div>
      <h3 class="h3">① 빈칸에 c / qu / g / gu / gü / j 중 알맞은 철자를 쓰세요</h3><div class="c"></div>
      <h3 class="h3">② 발음 기호에 맞는 단어를 고르세요</h3><div class="items ch"></div>`);
    put(s, '.c', cloze({ id: 'notc', sec: 'notas', skill: 'con', cls: 'lines', text: [
      ['[c]afé', 'café', '[ka]'], ['[qu]ince', 'quince', '[ki]'], ['[gu]itarra', 'guitarra', '[gi]'], ['ver[gü]enza', 'vergüenza', '[gwe]'], ['[g]ato', 'gato', '[ga]'],
      ['[g]ente|[j]ente', 'gente', '[xe]'], ['[c]iudad', 'ciudad', '[θi/si]'], ['[qu]eso', 'queso', '[ke]'], ['lin[gü]ística', 'lingüística', '[gwi]'], ['[j]amón', 'jamón', '[xa]']]
      .map(([t, w, ipa]) => `<p>${t.split('|')[0]} <span class="small">${ipa}</span> ${say(w)}</p>`).join('') }));
    [['[ke]', ['queso', 'ceso', 'keso'], 'queso'], ['[θi] / [si]', ['cine', 'kine', 'quine'], 'cine'], ['[ge]', ['guerra', 'gerra', 'güerra'], 'guerra'], ['[gwe]', ['bilingüe', 'bilingue', 'bilinge'], 'bilingüe']]
      .forEach(([p, o, a], i) => put(s, '.ch', choiceItem({ id: 'notch' + i, sec: 'notas', skill: 'con', prompt: `${i + 1}) <span class="ipa">${p}</span>`, options: o, answer: a })));
  };
  B.diptongos = () => {
    const row2 = arr => `<table class="gtab">${arr.map(r => `<tr>${r.map(([d, w]) => `<td><b>${d}</b></td><td class="l">${w.replace(new RegExp(d.replace('á', '[aá]')), m => `<b class="hi">${m}</b>`)} ${say(w)}</td>`).join('')}</tr>`).join('')}</table>`;
    const s = sec('diptongos', `<div class="ribbon-head"><span class="ribbon red">2. 스페인어 발음</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>(4) 이중모음과 삼중모음</h3>
        <p>① 강모음 a, e, o와 약모음 i, u가 각각 하나씩 결합하거나 약모음끼리 서로 결합한 두 개의 모음을 <b>이중모음</b>이라 한다. 이중모음은 <b>하나의 음절</b>이다.</p>
        <p><b>• 강모음 + 약모음</b></p>${row2([[['ai', 'aire'], ['au', 'autor']], [['ei', 'peine'], ['eu', 'deuda']], [['oi', 'oigo'], ['ou', 'bou']]])}
        <p><b>• 약모음 + 강모음</b></p>${row2([[['ia', 'piano'], ['ua', 'agua']], [['ie', 'miel'], ['ue', 'puerto']], [['io', 'idioma'], ['uo', 'cuota']]])}
        <p><b>• 약모음 + 약모음</b></p>${row2([[['iu', 'ciudad'], ['ui', 'cuidado']]])}
        <p>② 약모음+강모음+약모음의 구조를 <b>삼중모음</b>이라고 한다. 삼중모음도 하나의 음절이다.</p>
        ${row2([[['iái', 'estudiáis'], ['iei', 'vieira']], [['uai', 'Uruguay'], ['uei', 'buey']]])}
        ${tip('강모음 + 강모음(예: pa-<b>se-o</b>, a-<b>e</b>-ro-puer-to)은 이중모음이 아니라 <b>두 음절</b>로 나뉘어요.')}
      </div>
      <h3 class="h3">① 이중모음의 종류 분류</h3><div class="sb1"></div>
      <h3 class="h3">② 이중모음 · 삼중모음일까, 두 음절일까?</h3><div class="sb2"></div>
      <h3 class="h3">③ 단어 속 이중모음 · 삼중모음을 그대로 쓰세요</h3><div class="items two w"></div>`);
    put(s, '.sb1', sortBoard({ id: 'dipsb', sec: 'diptongos', skill: 'voc', cols: [{ k: 'FD', label: '강 + 약' }, { k: 'DF', label: '약 + 강' }, { k: 'DD', label: '약 + 약' }, { k: 'T', label: '삼중모음' }],
      chips: [['aire', 'FD'], ['autor', 'FD'], ['peine', 'FD'], ['deuda', 'FD'], ['piano', 'DF'], ['agua', 'DF'], ['miel', 'DF'], ['puerto', 'DF'], ['ciudad', 'DD'], ['cuidado', 'DD'], ['Uruguay', 'T'], ['buey', 'T'], ['estudiáis', 'T']] }));
    put(s, '.sb2', sortBoard({ id: 'dipsb2', sec: 'diptongos', skill: 'voc', cols: [{ k: 'U', label: '한 음절 (이중·삼중모음)' }, { k: 'H', label: '두 음절 (강 + 강)' }],
      chips: [['ai — aire', 'U'], ['ue — puerto', 'U'], ['ui — cuidado', 'U'], ['uai — Uruguay', 'U'], ['eo — paseo', 'H'], ['ae — aeropuerto', 'H'], ['oe — poeta', 'H'], ['ea — idea', 'H']] }));
    [['aire', 'ai'], ['agua', 'ua'], ['idioma', 'io'], ['ciudad', 'iu'], ['cuota', 'uo'], ['buey', 'uey']]
      .forEach(([w, a], i) => put(s, '.w', writeItem({ id: 'dipw' + i, sec: 'diptongos', skill: 'voc', prompt: `${w} ${say(w)}`, ph: '모음 덩어리', answers: [a] })));
  };

  /* ---------- 3. 음절분해 ---------- */
  B.silabeo = () => {
    const show = (w, parts) => `<span class="syl">${w} → ${parts.map(p => `<i>${p}</i>`).join('')}</span>`;
    const s = sec('silabeo', `<div class="ribbon-head"><span class="ribbon violet">3. 음절분해</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>(1) 단어의 음절은 모음을 기준으로 나눈다.</h3>
        <div class="ybox2">${show('casa', ['ca', 'sa'])}${show('paseo', ['pa', 'se', 'o'])}${show('azafata', ['a', 'za', 'fa', 'ta'])}</div>
        <h3>(2) 이중모음과 삼중모음은 하나의 음절을 이루는 모음으로 간주한다.</h3>
        <div class="ybox2">${show('lengua', ['len', 'gua'])}${show('antiguo', ['an', 'ti', 'guo'])}${show('vieira', ['viei', 'ra'])}</div>
        ${tip('음절 = 모음(덩어리) 하나. 자음 하나는 뒤 모음에 붙고(ca-sa), 자음 둘은 나눠요(len-gua, an-ti-guo). <b>ch, ll, rr</b>는 나누지 않아요(mu-cha-cho, ca-lle, pe-rro).')}
      </div>
      <h3 class="h3">① 음절 조각을 순서대로 배열하세요</h3><div class="items scr"></div>
      <h3 class="h3">② 하이픈(-)으로 음절을 나눠 쓰세요</h3><div class="items two w"></div>`);
    [['azafata', ['a', 'za', 'fa', 'ta']], ['antiguo', ['an', 'ti', 'guo']], ['familia', ['fa', 'mi', 'lia']], ['aeropuerto', ['a', 'e', 'ro', 'puer', 'to']]]
      .forEach(([w, t], i) => put(s, '.scr', scramble({ id: 'sils' + i, sec: 'silabeo', skill: 'sil', prompt: `${w} ${say(w)}`, tokens: t, joiner: '-' })));
    [['casa', 'ca-sa'], ['paseo', 'pa-se-o'], ['lengua', 'len-gua'], ['vieira', 'viei-ra'], ['mesa', 'me-sa'], ['muchacho', 'mu-cha-cho'], ['calle', 'ca-lle'], ['guitarra', 'gui-ta-rra'], ['ciudad', 'ciu-dad'], ['estudiante', 'es-tu-dian-te']]
      .forEach(([w, a], i) => put(s, '.w', writeItem({ id: 'silw' + i, sec: 'silabeo', skill: 'sil', prompt: `<b>${w}</b> ${say(w)}`, ph: 'ca-sa', answers: [a] })));
  };

  /* ---------- 4. 강세 ---------- */
  B.acento = () => {
    const stw = (w, parts, k) => `<span class="syl">${parts.map((p, i) => `<i class="${i === k ? 'st' : ''}">${p}</i>`).join('')} ${say(w)}</span>`;
    const s = sec('acento', `<div class="ribbon-head"><span class="ribbon violet">4. 단어의 강세</span><span class="act-bar"></span></div>
      <div class="gcard"><h3>(1) 모음이나 n, s로 끝나는 단어는 마지막에서 두 번째 음절에 강세를 준다.</h3>
        <div class="ybox2">${stw('mesa', ['me', 'sa'], 0)}${stw('familia', ['fa', 'mi', 'lia'], 1)}${stw('orden', ['or', 'den'], 0)}${stw('lunes', ['lu', 'nes'], 0)}${stw('estudiante', ['es', 'tu', 'dian', 'te'], 2)}${stw('aeropuerto', ['a', 'e', 'ro', 'puer', 'to'], 3)}${stw('viernes', ['vier', 'nes'], 0)}${stw('ruido', ['rui', 'do'], 0)}</div>
        <h3>(2) n, s를 제외한 자음으로 끝나는 단어는 마지막 음절에 강세를 준다.</h3>
        <div class="ybox2">${stw('pared', ['pa', 'red'], 1)}${stw('profesor', ['pro', 'fe', 'sor'], 2)}${stw('reloj', ['re', 'loj'], 1)}${stw('musical', ['mu', 'si', 'cal'], 2)}</div>
        <h3>(3) 철자에 강세 표시가 있는 단어는 표시된 곳에 강세를 준다.</h3>
        <div class="ybox2">${stw('árbol', ['ár', 'bol'], 0)}${stw('corazón', ['co', 'ra', 'zón'], 2)}${stw('café', ['ca', 'fé'], 1)}${stw('lámpara', ['lám', 'pa', 'ra'], 0)}</div>
        ${tip('노란 칸이 강세 음절이에요. ※ 교재 10쪽은 (1)과 (2)의 예시 단어가 서로 바뀌어 인쇄되어 있어, 규칙에 맞게 바로잡았어요. 규칙에서 벗어나는 단어에만 강세 표시(tilde)를 붙여요: <b>árbol</b>(자음 l로 끝나지만 앞 음절), <b>café</b>(모음으로 끝나지만 마지막 음절).')}
      </div>
      <h3 class="h3">① 강세가 오는 음절을 고르세요 🔊</h3><div class="items ch"></div>
      <h3 class="h3">② 규칙 분류 — 어느 규칙일까?</h3><div class="sb"></div>
      <h3 class="h3">③ 강세 표시(tilde)를 붙여 바르게 쓰세요</h3><div class="items two w"></div>`);
    [['mesa', ['me', 'sa'], 'me'], ['familia', ['fa', 'mi', 'lia'], 'mi'], ['orden', ['or', 'den'], 'or'], ['estudiante', ['es', 'tu', 'dian', 'te'], 'dian'], ['pared', ['pa', 'red'], 'red'],
      ['profesor', ['pro', 'fe', 'sor'], 'sor'], ['reloj', ['re', 'loj'], 'loj'], ['corazón', ['co', 'ra', 'zón'], 'zón'], ['lámpara', ['lám', 'pa', 'ra'], 'lám'], ['ciudad', ['ciu', 'dad'], 'dad']]
      .forEach(([w, o, a], i) => put(s, '.ch', choiceItem({ id: 'acch' + i, sec: 'acento', skill: 'ace', prompt: `${i + 1}) <b>${w}</b> ${say(w)}`, options: o, answer: a })));
    put(s, '.sb', sortBoard({ id: 'acsb', sec: 'acento', skill: 'ace', cols: [{ k: '1', label: '(1) 모음·n·s → 끝에서 두 번째' }, { k: '2', label: '(2) 그 외 자음 → 마지막' }, { k: '3', label: '(3) 강세 표시' }],
      chips: [['mesa', '1'], ['lunes', '1'], ['viernes', '1'], ['ruido', '1'], ['pared', '2'], ['reloj', '2'], ['musical', '2'], ['profesor', '2'], ['árbol', '3'], ['café', '3'], ['corazón', '3'], ['lámpara', '3']] }));
    [['arbol', 'árbol'], ['corazon', 'corazón'], ['cafe', 'café'], ['lampara', 'lámpara'], ['lapiz', 'lápiz'], ['jamon', 'jamón'], ['futbol', 'fútbol'], ['leccion', 'lección']]
      .forEach(([q, a], i) => put(s, '.w', writeItem({ id: 'acw' + i, sec: 'acento', skill: 'ace', prompt: `${q} → ? ${say(a)}`, answers: [a] })));
  };

  SC.lesson({
    num: '00',
    title: 'Alfabeto y pronunciación',
    ttsTest: 'a, be, ce, de, e, efe, ge',
    cover: {
      emoji: '🔤🗣️<small>Aa Bb Ññ</small>',
      bg: 'linear-gradient(135deg,#ffd27a,#f79a5b 55%,#e8590c)',
      tema: ['El alfabeto español (27 letras)', 'Las consonantes y las vocales'],
      com: ['알파벳 이름 말하기 · 철자 읽기: ¿Cómo se escribe?', '자음 · 모음 · 이중모음의 정확한 발음'],
      gram: ['c · g · q 의 발음 규칙 (ca/ce, ga/ge, gue/güe, que/qui)', '음절분해 (ca-sa, len-gua)', '단어의 강세 규칙 3가지 · tilde']
    },
    skills: D.skills,
    sections: D.sections,
    people: {},
    errLabels: {},
    errTips: { acento: 'tilde(´)도 철자예요: café, lápiz, árbol, corazón, jamón, fútbol …' },
    classify() { return null; },
    errRules: [],
    accWords: ['café', 'lápiz', 'fútbol', 'jamón', 'música', 'lección', 'kilómetro', 'móvil', 'sándwich', 'méxico', 'xilófono', 'bambú', 'corazón', 'árbol', 'lámpara', 'compañía', 'lingüística', 'bilingüe', 'vergüenza', 'español', 'niña', 'año'],
    exam: {
      bank: D.examBank,
      partB: {
        title: 'Me presento y deletreo → 글로 쓰기',
        icons: ['🙋', '🔤', '✍️'],
        questions: ['¿Cómo te llamas? ¿Cómo se escribe tu nombre? (글자 이름으로: eme - i - ene …)', 'ñ, ll, rr, ch, j 가 들어간 단어를 하나씩 쓰세요.', '강세 표시(tilde)가 있는 단어 3개를 쓰고, 두 단어는 음절로 나눠 쓰세요 (ca-fé).'],
        minWords: 25,
        hint: '글자 이름 · 특수 철자 · tilde · 하이픈 음절분해를 모두 보여 주세요!',
        ph: 'Me llamo … Se escribe …',
        connectors: ['y', 'también', 'pero', 'porque', 'por ejemplo'],
        rubric: [
          { k: 'nom', label: 'Me llamo …', max: 6, re: 'me llamo', ax: 'Contenido' },
          { k: 'del', label: '글자 이름 5개 이상 (be, ce, ele …)', max: 12, re: '(be|ce|de|efe|ge|hache|jota|ka|ele|eme|ene|eñe|pe|cu|erre|ese|te|uve|equis|ye|zeta)', min: 5, ax: 'Alfabeto' },
          { k: 'ene', label: 'ñ 단어', max: 6, re: '[a-záéíóú]*ñ[a-záéíóúñ]*', ax: 'Pronunciación' },
          { k: 'esp', label: 'll / rr / ch 단어 2개 이상', max: 8, re: '[a-záéíóúñ]*(ll|rr|ch)[a-záéíóúñ]*', min: 2, ax: 'Pronunciación' },
          { k: 'til', label: 'tilde 단어 3개 이상', max: 8, re: '[a-zñü]*[áéíóú][a-záéíóúñü]*', min: 3, ax: 'Acento' },
          { k: 'sil', label: '하이픈 음절분해 2개 이상 (ca-fé)', max: 8, re: '[a-záéíóúñü]+(-[a-záéíóúñü]+)+', min: 2, ax: 'Acento' }
        ],
        model: 'Me llamo Minsu. Se escribe eme - i - ene - ese - u. Palabras: niña, calle, perro, chica y jamón. Con tilde: café, lápiz y corazón. Sílabas: ca-fé, co-ra-zón.'
      }
    },
    build: B
  });
})();
