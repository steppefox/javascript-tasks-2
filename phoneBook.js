'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/**
 * Простая функция валидации данных
 * @param  {string} input строка данных для валидации
 * @param  {string} type  один из типов валидации (email, name, phone)
 * @return {bool}
 */
function validate(input, type) {
    var ret = true;
    switch (type) {
        case 'email':
            // https://regex101.com/r/xT5vS8/1
            var expr = new RegExp('^[a-z][а-яA-Za-z\-0-9\.\_]{0,50}' +
                '@(([а-я\-]+(\.[а-я]{2,4}){1,3})|([a-z\-]+(\.[a-z]{2,4}){1,3}))$', 'ig');
            ret = expr.exec(input) ? true : false;
            break;
        case 'name':

            break;
        case 'phone':
            // https://regex101.com/r/dG3iO6/1
            var expr = /^(\+?\d{1,2})?\s?((\(\d{3}\))|(\d{3}))\s?\d{3}(\s|-)?\d(\s|-)?\d{3}$/ig;
            ret = expr.exec(input) ? true : false;
            break;
        default:
            ret = false;
            break;
    }

    return ret;
}

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {

    // Ваша невероятная магия здесь

    if (validate(name, 'name') && validate(phone, 'phone') && validate(email, 'email')) {
        phoneBook.push({
            name: name,
            phone: phone,
            email: email
        });

        console.log('Запись добавлена');
        return true;
    } else {
        console.warn('Данные не валидны');
        return false;
    }
};

/**
 * Функция для проверки соответсвия запроса и записи телефонной книги
 * @param  {Object} item  запись телефонной книги
 * @param  {string} query запрос
 * @return {bool}
 */
function checkPhoneRecord(item, query) {
    if (item.name.indexOf(query) != -1 ||
        item.phone.indexOf(query) != -1 ||
        item.email.indexOf(query) != -1) {
        return true;
    }
    return false;
}

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {

    // Ваша удивительная магия здесь
    console.log('Ищем данные по запросу: "' + query + '"');
    var ret = [];

    for (var i in phoneBook) {
        var item = phoneBook[i];
        if (checkPhoneRecord(item, query)) {
            ret.push(item);
        }
    }

    if (ret.length > 0) {
        console.log('Найденных результатов - ' + ret.length + ':');
        for (var i in ret) {
            console.log(ret[i].name + ', ' + ret[i].phone + ', ' + ret[i].email);
        }
    } else {
        console.log('Ничего не найдено D;');
    }

};

/**
 * Старая функция для получения plural формы фразы в русском языке
 * Хотя имхо, лучше уж библиотеку использовать, вроде: https://github.com/scottrippey/Smart-Plurals
 * @param  {number} input число в зависимости от которого склонять фразу/слово
 * @param  {string} str1  слово в единственном числе (ex.: арбуз)
 * @param  {string} str2  слово с числами 2,3,4 (ex.: арбуза)
 * @param  {string} str3  слово с числами 0,5,6 и т.д. (ex.: арбузов)
 * @return {string}
 */
function getPlural(input, str1, str2, str3) {

    var rule = 2;
    if (input % 10 == 1 && input % 100 != 11) {
        rule = 0;
    } else if (input % 10 >= 2 && input % 10 <= 4 && (input % 100 < 10 || input % 100 >= 20)) {
        rule = 1;
    }

    var retStr = '';
    switch (rule) {
        case 0:
            retStr = str1;
            break;
        case 1:
            retStr = str2;
            break;
        default:
            retStr = str3;
            break;
    }

    retStr = retStr.replace(/\{n\}/, input);
    return retStr;
}

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    // Ваша необьяснимая магия здесь
    var counter = 0;
    for (var i = phoneBook.length - 1; i >= 0; i--) {
        var item = phoneBook[i];
        if (checkPhoneRecord(item, query)) {
            counter++;
            phoneBook.splice(i, 1);
        }
    }

    console.log(getPlural(
        counter,
        'Удален {n} контакт',
        'Удалено {n} контакта',
        'Удалено {n} контактов')
    );
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    console.log('\nИмпортируем файл: \n');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу

    var counter = 0;
    var lines = data.split('\n');
    for (var i in lines) {
        var rowData = lines[i].split(';');
        if (module.exports.add(rowData[0], rowData[1], rowData[2])) {
            counter++;
        }
    }
    console.log();

    console.log(getPlural(
        counter,
        'Добавлен {n} контакт',
        'Добавлено {n} контакта',
        'Добавлено {n} контактов')
    );

};

