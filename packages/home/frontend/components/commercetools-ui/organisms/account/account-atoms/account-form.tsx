import { ComponentProps, FC } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import SaveOrCancel, {
  SaveOrCancelProps,
} from 'components/commercetools-ui/organisms/account/account-atoms/save-or-cancel';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import useDiscardForm from '../hooks/useDiscardForm';

export interface AccountFormProps extends ComponentProps<'form'> {
  title: string;
  subtitle?: string;
  containerClassName?: string;
  requiredLabelIsVisible?: boolean;
  defaultCTASection?: boolean;
  ctaVariant?: SaveOrCancelProps['variant'];
  loading?: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AccountForm: FC<AccountFormProps> = ({
  className,
  containerClassName,
  title,
  subtitle,
  loading,
  requiredLabelIsVisible,
  ctaVariant,
  defaultCTASection,
  onSubmit,
  children,
}) => {
  const { discardForm } = useDiscardForm();

  const { formatMessage } = useFormat({ name: 'common' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  const containerClassNames = useClassNames(['max-w-[372px]', containerClassName]);

  return (
    <form className={className} onSubmit={handleSubmit}>
      <Typography fontFamily="libre" fontSize={16} className="text-primary-black md:mb-28 md:text-24">
        {title}
      </Typography>

      <div className="relative border-neutral-400 pt-24 pb-8 md:border md:p-32 md:pr-68">
        {subtitle && (
          <Typography fontSize={14} lineHeight="loose" className="mb-28 text-primary-black md:mb-40 md:text-16">
            {subtitle}
          </Typography>
        )}

        <div className={containerClassNames}>
          {children}

          {defaultCTASection && (
            <div className="mt-24 grid items-center justify-between gap-32 md:flex md:gap-16">
              {requiredLabelIsVisible && (
                <Typography fontSize={14} className="leading-[114%] text-secondary-black">
                  {formatMessage({ id: 'required.field', defaultMessage: '* required field' })}
                </Typography>
              )}

              <SaveOrCancel onCancel={discardForm} onSave={handleSubmit} loading={loading} variant={ctaVariant} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
