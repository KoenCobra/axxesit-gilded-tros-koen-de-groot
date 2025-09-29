import { Item } from "../src/item";
import { GILDED_TROS_CONSTANTS } from "./constants";

export const canIncreaseQuality = (item: Item): boolean =>
  item.quality < GILDED_TROS_CONSTANTS.MAX_QUALITY;

export const isSellByDatePassed = (item: Item): boolean => item.sellIn < 0;

export const decreaseSellInByOne = (item: Item): void => {
  item.sellIn -= 1;
};
