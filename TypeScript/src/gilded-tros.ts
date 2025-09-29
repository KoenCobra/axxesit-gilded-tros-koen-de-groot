import { GILDED_TROS_CONSTANTS } from "../utils/constants";
import { canIncreaseQuality, isSellByDatePassed } from "./../utils/helper";
import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private updateNormalItem(item: Item): void {
    if (item.quality > 0) item.quality -= 1;

    item.sellIn -= 1;

    if (isSellByDatePassed(item) && item.quality > 0) item.quality -= 1;
  }

  private updateGoodWine(item: Item): void {
    if (canIncreaseQuality(item)) item.quality += 1;

    item.sellIn -= 1;

    if (isSellByDatePassed(item) && canIncreaseQuality(item)) {
      item.quality += 1;
    }
  }

  private updateBDAWGKeychain(item: Item): void {
    item.quality = item.quality;
    item.sellIn = item.sellIn;
  }

  private updateBackstagePasses(item: Item): void {
    if (canIncreaseQuality(item)) {
      item.quality += 1;

      if (item.sellIn < 11 && canIncreaseQuality(item)) {
        item.quality += 1;
      }

      if (item.sellIn < 6 && canIncreaseQuality(item)) {
        item.quality += 1;
      }
    }

    item.sellIn -= 1;

    if (isSellByDatePassed(item)) {
      item.quality = 0;
    }
  }

  private updateSmellyItem(item: Item): void {
    if (item.quality > 2) item.quality -= 2;

    item.sellIn -= 1;

    if (isSellByDatePassed(item) && item.quality > 2) item.quality -= 2;
  }

  public updateQuality(): void {
    for (const item of this.items) {
      switch (item.name) {
        case GILDED_TROS_CONSTANTS.GOOD_WINE:
          this.updateGoodWine(item);
          continue;

        case GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN:
          this.updateBDAWGKeychain(item);
          continue;

        case GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR:
        case GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX:
          this.updateBackstagePasses(item);
          continue;

        case GILDED_TROS_CONSTANTS.DUPLICATE_CODE:
        case GILDED_TROS_CONSTANTS.LONG_METHODS:
        case GILDED_TROS_CONSTANTS.UGLY_VARIABLE_NAMES:
          this.updateSmellyItem(item);
          continue;

        default:
          this.updateNormalItem(item);
          continue;
      }
    }
  }
}