var tableOptions = {
    leftTopCorner: '┌',
    leftBotCorner: '└',
    rightTopCorner: '┐',
    rightBotCorner: '┘',
    noLeftCross: '├',
    noRightCross: '┤',
    noTopCross: '┬',
    noBotCross: '┴',
    noTopCrossBold: '╥',
    noBotCrossBold: '╨',
    cross: '┼',
    crossBold: '╫',
    lineHorizontal: '─',
    lineVertical: '│',
    lineVerticalBold: '║',
    cellSpacing: ' '
};

/**
 * Функция создания ASCII колонки таблицы
 * @param  {string} columnType  тип колонки (first, last, default)
 * @param  {string} title заголовок колонки
 * @param  {array|Object} массив данных
 * @return {array} вернет массив строк (массив нужен для правильного вывода потом в консоли)
 */
function buildColumn(columnType, title, data) {
    var leftTopCorner;
    var leftBotCorner;
    var leftCross;
    var lineHorizontal;
    var lineVertical;
    switch (columnType) {
        case 'first':
            leftTopCorner = tableOptions.leftTopCorner;
            leftBotCorner = tableOptions.leftBotCorner;
            leftCross = tableOptions.noLeftCross;
            lineHorizontal = tableOptions.lineHorizontal;
            lineVertical = tableOptions.lineVertical;
            break;
        case 'last':
            leftTopCorner = tableOptions.noTopCrossBold;
            leftBotCorner = tableOptions.noBotCrossBold;
            leftCross = tableOptions.crossBold;
            lineHorizontal = tableOptions.lineHorizontal;
            lineVertical = tableOptions.lineVerticalBold;
            break;
        default: // обычная, центральная колонка
            leftTopCorner = tableOptions.noTopCross;
            leftBotCorner = tableOptions.noBotCross;
            leftCross = tableOptions.cross;
            lineHorizontal = tableOptions.lineHorizontal;
            lineVertical = tableOptions.lineVertical;
            break;
    }

    var columnLength = title ? title.length : 0;
    for (var i in data) {
        if (data[i].length > columnLength) {
            columnLength = data[i].length;
        }
    }

    columnLength += (tableOptions.cellSpacing.length * 2); // Отступы слева и справа внутри ячейки

    function buildLine(leftSymbol, lineSymbol, lineLength, rightSymbol) {
        var line = leftSymbol;
        for (var i = 0; i < lineLength; i++) {
            line += lineSymbol;
        }
        line += rightSymbol;
        return line;
    }

    var ret = [];
    // Верхняя граница шапки колонки
    ret.push(buildLine(
        leftTopCorner, lineHorizontal, columnLength,
        (columnType == 'last' ? tableOptions.rightTopCorner : '')
    ));

    // Заголовок
    ret.push(
        lineVertical + tableOptions.cellSpacing +
        title +
        Array((columnLength - 1 - title.length)).join(' ') + // Дополнительные пробелы в строке
        tableOptions.cellSpacing + (columnType == 'last' ? tableOptions.lineVertical : '')
    );

    // Нижняя граница шапки колонки
    ret.push(buildLine(
        leftCross, lineHorizontal, columnLength,
        (columnType == 'last' ? tableOptions.noRightCross : '')
    ));

    for (var i in data) {
        ret.push(
            lineVertical + tableOptions.cellSpacing +
            data[i] +
            Array((columnLength - 1 - data[i].length)).join(' ') +
            tableOptions.cellSpacing + (columnType == 'last' ? tableOptions.lineVertical : '')
        );
    }

    // Нижняя граница колонки
    ret.push(buildLine(
        leftBotCorner, lineHorizontal, columnLength,
        (columnType == 'last' ? tableOptions.rightBotCorner : '')
    ));

    return ret;
}

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {

    // Ваша чёрная магия здесь
    var columnsData = {
        names: [],
        phones: [],
        emails: []
    };
    for (var i in phoneBook) {
        columnsData.names.push(phoneBook[i].name);
        columnsData.phones.push(phoneBook[i].phone);
        columnsData.emails.push(phoneBook[i].email);
    }

    var columns = [];
    columns.push(buildColumn('first', 'Имя', columnsData.names));
    columns.push(buildColumn('normal', 'Телефон', columnsData.phones));
    columns.push(buildColumn('last', 'E-mail', columnsData.emails));

    for (var i in columns[0]) {
        var st = '';
        for (var j = 0; j < 3; j++) {
            st += columns[j][i];
        }
        console.log(st);
    }

};
