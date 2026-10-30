#!/usr/bin/env python3
"""Build browser-ready catalogue data directly from the approved XLSX source."""
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
from shutil import copy2

SOURCE = '/Users/annakronova/Desktop/Каталог.xlsx'
TARGET = 'catalog-data.js'
SOURCE_ASSETS = Path('assets/catalog-update')
WEB_ASSETS = Path('assets/catalog')
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

NAMES = {
    10: 'Стул «Связь / Link»', 11: 'Кресло Roll', 12: 'Банкетка «Уно / Uno»',
    13: 'Кресло «Нео / Neo»', 14: 'Консоль «Грань / Edge»', 15: 'Столик Martin',
    16: 'Журнальный стол «Грань / Edge»', 17: 'Кресло «Фило / Filo»',
    18: 'Компактное кресло X (Икс)', 19: 'Стол X (Икс)', 20: 'Полукресло Коко',
    21: 'Журнальные столики «Радуга / Rainbow»', 22: 'Журнальный стол «Пара / Pair»',
    23: 'Панно по эскизу Л. Поповой', 24: 'Объёмное панно по эскизу Сони Делоне',
    25: 'Объёмное панно по эскизу В. Степановой', 26: 'Банкетка ECLIPSE',
    27: 'Письменный стол ECLIPSE', 28: 'Консоль ECLIPSE', 29: 'Консоль «Inside out»',
    30: 'Кресло Bubble', 31: 'Стол ЛОСС, серия «Дюна»',
    32: 'Ваза SIRS, серия JAPANESE', 33: 'Ваза DRAMM, серия «Древность»',
    34: 'Композиция подсвечников «Ветерено»', 35: 'Скульптура «Адам и Ева»',
    36: 'Консоль', 37: 'Стол кофейный Z/H Maya', 38: 'Стул «Дурак»',
    39: 'Панно «Озеро»', 40: 'Светильник «Банка»',
    41: 'Напольная лампа Light Catcher («Ловец света»)', 42: 'Вазы «Изгибы»',
    43: 'Ваза «Изгибы»', 44: 'Ваза «Месяц»', 45: 'Ваза «Закрытие»',
    46: 'Торшер «BOO Totem»', 47: 'Кресло «BOO Nest»',
    48: 'Ваза «Сад камней / Strata»', 49: 'Ваза «Сад камней / Crust»',
    50: 'Консоль «Лента»', 51: 'Стол «Красивый»', 52: 'Скульптура «Грация / Grace»',
    53: 'Скульптура «Искра / Étincelle»', 54: 'Картина «Остров»', 55: 'Картина «Сосна»',
    56: 'Картина «Берег озера»', 57: 'Картина «Древний город»',
    58: 'Картина «Поляна в лунном свете»', 59: 'Картина «Пейзажный парк»',
    60: 'Панно «Тайна душ»', 61: 'Картина «Театр. Сцена»',
    62: 'Серия «Природа. Границы 5»', 63: 'Серия «Природа. Границы 1»',
    64: 'Картина «Координаты»', 65: 'Картина «Пристань»',
    66: 'Картина «Структура памяти»', 67: 'Картина «Спортивная тренировка»',
    68: 'Картина «Порт»', 69: 'Картина «Связующее звено»', 70: 'Картина «Лаборатория 1»',
    71: 'Торшер Triangle', 72: 'Зеркало', 73: 'Секретер «Сигма»',
    74: 'Панно «Шары»', 75: 'Столик «Неокуб»', 76: 'Ваза с фактурой',
    77: 'Ваза с лепестками', 78: 'Панно «Марсала»', 79: 'Скульптура «Адам»'
}

