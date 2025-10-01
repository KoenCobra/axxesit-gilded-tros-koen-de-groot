import { updateItem } from "../utils/helper";
import { GILDED_TROS_CONSTANTS } from "./../utils/constants";

describe("GildedTros", () => {
  describe("Normal Items", () => {
    test("should decrease quality by 1 and sellIn by 1 before sell date", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.NORMAL_ITEM, 5, 10);

      expect(item.sellIn).toBe(4);
      expect(item.quality).toBe(9);
    });

    test("should decrease quality by 2 after sell date passes", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.NORMAL_ITEM, 0, 10);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(8);
    });

    test("should never decrease quality below 0", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.NORMAL_ITEM, 1, 0);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(0);
    });
  });

  describe("Good Wine", () => {
    test("should increase quality by 1 before sell date", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.GOOD_WINE, 1, 10);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(11);
    });

    test("should increase quality by 2 after sell date passes", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.GOOD_WINE, 0, 10);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(12);
    });

    test("should never increase quality above 50", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.GOOD_WINE, 1, 50);

      expect(item.sellIn).toBe(0);
      expect(item.quality).toBe(50);
    });

    test("should cap at 50 quality even when increasing by 2 after sell date", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.GOOD_WINE, 0, 49);

      expect(item.sellIn).toBe(-1);
      expect(item.quality).toBe(50);
    });
  });

  describe("B-DAWG Keychain", () => {
    test("should never change sellIn or quality (legendary item)", () => {
      const item = updateItem(GILDED_TROS_CONSTANTS.B_DAWG_KEYCHAIN, 1, 80);

      expect(item.sellIn).toBe(1);
      expect(item.quality).toBe(80);
    });
  });

  describe("Backstage passes", () => {
    const backstagePasses = [
      GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_RE_FACTOR,
      GILDED_TROS_CONSTANTS.BACKSTAGE_PASSES_FOR_HAXX,
    ];

    test.each(backstagePasses)(
      "should increase quality by 1 when more than 10 days remain - %s",
      (passName) => {
        const item = updateItem(passName, 15, 10);

        expect(item.sellIn).toBe(14);
        expect(item.quality).toBe(11);
      }
    );

    test.each(backstagePasses)(
      "should increase quality by 2 when 10 days or less remain - %s",
      (passName) => {
        const item = updateItem(passName, 10, 10);

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(12);
      }
    );

    test.each(backstagePasses)(
      "should increase quality by 3 when 5 days or less remain - %s",
      (passName) => {
        const item = updateItem(passName, 5, 10);

        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(13);
      }
    );

    test.each(backstagePasses)(
      "should drop to 0 quality after conference (sellIn passes) - %s",
      (passName) => {
        const item = updateItem(passName, 0, 10);

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(0);
      }
    );

    test.each(backstagePasses)(
      "should cap at 50 quality maximum - %s",
      (passName) => {
        const item = updateItem(passName, 5, 49);

        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(50);
      }
    );
  });

  describe("Smelly Items", () => {
    const smellyItems = [
      GILDED_TROS_CONSTANTS.DUPLICATE_CODE,
      GILDED_TROS_CONSTANTS.LONG_METHODS,
      GILDED_TROS_CONSTANTS.UGLY_VARIABLE_NAMES,
    ];

    test.each(smellyItems)(
      "should decrease quality by 2 before sell date (twice as fast) - %s",
      (itemName) => {
        const item = updateItem(itemName, 5, 10);

        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(8);
      }
    );

    test.each(smellyItems)(
      "should never decrease quality below 0 - %s",
      (itemName) => {
        const item = updateItem(itemName, 1, 0);

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(0);
      }
    );

    test.each(smellyItems)(
      "should decrease quality by 4 after sell date passes - %s",
      (itemName) => {
        const item = updateItem(itemName, 0, 10);

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(6);
      }
    );

    test.each(smellyItems)(
      "should cap at 0 when quality is low after sell date - %s",
      (itemName) => {
        const item = updateItem(itemName, 0, 3);

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(0);
      }
    );

    test.each(smellyItems)(
      "should handle edge case of quality 1 after sell date - %s",
      (itemName) => {
        const item = updateItem(itemName, -1, 1);

        expect(item.sellIn).toBe(-2);
        expect(item.quality).toBe(0);
      }
    );
  });
});
