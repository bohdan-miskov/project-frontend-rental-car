import { useSelector } from 'react-redux';
import {
  selectFiltersBrand,
  selectFiltersMaxMileage,
  selectFiltersMinMileage,
  selectFiltersRentalPrice,
} from '../../redux/filters/selectors';
import {
  selectBrands,
  selectBrandsError,
  selectBrandsIsLoading,
} from '../../redux/brands/selectors';
import Select from 'react-select';
import { PRICE_OPTIONS } from '../../constants';
import { useEffect, useId, type FormEvent } from 'react';
import styles from './Filters.module.css';
import clsx from 'clsx';
import {
  resetPage,
  setBrand,
  setMaxMileage,
  setMinMileage,
  setRentalPrice,
} from '../../redux/filters/slice';
import { useAppDispatch } from '../../hooks/redux';
import { getCars } from '../../redux/cars/operation';
import { getBrands } from '../../redux/brands/operation';
import ErrorToastMessage from '../ErrorToastMessage/ErrorToastMessage';

export default function Filters() {
  const formId = useId();
  const dispatch = useAppDispatch();

  const brands = useSelector(selectBrands);
  const brandsIsLoading = useSelector(selectBrandsIsLoading);
  const brandsError = useSelector(selectBrandsError);
  const filtersBrand = useSelector(selectFiltersBrand);
  const filtersPrice = useSelector(selectFiltersRentalPrice);
  const filtersMinMileage = useSelector(selectFiltersMinMileage);
  const filtersMaxMileage = useSelector(selectFiltersMaxMileage);

  const selectOptions = {
    components: { IndicatorSeparator: () => null },
    isSearchable: true,
    isClearable: true,
    styles: {
      control: (base: object) => ({
        ...base,
        borderRadius: 12,
        borderWidth: 0,
        backgroundColor: '#f7f7f7',
      }),
      valueContainer: (base: object) => ({
        ...base,
        padding: '12px 16px',
      }),
    },
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPage());
    dispatch(getCars(null));
  };

  useEffect(() => {
    dispatch(getBrands(null));
  }, [dispatch]);

  return (
    <>
      <section className={styles.filtersSection}>
        <div className="container">
          <h2 className="visually-hidden">Filters</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formComponent}>
              <label
                className={styles.formLabel}
                htmlFor={`select-brand-${formId}`}
              >
                Car brand
              </label>
              <Select
                className={clsx(
                  styles.formSelect,
                  styles.formSelectBrand,
                  'select'
                )}
                value={
                  filtersBrand
                    ? {
                        value: filtersBrand,
                        label:
                          filtersBrand[0].toUpperCase() + filtersBrand.slice(1),
                      }
                    : null
                }
                onChange={option => dispatch(setBrand(option?.value ?? null))}
                placeholder="Choose a brand"
                isLoading={brandsIsLoading}
                inputId={`select-brand-${formId}`}
                name="brand"
                options={brands.map(brand => {
                  return { value: brand, label: brand };
                })}
                {...selectOptions}
              />
            </div>
            <div className={styles.formComponent}>
              <label
                className={styles.formLabel}
                htmlFor={`select-price-${formId}`}
              >
                Price/ 1 hour
              </label>
              <Select
                className={clsx(
                  styles.formSelect,
                  styles.formSelectPrice,
                  'select'
                )}
                value={
                  filtersPrice
                    ? { value: filtersPrice, label: filtersPrice }
                    : null
                }
                onChange={option =>
                  dispatch(setRentalPrice(option?.value ?? null))
                }
                placeholder="Choose a price"
                name="price"
                inputId={`select-price-${formId}`}
                formatOptionLabel={(option, { context }) => {
                  if (context === 'value') {
                    return <>To ${option.label}</>;
                  }
                  return option.label;
                }}
                options={PRICE_OPTIONS.map(price => {
                  return { value: price, label: price };
                })}
                {...selectOptions}
              />
            </div>

            <fieldset className={styles.formComponent}>
              <legend className={styles.formLabel}>Сar mileage / km</legend>
              <div className={styles.formRangeContainer}>
                <div className={styles.formInputContainer}>
                  <span className={styles.formInputHint}>From</span>
                  <input
                    className={styles.formRangeInput}
                    name="minMileage"
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target?.value;
                      dispatch(setMinMileage(value ?? null));
                    }}
                    value={filtersMinMileage ?? ''}
                  />
                </div>
                <div className={styles.formInputContainer}>
                  <span className={styles.formInputHint}>To</span>
                  <input
                    className={styles.formRangeInput}
                    name="maxMileage"
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target?.value;
                      dispatch(setMaxMileage(value ?? null));
                    }}
                    value={filtersMaxMileage ?? ''}
                  />
                </div>
              </div>
            </fieldset>
            <button className={clsx(styles.fromBtn, 'blue-btn')} type="submit">
              Search
            </button>
          </form>
        </div>
      </section>
      {brandsError && (
        <ErrorToastMessage>{brandsError.message}</ErrorToastMessage>
      )}
    </>
  );
}
