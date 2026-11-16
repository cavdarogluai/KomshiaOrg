export const LANGS = ["bg", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v);

export const TOPICS = ["volunteer", "partner", "help", "press", "other"] as const;

type Dict = {
  name: string;
  tag: string;
  nav: { about: string; work: string; join: string; contact: string };
  hero: { title: string; lead: string; cta: string; cta2: string };
  about: { title: string; p1: string; p2: string; status: string };
  work: { title: string; items: { t: string; d: string }[] };
  join: { title: string; lead: string; cards: { t: string; d: string }[] };
  contact: {
    title: string; lead: string; name: string; email: string; topic: string; message: string;
    send: string; sending: string; ok: string; err: string; limit: string; invalid: string;
    consent: string; topics: Record<(typeof TOPICS)[number], string>;
  };
  privacy: { title: string; sections: { h: string; p: string }[]; controller: { h: string; p: string; link: string } };
  footer: { rights: string; privacy: string; server: string; theme: string; lang: string };
};

export const dict: Record<Lang, Dict> = {
  bg: {
    name: "Комшия",
    tag: "Фондация · Бургас",
    nav: { about: "За нас", work: "Какво правим", join: "Включи се", contact: "Контакт" },
    hero: {
      title: "Добрият квартал започва с едно „добър ден“ на стълбите.",
      lead: "Фондация „Комшия“ се учредява в Бургас, за да свързва съседи, да подкрепя хората, които се нуждаят от помощ наблизо, и да превръща добросъседството в навик.",
      cta: "Включи се",
      cta2: "Пиши ни",
    },
    about: {
      title: "За фондацията",
      p1: "„Комшия“ е българската дума за съсед, а добрият комшия е първият, който ще ти помогне. Искаме този навик да се връща във всеки блок и всяка улица.",
      p2: "Започваме от Бургас и работим по малки, видими неща: взаимопомощ между съседи, подкрепа за възрастни хора и семейства, общи дейности в квартала.",
      status: "Фондацията е в процес на учредяване. Тук ще публикуваме регистрационните данни и отчетите си веднага след вписването.",
    },
    work: {
      title: "Какво ще правим",
      items: [
        { t: "Съседска взаимопомощ", d: "Свързваме хора, които могат да помогнат, с тези, които имат нужда: пазар, лекар, дребен ремонт, компания." },
        { t: "Грижа за възрастните", d: "Редовни посещения и разговори, така че никой в квартала да не остава сам." },
        { t: "Общи дейности", d: "Почистване, дворове, празници и срещи, които правят съседите познати един на друг." },
        { t: "Прозрачност", d: "Всяко дарение и всеки разход ще бъдат публикувани. Без изключения." },
      ],
    },
    join: {
      title: "Как да се включиш",
      lead: "Всеки може да е комшия. Избери какво ти е по сила.",
      cards: [
        { t: "Доброволец", d: "Няколко часа в месеца във вашия квартал." },
        { t: "Партньор", d: "Организации и фирми, които искат да подкрепят квартални каузи." },
        { t: "Търся помощ", d: "Ако ти или близък имате нужда, пиши ни и ще се опитаме да свържем." },
      ],
    },
    contact: {
      title: "Контакт",
      lead: "Пиши ни през формата. Ще ти отговорим на посочения от теб имейл.",
      name: "Име", email: "Имейл", topic: "Тема", message: "Съобщение",
      send: "Изпрати", sending: "Изпращане…",
      ok: "Благодарим! Получихме съобщението ти.",
      err: "Нещо се обърка. Опитай пак след малко.",
      limit: "Твърде много опити. Опитай по-късно.",
      invalid: "Провери полетата и опитай пак.",
      consent: "С изпращането се съгласявам данните ми да се използват само за отговор на това съобщение.",
      topics: { volunteer: "Искам да бъда доброволец", partner: "Партньорство", help: "Търся помощ", press: "Медии", other: "Друго" },
    },
    privacy: {
      title: "Поверителност",
      sections: [
        { h: "Какво събираме", p: "Само това, което ни изпращаш през формата за контакт: име, имейл, тема и съобщение. Нямаме профили, пароли или реклами." },
        { h: "Защо", p: "За да ти отговорим. Не продаваме и не споделяме данните ти с трети страни за маркетинг." },
        { h: "Срок", p: "Съобщенията се пазят до 12 месеца и се изтриват по твое искане." },
        { h: "Бисквитки и проследяване", p: "Сайтът не използва проследяващи бисквитки. Запазваме само избора ти на тема (светла/тъмна) и език в браузъра ти." },
        { h: "Хостинг", p: "Vercel (Франкфурт) и база данни в Neon (Франкфурт), в ЕС." },
        { h: "Права", p: "Имаш право на достъп, поправка и изтриване (GDPR). Поискай го през формата за контакт." },
      ],
      controller: { h: "Администратор на данните", p: "Фондация „Комшия“, Бургас, България. Фондацията е в процес на учредяване; регистрационните данни ще бъдат публикувани тук след вписването. До тогава връзката с нас е само чрез формата за контакт.", link: "Към формата за контакт" },
    },
    footer: { rights: "Фондация „Комшия“, Бургас (в процес на учредяване)", privacy: "Поверителност", server: "Хостинг: Vercel (Франкфурт)", theme: "Тъмен/светъл режим", lang: "Език" },
  },
  en: {
    name: "Komshia",
    tag: "Foundation · Burgas",
    nav: { about: "About", work: "What we do", join: "Get involved", contact: "Contact" },
    hero: {
      title: "A good neighbourhood starts with a hello on the stairs.",
      lead: "The Komshia Foundation is being established in Burgas, Bulgaria, to connect neighbours, support people who need help close to home, and make good neighbourliness a habit again.",
      cta: "Get involved",
      cta2: "Write to us",
    },
    about: {
      title: "About the foundation",
      p1: "“Komshia” is the Bulgarian word for neighbour, and a good komshia is the first one to help. We want that habit back in every block and on every street.",
      p2: "We start in Burgas and work on small, visible things: mutual help between neighbours, support for older people and families, shared activities in the neighbourhood.",
      status: "The foundation is being established. Registration details and reports will be published here as soon as it is entered in the register.",
    },
    work: {
      title: "What we will do",
      items: [
        { t: "Neighbour-to-neighbour help", d: "We connect people who can help with those who need it: shopping, a doctor’s visit, small repairs, company." },
        { t: "Care for older neighbours", d: "Regular visits and conversations, so nobody in the neighbourhood is left alone." },
        { t: "Shared activities", d: "Clean-ups, courtyards, celebrations and meetings that make neighbours familiar to each other." },
        { t: "Transparency", d: "Every donation and every expense will be published. No exceptions." },
      ],
    },
    join: {
      title: "How to get involved",
      lead: "Anyone can be a komshia. Pick what suits you.",
      cards: [
        { t: "Volunteer", d: "A few hours a month in your own neighbourhood." },
        { t: "Partner", d: "Organisations and businesses that want to back neighbourhood causes." },
        { t: "I need help", d: "If you or someone close to you needs support, write to us and we will try to connect you." },
      ],
    },
    contact: {
      title: "Contact",
      lead: "Write to us through the form. We will reply to the email you give.",
      name: "Name", email: "Email", topic: "Topic", message: "Message",
      send: "Send", sending: "Sending…",
      ok: "Thank you! We received your message.",
      err: "Something went wrong. Please try again shortly.",
      limit: "Too many attempts. Please try later.",
      invalid: "Please check the fields and try again.",
      consent: "By sending, I agree that my data is used only to reply to this message.",
      topics: { volunteer: "I want to volunteer", partner: "Partnership", help: "I need help", press: "Press", other: "Other" },
    },
    privacy: {
      title: "Privacy",
      sections: [
        { h: "What we collect", p: "Only what you send through the contact form: name, email, topic and message. We have no accounts, passwords or ads." },
        { h: "Why", p: "To reply to you. We do not sell your data or share it with third parties for marketing." },
        { h: "Retention", p: "Messages are kept for up to 12 months and deleted on request." },
        { h: "Cookies and tracking", p: "The site uses no tracking cookies. We only remember your theme (light/dark) and language choice in your browser." },
        { h: "Hosting", p: "Vercel (Frankfurt) and a Neon database (Frankfurt), within the EU." },
        { h: "Your rights", p: "You have the right to access, correct and delete your data (GDPR). Ask through the contact form." },
      ],
      controller: { h: "Data controller", p: "Komshia Foundation, Burgas, Bulgaria. The foundation is being established; its registration details will be published here once it is entered in the register. Until then, the only way to reach us is the contact form.", link: "Go to the contact form" },
    },
    footer: { rights: "Komshia Foundation, Burgas (being established)", privacy: "Privacy", server: "Hosting: Vercel (Frankfurt)", theme: "Dark/light mode", lang: "Language" },
  },
};
