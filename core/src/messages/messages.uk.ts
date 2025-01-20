export default {
  chart: {
    copying_success: "Діаграму було скопійовано в буфер обміну",
    copying_fail: "Сталася неочікувана помилка, діаграма не була скопійована",
    empty_fallback: "Будь ласка, оберіть хоча би одну країну",
    short_range_fallback: "Будь ласка, оберіть ширший проміжок років",
    max_items_error: "Ви можете додати не більше 15 регіонів до діаграми",
  },
  common: {
    bookmarks: "Закладки",
    search: "Пошук",
    search_ellipsed: "Пошук...",
    home: "Головна",
    signin: "Увійти",
    email: "Електронна пошта",
    password: "Пароль",
    create: "Створити",
    id: "ID",
    label: "Назва",
    description: "Опис",
    datapoints: "Записи",
    last_update: "Останнє оновлення",
    hidden: "Приховано",
    sort_by: "Сортувати за {value}",
    region: "Регіон",
    value: "Значення",
    trend: "Тренд",
    year: "Рік",
    name: "Назва",
    type: "Тип",
    iso2code: "Iso2Code",
    geocode: "GeoCode",
    status: "Статус",
    source: "Джерело",
    dataset: "Набір даних",
    unit_symbol: "Символ",
    precision: "Точність",
    rank: "Ранг",
    absolute: "Абсолютний",
    unit: "Одиниця вимірювання",
    search_tags: "Теги для пошуку",
    save: "Зберегти",
    edit: "Редагувати",
    cancel: "Відмінити",
    confirm: "Підтвердити",
    date_of_update: "Дата оновлення",
    date_of_creation: "Дата створення",
    to_home: "На головну",
    unrevertable_action: "Цю дію не можна буде відмінити.",
  },
  pages: {
    not_found: {
      metadata: {
        title: "Не знайдено",
        description: "Ця сторінка не існує",
      },
    },
    landing: {
      title: "Досліджуй світ через Дані",
      subtitle:
        "Вивчайте нашу базу даних із понад 100 показників для сотень регіонів по всьому світу. Створюйте настроювані графіки, переглядайте тренди та отримуйте доступ до сотень тисяч точок даних.",
      search_placeholder: "Наприклад: Рівень народжуваності",
      metadata: {
        description:
          "Досліджуйте нашу базу даних із понад 100 показників для сотень регіонів по всьому світу.",
        description_long:
          "Досліджуйте нашу базу даних із понад 100 показників для сотень регіонів по всьому світу. Створюйте настроювані графіки, переглядайте тренди та отримуйте доступ до сотень тисяч точок даних.",
      },
    },
    search: {
      heading: 'Результати пошуку для "{value}"',
      heading_empty: "Результати пошуку для",
      no_query: "Введіть текст для пошуку",
      no_results: "Наборів даних за вашим запитом не знайдено",
      metadata: {
        title: "Результати для {value}",
        description: "Результати показників для {value}",
      },
    },
    bookmarks: {
      heading: "Ваші закладки",
      empty_fallback: "У вас немає закладок",
      metadata: {
        title: "Закладки",
        description:
          "Досліджуйте нашу базу даних із понад 100 показників для сотень регіонів по всьому світу.",
      },
    },
    indicator: {
      unit: "Одиниця вимірювання: {value}",
      source: "Джерело: {value}",
      bookmark: "Додати в закладки",
      unbookmark: "Видалити із закладок",
      download_xlsx: "Завантажити як XLSX",
      download_csv: "Завантажити як CSV",
      copy_chart: "Скопіювати графік як зображення",
      edit_chart: "Редагувати графік",
      back_to_all: "Повернутися до всіх країн",
      related_indicators_label: "Пов'язані індикатори",
      sort_by_value: "Сортувати за значенням",
      sort_by_year: "Сортувати за роком",
      sort_by_region: "Сортувати за назвою регіону",
      metadata: {
        description: "Статистичні дані {indicator} по країнах.",
        description_long:
          "Статистичні дані {indicator} по країнах. {description}",
      },
    },
    indicator_country: {
      metadata: {
        description_long:
          "Статистичні дані {indicator} в {country}. {description}",
        title: "{label} в {name}",
        description: "Статистичні дані {label} в {name}.",
      },
    },
    signin: {
      heading: "Увійти",
      need_help: "Потрібна допомога? Зверніться до адміністратора.",
      metadata: {
        title: "Увійти",
        description:
          "Увійдіть як адміністратор, щоб мати можливість редагувати дані.",
      },
    },
    indicators_dashboard: {
      title: "Індикатори",
      subtitle:
        "Управляйте індикаторами: задавайте описи, одиниці вимірювання та інші важливі деталі.",
      indicator_information: "Повна інформація",
      delete_indicator: "Видалити індикатор",
      edit_indicator: "Редагувати індикатор",
      new_indicator: "Створити індикатор",
      search_placeholder: "Шукати за ID, назвою або описом...",
      deleted_successfully: "Індикатори видалено успішно",
      confirm_deletion: "Ви впевнені що хочете видалити індикатор ({id})?",
      deletion_unrevertable:
        "Цю дію не можна відмінити. Пов'язані з індикатором значення також будуть видалені.",
      confirm_multiple_deletion:
        "Ви впевнені що хочете видалити обрані індикатори ({count})?",
      deletion_multiple_unrevertable:
        "Цю дію не можна відмінити. Пов'язані з індикаторами значення також будуть видалені.",
      created_successfully: "Індикатор було успішно створено",
      updated_successfully: "Індикатор було успішно оновлено",
      show_chart: "Показувати графік",
      metadata: {
        title: "Панель індикаторів",
        description:
          "Редагуйте індикатори тут: додайте, оновлюйте або видаляйте.",
      },
      selects: {
        sort: {
          by_id: "ID",
          by_label: "Назвою",
          by_datapoints: "Записами",
          by_date_of_update: "Датою оновлення",
        },
        status: {
          all: "Всі статуси",
          visible: "Видимі",
          hidden: "Приховані",
        },
        type: {
          all: "Всі типи",
          absolute: "Абсолютні",
          relative: "Відносні",
        },
      },
    },
    countries_dashboard: {
      title: "Країни",
      subtitle:
        "Управляйте записами країн: переглядайте, редагуйте та додавайте деталі для окремих країн.",
      country_information: "Повна інформація",
      delete_country: "Видалити країну",
      edit_country: "Редагувати країну",
      new_country: "Створити країну",
      search_placeholder: "Шукати за ID, назвою, геокодом або iso2code...",
      deleted_successfully: "Країни успішно видалені",
      confirm_deletion: "Ви впевнені що хочете видалити країну ({id})?",
      deletion_unrevertable:
        "Цю дію не можна відмінити. Пов'язані з країною значення також будуть видалені.",
      confirm_multiple_deletion:
        "Ви впевнені що хочете видалити обрані країни ({count})?",
      deletion_multiple_unrevertable:
        "Цю дію не можна відмінити. Пов'язані з країнами значення також будуть видалені.",
      created_successfully: "Країну було успішно створено",
      updated_successfully: "Країну було успішно оновлено",
      metadata: {
        title: "Панель країн",
        description: "Редагуйте країни тут: додайте, оновлюйте або видаляйте.",
      },
      selects: {
        sort: {
          by_id: "ID",
          by_name: "Назвою",
          by_geocode: "GeoCode",
          by_iso2code: "Iso2Code",
          by_datapoints: "Записами",
          by_date_of_update: "Датою оновлення",
        },
        status: {
          all: "Всі статуси",
          visible: "Видимі",
          hidden: "Приховані",
        },
        type: {
          all: "Всі типи",
          country: "Країна",
          union: "Союз",
          region: "Регіон",
          other: "Інше",
        },
      },
    },
    values_dashboard: {
      title: "Значення",
      subtitle:
        "Управляйте записами: переглядайте, оновлюйте та додавайте значення для індикаторів по країнах і роках.",
      value_information: "Повна інформація",
      delete_value: "Видалити значення",
      edit_value: "Редагувати значення",
      new_value: "Створити значення",
      indicator_id: "ID індикатора",
      country_id: "ID країни",
      deleted_successfully: "Значення успішно видалені",
      confirm_deletion: "Ви впевнені що хочете видалити значення ({id})?",
      confirm_multiple_deletion:
        "Ви впевнені що хочете видалити обрані значення ({count})?",
      created_successfully: "Значення було успішно створено",
      updated_successfully: "Значення було успішно оновлено",
      metadata: {
        title: "Панель значень",
        description:
          "Редагуйте значення тут: додайте, оновлюйте або видаляйте.",
      },
      selects: {
        sort: {
          by_id: "ID",
          by_value: "Значенням",
          by_year: "Роком",
          by_date_of_update: "Датою оновлення",
          by_indicator_id: "ID індикатора",
          by_country_id: "ID країни",
        },
      },
    },
    dashboard: {
      more_info: "Детальніше",
      hide_selected: "Приховати всі вибрані ({count})",
      expose_selected: "Показати всі вибрані ({count})",
      delete_selected: "Видалити вибрані ({count})",
      clear_selection: "Очистити вибір ({count})",
      not_found_fallback: "Нічого не знайдено",
      clear_filters: "Очистити фільтри",
    },
    terms_of_use: {
      title: "Умови використання",
      last_update: "Останнє оновлення: 01.02.2024",
      welcome:
        "Ласкаво просимо до Statify! Використовуючи наш вебсайт, ви погоджуєтеся дотримуватися таких умов використання. Будь ласка, уважно прочитайте ці умови перед використанням Statify.",
      liability_title: "Відмова від відповідальності",
      liability_text:
        "Ми не гарантуємо точність, повноту або надійність даних. Всі дані надаються МВФ і Світовим банком.",
      use_of_information_title: "Використання інформації",
      use_of_information_text:
        "Користувачам дозволяється використовувати статистичні дані з Statify для особистих, освітніх або комерційних цілей. Дані не повинні використовуватися для незаконної або шкідливої діяльності.",
      privacy_title: "Політика конфіденційності",
      privacy_text:
        "Statify не збирає жодної інформації про користувачів. Отже, немає даних для зберігання або передачі.",
      ownership_title: "Право власності",
      ownership_text:
        "Усі елементи дизайну, код, скрипти та програмні елементи, використані в Statify, є інтелектуальною власністю Георгія Шваба. Несанкціоноване відтворення, модифікація або розповсюдження коду суворо заборонено.",
      contact_title: "Контактна інформація",
      contact_text:
        "З питаннями, побажаннями або запитами щодо умов використання звертайтеся на <a>georgiy.shvab@gmail.com</a>.",
      metadata: {
        title: "Умови використання",
        description:
          "Умови використання Statify. Використовуючи наш вебсайт, ви погоджуєтеся дотримуватися таких умов використання. Будь ласка, уважно прочитайте ці умови перед використанням Statify.",
      },
    },
  },
  footer: {
    copyright: "© 2023-2025 Георгій Шваб. Всі права захищено.",
    terms: "Умови використання",
  },
  admin_header: {
    indicators: "Індикатори",
    countries: "Країни",
    values: "Значення",
  },
  validation: {
    incorrect_credentials: "Невірний пароль або електронна пошта",
    value_is_required: "Поле значення є обов’язковим.",
    value_is_invalid: "Значення некоретне.",
    year_is_required: "Поле року є обов’язковим.",
    year_is_invalid: "Рік некоректний.",
    indicator_id_is_required: "ID індикатора є обов’язковим.",
    indicator_id_is_invalid: "ID індикатора є обов’язковим.",
    country_id_is_required: "ID країни є обов’язковим.",
    country_id_is_invalid: "ID країни є обов’язковим.",
    label_is_required: "Поле назви є обов’язковим.",
    label_is_invalid: "Поле назви є обов’язковим.",
    label_max_length_exceed: "Назва не може перевищувати 200 символів.",
    description_max_length_exceed: "Опис не може перевищувати 1000 символів.",
    description_is_invalid: "Опис не може перевищувати 1000 символів.",
    source_is_required: "Поле джерела є обов’язковим.",
    source_is_invalid: "Поле джерела є обов’язковим.",
    source_max_length_exceed: "Джерело не може перевищувати 150 символів.",
    dataset_max_length_exceed: "Датасет не може перевищувати 150 символів.",
    dataset_is_invalid: "Датасет не може перевищувати 150 символів.",
    unit_is_invalid: "",
    unit_max_length_exceed:
      "Одиниця вимірювання не може перевищувати 150 символів.",
    unit_symbol_max_length_exceed:
      "Символ одиниці вимірювання не може перевищувати 50 символів.",
    precision_is_required: "Точність є обов’язковим полем.",
    precision_is_invalid: "Точність є обов’язковим полем.",
    precision_min_value_exceed: "Точність не може бути меншою за 0.",
    precision_max_value_exceed: "Точність не може перевищувати 10.",
    ranking_is_required: "Поле рейтингу є обов’язковим.",
    ranking_is_invalid: "Поле рейтингу є обов’язковим.",
    ranking_min_value_exceed: "Рейтинг не може бути меншим за 0.",
    ranking_max_value_exceed: "Рейтинг не може перевищувати 10.",
    hidden_is_required: "Приховано є обов’язковим.",
    hidden_is_invalid: "Приховано є обов’язковим.",
    show_chart_is_required: "Поле showChart є обов’язковим.",
    show_chart_is_invalid: "Поле showChart є обов’язковим.",
    absolute_is_required: "Поле absolute є обов’язковим.",
    absolute_is_invalid: "Поле absolute є обов’язковим.",
    search_tag_is_required: "Тег для пошуку є обов’язковим.",
    search_tag_is_invalid: "Тег для пошуку є обов’язковим.",
    search_tag_max_length_exceed:
      "Тег для пошуку не може перевищувати 100 символів.",
    name_is_required: "Назва є обов’язковим полем.",
    name_is_invalid: "Назва є обов’язковим полем.",
    name_min_length_exceed: "Назва має містити щонайменше 3 символи.",
    name_max_length_exceed: "Назва не може перевищувати 100 символів.",
    geoCode_is_required: "Geocode є обов’язковим полем.",
    geoCode_is_invalid: "Geocode є обов’язковим полем.",
    iso2Code_is_required: "iso2code є обов’язковим полем.",
    iso2Code_is_invalid: "iso2code є обов’язковим полем.",
    status_is_required: "Статус є обов’язковим полем.",
    status_is_invalid: "Статус є обов’язковим полем.",
    type_is_required: "Тип є обов’язковим полем.",
    type_is_invalid: "Тип є обов’язковим полем.",
    id_is_required: "ID є обов'язковим полем.",
    id_max_length_exceed: "ID не може перевищувати 50 символів.",
  },
  errors: {
    server_error: "Помилка сервера",
    page_not_found: "Сторінку не знайдено",
    unexpected_error: "Сталася неочікувана помилка",
  },
} as const
