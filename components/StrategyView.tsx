
import React from 'react';

const StrategyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16 border-b border-zinc-800 pb-8">
        <div className="inline-block bg-[#00ffaa]/10 text-[#00ffaa] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#00ffaa]/20">
          UX/UI & Copywriting Strategy 2026
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none italic">ВСЯ <span className="text-[#00ffaa]">СОЛЬ</span></h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
          Разработка цифрового присутствия для самой драйвовой музыкальной группы. 
          Фокус на искренности, энергии и молодежной эстетике.
        </p>
      </header>

      {/* 1. Концепция */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 italic">
          <span className="text-[#00ffaa]">01.</span> Концепция
        </h2>
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm">
          <p className="text-lg leading-relaxed mb-6">
            Тип сайта: <span className="text-white font-semibold underline decoration-[#ff00ff]">«Интерактивный цифровой пресс-кит (DPK)»</span>. 
          </p>
          <p className="text-zinc-400">
            Для аудитории до 30 лет важна визуальная подача и скорость. Концепция «Raw & Real» — 
            минимум пафоса, максимум живой энергии концертов и честного звука. Сайт — это динамичная платформа, транслирующая «вайб» группы.
          </p>
        </div>
      </section>

      {/* 2. Структура */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 italic">
          <span className="text-[#00ffaa]">02.</span> Структура сайта
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            { title: "ГЛАВНАЯ (Hero)", desc: "Лицо группы. Крупный заголовок, свежий релиз, мощный визуальный акцент на драйве." },
            { title: "МУЗЫКА (Music Hub)", desc: "Интерактивный блок с переходом на Яндекс.Музыку и VK Музыку." },
            { title: "ГРУППА (Manifesto)", desc: "История Redwood -> Вся Соль. Детальный блок о составе и пути коллектива." }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-6 p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
              <div className="text-[#ff00ff] font-bold shrink-0">{idx + 1}.</div>
              <div>
                <h3 className="font-bold text-white mb-1 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-zinc-400 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Концерты */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 italic">
          <span className="text-[#00ffaa]">03.</span> СОСТОЯВШИЕСЯ КОНЦЕРТЫ
        </h2>
        <div className="space-y-4">
          <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl">
            <p className="text-[#00ffaa] font-black mb-1">14 сентября 2025</p>
            <p className="text-white font-bold">Смарт Парк Дельфин, Воронеж</p>
          </div>
          <div className="p-6 bg-zinc-900/20 border border-zinc-800 rounded-2xl">
            <p className="text-[#00ffaa] font-black mb-1">5 декабря 2025</p>
            <p className="text-white font-bold">Артель, Воронеж</p>
          </div>
        </div>
      </section>

      {/* 4. Состав группы */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 italic">
          <span className="text-[#00ffaa]">04.</span> СОСТАВ ГРУППЫ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Губарев Елисей", role: "басист" },
            { name: "Соловьев Даниил", role: "гитарист, вокалист" },
            { name: "Елисеев Андрей", role: "барабанщик" },
            { name: "Шевченко Даниил", role: "гитарист" }
          ].map((member, i) => (
            <div key={i} className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-xl flex justify-between items-center">
              <span className="text-white font-bold">{member.name}</span>
              <span className="text-[#ff00ff] text-xs uppercase font-black tracking-widest">{member.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Манифест и История */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 italic">
          <span className="text-[#00ffaa]">05.</span> МАНИФЕСТ
        </h2>
        <div className="prose prose-invert max-w-none bg-zinc-900/80 p-10 rounded-[2.5rem] border border-zinc-800">
          <p className="text-zinc-300 italic leading-relaxed text-lg">
            "Группа «Вся соль» зародилась летом 2024 года. С того момента коллектив прошёл через серьёзные изменения: менялись люди, формат, звучание и подход к музыке. За это время было два состава, а нынешний — третий — стал самым удачным и устойчивым.<br/><br/>
            Именно в текущем составе группа обрела своё настоящее лицо. Музыканты нашли общий язык, единое видение и то самое звучание, которое сегодня определяет «Всю соль».<br/><br/>
            До появления названия «Вся соль» группа существовала под именем Redwood. Это был более ранний этап, с совершенно другим составом и настроением. В период Redwood коллектив дал три концерта: в смарт-парке «Дельфин», в «Чайке», и в Липецке.<br/><br/>
            Сегодня «Вся соль» — это самостоятельный проект, который развивается, экспериментирует со звуком и честно рассказывает свои истории через музыку. Всё главное — ещё впереди."
          </p>
        </div>
      </section>

      {/* 6. Ссылки и площадки */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 italic">
          <span className="text-[#00ffaa]">06.</span> LINKS & PLATFORMS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
            <h4 className="font-black text-[#ffcc00] mb-2">Яндекс.Музыка</h4>
            <p className="text-[10px] text-zinc-500 break-all">music.yandex.ru/artist/23517455</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
            <h4 className="font-black text-[#00d4ff] mb-2">VK Музыка</h4>
            <p className="text-[10px] text-zinc-500 break-all">vk.com/artist/vsyasol</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 text-center">
            <h4 className="font-black text-[#00ffaa] mb-2">VK Сообщество</h4>
            <p className="text-[10px] text-zinc-500 break-all">vk.com/samayakrutayarockgruppa</p>
          </div>
        </div>
      </section>

      <footer className="text-center text-zinc-500 text-sm mt-32 border-t border-zinc-900 pt-10">
        <p>© 2026 Разработано для группы «Вся Соль»</p>
        <p className="text-[10px] mt-2 uppercase tracking-[0.5em]">VK • TELEGRAM ONLY</p>
      </footer>
    </div>
  );
};

export default StrategyView;
