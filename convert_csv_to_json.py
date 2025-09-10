import csv
import json
from collections import defaultdict

grouped_items = defaultdict(dict)

with open("/Users/jon/prj/Primos/primos_new_prices.csv", "r") as csv_file:
    reader = csv.reader(csv_file)
    header = next(reader)

    for row in reader:
        category, item_name, variant, price = row
        if variant:
            grouped_items[(category, item_name)][variant] = float(price)
        else:
            # Use a special key for items with no variant name but a price
            grouped_items[(category, item_name)]["_price"] = float(price)

menu = defaultdict(list)
for (category, item_name), data in grouped_items.items():
    item_obj = {"item": item_name}
    variants = {k: v for k, v in data.items() if k != "_price"}
    if variants:
        item_obj["variants"] = variants
    if "_price" in data:
        item_obj["price"] = data["_price"]
    menu[category].append(item_obj)

# Reorder items in specified categories
categories_to_reorder = ["Tray Pizza", "Stuffed Pizza", "U Bake Pizza"]
for category in categories_to_reorder:
    if category in menu:
        extra_items = None
        for i, item in enumerate(menu[category]):
            if item["item"] == "Extra Items":
                extra_items = menu[category].pop(i)
                break
        if extra_items:
            menu[category].append(extra_items)

json_output = json.dumps(menu, indent=2)

with open("/Users/jon/prj/Primos/menu.json", "w") as json_file:
    json_file.write(json_output)