import { Profession } from '../types/game';

// Определения и задания — по ТЗ (тз.docx).
export const PROFESSIONS: Profession[] = [
  {
    id: 'teacher',
    title: 'Учитель',
    shortTitle: 'Учитель',
    cardBg: 'bg-[#EDE9FE]',
    cardAccent: 'border-[#8B5CF6]',
    definition:
      'Учитель — это человек, который помогает детям учиться, объясняет новые знания и проверяет, как они их усвоили.',
    task: {
      id: 'teacher-drag',
      type: 'drag_to_character',
      title: 'Что нужно учителю?',
      instruction:
        'Перетащи к учителю только те предметы, которые нужны ему на уроке. Можно и просто нажать на предмет.',
      scene: 'teacher',
      dropLabel: 'Предметы учителя',
      requiredCorrect: 4,
      items: [
        { id: 'pointer', label: 'Указка', isCorrect: true },
        { id: 'ball', label: 'Мяч', isCorrect: false, reason: 'Мяч нужен на физкультуре, а не учителю у доски.' },
        { id: 'globe', label: 'Глобус', isCorrect: true },
        { id: 'comb', label: 'Расчёска', isCorrect: false, reason: 'Расчёска не помогает объяснять уроки.' },
        { id: 'chalk', label: 'Мел', isCorrect: true },
        { id: 'flashlight', label: 'Фонарик', isCorrect: false, reason: 'В классе светло, фонарик учителю не нужен.' },
        { id: 'textbooks', label: 'Учебники', isCorrect: true },
        { id: 'banana', label: 'Банан', isCorrect: false, reason: 'Банан — это перекус, а не предмет для урока.' },
      ],
      successMessage: 'Всё готово — учитель может начинать урок!',
    },
  },

  {
    id: 'rescuer',
    title: 'Спасатель МЧС (112)',
    shortTitle: 'Спасатель МЧС',
    cardBg: 'bg-[#FFEDD5]',
    cardAccent: 'border-[#F97316]',
    definition:
      'Спасатель МЧС — это специалист, который спасает людей и помогает при авариях, катастрофах или стихийных бедствиях.',
    task: {
      id: 'rescuer-drag',
      type: 'drag_to_character',
      title: 'Спасение на льду',
      instruction:
        'Человек провалился под лёд! Перетащи спасателю предмет, которым можно вытащить человека из воды.',
      scene: 'rescuer',
      dropLabel: 'Спасатель',
      requiredCorrect: 1,
      items: [
        { id: 'rope', label: 'Верёвка', isCorrect: true },
        { id: 'umbrella', label: 'Зонт', isCorrect: false, reason: 'Зонт слишком короткий и хрупкий, им не вытащить человека.' },
        { id: 'board', label: 'Доска', isCorrect: true },
        { id: 'ball', label: 'Мяч', isCorrect: false, reason: 'За мяч нельзя крепко ухватиться, человек не выберется.' },
      ],
      successMessage: 'Спасатель вытащил человека на лёд. Все спасены!',
    },
  },

  {
    id: 'firefighter',
    title: 'Пожарный',
    shortTitle: 'Пожарный',
    cardBg: 'bg-[#FEE2E2]',
    cardAccent: 'border-[#EF4444]',
    definition:
      'Пожарный — это человек, который тушит пожары и спасает людей и животных из огня.',
    task: {
      id: 'firefighter-drag',
      type: 'drag_to_character',
      title: 'Потуши пожар',
      instruction:
        'Горит дом! Перетащи пожарному предмет, которым тушат пожар.',
      scene: 'firefighter',
      dropLabel: 'Пожарный',
      requiredCorrect: 1,
      items: [
        { id: 'axe', label: 'Топор', isCorrect: false, reason: 'Топором не потушить огонь.' },
        { id: 'fire_hose', label: 'Пожарный рукав', isCorrect: true },
        { id: 'shovel', label: 'Лопата', isCorrect: false, reason: 'Лопатой большой пожар не потушить.' },
        { id: 'bucket', label: 'Ведро', isCorrect: false, reason: 'Из ведра слишком мало воды для горящего дома.' },
      ],
      successMessage: 'Пожарный потушил огонь из пожарного рукава!',
    },
  },

  {
    id: 'paramedic',
    title: 'Сотрудник скорой помощи',
    shortTitle: 'Скорая помощь',
    cardBg: 'bg-[#FFE4E6]',
    cardAccent: 'border-[#F43F5E]',
    definition:
      'Сотрудник скорой помощи (врач или фельдшер) — это медик, который приезжает к человеку, если ему внезапно стало плохо или он получил травму.',
    task: {
      id: 'paramedic-drag',
      type: 'drag_to_character',
      title: 'Собери медицинский чемодан',
      instruction:
        'Перетащи в медицинский чемодан только то, что нужно врачу на вызове.',
      scene: 'paramedic',
      dropLabel: 'Медицинский чемодан',
      requiredCorrect: 4,
      items: [
        { id: 'stethoscope', label: 'Фонендоскоп', isCorrect: true },
        { id: 'chocolate', label: 'Шоколадка', isCorrect: false, reason: 'Шоколадка не лечит, ей не место в чемодане врача.' },
        { id: 'syringe', label: 'Шприц', isCorrect: true },
        { id: 'umbrella', label: 'Зонт', isCorrect: false, reason: 'Зонт не нужен для помощи больному.' },
        { id: 'bandage', label: 'Бинт', isCorrect: true },
        { id: 'phone', label: 'Телефон', isCorrect: false, reason: 'Телефон не медицинский инструмент.' },
        { id: 'gloves', label: 'Перчатки', isCorrect: true },
        { id: 'keys', label: 'Ключи', isCorrect: false, reason: 'Ключи не помогут вылечить человека.' },
      ],
      successMessage: 'Чемодан собран — бригада скорой помощи готова к выезду!',
    },
  },

  {
    id: 'police',
    title: 'Полицейский',
    shortTitle: 'Полицейский',
    cardBg: 'bg-[#E0E7FF]',
    cardAccent: 'border-[#6366F1]',
    definition:
      'Полицейский — это человек, который следит за порядком и безопасностью людей на улицах и в общественных местах.',
    task: {
      id: 'police-bag',
      type: 'return_bag',
      title: 'Помоги девочке',
      instruction:
        'Девочка потеряла сумку и плачет. Нажми на сумку, чтобы полицейский вернул её девочке.',
      successMessage: 'Сумка снова у девочки, и она больше не плачет!',
    },
  },

  {
    id: 'programmer',
    title: 'Программист',
    shortTitle: 'Программист',
    cardBg: 'bg-[#DBEAFE]',
    cardAccent: 'border-[#3B82F6]',
    definition:
      'Программист — это человек, который переводит с человеческого языка на язык компьютеров, чтобы они выполняли нужные задачи.',
    task: {
      id: 'programmer-lightbot',
      type: 'lightbot',
      title: 'Проведи робота к цели',
      instruction:
        'Составь программу из команд, чтобы робот дошёл до клетки с мишенью 🎯.',
      gridSize: 4,
      start: { x: 0, y: 0 },
      target: { x: 2, y: 2 },
      commands: [
        { id: 'forward', label: 'Вперёд', emoji: '➡️' },
        { id: 'turn-right', label: 'Повернуть направо', emoji: '↪️' },
        { id: 'turn-left', label: 'Повернуть налево', emoji: '↩️' },
      ],
      successMessage: 'Робот выполнил алгоритм и дошёл до цели!',
    },
  },

  {
    id: 'actor',
    title: 'Актёр',
    shortTitle: 'Актёр',
    cardBg: 'bg-[#FEF3C7]',
    cardAccent: 'border-[#F59E0B]',
    definition:
      'Актёр — это человек, который играет роли в театре, кино или озвучивает мультфильмы, чтобы рассказать зрителям историю.',
    task: {
      id: 'actor-emotions',
      type: 'emotion_match',
      title: 'Угадай эмоцию',
      instruction:
        'Перетащи название эмоции к подходящему лицу. Или нажми на название, а потом на лицо.',
      faces: [
        { id: 'face-anger', emotion: 'anger', label: 'Злость' },
        { id: 'face-joy', emotion: 'joy', label: 'Радость' },
        { id: 'face-sadness', emotion: 'sadness', label: 'Грусть' },
      ],
      successMessage: 'Отлично! Ты узнал все эмоции, как настоящий актёр!',
    },
  },

  {
    id: 'lawyer',
    title: 'Юрист',
    shortTitle: 'Юрист',
    cardBg: 'bg-[#F3E8FF]',
    cardAccent: 'border-[#A855F7]',
    definition:
      'Юрист — это специалист, который хорошо знает законы страны и помогает людям их соблюдать и защищать свои права.',
    task: {
      id: 'lawyer-drag',
      type: 'drag_to_character',
      title: 'Что нужно юристу?',
      instruction:
        'Перетащи к юристу только те предметы, которые связаны с его работой. Можно и просто нажать на предмет.',
      scene: 'lawyer',
      dropLabel: 'Предметы юриста',
      requiredCorrect: 4,
      items: [
        { id: 'folder', label: 'Папка с документами', isCorrect: true },
        { id: 'ice_cream', label: 'Мороженое', isCorrect: false, reason: 'Мороженое не связано с работой юриста.' },
        { id: 'scales', label: 'Весы правосудия', isCorrect: true },
        { id: 'needle_thread', label: 'Нитка с иголкой', isCorrect: false, reason: 'Нитка с иголкой нужна швее, а не юристу.' },
        { id: 'pen', label: 'Ручка', isCorrect: true },
        { id: 'watering_can', label: 'Лейка', isCorrect: false, reason: 'Лейка нужна садовнику, а не юристу.' },
        { id: 'constitution', label: 'Конституция', isCorrect: true },
        { id: 'toothbrush', label: 'Зубная щётка', isCorrect: false, reason: 'Зубная щётка не связана с законами.' },
      ],
      successMessage: 'Юрист готов защищать права людей!',
    },
  },
];
