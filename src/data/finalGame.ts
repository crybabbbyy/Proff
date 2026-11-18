import { FinalGameLocation } from '../types/game';

// Сюжет и задания — по ТЗ (раздел «Завершающая игра»).
export const FINAL_GAME_LOCATIONS: FinalGameLocation[] = [
  {
    id: 'classroom',
    number: 1,
    title: 'Локация 1 · Класс',
    shortTitle: 'Класс',
    professionId: 'teacher',
    professionRoleLabel: 'Учитель',
    storyIntro:
      'Утро в школе. Учитель хочет начать урок, но мел куда-то пропал! Помоги найти мел среди предметов в классе.',
    storySuccess:
      'Мел нашёлся, урок прошёл отлично. После уроков весь класс отправился в театр на спектакль.',
    task: {
      id: 'final-1-chalk',
      type: 'find_hidden',
      title: 'Найди мел',
      instruction: 'Мел спрятался среди предметов в классе. Найди его и нажми на него.',
      scene: 'classroom',
      targetLabel: 'Мел',
      hint: 'Посмотри внимательно возле доски.',
      successMessage: 'Вот он, мел! Учитель начинает урок.',
    },
  },
  {
    id: 'theater',
    number: 2,
    title: 'Локация 2 · Театр',
    shortTitle: 'Театр',
    professionId: 'actor',
    professionRoleLabel: 'Актёр',
    storyIntro:
      'Класс пришёл на спектакль, но актёр не может начать игру: он забыл, какую эмоцию нужно показать. Помоги ему войти в образ.',
    storySuccess:
      'Актёр вошёл в образ, и спектакль начался. Зрители в восторге!',
    task: {
      id: 'final-2-surprise',
      type: 'pick_face',
      title: 'Помоги актёру войти в образ',
      instruction: 'Нажми на лицо, которое изображает эту эмоцию.',
      word: 'Удивление',
      target: 'surprise',
      options: ['anger', 'surprise', 'sadness'],
      successMessage: 'Точно! Актёр удивился так, что весь зал ахнул.',
    },
  },
  {
    id: 'tech_zone',
    number: 3,
    title: 'Локация 3 · Сбой оборудования',
    shortTitle: 'Оборудование',
    professionId: 'programmer',
    professionRoleLabel: 'Программист',
    storyIntro:
      'Перед следующим действием спектакля произошёл сбой в оборудовании: провода разъединились, и на сцене погас свет. Соедини провода одного цвета.',
    storySuccess:
      'Провода соединены, свет и звук снова работают. Но старый щиток не выдержал нагрузки…',
    task: {
      id: 'final-3-wires',
      type: 'wires',
      title: 'Почини оборудование',
      instruction:
        'Соедини провода одного цвета с двух сторон: протяни провод слева к такому же справа. Можно нажать на провод слева, а потом на провод справа.',
      wires: [
        { id: 'red', label: 'Красный', color: '#EF4444' },
        { id: 'blue', label: 'Синий', color: '#3B82F6' },
        { id: 'yellow', label: 'Жёлтый', color: '#FACC15' },
        { id: 'green', label: 'Зелёный', color: '#22C55E' },
      ],
      successMessage: 'Все провода на месте, оборудование снова работает!',
    },
  },
  {
    id: 'emergency',
    number: 4,
    title: 'Локация 4 · Возгорание',
    shortTitle: 'Возгорание',
    professionId: 'firefighter',
    professionRoleLabel: 'Экстренные службы',
    storyIntro:
      'В театре произошло возгорание! Требуется срочное вмешательство служб. Выбери, кто должен приехать на место происшествия.',
    storySuccess:
      'Пожарные потушили огонь, спасатели МЧС вывели зрителей, врачи скорой помогли пострадавшим, а полиция начала искать виновника.',
    task: {
      id: 'final-4-services',
      type: 'situation_choice',
      title: 'Кто должен приехать?',
      instruction:
        'Выбери всех сотрудников, которые должны приехать на пожар, и нажми «Проверить».',
      options: [
        { id: 'police', label: 'Полиция', avatar: 'police', isCorrect: true, feedback: 'Полиция следит за порядком и ищет виновника.' },
        { id: 'seamstress', label: 'Швея', avatar: 'seamstress', isCorrect: false, feedback: 'Швея шьёт одежду, на пожаре она не поможет.' },
        { id: 'ambulance', label: 'Скорая помощь', avatar: 'paramedic', isCorrect: true, feedback: 'Скорая помогает пострадавшим.' },
        { id: 'seller', label: 'Продавец', avatar: 'seller', isCorrect: false, feedback: 'Продавец работает в магазине, на пожар его не вызывают.' },
        { id: 'mchs', label: 'МЧС', avatar: 'rescuer', isCorrect: true, feedback: 'Спасатели МЧС выводят людей из опасного места.' },
        { id: 'driver', label: 'Водитель', avatar: 'driver', isCorrect: false, feedback: 'Водитель автобуса не тушит пожары и не спасает людей.' },
        { id: 'firefighters', label: 'Пожарные', avatar: 'firefighter', isCorrect: true, feedback: 'Пожарные тушат огонь.' },
        { id: 'cook', label: 'Повар', avatar: 'cook', isCorrect: false, feedback: 'Повар готовит еду, на пожаре он не нужен.' },
      ],
      successMessage: 'Все нужные службы уже едут!',
    },
  },
  {
    id: 'investigation',
    number: 5,
    title: 'Локация 5 · Фоторобот',
    shortTitle: 'Фоторобот',
    professionId: 'police',
    professionRoleLabel: 'Полицейский',
    storyIntro:
      'Один из зрителей запомнил человека, из-за которого случилось возгорание. Помоги полицейскому составить фоторобот подозреваемого.',
    storySuccess:
      'Фоторобот готов, и полиция быстро нашла виновника происшествия.',
    task: {
      id: 'final-5-photofit',
      type: 'photofit',
      title: 'Составь фоторобот',
      instruction:
        'Посмотри на фото «Воспоминания». Выбери причёску и глаза, как на фото, и нажми «Проверить».',
      target: { hair: 'curly', eyes: 'narrow' },
      successMessage: 'Фоторобот точь-в-точь как на фото!',
    },
  },
  {
    id: 'legal_resolution',
    number: 6,
    title: 'Локация 6 · Суд',
    shortTitle: 'Суд',
    professionId: 'lawyer',
    professionRoleLabel: 'Юрист',
    storyIntro:
      'Через некоторое время в суде идёт заседание: пострадавший во время ЧС против виновника происшествия. Помоги юристу найти важное доказательство — документ, спрятанный в зале суда.',
    storySuccess:
      'Юрист показал документ суду, и судья принял справедливое решение. Пострадавшему возместят ущерб.',
    task: {
      id: 'final-6-document',
      type: 'find_hidden',
      title: 'Найди доказательство',
      instruction: 'Документ спрятан где-то в зале суда. Найди его и нажми на него.',
      scene: 'courtroom',
      targetLabel: 'Документ',
      hint: 'Загляни под скамейки.',
      successMessage: 'Документ найден! Это то самое доказательство.',
    },
  },
];