PHOTOS = {
    10: 'Стул связь.png', 11: 'кресло roll.png', 12: 'uno-bench-cutout.png', 13: 'кресло нео.png',
    14: 'консоль грань.png', 15: 'martin-cutout.png', 16: 'edge-coffee-table-cutout.png', 17: 'кресло фило.png',
    18: 'компактное кресло х.png', 19: 'x-table-cutout.png', 20: 'полукресло.png', 21: 'журнальные столики радуга.png',
    22: 'журнальный стол пара.png', 23: 'Screenshot 2026-10-30 at 16.49.12.png',
    24: 'Screenshot 2026-10-30 at 16.49.28.png', 25: 'stepanova-panel.png',
    26: 'eclipse-bench-cutout.png',
    27: 'Screenshot 2026-10-30 at 16.49.46.png', 28: 'Screenshot 2026-10-30 at 16.49.56.png',
    29: 'Screenshot 2026-10-30 at 16.50.05.png', 30: 'Screenshot 2026-10-30 at 16.50.14.png',
    31: 'loss-table-cutout.png', 32: 'sirs-vase-cutout.png', 33: 'ВазаDRAMM СерияДревность.png',
    34: 'композиция подсвечников ветерно.png', 35: 'photo_2026-10-30_16-42-13.jpg', 36: 'Консоль.png',
    37: 'Стол кофейный Z:H Maya.png', 38: 'Screenshot 2026-10-30 at 16.51.03.png',
    39: 'Screenshot 2026-10-30 at 16.51.15.png', 40: 'Screenshot 2026-10-30 at 16.51.09.png',
    41: 'Напольная лампа Light Catcher.png', 42: 'вазы.png', 43: 'izgiby-vase-cutout.png',
    44: 'month-vase-cutout.png', 45: 'Screenshot 2026-10-30 at 16.52.01.png',
    46: 'boo-totem-updated.png', 47: "Кресло 'BOO Nest'.png", 48: 'Screenshot 2026-10-30 at 16.52.40.png',
    49: 'Screenshot 2026-10-30 at 16.52.48.png', 50: 'Консоль Волна.png', 51: 'Screenshot 2026-10-28 at 23.04.05.png',
    52: 'grace-sculpture-cutout.png', 53: 'Screenshot 2026-10-30 at 16.54.37.png',
    54: 'Screenshot 2026-10-30 at 16.54.44.png', 55: 'pine-without-telegram.png',
    56: 'Screenshot 2026-10-30 at 16.55.05.png', 57: 'Screenshot 2026-10-30 at 16.55.10.png',
    58: 'Screenshot 2026-10-30 at 16.55.16.png', 59: 'Screenshot 2026-10-30 at 16.55.23.png',
    60: 'Screenshot 2026-10-30 at 16.55.30.png', 61: 'Screenshot 2026-10-30 at 16.55.49.png',
    62: 'Screenshot 2026-10-30 at 16.56.00.png', 63: 'nature-borders-1-updated.png',
    64: 'Screenshot 2026-10-30 at 16.56.13.png', 65: 'pristan-updated.png',
    66: 'Screenshot 2026-10-30 at 16.56.26.png', 67: 'Screenshot 2026-10-30 at 16.56.31.png',
    68: 'Screenshot 2026-10-30 at 16.56.39.png', 69: 'Screenshot 2026-10-30 at 16.56.44.png',
    70: 'Screenshot 2026-10-30 at 16.56.50.png', 71: 'Screenshot 2026-10-30 at 16.56.55.png',
    72: 'Screenshot 2026-10-30 at 16.57.00.png', 73: 'Screenshot 2026-10-30 at 16.57.07.png',
    74: 'Screenshot 2026-10-30 at 16.57.12.png', 76: 'Screenshot 2026-10-30 at 16.57.19.png',
    77: 'Screenshot 2026-10-30 at 16.57.30.png', 78: 'Screenshot 2026-10-30 at 16.57.35.png',
    79: 'Screenshot 2026-10-30 at 16.57.41.png'
}

LIGHT_ROWS = {40, 41, 46, 71}
FURNITURE_ROWS = set(range(10, 23)) | set(range(26, 31)) | {36, 37, 38, 47, 50, 51, 73, 75}
# Keep interiors and artwork photographs intact; product renders on white use the cutout treatment.
SCENE_ROWS = {10, 11, 35, 36, 37, 38, 39, 40, 41, 50, 71, 72, 73, 74, 75, 76, 77, 78, 79}

