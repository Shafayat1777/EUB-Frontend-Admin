import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { usePortfolioAuthorities, usePortfolioAuthorityByUUID } from '../_config/query';
import { AUTHORITIES_NULL, AUTHORITIES_SCHEMA, IAuthorities } from '../_config/schema';
import { IAuthoritiesAddOrUpdateProps } from '../_config/types';
import { categories } from './utils';

const AddOrUpdate: React.FC<IAuthoritiesAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = usePortfolioAuthorityByUUID(updatedData?.uuid as string);
	const { data: userOption } = useOtherUser<IFormSelectOption[]>();
	const { invalidateQuery: invalidateAuthoritiesQuery } = usePortfolioAuthorities();

	const categoryOptions = categories;

	const form = useRHF(AUTHORITIES_SCHEMA, AUTHORITIES_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(AUTHORITIES_NULL);
		invalidateAuthoritiesQuery();
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IAuthorities) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				},
				onClose,
			});
		}
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Authorities' : 'Add Authorities'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='user_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='User' placeholder='Select User' options={userOption!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='phone'
				render={(props) => <CoreForm.Input label='phone' {...props} />}
			/>
			<FormField
				control={form.control}
				name='email'
				render={(props) => <CoreForm.Input label='email' {...props} />}
			/>
			<FormField
				control={form.control}
				name='category'
				render={(props) => (
					<CoreForm.ReactSelect placeholder='Select Category' options={categoryOptions} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='short_biography'
				render={(props) => <CoreForm.RichTextEditor label='Short Biography' {...props} />}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;
