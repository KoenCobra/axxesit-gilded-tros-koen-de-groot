import { Item } from "../src/item";
import { GILDED_TROS_CONSTANTS } from "./constants";

export const canIncreaseQuality = (item: Item): boolean =>
  item.quality < GILDED_TROS_CONSTANTS.MAX_QUALITY;

export const isSellByDatePassed = (item: Item): boolean => item.sellIn < 0;

export const decreaseSellIn = (item: Item, value: number): void => {
  item.sellIn -= value;
};

export const increaseQuality = (item: Item, value: number): void => {
  item.quality += value;
};

export const decreaseQuality = (item: Item, value: number): void => {
  item.quality -= value;
};