TEXT_CORRECTIONS = {
    'полукруглых соединения': 'полукруглых соединениях',
    'Полноценным кресло': 'Полноценное кресло',
    'Журнальные стол X': 'Журнальный стол X',
    'геометрия и конструкция обеспечивает': 'геометрия и конструкция обеспечивают',
    'особо сиденье': 'сиденье и спинка',
    'Графичные линии и контрастные цвета озаряет': 'Графичные линии и контрастные цвета подчёркивает',
    'образе, притягивающим': 'образе, притягивающем',
    'так же можно': 'также можно',
    'ее конструкции': 'её конструкции',
    'Стул Дурак переосмысливает классический архетип стула и создает силуэт который': 'Стул «Дурак» переосмысливает классический архетип стула и создаёт силуэт, который',
    'Дурак -это': '«Дурак» — это',
    'Это харизматичный и скульптурный стул разработан': 'Этот харизматичный и скульптурный стул разработан',
    'создает силуэт': 'создаёт силуэт',
    'привыки к плоским полотнам': 'привыкли к плоским полотнам',
    'объемным скульптурам,но': 'объёмным скульптурам, но',
    'Легкое дуновение -': 'Лёгкое дуновение —',
    'Это не просто 3D ,': 'Это не просто 3D,',
    'отклик природу театрального действа': 'отклик на природу театрального действа',
    'маленькими многоцветными детали': 'маленькими многоцветными деталями',
    '2026г.': '2026 г.',
    'подписана .автором': 'подписана автором',
    'тазурь': 'глазурь',
    'Керамическая ваза ручной работы. форма': 'Керамическая ваза ручной работы. Форма',
    'сеюрмированные временем, Серая': 'сформированные временем. Серая',
    'возможны другие варианты исполнения': 'Возможны другие варианты исполнения',
    'белый желтый кобальтовый': 'белый, жёлтый, кобальтовый',
    'т.д из': 'т. д. из',
    'выполнены вручную,включая': 'выполнены вручную, включая',
    'во-первых это': 'во-первых, это',
    'во вторых,': 'во-вторых,',
    'это цикл предметов интерьера, рожденный': 'это цикл предметов интерьера, рождённый',
    'В основе ее образа вдохновение': 'В основе её образа — вдохновение',
    'моменте танца - текучая': 'моменте танца — текучая',
    'из себя лаконичную лампу': 'собой лаконичную лампу',
    'что бы остался': 'чтобы остался',
    'выкрадываются раскатанные': 'выкладываются раскатанные',
    'выглаживаются, и, сушатся': 'выглаживаются и сушатся',
    'на столько же': 'настолько же',
    'функциональными- основной': 'функциональными — основной',
    '3мм': '3 мм',
    'полукруглых соединениях объёмов': 'полукруглого соединения объёмов',
    'а сиденье и спинка и спинка': 'а сиденье и спинка',
    'Графичные линии и контрастные цвета подчёркивает оранжевый круг': 'Оранжевый круг подчёркивает графичные линии и контрастные цвета',
    'срез — пласты камня. сформированные временем.': 'срез — пласты камня, сформированные временем.',
}

DESCRIPTION_OVERRIDES = {
    32: 'Произведение тиражного искусства. Тираж 2/11. Сертификат. Латунь. Литьё. Ручная проработка предмета. Тонировка химией. Покрытие — лак. Создаётся 11 предметов, предметы нумеруются и сертифицируются. Технология: лепка скульптора, формовка, литьё.',
    33: 'Произведение тиражного искусства. Тираж 2/11. Сертификат. Латунь. Ручная проработка предмета. Тонировка химией. Покрытие — лак. Создаётся 11 предметов, предметы нумеруются и сертифицируются. Технология: края листа латуни нагревают докрасна и отбивают молотком, что создаёт неповторимые естественные разрывы металла.',
}

def proofread_copy(value):
    value = value.replace('\u00a0', ' ')
    for original, corrected in TEXT_CORRECTIONS.items():
        value = value.replace(original, corrected)
    value = re.sub(r'[ \t]+', ' ', value)
    value = re.sub(r' *\n *', '\n', value)
    value = re.sub(r'\n{3,}', '\n\n', value)
    if value:
        value = value[0].upper() + value[1:]
    return value

