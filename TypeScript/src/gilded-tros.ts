import { GILDED_TROS_CONSTANTS } from "../utils/constants";
import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != GILDED_TROS_CONSTANTS.GOOD_WINE &&
        this.items[i].name !=
          GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR &&
        this.items[i].name != GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;

          if (
            this.items[i].name ==
              GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR ||
            this.items[i].name ==
              GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
          ) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }

            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (this.items[i].name != GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != GILDED_TROS_CONSTANTS.GOOD_WINE) {
          if (
            this.items[i].name !=
              GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR &&
            this.items[i].name !=
              GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX
          ) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
  }
}
