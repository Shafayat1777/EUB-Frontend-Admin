import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { getDateTime, PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { questionColumns } from '../config/columns';
import { IQuestionTableData } from '../config/columns/columns.type';
import { useFDEQuestion } from '../config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Semester = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useFDEQuestion<IQuestionTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('FDE/Question', url, 'fde__question'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IQuestionTableData | null>(null);
	const handleUpdate = (row: Row<IQuestionTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IQuestionTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};
	const handleActive = async (row: Row<IQuestionTableData>) => {
		const active = row?.original?.active ? false : true;
		const updated_at = getDateTime();

		await updateData.mutateAsync({
			url: `/fde/qns/${row?.original?.uuid}`,
			updatedData: { active, updated_at },
		});
	};
	// Table Columns
	const columns = questionColumns({ handleActive });

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Semester;
