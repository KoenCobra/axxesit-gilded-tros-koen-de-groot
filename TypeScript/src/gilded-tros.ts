import { GILDED_TROS_CONSTANTS } from "../utils/constants";
import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private updateRegularItem(item: Item): void {
    if (item.quality > 0) item.quality -= 1;

    item.sellIn -= 1;

    if (item.sellIn < 0) item.quality -= 1;
  }

  private updateGoodWine(item: Item): void {
    if (item.quality < 50) item.quality += 1;

    item.sellIn -= 1;

    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
  }

  private updateBDAWGKeychain(item: Item): void {}

  private updateBackstagePassesForReFactor(item: Item): void {
    if (item.quality < 50) {
      item.quality += 1;

      if (
        item.name == GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR ||
        item.name == GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
      ) {
        if (item.sellIn < 11 && item.quality < 50) {
          item.quality += 1;
        }

        if (item.sellIn < 6 && item.quality < 50) {
          item.quality += 1;
        }
      }
    }

    item.sellIn -= 1;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  private updateBackstagePassesForHaxx(item: Item): void {
    if (
      item.name != GILDED_TROS_CONSTANTS.GOOD_WINE &&
      item.name != GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR &&
      item.name != GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
    ) {
      if (
        item.quality > 0 &&
        item.name != GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN
      ) {
        item.quality -= 1;
      }
    } else {
      if (item.quality < 50) {
        item.quality += 1;

        if (
          item.name == GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR ||
          item.name == GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
        ) {
          if (item.sellIn < 11 && item.quality < 50) {
            item.quality += 1;
          }

          if (item.sellIn < 6 && item.quality < 50) {
            item.quality += 1;
          }
        }
      }
    }

    if (item.name != GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN) {
      item.sellIn -= 1;
    }

    if (item.sellIn < 0) {
      if (item.name != GILDED_TROS_CONSTANTS.GOOD_WINE) {
        if (
          item.name != GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR &&
          item.name != GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
        ) {
          if (
            item.quality > 0 &&
            item.name != GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN
          ) {
            item.quality -= 1;
          }
        } else {
          item.quality = 0;
        }
      } else {
        if (item.quality < 50) {
          item.quality += 1;
        }
      }
    }
  }

  public updateQuality(): void {
    for (const item of this.items) {
      switch (item.name) {
        case GILDED_TROS_CONSTANTS.REGULAR_ITEM:
          this.updateRegularItem(item);
          continue;

        case GILDED_TROS_CONSTANTS.GOOD_WINE:
          this.updateGoodWine(item);
          continue;

        case GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN:
          this.updateBDAWGKeychain(item);
          continue;

        case GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR:
          this.updateBackstagePassesForReFactor(item);
          continue;

        case GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX:
          this.updateBackstagePassesForHaxx(item);
          continue;
      }
    }
  }
}
