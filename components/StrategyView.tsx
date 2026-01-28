import React from 'react';

const StrategyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16 border-b border-zinc-800 pb-8">
        <div className="inline-block bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          UX/UI & Copywriting Strategy
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none">ВСЯ СОЛЬ</h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
          Разработка цифрового присутствия для самой драйвовой музыкальной группы. 
          Фокус на искренности, энергии и молодежной эстетике.
        </p>
      </header>

      {/* 1. Концепция */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
          <span className="text-indigo-500">01.</span> Концепция
        </h2>
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm">
          <p className="text-lg leading-relaxed mb-6">
            Оптимальный тип сайта: <span className="text-white font-semibold">«Интерактивный цифровой пресс-кит (DPK)»</span>. 
            Это не просто многостраничный сайт, а динамичная платформа, которая транслирует «вайб» группы. 
          </p>
          <p className="text-zinc-400">
            Для аудитории до 25-30 лет важна визуальная подача и скорость получения информации. Концепция «Raw & Real» — 
            минимум пафоса, максимум живой энергии концертов и честного звука. Сайт должен ощущаться как современное медиа или лонгрид в крутом журнале.
          </p>
        </div>
      </section>

      {/* 2. Структура */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
          <span className="text-indigo-500">02.</span> Структура сайта
        </h2>
        <div className="space-y-4">
          {[
            { title: "Главная (Hero)", desc: "Лицо группы. Крупный заголовок, свежий релиз, мощное фото с концерта." },
            { title: "Музыка (Music Hub)", desc: "Интерактивный плеер с треками и кнопками перехода на стриминги (VK, Spotify, Yandex)." },
            { title: "О Группе (Manifesto)", desc: "Кто такие «Вся Соль». История создания через призму драйва и смыслов. Блок про Елисея и команду." },
            { title: "Блог (Live Feed)", desc: "Короткие заметки: бекстейджи, мысли о музыке, анонсы новых синглов." },
            { title: "Концерты (Gigs)", desc: "Афиша предстоящих выступлений с кнопками покупки билетов." },
            { title: "Контакты (Booking)", desc: "Форма для связи и прямые контакты для организаторов." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="text-indigo-500 font-bold shrink-0">{idx + 1}.</div>
              <div>
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Тексты и Слоганы */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
          <span className="text-indigo-500">03.</span> Тексты и Слоганы
        </h2>
        
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-4 text-zinc-300 uppercase tracking-wider text-sm">Варианты слоганов:</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Вся Соль — в твоих наушниках.",
              "Музыка без примесей.",
              "Тот самый драйв.",
              "Когда звук важнее слов.",
              "Честная музыка для своих."
            ].map((slogan, i) => (
              <li key={i} className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl text-indigo-100 font-medium italic italic">
                «{slogan}»
              </li>
            ))}
          </ul>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <div className="bg-zinc-900/80 p-8 rounded-3xl border border-zinc-800">
            <h4 className="text-white font-bold mb-4 uppercase">Блок «О группе»:</h4>
            <p className="text-zinc-300 italic">
              «Мы не просто пишем треки. Мы выжимаем максимум из каждой ноты, чтобы ты почувствовал то же, что и мы на сцене. 
              "Вся Соль" — это проект о настоящем: о честном басе Елисея, о ломаных ритмах и текстах, которые не пытаются казаться сложнее, чем они есть. 
              Это музыка, под которую хочется либо орать во весь голос, либо молча закрыть глаза и лететь.»
            </p>
          </div>
        </div>
      </section>

      {/* 4. Визуальный стиль */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
          <span className="text-indigo-500">04.</span> Визуальный стиль
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="w-12 h-12 bg-white rounded-lg mb-4 flex items-center justify-center text-black font-bold">Aa</div>
            <h4 className="font-bold mb-2">Типографика</h4>
            <p className="text-zinc-400 text-sm">Гротески с характером. Акцент на жирных начертаниях (Heavy/Black) для заголовков. Эффект "наползания" текста друг на друга.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="w-12 h-12 bg-indigo-500 rounded-lg mb-4"></div>
            <h4 className="font-bold mb-2">Цветовые акценты</h4>
            <p className="text-zinc-400 text-sm">Глубокий темный фон (почти черный) + один "кислотный" или яркий акцентный цвет (электрик, оранж или неон-грин).</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <div className="w-12 h-12 bg-zinc-700 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <h4 className="font-bold mb-2">Фото-контент</h4>
            <p className="text-zinc-400 text-sm">Зернистость, блюр, динамика. Никаких постановочных фото в студии "у камина". Только драйв с репетиций и концертов.</p>
          </div>
        </div>
      </section>

      <footer className="text-center text-zinc-500 text-sm mt-32">
        <p>© 2026 Разработано для группы «Вся Соль»</p>
      </footer>
    </div>
  );
};

export default StrategyView;