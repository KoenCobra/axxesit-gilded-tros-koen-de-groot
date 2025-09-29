import { Item } from "../src/item";
import { GILDED_TROS_CONSTANTS } from "./constants";

export const isItemQualitySmallerThanMaxQuality = (item: Item): boolean =>
  item.quality < GILDED_TROS_CONSTANTS.MAX_QUALITY;

export const isItemQualityGreaterThanZero = (item: Item): boolean =>
  item.quality > 0;

export const isSellByDatePassed = (item: Item): boolean => item.sellIn < 0;

export const decreaseSellIn = (item: Item, value: number): void => {
  item.sellIn -= value;
};

export const increaseQuality = (item: Item, value: number): void => {
  const increaseAmount = Math.min(
    value,
    GILDED_TROS_CONSTANTS.MAX_QUALITY - item.quality
  );
  item.quality += increaseAmount;
};

export const decreaseQuality = (item: Item, value: number): void => {
  const decreaseAmount = Math.min(value, item.quality);
  item.quality -= decreaseAmount;
};
