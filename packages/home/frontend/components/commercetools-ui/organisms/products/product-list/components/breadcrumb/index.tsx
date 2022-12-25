import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'components/commercetools-ui/atoms/link';
import Breadcrumb from 'components/commercetools-ui/organisms/breadcrumb';
import { useFormat } from 'helpers/hooks/useFormat';
import { Category } from 'types/category';

interface Props {
  categoryId?: string;
  categories: Category[];
}

const Breadcrumbs: React.FC<Props> = ({ categoryId, categories }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const router = useRouter();

  const parentCategories = useMemo(() => {
    if (!router?.asPath) return [];

    const categoryIdChunks = router.asPath.split('?')[0].slice(1).split('/').slice(0, -1);

    return categoryIdChunks.map((id) => (categories.find((category) => category.categoryId === id) ?? {}) as Category);
  }, [router, categories]);

  const currentCategory = useMemo(() => {
    return (categories.find((category) => category.categoryId === categoryId) ?? {}) as Category;
  }, [categories, categoryId]);

  const subCategories = useMemo(() => {
    return ((categories.find((category) => category.categoryId === categoryId) as Category)?.subCategories ??
      []) as Category[];
  }, [categories, categoryId]);

  if (!categoryId) return <></>;

  return (
    <div className="flex flex-col items-center">
      <Breadcrumb Separator="/">
        {parentCategories.map((category) => (
          <Link key={category.categoryId} link={category.path} className="text-12">
            {category.name}
          </Link>
        ))}

        {currentCategory && (
          <Link key={currentCategory.categoryId} link={currentCategory.path} className="text-12">
            {currentCategory.name}
          </Link>
        )}
      </Breadcrumb>
      <h1 className="mt-20 text-28 leading-[35px]">{currentCategory.name}</h1>
      {subCategories?.length > 0 && (
        <Breadcrumb className="mt-32">
          <Link
            link={currentCategory.path}
            className="mr-8 rounded-md border border-gray-700 bg-gray-700 py-8 px-16 text-12 leading-[16px] text-white"
          >
            {formatProductMessage({ id: 'items.all', defaultMessage: 'All items' })}
          </Link>
          {subCategories.map((category) => (
            <Link
              key={category.categoryId}
              link={category.path}
              className="mr-8 rounded-md border border-gray-700 bg-transparent py-8 px-16 text-12 leading-[16px] text-primary-black transition hover:bg-gray-700 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </Breadcrumb>
      )}
    </div>
  );
};

export default Breadcrumbs;
