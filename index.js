'use strict';

var phoneBook = require('./phoneBook');

// Добавляем записи
phoneBook.add('Сергей', '7 999 6667778', 'gs@example.com');
phoneBook.add('Сергей 2', '999 4433444', 'gs@example.com');
phoneBook.add('Олег', '+7 (999) 777-7-777', 'just7@yandex-team.ru');
phoneBook.add('Эльдар', '+7 (999) 777-7-777', 'amantay.eldar@gmail.com');

// mail@yandex и info@yandex@ya.ru

// Невалидные данные не должны попадать в книгу!
phoneBook.add('Честный Хрюндель', 'invalid phone', 'honest-hrundel');


console.log();

phoneBook.find('777');
// Выводит построчно записи, все поля через запятую:
// Сергей, +7 (999) 666-7-778, gogolef@yandex-team.ru
// Олег, +7 (999) 777-7-777, just7@yandex-team.ru

phoneBook.find();
console.log();

phoneBook.remove('Олег');
// Выводит количество удалённых контактов, которые удовлетворят запросу:
// Удален 1 контакт

console.log();

// Выводит записи в виде красивой таблички
phoneBook.showTable();
// Выводит
// ┌─────────────┬────────────────────╥──────────────────┐
// │ Имя         │ Телефон            ║ email            │
// ├─────────────┼────────────────────╫──────────────────┤
// │ Сергей      │ +7 (999) 666-77-78 ║ gs@example.com   │
// │ Сергей 2    │ +7 (999) 443-34-44 ║ gs@example.com   │
// └─────────────┴────────────────────╨──────────────────┘


// Экспортируем записи, пример файла рядом
phoneBook.importFromCsv('./backup.csv');
// Добавлено 4 контакта


phoneBook.showTable();
