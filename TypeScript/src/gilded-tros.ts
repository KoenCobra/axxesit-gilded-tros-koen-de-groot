import { GILDED_TROS_CONSTANTS } from "../utils/constants";
import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private updateRegularItem(item: Item): void {}
  private updateGoodWine(item: Item): void {}
  private updateBDAWGKeychain(item: Item): void {}
  private updateBackstagePassesForReFactor(item: Item): void {}
  private updateBackstagePassesForHaxx(item: Item): void {}

  public updateQuality(): void {
    for (const item of this.items) {
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
  }
}
