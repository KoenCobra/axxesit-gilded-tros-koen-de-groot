import { GILDED_TROS_CONSTANTS } from "../utils/constants";
import {
  decreaseQuality,
  decreaseSellIn,
  increaseQuality,
  isSellByDatePassed,
} from "../utils/helper";
import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  //Decreases quality by 1 before sell date
  //Decreases quality by 2 after sell date
  private updateNormalItem(item: Item): void {
    decreaseQuality(item, 1);
    decreaseSellIn(item, 1);

    if (isSellByDatePassed(item)) {
      decreaseQuality(item, 1);
    }
  }

  //Increases quality by 1 before sell date
  //Increases quality by 2 after sell date
  private updateGoodWine(item: Item): void {
    increaseQuality(item, 1);
    decreaseSellIn(item, 1);

    if (isSellByDatePassed(item)) {
      increaseQuality(item, 1);
    }
  }

  private updateBDAWGKeychain(item: Item): void {
    // Legendary items never change
  }

  //Increases quality by 1 when more than 10 days remain
  //Increases quality by 2 when 10 days or less remain
  //Increases quality by 3 when 5 days or less remain
  //Drops to 0 quality after the conference
  private updateBackstagePasses(item: Item): void {
    increaseQuality(item, 1);

    if (item.sellIn < GILDED_TROS_CONSTANTS.BACKSTAGE_PASS_MEDIUM_THRESHOLD) {
      increaseQuality(item, 1);
    }

    if (item.sellIn < GILDED_TROS_CONSTANTS.BACKSTAGE_PASS_HIGH_THRESHOLD) {
      increaseQuality(item, 1);
    }

    decreaseSellIn(item, 1);

    if (isSellByDatePassed(item)) {
      item.quality = 0;
    }
  }

  //Degrades quality twice as fast as normal items
  //Decreases quality by 2 before sell date
  //Decreases quality by 4 after sell date
  private updateSmellyItem(item: Item): void {
    decreaseQuality(item, 2);
    decreaseSellIn(item, 1);

    if (isSellByDatePassed(item)) {
      decreaseQuality(item, 2);
    }
  }

  public updateQuality(): void {
    for (const item of this.items) {
      switch (item.name) {
        case GILDED_TROS_CONSTANTS.GOOD_WINE:
          this.updateGoodWine(item);
          break;

        case GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN:
          this.updateBDAWGKeychain(item);
          break;

        case GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR:
        case GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX:
          this.updateBackstagePasses(item);
          break;

        case GILDED_TROS_CONSTANTS.DUPLICATE_CODE:
        case GILDED_TROS_CONSTANTS.LONG_METHODS:
        case GILDED_TROS_CONSTANTS.UGLY_VARIABLE_NAMES:
          this.updateSmellyItem(item);
          break;

        default:
          this.updateNormalItem(item);
          break;
      }
    }
  }
}
