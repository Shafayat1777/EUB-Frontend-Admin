import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useCourseAssignByUUID } from '../config/query';
import { COURSE_ASSIGN_NULL, COURSE_ASSIGN_SCHEMA, ICourseAssign } from '../config/schema';
import Header from './header';
import { SideSearch } from './side-search';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const { user } = useAuth();

	const form = useRHF(COURSE_ASSIGN_SCHEMA, COURSE_ASSIGN_NULL);
	const { fields } = useFieldArray({
		control: form.control,
		name: 'sem_crs_thr_entry',
	});

	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateCourseSectionEntry,
	} = useCourseAssignByUUID<ICourseAssign>(form.watch('course_uuid') as string, `semester_uuid=${uuid}`);

	useEffect(() => {
		if (data) {
			form.setValue('sem_crs_thr_entry', data.sem_crs_thr_entry || []);
		}
	}, [data, form, form.watch]);

	// Submit handler
	async function onSubmit(values: ICourseAssign) {
		const { sem_crs_thr_entry } = values;

		const filteredEntries = sem_crs_thr_entry.filter((entry) => entry.teachers_uuid && entry.class_size > 0);

		if (filteredEntries.length === 0) {
			toast.error('Please add at least one valid entry with a teacher and class size.');
			return;
		}

		const entryUpdatePromise = filteredEntries.map((entry) => {
			if (entry.uuid) {
				return updateData.mutateAsync({
					url: `/lib/sem-crs-thr-entry/${entry.uuid}`,
					updatedData: entry,
				});
			} else {
				const entryData = {
					semester_uuid: uuid,
					course_section_uuid: entry.course_section_uuid,
					teachers_uuid: entry.teachers_uuid,
					class_size: entry.class_size,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
				};

				return postData.mutateAsync({
					url: `/lib/sem-crs-thr-entry`,
					newData: entryData,
				});
			}
		});

		invalidateCourseSectionEntry();
		navigate('/lib/course-assign');

		return Promise.all([...entryUpdatePromise]); // Wait for all entry updates to complete
	}

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].uuid,
			});
		} else {
			form.setValue(`sem_crs_thr_entry.${index}`, {
				uuid: '',
				semester_uuid: '',
				course_section_uuid: '',
				teachers_uuid: '',
				class_size: 0,
			});
		}
	};

	const dynamicFieldDefs = useGenerateFieldDefs({
		watch: form.watch,
		set: form.setValue,
		remove: handleRemove,
		isUpdate,
		isNew: false,
		data: form.getValues(),
		form: form,
	});
	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Course' : 'Add Course'} form={form} onSubmit={onSubmit}>
			<Header />

			<div className='grid grid-cols-3 gap-4'>
				<CoreForm.Section title={`Courses`} className='flex flex-col gap-4'>
					<SideSearch form={form} />
				</CoreForm.Section>

				{form.watch('course_uuid') ? (
					<div className='col-span-2 flex flex-col gap-4'>
						<CoreForm.DynamicFields
							title='Assign'
							form={form}
							fieldName='sem_crs_thr_entry'
							fieldDefs={dynamicFieldDefs}
							fields={fields}
						/>
					</div>
				) : (
					<div className='col-span-2 flex items-center justify-center rounded-md bg-gray-300'>
						Please select a course to assign.
					</div>
				)}
			</div>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/lib/sem-crs-thr-entry`,
						deleteData,
						invalidateQuery: invalidateCourseSectionEntry,
						invalidateQueries: [invalidateCourseSectionEntry],
						// onClose: () => {
						// 	form.setValue(
						// 		'sem_crs_thr_entry',
						// 		form.getValues('sem_crs_thr_entry').filter((item) => item.uuid !== deleteItem?.id)
						// 	);
						// },
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;
