import { GildedTros } from "../src/gilded-tros";
import { Item } from "../src/item";
import { GILDED_TROS_CONSTANTS } from "./constants";

export const isSellByDatePassed = (item: Item): boolean => item.sellIn < 0;

export const decreaseSellIn = (item: Item, value: number): void => {
  item.sellIn -= value;
};

//Math.min to make sure quality does not exceed the max quality
export const increaseQuality = (item: Item, value: number): void => {
  const increaseAmount = Math.min(
    value,
    GILDED_TROS_CONSTANTS.MAX_QUALITY - item.quality
  );
  item.quality += increaseAmount;
};

//Math.min to make sure quality does not go below 0
export const decreaseQuality = (item: Item, value: number): void => {
  const decreaseAmount = Math.min(value, item.quality);
  item.quality -= decreaseAmount;
};

export const updateItem = (
  name: string,
  sellIn: number,
  quality: number
): Item => {
  const item = new Item(name, sellIn, quality);
  const gildedTros = new GildedTros([item]);
  gildedTros.updateQuality();
  return item;
};
