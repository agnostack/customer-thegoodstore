import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRange } from 'react-instantsearch-hooks-web';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import { useProductList } from '../../context';
import { FacetProps } from './types';

const RangeFacet: React.FC<FacetProps> = ({ attribute }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const { pricesConfiguration } = useProductList();

  const { range, refine, start } = useRange({ attribute });

  const { currencySymbol } = useI18n();

  const configuration = useMemo(() => pricesConfiguration[attribute], [pricesConfiguration, attribute]);

  const [appliedOptions, setAppliedOptions] = useState<Array<number>>([]);

  const [priceRange, setPriceRange] = useState({
    min: Math.max(start[0], range.min) / 100,
    max: Math.min(start[1], range.max) / 100,
    applied: false,
  });

  useEffect(() => {
    setPriceRange({
      min: Math.max(start[0], range.min) / 100,
      max: Math.min(start[1], range.max) / 100,
      applied: false,
    });
  }, [range.min, range.max, start[0], start[1]]);

  useEffect(() => {
    setAppliedOptions([]);
  }, [range.min, range.max]);

  const handleRangeOptionChange = useCallback(
    (index: number, checked: boolean) => {
      const newAppliedOptions = checked
        ? [...appliedOptions, index]
        : appliedOptions.filter((option) => option !== index);

      const appliedRanges = newAppliedOptions.map((index) => configuration.ranges[index]);

      const appliedRange =
        appliedRanges.length > 0
          ? appliedRanges.reduce(
              (acc, { min, max }) => ({
                min: Math.max(range.min / 100, Math.min(min, acc.min)),
                max: Math.min(range.max / 100, Math.max(max, acc.max)),
              }),
              { min: Infinity, max: 0 },
            )
          : { min: range.min / 100, max: range.max / 100 };

      setAppliedOptions(newAppliedOptions);

      setPriceRange({ ...appliedRange, applied: true });
    },
    [appliedOptions, range],
  );

  const handleRangeInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPriceRange({ ...priceRange, [e.target.name]: +e.target.value, applied: false });
    },
    [priceRange],
  );

  const handleCustomRangeSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      setAppliedOptions([]);
      setPriceRange({ ...priceRange, applied: true });
    },
    [priceRange],
  );

  const rangeOptions = useMemo(() => {
    if (!configuration) return <></>;

    return configuration.ranges
      .filter(({ refinements }) => refinements > 0)
      .map(({ min, max, refinements }, index) => (
        <div key={index} className="flex items-center justify-between gap-8">
          <div>
            {min}
            {currencySymbol} - {max}
            {currencySymbol}
          </div>
          <div className="flex items-center gap-12">
            <span className="text-14 text-secondary-black">{refinements}</span>
            <div className="w-fit rounded-sm border border-neutral-500 transition hover:border-secondary-black">
              <Checkbox
                checked={appliedOptions.includes(index)}
                className="border-none opacity-30"
                onChange={(e) => handleRangeOptionChange(index, e.target.checked)}
                placeholder={formatProductMessage({ id: 'max', defaultMessage: 'Max' })}
              />
            </div>
          </div>
        </div>
      ));
  }, [configuration, handleRangeOptionChange]);

  useEffect(() => {
    if (priceRange.applied) refine([priceRange.min * 100, priceRange.max * 100]);
  }, [priceRange]);

  return (
    <div>
      <div className="flex flex-col gap-44">{rangeOptions}</div>
      <div className="mt-48">
        <p className="text-16 font-medium">
          {formatProductMessage({ id: 'price.range.custom', defaultMessage: 'Custom price range' })}
        </p>
      </div>
      <form className="mt-36 flex items-center gap-16" onSubmit={handleCustomRangeSubmit}>
        <label
          htmlFor="min"
          className="flex w-[85px] items-center gap-4 border border-neutral-500 p-8"
          aria-label="min"
        >
          <input
            id="min"
            name="min"
            className="w-full border-none p-0 outline-none focus:border-none focus:outline-none"
            type="number"
            value={priceRange.min !== -1 ? priceRange.min.toString() : ''}
            placeholder={formatProductMessage({ id: 'min', defaultMessage: 'Min' })}
            onChange={handleRangeInputChange}
            min={range.min / 100}
            max={priceRange.max}
            step="0.01"
          />
          <span>{currencySymbol}</span>
        </label>

        <div className="w-16 border border-secondary-black" />

        <label
          htmlFor="max"
          className="flex w-[85px] items-center gap-4 border border-neutral-500 p-8"
          aria-label="max"
        >
          <input
            id="max"
            name="max"
            className="w-full border-none p-0 outline-none focus:border-none focus:outline-none"
            type="number"
            value={priceRange.max !== -1 ? priceRange.max.toString() : ''}
            placeholder={formatProductMessage({ id: 'max', defaultMessage: 'Max' })}
            onChange={handleRangeInputChange}
            min={priceRange.min}
            max={range.max / 100}
            step="0.01"
          />
          <span>{currencySymbol}</span>
        </label>

        <button
          type="submit"
          className="rounded-sm bg-primary-black py-8 px-14 font-medium leading-[24px] text-white transition hover:bg-gray-500"
        >
          {formatProductMessage({ id: 'go', defaultMessage: 'GO' })}
        </button>
      </form>
    </div>
  );
};

export default RangeFacet;