def extract_dimensions(value):
    """Return only the dimensions from the XLSX specifications field."""
    number = r'\d+(?:[.,]\d+)?\s*(?:мм|см)?'
    triplet = rf'{number}\s*[хx*]\s*{number}(?:\s*[хx*]\s*{number})?'
    matches = re.findall(triplet, value, flags=re.IGNORECASE)
    if matches:
        cleaned = [re.sub(r'\s+', ' ', match).strip() for match in matches]
        return ' · '.join(dict.fromkeys(cleaned))

    labelled = []
    for label, short in [('Высота', 'В'), ('Длина', 'Д'), ('Ширина', 'Ш'), ('Диаметр', 'Ø')]:
        match = re.search(rf'{label}(?:,?\s*мм)?\s*[:\-]?\s*(\d+(?:[.,]\d+)?(?:\s*[-–]\s*\d+(?:[.,]\d+)?)?)', value, flags=re.IGNORECASE)
        if match:
            labelled.append(f'{short}: {match.group(1)} мм')
    if labelled:
        return ' · '.join(labelled)

    shorthand = re.findall(r'\b([hHdD])\s*(\d+(?:[.,]\d+)?(?:/\d+(?:[.,]\d+)?)?)', value)
    if shorthand:
        return ' · '.join(f'{axis.lower()}: {size}' for axis, size in shorthand)
    return 'Размер уточняется'

def parse_cell(cell, shared):
    value = cell.find('m:v', NS)
    if value is None:
        return ''
    text = value.text or ''
    if cell.attrib.get('t') == 's' and text.isdigit():
        return shared[int(text)]
    return text

with zipfile.ZipFile(SOURCE) as archive:
    shared_root = ET.fromstring(archive.read('xl/sharedStrings.xml'))
    shared = [''.join(t.text or '' for t in node.iterfind('.//m:t', NS)) for node in shared_root.findall('m:si', NS)]
    sheet = ET.fromstring(archive.read('xl/worksheets/sheet1.xml'))

    current_resident = ''
    current_contact = ''
    products = []
    for row in sheet.findall('.//m:sheetData/m:row', NS):
        row_number = int(row.attrib['r'])
        if row_number < 10 or row_number > 79:
            continue
        values = {}
        for cell in row.findall('m:c', NS):
            column = re.match(r'[A-Z]+', cell.attrib['r']).group(0)
            values[column] = parse_cell(cell, shared)
        if values.get('A', '').strip():
            current_resident = values['A'].strip()
        if values.get('C', '').strip():
            current_contact = values['C'].strip()
        raw_name = values.get('E', '').strip()
        if not raw_name:
            continue
        product_type = 'light' if row_number in LIGHT_ROWS else ('furniture' if row_number in FURNITURE_ROWS else 'art')
        description = proofread_copy(DESCRIPTION_OVERRIDES.get(row_number, values.get('G', '').strip() or 'Информация об объекте уточняется у галереи.'))
        price = values.get('H', '').strip() or 'По запросу'
        if price and price != 'По запросу' and '₽' not in price:
            note = re.match(r'^(.*?)(\s*\([^)]*\))$', price)
            price = f'{note.group(1).strip()} ₽ {note.group(2).strip()}' if note else f'{price} ₽'
        photo = ''
        if row_number in PHOTOS:
            source_asset = SOURCE_ASSETS / PHOTOS[row_number]
            if not source_asset.exists():
                raise FileNotFoundError(f'Missing catalogue image: {source_asset}')
            # Browser-safe filenames prevent failures with spaces, Cyrillic, and quotes.
            web_asset = WEB_ASSETS / f'{row_number - 9:02d}{source_asset.suffix.lower()}'
            web_asset.parent.mkdir(parents=True, exist_ok=True)
            copy2(source_asset, web_asset)
            photo = web_asset.as_posix()
        products.append({
            'name': NAMES.get(row_number, raw_name),
            'resident': current_resident or '—',
            'contact': current_contact or '—',
            'type': product_type,
            'specs': extract_dimensions(raw_name),
            'description': description,
            'price': price,
            'photo': photo,
            'scene': row_number in SCENE_ROWS
        })

with open(TARGET, 'w', encoding='utf-8') as output:
    output.write('/* Generated from Каталог.xlsx. Do not edit manually. */\n')
    output.write('window.catalogProducts = ')
    json.dump(products, output, ensure_ascii=False, separators=(',', ':'))
    output.write(';\n')

print(f'Wrote {len(products)} catalogue products to {TARGET}')
